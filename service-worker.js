// ================================================================
//  SAMX — Service Worker v23.47.0
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
//  يعمل: Network-First للتنقل مع Fallback للكاش، Offline-First للأصول
// ================================================================

const CACHE_VERSION = 'samx-v23.47.0';
const CACHE_STATIC = `${CACHE_VERSION}-static`;
const CACHE_RUNTIME = `${CACHE_VERSION}-runtime`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
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
  './libs/saudi-riyal-font.css',
  './libs/i18n/ar.js',
  './libs/i18n/en.js',
  './libs/i18n/index.js',
  './libs/Amiri-Regular.ttf',
  './libs/fonts/cairo/Cairo-Regular.ttf',
  './libs/fonts/cairo/Cairo-SemiBold.ttf',
  './libs/fonts/cairo/Cairo-Bold.ttf',
  './libs/fonts/cairo/Cairo-Black.ttf',
  './libs/fonts/saudi-riyal/saudi_riyal.woff2',
  './libs/fonts/saudi-riyal/saudi_riyal.ttf',
  './libs/fonts/saudi-riyal/saudi_riyal_bold.woff2',
  './libs/fonts/saudi-riyal/saudi_riyal_bold.ttf',
];

// ================================================================
//  INSTALL
// ================================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing SAMX v23.33.0...');
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_STATIC);
      const results = await Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Failed to cache:', url, err);
          })
        )
      );
      const failed = results.filter(r => r.status === 'rejected').length;
      if (failed > 0) {
        console.warn(`[SW] ${failed} / ${STATIC_ASSETS.length} assets failed to cache (proceeding anyway)`);
      } else {
        console.log(`[SW] ✅ All ${STATIC_ASSETS.length} assets cached`);
      }
    })()
  );
});

// ================================================================
//  ACTIVATE
// ================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating SAMX v23.36.0...');
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

  // 1. تجاوز قطعي لكافة طلبات الـ API والمزامنة لتمر مباشرة للشبكة بدون اعتراض أو كاش (Cache-Bypass)
  if (url.pathname.includes('/api/') || request.url.includes('/api/')) {
    return;
  }

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
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate' ||
                       request.destination === 'document' ||
                       (request.headers.get('accept') && request.headers.get('accept').includes('text/html'));

  // 1. طلبات فتح التطبيق والتنقل (PWA Launch / Navigation)
  // استراتيجية Network-First مع Cache Fallback إلى index.html
  if (isNavigation) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && networkResponse.status === 200) {
        const clone = networkResponse.clone();
        caches.open(CACHE_STATIC).then(cache => {
          cache.put('/index.html', clone.clone()).catch(() => {});
          cache.put('./index.html', clone.clone()).catch(() => {});
          cache.put('/', clone).catch(() => {});
        }).catch(() => {});
        return networkResponse;
      }
    } catch (netErr) {
      // انقطاع الشبكة
    }

    const cachedPage = (await caches.match('/index.html')) ||
                       (await caches.match('./index.html')) ||
                       (await caches.match('/')) ||
                       (await caches.match('./')) ||
                       (await caches.match(request));

    if (cachedPage) {
      return cachedPage;
    }

    return offlineFallback(request);
  }

  // 2. كود التطبيق الأساسي (app.js و seed-data.js): استراتيجية Network-First صارمة
  // يضمن حصول كافة الهواتف على أحدث كود فور نشره بدون أن يعلق في الكاش القديم
  const isCoreScript = url.pathname.endsWith('app.js') || url.pathname.endsWith('seed-data.js');
  if (isCoreScript) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse && networkResponse.ok) {
        const ct = networkResponse.headers.get('content-type') || '';
        if (!ct.includes('text/html')) {
          const clone = networkResponse.clone();
          caches.open(CACHE_STATIC).then(cache => cache.put(request, clone)).catch(() => {});
          return networkResponse;
        }
      }
    } catch (netErr) {
      // offline — استخدام الكاش المخزن
    }
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match(url.pathname);
    if (fallback) return fallback;
  }

  // 3. باقي الأصول والملفات المحلية (Cache-First + Stale-While-Revalidate)
  const cached = await caches.match(request);

  if (cached) {
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          const ct = response.headers.get('content-type') || '';
          const isScriptOrStyle = request.destination === 'script' || request.destination === 'style' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css');
          if (isScriptOrStyle && ct.includes('text/html')) {
            console.warn('[SW] Shield: Blocked HTML caching for asset:', request.url);
            return;
          }
          caches.open(CACHE_RUNTIME).then(cache => cache.put(request, response.clone()));
        }
      })
      .catch(() => { /* offline — ignore */ });
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const ct = response.headers.get('content-type') || '';
      const isScriptOrStyle = request.destination === 'script' || request.destination === 'style' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css');
      if (isScriptOrStyle && ct.includes('text/html')) {
        console.warn('[SW] Shield: Server returned HTML for script/style. Refusing HTML response:', request.url);
        return new Response('// Asset not found (HTML refused)', {
          status: 404,
          headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
        });
      }
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
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

// ================================================================
//  Offline fallback
// ================================================================
async function offlineFallback(request) {
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate' ||
                       request.destination === 'document' ||
                       request.headers.get('accept')?.includes('text/html');

  if (isNavigation) {
    const html = (await caches.match('/index.html', { ignoreSearch: true })) ||
                 (await caches.match('./index.html', { ignoreSearch: true })) ||
                 (await caches.match('/', { ignoreSearch: true })) ||
                 (await caches.match('./', { ignoreSearch: true }));
    if (html) return html;
    return new Response(
      '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>SAMX</title></head>' +
      '<body style="background:#0b1220;color:#e6c074;font-family:system-ui,sans-serif;' +
      'display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;' +
      'text-align:center;padding:20px;">' +
      '<div><h1 style="font-size:48px;margin:0 0 12px;">🏢</h1>' +
      '<h2 style="color:#fff;margin:0 0 8px;">SAMX</h2>' +
      '<p style="color:#94a3b8;margin:0 0 16px;">جاري تشغيل التطبيق...</p>' +
      '<button onclick="location.reload()" style="background:#d4a84b;color:#0b1220;border:none;padding:10px 20px;border-radius:8px;font-weight:bold;cursor:pointer;">إعادة المحاولة</button>' +
      '</div></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
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

  if (event.data.type === 'CLEAR_ALL_CACHES') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => {
      event.ports[0]?.postMessage({ cleared: true });
    }).catch(() => {
      event.ports[0]?.postMessage({ cleared: false });
    });
  }
});

console.log('[SW] SAMX v23.36.0 loaded ✅');
