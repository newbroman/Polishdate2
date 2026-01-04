const CACHE_NAME = 'pl-dates-v12.4'; // Incremented to v11 to force a fresh start
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  /* Main Orchestrator & New Event Logic */
  './app.js',
  './events.js',
  /* Logic Modules */
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

// Install Event - Caches everything immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the new service worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event - Deletes all old caches (v10, v9, etc.)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event - Tries to get the latest from network, falls back to cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
