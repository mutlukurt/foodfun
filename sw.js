// Basic Service Worker for FoodFun Restaurant
const CACHE_NAME = 'foodfun-v1';
const urlsToCache = [
  '/foodfun/',
  '/foodfun/index.html',
  '/foodfun/assets/index.css',
  '/foodfun/assets/index.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
