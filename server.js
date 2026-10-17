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

