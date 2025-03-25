const CACHE_NAME = 'min-platz-cache-v1';
const DYNAMIC_CACHE = 'min-platz-dynamic-v1';

// Include all routes and assets that need to work offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/*',
  '/static/css/*',
  '/static/js/*',
  // Cache Rose Varieties
  '/api/varieties',
  // Cache Diseases data
  '/api/diseases',
  // Cache local storage keys
  'mallas-monitored',
  'placas-monitored',
  'camas-monitored',
  'bloques-data'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Enhanced fetch event handler for dynamic caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((res) => {
            // Check if we received a valid response
            if (!res || res.status !== 200 || res.type !== 'basic') {
              return res;
            }

            // Clone the response
            const responseToCache = res.clone();

            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return res;
          });
      })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});