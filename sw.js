/**
 * sw.js - Service Worker for Polish Date Master
 * Handles offline caching for standalone app performance.
 */

const CACHE_NAME = 'pl-date-v685
  ';

// All files required for the app to function offline
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './events.js',
  './ui-renderer.js',
  './phonetics.js',
  './numbers.js',
  './audio.js',
  './holiday.js',
  './cultural.js',
  './rules.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Install Event: Cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Caching all assets');
      return cache.addAll(ASSETS);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate Event: Clean up old versions of the cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('PWA: Clearing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached version if we have it, otherwise hit the network
      return cachedResponse || fetch(event.request);
    })
  );
});
