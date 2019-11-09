//declaring inicial variables
const staticCacheName = 'restaurant-reviews-v1';
const assets = [
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

//When installing the service worker, add all assets to cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(assets)
    })
  );
});

//in the activation stage, remove any old cached versions of the app
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.filter(cacheName => {
      return cacheName.startsWith('restaurant-reviews-') && cacheName != staticCacheName;
    }).map(cacheName => {
      return caches.delete(cacheName);
    }));
  }));
});

//Fetch all pages from cache
self.addEventListener('fetch', event => {
  //handle all requests except GET on the client side.
  if (event.request.method !== 'GET') {
    console.log(`{event.request.method} ignored for the URL: {event.request.url}`);
    return;
  }
  //when a page is served, we fetch it from the cache first
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      //if a page is found in cache, serve it to the user, otherwise fetch it from the network
      return response || caches.open(staticCacheName).then(cache => { //opened the cache to save our fetched request from the network
        return fetch(event.request).then(response => {
          //clone the page and save it to the cache for future visits
          cache.put(event.request, response.clone());
          //then return it to the user
          return response;
        });
      });
    }).catch((er) => {
      //if the page failed to load from cache or the network, show a generic fallback
      return new Response('Oops! You\'re offline, and there\'s no cached version of this page. ' + er);
    })
  );
});

//this listens to the update message to trigger a service worker update
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    console.log('Updating the Service Worker');
    self.skipWaiting();
  }
});