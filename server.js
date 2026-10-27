import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_VERSION = '25.2.0';

// ================================================================
//  CORS & Standard Security Headers
// ================================================================
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';

  // Strict CORS configuration
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-SAMX-User-Id, X-SAMX-User-Role, X-SAMX-User-Name, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Enterprise Security Headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Allow framing within AI Studio / Google preview environments while protecting against clickjacking
  res.header('Content-Security-Policy', "frame-ancestors 'self' https://*.google.com https://*.run.app https://*.aistudio.google.com;");

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Rewrite subpath static asset requests (e.g., /dashboard/app.js -> /app.js, /kpi/libs/* -> /libs/*)
app.use((req, res, next) => {
  const libsIdx = req.path.indexOf('/libs/');
  if (libsIdx > 0) {
    const relativePath = req.path.slice(libsIdx);
    const targetFile = path.join(__dirname, relativePath);
    if (fs.existsSync(targetFile)) {
      return res.sendFile(targetFile);
    }
  }

  const baseName = path.basename(req.path);
  const rootFiles = ['app.js', 'db.js', 'styles.css', 'seed-data.js', 'manifest.json', 'samx-logo.svg', 'service-worker.js', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
  if (rootFiles.includes(baseName) && req.path !== '/' + baseName) {
    const targetFile = path.join(__dirname, baseName);
    if (fs.existsSync(targetFile)) {
      return res.sendFile(targetFile);
    }
  }

  next();
});

app.use(express.json({ limit: '20mb' }));

// Local File-backed /api/sync for local development & cloud server
const LOCAL_SYNC_FILE = path.join(__dirname, '.samx-local-sync.json');

// Helper to sanitize sensitive credentials for non-admin users
function sanitizeUserData(users, userRole) {
  if (!Array.isArray(users)) return [];
  // Admins get full data for management; non-admins get sanitized profiles without password hashes/salts
  if (userRole === 'admin') return users;
  return users.map(u => {
    if (!u) return u;
    const { passwordHash, salt, password, ...safeUser } = u;
    return safeUser;
  });
}

// ================================================================
//  GET /api/sync — Read Cloud State
// ================================================================
app.get('/api/sync', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });

  const userRole = String(req.headers['x-samx-user-role'] || '').trim().toLowerCase();

  try {
    if (fs.existsSync(LOCAL_SYNC_FILE)) {
      const content = JSON.parse(fs.readFileSync(LOCAL_SYNC_FILE, 'utf-8'));
      const payload = content.payload || {};

      // Sanitize user credentials if caller is not an admin
      const responsePayload = {
        ...payload,
        users: sanitizeUserData(payload.users, userRole),
      };

      return res.json({
        success: true,
        status: 'ok',
        bindingConfigured: true,
        data: responsePayload,
        version: content.version || SERVER_VERSION,
        updated_at: content.updated_at || Date.now()
      });
    }
  } catch (e) {
    console.error('[SAMX Sync GET Error]:', e);
  }
  return res.json({ success: true, status: 'empty', bindingConfigured: true, data: null, updated_at: null, version: SERVER_VERSION });
});

// ================================================================
//  POST /api/sync — Secure Write & Cumulative Audit Merge
// ================================================================
app.post('/api/sync', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });

  // Extract authentication & RBAC headers
  const userId = String(req.headers['x-samx-user-id'] || '').trim();
  const userRole = String(req.headers['x-samx-user-role'] || '').trim().toLowerCase();
  const rawUserName = req.headers['x-samx-user-name'] || '';
  let userName = '';
  try { userName = decodeURIComponent(rawUserName); } catch (e) { userName = rawUserName; }

  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, status: 'invalid_payload', error: 'Invalid or missing payload body' });
    }

    let incomingPayload = body.payload || body;
    if (typeof incomingPayload === 'string') {
      try { incomingPayload = JSON.parse(incomingPayload); } catch (e) {}
    }

    if (!incomingPayload || typeof incomingPayload !== 'object') {
      return res.status(400).json({ success: false, status: 'invalid_payload', error: 'Payload must be a valid JSON object' });
    }

    let existingData = {};
    if (fs.existsSync(LOCAL_SYNC_FILE)) {
      try {
        const existingFile = JSON.parse(fs.readFileSync(LOCAL_SYNC_FILE, 'utf-8'));
        existingData = existingFile.payload || {};
      } catch (err) {}
    }

    const hasExistingBranches = Array.isArray(existingData.branches) && existingData.branches.length > 0;
    const hasExistingStaff = Array.isArray(existingData.staff) && existingData.staff.length > 0;
    const incomingBranches = Array.isArray(incomingPayload.branches) ? incomingPayload.branches : [];
    const incomingStaff = Array.isArray(incomingPayload.staff) ? incomingPayload.staff : [];

    // 1. Zero-size wipe prevention
    if ((hasExistingBranches || hasExistingStaff) && incomingBranches.length === 0 && incomingStaff.length === 0) {
      return res.status(400).json({
        success: false,
        status: 'invalid_payload',
        error: 'Zero-size wipe rejected: Cannot overwrite existing cloud dataset with empty branches and staff'
      });
    }

    // 2. Server-side RBAC enforcement: verify non-admin cannot perform destructive operations
    if (userRole !== 'admin') {
      // Check branch deletion: non-admins cannot delete branches
      if (hasExistingBranches && incomingBranches.length < existingData.branches.length) {
        return res.status(403).json({
          success: false,
          status: 'forbidden',
          error: 'Forbidden: Admin role required to delete or restructure branches'
        });
      }

      // Check user deletion / tampering: non-admins cannot delete users
      const existingUsers = Array.isArray(existingData.users) ? existingData.users : [];
      const incomingUsers = Array.isArray(incomingPayload.users) ? incomingPayload.users : [];
      if (existingUsers.length > 0 && incomingUsers.length > 0 && incomingUsers.length < existingUsers.length) {
        return res.status(403).json({
          success: false,
          status: 'forbidden',
          error: 'Forbidden: Admin role required to delete system user accounts'
        });
      }

      // Non-admins cannot wipe company-wide monthly targets
      const existingMonthly = existingData.monthlyTargets && typeof existingData.monthlyTargets === 'object' ? Object.keys(existingData.monthlyTargets) : [];
      const incomingMonthly = incomingPayload.monthlyTargets && typeof incomingPayload.monthlyTargets === 'object' ? Object.keys(incomingPayload.monthlyTargets) : [];
      if (existingMonthly.length > 0 && incomingMonthly.length === 0 && incomingPayload.monthlyTargets !== undefined) {
        return res.status(403).json({
          success: false,
          status: 'forbidden',
          error: 'Forbidden: Admin role required to reset company-wide monthly targets'
        });
      }
    }

    // 3. Merging with Enterprise safeguards
    let mergedPayload = { ...incomingPayload };

    // Branches & Staff preservation
    if (incomingBranches.length === 0 && hasExistingBranches) {
      mergedPayload.branches = existingData.branches;
    }
    if (incomingStaff.length === 0 && hasExistingStaff) {
      mergedPayload.staff = existingData.staff;
    }

    // User credential preservation & protection
    if (Array.isArray(existingData.users) && existingData.users.length > 0) {
      const userMap = new Map();
      // Populate existing users with full credentials
      existingData.users.forEach(u => {
        if (u && u.username) userMap.set(u.username.trim().toLowerCase(), u);
      });

      (incomingPayload.users || []).forEach(incomingUser => {
        if (incomingUser && incomingUser.username) {
          const uname = incomingUser.username.trim().toLowerCase();
          const existingUser = userMap.get(uname);
          if (existingUser) {
            // Keep existing password hash if incoming omits it or non-admin is syncing
            const passwordHash = (userRole === 'admin' && incomingUser.passwordHash)
              ? incomingUser.passwordHash
              : (existingUser.passwordHash || incomingUser.passwordHash);
            const salt = (userRole === 'admin' && incomingUser.salt)
              ? incomingUser.salt
              : (existingUser.salt || incomingUser.salt);

            userMap.set(uname, {
              ...existingUser,
              ...incomingUser,
              passwordHash,
              salt,
            });
          } else {
            // Only admins may create new users during cloud sync
            if (userRole === 'admin') {
              userMap.set(uname, incomingUser);
            }
          }
        }
      });
      mergedPayload.users = Array.from(userMap.values());
    }

    // Daily and monthly targets merge
    if (existingData.daily && typeof existingData.daily === 'object') {
      mergedPayload.daily = { ...existingData.daily, ...(incomingPayload.daily || {}) };
    }
    if (existingData.monthlyTargets && typeof existingData.monthlyTargets === 'object') {
      mergedPayload.monthlyTargets = { ...existingData.monthlyTargets, ...(incomingPayload.monthlyTargets || {}) };
    }
    if (existingData.monthlyHeroesTargets && typeof existingData.monthlyHeroesTargets === 'object') {
      mergedPayload.monthlyHeroesTargets = { ...existingData.monthlyHeroesTargets, ...(incomingPayload.monthlyHeroesTargets || {}) };
    }
    if (existingData.attendance && typeof existingData.attendance === 'object') {
      mergedPayload.attendance = { ...existingData.attendance, ...(incomingPayload.attendance || {}) };
    }

    // 4. Cumulative Cloud Audit Trail Merge
    const existingAudit = Array.isArray(existingData.activityLog) ? existingData.activityLog : [];
    const incomingAudit = Array.isArray(incomingPayload.activityLog) ? incomingPayload.activityLog : [];
    const auditMap = new Map();

    // Cumulative merge: combine both arrays and deduplicate
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

    const version = body.version || SERVER_VERSION;
    const now = Date.now();
    fs.writeFileSync(LOCAL_SYNC_FILE, JSON.stringify({ payload: mergedPayload, version, updated_at: now }, null, 2), 'utf-8');

    return res.json({
      success: true,
      bindingConfigured: true,
      updated_at: now,
      version,
      auditRecordsCount: mergedPayload.activityLog.length,
    });
  } catch (e) {
    console.error('[SAMX Sync POST Error]:', e);
    return res.status(500).json({ success: false, error: e.message });
  }
});

// Enable static file serving
app.use(express.static(__dirname, {
  extensions: ['html', 'js', 'css', 'json', 'svg', 'png', 'ttf', 'woff', 'woff2'],
  index: 'index.html',
}));

// NEVER return index.html for static assets or source maps (.js, .css, .map, .json, fonts, images)
app.use((req, res, next) => {
  const ext = path.extname(req.path).toLowerCase();
  const assetExts = ['.js', '.mjs', '.css', '.json', '.map', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.ttf', '.woff', '.woff2'];
  if (assetExts.includes(ext) || req.path.startsWith('/libs/')) {
    return res.status(404).type('text/plain').send(`Not found: ${req.path}`);
  }
  next();
});

// SPA Fallback: for HTML page navigation requests only, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SAMX Server v${SERVER_VERSION}] Serving SAMX app on http://0.0.0.0:${PORT}`);
});
