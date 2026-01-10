const CACHE_NAME = 'pl-date-v825';

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
  './icon-512.png'
];

// Install: Cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Cache-first strategy for speed
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

📄 2. manifest.json

Create a file named manifest.json in your root folder. This tells the phone that this is a "Standalone App" so it hides the browser's address bar and back buttons.
JSON

{
  "name": "Polish Date Master",
  "short_name": "PL Dates",
  "description": "Master Polish dates in Formal and Informal modes.",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#f8f9fa",
  "theme_color": "#e6192e",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
