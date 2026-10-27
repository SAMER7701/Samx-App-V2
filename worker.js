// ================================================================
//  SAMX Cloudflare Worker — worker.js
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
//  يدمج تقديم الأصول الثابتة (Static Assets) مع نقطة مزامنة D1 (/api/sync)
//  إصدار: v25.2.0 — ترقية وتأمين الخادم السحابي والمزامنة التراكمية
// ================================================================

const WORKER_VERSION = '25.2.0';

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

// Helper to sanitize sensitive credentials for non-admin callers
function sanitizeUserData(users, userRole) {
  if (!Array.isArray(users)) return [];
  if (userRole === 'admin') return users;
  return users.map(u => {
    if (!u) return u;
    const { passwordHash, salt, password, ...safeUser } = u;
    return safeUser;
  });
}

async function handleSync(request, env) {
  const origin = request.headers.get('Origin') || '*';
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-SAMX-User-Id, X-SAMX-User-Role, X-SAMX-User-Name, Cache-Control, Pragma',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // 1. فحص وجود D1 مع إرجاع استجابة JSON واضحة لمنع انهيار الخادم
  if (!env || !env.DB) {
    return new Response(
      JSON.stringify({
        success: true,
        status: 'unconfigured',
        data: null,
        bindingConfigured: false,
        version: WORKER_VERSION,
        message: 'D1 binding (DB) is not attached yet in Cloudflare dashboard',
      }),
      { status: 200, headers }
    );
  }

  const db = env.DB;
  const userRole = String(request.headers.get('X-SAMX-User-Role') || '').trim().toLowerCase();
  const userId = String(request.headers.get('X-SAMX-User-Id') || '').trim();

  try {
    // 2. إنشاء الجدول الموحد samx_cloud_state بأعمدة واضحة
    try {
      await db.prepare('CREATE TABLE IF NOT EXISTS samx_cloud_state (id TEXT PRIMARY KEY, payload TEXT, updated_at INTEGER)').run();
    } catch (tableErr) {
      console.warn('[D1 Table Init Warning]:', tableErr);
    }

    // 3. معالجة طلب الحفظ (POST) مع فرض الصلاحيات والتحقق من البيانات
    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ success: false, status: 'invalid_payload', error: 'Invalid JSON body' }), {
          status: 400,
          headers,
        });
      }

      if (!body || typeof body !== 'object') {
        return new Response(JSON.stringify({ success: false, status: 'invalid_payload', error: 'Missing payload object' }), {
          status: 400,
          headers,
        });
      }

      let incomingPayload = body.payload || body;
      if (typeof incomingPayload === 'string') {
        try { incomingPayload = JSON.parse(incomingPayload); } catch (e) {}
      }

      if (!incomingPayload || typeof incomingPayload !== 'object') {
        return new Response(JSON.stringify({ success: false, status: 'invalid_payload', error: 'Payload must be a valid JSON object' }), {
          status: 400,
          headers,
        });
      }

      // جلب السجل المخزن حالياً في السحابة
      let oldData = {};
      try {
        const existingRow = await db.prepare('SELECT payload FROM samx_cloud_state WHERE id = ?')
          .bind('latest')
          .first();

        if (existingRow && existingRow.payload) {
          let parsed = existingRow.payload;
          if (typeof parsed === 'string') {
            try { parsed = JSON.parse(parsed); } catch (e) {}
          }
          if (parsed && typeof parsed === 'object') {
            oldData = parsed;
          }
        }
      } catch (readErr) {
        console.warn('[D1 Read Warning]:', readErr);
      }

      const hasExistingBranches = Array.isArray(oldData.branches) && oldData.branches.length > 0;
      const hasExistingStaff = Array.isArray(oldData.staff) && oldData.staff.length > 0;
      const incomingBranches = Array.isArray(incomingPayload.branches) ? incomingPayload.branches : [];
      const incomingStaff = Array.isArray(incomingPayload.staff) ? incomingPayload.staff : [];

      // أ. حظر المسح الصفري (Zero-Size Wipe Protection)
      if ((hasExistingBranches || hasExistingStaff) && incomingBranches.length === 0 && incomingStaff.length === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            status: 'invalid_payload',
            error: 'Zero-size wipe blocked: incoming payload cannot wipe existing branches and staff',
          }),
          { status: 400, headers }
        );
      }

      // ب. التحقق من الصلاحيات على مستوى الخادم (Server-Side RBAC Enforcement)
      if (userRole !== 'admin') {
        // حظر حذف الفروع لغير المسؤولين
        if (hasExistingBranches && incomingBranches.length < oldData.branches.length) {
          return new Response(
            JSON.stringify({
              success: false,
              status: 'forbidden',
              error: 'Forbidden: Admin role required to delete branches',
            }),
            { status: 403, headers }
          );
        }

        // حظر حذف المستخدمين لغير المسؤولين
        const existingUsers = Array.isArray(oldData.users) ? oldData.users : [];
        const incomingUsers = Array.isArray(incomingPayload.users) ? incomingPayload.users : [];
        if (existingUsers.length > 0 && incomingUsers.length > 0 && incomingUsers.length < existingUsers.length) {
          return new Response(
            JSON.stringify({
              success: false,
              status: 'forbidden',
              error: 'Forbidden: Admin role required to delete user accounts',
            }),
            { status: 403, headers }
          );
        }

        // حظر مسح التارجت الشهري العام
        const existingMonthly = oldData.monthlyTargets && typeof oldData.monthlyTargets === 'object' ? Object.keys(oldData.monthlyTargets) : [];
        const incomingMonthly = incomingPayload.monthlyTargets && typeof incomingPayload.monthlyTargets === 'object' ? Object.keys(incomingPayload.monthlyTargets) : [];
        if (existingMonthly.length > 0 && incomingMonthly.length === 0 && incomingPayload.monthlyTargets !== undefined) {
          return new Response(
            JSON.stringify({
              success: false,
              status: 'forbidden',
              error: 'Forbidden: Admin role required to reset monthly targets',
            }),
            { status: 403, headers }
          );
        }
      }

      // ج. دمج آمن ومحصن للأصول
      let mergedPayload = { ...incomingPayload };

      if (incomingBranches.length === 0 && hasExistingBranches) {
        mergedPayload.branches = oldData.branches;
      }
      if (incomingStaff.length === 0 && hasExistingStaff) {
        mergedPayload.staff = oldData.staff;
      }

      // د. حماية حسابات المستخدمين وبيانات الاعتماد
      if (Array.isArray(oldData.users) && oldData.users.length > 0) {
        const userMap = new Map();
        oldData.users.forEach(u => {
          if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
        });

        (incomingPayload.users || []).forEach(u => {
          if (u && u.username) {
            const uname = u.username.trim().toLowerCase();
            const existingUser = userMap.get(uname);
            if (existingUser) {
              const passwordHash = (userRole === 'admin' && u.passwordHash)
                ? u.passwordHash
                : (existingUser.passwordHash || u.passwordHash);
              const salt = (userRole === 'admin' && u.salt)
                ? u.salt
                : (existingUser.salt || u.salt);

              userMap.set(uname, {
                ...existingUser,
                ...u,
                passwordHash,
                salt,
              });
            } else if (userRole === 'admin') {
              userMap.set(uname, u);
            }
          }
        });
        mergedPayload.users = Array.from(userMap.values());
      }

      // هـ. دمج التارجت واليوميات والحضور
      if (oldData.daily && typeof oldData.daily === 'object') {
        mergedPayload.daily = { ...oldData.daily, ...(incomingPayload.daily || {}) };
      }
      if (oldData.monthlyTargets && typeof oldData.monthlyTargets === 'object') {
        mergedPayload.monthlyTargets = { ...oldData.monthlyTargets, ...(incomingPayload.monthlyTargets || {}) };
      }
      if (oldData.monthlyHeroesTargets && typeof oldData.monthlyHeroesTargets === 'object') {
        mergedPayload.monthlyHeroesTargets = { ...oldData.monthlyHeroesTargets, ...(incomingPayload.monthlyHeroesTargets || {}) };
      }
      if (oldData.attendance && typeof oldData.attendance === 'object') {
        mergedPayload.attendance = { ...oldData.attendance, ...(incomingPayload.attendance || {}) };
      }

      // و. دمج تراكمي لسجل التدقيق السحابي (Cumulative Cloud Audit Trail Merge)
      const existingAudit = Array.isArray(oldData.activityLog) ? oldData.activityLog : [];
      const incomingAudit = Array.isArray(incomingPayload.activityLog) ? incomingPayload.activityLog : [];
      const auditMap = new Map();

      [...incomingAudit, ...existingAudit].forEach(entry => {
        if (!entry) return;
        const key = entry.id || `${entry.timestamp}_${entry.action}`;
        if (!auditMap.has(key)) {
          auditMap.set(key, entry);
        }
      });

      mergedPayload.activityLog = Array.from(auditMap.values())
        .sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0))
        .slice(0, 1000);

      const payloadStr = JSON.stringify(mergedPayload);
      const now = Date.now();
      const version = body.version || WORKER_VERSION;

      await db.prepare('INSERT INTO samx_cloud_state (id, payload, updated_at) VALUES (\'latest\', ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at')
        .bind(payloadStr, now)
        .run();

      return new Response(
        JSON.stringify({
          success: true,
          status: 'saved',
          bindingConfigured: true,
          updated_at: now,
          version,
          auditRecordsCount: mergedPayload.activityLog.length,
        }),
        { status: 200, headers }
      );
    }

    // 4. معالجة طلب القراءة (GET) مع حماية بيانات الاعتماد
    if (request.method === 'GET') {
      let row = null;
      try {
        row = await db.prepare('SELECT payload, updated_at FROM samx_cloud_state WHERE id = ?')
          .bind('latest')
          .first();
      } catch (getErr) {
        try {
          row = await db.prepare('SELECT payload, updated_at FROM samx_sync WHERE id = ?')
            .bind('latest')
            .first();
        } catch (e) {}
      }

      if (!row || !row.payload) {
        return new Response(
          JSON.stringify({
            success: true,
            status: 'empty',
            bindingConfigured: true,
            data: null,
            updated_at: null,
            version: WORKER_VERSION,
            message: 'Database is empty',
          }),
          { status: 200, headers }
        );
      }

      let parsedData = null;
      try {
        parsedData = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
      } catch (e) {
        parsedData = row.payload;
      }

      // حماية كلمات المرور لغير المسؤولين
      if (parsedData && typeof parsedData === 'object' && Array.isArray(parsedData.users)) {
        parsedData = {
          ...parsedData,
          users: sanitizeUserData(parsedData.users, userRole),
        };
      }

      return new Response(
        JSON.stringify({
          success: true,
          status: 'ok',
          bindingConfigured: true,
          data: parsedData,
          version: WORKER_VERSION,
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
    return new Response(
      JSON.stringify({
        success: false,
        status: 'error',
        error: err.message || String(err),
        bindingConfigured: true,
        version: WORKER_VERSION,
      }),
      { status: 200, headers }
    );
  }
}
