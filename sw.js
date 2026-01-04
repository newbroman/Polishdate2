const CACHE_NAME = 'pl-dates-v11.1'; // Increment version to force update
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  /* Main Orchestrator */
  './app.js',
  /* New Logic Modules */
  './navigation.js',
  './ui-renderer.js',
  './calendar-core.js',
  /* Data Modules */
  './cultural.js',
  './holiday.js',
  './phonetics.js',
  './rules.js',
  './numbers.js',
  './year.js',
  /* Icons */
  './icon-192.png',
  './icon-512.png'
];

// Install Event - Caches all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event - Cleans up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event - Offline-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
