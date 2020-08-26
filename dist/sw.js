self.addEventListener('install', event => {
  event.waitUntil(caches.open('demandapp').then(cache => {
    cache.addAll([
      './',
      './index.html',
      './main.js',
      './styles.css',
    ]);
  }));
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    addToCache(event.request, 'demandapp');
    event.respondWith(fromCache(event.request, 'demandapp').then(response => {
      if (response) return response; // fromCache won't error, so whether response exists needs to be checked
      else return fromNetwork(event.request, 'demandapp'); // If the file is not cached, get it from the network
    }));
  }
});

function fromCache(request, cache) { // Get a file from the cache
  return caches.open(cache).then(cache => {
    return cache.match(request);
  });
  
}

function fromNetwork(request) {
  return fetch(request);
}

function addToCache(request, cache) {
  return caches.open(cache).then(cache => {
    fetch(request.clone()).then(response => {
      return cache.put(request, response.clone()).then(() => {
        return response;
      })
    });
  });
}