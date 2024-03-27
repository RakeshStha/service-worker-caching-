// //Caching the whole site

// const cacheName = 'v2';

// // Call service worker install events
// //Handle cache assets
// self.addEventListener('install', (e) => {
//     console.log("Service worker installed")

// })


// // Call service worker activate event
// self.addEventListener('activate', (e) => {
//     console.log("Service worker activated")

//     //Removed unwanted cache
//     e.waitUntil(
//         caches.keys().then(res => {
//             return Promise.all(
//                 res.map(cache => {
//                     if(cache !== cacheName){
//                         console.log('Service worker clearing old cache')
//                         return caches.delete(cache)
//                     }
//                 })
//             )
//         })
//     )
// })


// // Call service worker fetch to view caches assets
// self.addEventListener('fetch', e => {
//     console.log("Service worker fetching");
//     //Check live site  if not then cache site
//     e.respondWith(
//        fetch(e.request)
//        .then(res => {
//         //make a copy/clone of response
//         const resClone = res.clone();
//         //Open a cache
//         caches.open(cacheName)
//         .then(cache => {
//             // Add the response to the cache
//             cache.put(e.request, resClone);
//         })
//         return res;
//        }).catch(err => caches.match(e.request)).then(res => res)
//     )
// })
