// service-worker.js

const CACHE_NAME = 'local-cache-v1';
const URLS_TO_CACHE = [
    '/', // Cachează pagina principală
    // Adaugă orice scripturi specifice
    '/wp-content/themes/woodmart/style.css',
    '/wp-content/themes/woodmart/style.min.css',
    '/wp-includes/css/dist/block-library/style.min.css',
    '/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks.css',
    '/wp-content/plugins/local_cache_plugin/assets/cache-helper.js',
    // Alte scripturi și CSS care trebuie cache-uite
];

// Instalarea Service Worker-ului și adăugarea resurselor în cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache-ul local a fost deschis');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Activarea și curățarea vechilor cache-uri dacă este cazul
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Ștergem vechiul cache: ', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptarea cererilor de rețea și servirea din cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Dacă resursa se află în cache, o returnăm
                }
                return fetch(event.request); // Dacă nu, o cerem de la server
            })
    );
});
