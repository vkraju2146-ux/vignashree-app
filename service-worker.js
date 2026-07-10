
const CACHE_NAME = "vignashree-sparkle-v7";
const APP_FILES = [
  "./README.txt",
  "./assets/icon-144.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/minnie-photo.jpg",
  "./chapters/reader1.pdf",
  "./chapters/reader2.pdf",
  "./chapters/reader3.pdf",
  "./chapters/reader4.pdf",
  "./chapters/reader5.pdf",
  "./chapters/reader6.pdf",
  "./chapters/reader7.pdf",
  "./chapters/wb1.pdf",
  "./chapters/wb10.pdf",
  "./chapters/wb11.pdf",
  "./chapters/wb12.pdf",
  "./chapters/wb2.pdf",
  "./chapters/wb3.pdf",
  "./chapters/wb4.pdf",
  "./chapters/wb5.pdf",
  "./chapters/wb6.pdf",
  "./chapters/wb7.pdf",
  "./chapters/wb8.pdf",
  "./chapters/wb9.pdf",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
