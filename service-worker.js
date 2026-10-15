// ================================================================
//  SAMX — Service Worker v23.9.0
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
//  يعمل: Cache-First للأصول، Offline-First، تحديث تلقائي
// ================================================================

const CACHE_VERSION = 'samx-v23.12.3';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_RUNTIME = `${CACHE_VERSION}-runtime`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js',
    './samx-logo.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './libs/vue.global.prod.js',
  './libs/chart.umd.min.js',
  './libs/jspdf.umd.min.js',
  './libs/jspdf.plugin.autotable.min.js',
  // ⭐ v23.9: xlsx يُحمَّل Lazy — لا يُخزَّن مسبقاً
  // (يُخزَّن تلقائياً عند أول استخدام عبر runtime cache)
  // ⭐ v23.9: html2canvas محلي (مشاركة البطاقة كصورة)
  './libs/html2canvas.min.js',
  './libs/html-to-image.min.js',
  './seed-data.js',
  // ⭐ v23.9: الخطوط — ضرورية للعمل offline
  './libs/cairo-base64.css',
  './libs/i18n/ar.js',
  './libs/i18n/en.js',
  './libs/i18n/index.js',
  './libs/Amiri-Regular.ttf',
  './libs/fonts/cairo/Cairo-Regular.ttf',
  './libs/fonts/cairo/Cairo-SemiBold.ttf',
  './libs/fonts/cairo/Cairo-Bold.ttf',
  './libs/fonts/cairo/Cairo-Black.ttf',
];

// ================================================================
//  INSTALL
// ================================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing SAMX v23.9...');
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_STATIC);
      const results = await Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Failed to cache:', url, err);
            throw err;
          })
        )
      );
      const failed = results.filter(r => r.status === 'rejected').length;
      if (failed > 0) {
        console.warn(`[SW] ${failed} / ${STATIC_ASSETS.length} assets failed to cache (proceeding anyway)`);
      } else {
        console.log(`[SW] ✅ All ${STATIC_ASSETS.length} assets cached`);
      }
      await self.skipWaiting();
    })()
  );
});

// ================================================================
//  ACTIVATE
// ================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating SAMX v23.9...');
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(key =>
            (key.startsWith('samx-') || key.startsWith('shiaka-')) &&
            key !== CACHE_STATIC &&
            key !== CACHE_RUNTIME
          )
          .map(key => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// ================================================================
//  FETCH
// ================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;
  if (url.protocol === 'chrome-extension:') return;

  if (url.origin === location.origin) {
    event.respondWith(handleSameOrigin(request));
    return;
  }

  event.respondWith(handleCrossOrigin(request));
});

// ================================================================
//  Same-origin handler
// ================================================================
async function handleSameOrigin(request) {
  const cached = await caches.match(request);

  if (cached) {
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          caches.open(CACHE_RUNTIME).then(cache => cache.put(request, response.clone()));
        }
      })
      .catch(() => { /* offline — ignore */ });
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const clone = response.clone();
      caches.open(CACHE_RUNTIME).then(cache => cache.put(request, clone));
    }
    return response;
  } catch (err) {
    return offlineFallback(request);
  }
}

// ================================================================
//  Cross-origin handler
// ================================================================
async function handleCrossOrigin(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const clone = response.clone();
      caches.open(CACHE_RUNTIME).then(cache => cache.put(request, clone));
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

// ================================================================
//  Offline fallback
// ================================================================
async function offlineFallback(request) {
  if (request.headers.get('accept')?.includes('text/html')) {
    const html = await caches.match('./index.html');
    if (html) return html;
    return new Response(
      '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>غير متصل - SAMX</title></head>' +
      '<body style="background:#0b1220;color:#e6c074;font-family:system-ui,sans-serif;' +
      'display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;' +
      'text-align:center;padding:20px;">' +
      '<div><h1 style="font-size:48px;margin:0 0 12px;">📡</h1>' +
      '<h2 style="color:#fff;margin:0 0 8px;">غير متصل بالإنترنت</h2>' +
      '<p style="color:#94a3b8;margin:0;">افتح التطبيق مرة أخرى عندما تكون متصلاً.</p>' +
      '</div></body></html>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  if (request.destination === 'script') {
    return new Response('// offline', {
      status: 503,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
    });
  }

  if (request.destination === 'style') {
    return new Response('/* offline */', {
      status: 503,
      headers: { 'Content-Type': 'text/css; charset=utf-8' }
    });
  }

  if (request.destination === 'image') {
    return new Response('', {
      status: 503,
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }

  return new Response('', { status: 503, statusText: 'Offline' });
}

// ================================================================
//  MESSAGES
// ================================================================
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }

  if (event.data.type === 'CLEAR_RUNTIME_CACHE') {
    caches.delete(CACHE_RUNTIME).then(() => {
      event.ports[0]?.postMessage({ cleared: true });
    });
  }
});

console.log('[SW] SAMX v23.12.3 loaded ✅');
