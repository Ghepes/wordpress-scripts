// zmw-fetch.js

document.addEventListener('DOMContentLoaded', function() {
    const uploadUrl = zmw_data.uploadUrl;
    const bucketName = zmw_data.bucketName;
    const apiKey = zmw_data.apiKey;
    const folderName = zmw_data.folderName;
    const fetchMediaUrl = zmw_data.fetchMediaUrl;
    const nonce = zmw_data.nonce;

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
        formData.append('nonce', nonce); // Adaugă nonce pentru securitate

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
            const responseMedia = await fetch(baseUrlMedia, {
                headers: {
                    'X-WP-Nonce': nonce // Trimite nonce-ul pentru securitate
                }
            });
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
