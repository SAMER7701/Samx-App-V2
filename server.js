import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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
  const rootFiles = ['app.js', 'styles.css', 'seed-data.js', 'manifest.json', 'samx-logo.svg', 'service-worker.js', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
  if (rootFiles.includes(baseName) && req.path !== '/' + baseName) {
    const targetFile = path.join(__dirname, baseName);
    if (fs.existsSync(targetFile)) {
      return res.sendFile(targetFile);
    }
  }

  next();
});

app.use(express.json({ limit: '15mb' }));

// Local File-backed /api/sync for local development
const LOCAL_SYNC_FILE = path.join(__dirname, '.samx-local-sync.json');

app.get('/api/sync', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });
  try {
    if (fs.existsSync(LOCAL_SYNC_FILE)) {
      const content = JSON.parse(fs.readFileSync(LOCAL_SYNC_FILE, 'utf-8'));
      return res.json({
        success: true,
        status: 'ok',
        bindingConfigured: true,
        data: content.payload,
        version: content.version || '23.33.0',
        updated_at: content.updated_at || Date.now()
      });
    }
  } catch (e) {}
  return res.json({ success: true, status: 'empty', bindingConfigured: true, data: null, updated_at: null });
});

app.post('/api/sync', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });
  try {
    const body = req.body;
    let incomingPayload = body.payload || body;
    let mergedPayload = { ...incomingPayload };

    if (fs.existsSync(LOCAL_SYNC_FILE)) {
      try {
        const existing = JSON.parse(fs.readFileSync(LOCAL_SYNC_FILE, 'utf-8'));
        const oldData = existing.payload || {};
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
        if (oldData.daily && typeof oldData.daily === 'object') {
          mergedPayload.daily = { ...oldData.daily, ...(incomingPayload.daily || {}) };
        }
        if (oldData.monthlyTargets && typeof oldData.monthlyTargets === 'object') {
          mergedPayload.monthlyTargets = { ...oldData.monthlyTargets, ...(incomingPayload.monthlyTargets || {}) };
        }
        if (oldData.monthlyHeroesTargets && typeof oldData.monthlyHeroesTargets === 'object') {
          mergedPayload.monthlyHeroesTargets = { ...oldData.monthlyHeroesTargets, ...(incomingPayload.monthlyHeroesTargets || {}) };
        }
      } catch (err) {}
    }

    const version = body.version || '23.33.0';
    const now = Date.now();
    fs.writeFileSync(LOCAL_SYNC_FILE, JSON.stringify({ payload: mergedPayload, version, updated_at: now }, null, 2), 'utf-8');
    return res.json({ success: true, bindingConfigured: true, updated_at: now, version });
  } catch (e) {
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
  console.log(`[SAMX Server] Serving SAMX app on http://0.0.0.0:${PORT}`);
});

