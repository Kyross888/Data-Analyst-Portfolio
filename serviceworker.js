const CACHE_NAME = 'tyrone-portfolio-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/Screenshot 2025-10-16 200027.png',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Space+Mono&display=swap'
];

// Install Event: Caching the assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Portfolio Cache Opened');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event: Cleaning up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event: Serving cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});