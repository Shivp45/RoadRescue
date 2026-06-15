/* RescueNow Service Worker v1.0 */
const CACHE_NAME = 'rescuenow-v1';
const DYNAMIC_CACHE = 'rescuenow-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/manifest.json',
];

/* Install - cache static assets */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      console.log('[SW] Some assets failed to cache, continuing...');
    })
  );
  self.skipWaiting();
});

/* Activate - clean old caches */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* Fetch strategy: Cache-first for static, Network-first for API */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* API calls: Network first, cache fallback */
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  /* Static assets: Cache first */
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).then((response) => {
        const cloned = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => cache.put(request, cloned));
        return response;
      });
    }).catch(() => {
      if (request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});

/* Background Sync for emergency alerts when offline */
self.addEventListener('sync', (event) => {
  if (event.tag === 'emergency-alert') {
    event.waitUntil(sendPendingAlerts());
  }
});

async function sendPendingAlerts() {
  try {
    const pending = await getPendingAlerts();
    for (const alert of pending) {
      await fetch('/api/emergency/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      });
    }
  } catch (err) {
    console.error('[SW] Failed to sync alerts:', err);
  }
}

async function getPendingAlerts() {
  return [];
}

/* Push Notifications */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'RescueNow Alert', {
      body: data.body || 'Emergency notification',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [200, 100, 200, 100, 200],
      data: { url: data.url || '/' },
      actions: [
        { action: 'view', title: 'View Details' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});