// Check support for service worker

if('serviceWorker' in navigator){
   window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('./sw_cached_pages.js')
    .then(reg => console.log("service worker: registered"))
    .catch(err => console.log(`Service worker: Error: ${err}`))

    // navigator.serviceWorker
    // .register('./sw_cached_site.js')
    // .then(reg => console.log("Service worker (cached site): registered"))
    // .catch(err => console.error(`Service worker (cached site): Error: ${err}`));

   })
   
}  