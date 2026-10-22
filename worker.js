// ================================================================
//  SAMX Cloudflare Worker — worker.js
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
//  يدمج تقديم الأصول الثابتة (Static Assets) مع نقطة مزامنة D1 (/api/sync)
// ================================================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // معالجة مسار المزامنة السحابية /api/sync
    if (url.pathname === '/api/sync') {
      return handleSync(request, env);
    }

    // إذا كان الطلب يبدأ بـ /api/ ولم يتم التعرف عليه
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // تمرير كافة الطلبات الأخرى للأصول الثابتة (Static Assets)
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Assets binding unavailable', { status: 500 });
  },
};

async function handleSync(request, env) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // 1. فحص وجود D1 مع إرجاع استجابة JSON واضحة لمنع انهيار الخادم بـ 500
  if (!env || !env.DB) {
    return new Response(
      JSON.stringify({
        success: true,
        status: 'unconfigured',
        data: null,
        bindingConfigured: false,
        message: 'D1 binding (DB) is not attached yet in Cloudflare dashboard',
      }),
      { status: 200, headers }
    );
  }

  const db = env.DB;

  try {
    // 2. إنشاء الجدول الموحد النظيف samx_cloud_state بأعمدة واضحة ومطابقة لمنع أخطاء SQL
    try {
      await db.prepare('CREATE TABLE IF NOT EXISTS samx_cloud_state (id TEXT PRIMARY KEY, payload TEXT, updated_at INTEGER)').run();
    } catch (tableErr) {
      console.warn('[D1 Table Init Warning]:', tableErr);
    }

    // 3. معالجة طلب الحفظ (POST)
    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ success: false, status: 'error', error: 'Invalid JSON body' }), {
          status: 200,
          headers,
        });
      }

      let incomingPayload = body.payload || body;
      if (typeof incomingPayload === 'string') {
        try { incomingPayload = JSON.parse(incomingPayload); } catch (e) {}
      }

      // دمج آمن ومحصن مع السجل المحفوظ حالياً لضمان عدم مسح أي مستخدم (مثل samg) أو تارجت
      let mergedPayload = { ...incomingPayload };
      try {
        const existingRow = await db.prepare('SELECT payload FROM samx_cloud_state WHERE id = ?')
          .bind('latest')
          .first();

        if (existingRow && existingRow.payload) {
          let oldData = existingRow.payload;
          if (typeof oldData === 'string') {
            try { oldData = JSON.parse(oldData); } catch (e) {}
          }
          if (oldData && typeof oldData === 'object') {
            // أ. حماية المستخدمين
            if (Array.isArray(oldData.users) && oldData.users.length > 0) {
              const userMap = new Map();
              oldData.users.forEach(u => {
                if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
              });
              (incomingPayload.users || []).forEach(u => {
                if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
              });
              mergedPayload.users = Array.from(userMap.values());
            }

            // ب. حماية جدول التارجت اليومي المستورد من الإكسل
            if (oldData.daily && typeof oldData.daily === 'object') {
              mergedPayload.daily = { ...oldData.daily, ...(incomingPayload.daily || {}) };
            }

            // ج. حماية التارجت الشهري
            if (oldData.monthlyTargets && typeof oldData.monthlyTargets === 'object') {
              mergedPayload.monthlyTargets = { ...oldData.monthlyTargets, ...(incomingPayload.monthlyTargets || {}) };
            }
            if (oldData.monthlyHeroesTargets && typeof oldData.monthlyHeroesTargets === 'object') {
              mergedPayload.monthlyHeroesTargets = { ...oldData.monthlyHeroesTargets, ...(incomingPayload.monthlyHeroesTargets || {}) };
            }
          }
        }
      } catch (mergeErr) {
        console.warn('[D1 SafeMerge Warning]:', mergeErr);
      }

      const payloadStr = JSON.stringify(mergedPayload);
      const now = Date.now();

      await db.prepare('INSERT INTO samx_cloud_state (id, payload, updated_at) VALUES (\'latest\', ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at')
        .bind(payloadStr, now)
        .run();

      return new Response(
        JSON.stringify({
          success: true,
          status: 'saved',
          bindingConfigured: true,
          updated_at: now,
          version: body.version || '23.33.0',
        }),
        { status: 200, headers }
      );
    }

    // 4. معالجة طلب القراءة (GET)
    if (request.method === 'GET') {
      let row = null;
      try {
        row = await db.prepare('SELECT payload, updated_at FROM samx_cloud_state WHERE id = ?')
          .bind('latest')
          .first();
      } catch (getErr) {
        // فحص تراجعي للجدول القديم samx_sync إن وُجد
        try {
          row = await db.prepare('SELECT payload, updated_at FROM samx_sync WHERE id = ?')
            .bind('latest')
            .first();
        } catch (e) {}
      }

      // إذا كان الجدول فارغاً — إرجاع 200 OK صريحة مع status: empty
      if (!row || !row.payload) {
        return new Response(
          JSON.stringify({
            success: true,
            status: 'empty',
            bindingConfigured: true,
            data: null,
            updated_at: null,
            message: 'Database is empty',
          }),
          { status: 200, headers }
        );
      }

      let parsedData = null;
      try {
        parsedData = JSON.parse(row.payload);
      } catch (e) {
        parsedData = row.payload;
      }

      return new Response(
        JSON.stringify({
          success: true,
          status: 'ok',
          bindingConfigured: true,
          data: parsedData,
          updated_at: row.updated_at || Date.now(),
        }),
        { status: 200, headers }
      );
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  } catch (err) {
    console.error('[Worker D1 Error]:', err);
    // إرجاع كائن JSON دقيق مع رسالة الخطأ وبحالة 200 لتجنب انهيار الـ HTTP 500
    return new Response(
      JSON.stringify({
        success: false,
        status: 'error',
        error: err.message || String(err),
        bindingConfigured: true,
      }),
      { status: 200, headers }
    );
  }
}
