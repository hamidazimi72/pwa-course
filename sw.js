// comment 12

const cacheVersion = 2;

const activeCaches = {
  "static-assets": `static-assets-v${cacheVersion}`,
};

self.addEventListener("install", (event) => {
  console.log("service worker successfully installed!");
  self.skipWaiting();

  event.waitUntil(
    caches.open(activeCaches["static-assets"]).then((cache) => {
      const assets = ["/", "css/style.css", "js/app.js", "js/code.js"];
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("service worker successfully activated!");

  const activeCachesName = Object.values(activeCaches);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!activeCachesName.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          // return undefined;
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event?.request).then((res) => {
      if (res) {
        return res;
      } else {
        return fetch(event?.request);
      }
    })
  );
});
