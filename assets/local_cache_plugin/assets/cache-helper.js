// cache-helper.js

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
        .then((registration) => {
            console.log('Service Worker înregistrat: ', registration);
        })
        .catch((error) => {
            console.error('Eroare la înregistrarea Service Worker-ului:', error);
        });
    }
});
