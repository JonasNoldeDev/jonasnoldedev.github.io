// service worker
var currentCacheVersion = 'codi-lernapp-v2';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(currentCacheVersion).then(function (cache) {
            return cache.addAll([
                '/',
            ]);
        })
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
self.addEventListener('activate', function (event) {
    var cacheWhitelist = [currentCacheVersion];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});