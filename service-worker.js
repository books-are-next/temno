/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-4b25a2e';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./resources.html","./temno_001.html","./temno_002.html","./temno_007.html","./temno_008.html","./temno_009.html","./temno_010.html","./temno_011.html","./temno_012.html","./temno_013.html","./temno_014.html","./temno_015.html","./temno_016.html","./temno_017.html","./temno_018.html","./temno_019.html","./temno_020.html","./temno_021.html","./temno_022.html","./temno_023.html","./temno_024.html","./temno_025.html","./temno_026.html","./temno_027.html","./temno_028.html","./temno_029.html","./temno_030.html","./temno_031.html","./temno_032.html","./temno_033.html","./temno_034.html","./temno_035.html","./temno_036.html","./temno_037.html","./temno_038.html","./temno_039.html","./temno_040.html","./temno_041.html","./temno_042.html","./temno_043.html","./temno_044.html","./temno_045.html","./temno_046.html","./temno_047.html","./temno_048.html","./temno_049.html","./temno_050.html","./temno_051.html","./temno_052.html","./temno_053.html","./temno_054.html","./temno_055.html","./temno_056.html","./temno_057.html","./temno_058.html","./temno_059.html","./temno_060.html","./temno_061.html","./temno_062.html","./temno_063.html","./temno_064.html","./temno_065.html","./temno_066.html","./temno_067.html","./temno_068.html","./temno_069.html","./temno_070.html","./temno_071.html","./temno_072.html","./temno_073.html","./temno_074.html","./temno_075.html","./temno_076.html","./temno_077.html","./temno_078.html","./temno_079.html","./temno_080.html","./temno_081.html","./temno_082.html","./resources/image001_fmt.jpeg","./resources/image003_fmt.jpeg","./resources/image004_fmt.jpeg","./resources/index.xml","./resources/obalka_temno_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
