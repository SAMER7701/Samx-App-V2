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

  // إذا لم يكن D1 مفعل بعد، لا تسبب أي خطأ بل أرجع استجابة مرنة
  if (!env || !env.DB) {
    return new Response(
      JSON.stringify({
        success: true,
        data: null,
        bindingConfigured: false,
        message: 'D1 binding (DB) is not attached yet in Cloudflare dashboard',
      }),
      { headers }
    );
  }

  const db = env.DB;

  try {
    // 1. إنشاء الجدول تلقائياً إن لم يكن موجوداً
    await db.exec(`
      CREATE TABLE IF NOT EXISTS samx_sync (
        id TEXT PRIMARY KEY,
        payload TEXT NOT NULL,
        version TEXT,
        updated_at INTEGER NOT NULL
      );
    `);

    // 2. معالجة طلب الحفظ (POST)
    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
          status: 400,
          headers,
        });
      }

      let incomingPayload = body.payload || body;
      if (typeof incomingPayload === 'string') {
        try { incomingPayload = JSON.parse(incomingPayload); } catch (e) {}
      }

      // قراءة السجل المخزن حالياً لضمان عدم مسح أي مستخدم (مثل samg) أو جدول تارجت بالخطأ
      let mergedPayload = { ...incomingPayload };
      try {
        const existingRow = await db.prepare('SELECT payload FROM samx_sync WHERE id = ?').bind('latest').first();
        if (existingRow && existingRow.payload) {
          let oldData = existingRow.payload;
          if (typeof oldData === 'string') {
            try { oldData = JSON.parse(oldData); } catch (e) {}
          }
          if (oldData && typeof oldData === 'object') {
            // 1. حماية ودمج المستخدمين: لا يُحذف أي مستخدم موجود في السحابة مسبقاً
            if (Array.isArray(oldData.users) && oldData.users.length > 0) {
              const userMap = new Map();
              // أضف المستخدمين القدامى أولاً
              oldData.users.forEach(u => {
                if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
              });
              // ثم حدّث بالمستخدمين الجدد القادمين
              (incomingPayload.users || []).forEach(u => {
                if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
              });
              mergedPayload.users = Array.from(userMap.values());
            }

            // 2. حماية ودمج جدول التارجت اليومي
            if (oldData.daily && typeof oldData.daily === 'object') {
              mergedPayload.daily = { ...oldData.daily, ...(incomingPayload.daily || {}) };
            }

            // 3. حماية التارجت الشهري
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
      const version = body.version || '23.29.0';
      const now = Date.now();

      await db.prepare(`
        INSERT INTO samx_sync (id, payload, version, updated_at)
        VALUES ('latest', ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          payload = excluded.payload,
          version = excluded.version,
          updated_at = excluded.updated_at
      `).bind(payloadStr, version, now).run();

      return new Response(
        JSON.stringify({
          success: true,
          bindingConfigured: true,
          updated_at: now,
          version,
        }),
        { headers }
      );
    }

    // 3. معالجة طلب القراءة (GET)
    if (request.method === 'GET') {
      const row = await db.prepare('SELECT payload, version, updated_at FROM samx_sync WHERE id = ?')
        .bind('latest')
        .first();

      if (!row) {
        return new Response(
          JSON.stringify({
            success: true,
            bindingConfigured: true,
            data: null,
            updated_at: null,
            message: 'Database is empty',
          }),
          { headers }
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
          bindingConfigured: true,
          data: parsedData,
          version: row.version,
          updated_at: row.updated_at,
        }),
        { headers }
      );
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  } catch (err) {
    console.error('[Worker D1 Error]:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        bindingConfigured: true,
      }),
      { status: 500, headers }
    );
  }
}
