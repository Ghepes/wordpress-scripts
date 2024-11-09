<?php
/*
Plugin Name: Zero Media WordPress CDN Integration
Description: Integrates WordPress media uploads with Google Cloud Storage using API Key and Folder Name.
Version: 1.1
Author: Your Name
*/

defined("ZMW_EXEC") or die("Silence is golden");

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue Tailwind CSS
function zmw_enqueue_tailwind() {
    wp_enqueue_style('tailwind-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
}
add_action('admin_enqueue_scripts', 'zmw_enqueue_tailwind');

// Procesarea și salvarea cheilor API, Bucket Name și Folder Name în opțiuni
function zmw_cdn_page_process_post() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['api_key']) && isset($_POST['bucket_name']) && isset($_POST['folder_name'])) {
            update_option('zmw_cdn_api_key', sanitize_text_field($_POST['api_key']));
            update_option('zmw_cdn_bucket_name', sanitize_text_field($_POST['bucket_name']));
            update_option('zmw_cdn_folder_name', sanitize_text_field($_POST['folder_name']));
        }
    }
}
add_action('admin_init', 'zmw_cdn_page_process_post');

// Funcția pentru a gestiona încărcările media
function zmw_handle_file_upload() {
    // Verificăm permisiunile
    if (!current_user_can('manage_options')) {
        wp_send_json_error(['message' => 'Permisiuni insuficiente.']);
        wp_die();
    }

    // Preluăm opțiunile
    $api_key = get_option('zmw_cdn_api_key');
    $bucket_name = get_option('zmw_cdn_bucket_name');
    $folder_name = get_option('zmw_cdn_folder_name');

    if (!$api_key || !$bucket_name) {
        wp_send_json_error(['message' => 'API Key sau Bucket Name lipsă.']);
        wp_die();
    }

    if (empty($_FILES['file'])) {
        wp_send_json_error(['message' => 'Niciun fișier uploadat.']);
        wp_die();
    }

    $file = $_FILES['file'];

    // Validare fișier
    $allowed_types = [
        'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp',
        'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav'
    ];
    if (!in_array($file['type'], $allowed_types)) {
        wp_send_json_error(['message' => 'Tip de fișier neacceptat.']);
        wp_die();
    }

    // Numele fișierului
    $file_name = basename($file['name']);

    // Dacă există un folder specificat, prefixăm numele fișierului
    if (!empty($folder_name)) {
        // Asigură-te că folder_name se termină cu un slash
        $folder_name = rtrim($folder_name, '/') . '/';
    }

    // Numele complet al fișierului în bucket
    $full_file_name = !empty($folder_name) ? $folder_name . $file_name : $file_name;

    // Calea către fișierul temporar
    $file_path = $file['tmp_name'];

    // URL-ul de încărcare
    $upload_url = "https://storage.googleapis.com/upload/storage/v1/b/" . urlencode($bucket_name) . "/o?uploadType=media&name=" . urlencode($full_file_name) . "&key=" . urlencode($api_key);

    // Inițializăm cURL
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $upload_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: ' . $file['type'],
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents($file_path));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Executăm cURL
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        wp_send_json_error(['message' => "cURL Error: {$error}"]);
        wp_die();
    }

    curl_close($ch);

    $decoded_response = json_decode($response, true);
    if ($http_code >= 200 && $http_code < 300) {
        // URL-ul fișierului în GCS
        $file_url = "https://storage.googleapis.com/{$bucket_name}/{$full_file_name}";

        // Creăm un atașament în Media Library
        $attachment = array(
            'post_mime_type' => $file['type'],
            'post_title'     => sanitize_file_name($file_name),
            'post_content'   => '',
            'post_status'    => 'inherit',
        );

        // Inserează atașamentul
        $attach_id = wp_insert_attachment($attachment, false);
        if (!is_wp_error($attach_id)) {
            // Necesită includerea fișierului image.php pentru funcții suplimentare
            require_once(ABSPATH . 'wp-admin/includes/image.php');

            // Actualizează GUID-ul pentru a puncta spre URL-ul GCS
            wp_update_post(array(
                'ID' => $attach_id,
                'guid' => esc_url_raw($file_url),
            ));

            // Generarea și actualizarea metadatelor atașamentului
            // Deoarece fișierul nu este local, metadatele standard pot fi limitate
            // Putem stoca URL-ul extern în meta data personalizată
            update_post_meta($attach_id, '_zmw_cdn_url', esc_url_raw($file_url));

            // Dacă fișierul este o imagine, putem încerca să generăm metadate suplimentare
            if (strpos($file['type'], 'image/') !== false) {
                // Obține dimensiunile imaginii folosind getimagesize pe URL (ar putea necesita configurare suplimentară)
                $image_size = @getimagesize($file_url);
                if ($image_size) {
                    $attach_data = array(
                        'width'  => $image_size[0],
                        'height' => $image_size[1],
                        'file'   => $file_url, // Indică URL-ul extern
                    );
                    wp_update_attachment_metadata($attach_id, $attach_data);
                }
            }
        }

        wp_send_json_success(['message' => 'Fișier încărcat și adăugat în Media Library cu succes.']);
    } else {
        // Încercăm să obținem mesajul de eroare din răspuns
        $error_message = isset($decoded_response['error']['message']) ? $decoded_response['error']['message'] : 'Eroare la încărcarea fișierului.';
        wp_send_json_error(['message' => $error_message]);
    }

    wp_die();
}
add_action('wp_ajax_zmw_upload_file', 'zmw_handle_file_upload');

// Funcție pentru a obține media din Media Library
function zmw_fetch_media() {
    // Verificăm permisiunile
    if (!current_user_can('manage_options')) {
        wp_send_json_error(['message' => 'Permisiuni insuficiente.']);
        wp_die();
    }

    // Obțineți ultimele 100 de atașamente (poți ajusta numărul după necesități)
    $args = array(
        'post_type'      => 'attachment',
        'post_status'    => 'inherit',
        'posts_per_page' => 100,
    );

    $query = new WP_Query($args);
    $attachments = $query->posts;

    $media = array();

    foreach ($attachments as $attachment) {
        $file_url = get_post_meta($attachment->ID, '_zmw_cdn_url', true);
        if (!$file_url) {
            // Dacă nu există meta data pentru URL-ul GCS, folosește URL-ul standard
            $file_url = wp_get_attachment_url($attachment->ID);
        }

        $media[] = array(
            'ID'    => $attachment->ID,
            'title' => $attachment->post_title,
            'url'   => $file_url,
        );
    }

    wp_send_json_success($media);
    wp_die();
}
add_action('wp_ajax_zmw_fetch_media', 'zmw_fetch_media');

// Admin page
function zmw_cdn_page() {
    // Get options
    $api_key = get_option('zmw_cdn_api_key');
    $bucket_name = get_option('zmw_cdn_bucket_name');
    $folder_name = get_option('zmw_cdn_folder_name');
    ?>
    <div class="wrap zmw-wrap">
        <h1 class="text-2xl font-bold mb-6">Zero Media WordPress CDN Integration</h1>
        <form method="post" class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div class="mb-4">
                <label for="api_key" class="block text-gray-700 font-semibold mb-2">API Key:</label>
                <input type="text" id="api_key" name="api_key" value="<?php echo esc_attr($api_key); ?>" required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div class="mb-4">
                <label for="bucket_name" class="block text-gray-700 font-semibold mb-2">Bucket Name:</label>
                <input type="text" id="bucket_name" name="bucket_name" value="<?php echo esc_attr($bucket_name); ?>" required 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div class="mb-4">
                <label for="folder_name" class="block text-gray-700 font-semibold mb-2">Folder Name:</label>
                <input type="text" id="folder_name" name="folder_name" value="<?php echo esc_attr($folder_name); ?>" 
                    placeholder="Optional - e.g., images/" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <button type="submit" 
                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
                Save
            </button>
        </form>

        <?php if ($api_key && $bucket_name): ?>
            <!-- Afișăm secțiunea pentru managerul de fișiere doar dacă există un API Key și un Bucket Name -->
            <div id="fileManager" class="mt-12">
                <h2 class="text-xl font-semibold mb-6">File Manager for Google Cloud Storage</h2>

                <!-- Integrarea bannerului -->
                <div class="zmw-banner mb-6">
                    <div class="zmw-banner-images flex justify-center items-center">
                        <img 
                            width="2000" 
                            src="<?php echo esc_url(plugin_dir_url(__FILE__) . 'zero-media-wordpress-plugin-2000x250.svg'); ?>" 
                            alt="Banner 1" 
                            class="w-full max-w-4xl h-auto"
                        />
                    </div>
                </div>

                <!-- Zona de drag-and-drop pentru încărcare -->
                <div id="upload-area" class="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
                    <p class="text-gray-600">Trage și plasează fișierele aici sau <span class="text-indigo-600 underline cursor-pointer" id="browse-button">selectează-le</span></p>
                    <input type="file" id="file-input" multiple class="hidden" accept="image/*,video/*,audio/*">
                </div>

                <div class="media-frame wp-core-ui mode-grid mode-edit hide-menu">
                    <div class="media-frame-title" id="media-frame-title"><h1>Media Library</h1></div>
                    <h2 class="media-frame-menu-heading">Actions</h2>
                    <div id="gallery" class="gallery-grid">
                        <!-- Aici va fi listată media din bucket și Media Library -->
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Adaugă scriptul pentru gestionarea fișierelor și încărcărilor -->
    <script>
        const uploadUrl = '<?php echo admin_url('admin-ajax.php?action=zmw_upload_file'); ?>';
        const bucketName = '<?php echo esc_js($bucket_name); ?>';
        const apiKey = '<?php echo esc_js($api_key); ?>';
        const folderName = '<?php echo esc_js($folder_name); ?>';
        const fetchMediaUrl = '<?php echo admin_url('admin-ajax.php?action=zmw_fetch_media'); ?>';

        document.addEventListener('DOMContentLoaded', function() {
            if (apiKey && bucketName) {
                fetchFiles();
            }

            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');
            const browseButton = document.getElementById('browse-button');

            // Deschiderea selectorului de fișiere când se dă click pe "selectează-le"
            browseButton.addEventListener('click', () => fileInput.click());

            // Gestionarea selecției fișierelor prin input
            fileInput.addEventListener('change', (e) => {
                const files = e.target.files;
                handleFiles(files);
            });

            // Gestionarea evenimentelor de drag-and-drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                handleFiles(files);
            });

            // Funcție pentru a gestiona fișierele selectate sau trăgându-le
            function handleFiles(files) {
                for (let i = 0; i < files.length; i++) {
                    uploadFile(files[i]);
                }
            }

            // Funcție pentru a încărca un fișier
            function uploadFile(file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('bucket_name', bucketName);
                formData.append('folder_name', folderName);

                fetch(uploadUrl, {
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin',
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Răspuns de la server:', data);
                    if (data.success) {
                        alert(data.data.message);
                        fetchFiles(); // Reîmprospătează galeria după încărcare
                    } else {
                        const errorMessage = data.data && data.data.message ? data.data.message : 'A apărut o eroare necunoscută.';
                        alert('Eroare: ' + errorMessage);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('A apărut o eroare la încărcarea fișierului.');
                });
            }

            // Funcție pentru a prelua și afișa fișierele din GCS și Media Library
            async function fetchFiles() {
                // Fetch din GCS
                const baseUrlGCS = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?key=${apiKey}`;
                // Fetch din Media Library
                const baseUrlMedia = fetchMediaUrl;

                try {
                    // Fetch din GCS
                    const responseGCS = await fetch(baseUrlGCS);
                    const dataGCS = await responseGCS.json();

                    // Fetch din Media Library
                    const responseMedia = await fetch(baseUrlMedia);
                    const dataMedia = await responseMedia.json();

                    if (responseGCS.ok && dataMedia.success) {
                        document.getElementById('fileManager').style.display = 'block'; // Afișează restul interfeței
                        const gallery = document.getElementById('gallery');
                        gallery.innerHTML = '';

                        // Combinați fișierele din GCS și Media Library
                        const allItems = [...(dataGCS.items || []), ...(dataMedia.data || [])];

                        if (allItems.length > 0) {
                            allItems.forEach(item => {
                                const fileName = item.name ? item.name.split('/').pop() : item.title;
                                const fileUrl = item.url || item.guid;

                                // Definim tipurile media acceptate
                                const mediaTypes = {
                                    'image': /\.(jpeg|jpg|gif|png|bmp|webp)$/i,
                                    'video': /\.(mp4|webm|ogg)$/i,
                                    'audio': /\.(mp3|wav|ogg)$/i
                                    // Adaugă alte tipuri media după necesități
                                };

                                // Verificăm dacă fișierul este de tip media
                                let isMedia = false;
                                let mediaCategory = '';
                                for (const [category, regex] of Object.entries(mediaTypes)) {
                                    if (regex.test(fileName)) {
                                        isMedia = true;
                                        mediaCategory = category;
                                        break;
                                    }
                                }

                                if (!isMedia) {
                                    // Dacă nu este media, nu afișăm fișierul
                                    return;
                                }

                                const fileContainer = document.createElement('div');
                                fileContainer.className = 'file-container';

                                if (mediaCategory === 'image') {
                                    const linkElement = document.createElement('a');
                                    linkElement.href = fileUrl;
                                    linkElement.target = '_blank';
                                    linkElement.rel = 'noopener noreferrer';

                                    const imgElement = document.createElement('img');
                                    imgElement.src = fileUrl;
                                    imgElement.alt = fileName;
                                    imgElement.className = 'w-32 h-32 object-cover rounded';
                                    linkElement.appendChild(imgElement);
                                    fileContainer.appendChild(linkElement);
                                } else if (mediaCategory === 'video') {
                                    const videoElement = document.createElement('video');
                                    videoElement.src = fileUrl;
                                    videoElement.controls = true;
                                    videoElement.className = 'w-32 h-32 object-cover rounded';
                                    fileContainer.appendChild(videoElement);
                                } else if (mediaCategory === 'audio') {
                                    const audioElement = document.createElement('audio');
                                    audioElement.src = fileUrl;
                                    audioElement.controls = true;
                                    fileContainer.appendChild(audioElement);
                                }

                                // Action buttons
                                const actionIcons = document.createElement('div');
                                actionIcons.className = 'action-icons mt-2 flex space-x-2';

                                // Copy Link Button
                                const copyButton = document.createElement('button');
                                copyButton.className = 'action-button bg-gray-200 p-1 rounded';
                                copyButton.title = 'Copy Link';
                                copyButton.innerHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8v2h14V9H7z"/>
                                    </svg>
                                `;
                                copyButton.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    copyToClipboard(fileUrl);
                                    alert('Link copiat în clipboard!');
                                });

                                // Open in New Tab Button for images and videos
                                if (mediaCategory === 'image' || mediaCategory === 'video') {
                                    const openButton = document.createElement('button');
                                    openButton.className = 'action-button bg-gray-200 p-1 rounded';
                                    openButton.title = 'Open in New Tab';
                                    openButton.innerHTML = `
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                                            <path d="M14 3v2h3.59l-9.3 9.29 1.42 1.42L19 6.41V10h2V3h-9zM5 5v14h14v-9h-2v7H7V7h7V5H5z"/>
                                        </svg>
                                    `;
                                    openButton.addEventListener('click', function(e) {
                                        e.stopPropagation();
                                        window.open(fileUrl, '_blank');
                                    });

                                    actionIcons.appendChild(openButton);
                                }

                                actionIcons.appendChild(copyButton);
                                fileContainer.appendChild(actionIcons);
                                gallery.appendChild(fileContainer);
                            });
                        } else {
                            gallery.innerHTML = '<p>No media files found in the bucket or Media Library.</p>';
                        }
                    } else {
                        alert('Invalid API Key or no access to bucket.');
                    }
                } catch (error) {
                    console.error('Error fetching files:', error);
                    alert('There was an error fetching the files. Please check your API Key and bucket name.');
                }
            }

            // Funcție pentru a copia textul în clipboard
            function copyToClipboard(text) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Failed to copy!', err);
                }
                document.body.removeChild(textarea);
            }
        });
    </script>
    ```
    
#### **2. Explicații Ale Modificărilor**

1. **Crearea Atașamentelor în Media Library:**

    - **Inserează Atașamentul:**
        ```php
        $attach_id = wp_insert_attachment($attachment, false);
        if (!is_wp_error($attach_id)) {
            // Necesită includerea fișierului image.php pentru funcții suplimentare
            require_once(ABSPATH . 'wp-admin/includes/image.php');

            // Actualizează GUID-ul pentru a puncta spre URL-ul GCS
            wp_update_post(array(
                'ID' => $attach_id,
                'guid' => esc_url_raw($file_url),
            ));

            // Generarea și actualizarea metadatelor atașamentului
            // Deoarece fișierul nu este local, metadatele standard pot fi limitate
            // Putem stoca URL-ul extern în meta data personalizată
            update_post_meta($attach_id, '_zmw_cdn_url', esc_url_raw($file_url));

            // Dacă fișierul este o imagine, putem încerca să generăm metadate suplimentare
            if (strpos($file['type'], 'image/') !== false) {
                // Obține dimensiunile imaginii folosind getimagesize pe URL (ar putea necesita configurare suplimentară)
                $image_size = @getimagesize($file_url);
                if ($image_size) {
                    $attach_data = array(
                        'width'  => $image_size[0],
                        'height' => $image_size[1],
                        'file'   => $file_url, // Indică URL-ul extern
                    );
                    wp_update_attachment_metadata($attach_id, $attach_data);
                }
            }
        }
        ```
        - **wp_insert_attachment:** Creează un nou atașament în Media Library fără a încărca efectiv fișierul local.
        - **wp_update_post:** Actualizează GUID-ul atașamentului pentru a puncta spre URL-ul GCS, făcând astfel fișierul accesibil prin Media Library.
        - **update_post_meta:** Stochează URL-ul GCS ca meta data personalizată pentru atașament, permițând accesarea acestuia mai ușoară în viitor.
        - **Generarea Metadatelor:** Pentru fișierele de tip imagine, se încearcă generarea metadatelor suplimentare folosind `getimagesize` pe URL-ul extern. Acest lucru poate fi limitat, deoarece WordPress așteaptă fișiere locale pentru generarea automată a dimensiunilor imaginilor.

2. **Funcția AJAX `zmw_fetch_media`:**

    ```php
    // Funcție pentru a obține media din Media Library
    function zmw_fetch_media() {
        // Verificăm permisiunile
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'Permisiuni insuficiente.']);
            wp_die();
        }

        // Obțineți ultimele 100 de atașamente (poți ajusta numărul după necesități)
        $args = array(
            'post_type'      => 'attachment',
            'post_status'    => 'inherit',
            'posts_per_page' => 100,
        );

        $query = new WP_Query($args);
        $attachments = $query->posts;

        $media = array();

        foreach ($attachments as $attachment) {
            $file_url = get_post_meta($attachment->ID, '_zmw_cdn_url', true);
            if (!$file_url) {
                // Dacă nu există meta data pentru URL-ul GCS, folosește URL-ul standard
                $file_url = wp_get_attachment_url($attachment->ID);
            }

            $media[] = array(
                'ID'    => $attachment->ID,
                'title' => $attachment->post_title,
                'url'   => $file_url,
            );
        }

        wp_send_json_success($media);
        wp_die();
    }
    add_action('wp_ajax_zmw_fetch_media', 'zmw_fetch_media');
    ```
    - Această funcție obține ultimele 100 de atașamente din Media Library și returnează URL-urile acestora, fie că sunt stocate local sau în GCS.

3. **Scriptul JavaScript `fetchFiles`:**

    ```javascript
    async function fetchFiles() {
        // Fetch din GCS
        const baseUrlGCS = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?key=${apiKey}`;
        // Fetch din Media Library
        const baseUrlMedia = fetchMediaUrl;

        try {
            // Fetch din GCS
            const responseGCS = await fetch(baseUrlGCS);
            const dataGCS = await responseGCS.json();

            // Fetch din Media Library
            const responseMedia = await fetch(baseUrlMedia);
            const dataMedia = await responseMedia.json();

            if (responseGCS.ok && dataMedia.success) {
                document.getElementById('fileManager').style.display = 'block'; // Afișează restul interfeței
                const gallery = document.getElementById('gallery');
                gallery.innerHTML = '';

                // Combinați fișierele din GCS și Media Library
                const allItems = [...(dataGCS.items || []), ...(dataMedia.data || [])];

                if (allItems.length > 0) {
                    allItems.forEach(item => {
                        const fileName = item.name ? item.name.split('/').pop() : item.title;
                        const fileUrl = item.url || item.guid;

                        // Definim tipurile media acceptate
                        const mediaTypes = {
                            'image': /\.(jpeg|jpg|gif|png|bmp|webp)$/i,
                            'video': /\.(mp4|webm|ogg)$/i,
                            'audio': /\.(mp3|wav|ogg)$/i
                            // Adaugă alte tipuri media după necesități
                        };

                        // Verificăm dacă fișierul este de tip media
                        let isMedia = false;
                        let mediaCategory = '';
                        for (const [category, regex] of Object.entries(mediaTypes)) {
                            if (regex.test(fileName)) {
                                isMedia = true;
                                mediaCategory = category;
                                break;
                            }
                        }

                        if (!isMedia) {
                            // Dacă nu este media, nu afișăm fișierul
                            return;
                        }

                        const fileContainer = document.createElement('div');
                        fileContainer.className = 'file-container';

                        if (mediaCategory === 'image') {
                            const linkElement = document.createElement('a');
                            linkElement.href = fileUrl;
                            linkElement.target = '_blank';
                            linkElement.rel = 'noopener noreferrer';

                            const imgElement = document.createElement('img');
                            imgElement.src = fileUrl;
                            imgElement.alt = fileName;
                            imgElement.className = 'w-32 h-32 object-cover rounded';
                            linkElement.appendChild(imgElement);
                            fileContainer.appendChild(linkElement);
                        } else if (mediaCategory === 'video') {
                            const videoElement = document.createElement('video');
                            videoElement.src = fileUrl;
                            videoElement.controls = true;
                            videoElement.className = 'w-32 h-32 object-cover rounded';
                            fileContainer.appendChild(videoElement);
                        } else if (mediaCategory === 'audio') {
                            const audioElement = document.createElement('audio');
                            audioElement.src = fileUrl;
                            audioElement.controls = true;
                            fileContainer.appendChild(audioElement);
                        }

                        // Action buttons
                        const actionIcons = document.createElement('div');
                        actionIcons.className = 'action-icons mt-2 flex space-x-2';

                        // Copy Link Button
                        const copyButton = document.createElement('button');
                        copyButton.className = 'action-button bg-gray-200 p-1 rounded';
                        copyButton.title = 'Copy Link';
                        copyButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-8v2h14V9H7z"/>
                            </svg>
                        `;
                        copyButton.addEventListener('click', function(e) {
                            e.stopPropagation();
                            copyToClipboard(fileUrl);
                            alert('Link copiat în clipboard!');
                        });

                        // Open in New Tab Button for images and videos
                        if (mediaCategory === 'image' || mediaCategory === 'video') {
                            const openButton = document.createElement('button');
                            openButton.className = 'action-button bg-gray-200 p-1 rounded';
                            openButton.title = 'Open in New Tab';
                            openButton.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
                                    <path d="M14 3v2h3.59l-9.3 9.29 1.42 1.42L19 6.41V10h2V3h-9zM5 5v14h14v-9h-2v7H7V7h7V5H5z"/>
                                </svg>
                            `;
                            openButton.addEventListener('click', function(e) {
                                e.stopPropagation();
                                window.open(fileUrl, '_blank');
                            });

                            actionIcons.appendChild(openButton);
                        }

                        actionIcons.appendChild(copyButton);
                        fileContainer.appendChild(actionIcons);
                        gallery.appendChild(fileContainer);
                    });
                } else {
                    gallery.innerHTML = '<p>No media files found in the bucket or Media Library.</p>';
                }
            } else {
                alert('Invalid API Key or no access to bucket.');
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            alert('There was an error fetching the files. Please check your API Key and bucket name.');
        }
    }

    // Funcție pentru a copia textul în clipboard
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy!', err);
        }
        document.body.removeChild(textarea);
    }
</script>
