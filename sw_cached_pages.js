const cacheName = 'v1';
const cacheExpirationTime = 30; // Cache expiration time in seconds

const cacheAssets = [
    'index.html',
    '/css/main.css',
    '/js/script.js',
    '/img/image-a.webp',
    '/img/image-b.webp',
    '/img/image-c.webp',
    '/img/image-d.webp',
    '/img/image-e.webp',
    '/img/image-f.webp',
    '/img/image-g.webp',
    '/img/image-h.webp',
    '/img/image-i.webp'
];

// Call service worker install event
self.addEventListener('install', (e) => {
    console.log("Service worker installed");

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log(`Service Worker: Caching Files`);
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call service worker activate event
self.addEventListener('activate', (e) => {
    console.log("Service worker activated");

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call service worker fetch to serve cached assets
self.addEventListener('fetch', e => {
    console.log("Service worker fetching");

    e.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(e.request).then(cacheResponse => {
                // Check if cacheResponse exists and it's not expired
                if (cacheResponse && !isCacheExpired(cacheResponse)) {
                    console.log('Found in cache:', e.request.url);
                    return cacheResponse; // Return cached response
                }

                // If the resource is not found in the cache or expired, fetch it from the network
                return fetch(e.request).then(networkResponse => {
                    // Clone the response
                    const responseClone = networkResponse.clone();
                    // Open the cache and add the network response to it
                    cache.put(e.request, responseClone);
                    return networkResponse;
                }).catch(error => {
                    console.error('Error fetching from network:', error);
                    // Return the cached response if available
                    return cacheResponse || new Response('Cache is unavailable. Please check your internet connection.');
                });
            });
        })
    );
});

// Helper function to check if cache response is expired
function isCacheExpired(response) {
    const cacheDate = new Date(response.headers.get('date'));
    const currentDate = new Date();
    const timeDiffInSeconds = (currentDate - cacheDate) / 1000;
    return timeDiffInSeconds > cacheExpirationTime;
}
