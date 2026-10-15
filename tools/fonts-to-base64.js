// ================================================================
//  SAMX v23.3 — fonts-to-base64.js
//  يحوّل خطوط Cairo المحلية إلى CSS بـ base64
//  الاستخدام:  node tools/fonts-to-base64.js
//  الناتج:     libs/cairo-base64.css
// ================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// الأوزان المستخدمة فعلياً (Regular + SemiBold + Bold + Black)
const fonts = [
  { file: 'libs/fonts/cairo/Cairo-Regular.ttf',  weight: 400 },
  { file: 'libs/fonts/cairo/Cairo-SemiBold.ttf', weight: 600 },
  { file: 'libs/fonts/cairo/Cairo-Bold.ttf',     weight: 700 },
  { file: 'libs/fonts/cairo/Cairo-Black.ttf',    weight: 900 },
];

let css = '/* ============================================================\n';
css += '   SAMX v23.3 — خطوط Cairo مضمّنة كـ base64\n';
css += '   ⚠️ ملف مُولَّد آلياً — لا تعدّله يدوياً\n';
css += '   لإعادة التوليد:  node tools/fonts-to-base64.js\n';
css += '   ============================================================ */\n\n';

let totalKB = 0;
let generated = 0;

for (const f of fonts) {
  const abs = path.join(ROOT, f.file);
  if (!fs.existsSync(abs)) {
    console.warn('⚠️  غير موجود، تخطّي:', f.file);
    continue;
  }
  const stats = fs.statSync(abs);
  const b64 = fs.readFileSync(abs).toString('base64');
  totalKB += b64.length / 1024;
  generated++;

  css += `@font-face{`;
  css += `font-family:'Cairo';`;
  css += `font-style:normal;`;
  css += `font-weight:${f.weight};`;
  css += `font-display:swap;`;
  css += `src:url(data:font/ttf;base64,${b64}) format('truetype');`;
  css += `}\n`;

  console.log(`  ✓ ${f.file}  (${stats.size.toLocaleString()} bytes → ${(b64.length/1024).toFixed(0)} KB)`);
}

const out = path.join(ROOT, 'libs/cairo-base64.css');
fs.writeFileSync(out, css, 'utf8');

console.log('');
console.log('✅ تم إنشاء:', out);
console.log(`   عدد الخطوط: ${generated} / ${fonts.length}`);
console.log(`   الحجم النهائي للـ CSS: ${(css.length / 1024).toFixed(0)} KB`);
console.log('');
console.log('📌 الخطوة التالية:');
console.log('   تأكد من أن index.html يحتوي على:');
console.log('   <link rel="stylesheet" href="libs/cairo-base64.css">');
console.log('   قبل <link rel="stylesheet" href="styles.css">');