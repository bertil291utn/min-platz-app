const CACHE_NAME = 'min-platz-cache-v1';
const DYNAMIC_CACHE = 'min-platz-dynamic-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/static/css/',
  '/static/js/',
  '/assets/',
  // Cache all redux state
  'bloques-data',
  'mallas-monitored',
  'placas-monitored',
  'camas-monitored',
  'user-auth',
  'user-set'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (res) => {
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
          }
        );
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

// Handle offline functionality
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});