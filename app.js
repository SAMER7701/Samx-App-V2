// ================================================================
//  SAMX v23.31.0 — app.js
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
// ================================================================

const APP_VERSION = '23.31.0';
const APP_NAME = 'SAMX';
const OWNER_NAME = 'SAMX';
const DEV_NAME = 'SAMX Team';
const DEV_EMAIL = 'support@samx.app';
const DEV_WHATSAPP = '0533642710';
const COPYRIGHT = '© 2026 SAMX - جميع الحقوق محفوظة';
// ⭐ v23.3: مجمّدة (frozen) لتجنب reactivity — لا تتغير أبداً
const JOB_TITLES = Object.freeze(['مدير معرض','نائب مدير معرض','مشرف منطقة','بائع']);

const PERMISSION_LIST = Object.freeze([
  { key:'enterDailySales', icon:'📊', label:'إدخال المبيعات اليومية' },
  { key:'editTarget', icon:'🎯', label:'تعديل التارجت' },
  { key:'manageBranches', icon:'🏬', label:'إدارة الفروع' },
  { key:'manageStaff', icon:'👥', label:'إدارة الموظفين' },
  { key:'exportReports', icon:'📄', label:'تصدير التقارير' },
  { key:'viewFinancialReports', icon:'💰', label:'رؤية التقارير المالية' },
  { key:'editPastDays', icon:'⏳', label:'تعديل مبيعات الأيام السابقة' },
]);

const DEFAULT_PERMISSIONS = {
  enterDailySales: true, editTarget: false, manageBranches: false,
  manageStaff: false, exportReports: true, viewFinancialReports: true,
  editPastDays: false,
};

const ROLE_PERMISSIONS = {
  admin: { enterDailySales: true, editTarget: true, manageBranches: true, manageStaff: true, exportReports: true, viewFinancialReports: true, editPastDays: true },
  manager: { enterDailySales: true, editTarget: true, manageBranches: false, manageStaff: false, exportReports: true, viewFinancialReports: true, editPastDays: true },
  branch_manager: { enterDailySales: true, editTarget: true, manageBranches: false, manageStaff: true, exportReports: true, viewFinancialReports: false, editPastDays: false },
  cashier: { enterDailySales: true, editTarget: false, manageBranches: false, manageStaff: false, exportReports: false, viewFinancialReports: false, editPastDays: false },
  viewer: { enterDailySales: false, editTarget: false, manageBranches: false, manageStaff: false, exportReports: true, viewFinancialReports: true, editPastDays: false },
};

// ================================================================
//  ⭐ v23.3: ثوابت ثابتة مجمّدة — تُخرَج من reactive لتوفير الذاكرة
//  Vue 3 يتخطى Object.freeze() — لا proxy، لا watchers، لا refs
// ================================================================
const COLOR_PALETTE_CONST = Object.freeze([
  { id: 'gold', name: 'ذهبي', primary: '#d4a84b', secondary: '#e6c074', rgb: '212,168,75' },
  { id: 'royal', name: 'أزرق ملكي', primary: '#1e40af', secondary: '#3b82f6', rgb: '30,64,175' },
  { id: 'emerald', name: 'أخضر زمردي', primary: '#047857', secondary: '#10b981', rgb: '4,120,87' },
  { id: 'violet', name: 'بنفسجي', primary: '#6d28d9', secondary: '#a78bfa', rgb: '109,40,217' },
  { id: 'orange', name: 'برتقالي', primary: '#c2410c', secondary: '#fb923c', rgb: '194,65,12' },
  { id: 'crimson', name: 'أحمر داكن', primary: '#991b1b', secondary: '#ef4444', rgb: '153,27,27' },
  { id: 'teal', name: 'تركواز', primary: '#0f766e', secondary: '#14b8a6', rgb: '15,118,110' },
  { id: 'black', name: 'أسود أنيق', primary: '#1f2937', secondary: '#4b5563', rgb: '31,41,55' },
]);

const THEME_PRESETS_CONST = Object.freeze([
  { id: 'shiaka-gold', name: 'الشياكة الذهبي', desc: 'الثيم الرسمي — ذهبي وكحلي', primary: 'gold', mode: 'dark', colors: ['#d4a84b', '#e6c074', '#0b1220', '#111a2e'] },
  { id: 'royal-blue', name: 'الأزرق الملكي', desc: 'احترافي وأنيق', primary: 'royal', mode: 'dark', colors: ['#1e40af', '#3b82f6', '#0b1220', '#111a2e'] },
  { id: 'emerald-fresh', name: 'الزمردي المنعش', desc: 'مريح للعين', primary: 'emerald', mode: 'dark', colors: ['#047857', '#10b981', '#0b1220', '#111a2e'] },
  { id: 'elegant-light', name: 'النهاري الكلاسيكي', desc: 'أبيض نقي وأنيق', primary: 'gold', mode: 'light', lightTheme: 'classic', colors: ['#d4a84b', '#e6c074', '#f8fafc', '#ffffff'] },
  { id: 'warm-light', name: 'النهاري الدافئ', desc: 'بيج مريح للعين', primary: 'orange', mode: 'light', lightTheme: 'warm', colors: ['#c2410c', '#fb923c', '#faf6ef', '#fffefb'] },
  { id: 'violet-lux', name: 'البنفسجي الفخم', desc: 'فخم ومميز', primary: 'violet', mode: 'dark', colors: ['#6d28d9', '#a78bfa', '#0b1220', '#111a2e'] },
]);

const SETTINGS_TABS_CONST = Object.freeze([
  { id: 'appearance', icon: '🎨', label: 'المظهر والسمة' },
  { id: 'identity', icon: '🏢', label: 'الهوية والمنشأة' },
  { id: 'labels', icon: '🏷️', label: 'المصطلحات والقطاع' },
  { id: 'system', icon: '⚙️', label: 'النظام والبيانات' },
]);

const SECTOR_TEMPLATES_CONST = Object.freeze([
  { id: 'general', name: 'عام', icon: '🏢', desc: 'مناسب لأي شركة',
    labels: { branch: 'فرع', branchPlural: 'فروع', staff: 'موظف', staffPlural: 'موظفين',
      sales: 'مبيعات', invoice: 'فاتورة', invoicePlural: 'فواتير',
      piece: 'قطعة', piecePlural: 'قطع', target: 'تارجت', manager: 'مدير' } },
  { id: 'retail', name: 'تجزئة / متاجر', icon: '🛒', desc: 'معرض • بائع • قطع',
    labels: { branch: 'معرض', branchPlural: 'معارض', staff: 'بائع', staffPlural: 'بائعين',
      sales: 'مبيعات', invoice: 'فاتورة', invoicePlural: 'فواتير',
      piece: 'قطعة', piecePlural: 'قطع', target: 'تارجت', manager: 'مدير معرض' } },
  { id: 'restaurant', name: 'مطاعم / كافيهات', icon: '🍔', desc: 'فرع • نادل • طلبات',
    labels: { branch: 'فرع', branchPlural: 'فروع', staff: 'موظف', staffPlural: 'موظفين',
      sales: 'إيرادات', invoice: 'طلب', invoicePlural: 'طلبات',
      piece: 'وجبة', piecePlural: 'وجبات', target: 'هدف', manager: 'مدير فرع' } },
  { id: 'pharmacy', name: 'صيدليات', icon: '💊', desc: 'صيدلية • صيدلي • وصفات',
    labels: { branch: 'صيدلية', branchPlural: 'صيدليات', staff: 'صيدلي', staffPlural: 'صيادلة',
      sales: 'مبيعات', invoice: 'وصفة', invoicePlural: 'وصفات',
      piece: 'علبة', piecePlural: 'علب', target: 'هدف', manager: 'مدير صيدلية' } },
  { id: 'custom', name: 'مخصص', icon: '⚙️', desc: 'تحرير يدوي كامل', labels: null },
]);

const AUTO_BACKUP_INTERVAL = 60 * 60 * 1000;
const AUTO_LOCK_AFTER = 15 * 60 * 1000;

// ================================================================
//  ⭐ v23.4: دوال التاريخ المحلي (تحل مشكلة UTC)
//  السبب: toISOString() تُرجع التاريخ بتوقيت UTC وقد تعطي يوماً
//  خاطئاً قبل الساعة 3 صباحاً في السعودية (UTC+3).
// ================================================================
function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function localMonthStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// ⭐ v23.27: توحيد صيغ التواريخ القياسية (YYYY-MM-DD) لكافة العمليات واستيراد الإكسل
function normalizeDateStr(val) {
  if (val === null || val === undefined || val === '') return null;
  
  if (val instanceof Date && !isNaN(val.getTime())) {
    return `${val.getFullYear()}-${String(val.getMonth() + 1).padStart(2, '0')}-${String(val.getDate()).padStart(2, '0')}`;
  }

  // دعم الأرقام التسلسلية من ملفات Excel (مثل 46314)
  if (typeof val === 'number' || (/^\d{4,5}(\.\d+)?$/.test(String(val).trim()))) {
    const num = typeof val === 'number' ? val : parseFloat(val);
    if (num > 20000 && num < 80000) {
      const excelEpoch = new Date(Date.UTC(1899, 11, 30));
      const ms = Math.round(num) * 24 * 60 * 60 * 1000;
      const d = new Date(excelEpoch.getTime() + ms);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    }
  }

  // تنظيف السلسلة وتحويل الأرقام الهندية/العربية
  let str = String(val).replace(/[\u0660-\u0669]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  if (!str) return null;

  // YYYY-MM-DD أو YYYY/MM/DD
  const ymdMatch = str.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = String(parseInt(ymdMatch[2], 10)).padStart(2, '0');
    const d = String(parseInt(ymdMatch[3], 10)).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // DD-MM-YYYY أو DD/MM/YYYY أو MM-DD-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (dmyMatch) {
    let a = parseInt(dmyMatch[1], 10);
    let b = parseInt(dmyMatch[2], 10);
    let y = dmyMatch[3];
    if (y.length === 2) y = '20' + y;
    let day = a, month = b;
    if (a > 12 && b <= 12) {
      day = a; month = b;
    } else if (b > 12 && a <= 12) {
      day = b; month = a;
    }
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${y}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }

  const parsed = Date.parse(str);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  return null;
}

// ================================================================
//  Hash Functions
// ================================================================
function simpleHash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const p1 = (h2 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h1 >>> 0).toString(16).padStart(8, '0');
  let extra = '';
  for (let r = 0; r < 3; r++) {
    let x = r * 9973;
    for (let i = 0; i < str.length; i++) x = (Math.imul(x, 31) + str.charCodeAt(i) + r) >>> 0;
    extra += (x >>> 0).toString(16).padStart(8, '0');
  }
  return p1 + p2 + extra;
}

async function sha256(text) {
  if (typeof text !== 'string') text = String(text || '');
  if (window.crypto && window.crypto.subtle) {
    try {
      const buf = new TextEncoder().encode(text);
      const hash = await crypto.subtle.digest('SHA-256', buf);
      return 'w_' + Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {}
  }
  return 'f_' + simpleHash(text);
}

// ⭐ v23.29: تحويل الأرقام العربية/الفارسية إلى لاتينية لمنع فشل تسجيل الدخول على الهواتف
function normalizeDigits(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/[\u0660-\u0669]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
    .replace(/[\u06F0-\u06F9]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
}

// ⭐ v23.29: التحقق المرن والشامل من كلمات المرور عبر كافة المنصات والمتصفحات
async function verifyPassword(inputPassword, storedHash) {
  if (!inputPassword || !storedHash) return false;
  const p = String(inputPassword).trim();
  const pNorm = normalizeDigits(p);

  // 1. فحص عبر sha256 (النص الأصلي والمطبّع)
  const h1 = await sha256(p);
  if (h1 === storedHash) return true;
  if (pNorm !== p) {
    const h1Norm = await sha256(pNorm);
    if (h1Norm === storedHash) return true;
  }

  // 2. فحص WebCrypto المجرد (بدون بادئة w_)
  if (window.crypto && window.crypto.subtle) {
    try {
      const buf = new TextEncoder().encode(p);
      const hash = await crypto.subtle.digest('SHA-256', buf);
      const rawHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (rawHex === storedHash || ('w_' + rawHex) === storedHash) return true;

      if (pNorm !== p) {
        const bufNorm = new TextEncoder().encode(pNorm);
        const hashNorm = await crypto.subtle.digest('SHA-256', bufNorm);
        const rawHexNorm = Array.from(new Uint8Array(hashNorm)).map(b => b.toString(16).padStart(2, '0')).join('');
        if (rawHexNorm === storedHash || ('w_' + rawHexNorm) === storedHash) return true;
      }
    } catch (e) {}
  }

  // 3. فحص Fallback hash (f_)
  if (('f_' + simpleHash(p)) === storedHash || simpleHash(p) === storedHash) return true;
  if (('f_' + simpleHash(pNorm)) === storedHash || simpleHash(pNorm) === storedHash) return true;

  // 4. مطابقة نصية مباشرة
  if (p === storedHash || pNorm === storedHash) return true;

  return false;
}

// ================================================================
//  Arabic Font for PDF
// ================================================================
let _arabicFontB64 = null;
async function loadArabicFont() {
  if (_arabicFontB64) return _arabicFontB64;
  try {
    const res = await fetch('libs/Amiri-Regular.ttf');
    const buf = await res.arrayBuffer();
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    _arabicFontB64 = btoa(binary);
    return _arabicFontB64;
  } catch (e) { return null; }
}

// ⭐ v23: كاش لكل شعار على حدة (يدعم الشعار المخصص)
const _logoCache = {};
async function getLogoDataURL(logoUrl) {
  logoUrl = logoUrl || 'samx-logo.svg';
  if (_logoCache[logoUrl]) return _logoCache[logoUrl];
  return new Promise((resolve) => {
    const img = new Image();
    // ⭐ v23.3-FIX: على file:// لا ندعم CORS — نُعطّله بدل أن يُفسد الشعار
    img.crossOrigin = location.protocol === 'file:' ? null : 'anonymous';
    img.src = logoUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = 400, ratio = img.height / img.width;
        canvas.width = w;
        canvas.height = Math.round(w * ratio);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        _logoCache[logoUrl] = dataUrl;
        resolve(dataUrl);
      } catch (e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
  });
}

const { createApp, nextTick, markRaw, toRaw } = Vue;

createApp({
  data() {
    return {
      appVersion: APP_VERSION,

      // ⭐ v23.3: نظام الترجمة i18n — Phase 5
      currentLang: (window.SAMX_i18n && window.SAMX_i18n.getLang()) || 'ar',
      supportedLangs: (window.SAMX_i18n && window.SAMX_i18n.SUPPORTED_LANGS) || ['ar', 'en'],

      // ============ المستخدمين ============
      currentUser: null,
      users: [],
      loginForm: { username: '', password: '' },
      loginError: '',
      loggingIn: false,
      rememberMe: false,
      showLoginPassword: false,
      showLockPassword: false,

      // ============ التنقل ============
      currentView: 'welcome',
      previousView: 'welcome',

      // ============ البيانات ============
      branches: [],
      staff: [],
      daily: {},
      monthlyTargets: {},
      monthlyHeroesTargets: {},
      attendance: {},

      // ============ الفلاتر ============
         selectedDate: localDateStr(),
      selectedBranchId: '',
      monthlyMonth: localMonthStr(),
      monthlyBranchId: '',
      yoyYear: new Date().getFullYear(),
      yoyBranchId: '',
      analyticsBranchId: '',
      analyticsRange: 7,

      // ============ Drawer ============
      drawerOpen: false,
      distMonth: localMonthStr(),
      distBranchId: '',
      distDays: [],

      // ============ Branch Form ============
      branchForm: { name: '', code: '' },
      editingBranch: null,
      branchError: '',
      searchBranch: '',

      // ============ Staff Form ============
      staffForm: { name: '', code: '', branchId: '', jobTitle: '' },
      editingStaff: null,
      staffError: '',
      searchStaff: '',

      // ============ User Form ============
      userForm: {
        fullName: '', username: '', password: '', role: 'manager',
        branchId: '', permissions: { ...DEFAULT_PERMISSIONS },
      },
      editingUser: null,
      userError: '',

      // ============ UI ============
      darkMode: true,
      showBackupModal: false,
      showImportModal: false,
      importPreview: [],
      importMeta: null,
      showBulkImportModal: false,
      bulkPreview: {
        loaded: false, newBranches: [], existingBranches: [],
        newStaff: [], duplicateStaff: [], branchNameConflicts: [],
      },
      showActivityLog: false,
      activityLog: [],
      activityLogFilter: 'all', // all | financial | targets | closes | users | security | system
      activityLogSearch: '',
      showCloseDayModal: false,
      closeDayNote: '',
      showReopenDayModal: false,
      reopenDayReason: '',
      reopenDayError: '',
      notifications: [],
      showNotificationsPanel: false,
      showUserMenu: false,   // ⭐ v23.11.2: قائمة المستخدم في الهيدر
      showMoreMenu: false,   // ⭐ قائمة المزيد على الجوال والتابلت
      toast: '',
      toastType: '',
      toastTimer: '',
      _toastTimer: null,
      lastSaveTime: '',
      liveUpdateTime: '',
      kpiFlashClass: { branchSales: '', basePct: '', heroesPct: '' },
      onlineStatus: navigator.onLine,
      showInstallBanner: false,
      isAppInstalled: false, // ⭐ v23.24: حالة تثبيت التطبيق المستقل
      showUpdateToast: false,
      deferredPrompt: null,
      newWorker: null,
      staffPage: 1,
      isLocked: false,
      lockPassword: '',
      lockError: '',
      _lockTimer: null,

      // Charts
      staffChartInstance: null,
      trendChartInstance: null,
      monthlyChartInstance: null,
      yoyChartInstance: null,

      _dataLoaded: false,   // ⭐ v23.9-SHIELD: لا persist قبل load
      _saveDebounce: null,
      _autoBackupTimer: null,
      _notificationTimer: null,
      _confettiShown: false,

      // ============ Settings ============
      showSettings: false,
      settingsTab: 'appearance',
      settingsTabs: SETTINGS_TABS_CONST,
      settings: {
        fontSize: 15, fontFamily: 'cairo', density: 'normal',
        themeMode: 'dark', lightTheme: 'classic',
        primaryColor: 'gold', staffPerPage: 20,
        autoDistribute: true,   // ⭐ v23.9-FIX
        currencyFormat: 'symbol', // ⭐ v23.13: 'symbol' (⃁) أو 'text' (ر.س)
        uiScale: 100, // ⭐ v23.15: حجم عرض النوافذ والخطوط (90 | 100 | 115)
      },

      // ⭐ v19: نظام التخصيص (White-Label)
      branding: {
        companyName: 'SAMX',
        companyDesc: 'إدارة المبيعات',
        copyrightText: '© 2026 SAMX',
        logoDataURL: null,
        labels: {
          branch: 'فرع', branchPlural: 'فروع',
          staff: 'موظف', staffPlural: 'موظفين',
          sales: 'مبيعات', invoice: 'فاتورة', invoicePlural: 'فواتير',
          piece: 'قطعة', piecePlural: 'قطع',
          target: 'تارجت', manager: 'مدير',
        },
        sectorTemplate: 'general',
      },
      brandingForm: { companyName: '', companyDesc: '', copyrightText: '' },
      brandingTabActive: 'identity',
      logoFileInput: null,
      _brandingSaveDebounce: null,

      colorPalette: COLOR_PALETTE_CONST,
      themePresets: THEME_PRESETS_CONST,
      _autoThemeCheck: null,

      jobTitles: JOB_TITLES,
      permissionList: PERMISSION_LIST,

      showCompareModal: false,
      showSearchModal: false,
      searchQuery: '',
      searchResults: [],
      searchSelectedIndex: 0,
      morningAlert: '',
      lastMorningAlertDate: '',
      staffPhotos: {},
      // ⭐ v23.9-CHART#1: نوع المخطط + Plugins مخصصة
     staffChartKey: 0,
      ptr: {
        visible: false,
        refreshing: false,
        pullDistance: 0,
        text: 'اسحب للتحديث',
        startY: 0,
        active: false,
      },
      staffChartType: (() => {
        try { return localStorage.getItem('samx_staff_chart_type') || 'bar'; } catch(e) { return 'bar'; }
      })(),
      _chartPluginsRegistered: false,
      _resizeListenerAttached: false,   // ⭐ v23.12-FIX: منع تراكم listeners

      // ⭐ v23.2: خيارات مشاركة بطاقة اليوم
      shareOptions: {
        showNames: true,
        showAbsolute: true,
        showInvoices: false,
        showPieces: false,
        showUPT: true,
        showATV: true,
        showMonthlyProgress: true, // ⭐ v23.15: نسبة وصول الفرع مع التارجت الشهري
        sortBy: 'best',
        mode: 'full',
      },
            showShareModal: false,
      shareGenerating: false,
      _cachedShareBlob: null,
      _cachedShareDataUrl: null,
      // ⭐ v23.11.8: Modal معاينة الصورة
      showImagePreview: false,
      previewImageUrl: '',
      previewImageBlob: null,
      previewImageFilename: '',
      // ⭐ v23.3: عُلِّمت هنا بدل methods
      _html2canvasLoaded: false,
 
      // ⭐ v23.7: Seed Versioning
      seedUpdateAvailable: false,
      seedNewVersion: '',
      seedNewMonth: '',
      // ⭐ v23.6.6: preload fonts (يبقى — يسرّع النقرة الثانية)
      _fontsPreloaded: false,
      // ⭐ v20: Setup Wizard
      setupWizard: { active: false, step: 0, isFirstRun: true },
      setupWizardForm: {
        companyName: '', companyDesc: '', logoDataURL: null,
        sector: 'general', branchCode: 'BR-001', branchName: '',
      },

      // ⭐ v23.18: Cloudflare D1 Cloud Sync
      cloudSyncStatus: 'idle', // 'idle' | 'syncing' | 'synced' | 'offline' | 'error' | 'unconfigured'
      lastCloudSyncTime: '',
      cloudSyncError: '',
      _cloudSyncDebounce: null,
      _cloudPulledOnce: false, // ⭐ v23.23: حماية السحابة من الـ push قبل الـ pull
      loginSyncMsg: '',
      loginSyncMsgType: 'info',
      isUpdatingApp: false,
    };
  },

  computed: {
    // ⭐ v23.13: رمز العملة المتوافق (الرمز الرسمي الجديد ⃁ أو النص ر.س / SAR)
    currencySymbol() {
      if (this.settings && this.settings.currencyFormat === 'text') {
        return this.currentLang === 'ar' ? 'ر.س' : 'SAR';
      }
      return '\u20C1';
    },

    // ⭐ v23.24: كشف دقيق لوضع التشغيل المستقل (PWA Standalone Mode)
    isStandalone() {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.navigator.standalone === true ||
             (typeof document !== 'undefined' && document.referrer && document.referrer.includes('android-app://'));
    },

    todayStr() { return localDateStr(); },
    maxDate() { return this.todayStr; },

    // ⭐ v23.3: i18n helpers
    langDir() {
      return this.currentLang === 'ar' ? 'rtl' : 'ltr';
    },
        isRTL() {
      return this.currentLang === 'ar';
    },
    i18nKeyCount() {
      if (!window.SAMX_i18n || typeof window.SAMX_i18n.stats !== 'function') return 0;
      const s = window.SAMX_i18n.stats();
      return (s.keys && s.keys[this.currentLang]) || 0;
    },
    // ⭐ v23.4-FIX-نهائي: t كـ computed — يضمن 100% إعادة الرسم عند تغيير اللغة
    // هذا هو الحل المضمون. أي محاولة أخرى (method + void) غير موثوقة.
    t() {
      // سطر واحد يكفي — لكن نصرّح بالمتغير لتوضيح النية
      const _currentLang = this.currentLang; // ← Vue يسجّل هذا كـ dependency
      // نُرجع دالة (closure) — تُستدعى بـ t('key') أو t('key', '', { params })
      return (key, fallback, params) => {
        // تجاهل المتغير المحلي — موجود فقط لضمان التتبع
        void _currentLang;
        if (!key) return fallback !== undefined ? fallback : '';
        if (window.SAMX_i18n && typeof window.SAMX_i18n.t === 'function') {
          return window.SAMX_i18n.t(key, fallback, params);
        }
        return fallback !== undefined ? fallback : key;
      };
    },
    dayNameOfSelectedDate() {
      const d = new Date(this.selectedDate);
      const dayKeys = ['days.sun','days.mon','days.tue','days.wed','days.thu','days.fri','days.sat'];
      return this.t(dayKeys[d.getDay()]);
    },
    isTodaySelected() { return this.selectedDate === this.todayStr; },
       isYesterdaySelected() {
      const y = new Date(); y.setDate(y.getDate() - 1);
      return this.selectedDate === localDateStr(y);
    },
    // ⭐ v23-FIX: خصائص قابلة للكتابة مرتبطة بـ dayData
    branchBaseTarget: {
      get() { return Number(this.dayData?.baseTarget) || 0; },
      set(val) {
        if (!this.selectedBranchId) return;
        const normDate = this.normalizeDateStr(this.selectedDate) || this.selectedDate;
        const key = `${normDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.baseTarget = Number(val) || 0;
        this.autoDistributeCurrentDay();
        this.schedulePersist();
      }
    },
    branchHeroesTarget: {
      get() { return Number(this.dayData?.heroesTarget) || 0; },
      set(val) {
        if (!this.selectedBranchId) return;
        const normDate = this.normalizeDateStr(this.selectedDate) || this.selectedDate;
        const key = `${normDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.heroesTarget = Number(val) || 0;
        this.autoDistributeCurrentDay();
        this.schedulePersist();
      }
    },
    branchManualExtra: {
      get() { return Number(this.dayData?.manualExtra) || 0; },
      set(val) {
        if (!this.selectedBranchId) return;
        const key = `${this.selectedDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.manualExtra = Number(val) || 0;
        this.schedulePersist();
      }
    },
    branchInvoicesInput: {
      get() { return Number(this.dayData?.invoices) || 0; },
      set(val) {
        if (!this.selectedBranchId) return;
        const key = `${this.selectedDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.invoices = Number(val) || 0;
        this.schedulePersist();
      }
    },
    branchPiecesInput: {
      get() { return Number(this.dayData?.pieces) || 0; },
      set(val) {
        if (!this.selectedBranchId) return;
        const key = `${this.selectedDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.pieces = Number(val) || 0;   // ⭐ إصلاح: كانت rec.invoices بالخطأ
        this.schedulePersist();
      }
    },

    // ⭐ v23.15: إجمالي تارجت الشهر المستدعى أو المجمع من تارجت أيام الشهر
    branchMonthlyTargetInput: {
      get() {
        if (this.dayData && this.dayData.monthlyTarget !== undefined && this.dayData.monthlyTarget !== null && Number(this.dayData.monthlyTarget) > 0) {
          return Number(this.dayData.monthlyTarget) || 0;
        }
        return this.branchMonthlyTargetTotal;
      },
      set(val) {
        if (!this.selectedBranchId) return;
        const key = `${this.selectedDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.monthlyTarget = Number(val) || 0;
        this.schedulePersist();
      }
    },

    // ⭐ v23.15: إجمالي مبيعات الشهر حتى اليوم (MTD Sales) المدخلة يدوياً أو المحسوبة تراكمياً
    branchMtdSalesInput: {
      get() {
        if (this.dayData && this.dayData.mtdSales !== undefined && this.dayData.mtdSales !== null && Number(this.dayData.mtdSales) > 0) {
          return Number(this.dayData.mtdSales) || 0;
        }
        return this.branchMtdSalesCalculated;
      },
      set(val) {
        if (!this.selectedBranchId) return;
        const key = `${this.selectedDate}|${this.selectedBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.mtdSales = Number(val) || 0;
        this.schedulePersist();
      }
    },

    // حساب التارجت الشهري الإجمالي للفرع
    branchMonthlyTargetTotal() {
      if (!this.selectedBranchId) return 0;
      // 1. إذا أدخل المستخدم قيمة مخصصة في سجل اليوم
      if (this.dayData && Number(this.dayData.monthlyTarget) > 0) {
        return Number(this.dayData.monthlyTarget);
      }
      // 2. إذا تم استيراد التارجت الشهري
      const month = this.selectedDate ? this.selectedDate.slice(0, 7) : '';
      const monthlyKey = `${month}|${this.selectedBranchId}`;
      if (this.monthlyTargets && Number(this.monthlyTargets[monthlyKey]) > 0) {
        return Number(this.monthlyTargets[monthlyKey]);
      }
      // 3. أو حساب مجموع تارجت أيام الشهر المسجلة للفرع
      let sumDays = 0;
      if (this.daily) {
        for (const [k, d] of Object.entries(this.daily)) {
          if (k.startsWith(month + '-') && k.endsWith('|' + this.selectedBranchId)) {
            sumDays += Number(d.baseTarget) || 0;
          }
        }
      }
      if (sumDays > 0) return sumDays;
      return (Number(this.dayData.baseTarget) || 0) * 30;
    },

    // حساب المبيعات التراكمية من بداية الشهر حتى اليوم المختار
    branchMtdSalesCalculated() {
      if (!this.selectedBranchId || !this.selectedDate) return 0;
      const month = this.selectedDate.slice(0, 7);
      let sum = 0;
      if (this.daily) {
        for (const [k, d] of Object.entries(this.daily)) {
          if (k.startsWith(month + '-') && k.endsWith('|' + this.selectedBranchId)) {
            const datePart = k.split('|')[0];
            if (datePart <= this.selectedDate) {
              let daySales = 0;
              if (d.staffData) {
                for (const s of Object.values(d.staffData)) {
                  daySales += Number(s.sales) || 0;
                }
              }
              daySales += Number(d.manualExtra) || 0;
              sum += daySales;
            }
          }
        }
      }
      return sum;
    },

    // إجمالي مبيعات الشهر الفعلي المعتمد للحساب والعرض
    branchMtdSalesTotal() {
      if (this.dayData && Number(this.dayData.mtdSales) > 0) {
        return Number(this.dayData.mtdSales);
      }
      return this.branchMtdSalesCalculated;
    },

    // نسبة وصول الفرع مع تارجت الشهر
    branchMonthlyAchievementPct() {
      const target = this.branchMonthlyTargetTotal;
      if (!target || target <= 0) return 0;
      return (this.branchMtdSalesTotal / target) * 100;
    },

    // رابط الدعم عبر الواتساب بأمان دون رمي خطأ في القالب
    supportWhatsappUrl() {
      const company = encodeURIComponent(this.activeCompanyName || 'SAMX');
      const msg = encodeURIComponent('مرحباً، أحتاج دعم بخصوص تطبيق ');
      return `https://wa.me/966533642710?text=${msg}${company}`;
    },

    selectedBranch() { return this.branches.find(b => b.id === this.selectedBranchId) || null; },
    branchStaff() { return this.staff.filter(s => s.branchId === this.selectedBranchId); },
    dayKey() {
      if (!this.selectedBranchId || !this.selectedDate) return null;
      const normDate = this.normalizeDateStr(this.selectedDate) || this.selectedDate;
      return `${normDate}|${this.selectedBranchId}`;
    },
    // ⭐ v23.27: جلب سجل اليوم للتاريخ والفرع المختارين مع فحص التارجت المستورد من الإكسل
    dayData() {
      const empty = { baseTarget: 0, heroesTarget: 0, manualExtra: 0, staffData: {}, invoices: 0, pieces: 0 };
      try {
        if (!this.selectedBranchId || !this.selectedDate) return empty;
        const normDate = (typeof this.normalizeDateStr === 'function' ? this.normalizeDateStr(this.selectedDate) : normalizeDateStr(this.selectedDate)) || this.selectedDate;
        let rec = null;
        if (typeof this.getDayRecord === 'function') {
          rec = this.getDayRecord(normDate, this.selectedBranchId, false);
        } else if (this.daily && typeof this.daily === 'object') {
          rec = this.daily[`${normDate}|${this.selectedBranchId}`] || this.daily[`${this.selectedDate}|${this.selectedBranchId}`] || null;
        }
        return rec || empty;
      } catch (e) {
        console.warn('[dayData error]', e);
        return empty;
      }
    },
    presentCount() { return this.branchStaff.filter(s => this.isPresent(s.id)).length; },

    staffRowsComputed() {
      if (!this.selectedBranch) return [];
      const d = this.dayData || { baseTarget: 0, heroesTarget: 0, manualExtra: 0, staffData: {}, invoices: 0, pieces: 0 };
      const staffData = (d && d.staffData && typeof d.staffData === 'object') ? d.staffData : {};
      const presentStaff = this.branchStaff.filter(s => this.isPresent(s.id));
      const pCount = presentStaff.length;

      const rows = this.branchStaff.map(s => {
        const sd = staffData[s.id] || { target: 0, heroesTarget: 0, sales: 0 };
        let target = Number(sd.target) || 0;
        let heroesTarget = Number(sd.heroesTarget) || 0;
        const present = this.isPresent(s.id);

        // ⭐ ربط فوري مع تارجت الإكسل: إذا كان تارجت اليوم موجوداً ولم يوزع بعد في staffData
        if (target === 0 && Number(d.baseTarget) > 0 && present && pCount > 0) {
          target = Math.round((Number(d.baseTarget) / pCount) * 100) / 100;
        }
        if (heroesTarget === 0 && Number(d.heroesTarget) > 0 && present && pCount > 0) {
          heroesTarget = Math.round((Number(d.heroesTarget) / pCount) * 100) / 100;
        }

        const sales = Number(sd.sales) || 0;
        const pct = target > 0 ? (sales / target) * 100 : 0;
        const heroesPct = heroesTarget > 0 ? (sales / heroesTarget) * 100 : 0;
        return { id: s.id, name: s.name, code: s.code, jobTitle: s.jobTitle, target, heroesTarget, sales, pct, heroesPct, present };
      });
      const valid = rows.filter(r => r.present && r.sales > 0);
      let topId = null;
      if (valid.length) {
        valid.sort((a, b) => (b.pct - a.pct) || (b.sales - a.sales));
        topId = valid[0].id;
      }
      return rows.map(r => ({ ...r, isTop: r.id === topId }));
    },
    branchStaffSorted() {
      return [...this.staffRowsComputed].sort((a, b) => {
        if (a.present !== b.present) return a.present ? -1 : 1;
        return a.name.localeCompare(b.name, 'ar');
      });
    },
    paginatedStaff() {
      const perPage = this.settings.staffPerPage || 20;
      const start = (this.staffPage - 1) * perPage;
      return this.staffRowsComputed.slice(start, start + perPage);
    },
    totalStaffPages() {
      const perPage = this.settings.staffPerPage || 20;
      return Math.max(1, Math.ceil(this.staffRowsComputed.length / perPage));
    },
    staffSalesTotal() { return this.staffRowsComputed.filter(r => r.present).reduce((sum, r) => sum + r.sales, 0); },
    staffTargetTotal() { return this.staffRowsComputed.filter(r => r.present).reduce((sum, r) => sum + r.target, 0); },
    staffHeroesTargetTotal() { return this.staffRowsComputed.filter(r => r.present).reduce((sum, r) => sum + r.heroesTarget, 0); },
    branchSales() { return this.staffSalesTotal + (Number(this.dayData?.manualExtra) || 0); },
    basePct() {
      const t = Number(this.dayData?.baseTarget) || 0;
      return t > 0 ? (this.branchSales / t) * 100 : 0;
    },
    heroesPct() {
      const t = Number(this.dayData?.heroesTarget) || 0;
      return t > 0 ? (this.branchSales / t) * 100 : 0;
    },
    // ⭐ v23.10: Pull-to-Refresh style
    ptrIndicatorStyle() {
      // -80 = hidden, 0 = fully visible
      const y = this.ptr.refreshing ? 0 : Math.max(-80, Math.min(this.ptr.pullDistance, 80) - 80);
      return { transform: 'translate(-50%, ' + y + 'px)' };
    },

    // ⭐ v23.9-FIX#3: هل توجد بيانات كافية لرسم الشارت؟
        hasChartData() {
      // ⭐ v23.9-FIX#5: اعرض الشارت إذا فيه موظفون حاضرون (حتى بدون مبيعات)
      const present = this.staffRowsComputed.filter(s => s.present);
      return present.length > 0;
    },

    topSeller() {
      const r = this.staffRowsComputed.find(x => x.isTop);
      return r ? { name: r.name, sales: r.sales, pct: r.pct } : null;
    },
    // ⭐ v23.2: قائمة الموظفين مرتّبة حسب خيار المشاركة
    summaryStaffSorted() {
      const present = this.staffRowsComputed.filter(s => s.present);
      const sortBy = this.shareOptions.sortBy;
      if (sortBy === 'alphabetical') {
        return [...present].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
      }
      if (sortBy === 'attendance') {
        // ترتيب الحضور (نفس ترتيب الإدخال الأصلي)
        return present;
      }
      // 'best' — الأعلى مبيعاً أولاً
      return [...present].sort((a, b) => (b.sales - a.sales) || (b.pct - a.pct));
    },

    branchInvoices() { return Number(this.dayData?.invoices) || 0; },
    branchPieces() { return Number(this.dayData?.pieces) || 0; },
    branchUPT() {
      const inv = this.branchInvoices;
      return inv > 0 ? this.branchPieces / inv : 0;
    },
    branchATV() {
      const inv = this.branchInvoices;
      return inv > 0 ? this.branchSales / inv : 0;
    },

    kpiMonthlySummary() {
      if (!this.monthlyBranchId) return { upt: 0, atv: 0, invoices: 0, pieces: 0, sales: 0, daysCount: 0 };
      const [y, m] = this.monthlyMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const staffIds = this.staff.filter(s => s.branchId === this.monthlyBranchId).map(s => s.id);
      let totalSales = 0, totalInvoices = 0, totalPieces = 0, daysCount = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const d = this.daily[`${dateStr}|${this.monthlyBranchId}`];
        if (!d) continue;
        const daySales = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
        const dayInv = Number(d.invoices) || 0;
        const dayPcs = Number(d.pieces) || 0;
        if (daySales > 0 || dayInv > 0 || dayPcs > 0) daysCount++;
        totalSales += daySales; totalInvoices += dayInv; totalPieces += dayPcs;
      }
      return {
        sales: totalSales, invoices: totalInvoices, pieces: totalPieces,
        upt: totalInvoices > 0 ? totalPieces / totalInvoices : 0,
        atv: totalInvoices > 0 ? totalSales / totalInvoices : 0,
        daysCount,
      };
    },

    kpiMonthlyByStaff() {
      if (!this.monthlyBranchId) return [];
      const [y, m] = this.monthlyMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const staffList = this.staff.filter(s => s.branchId === this.monthlyBranchId);
      return staffList.map(s => {
        let sales = 0, target = 0, daysWorked = 0;
        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const d = this.daily[`${dateStr}|${this.monthlyBranchId}`];
          if (!d) continue;
          const sd = d.staffData?.[s.id];
          if (!sd) continue;
          sales += Number(sd.sales) || 0;
          target += Number(sd.target) || 0;
          if ((Number(sd.sales) || 0) > 0) daysWorked++;
        }
        return {
          id: s.id, name: s.name, code: s.code, jobTitle: s.jobTitle,
          sales, target, daysWorked,
          pct: target > 0 ? (sales / target) * 100 : 0,
        };
      }).sort((a, b) => b.sales - a.sales);
    },

    kpiDailyTrend() {
      if (!this.selectedBranchId) return [];
      const arr = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate() - i);
       const dateStr = localDateStr(d);
        const rec = this.daily[`${dateStr}|${this.selectedBranchId}`] || {};
        const staffIds = this.staff.filter(s => s.branchId === this.selectedBranchId).map(s => s.id);
        const sales = staffIds.reduce((sum, id) => sum + (Number(rec.staffData?.[id]?.sales) || 0), 0) + (Number(rec.manualExtra) || 0);
        const inv = Number(rec.invoices) || 0;
        const pcs = Number(rec.pieces) || 0;
        const dayKeys = ['days.sun','days.mon','days.tue','days.wed','days.thu','days.fri','days.sat'];
        arr.push({
          date: dateStr, dayName: this.t(dayKeys[d.getDay()]), sales, invoices: inv, pieces: pcs,
          upt: inv > 0 ? pcs / inv : 0,
          atv: inv > 0 ? sales / inv : 0,
        });
      }
      return arr;
    },

    staffKPIRanking() {
      if (!this.selectedBranch) return [];
      return this.staffRowsComputed.filter(r => r.present).sort((a, b) => b.pct - a.pct);
    },

    branchLeaderboard() {
      return this.branches.map(b => {
        const key = `${this.selectedDate}|${b.id}`;
        const d = this.daily[key] || { baseTarget: 0, heroesTarget: 0, staffData: {}, manualExtra: 0 };
        const staffIds = this.staff.filter(s => s.branchId === b.id).map(s => s.id);
        const sales = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
        const baseTarget = Number(d.baseTarget) || 0;
        const heroesTarget = Number(d.heroesTarget) || 0;
        return {
          id: b.id, name: b.name, sales, baseTarget, heroesTarget,
          basePct: baseTarget > 0 ? (sales / baseTarget) * 100 : 0,
          heroesPct: heroesTarget > 0 ? (sales / heroesTarget) * 100 : 0,
        };
      }).sort((a, b) => b.sales - a.sales);
    },

    adminBranchStatus() {
      return this.branches.map(b => {
        const key = `${this.selectedDate}|${b.id}`;
        const d = this.daily[key] || { baseTarget: 0, heroesTarget: 0, staffData: {}, manualExtra: 0 };
        const staffIds = this.staff.filter(s => s.branchId === b.id).map(s => s.id);
        const sales = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
        const baseTarget = Number(d.baseTarget) || 0;
        const heroesTarget = Number(d.heroesTarget) || 0;
        const basePct = baseTarget > 0 ? (sales / baseTarget) * 100 : 0;
        const heroesPct = heroesTarget > 0 ? (sales / heroesTarget) * 100 : 0;
        const presentCount = staffIds.filter(id => this.attendance[`${this.selectedDate}|${id}`] !== false).length;
        let statusLabel, statusColor, statusBg, borderColor;
        if (sales === 0 && baseTarget === 0) {
          statusLabel = this.t('admin.status.unrecorded'); statusColor = '#94a3b8'; statusBg = 'rgba(148,163,184,.15)'; borderColor = '#243356';
        } else if (basePct >= 100) {
          statusLabel = this.t('admin.status.excellent'); statusColor = '#6ee7b7'; statusBg = 'rgba(16,185,129,.2)'; borderColor = 'rgba(16,185,129,.5)';
        } else if (basePct >= 70) {
          statusLabel = this.t('admin.status.good'); statusColor = '#fcd34d'; statusBg = 'rgba(245,158,11,.2)'; borderColor = 'rgba(245,158,11,.5)';
        } else {
          statusLabel = this.t('admin.status.late'); statusColor = '#fda4af'; statusBg = 'rgba(244,63,94,.2)'; borderColor = 'rgba(244,63,94,.5)';
        }
        return {
          id: b.id, name: b.name, code: b.code,
          sales, baseTarget, heroesTarget, basePct, heroesPct,
          staffCount: staffIds.length, presentCount,
          statusLabel, statusColor, statusBg, borderColor,
        };
      });
    },
    adminTotalSales() { return this.adminBranchStatus.reduce((s, b) => s + b.sales, 0); },
    branchesWithTarget() { return this.adminBranchStatus.filter(b => b.baseTarget > 0).length; },
    branchesAchieved() { return this.adminBranchStatus.filter(b => b.baseTarget > 0 && b.basePct >= 100).length; },
    branchesLagging() { return this.adminBranchStatus.filter(b => b.baseTarget > 0 && b.basePct < 70 && b.sales > 0).length; },

    smartAlerts() {
      const alerts = [];
      if (this.selectedBranch && this.isTodaySelected) {
        const d = this.dayData || { baseTarget: 0, heroesTarget: 0, manualExtra: 0, staffData: {}, invoices: 0, pieces: 0 };
        const totalSales = this.staffSalesTotal + (Number(d.manualExtra) || 0);
        if (totalSales === 0 && ((Number(d.baseTarget) || 0) > 0 || this.branchStaff.length > 0)) {
          alerts.push({
            icon: '⏰',
            text: this.t('dashboard.alert.noSalesToday'),
            bg: 'rgba(245,158,11,.1)',
            border: 'rgba(245,158,11,.4)',
            color: '#fcd34d',
          });
        }
        if (this.basePct >= 100 && this.heroesPct < 100) {
          alerts.push({
            icon: '🎯',
            text: this.t('dashboard.alert.baseAchieved', '', { pct: this.basePct.toFixed(0) }),
            bg: 'rgba(16,185,129,.1)',
            border: 'rgba(16,185,129,.4)',
            color: '#6ee7b7',
          });
        }
        if (this.heroesPct >= 100) {
          alerts.push({
            icon: '🎉',
            text: this.t('dashboard.alert.heroesAchieved', '', { pct: this.heroesPct.toFixed(0) }),
            bg: 'rgba(212,168,75,.1)',
            border: 'rgba(212,168,75,.4)',
            color: '#e6c074',
          });
        }
      }
      return alerts;
    },

    monthlyTargetKeyBase() { return this.monthlyBranchId ? `${this.monthlyMonth}|${this.monthlyBranchId}` : null; },
    monthlyBaseTarget: {
      get() {
        if (!this.monthlyTargetKeyBase) return 0;
        return Number(this.monthlyTargets[this.monthlyTargetKeyBase]) || 0;
      },
      set(val) {
        if (!this.monthlyTargetKeyBase) return;
        this.monthlyTargets[this.monthlyTargetKeyBase] = Number(val) || 0;
      },
    },
    monthlyHeroesTarget: {
      get() {
        if (!this.monthlyTargetKeyBase) return 0;
        return Number(this.monthlyHeroesTargets[this.monthlyTargetKeyBase]) || 0;
      },
      set(val) {
        if (!this.monthlyTargetKeyBase) return;
        this.monthlyHeroesTargets[this.monthlyTargetKeyBase] = Number(val) || 0;
      },
    },
    monthlyDays() {
      if (!this.monthlyBranchId) return [];
      const [y, m] = this.monthlyMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const staffIds = this.staff.filter(s => s.branchId === this.monthlyBranchId).map(s => s.id);
      const dayKeys = ['days.sun','days.mon','days.tue','days.wed','days.thu','days.fri','days.sat'];
      const todayKey = this.todayStr;
      const arr = [];
      let cumulative = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const d = this.daily[`${dateStr}|${this.monthlyBranchId}`] || { baseTarget: 0, heroesTarget: 0, staffData: {}, manualExtra: 0 };
        const sales = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
        const baseT = Number(d.baseTarget) || 0;
        const heroesT = Number(d.heroesTarget) || 0;
        cumulative += sales;
        const dt = new Date(y, m - 1, day);
        arr.push({
          date: dateStr, dayName: this.t(dayKeys[dt.getDay()]), sales,
          baseTarget: baseT, heroesTarget: heroesT,
          basePct: baseT > 0 ? (sales / baseT) * 100 : 0,
          heroesPct: heroesT > 0 ? (sales / heroesT) * 100 : 0,
          cumulative, isToday: dateStr === todayKey,
        });
      }
      return arr;
    },
    monthlyDaysWithSales() { return this.monthlyDays.filter(d => d.sales > 0).length; },
    monthlySummary() {
      const days = this.monthlyDays;
      const totalSales = days.reduce((s, d) => s + d.sales, 0);
      const baseT = this.monthlyBaseTarget;
      const heroesT = this.monthlyHeroesTarget;
      return {
        totalSales,
        basePct: baseT > 0 ? (totalSales / baseT) * 100 : 0,
        heroesPct: heroesT > 0 ? (totalSales / heroesT) * 100 : 0,
      };
    },
    monthlyForecast() {
      if (!this.monthlyBranchId) {
        return {
          available: false, totalSales: 0, daysPassed: 0, daysRemaining: 0,
          avgDaily: 0, forecastSales: 0, target: 0, forecastPct: 0,
          willAchieve: false, gap: 0, requiredDaily: 0,
          status: 'unavailable', statusColor: '#94a3b8',
          statusBg: 'rgba(148,163,184,.15)', statusBorder: 'rgba(148,163,184,.3)',
          statusLabel: this.t('monthly.forecast.status.unavailable'), statusIcon: '❓', confidence: 'low',
        };
      }
      const days = this.monthlyDays;
      if (!days.length) return { available: false };

      const [y, m] = this.monthlyMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const todayStr = this.todayStr;
      const isCurrentMonth = todayStr.slice(0, 7) === this.monthlyMonth;
      const totalSales = days.reduce((s, d) => s + d.sales, 0);
      const activeDays = days.filter(d => d.sales > 0).length;
      let daysPassed;
      if (isCurrentMonth) daysPassed = parseInt(todayStr.slice(8, 10));
      else daysPassed = daysInMonth;
      const daysRemaining = Math.max(0, daysInMonth - daysPassed);
      const avgDaily = activeDays > 0 ? totalSales / activeDays : 0;
      const forecastSales = totalSales + (avgDaily * daysRemaining);
      const target = Number(this.monthlyBaseTarget) || 0;
      const forecastPct = target > 0 ? (forecastSales / target) * 100 : 0;
      const gap = Math.max(0, target - totalSales);
      const requiredDaily = daysRemaining > 0 ? gap / daysRemaining : 0;

      let status, statusColor, statusBg, statusBorder, statusLabel, statusIcon;
      if (totalSales === 0 && activeDays === 0) {
        status = 'no-data'; statusColor = '#94a3b8'; statusBg = 'rgba(148,163,184,.15)'; statusBorder = 'rgba(148,163,184,.3)'; statusLabel = this.t('monthly.forecast.status.noData'); statusIcon = '📝';
      } else if (forecastPct >= 110) {
        status = 'excellent'; statusColor = '#6ee7b7'; statusBg = 'rgba(16,185,129,.15)'; statusBorder = 'rgba(16,185,129,.4)'; statusLabel = this.t('monthly.forecast.status.excellent'); statusIcon = '🌟';
      } else if (forecastPct >= 100) {
        status = 'achieving'; statusColor = '#34d399'; statusBg = 'rgba(16,185,129,.15)'; statusBorder = 'rgba(16,185,129,.4)'; statusLabel = this.t('monthly.forecast.status.achieving'); statusIcon = '✅';
      } else if (forecastPct >= 85) {
        status = 'close'; statusColor = '#fcd34d'; statusBg = 'rgba(245,158,11,.15)'; statusBorder = 'rgba(245,158,11,.4)'; statusLabel = this.t('monthly.forecast.status.close'); statusIcon = '⚠️';
      } else if (forecastPct >= 60) {
        status = 'risky'; statusColor = '#fb923c'; statusBg = 'rgba(249,115,22,.15)'; statusBorder = 'rgba(249,115,22,.4)'; statusLabel = this.t('monthly.forecast.status.risky'); statusIcon = '🚨';
      } else {
        status = 'critical'; statusColor = '#fda4af'; statusBg = 'rgba(244,63,94,.15)'; statusBorder = 'rgba(244,63,94,.4)'; statusLabel = this.t('monthly.forecast.status.critical'); statusIcon = '🔴';
      }
      let confidence = 'low';
      if (activeDays >= 15) confidence = 'high';
      else if (activeDays >= 7) confidence = 'medium';

      return {
        available: true, totalSales, daysPassed, daysRemaining, daysInMonth,
        activeDays, avgDaily, forecastSales, target, forecastPct,
        willAchieve: forecastPct >= 100, gap, requiredDaily,
        status, statusColor, statusBg, statusBorder, statusLabel, statusIcon,
        confidence, isCurrentMonth,
      };
    },

    distBaseSum() { return this.distDays.reduce((s, d) => s + (Number(d.base) || 0), 0); },
    distHeroesSum() { return this.distDays.reduce((s, d) => s + (Number(d.heroes) || 0), 0); },
    distBaseMatches() {
      const t = this.monthlyTargetFor(this.distMonth, this.distBranchId, 'base');
      return Math.abs(this.distBaseSum - t) < 1;
    },
    distHeroesMatches() {
      const t = this.monthlyTargetFor(this.distMonth, this.distBranchId, 'heroes');
      return Math.abs(this.distHeroesSum - t) < 1;
    },

    availableYears() {
      const now = new Date().getFullYear();
      const years = [];
      for (let y = now; y >= now - 5; y--) years.push(y);
      return years;
    },
    yoyMonthlyComparison() {
      if (!this.yoyBranchId) return [];
      return [1,2,3,4,5,6,7,8,9,10,11,12].map((m) => {
        const curr = this.getMonthSales(this.yoyYear, m, this.yoyBranchId);
        const prev = this.getMonthSales(this.yoyYear - 1, m, this.yoyBranchId);
        const diff = curr - prev;
        return {
          monthNum: m, monthName: this.t('months.' + m),
          current: curr, previous: prev, diff,
          growth: prev > 0 ? (diff / prev) * 100 : 0,
        };
      });
    },
    yoyTotalCurrent() { return this.yoyMonthlyComparison.reduce((s, m) => s + m.current, 0); },
    yoyTotalPrevious() { return this.yoyMonthlyComparison.reduce((s, m) => s + m.previous, 0); },
    yoyGrowth() {
      const prev = this.yoyTotalPrevious;
      return prev > 0 ? ((this.yoyTotalCurrent - prev) / prev) * 100 : 0;
    },

    analyticsSeries() {
      const arr = [];
      for (let i = this.analyticsRange - 1; i >= 0; i--) {
                const d = new Date();
        d.setDate(d.getDate() - i);
        const key = localDateStr(d);
        const dayRec = this.daily[`${key}|${this.analyticsBranchId}`] || { baseTarget: 0, staffData: {}, manualExtra: 0 };
        const staffIds = this.staff.filter(s => s.branchId === this.analyticsBranchId).map(s => s.id);
        const sales = staffIds.reduce((sum, id) => sum + (Number(dayRec.staffData?.[id]?.sales) || 0), 0) + (Number(dayRec.manualExtra) || 0);
        arr.push({ date: key, sales, target: Number(dayRec.baseTarget) || 0 });
      }
      return arr;
    },
    analyticsTotalTarget() {
      return (this.analyticsSeries || []).reduce((sum, x) => sum + (Number(x.target) || 0), 0);
    },
    analyticsSummary() {
      const allSeries = this.analyticsSeries || [];
      const series = allSeries.filter(x => x.sales > 0);
      const totalSales = series.reduce((s, x) => s + x.sales, 0);
      const totalTarget = allSeries.reduce((s, x) => s + (Number(x.target) || 0), 0);
      const daysCount = series.length;
      const avgSales = daysCount ? totalSales / daysCount : 0;
      let bestSales = 0, bestDate = '';
      series.forEach(x => { if (x.sales > bestSales) { bestSales = x.sales; bestDate = x.date; } });
      return { totalSales, totalTarget, avgSales, bestSales, bestDate, daysCount };
    },

    allowedBranches() {
      if (!this.currentUser) return [];
      if (this.currentUser.role === 'admin' || this.currentUser.role === 'manager') return this.branches;
      if (this.currentUser.role === 'viewer') {
        return this.currentUser.branchId ? this.branches.filter(b => b.id === this.currentUser.branchId) : this.branches;
      }
      if (this.currentUser.role === 'branch_manager' || this.currentUser.role === 'cashier') {
        return this.branches.filter(b => b.id === this.currentUser.branchId);
      }
      return [];
    },
    isManagement() {
      return this.currentUser && (this.currentUser.role === 'admin' || this.currentUser.role === 'manager');
    },

    // ⭐ v23.20: فحص قفل اليوميات وتعديل الأيام السابقة
    canEditPastDays() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.editPastDays === true;
    },
    isPastDateLocked() {
      if (!this.selectedDate || !this.todayStr) return false;
      // إذا كان التاريخ المختار قبل اليوم الحالي ولم يكن لدى المستخدم صلاحية تعديل الأيام السابقة
      return (this.selectedDate < this.todayStr) && !this.canEditPastDays;
    },

    // ⭐ v23.21: حوكمة إغلاق اليوميات وسجل التدقيق
    isDayClosed() {
      if (!this.selectedDate || !this.selectedBranchId) return false;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const rec = this.daily[key];
      return !!(rec && rec.isClosed);
    },
    dayCloseInfo() {
      if (!this.selectedDate || !this.selectedBranchId) return null;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const rec = this.daily[key];
      if (!rec || !rec.isClosed) return null;
      return {
        closedAt: rec.closedAt ? new Date(rec.closedAt).toLocaleString(this.currentLang === 'ar' ? 'ar-SA' : 'en-US') : '—',
        closedBy: rec.closedBy || '—',
        closedSales: rec.closedSales || 0,
        closedInvoices: rec.closedInvoices || 0,
        closeNote: rec.closeNote || '',
      };
    },
    canCloseDay() {
      if (!this.currentUser) return false;
      return ['admin', 'manager', 'branch_manager'].includes(this.currentUser.role);
    },
    canReopenDay() {
      if (!this.currentUser) return false;
      return this.currentUser.role === 'admin';
    },
    // ⭐ v23.22: صلاحيات وسجل التدقيق والعمليات (Audit Trail)
    canViewActivityLog() {
      if (!this.currentUser) return false;
      return ['admin', 'manager', 'viewer'].includes(this.currentUser.role);
    },
    activityLogStats() {
      const logs = this.activityLog || [];
      const total = logs.length;
      const now = new Date();
      const todayCount = logs.filter(l => {
        if (!l.timestamp) return false;
        const d = new Date(l.timestamp);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
      }).length;
      const salesCount = logs.filter(l => l.category === 'sales' || l.category === 'target' || (l.action && (l.action.includes('💰') || l.action.includes('🎯') || l.action.includes('مبيعات') || l.action.includes('تارجت')))).length;
      const securityCount = logs.filter(l => l.category === 'security' || l.category === 'system' || (l.action && (l.action.includes('غير مصرح') || l.action.includes('مسح') || l.action.includes('⚠️') || l.action.includes('نسخ') || l.action.includes('سحاب')))).length;
      return { total, todayCount, salesCount, securityCount };
    },
    filteredActivityLog() {
      if (!this.activityLog || !Array.isArray(this.activityLog)) return [];
      let list = this.activityLog;

      if (this.activityLogFilter === 'financial') {
        list = list.filter(l => l.category === 'sales' || (l.action && (l.action.includes('💰') || l.action.includes('مبيعات'))));
      } else if (this.activityLogFilter === 'targets') {
        list = list.filter(l => l.category === 'target' || (l.action && (l.action.includes('🎯') || l.action.includes('تارجت') || l.action.includes('أبطال'))));
      } else if (this.activityLogFilter === 'closes') {
        list = list.filter(l => l.category === 'closes' || (l.action && (l.action.includes('إغلاق') || l.action.includes('فتح يومية') || l.action.includes('🔒') || l.action.includes('🔓'))));
      } else if (this.activityLogFilter === 'users') {
        list = list.filter(l => l.category === 'users' || l.category === 'branches' || (l.action && (l.action.includes('مستخدم') || l.action.includes('فرع') || l.action.includes('موظف') || l.action.includes('👥') || l.action.includes('🏬'))));
      } else if (this.activityLogFilter === 'security') {
        list = list.filter(l => l.category === 'security' || (l.action && (l.action.includes('دخول') || l.action.includes('خروج') || l.action.includes('غير مصرح') || l.action.includes('مسح') || l.action.includes('🛡️') || l.action.includes('⚠️'))));
      } else if (this.activityLogFilter === 'system') {
        list = list.filter(l => l.category === 'system' || (l.action && (l.action.includes('نسخ') || l.action.includes('استيراد') || l.action.includes('تصدير') || l.action.includes('سحاب') || l.action.includes('هوية'))));
      }

      if (this.activityLogSearch && this.activityLogSearch.trim()) {
        const q = this.activityLogSearch.trim().toLowerCase();
        list = list.filter(l => {
          const act = (l.action || '').toLowerCase();
          const det = (l.details || '').toLowerCase();
          const usr = (l.user || '').toLowerCase();
          const un = (l.username || '').toLowerCase();
          const br = (l.branchName || '').toLowerCase();
          const tm = (l.time || '').toLowerCase();
          return act.includes(q) || det.includes(q) || usr.includes(q) || un.includes(q) || br.includes(q) || tm.includes(q);
        });
      }

      return list;
    },

    canEnterDailySales() {
      if (!this.currentUser) return false;
      if (this.isDayClosed) return false; // 🔒 اليومية مغلقة ومرحلة
      if (this.isPastDateLocked) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.enterDailySales !== false;
    },
    // ⭐ v23.23: صلاحية إدارة الحضور والغياب للموظفين لتوزيع التارجت
    canManageAttendance() {
      if (!this.currentUser) return false;
      if (this.isDayClosed) return false; // 🔒 اليومية مغلقة ومرحلة
      if (this.isPastDateLocked) return false; // 🔒 مقفل إذا كان قبل اليوم وبدون صلاحية تعديل الأيام السابقة
      // المدير العام، المدير، ومدير الفرع/المعرض
      if (['admin', 'manager', 'branch_manager'].includes(this.currentUser.role)) return true;
      // أو أي موظف مسؤول لديه صلاحية إدخال المبيعات أو تعديل التارجت أو إدارة الموظفين
      const u = this.users.find(x => x.id === this.currentUser.id);
      if (u && u.permissions) {
        if (u.permissions.enterDailySales || u.permissions.editTarget || u.permissions.manageStaff) return true;
      }
      return false;
    },
    canEditTarget() {
      if (!this.currentUser) return false;
      if (this.isDayClosed) return false; // 🔒 اليومية مغلقة ومرحلة
      if (this.isPastDateLocked) return false;
      if (['admin', 'manager', 'branch_manager'].includes(this.currentUser.role)) return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.editTarget === true;
    },
    canManageBranches() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.manageBranches === true;
    },
    canManageStaff() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.manageStaff === true;
    },
    canExport() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.exportReports !== false;
    },
    canViewFinancial() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'admin') return true;
      const u = this.users.find(x => x.id === this.currentUser.id);
      return u && u.permissions && u.permissions.viewFinancialReports !== false;
    },

    setupStep() { return this.setupWizard.step; },
    isLastSetupStep() { return this.setupWizard.step === 4; },
    canProceedSetup() {
      const step = this.setupWizard.step;
      if (step === 0) return true;
      if (step === 1) return this.setupWizardForm.companyName.trim().length > 0;
      if (step === 2) return !!this.setupWizardForm.sector;
      if (step === 3) return this.setupWizardForm.branchCode.trim() && this.setupWizardForm.branchName.trim();
      return true;
    },
    setupLogoPreview() {
      return this.setupWizardForm.logoDataURL || 'samx-logo.svg';
    },
    activeLogo() {
      return this.branding.logoDataURL || 'samx-logo.svg';
    },
    activeCompanyName() {
      return this.branding.companyName || 'SAMX';
    },
    activeCompanyDesc() {
      return this.branding.companyDesc || 'إدارة المبيعات';
    },
    activeCopyright() {
      return this.branding.copyrightText || '© 2026 SAMX';
    },
    hasCustomLogo() {
      return !!this.branding.logoDataURL;
    },
    sectorTemplates() {
      return SECTOR_TEMPLATES_CONST;
    },
    unreadNotificationsCount() { return this.notifications.filter(n => !n.read).length; },

    groupedSearchResults() {
      const branchesLabel = this.t('search.group.branches');
      const staffLabel = this.t('search.group.staff');
      const usersLabel = this.t('search.group.users');
      const groups = {};
      groups[branchesLabel] = [];
      groups[staffLabel] = [];
      groups[usersLabel] = [];
      let globalIdx = 0;
      this.searchResults.forEach(r => {
        r.globalIndex = globalIdx++;
        if (r.type === 'branch') groups[branchesLabel].push(r);
        else if (r.type === 'staff') groups[staffLabel].push(r);
        else if (r.type === 'user') groups[usersLabel].push(r);
      });
      return groups;
    },
    morningAlertCheck() {
      const today = this.todayStr;
            const yesterday = (() => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return localDateStr(d);
      })();
      if (this.lastMorningAlertDate === today) return '';
      const unrecorded = [];
      const branchesToCheck = this.allowedBranches;
      branchesToCheck.forEach(b => {
        const key = `${yesterday}|${b.id}`;
        const d = this.daily[key];
        let hasSales = false;
        if (d) {
          const staffIds = this.staff.filter(s => s.branchId === b.id).map(s => s.id);
          const total = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
          hasSales = total > 0;
        }
        if (!hasSales) unrecorded.push(b.name);
      });
      if (unrecorded.length === 0) return '';
      if (unrecorded.length === 1) return this.t('morning.oneBranch', '', { branch: unrecorded[0] });
      const list = unrecorded.slice(0, 3).join(this.t('morning.listSeparator'));
      const extra = unrecorded.length > 3 ? this.t('morning.manyMore', '', { count: unrecorded.length - 3 }) : '';
      return this.t('morning.manyBranches', '', { count: unrecorded.length, list: list + extra });
    },
    staffJobStats() {
      if (!this.bulkPreview.loaded || !this.bulkPreview.newStaff.length) return [];
      const stats = new Map();
      this.bulkPreview.newStaff.forEach(s => {
        const title = s.jobTitle || 'غير محدد';
        if (!stats.has(title)) stats.set(title, { title, count: 0, valid: this.isJobTitleValid(title) });
        stats.get(title).count++;
      });
      return Array.from(stats.values()).sort((a, b) => b.count - a.count);
    },
    filteredBranches() {
      if (!this.searchBranch) return this.branches;
      const q = this.searchBranch.toLowerCase();
      return this.branches.filter(b => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q));
    },
    filteredStaff() {
      let arr = this.staff;
      if (this.currentUser && this.currentUser.role === 'branch_manager') {
        arr = arr.filter(s => s.branchId === this.currentUser.branchId);
      }
      if (this.searchStaff) {
        const q = this.searchStaff.toLowerCase();
        arr = arr.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
      }
      return arr;
    },
  },

  watch: {
    branches: { handler() { this.schedulePersist(); }, deep: true },
    staff: { handler() { this.schedulePersist(); }, deep: true },
    daily: { handler() { this.schedulePersist(); }, deep: true },
    monthlyTargets: { handler() { this.schedulePersist(); }, deep: true },
    monthlyHeroesTargets: { handler() { this.schedulePersist(); }, deep: true },
    attendance: { handler() { this.schedulePersist(); }, deep: true },
    users: { handler() { this.persistUsers(); }, deep: true },
    selectedDate(val) {
      const norm = this.normalizeDateStr(val);
      if (norm && norm !== val) {
        this.selectedDate = norm;
        return;
      }
      this.refreshCharts();
      this.staffPage = 1;
      nextTick(() => this.autoDistributeCurrentDay());
    },
    selectedBranchId() {
      this.refreshCharts();
      this.staffPage = 1;
      nextTick(() => this.autoDistributeCurrentDay());
    },
    currentView(val) {
      if (val !== 'dashboard' && val !== 'kpi') this.safeDestroyChart('staffChartInstance');
      if (val !== 'monthly') this.safeDestroyChart('monthlyChartInstance');
      if (val !== 'analytics') this.safeDestroyChart('trendChartInstance');
      if (val !== 'yoy') this.safeDestroyChart('yoyChartInstance');
      nextTick(() => {
        setTimeout(() => {
          if (val === 'analytics') this.renderTrendChart();
          if (val === 'monthly')   this.renderMonthlyChart();
          if (val === 'yoy')       this.renderYoYChart();
          if (val === 'dashboard' || val === 'kpi') this.renderStaffChart();
        }, 150);
      });
    },       
    analyticsBranchId() { nextTick(() => this.renderTrendChart()); },
    analyticsRange() { nextTick(() => this.renderTrendChart()); },
    monthlyBranchId() { nextTick(() => this.renderMonthlyChart()); },
    monthlyMonth() { nextTick(() => this.renderMonthlyChart()); },
    monthlyDays: { handler() { nextTick(() => this.renderMonthlyChart()); }, deep: true },
    staffRowsComputed: { handler() { nextTick(() => this.renderStaffChart()); }, deep: true },
    yoyBranchId() { nextTick(() => this.renderYoYChart()); },
    yoyYear() { nextTick(() => this.renderYoYChart()); },
    drawerOpen(val) { if (val) this.initDistDays(); },
    distMonth() { this.initDistDays(); },
    distBranchId() { this.initDistDays(); },
      settings: { handler() { this.saveSettingsToStorage(); }, deep: true },
    branding: { handler() { this.persistBranding(); }, deep: true },
    darkMode() { nextTick(() => this.refreshCharts()); },

    // ⭐ v23.3: i18n — مراقبة تغيير اللغة
    currentLang(val) {
      this.applyLanguageAttributes();
      nextTick(() => this.refreshCharts());
    },
  },

  methods: {
    // ================================================================
    //  ⭐ v23.3: i18n — دوال الترجمة
    // ================================================================
    // ⭐ v23.4-FIX: t() انتقلت إلى computed — نُبقي $t() فقط كاسم بديل
    $t(key, fallback, params) {
      return this.t(key, fallback, params);
    },
    // ⭐ v23.10: اهتزاز خفيف (Haptic Feedback)
    vibrate(pattern = 10) {
      try {
        if (navigator.vibrate) navigator.vibrate(pattern);
      } catch (e) { /* لا شيء — بعض المتصفحات تحظر */ }
    },

    // ⭐ v23.10: Enter في حقل المبيعات → انتقل للموظف التالي
    onSalesEnter(staffId) {
      const present = this.staffRowsComputed.filter(s => s.present);
      const idx = present.findIndex(s => s.id === staffId);
      if (idx < 0 || idx >= present.length - 1) {
        // آخر موظف → أغلق الكيبورد
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        return;
      }
      const nextId = present[idx + 1].id;
      setTimeout(() => {
        const el = document.querySelector(`input[data-staff-sales="${nextId}"]`);
        if (el) {
          el.focus();
          el.select();
        }
      }, 50);
    },

    // ⭐ v23.4-FIX: showToast — كانت مفقودة! تُستدعى من 30+ مكان
    showToast(msg, type = '') {
      this.toast = msg || '';
      this.toastType = type || '';
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        this.toast = '';
        this.toastType = '';
      }, 2500);
    },

    // ⭐ v23.4-FIX: applyTheme — كانت مفقودة! تُستدعى عند mount وتغيير الثيم
    applyTheme() {
      document.documentElement.classList.toggle('light', !this.darkMode);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', this.darkMode ? '#0b1220' : '#ffffff');
      }
    },
    setLanguage(lang) {
      if (!window.SAMX_i18n) {
        console.warn('[i18n] SAMX_i18n غير محمّلة');
        return;
      }
      if (!window.SAMX_i18n.SUPPORTED_LANGS.includes(lang)) {
        console.warn('[i18n] لغة غير مدعومة:', lang);
        return;
      }
      // 1. حدّث مصدر i18n
      window.SAMX_i18n.setLang(lang);
      // 2. حدّث Vue reactive state — يُشعل computed t() لإعادة التقييم
      this.currentLang = lang;
      // 3. طبّق سمات DOM
      this.applyLanguageAttributes();
      // 4. ⭐ v23.4-FIX: إجبار إعادة الرسم + تحديث الرسوم
      nextTick(() => {
        this.$forceUpdate();
        this.refreshCharts();
      });
      // 5. Toast
      const langName = this.t('lang.' + lang, lang);
      this.showToast(`🌍 ${langName}`, 'success');
    },
    applyLanguageAttributes() {
      const dir = this.langDir;
      const lang = this.currentLang;
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', dir);
      // بعض المتصفحات تحتاج body أيضاً
      if (document.body) {
        document.body.setAttribute('dir', dir);
      }
    },

    // ================================================================
    //  نظام التنقل
    // ================================================================
    // ⭐ v23.9-FIX#4: جدولة رسم المخطط + إجبار resize بعد ظهور الحاوية
    // ⭐ v23.9-CHART#1: تسجيل Plugins مخصصة مرة واحدة فقط
    registerChartPlugins() {
      if (this._chartPluginsRegistered) return;

      // Plugin: القيم على الأعمدة/الشرائح
      const dataLabelsPlugin = {
        id: 'samxDataLabels',
        afterDatasetsDraw(chart) {
          if (!chart.options?.plugins?.samxDataLabels?.enabled) return;
          const ctx = chart.ctx;
          const meta = chart.getDatasetMeta(0);
          const values = chart.data.datasets[0].data || [];
          const pcts = chart.data.datasets[0].$pcts || [];
          const type = chart.config.type;

          meta.data.forEach((el, i) => {
            const val = values[i];
            if (!val || val === 0) return;
            const pct = pcts[i] || 0;
            const icon = pct >= 100 ? '✅' : pct >= 70 ? '⚠️' : '🚨';
            const labelText = chart.options.plugins.samxDataLabels.format(val, pct, icon);
            if (!labelText) return;

            ctx.save();
            ctx.font = 'bold 11px Cairo, system-ui, sans-serif';
            ctx.textBaseline = 'middle';

            if (type === 'bar') {
              // على يمين العمود
              const pos = el.tooltipPosition();
              ctx.textAlign = 'left';
              ctx.fillStyle = chart.options.plugins.samxDataLabels.color;
              ctx.fillText(labelText, pos.x + 8, pos.y);
            } else {
              // داخل الشريحة (doughnut/pie)
              const pos = el.tooltipPosition();
              const mid = chart.getDatasetMeta(0).data[i];
              const arc = mid;
              const angle = (arc.startAngle + arc.endAngle) / 2;
              const r = (arc.innerRadius + arc.outerRadius) / 2;
              const cx = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
              const cy = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              ctx.textAlign = 'center';
              ctx.fillStyle = '#ffffff';
              ctx.strokeStyle = 'rgba(0,0,0,0.5)';
              ctx.lineWidth = 3;
              ctx.strokeText(labelText, x, y);
              ctx.fillText(labelText, x, y);
            }
            ctx.restore();
          });
        },
      };

      // Plugin: خط التارجت لكل عمود
      const targetLinePlugin = {
        id: 'samxTargetLines',
        afterDatasetsDraw(chart) {
          if (chart.config.type !== 'bar') return;
          if (!chart.options?.plugins?.samxTargetLines?.enabled) return;
          const targets = chart.data.datasets[0].$targets || [];
          if (!targets.length) return;
          const ctx = chart.ctx;
          const meta = chart.getDatasetMeta(0);
          const xScale = chart.scales.x;

          ctx.save();
          ctx.setLineDash([5, 3]);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.9)';

          meta.data.forEach((el, i) => {
            const target = targets[i];
            if (!target || target <= 0) return;
            const xPos = xScale.getPixelForValue(target);
            const y1 = el.y - el.height / 2;
            const y2 = el.y + el.height / 2;
            ctx.beginPath();
            ctx.moveTo(xPos, y1);
            ctx.lineTo(xPos, y2);
            ctx.stroke();
          });
          ctx.restore();
        },
      };

      Chart.register(dataLabelsPlugin, targetLinePlugin);
      this._chartPluginsRegistered = true;
      console.log('[Chart] ✅ Custom plugins registered');
    },

    // ⭐ v23.9-CHART#1: تبديل نوع المخطط
    makeGradient(ctx, color1, color2, horizontal = true) {
      const g = horizontal
        ? ctx.createLinearGradient(0, 0, 400, 0)
        : ctx.createLinearGradient(0, 0, 0, 400);
      g.addColorStop(0, color1);
      g.addColorStop(1, color2);
      return g;
    },

    safeDestroyChart(key) {
      const inst = this[key];
      if (inst) {
        try {
          if (typeof inst.stop === 'function') inst.stop();
          if (window.Chart && window.Chart.animator && typeof window.Chart.animator.remove === 'function') {
            try { window.Chart.animator.remove(inst); } catch (e) {}
            const raw = typeof toRaw === 'function' ? toRaw(inst) : inst;
            if (raw) {
              try { window.Chart.animator.remove(raw); } catch (e) {}
            }
          }
          if (typeof inst.destroy === 'function') {
            inst.destroy();
          }
        } catch (e) {
          console.warn('[Chart] safeDestroyChart error for', key, e);
        }
        this[key] = null;
      }
    },

    setStaffChartType(type) {
      if (!['bar', 'doughnut', 'pie'].includes(type)) return;
      if (type === this.staffChartType) return;

      // 1. دمّر الـ instance القديمة بأمان
      this.safeDestroyChart('staffChartInstance');

      // 2. غيّر النوع + احفظه
      this.staffChartType = type;
      try { localStorage.setItem('samx_staff_chart_type', type); } catch(e) {}

      // 3. زيادة الـ key
      this.staffChartKey++;

      // 4. انتظر Vue ثم ارسم على الـ canvas الجديدة
      this.$nextTick(() => {
        setTimeout(() => this.renderStaffChart(), 50);
      });
    },   
    // ⭐ v23.19: حارس الصلاحيات والتنقل بين الشاشات (Navigation Guard)
    canAccessView(viewName) {
      if (!viewName || viewName === 'welcome') return true;
      if (!this.currentUser) return false;
      if (viewName === 'users') {
        return this.currentUser.role === 'admin';
      }
      if (viewName === 'branches') {
        return !!this.canManageBranches;
      }
      if (viewName === 'staff') {
        return !!this.canManageStaff;
      }
      if (viewName === 'admin') {
        return !!this.isManagement;
      }
      return true;
    },

    openView(viewName) {
      this.showMoreMenu = false;
      if (!this.canAccessView(viewName)) {
        this.showToast(this.t('toast.permissionDenied', 'غير مصرح لك بالوصول إلى هذه الشاشة ⛔'), 'warning');
        this.logActivity(this.t('log.unauthorized', 'محاولة وصول غير مصرح'), viewName);
        return;
      }
      this.previousView = this.currentView;
      this.currentView = viewName;
      if (viewName !== 'dashboard' && viewName !== 'kpi') this.safeDestroyChart('staffChartInstance');
      if (viewName !== 'monthly') this.safeDestroyChart('monthlyChartInstance');
      if (viewName !== 'analytics') this.safeDestroyChart('trendChartInstance');
      if (viewName !== 'yoy') this.safeDestroyChart('yoyChartInstance');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { history.replaceState(null, '', '#' + viewName); } catch (e) {}
      nextTick(() => {
        setTimeout(() => {
          if (viewName === 'dashboard' || viewName === 'kpi') this.renderStaffChart();
          if (viewName === 'monthly')   this.renderMonthlyChart();
          if (viewName === 'analytics') this.renderTrendChart();
          if (viewName === 'yoy')       this.renderYoYChart();
        }, 100);
      });
    },

    closeView() {
      this.showMoreMenu = false;
      this.currentView = 'welcome';
      this.safeDestroyChart('staffChartInstance');
      this.safeDestroyChart('monthlyChartInstance');
      this.safeDestroyChart('trendChartInstance');
      this.safeDestroyChart('yoyChartInstance');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { history.replaceState(null, '', '#'); } catch (e) {}
    },

    roleLabel(role) {
      const fallbacks = {
        admin: 'مدير عام',
        manager: 'مشرف',
        branch_manager: 'مدير فرع',
        cashier: 'بائع / كاشير',
        viewer: 'مشاهد / مدقق',
      };
      return this.t('header.role.' + role, fallbacks[role] || role);
    },

    roleBadgeStyle(role) {
      if (role === 'admin') return { background: 'rgba(212,168,75,.2)', color: '#e6c074' };
      if (role === 'manager') return { background: 'rgba(59,130,246,.2)', color: '#93c5fd' };
      if (role === 'branch_manager') return { background: 'rgba(139,92,246,.2)', color: '#c4b5fd' };
      if (role === 'cashier') return { background: 'rgba(16,185,129,.2)', color: '#6ee7b7' };
      if (role === 'viewer') return { background: 'rgba(148,163,184,.2)', color: '#cbd5e1' };
      return { background: 'rgba(255,255,255,.1)', color: '#fff' };
    },

    onRoleChange() {
      const role = this.userForm.role;
      if (ROLE_PERMISSIONS[role]) {
        this.userForm.permissions = { ...ROLE_PERMISSIONS[role] };
      }
      if (role === 'admin') {
        this.userForm.branchId = '';
      }
    },

    // ⭐ v23.8: طلب تخزين دائم من المتصفح
    async requestPersistentStorage() {
      if (!navigator.storage || !navigator.storage.persist) {
        console.log('[Storage] Persist API not available');
        return;
      }
      try {
        const isPersisted = await navigator.storage.persisted();
        if (isPersisted) {
          console.log('[Storage] ✅ Already persistent');
          return;
        }
        const granted = await navigator.storage.persist();
        console.log('[Storage] ' + (granted ? '✅ Persistent granted' : '⚠️ Persistent denied'));
      } catch (e) {
        console.warn('[Storage] persist() failed:', e);
      }
    },

    // ═══════════════════════════════════════════════════════
    //  ⭐ v23.7: Seed Versioning
    // ═══════════════════════════════════════════════════════
    // ═══════════════════════════════════════════════════════
    //  ⭐ v23.7: Seed Versioning
    // ═══════════════════════════════════════════════════════

    // فحص وتطبيق Seed عند بدء التطبيق
            checkAndApplySeed() {
      const seed = window.SAMX_SEED;
      if (!seed || !seed.version || !seed.data) {
        console.log('[Seed] No seed data found');
        return;
      }
      // ⭐ v23.9-SHIELD: تأكد من صلاحية seed
      if (!Array.isArray(seed.data.branches) || seed.data.branches.length === 0) {
        console.warn('[Seed] ⛔ Refusing empty/invalid seed');
        return;
      }

      const storedVersion = localStorage.getItem('samx_seed_version');
      let savedBranches = [];
      try {
        savedBranches = JSON.parse(localStorage.getItem('samx_branches') || '[]');
      } catch (e) {
        savedBranches = [];
      }
      const hasLocalData = Array.isArray(savedBranches) && savedBranches.length > 0;
      const dismissedVersion = localStorage.getItem('samx_seed_dismissed');

      // ⭐ v23.9-SHIELD-CRITICAL: إذا كانت هناك بيانات محفوظة، لا تُطبِّق Seed إلا بتأكيد صريح
      if (hasLocalData) {
        // الحالة 2: نفس الإصدار — لا شيء
        if (seed.version === storedVersion) {
          console.log('[Seed] Up to date:', seed.version);
          return;
        }
        // الحالة 3: تجاهله المستخدم سابقاً
        if (seed.version === dismissedVersion) {
          console.log('[Seed] Update dismissed by user');
          return;
        }
        // الحالة 4: Seed جديد متوفر — أظهر إشعاراً فقط (لا تطبّق)
        console.log('[Seed] 🎉 Update available (user action required):', storedVersion, '→', seed.version);
        this.seedUpdateAvailable = true;
        this.seedNewVersion = seed.version;
        this.seedNewMonth = seed.month || '';
        return;
      }

      // الحالة 1: لا بيانات محلية — أول زيارة (آمن)
      console.log('[Seed] First visit — applying seed:', seed.version);
      this.applySeedData(seed.data);
      localStorage.setItem('samx_seed_version', seed.version);
    },

    // تطبيق بيانات Seed (بدون الحفاظ على البيانات القديمة)
    applySeedData(seedData) {
      if (seedData.branches) this.branches = seedData.branches;
      if (seedData.staff) this.staff = seedData.staff;
      if (seedData.monthlyTargets) this.monthlyTargets = seedData.monthlyTargets;
      if (seedData.monthlyHeroesTargets) this.monthlyHeroesTargets = seedData.monthlyHeroesTargets;
      if (seedData.branding) {
        this.branding = { ...this.branding, ...seedData.branding };
      }
      // ⭐ v23.8: تطبيق المستخدمين إذا وُجدوا في Seed
      if (Array.isArray(seedData.users) && seedData.users.length > 0) {
        this.users = seedData.users;
        this.persistUsers();
        console.log('[Seed] ✅ Applied', seedData.users.length, 'users');
      }
            // ⭐ v23.12-FIX: اكتب مباشرة لـ localStorage (persist() محجوبة قبل load)
      try {
        localStorage.setItem('samx_branches', JSON.stringify(this.branches || []));
        localStorage.setItem('samx_staff', JSON.stringify(this.staff || []));
        localStorage.setItem('samx_monthlyTargets', JSON.stringify(this.monthlyTargets || {}));
        localStorage.setItem('samx_monthlyHeroesTargets', JSON.stringify(this.monthlyHeroesTargets || {}));
        if (seedData.branding) {
          localStorage.setItem('samx_branding', JSON.stringify(this.branding));
        }
        console.log('[Seed] ✅ Data persisted directly to localStorage');
      } catch (e) {
        console.error('[Seed] ❌ Direct persist failed:', e);
      }
    },
    // تطبيق تحديث Seed مع الحفاظ على البيانات اليومية
    applySeedUpdate() {
      try {
        const seed = window.SAMX_SEED;
        if (!seed || !seed.data) {
          this.showToast(this.t('seed.update.failed'), 'error');
          return;
        }

        // 1. احفظ بيانات المستخدم الشخصية
        const userData = {
          daily: this.daily,
          attendance: this.attendance,
          activityLog: this.activityLog,
          notifications: this.notifications,
          autoBackups: this.autoBackups,
        };

        // 2. طبّق Seed الجديد (فروع + موظفين + تارجت)
        this.applySeedData(seed.data);

        // 3. استعد بيانات المستخدم
        this.daily = userData.daily || {};
        this.attendance = userData.attendance || {};
        this.activityLog = userData.activityLog || [];
        this.notifications = userData.notifications || [];
        this.autoBackups = userData.autoBackups || [];

        // 4. احفظ الإصدار الجديد
        localStorage.setItem('samx_seed_version', seed.version);
        localStorage.removeItem('samx_seed_dismissed');

        // 5. أخفي الإشعار
        this.seedUpdateAvailable = false;

        // 6. احفظ كل شيء
        this.persist();
        this.persistNotifications();
        this.persistActivityLog();

        this.showToast(this.t('seed.update.success'), 'success');
        console.log('[Seed] ✅ Updated to version:', seed.version);
      } catch (e) {
        console.error('[Seed] Update failed:', e);
        this.showToast(this.t('seed.update.failed'), 'error');
      }
    },

    // تجاهل التحديث
    dismissSeedUpdate() {
      const seed = window.SAMX_SEED;
      if (seed && seed.version) {
        localStorage.setItem('samx_seed_dismissed', seed.version);
      }
      this.seedUpdateAvailable = false;
      console.log('[Seed] Update dismissed');
    },

    // تصدير Seed (v23.8: مع المستخدمين بكلمات مرورهم الأصلية)
    exportSeed() {
      const version = prompt(this.t('seed.export.versionPrompt'), '1.0');
      if (!version) return;

      // هل نضمّن المستخدمين؟
      const includeUsers = confirm(
        'هل تريد تضمين المستخدمين في Seed؟\n\n' +
        '⚠️ تنبيه: سيتم تضمين كلمات المرور (مشفرة) في الملف.\n' +
        'احفظ الملف في مكان آمن ولا تشاركه علناً.\n\n' +
        'المستخدمون سيستطيعون الدخول بكلمات مرورهم الحالية.'
      );

      const seedUsers = includeUsers ? this.users.map(u => ({
        id: u.id,
        username: u.username,
        passwordHash: u.passwordHash,   // ⭐ كلمة المرور الأصلية
        fullName: u.fullName,
        role: u.role,
        branchId: u.branchId || '',
        permissions: u.permissions || {},
      })) : [];

      const seed = {
        version: version.trim(),
        releasedAt: new Date().toISOString(),
        month: this.monthlyMonth,
        data: {
          branches: this.branches,
          staff: this.staff,
          monthlyTargets: this.monthlyTargets,
          monthlyHeroesTargets: this.monthlyHeroesTargets,
          branding: this.branding,
          users: seedUsers,
        }
      };

      const content = '// ⭐ SAMX Seed Data — v' + version.trim() + '\n' +
                      '// Generated: ' + new Date().toLocaleString() + '\n' +
                      '// By: ' + (this.currentUser ? this.currentUser.fullName : 'Admin') + '\n' +
                      (includeUsers ? '// Users included: ' + seedUsers.length + '\n' : '// Users: NOT included\n') +
                      '\n' +
                      'window.SAMX_SEED = ' + JSON.stringify(seed, null, 2) + ';\n';

      const blob = new Blob([content], { type: 'text/javascript;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'seed-data.js';
      a.click();
      URL.revokeObjectURL(url);

      this.showToast(this.t('seed.export.success'), 'success');
      this.logActivity('تصدير Seed', `v${version}${includeUsers ? ' + ' + seedUsers.length + ' users' : ''}`);

      // إذا ضمّنّا المستخدمين، أظهر القائمة
      if (includeUsers && seedUsers.length > 0) {
        const list = seedUsers
          .map(u => `👤 ${u.username}\n   └─ ${u.fullName} (${u.role})${u.branchId ? ' - ' + this.branchName(u.branchId) : ''}`)
          .join('\n\n');

        setTimeout(() => {
          alert(
            `✅ تم التصدير بنجاح\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `📋 المستخدمون المُضمَّنون (${seedUsers.length})\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `${list}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `⚠️ كل مستخدم يدخل بكلمة مروره الحالية.\n` +
            `   إذا نسيها → اطلب منه تغييرها بعد الدخول.\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━━`
          );
        }, 500);
      }
    },
    // إعادة تحميل Seed يدوياً
    forceReloadSeed() {
      if (!confirm(this.t('seed.reload.confirm'))) return;
      const seed = window.SAMX_SEED;
      if (!seed) {
        this.showToast(this.t('seed.update.failed'), 'error');
        return;
      }
      this.applySeedUpdate();
    },

    // ⭐ v23.8: زر الحفظ الفوري (Force Save)
        forceSaveNow() {
      try {
        this.persistNow();
        this.persistUsers();
        this.persistNotifications();
        this.persistActivityLog();
        this.persistStaffPhotos();
        this.saveSettingsToStorage();
        this.persistBranding();
        this.vibrate([10, 30, 10]);   // ⭐ v23.10 — نمط نجاح
        this.showToast('✅ ' + this.t('settings.data.saveNow', 'حفظ الآن') + ' — ' + new Date().toLocaleTimeString(), 'success');
        console.log('[Force Save] All data saved at', new Date().toLocaleString());
      } catch (e) {
        console.error('[Force Save] Failed:', e);
        this.vibrate([50, 30, 50, 30, 50]);   // ⭐ v23.10 — نمط خطأ
        this.showToast('❌ فشل الحفظ', 'error');
      }
    },

    // ⭐ v23.6.6: preload الخطوط + الشعار لتسريع أول نقرة توليد صورة
    async preloadFontsAndAssets() {
      if (this._fontsPreloaded) return;
      try {
        // 1. تحميل خطوط Cairo بكل الأوزان المستخدمة
        if (document.fonts && document.fonts.load) {
          await Promise.all([
            document.fonts.load('400 14px Cairo'),
            document.fonts.load('600 14px Cairo'),
            document.fonts.load('700 14px Cairo'),
            document.fonts.load('900 14px Cairo'),
            document.fonts.load('400 14px Tajawal'),
            document.fonts.load('700 14px Tajawal'),
            document.fonts.load('400 14px SaudiRiyal'),
            document.fonts.load('700 14px SaudiRiyal'),
          ]);
        }
        // 2. تحميل الشعار في الكاش
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = this.activeLogo || 'samx-logo.svg';
        });
        this._fontsPreloaded = true;
        console.log('[SAMX] ✅ Fonts + Logo preloaded');
      } catch (e) {
        console.warn('[SAMX] Preload failed (non-fatal):', e);
      }
    },

    // ⭐ v23.6: ترجمة أسماء المسميات الوظيفية للعرض فقط
    // (القيمة المخزنة في DB تبقى عربية دائماً)
    jobTitleLabel(title) {
      if (!title) return '—';
      const map = {
        'مدير معرض': 'jobTitle.branchManager',
        'نائب مدير معرض': 'jobTitle.assistantBranchManager',
        'مشرف منطقة': 'jobTitle.areaSupervisor',
        'بائع': 'jobTitle.seller',
      };
      const key = map[title];
      return key ? this.t(key, title) : title;
    },

    // ⭐ v23.6: تنسيق الوقت/التاريخ حسب اللغة الحالية
    formatTime(date = new Date()) {
      const locale = this.t('locale.time');
      return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },
    formatDateTime(date = new Date()) {
      const locale = this.t('locale.dateTime');
      return date.toLocaleString(locale);
    },

    // ================================================================
    //  الإعدادات
    // ================================================================
    saveSettingsToStorage() {
      try { localStorage.setItem('samx_settings_v14', JSON.stringify(this.settings)); } catch (e) {}
    },
    loadSettingsFromStorage() {
      try {
        const saved = JSON.parse(localStorage.getItem('samx_settings_v14') || '{}');
        if (saved && typeof saved === 'object') this.settings = { ...this.settings, ...saved };
      } catch (e) {}
    },
    applyAllSettings() {
      this.applyFontSize();
      this.applyFontFamily();
      this.applyDensity();
      this.applyPrimaryColor();
      this.applyLightTheme();
      this.applyThemeMode();
      this.applyUiScale();
    },
    setUiScale(scale) {
      this.settings.uiScale = Number(scale) || 100;
      this.applyUiScale();
      this.saveSettingsToStorage();
      this.showToast(this.currentLang === 'ar' ? `تم ضبط حجم العرض على ${scale}%` : `UI scale set to ${scale}%`, 'success');
    },
    applyUiScale() {
      const scale = Number(this.settings.uiScale) || 100;
      document.documentElement.setAttribute('data-ui-scale', scale.toString());
      document.documentElement.style.setProperty('--app-ui-scale', (scale / 100).toString());
      document.documentElement.style.fontSize = scale === 90 ? '14px' : scale === 115 ? '17px' : '15px';
    },
    encodeURIComponent(val) {
      return window.encodeURIComponent(val || '');
    },
    applyFontSize() {
      document.documentElement.style.setProperty('--app-font-size', this.settings.fontSize + 'px');
    },
    applyFontFamily() {
      document.documentElement.setAttribute('data-font', this.settings.fontFamily);
    },
    applyDensity() {
      document.documentElement.setAttribute('data-density', this.settings.density);
    },
    applyLightTheme() {
      document.documentElement.setAttribute('data-light-theme', this.settings.lightTheme);
    },
    applyPrimaryColor() {
      const c = this.colorPalette.find(x => x.id === this.settings.primaryColor) || this.colorPalette[0];
      document.documentElement.style.setProperty('--theme-primary', c.primary);
      document.documentElement.style.setProperty('--theme-secondary', c.secondary);
      document.documentElement.style.setProperty('--theme-primary-rgb', c.rgb);
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', c.primary);
      // ⭐ v23.3: تحديث الرسوم عند تغيير اللون
      nextTick(() => this.refreshCharts());
            // ⭐ v23.12-FIX: أضف resize listener مرة واحدة فقط (منع تسريب الذاكرة)
      if (!this._resizeListenerAttached) {
        this._resizeListenerAttached = true;
        window.addEventListener('resize', () => {
          [this.staffChartInstance, this.monthlyChartInstance,
           this.trendChartInstance, this.yoyChartInstance]
            .forEach(inst => {
              if (inst && typeof inst.resize === 'function' && inst.canvas && document.body.contains(inst.canvas)) {
                try { inst.resize(); } catch(e) {}
              }
            });
        });
      }
    },
    applyThemeMode() {
      const mode = this.settings.themeMode;
      if (mode === 'auto') {
        const hour = new Date().getHours();
        this.darkMode = (hour < 6 || hour >= 18);
      } else {
        this.darkMode = (mode === 'dark');
      }
      this.applyTheme();
      this.applyLightTheme();
    },
    currentPrimary() {
      return this.colorPalette.find(x => x.id === this.settings.primaryColor) || this.colorPalette[0];
    },
    setPrimaryColor(c) {
      this.settings.primaryColor = c.id;
      this.applyPrimaryColor();
      this.saveSettingsToStorage();
      this.showToast(this.t('toast.theme.colorChanged', '', { name: this.t('color.' + c.id, c.name) }), 'success');
    },
    setTheme(mode) {
      this.settings.themeMode = mode;
      this.applyThemeMode();
      this.saveSettingsToStorage();
      const key = mode === 'auto' ? 'toast.theme.auto' : mode === 'dark' ? 'toast.theme.dark' : 'toast.theme.light';
      this.showToast(this.t(key), 'success');
    },
    saveSettings() {
      this.saveSettingsToStorage();
      this.applyAllSettings();
      this.showToast(this.t('toast.settings.saved'), 'success');
      this.logActivity(this.t('log.settings.edit'), this.t('log.settings.updated'));
    },
    resetSettings() {
      if (!confirm(this.t('confirm.resetSettings'))) return;
this.settings = {
  fontSize: 15, fontFamily: 'cairo', density: 'normal',
  themeMode: 'dark', lightTheme: 'classic',
  primaryColor: 'gold', staffPerPage: 20,
  autoDistribute: true,
  currencyFormat: 'symbol',
  uiScale: 100,
};
      this.applyAllSettings();
      this.saveSettingsToStorage();
      this.showToast(this.t('toast.settings.reset'), 'success');
    },
    exportSettings() {
      const data = { version: APP_VERSION, exportedAt: new Date().toISOString(), settings: this.settings };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `samx_settings_${localDateStr()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.settings.exported'), 'success');
    },
    importSettings(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.settings) throw new Error('invalid file');
          if (!confirm(this.t('confirm.importSettings'))) return;
          this.settings = { ...this.settings, ...data.settings };
          this.applyAllSettings();
          this.saveSettingsToStorage();
          this.showToast(this.t('toast.settings.imported'), 'success');
        } catch (err) { alert('خطأ: ' + err.message); }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    checkAutoTheme() {
      if (this.settings.themeMode === 'auto') {
        const hour = new Date().getHours();
        const shouldBeDark = (hour < 6 || hour >= 18);
        if (this.darkMode !== shouldBeDark) { this.darkMode = shouldBeDark; this.applyTheme(); }
      }
    },

    // ================================================================
    //  Online / PWA
    // ================================================================
    setupOnlineStatus() {
      window.addEventListener('online', () => { this.onlineStatus = true; this.showToast(this.t('toast.connection.online'), 'success'); });
      window.addEventListener('offline', () => { this.onlineStatus = false; this.showToast(this.t('toast.connection.offline'), 'warning'); });
    },
    // ⭐ v23.24: إدارة تثبيت PWA الذكية وغير المزعجة (UX Option 1)
    setupPWA() {
      // 1. إذا كان التطبيق مفتوحاً بالفعل في وضع الـ Standalone (كتطبيق مثبت على الهاتف)
      if (this.isStandalone) {
        this.isAppInstalled = true;
        this.showInstallBanner = false;
        try { localStorage.setItem('samx_pwa_installed', 'true'); } catch (e) {}
      } else {
        // فحص هل سُجل كـ مثبت مسبقاً في الذاكرة
        try {
          if (localStorage.getItem('samx_pwa_installed') === 'true') {
            this.isAppInstalled = true;
          }
        } catch (e) {}
      }

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;

        // فحص حاسم:
        // أ. إذا كان التطبيق مثبتاً أو يعمل كـ Standalone
        // ب. أو إذا كان المستخدم قد أغلق المربع مسبقاً (Dismissed)
        const alreadyInstalled = this.isStandalone || localStorage.getItem('samx_pwa_installed') === 'true';
        const alreadyDismissed = localStorage.getItem('samx_pwa_dismissed') === 'true';

        if (!alreadyInstalled && !alreadyDismissed) {
          this.showInstallBanner = true;
        } else {
          this.showInstallBanner = false;
        }
      });

      window.addEventListener('appinstalled', () => {
        this.showInstallBanner = false;
        this.deferredPrompt = null;
        this.isAppInstalled = true;
        try {
          localStorage.setItem('samx_pwa_installed', 'true');
        } catch (e) {}
        this.showToast(this.t('toast.pwa.appInstalled'), 'success');
      });
    },

    // ⭐ v23.24: إغلاق دائم ومحترم لرغبة المستخدم دون إزعاج
    dismissInstallBanner() {
      this.showInstallBanner = false;
      try {
        localStorage.setItem('samx_pwa_dismissed', 'true');
      } catch (e) {}
    },

    async installPWA() {
      if (!this.deferredPrompt) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          alert(this.currentLang === 'ar'
            ? 'لتثبيت التطبيق على الآيفون:\n1. اضغط على زر المشاركة ⎋ أسفل متصفح Safari\n2. مرر للأسفل واختر "إضافة إلى الشاشة الرئيسية ➕"'
            : 'To install on iOS:\n1. Tap the Share button ⎋ in Safari\n2. Select "Add to Home Screen ➕"');
        } else {
          this.showToast(this.t('toast.pwa.manualHint'), 'warning');
        }
        return;
      }
      try {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          this.showToast(this.t('toast.pwa.installed'), 'success');
          this.isAppInstalled = true;
          try {
            localStorage.setItem('samx_pwa_installed', 'true');
          } catch (e) {}
        }
      } catch (err) {
        console.warn('[PWA] Prompt error:', err);
      }
      this.deferredPrompt = null;
      this.showInstallBanner = false;
    },
    async setupServiceWorker() {
      if (!('serviceWorker' in navigator)) return;
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });

        // 1. فحص فوري: إذا كان هناك عامل جديد ينتظر التفعيل بالفعل
        if (registration.waiting && navigator.serviceWorker.controller) {
          this.newWorker = registration.waiting;
          this.showUpdateToast = true;
        }

        // 2. مراقبة تثبيت إصدار جديد
        registration.addEventListener('updatefound', () => {
          const nw = registration.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if ((nw.state === 'installed' || nw.state === 'waiting') && navigator.serviceWorker.controller) {
              this.newWorker = nw;
              this.showUpdateToast = true;
            }
          });
        });

        // 3. إعادة تحميل الصفحة عند اكتمال تفعيل العامل وتأكيد طلب التحديث
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!this._isReloading && this.isUpdatingApp) {
            this._isReloading = true;
            setTimeout(() => {
              const url = new URL(window.location.href);
              url.searchParams.set('reload', Date.now().toString());
              window.location.replace(url.toString());
            }, 100);
          }
        });

        // 4. فحص فوري للتحديث وفحص دوري كل 15 دقيقة وعند استئناف شاشة التطبيق
        registration.update().catch(() => {});
        setInterval(() => registration.update().catch(() => {}), 15 * 60 * 1000);
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch(() => {});
          }
        });
      } catch (err) { console.warn('[PWA] SW registration failed:', err); }
    },
    async applyUpdate() {
      this.isUpdatingApp = true;
      this.showUpdateToast = false;

      try {
        if (this.newWorker) {
          this.newWorker.postMessage({ type: 'SKIP_WAITING' });
          this.newWorker.postMessage({ type: 'CLEAR_ALL_CACHES' });
        }
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const reg of regs) {
            if (reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' });
              reg.waiting.postMessage({ type: 'CLEAR_ALL_CACHES' });
            }
          }
        }
      } catch (e) {
        console.warn('[PWA] applyUpdate error:', e);
      }

      // مسح كافة الكاشات من CacheStorage محلياً
      if ('caches' in window) {
        try {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        } catch (e) {}
      }

      // إعادة تحميل إجبارية وفورية لتجاوز كاش المتصفح
      setTimeout(() => {
        this._isReloading = true;
        const url = new URL(window.location.href);
        url.searchParams.set('reload', Date.now().toString());
        window.location.replace(url.toString());
      }, 500);
    },

    // ================================================================
    //  Auto Backup
    // ================================================================
    setupAutoBackup() {
      this.saveAutoBackup();
      this._autoBackupTimer = setInterval(() => this.saveAutoBackup(), AUTO_BACKUP_INTERVAL);
    },
    saveAutoBackup() {
      try {
        const data = {
          branches: this.branches,
          staff: this.staff,
          daily: this.daily,
          monthlyTargets: this.monthlyTargets,
          monthlyHeroesTargets: this.monthlyHeroesTargets,
          attendance: this.attendance,
        };
        const dataStr = JSON.stringify(data);
        // ⭐ v23.3: تجاوز إذا لم تتغير البيانات
        const lastHash = localStorage.getItem('samx_last_backup_hash');
        const currentHash = simpleHash(dataStr);
        if (lastHash === currentHash) {
          return; // لا تغيير — لا نسخة جديدة
        }

        const snapshot = {
          date: new Date().toLocaleString('ar-EG'),
          timestamp: Date.now(),
          hash: currentHash,
          data,
        };
        const stored = JSON.parse(localStorage.getItem('samx_auto_backups') || '[]');

        // ⭐ v23.3: منع التكرار — إذا آخر نسخة نفس الـ hash
        if (stored.length > 0 && stored[0].hash === currentHash) {
          return;
        }

        stored.unshift(snapshot);

        // ⭐ v23.3: الاحتفاظ بـ 5 فقط
        if (stored.length > 5) stored.length = 5;

        // ⭐ v23.3: محاولة الحفظ مع معالجة QuotaExceededError
        try {
          localStorage.setItem('samx_auto_backups', JSON.stringify(stored));
          localStorage.setItem('samx_last_backup_hash', currentHash);
          this.autoBackups = stored;
        } catch (quotaErr) {
          // المساحة ممتلئة → حذف أقدم نسختين وأعد المحاولة
          if (quotaErr.name === 'QuotaExceededError' || quotaErr.code === 22) {
            console.warn('[AutoBackup] امتلأت المساحة — تنظيف النسخ القديمة');
            while (stored.length > 2) {
              stored.pop();
              try {
                localStorage.setItem('samx_auto_backups', JSON.stringify(stored));
                this.autoBackups = stored;
                this.showToast(this.t('toast.backup.trimmed'), 'warning');
                return;
              } catch (retryErr) {
                // تابع الحذف
              }
            }
            // فشلت كل المحاولات → حذف كل النسخ
            try {
              localStorage.removeItem('samx_auto_backups');
              this.autoBackups = [];
              this.showToast(this.t('toast.backup.noSpace'), 'warning');
            } catch (finalErr) {
              console.error('[AutoBackup] فشل التنظيف النهائي:', finalErr);
            }
          } else {
            throw quotaErr;
          }
        }
      } catch (e) {
        console.warn('[AutoBackup] Failed:', e);
      }
    },
    restoreAutoBackup(idx) {
      const bk = this.autoBackups[idx];
      if (!bk) return;
      if (!confirm(this.t('confirm.restoreBackup', '', { date: bk.date }))) return;
      this.branches = bk.data.branches || [];
      this.staff = bk.data.staff || [];
      this.daily = bk.data.daily || {};
      this.monthlyTargets = bk.data.monthlyTargets || {};
      this.monthlyHeroesTargets = bk.data.monthlyHeroesTargets || {};
      this.attendance = bk.data.attendance || {};
      this.normalizeAllDailyRecords();
      // ⭐ v23.3: تحديث hash حتى لا يُنشئ حفظاً مكرراً
      try { localStorage.removeItem('samx_last_backup_hash'); } catch (e) {}
      this.persist();
      this.showToast(this.t('toast.backup.restored'), 'success');
    },
    // ================================================================
    //  Auto Lock
    // ================================================================
    setupAutoLock() {
      const resetTimer = () => {
        clearTimeout(this._lockTimer);
        this._lockTimer = setTimeout(() => {
          if (this.currentUser) { this.isLocked = true; this.lockPassword = ''; }
        }, AUTO_LOCK_AFTER);
      };
      ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'].forEach(evt => {
        window.addEventListener(evt, resetTimer, { passive: true });
      });
      resetTimer();
    },
    async unlockApp() {
      this.lockError = '';
      const user = this.users.find(u => u.id === this.currentUser.id);
      if (!user) { this.lockError = 'المستخدم غير موجود'; return; }
      const hash = await sha256(this.lockPassword);
      if (hash !== user.passwordHash) {
        this.lockError = 'كلمة المرور خاطئة';
        this.lockPassword = '';
        return;
      }
      this.isLocked = false;
      this.lockPassword = '';
      this.lockError = '';
      this.showToast(this.t('toast.lock.unlocked'), 'success');
    },
    // ================================================================
    //  Notifications
    // ================================================================
    setupNotifications() {
      this.checkMorningAlert();
      setInterval(() => this.checkMorningAlert(), 30 * 60 * 1000);
      this.checkSmartNotifications();
      this._notificationTimer = setInterval(() => this.checkSmartNotifications(), 5 * 60 * 1000);
    },
    checkMorningAlert() {
      const now = new Date();
      const hour = now.getHours();
      const today = this.todayStr;
      if (hour >= 9 && this.lastMorningAlertDate !== today) {
        const alert = this.morningAlertCheck;
        if (alert) {
          this.morningAlert = alert;
          this.lastMorningAlertDate = today;
          try { localStorage.setItem('samx_last_morning_alert', today); } catch (e) {}
        }
      }
    },
    dismissMorningAlert() {
      try { localStorage.setItem('samx_last_morning_alert', this.todayStr); } catch (e) {}
    },
    checkSmartNotifications() {
      if (!this.currentUser) return;
      const hour = new Date().getHours();
      if (hour >= 12 && hour < 23) {
        const branchesToCheck = this.allowedBranches;
        const unrecorded = [];
        branchesToCheck.forEach(b => {
          const key = `${this.todayStr}|${b.id}`;
          const d = this.daily[key];
          let hasSales = false;
          if (d) {
            const staffIds = this.staff.filter(s => s.branchId === b.id).map(s => s.id);
            const total = staffIds.reduce((sum, id) => sum + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
            hasSales = total > 0;
          }
          if (!hasSales) unrecorded.push(b.name);
        });
        if (unrecorded.length > 0) {
          const list = unrecorded.slice(0, 3).join(this.t('morning.listSeparator'));
          const ellipsis = unrecorded.length > 3 ? this.t('notif.branchesNotRecorded.ellipsis') : '';
          this.addNotification({
            title: this.t('notif.branchesNotRecorded.title'),
            body: unrecorded.length === 1
              ? this.t('notif.branchesNotRecorded.bodyOne', '', { branch: unrecorded[0] })
              : this.t('notif.branchesNotRecorded.bodyMany', '', { count: unrecorded.length, list: list + ellipsis }),
            type: 'warning',
          });
        }
      }
      if (this.selectedBranch && this.heroesPct >= 100) {
        this.addNotification({
          title: this.t('notif.heroesTarget.title'),
          body: this.t('notif.heroesTarget.body', '', { branch: this.selectedBranch.name, pct: this.heroesPct.toFixed(0) }),
          type: 'success',
        });
      }
      if (this.selectedBranch && this.basePct > 0 && this.basePct < 50 && this.isTodaySelected) {
        this.addNotification({
          title: this.t('notif.lowAchievement.title'),
          body: this.t('notif.lowAchievement.body', '', { branch: this.selectedBranch.name, pct: this.basePct.toFixed(0) }),
          type: 'warning',
        });
      }
    },
    addNotification(notif) {
      const exists = this.notifications.some(n => n.title === notif.title && (Date.now() - n.timestamp) < 60 * 60 * 1000);
      if (exists) return;
      this.notifications.unshift({
        id: Date.now(), title: notif.title, body: notif.body,
        type: notif.type || 'info',
        time: this.formatDateTime(),
        timestamp: Date.now(), read: false,
      });
      if (this.notifications.length > 50) this.notifications.length = 50;
      this.persistNotifications();
    },
    clearNotifications() {
      this.notifications = [];
      this.persistNotifications();
      this.showNotificationsPanel = false;
    },
    persistNotifications() {
      try { localStorage.setItem('samx_notifications', JSON.stringify(this.notifications)); } catch (e) {}
    },
    loadNotifications() {
      try { this.notifications = JSON.parse(localStorage.getItem('samx_notifications')) || []; } catch (e) {}
    },

    // ================================================================
    //  ⭐ v23.22: Activity Log & Enterprise Audit Trail
    // ================================================================
    openActivityLog() {
      if (!this.canViewActivityLog) {
        this.showToast(this.currentLang === 'ar' ? '⚠️ سجل التدقيق متاح للمديرين والمدقق العام فقط' : '⚠️ Audit log is restricted', 'warning');
        return;
      }
      this.showActivityLog = true;
      this.showMoreMenu = false;
    },
    logActivity(action, details = '', meta = {}) {
      const timestamp = Date.now();
      const currentUser = this.currentUser;

      let category = meta.category || '';
      let level = meta.level || 'info';

      if (!category) {
        if (action.includes('💰') || action.includes('مبيعات')) { category = 'sales'; level = 'info'; }
        else if (action.includes('🎯') || action.includes('تارجت') || action.includes('أبطال')) { category = 'target'; level = 'info'; }
        else if (action.includes('🔒') || action.includes('🔓') || action.includes('إغلاق') || action.includes('فتح يومية')) { category = 'closes'; level = action.includes('🔓') ? 'warning' : 'info'; }
        else if (action.includes('مستخدم') || action.includes('فرع') || action.includes('موظف') || action.includes('👥') || action.includes('🏬')) { category = 'users'; level = action.includes('حذف') ? 'danger' : 'info'; }
        else if (action.includes('غير مصرح') || action.includes('مسح') || action.includes('⚠️') || action.includes('دخول') || action.includes('خروج')) { category = 'security'; level = action.includes('غير مصرح') || action.includes('مسح') ? 'danger' : 'info'; }
        else if (action.includes('نسخ') || action.includes('استيراد') || action.includes('سحاب') || action.includes('هوية')) { category = 'system'; level = 'info'; }
        else { category = 'system'; level = 'info'; }
      }

      const entry = {
        id: 'act_' + timestamp + '_' + Math.random().toString(36).substr(2, 5),
        action,
        details: typeof details === 'string' ? details : JSON.stringify(details),
        category,
        level,
        user: currentUser ? currentUser.fullName : (this.t ? this.t('log.unknown') : 'نظام'),
        username: currentUser ? currentUser.username : 'system',
        role: currentUser ? currentUser.role : '',
        roleLabel: currentUser ? this.roleLabel(currentUser.role) : '',
        branchName: meta.branchName || (this.selectedBranch ? this.selectedBranch.name : (currentUser && currentUser.branchId ? this.branchName(currentUser.branchId) : '')),
        time: this.formatDateTime(),
        timestamp,
        oldVal: meta.oldVal !== undefined ? meta.oldVal : null,
        newVal: meta.newVal !== undefined ? meta.newVal : null,
        diff: meta.diff !== undefined ? meta.diff : null,
      };

      if (!Array.isArray(this.activityLog)) this.activityLog = [];
      this.activityLog.unshift(entry);
      if (this.activityLog.length > 500) this.activityLog.length = 500;
      this.persistActivityLog();
    },
    persistActivityLog() {
      try { localStorage.setItem('samx_activity_log', JSON.stringify(this.activityLog)); } catch (e) {}
    },
    loadActivityLog() {
      try { this.activityLog = JSON.parse(localStorage.getItem('samx_activity_log')) || []; } catch (e) {}
    },
    clearActivityLog() {
      if (!this.currentUser || this.currentUser.role !== 'admin') {
        this.showToast(this.currentLang === 'ar' ? '⚠️ عذراً، مسح سجل العمليات متاح للمدير العام فقط' : '⚠️ Clear log restricted to Admin only', 'error');
        return;
      }
      const msg = this.currentLang === 'ar'
        ? 'هل أنت متأكد من رغبتك في مسح سجل العمليات بالكامل؟ سيتم توثيق عملية المسح أمنياً.'
        : 'Are you sure you want to clear the audit log? This wipe action will be audited.';
      if (!confirm(msg)) return;

      const adminName = this.currentUser.fullName || this.currentUser.username;
      this.activityLog = [];
      this.persistActivityLog();

      // Indelible audit log entry recording the wipe
      this.logActivity(
        this.currentLang === 'ar' ? '🗑️ مسح سجل العمليات السابق' : '🗑️ Audit Log Cleared',
        this.currentLang === 'ar' ? `قام المدير العام (${adminName}) بمسح سجل العمليات السابق وتصفيره` : `Admin (${adminName}) wiped previous audit history`,
        { category: 'security', level: 'danger' }
      );
      this.showToast(this.currentLang === 'ar' ? 'تم مسح السجل وتوثيق العملية أمنياً' : 'Audit log reset and audited', 'info');
    },
    exportActivityLogCSV() {
      const logs = this.filteredActivityLog;
      if (!logs || logs.length === 0) {
        this.showToast(this.currentLang === 'ar' ? 'لا توجد سجلات لتصديرها' : 'No records to export', 'warning');
        return;
      }
      const isAr = this.currentLang === 'ar';
      const headers = isAr
        ? ['المعرف', 'التاريخ والوقت', 'المستخدم', 'اسم الحساب', 'الدور', 'الفرع', 'نوع العملية', 'التفاصيل']
        : ['ID', 'DateTime', 'User', 'Username', 'Role', 'Branch', 'Action', 'Details'];

      const escapeCSV = (val) => {
        if (val === null || val === undefined) return '""';
        const s = String(val).replace(/"/g, '""');
        return `"${s}"`;
      };

      const rows = logs.map(l => [
        escapeCSV(l.id || '-'),
        escapeCSV(l.time || '-'),
        escapeCSV(l.user || '-'),
        escapeCSV(l.username || '-'),
        escapeCSV(l.roleLabel || l.role || '-'),
        escapeCSV(l.branchName || '-'),
        escapeCSV(l.action || '-'),
        escapeCSV(l.details || '-')
      ].join(','));

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      a.download = `SAMX_Audit_Log_${dateStr}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(isAr ? 'تم تصدير سجل العمليات (CSV) بنجاح' : 'Audit log exported to CSV', 'success');
    },
    getActivityLevelColor(level) {
      if (level === 'danger') return '#ef4444';
      if (level === 'warning') return '#f59e0b';
      if (level === 'success') return '#10b981';
      return '#38bdf8';
    },
    getActivityBadgeBg(category) {
      const bgs = {
        sales: 'rgba(59,130,246,0.18)',
        target: 'rgba(234,179,8,0.18)',
        closes: 'rgba(168,85,247,0.18)',
        users: 'rgba(16,185,129,0.18)',
        security: 'rgba(239,68,68,0.18)',
        system: 'rgba(148,163,184,0.18)',
      };
      return bgs[category] || 'rgba(212,168,75,0.18)';
    },
    getActivityBadgeColor(category) {
      const colors = {
        sales: '#60a5fa',
        target: '#facc15',
        closes: '#c084fc',
        users: '#34d399',
        security: '#f87171',
        system: '#94a3b8',
      };
      return colors[category] || '#e6c074';
    },
    getActivityBadgeBorder(category) {
      const borders = {
        sales: 'rgba(59,130,246,0.3)',
        target: 'rgba(234,179,8,0.3)',
        closes: 'rgba(168,85,247,0.3)',
        users: 'rgba(16,185,129,0.3)',
        security: 'rgba(239,68,68,0.3)',
        system: 'rgba(148,163,184,0.3)',
      };
      return borders[category] || 'rgba(212,168,75,0.3)';
    },
    getActivityCategoryLabel(category) {
      const isAr = this.currentLang === 'ar';
      const labels = {
        sales: isAr ? 'مبيعات' : 'Sales',
        target: isAr ? 'تارجت' : 'Target',
        closes: isAr ? 'يومية' : 'Shift',
        users: isAr ? 'مستخدمين' : 'Users',
        branches: isAr ? 'فروع' : 'Branches',
        security: isAr ? 'أمان' : 'Security',
        system: isAr ? 'نظام' : 'System',
      };
      return labels[category] || (isAr ? 'عام' : 'General');
    },

    // ================================================================
    //  Live KPI
    // ================================================================
    flashKpi(field) {
      this.kpiFlashClass[field] = 'kpi-flash';
      setTimeout(() => { this.kpiFlashClass[field] = ''; }, 500);
    },
    updateLiveTime() {
      this.liveUpdateTime = this.formatTime();
    },

    // ================================================================
    //  Dates
    // ================================================================
    gotoDate(dateStr) {
      this.selectedDate = dateStr;
      this.openView('dashboard');
      this.showToast(this.t('toast.date.navigated', '', { date: dateStr }), 'success');
    },
        setDate(when) {
      const d = new Date();
      if (when === 'yesterday') d.setDate(d.getDate() - 1);
      this.selectedDate = localDateStr(d);
    },
        shiftDate(days) {
      const d = new Date(this.selectedDate + 'T12:00:00');
      d.setDate(d.getDate() + days);
      const newDate = localDateStr(d);
      if (newDate > this.todayStr) return;
      this.selectedDate = newDate;
    },

    // ================================================================
    //  Update Staff Field
    // ================================================================
    updateStaffField(staffId, field, value) {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.selectedBranchId) return;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const sd = this.ensureStaffRecord(key, staffId);
      if (!sd) return;
      const oldVal = sd[field] || 0;
      const newVal = Number(value) || 0;
      if (oldVal !== newVal) {
        sd[field] = newVal;
        this.updateLiveTime();
        const staffMember = this.staff.find(s => s.id === staffId);
        const sName = staffMember ? staffMember.name : staffId;
        const bName = this.selectedBranch ? this.selectedBranch.name : '';
        if (field === 'sales') {
          this.logActivity('💰 تعديل مبيعات', `${sName}: ${this.formatNum(oldVal)} → ${this.formatNum(newVal)} (${bName} • ${this.selectedDate})`, {
            category: 'sales', level: 'info', oldVal, newVal, diff: newVal - oldVal, branchName: bName
          });
          this.flashKpi('branchSales');
          this.flashKpi('basePct');
          this.flashKpi('heroesPct');
          this.checkConfetti();
          this.scheduleStaffChartRefresh();
        } else if (field === 'target') {
          this.logActivity('🎯 تعديل تارجت', `${sName}: ${this.formatNum(oldVal)} → ${this.formatNum(newVal)} (${bName} • ${this.selectedDate})`, {
            category: 'target', level: 'info', oldVal, newVal, diff: newVal - oldVal, branchName: bName
          });
        } else if (field === 'heroesTarget') {
          this.logActivity('⭐ تعديل تارجت الأبطال', `${sName}: ${this.formatNum(oldVal)} → ${this.formatNum(newVal)} (${bName} • ${this.selectedDate})`, {
            category: 'target', level: 'info', oldVal, newVal, diff: newVal - oldVal, branchName: bName
          });
        }
        this.schedulePersist();
      }
    },
    adjustSales(staffId, delta) {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.selectedBranchId) return;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const sd = this.ensureStaffRecord(key, staffId);
      if (!sd) return;
      const cur = Number(sd.sales) || 0;
      const nextVal = Math.max(0, cur + delta);
      if (cur !== nextVal) {
        sd.sales = nextVal;
        const staffMember = this.staff.find(s => s.id === staffId);
        const sName = staffMember ? staffMember.name : staffId;
        const bName = this.selectedBranch ? this.selectedBranch.name : '';
        this.logActivity('💰 تعديل سريع للمبيعات', `${sName}: (${delta > 0 ? '+' : ''}${delta}) ${this.formatNum(cur)} → ${this.formatNum(nextVal)} (${bName})`, {
          category: 'sales', level: 'info', oldVal: cur, newVal: nextVal, diff: delta, branchName: bName
        });
        this.vibrate(8);
        this.flashKpi('branchSales');
        this.flashKpi('basePct');
        this.flashKpi('heroesPct');
        this.updateLiveTime();
        this.checkConfetti();
        this.scheduleStaffChartRefresh();
        this.schedulePersist();
      }
    },

    updateDayTarget(date, field, value) {
      if (date < this.todayStr && !this.canEditPastDays) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      const branchId = this.monthlyBranchId || this.selectedBranchId;
      if (!branchId) return;
      const key = `${date}|${branchId}`;
      const rec = this.normalizeDayRecord(key);
      if (!rec) return;
      rec[field] = Number(value) || 0;
      this.autoDistributeForDate(date, branchId);
      this.schedulePersist();
    },
    // ================================================================
    //  ⭐ v23.27: التوزيع التلقائي الذكي المرتبط ببيانات الإكسل اليومية
    // ================================================================
    autoDistributeForDate(date, branchId) {
      if (!date || !branchId) return;
      const normDate = normalizeDateStr(date) || date;
      const key = `${normDate}|${branchId}`;
      const rec = this.getDayRecord(normDate, branchId, true);
      if (!rec) return;
      const branchStaffList = this.staff.filter(s => s.branchId === branchId);
      if (!branchStaffList.length) return;
      const present = branchStaffList.filter(s => this.attendance[`${normDate}|${s.id}`] !== false);
      if (present.length === 0) {
        branchStaffList.forEach(s => {
          const sd = this.ensureStaffRecord(key, s.id);
          if (sd) { sd.target = 0; sd.heroesTarget = 0; }
        });
        return;
      }
      const baseTotal = Number(rec.baseTarget) || 0;
      const heroesTotal = Number(rec.heroesTarget) || 0;
      const basePer = Math.round((baseTotal / present.length) * 100) / 100;
      const heroesPer = Math.round((heroesTotal / present.length) * 100) / 100;
      branchStaffList.forEach(s => {
        const sd = this.ensureStaffRecord(key, s.id);
        if (!sd) return;
        const isPresentNow = this.attendance[`${normDate}|${s.id}`] !== false;
        if (isPresentNow) {
          sd.target = basePer;
          sd.heroesTarget = heroesPer;
        } else {
          sd.target = 0;
          sd.heroesTarget = 0;
        }
      });
    },
    autoDistributeCurrentDay() {
      if (this.settings.autoDistribute === false) return;
      if (!this.selectedDate || !this.selectedBranchId) return;
      const normDate = normalizeDateStr(this.selectedDate) || this.selectedDate;
      this.ensureDailyRecordFromMonthly(normDate, this.selectedBranchId);
      this.autoDistributeForDate(normDate, this.selectedBranchId);
    },

    // ⭐ v23.27: استرداد أو إنشاء سجل اليوم من التارجت الشهري
    ensureDailyRecordFromMonthly(date, branchId) {
      if (!date || !branchId) return null;
      const normDate = normalizeDateStr(date) || date;
      const key = `${normDate}|${branchId}`;
      if (this.daily[key] && (Number(this.daily[key].baseTarget) > 0 || Number(this.daily[key].heroesTarget) > 0)) {
        return this.daily[key];
      }
      const monthKey = `${normDate.slice(0, 7)}|${branchId}`;
      const mBase   = Number(this.monthlyTargets[monthKey]) || 0;
      const mHeroes = Number(this.monthlyHeroesTargets[monthKey]) || 0;
      if (mBase === 0 && mHeroes === 0) return this.daily[key] || null;
      const [y, m] = normDate.slice(0, 7).split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const rec = this.normalizeDayRecord(key);
      if (!rec) return null;
      if (Number(rec.baseTarget) === 0 && Number(rec.heroesTarget) === 0) {
        rec.baseTarget   = Math.round((mBase   / daysInMonth) * 100) / 100;
        rec.heroesTarget = Math.round((mHeroes / daysInMonth) * 100) / 100;
      }
      return rec;
    },
    // ================================================================
    //  Confetti
    // ================================================================
    checkConfetti() {
      if (this.heroesPct >= 100 && !this._confettiShown) {
        this._confettiShown = true;
        this.showConfetti();
        this.addNotification({
          title: this.t('notif.confetti.title'),
          body: this.t('notif.confetti.body', '', { pct: this.heroesPct.toFixed(0) }),
          type: 'success',
        });
        setTimeout(() => { this._confettiShown = false; }, 60000);
      }
    },
    showConfetti() {
      const container = document.getElementById('confetti-container');
      if (!container) return;
      const colors = ['#d4a84b', '#e6c074', '#10b981', '#3b82f6', '#ef4444', '#f59e0b'];
      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
      }
    },

    // ================================================================
    //  Persist / Load
    // ================================================================
    schedulePersist() {
      clearTimeout(this._saveDebounce);
      this._saveDebounce = setTimeout(() => {
        this.persist();
        const locale = this.t('locale.time');
        this.lastSaveTime = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
      }, 300);
    },
    persist() {
      // ⭐ v23.9-SHIELD: 3 طبقات حماية
      try {
        // 🛡️ الطبقة 1: لا تُخزِّن قبل تحميل البيانات
        if (!this._dataLoaded) {
          console.warn('[persist] ⏸️ Blocked — data not loaded yet');
          return;
        }

        const savedBranches = JSON.parse(localStorage.getItem('samx_branches') || '[]');
        const savedStaff    = JSON.parse(localStorage.getItem('samx_staff') || '[]');

        // 🛡️ الطبقة 2: ارفض محو بيانات حقيقية
        const wipingBranches = (this.branches || []).length === 0 && savedBranches.length > 0;
        const wipingStaff    = (this.staff || []).length    === 0 && savedStaff.length    > 0;
        if (wipingBranches || wipingStaff) {
          console.error('[persist] 🛡️ BLOCKED wipe:', { 
            inMemory: { b: (this.branches||[]).length, s: (this.staff||[]).length },
            onDisk:   { b: savedBranches.length, s: savedStaff.length } 
          });
          return;
        }

        // 🛡️ الطبقة 3: اكتب
        localStorage.setItem('samx_branches', JSON.stringify(this.branches || []));
        localStorage.setItem('samx_staff', JSON.stringify(this.staff || []));
        localStorage.setItem('samx_daily', JSON.stringify(this.daily || {}));
        localStorage.setItem('samx_monthlyTargets', JSON.stringify(this.monthlyTargets || {}));
        localStorage.setItem('samx_monthlyHeroesTargets', JSON.stringify(this.monthlyHeroesTargets || {}));
        localStorage.setItem('samx_attendance', JSON.stringify(this.attendance || {}));
        localStorage.setItem('samx_theme', this.darkMode ? 'dark' : 'light');
        try { localStorage.setItem('samx_staff_chart_type', this.staffChartType); } catch(e) {}
        // ⭐ v23.18: إرسال نسخة للسحابة في الخلفية (Cloudflare D1)
        this.triggerCloudSyncDebounced();
      } catch (e) { console.warn('persist error', e); }
    },
    persistNow() {
      clearTimeout(this._saveDebounce);
      this.persist();
    },
    load() {
      try {
        this.branches = JSON.parse(localStorage.getItem('samx_branches')) || [];
        this.staff = JSON.parse(localStorage.getItem('samx_staff')) || [];
        this.daily = JSON.parse(localStorage.getItem('samx_daily')) || {};
        this.monthlyTargets = JSON.parse(localStorage.getItem('samx_monthlyTargets')) || {};
        this.monthlyHeroesTargets = JSON.parse(localStorage.getItem('samx_monthlyHeroesTargets')) || {};
        this.attendance = JSON.parse(localStorage.getItem('samx_attendance')) || {};
        this.autoBackups = JSON.parse(localStorage.getItem('samx_auto_backups')) || [];
        this.darkMode = (localStorage.getItem('samx_theme') || 'dark') === 'dark';
        this.loadNotifications();
        this.loadActivityLog();
        this.loadStaffPhotos();
        this.lastMorningAlertDate = localStorage.getItem('samx_last_morning_alert') || '';
        this.normalizeAllDailyRecords();
      } catch (e) {}
      this.applyTheme();
      this._dataLoaded = true;   // ⭐ v23.9-SHIELD: فتح البوابة
      console.log('[load] ✅ Data loaded:', this.branches.length, 'branches,', this.staff.length, 'staff');
    },

    // ================================================================
    //  ⭐ v23.18: Cloudflare D1 Sync Engine (Offline-First)
    // ================================================================
    triggerCloudSyncDebounced() {
      clearTimeout(this._cloudSyncDebounce);
      this._cloudSyncDebounce = setTimeout(() => {
        this.syncToCloud();
      }, 1500);
    },

    async syncToCloud() {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        this.cloudSyncStatus = 'offline';
        return;
      }
      if (!this._dataLoaded) return;

      // 🛡️ حماية السحابة: امنع أي جهاز لم يسحب أولاً من الكتابة فوق السحابة (Push Protection)
      if (!this._cloudPulledOnce) {
        console.warn('[CloudSync] 🛡️ Push blocked: Must pull from cloud first before pushing');
        return;
      }

      // حماية من رفع مصفوفات فارغة تمحو السحابة
      if ((!this.branches || this.branches.length === 0) && (!this.staff || this.staff.length === 0)) {
        return;
      }

      try {
        this.cloudSyncStatus = 'syncing';
        const payload = {
          branches: this.branches || [],
          staff: this.staff || [],
          daily: this.daily || {},
          monthlyTargets: this.monthlyTargets || {},
          monthlyHeroesTargets: this.monthlyHeroesTargets || {},
          attendance: this.attendance || {},
          users: this.users || [],
          branding: this.branding || null,
          updated_at: Date.now(),
        };

        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, version: APP_VERSION }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        if (data.bindingConfigured === false) {
          this.cloudSyncStatus = 'unconfigured';
          console.info('[CloudSync] D1 binding DB is not attached yet in Cloudflare dashboard');
          return;
        }

        if (data.success) {
          this.cloudSyncStatus = 'synced';
          this.cloudSyncError = '';
          const locale = this.t ? this.t('locale.time') : 'ar-SA';
          this.lastCloudSyncTime = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
          try { localStorage.setItem('samx_last_cloud_sync', Date.now().toString()); } catch (e) {}
        } else {
          this.cloudSyncStatus = 'error';
          this.cloudSyncError = data.error || 'Failed';
        }
      } catch (err) {
        console.warn('[CloudSync] Background sync postponed:', err.message);
        this.cloudSyncStatus = (typeof navigator !== 'undefined' && !navigator.onLine) ? 'offline' : 'error';
      }
    },

    async syncFromCloud(isManual = false) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        this.cloudSyncStatus = 'offline';
        if (isManual) this.showToast(this.t('toast.offline') || 'لا يوجد اتصال بالإنترنت', 'warning');
        return;
      }

      try {
        this.cloudSyncStatus = 'syncing';
        // ⭐ v23.28: منع الكاش نهائياً بإضافة معامل الوقت و Cache-Control no-store
        const res = await fetch(`/api/sync?t=${Date.now()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const resJson = await res.json();
        if (resJson.bindingConfigured === false) {
          this.cloudSyncStatus = 'unconfigured';
          this.loginSyncMsg = 'قاعدة بيانات D1 غير مربوطة بعد في Cloudflare (Binding: DB)';
          this.loginSyncMsgType = 'error';
          if (isManual) {
            this.showToast('قاعدة بيانات Cloudflare D1 غير مربوطة بعد في لوحة التحكم (Binding Name: DB)', 'info');
          }
          return;
        }

        if (resJson.success === false && resJson.error) {
          throw new Error(resJson.error);
        }

        if (!resJson.data || resJson.status === 'empty') {
          // السحابة فارغة — هذا أول تشغيل للنظام
          this._cloudPulledOnce = true;
          this.cloudSyncStatus = 'synced';
          this.loginSyncMsg = this.currentLang === 'ar' ? 'قاعدة بيانات السحابة فارغة ومهيأة ✅' : 'Cloud database is ready ✅';
          this.loginSyncMsgType = 'success';
          if ((this.branches && this.branches.length > 0) || (this.staff && this.staff.length > 0)) {
            await this.syncToCloud();
          }
          if (isManual) {
            this.showToast('تم تهيئة قاعدة D1 ورفع نسختك المحلية إليها بنجاح ✅', 'success');
          }
          return;
        }

        const cloud = resJson.data;
        const cloudUpdatedAt = resJson.updated_at || cloud.updated_at || 0;

        // 1. ⭐ v23.28: تحديث وفرض قائمة المستخدمين والحسابات فوراً في الذاكرة و localStorage
        if (Array.isArray(cloud.users) && cloud.users.length > 0) {
          const userMap = new Map();
          cloud.users.forEach(u => {
            if (u && u.username) {
              const k = (u.username || '').trim().toLowerCase();
              userMap.set(k, {
                ...u,
                username: (u.username || '').trim(),
              });
            }
          });
          (this.users || []).forEach(u => {
            if (u && u.username) {
              const k = (u.username || '').trim().toLowerCase();
              if (!userMap.has(k)) {
                userMap.set(k, {
                  ...u,
                  username: (u.username || '').trim(),
                });
              }
            }
          });
          const mergedUsers = Array.from(userMap.values());
          mergedUsers.forEach(u => {
            if (!u.permissions) {
              u.permissions = { ...(ROLE_PERMISSIONS[u.role] || DEFAULT_PERMISSIONS) };
            }
          });
          this.users = mergedUsers;
          try {
            localStorage.setItem('samx_users', JSON.stringify(this.users));
          } catch (e) {}
        }

        // 2. مزامنة الفروع والموظفين
        if (Array.isArray(cloud.branches) && cloud.branches.length > 0) {
          this.branches = cloud.branches;
        }
        if (Array.isArray(cloud.staff) && cloud.staff.length > 0) {
          this.staff = cloud.staff;
        }

        // 3. ⭐ v23.28: دمج جدول التارجت اليومي المستورد من الإكسل باعتماد قيم السحابة لكافة التواريخ
        if (cloud.daily && typeof cloud.daily === 'object') {
          const mergedDaily = Object.assign({}, this.daily || {});
          Object.entries(cloud.daily).forEach(([k, cRec]) => {
            if (!cRec) return;
            const parts = k.split('|');
            const rawDate = parts[0];
            const branchId = parts.slice(1).join('|');
            const normDate = (typeof this.normalizeDateStr === 'function' ? this.normalizeDateStr(rawDate) : normalizeDateStr(rawDate)) || rawDate;
            const targetKey = `${normDate}|${branchId}`;

            if (!mergedDaily[targetKey]) {
              mergedDaily[targetKey] = JSON.parse(JSON.stringify(cRec));
              mergedDaily[targetKey].baseTarget = Number(cRec.baseTarget) || 0;
              mergedDaily[targetKey].heroesTarget = Number(cRec.heroesTarget) || 0;
            } else {
              const locRec = mergedDaily[targetKey];
              // التارجت المعتمد من السحابة (الإكسل) يحدّث تارجت التاريخ فوراً
              if (cRec.baseTarget !== undefined && cRec.baseTarget !== null) {
                locRec.baseTarget = Number(cRec.baseTarget) || 0;
              }
              if (cRec.heroesTarget !== undefined && cRec.heroesTarget !== null) {
                locRec.heroesTarget = Number(cRec.heroesTarget) || 0;
              }
              if (cRec.monthlyTarget !== undefined && Number(cRec.monthlyTarget) > 0) {
                locRec.monthlyTarget = Number(cRec.monthlyTarget);
              }
              if (cRec.mtdSales !== undefined && Number(cRec.mtdSales) > 0) {
                locRec.mtdSales = Number(cRec.mtdSales);
              }
              if (!locRec.staffData || typeof locRec.staffData !== 'object') {
                locRec.staffData = {};
              }
              if (cRec.staffData && typeof cRec.staffData === 'object') {
                Object.entries(cRec.staffData).forEach(([sId, sData]) => {
                  if (!locRec.staffData[sId]) {
                    locRec.staffData[sId] = { ...sData };
                  } else {
                    if (sData.target !== undefined) locRec.staffData[sId].target = Number(sData.target) || 0;
                    if (sData.heroesTarget !== undefined) locRec.staffData[sId].heroesTarget = Number(sData.heroesTarget) || 0;
                    if (Number(sData.sales) > 0 && Number(locRec.staffData[sId].sales) === 0) {
                      locRec.staffData[sId].sales = Number(sData.sales);
                    }
                  }
                });
              }
            }
          });
          this.daily = mergedDaily;
          this.normalizeAllDailyRecords();
        }

        // 4. ⭐ v23.28: مزامنة التارجت الشهري وتارجت الأبطال الشهري
        if (cloud.monthlyTargets && typeof cloud.monthlyTargets === 'object') {
          this.monthlyTargets = Object.assign({}, this.monthlyTargets || {}, cloud.monthlyTargets);
        }
        if (cloud.monthlyHeroesTargets && typeof cloud.monthlyHeroesTargets === 'object') {
          this.monthlyHeroesTargets = Object.assign({}, this.monthlyHeroesTargets || {}, cloud.monthlyHeroesTargets);
        }

        // 5. مزامنة الحضور والهوية
        if (cloud.attendance && typeof cloud.attendance === 'object') {
          this.attendance = Object.assign({}, this.attendance || {}, cloud.attendance);
        }
        if (cloud.branding && typeof cloud.branding === 'object') {
          this.branding = { ...this.branding, ...cloud.branding };
        }

        // 6. ⭐ v23.28: حفظ فوري لكافة الجداول في localStorage بالهاتف
        try {
          localStorage.setItem('samx_branches', JSON.stringify(this.branches || []));
          localStorage.setItem('samx_staff', JSON.stringify(this.staff || []));
          localStorage.setItem('samx_daily', JSON.stringify(this.daily || {}));
          localStorage.setItem('samx_monthlyTargets', JSON.stringify(this.monthlyTargets || {}));
          localStorage.setItem('samx_monthlyHeroesTargets', JSON.stringify(this.monthlyHeroesTargets || {}));
          localStorage.setItem('samx_attendance', JSON.stringify(this.attendance || {}));
          localStorage.setItem('samx_users', JSON.stringify(this.users || []));
          if (this.branding) localStorage.setItem('samx_branding', JSON.stringify(this.branding));
          localStorage.setItem('samx_last_cloud_sync', String(cloudUpdatedAt || Date.now()));
        } catch (e) {
          console.warn('[Sync] LocalStorage write error:', e);
        }

        // 7. ⭐ v23.28: إعادة حساب التارجت وتوزيعه وتحديث الواجهة فوراً على الهاتف
        if (this.selectedDate && this.selectedBranchId) {
          this.autoDistributeCurrentDay();
        }
        this.refreshCharts();

        // 8. تأكيد إتمام السحب بنجاح لحماية السحابة وتفعيل إمكانية الرفع
        this._cloudPulledOnce = true;
        this.cloudSyncStatus = 'synced';
        this.cloudSyncError = '';
        const locale = this.t ? this.t('locale.time') : 'ar-SA';
        this.lastCloudSyncTime = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        try { localStorage.setItem('samx_last_cloud_sync', Date.now().toString()); } catch (e) {}

        const usersCount = (this.users || []).length;
        const dailyCount = Object.keys(this.daily || {}).length;
        this.loginSyncMsg = this.currentLang === 'ar'
          ? `تم تحديث البيانات من السحابة بنجاح: (${usersCount}) مستخدمين و (${dailyCount}) يومية جاهزة ✅`
          : `Cloud sync complete: (${usersCount}) users and (${dailyCount}) daily records ready ✅`;
        this.loginSyncMsgType = 'success';

        if (isManual) {
          this.showToast(this.currentLang === 'ar' ? `تمت مزامنة السحابة بنجاح: (${usersCount}) مستخدمين و (${dailyCount}) يومية ☁️` : 'Data synchronized from cloud ☁️', 'success');
        }
      } catch (err) {
        console.warn('[CloudSync] Sync from cloud error:', err);
        this.cloudSyncStatus = (typeof navigator !== 'undefined' && !navigator.onLine) ? 'offline' : 'error';
        this.loginSyncMsg = (this.currentLang === 'ar' ? 'تعذر الاتصال بالسحابة: ' : 'Failed to connect: ') + (err.message || 'خطأ غير معروف');
        this.loginSyncMsgType = 'error';
        if (isManual) {
          this.showToast('تعذر الاتصال بالسحابة: ' + (err.message || 'خطأ غير معروف'), 'error');
        }
      }
    },

    syncNow() {
      this.syncFromCloud(true);
    },
    // ================================================================
    //  Users Management
    // ================================================================
    async initUsers() {
      try {
        const stored = localStorage.getItem('samx_users');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // ⭐ v23.20: تطبيع الصلاحيات ودعم editPastDays للمستخدمين القدامى
            parsed.forEach(u => {
              if (!u.permissions) {
                u.permissions = { ...(ROLE_PERMISSIONS[u.role] || DEFAULT_PERMISSIONS) };
              } else if (u.permissions.editPastDays === undefined) {
                u.permissions.editPastDays = (u.role === 'admin' || u.role === 'manager');
              }
            });

            // ⭐ v23.3: ضمان وجود مدير عام واحد على الأقل — بدون حذف أي مستخدم
            const hasAdmin = parsed.some(u => u.role === 'admin');
            if (!hasAdmin) {
              const samHash = await sha256('7701');
              parsed.unshift({
                id: 'u_sam', username: 'sam', passwordHash: samHash,
                fullName: 'المدير العام', role: 'admin', branchId: '',
                permissions: { ...ROLE_PERMISSIONS.admin },
              });
              console.warn('[Users] ⚠️ لم يوجد أي مدير عام — تمت إضافة حساب "sam" افتراضياً');
            }

            // دمج مستخدمي Seed (مثل samg) إذا لم يكونوا مضافين بعد
            if (window.SAMX_SEED?.data?.users && Array.isArray(window.SAMX_SEED.data.users)) {
              window.SAMX_SEED.data.users.forEach(su => {
                if (su && su.username && !parsed.some(x => (x.username || '').toLowerCase() === su.username.toLowerCase())) {
                  parsed.push({ ...su });
                }
              });
            }

            this.users = parsed;
            try { localStorage.setItem('samx_users', JSON.stringify(this.users)); } catch (e) {}
            return;
          }
        }
      } catch (e) {
        console.warn('[Users] فشل تحميل المستخدمين المخزّنين:', e);
      }

      // أول تشغيل: استخدام Seed Data إن وُجد
      let initialUsers = [];
      if (window.SAMX_SEED?.data?.users && Array.isArray(window.SAMX_SEED.data.users)) {
        initialUsers = JSON.parse(JSON.stringify(window.SAMX_SEED.data.users));
      } else {
        const samHash = await sha256('7701');
        initialUsers = [
          {
            id: 'u_sam', username: 'sam', passwordHash: samHash,
            fullName: 'المدير العام', role: 'admin', branchId: '',
            permissions: { ...ROLE_PERMISSIONS.admin },
          },
        ];
      }
      this.users = initialUsers;
      try { localStorage.setItem('samx_users', JSON.stringify(this.users)); } catch (e) {}
    },
    persistUsers() {
      try { localStorage.setItem('samx_users', JSON.stringify(this.users)); } catch (e) {}
      this.triggerCloudSyncDebounced();
    },
    async doLogin() {
      this.loginError = '';
      const inputUsername = (this.loginForm.username || '').trim().toLowerCase();
      const inputPassword = (this.loginForm.password || '').trim();
      if (!inputUsername || !inputPassword) {
        this.loginError = 'أدخل اسم المستخدم وكلمة المرور';
        return;
      }
      this.loggingIn = true;
      try {
        await this.initUsers();
        let user = this.users.find(u => (u.username || '').trim().toLowerCase() === inputUsername);
        let passwordOk = user ? await verifyPassword(inputPassword, user.passwordHash) : false;

        // ⭐ v23.29: سحب فوري مباشر من السحابة إذا لم يتم العثور على المستخدم محلياً أو كلمة المرور لم تتطابق
        if (!user || !passwordOk) {
          if (typeof navigator === 'undefined' || navigator.onLine) {
            try {
              await this.syncFromCloud(false);
              user = this.users.find(u => (u.username || '').trim().toLowerCase() === inputUsername);
              if (user) {
                passwordOk = await verifyPassword(inputPassword, user.passwordHash);
              }
            } catch (e) {
              console.warn('[doLogin] Pre-login cloud fetch failed:', e);
            }
          }
        }

        // فحص إضافي في مستخدمي Seed كخيار طوارئ أخير
        if ((!user || !passwordOk) && window.SAMX_SEED?.data?.users) {
          const seedUser = window.SAMX_SEED.data.users.find(u => (u.username || '').trim().toLowerCase() === inputUsername);
          if (seedUser) {
            const seedPassOk = await verifyPassword(inputPassword, seedUser.passwordHash);
            if (seedPassOk) {
              user = seedUser;
              passwordOk = true;
              if (!this.users.some(u => (u.username || '').toLowerCase() === user.username.toLowerCase())) {
                this.users.push(user);
                try { localStorage.setItem('samx_users', JSON.stringify(this.users)); } catch (e) {}
              }
            }
          }
        }

        if (!user || !passwordOk) {
          this.loginError = this.t('users.errors.invalidCreds', 'بيانات الدخول غير صحيحة');
          this.loggingIn = false;
          return;
        }
        this.currentUser = {
          id: user.id, username: user.username, fullName: user.fullName,
          role: user.role, branchId: user.branchId || '',
        };
        const storage = this.rememberMe ? localStorage : sessionStorage;
        try { storage.setItem('samx_session', JSON.stringify(this.currentUser)); } catch (e) {}
        this.loginForm = { username: '', password: '' };
        this.load();
        this.setDefaultSelections();
        this.currentView = 'welcome';
        nextTick(() => this.refreshCharts());
        this.showToast(this.t('toast.login.welcome', '', { name: user.fullName }), 'success');
        this.logActivity(this.t('log.login'), `${user.fullName} (${user.username})`);
      } catch (e) {
        this.loginError = 'خطأ: ' + (e.message || e);
      }
      this.loggingIn = false;
    },
    setDefaultSelections() {
      if (!this.branches.length) return;
      const allowed = this.allowedBranches;
      if (!allowed.length) return;
      const defaultBranchId = allowed[0].id;
      this.selectedBranchId = defaultBranchId;
      this.monthlyBranchId = defaultBranchId;
      this.yoyBranchId = defaultBranchId;
      this.analyticsBranchId = defaultBranchId;
      this.distBranchId = defaultBranchId;
    },
    doLogout() {
      if (!confirm(this.t('confirm.logout'))) return;
      this.logActivity(this.t('log.logout'), this.currentUser.fullName);
      this.persistNow();
      this.currentUser = null;
      try {
        sessionStorage.removeItem('samx_session');
        localStorage.removeItem('samx_session');
      } catch (e) {}
      this.currentView = 'welcome';
    },
    restoreSession() {
      try {
        const s = sessionStorage.getItem('samx_session') || localStorage.getItem('samx_session');
        if (s) {
          this.currentUser = JSON.parse(s);
          this.load();
          this.setDefaultSelections();
          this.currentView = 'welcome';
        }
      } catch (e) {}
    },
    async saveUser() {
      if (!this.currentUser || this.currentUser.role !== 'admin') {
        this.showToast(this.t('users.noPermission', 'غير مصرح لك بإدارة المستخدمين ⛔'), 'error');
        return;
      }
      this.userError = '';
      const { fullName, username, password, role, branchId, permissions } = this.userForm;
      const cleanUsername = (username || '').trim();
      const cleanFullName = (fullName || '').trim();
      if (!cleanFullName || !cleanUsername) { this.userError = this.t('users.errors.nameUser'); return; }
      if (this.editingUser) {
        const u = this.users.find(x => x.id === this.editingUser);
        if (!u) return;
        u.fullName = cleanFullName;
        u.username = cleanUsername;
        u.role = role;
        u.permissions = { ...permissions };
        u.branchId = branchId;
        if (password) u.passwordHash = await sha256(password);
        this.editingUser = null;
        this.showToast(this.t('users.toast.edited'), 'success');
        this.logActivity(this.t('log.user.edit'), cleanUsername);
      } else {
        if (!password || password.length < 4) { this.userError = this.t('users.errors.passwordShort'); return; }
        if (this.users.some(u => (u.username || '').trim().toLowerCase() === cleanUsername.toLowerCase())) {
          this.userError = this.t('users.errors.userExists');
          return;
        }
        const hash = await sha256(password);
        this.users.push({
          id: this.uid(), username: cleanUsername, passwordHash: hash, fullName: cleanFullName, role, branchId,
          permissions: { ...permissions },
        });
        this.showToast(this.t('users.toast.added'), 'success');
        this.logActivity(this.t('log.user.add'), `${cleanUsername} (${this.roleLabel(role)})`);
      }
      this.userForm = {
        fullName: '', username: '', password: '', role: 'manager', branchId: '',
        permissions: { ...DEFAULT_PERMISSIONS },
      };
      this.persistUsers();
      // ⭐ v23.25: رفع فوري مباشر لسحابة D1 مع انتظار الاكتمال
      await this.syncToCloud();
    },
    async deleteUser(id) {
      if (!this.currentUser || this.currentUser.role !== 'admin') {
        this.showToast(this.t('users.noPermission', 'غير مصرح لك بإدارة المستخدمين ⛔'), 'error');
        return;
      }
      const u = this.users.find(x => x.id === id);
      if (!u) return;

      if (this.currentUser && u.id === this.currentUser.id) {
        this.showToast(this.t('users.toast.cannotDeleteSelf'), 'warning');
        return;
      }

      if (u.role === 'admin') {
        const otherAdmins = this.users.filter(x => x.role === 'admin' && x.id !== id);
        if (otherAdmins.length === 0) {
          this.showToast(this.t('users.toast.cannotDeleteLastAdmin'), 'warning');
          return;
        }
      }

      if (!confirm(this.t('users.confirm.delete', '', { name: u.fullName }))) return;

      this.users = this.users.filter(x => x.id !== id);
      this.persistUsers();
      this.showToast(this.t('users.toast.deleted'), 'success');
      this.logActivity(this.t('log.user.delete'), u.username);
      // ⭐ v23.25: رفع فوري مباشر لسحابة D1 مع انتظار الاكتمال
      await this.syncToCloud();
    },
    editUser(u) {
      if (!this.currentUser || this.currentUser.role !== 'admin') {
        this.showToast(this.t('users.noPermission', 'غير مصرح لك بإدارة المستخدمين ⛔'), 'error');
        return;
      }
      this.editingUser = u.id;
      this.userForm = {
        fullName: u.fullName,
        username: u.username,
        password: '',
        role: u.role,
        branchId: u.branchId || '',
        permissions: { ...DEFAULT_PERMISSIONS, ...(u.permissions || {}) },
      };
      this.userError = '';
    },
    cancelUserEdit() {
      this.editingUser = null;
      this.userForm = {
        fullName: '', username: '', password: '', role: 'manager',
        branchId: '', permissions: { ...DEFAULT_PERMISSIONS },
      };
      this.userError = '';
    },
    // ================================================================
    //  Attendance
    // ================================================================
    attKey(staffId) { return `${this.selectedDate}|${staffId}`; },
    isPresent(staffId) { return this.attendance[this.attKey(staffId)] !== false; },
    toggleAttendance(staffId) {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.canManageAttendance) {
        this.showToast(this.currentLang === 'ar' ? 'غير مصرح لك بتعديل حالة الحضور ⛔' : 'Not authorized to change attendance ⛔', 'warning');
        return;
      }
      const key = this.attKey(staffId);
      const cur = this.attendance[key] !== false;
      this.attendance[key] = !cur;
      this.vibrate(15);   // ⭐ v23.10
      this.autoDistributeCurrentDay();
      this.schedulePersist();
      this.triggerCloudSyncDebounced();

      const staffMember = this.staff.find(s => s.id === staffId);
      const sName = staffMember ? staffMember.name : staffId;
      const bName = this.selectedBranch ? this.selectedBranch.name : '';
      this.logActivity('👥 تسجيل حضور', `${sName}: ${!cur ? 'حاضر ✅' : 'غائب ❌'} (${bName} • ${this.selectedDate})`, {
        category: 'users', level: 'info', branchName: bName
      });
    },
    markAllPresent() {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.canManageAttendance) {
        this.showToast(this.currentLang === 'ar' ? 'غير مصرح لك بتعديل حالة الحضور ⛔' : 'Not authorized to change attendance ⛔', 'warning');
        return;
      }
      this.branchStaff.forEach(s => { this.attendance[this.attKey(s.id)] = true; });
      this.vibrate([10, 40, 10]);   // ⭐ v23.10 — نمط مميز للحضور الجماعي
      if (this.selectedDate && this.selectedBranchId) {
        this.ensureDailyRecordFromMonthly(this.selectedDate, this.selectedBranchId);
        this.autoDistributeForDate(this.selectedDate, this.selectedBranchId);
      }
      this.schedulePersist();
      this.triggerCloudSyncDebounced();
      this.showToast(this.t('toast.attendance.allPresent'), 'success');
    },
    redistributeTargets() {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.canManageAttendance && !this.canEditTarget) {
        this.showToast(this.currentLang === 'ar' ? 'غير مصرح لك بإعادة توزيع التارجت ⛔' : 'Not authorized to redistribute targets ⛔', 'warning');
        return;
      }
      const present = this.branchStaff.filter(s => this.isPresent(s.id));
      if (present.length === 0) return;
      if (!this.selectedBranchId) return;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const d = this.dayData;
      const basePer = (Number(d.baseTarget) || 0) / present.length;
      const heroesPer = (Number(d.heroesTarget) || 0) / present.length;
      this.branchStaff.forEach(s => {
        const sd = this.ensureStaffRecord(key, s.id);
        if (!sd) return;
        if (this.isPresent(s.id)) {
          sd.target = Math.round(basePer * 100) / 100;
          sd.heroesTarget = Math.round(heroesPer * 100) / 100;
        } else {
          sd.target = 0;
          sd.heroesTarget = 0;
        }
      });
      this.schedulePersist();
      this.triggerCloudSyncDebounced();
      this.showToast(this.t('toast.target.redistributed', 'تمت إعادة توزيع التارجت بنجاح'), 'success');
    },
    distributeTargetsToStaff() {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!this.selectedBranch) return;
      if (!this.selectedBranchId) return;
      if (!confirm(this.t('confirm.distributeTargets'))) return;
      const present = this.branchStaff.filter(s => this.isPresent(s.id));
      if (present.length === 0) { alert(this.t('alert.bulk.nothingToImport')); return; }
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const d = this.dayData;
      let branchBase = Number(d.baseTarget) || 0;
      let branchHeroes = Number(d.heroesTarget) || 0;
      if (branchBase === 0) branchBase = this.staffRowsComputed.reduce((s, r) => s + r.target, 0);
      if (branchHeroes === 0) branchHeroes = this.staffRowsComputed.reduce((s, r) => s + r.heroesTarget, 0);
      const basePer = branchBase / present.length;
      const heroesPer = branchHeroes / present.length;
      this.branchStaff.forEach(s => {
        const sd = this.ensureStaffRecord(key, s.id);
        if (!sd) return;
        if (this.isPresent(s.id)) {
          sd.target = Math.round(basePer * 100) / 100;
          sd.heroesTarget = Math.round(heroesPer * 100) / 100;
        } else {
          sd.target = 0;
          sd.heroesTarget = 0;
        }
      });
      this.showToast(this.t('toast.attendance.distributed', '', { count: present.length }), 'success');
    },
    // ⭐ v23.17: قياس ارتفاع رأس التطبيق لتجنب قص عناوين النوافذ عند التمرير
    syncHeaderHeight() {
      try {
        const header = document.querySelector('header');
        if (header) {
          const h = header.getBoundingClientRect().height;
          if (h > 0) {
            document.documentElement.style.setProperty('--app-header-height', Math.round(h) + 'px');
          }
        }
      } catch (e) {}
    },
    // ⭐ v23.10: Pull-to-Refresh
    setupPullToRefresh() {
      const app = document.getElementById('app');
      if (!app) return;
      if (!('ontouchstart' in window)) return;

      // touchstart (passive)
      app.addEventListener('touchstart', (e) => {
        if (!this.currentUser) return;
        if (this.ptr.refreshing) return;
        if (window.scrollY > 0) return;

        const tgt = e.target;
        if (tgt.closest && tgt.closest('.swipe-wrap')) return;
        if (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.tagName === 'SELECT') return;

        this.ptr.startY = e.touches[0].clientY;
        this.ptr.pullDistance = 0;
        this.ptr.active = true;
      }, { passive: true });

      // touchmove (non-passive for preventDefault)
      app.addEventListener('touchmove', (e) => {
        if (!this.ptr.active) return;
        if (this.ptr.refreshing) return;
        if (window.scrollY > 0) {
          this.ptr.active = false;
          this.ptr.visible = false;
          this.ptr.pullDistance = 0;
          return;
        }

        const dy = e.touches[0].clientY - this.ptr.startY;

        if (dy < -5) {
          this.ptr.active = false;
          this.ptr.visible = false;
          this.ptr.pullDistance = 0;
          return;
        }
        if (dy < 5) return;

        const distance = Math.min(dy * 0.55, 100);
        this.ptr.pullDistance = distance;
        this.ptr.visible = true;
        this.ptr.text = distance >= 60 ? 'أفلت للتحديث' : 'اسحب للتحديث';

        if (e.cancelable) e.preventDefault();
      }, { passive: false });

      // touchend (passive)
      app.addEventListener('touchend', () => {
        if (!this.ptr.active) return;
        this.ptr.active = false;

        if (this.ptr.pullDistance >= 60 && !this.ptr.refreshing) {
          this.ptrRefresh();
        } else {
          this.ptr.visible = false;
          this.ptr.pullDistance = 0;
        }
      }, { passive: true });

      // touchcancel (passive)
      app.addEventListener('touchcancel', () => {
        this.ptr.active = false;
        this.ptr.visible = false;
        this.ptr.pullDistance = 0;
      }, { passive: true });
    },

    ptrRefresh() {
      this.ptr.refreshing = true;
      this.ptr.visible = true;
      this.ptr.text = 'جارٍ التحديث...';
      this.vibrate(20);

      setTimeout(() => {
        try {
          // 1) حدّث الرسوم البيانية
          this.refreshCharts();

          // 2) افحص التنبيهات الذكية
          if (typeof this.checkSmartNotifications === 'function') {
            try { this.checkSmartNotifications(); } catch(e) {}
          }

          // 3) حدّث الوقت
          this.updateLiveTime();

          this.showToast('✅ تم التحديث', 'success');
        } catch (e) {
          console.error('[PTR] Refresh failed:', e);
        }

        setTimeout(() => {
          this.ptr.refreshing = false;
          this.ptr.visible = false;
          this.ptr.pullDistance = 0;
        }, 300);
      }, 600);
    },

    clearAllSales() {
      if (this.isDayClosed) {
        this.showToast(this.currentLang === 'ar' ? 'هذه اليومية مغلقة ومرحلة ولا يمكن تعديلها 🔒' : 'This day is closed and sealed 🔒', 'warning');
        return;
      }
      if (this.isPastDateLocked) {
        this.showToast(this.t('toast.dateLocked', 'هذا التاريخ مقفل ولا يمكن تعديله 🔒'), 'warning');
        return;
      }
      if (!confirm(this.t('confirm.clearAllSales'))) return;
      const d = this.dayData;
      Object.values(d.staffData).forEach(sd => { sd.sales = 0; });
      d.manualExtra = 0;
      this.logActivity('⚠️ مسح جميع المبيعات', `${this.selectedBranch?.name || ''} • تاريخ: ${this.selectedDate}`);
      this.showToast(this.t('toast.sales.reset'), 'success');
      this.schedulePersist();
    },
    // ================================================================
    //  ⭐ v23.21: حوكمة إغلاق وترحيل اليوميات (Daily Shift Closure)
    // ================================================================
    openCloseDayModal() {
      if (!this.canCloseDay) {
        this.showToast(this.currentLang === 'ar' ? 'غير مصرح لك بإغلاق اليوميات ⛔' : 'Not authorized to close days ⛔', 'warning');
        return;
      }
      this.closeDayNote = '';
      this.showCloseDayModal = true;
    },
    confirmCloseDay() {
      if (!this.canCloseDay) return;
      if (!this.selectedDate || !this.selectedBranchId) return;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const rec = this.normalizeDayRecord(key);
      if (!rec) return;

      rec.isClosed = true;
      rec.closedAt = Date.now();
      rec.closedBy = this.currentUser ? this.currentUser.fullName : 'المدير';
      rec.closedRole = this.currentUser ? this.currentUser.role : 'admin';
      rec.closedSales = this.branchTotalSales;
      rec.closedInvoices = this.branchInvoices;
      rec.closeNote = (this.closeDayNote || '').trim() || (this.currentLang === 'ar' ? 'إغلاق واعتماد رسمي' : 'Official shift close');

      this.logActivity('🔒 إغلاق يومية', `${this.selectedBranch?.name || ''} - تاريخ: ${this.selectedDate} • المبيعات: ${this.formatSAR(this.branchTotalSales)}`);
      this.persist();
      this.vibrate([20, 50, 20]);
      this.showCloseDayModal = false;
      this.showToast(this.currentLang === 'ar' ? 'تم اعتماد وإغلاق اليومية بنجاح 🔒✅' : 'Day shift closed & sealed successfully 🔒✅', 'success');
    },
    openReopenModal() {
      if (!this.canReopenDay) {
        this.showToast(this.currentLang === 'ar' ? 'صلاحية إعادة فتح اليومية للمدير العام فقط ⛔' : 'Only Admin can reopen closed days ⛔', 'error');
        return;
      }
      this.reopenDayReason = '';
      this.reopenDayError = '';
      this.showReopenDayModal = true;
    },
    confirmReopenDay() {
      if (!this.canReopenDay) return;
      if (!this.reopenDayReason) {
        this.reopenDayError = this.currentLang === 'ar' ? 'يرجى كتابة سبب إعادة فتح اليومية' : 'Please provide a reason';
        return;
      }
      if (!this.selectedDate || !this.selectedBranchId) return;
      const key = `${this.selectedDate}|${this.selectedBranchId}`;
      const rec = this.normalizeDayRecord(key);
      if (!rec) return;

      rec.isClosed = false;
      rec.reopenedAt = Date.now();
      rec.reopenedBy = this.currentUser ? this.currentUser.fullName : 'المدير العام';
      rec.reopenReason = this.reopenDayReason;

      this.logActivity('🔓 إعادة فتح يومية', `${this.selectedBranch?.name || ''} (${this.selectedDate}) • السبب: ${this.reopenDayReason}`);
      this.persist();
      this.vibrate(25);
      this.showReopenDayModal = false;
      this.showToast(this.currentLang === 'ar' ? 'تمت إعادة فتح اليومية للتعديل 🔓' : 'Day reopened for editing 🔓', 'info');
    },

    // ================================================================
    //  Helpers
    // ================================================================
        uid() {
      return 'id_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    },

    // ================================================================
    //  ⭐ v23.27: دوال التطبيع والبحث في سجلات الأيام (Normalization & Day Records)
    // ================================================================
    normalizeDateStr(val) {
      return normalizeDateStr(val);
    },

    getDayRecord(date, branchId, autoCreate = false) {
      if (!date || !branchId) return null;
      const normDate = normalizeDateStr(date) || String(date).trim();
      const primaryKey = `${normDate}|${branchId}`;

      // 1. فحص السجل المباشر بالمفتاح القياسي المُوحّد
      if (this.daily && this.daily[primaryKey]) {
        return this.daily[primaryKey];
      }

      // 2. فحص السجلات القديمة أو بصيغ تاريخ غير موحدة
      if (this.daily) {
        const rawKey = `${date}|${branchId}`;
        if (this.daily[rawKey]) {
          if (rawKey !== primaryKey) {
            this.daily[primaryKey] = this.daily[rawKey];
          }
          return this.daily[primaryKey];
        }
        for (const k of Object.keys(this.daily)) {
          if (k.endsWith(`|${branchId}`)) {
            const kDate = k.split('|')[0];
            if (normalizeDateStr(kDate) === normDate) {
              if (k !== primaryKey) {
                this.daily[primaryKey] = this.daily[k];
              }
              return this.daily[primaryKey];
            }
          }
        }
      }

      // 3. فحص التارجت الشهري إذا كان موجوداً
      const monthlyRec = this.ensureDailyRecordFromMonthly(normDate, branchId);
      if (monthlyRec && (Number(monthlyRec.baseTarget) > 0 || Number(monthlyRec.heroesTarget) > 0)) {
        return monthlyRec;
      }

      // 4. إذا طُلب الإنشاء التلقائي
      if (autoCreate) {
        return this.normalizeDayRecord(primaryKey);
      }

      return null;
    },

    normalizeDayRecord(key) {
      if (!key) return null;
      if (!this.daily[key]) {
        this.daily[key] = {
          baseTarget: 0, heroesTarget: 0, manualExtra: 0,
          staffData: {}, invoices: 0, pieces: 0,
        };
        return this.daily[key];
      }
      const rec = this.daily[key];
      if (!rec.staffData || typeof rec.staffData !== 'object') rec.staffData = {};
      if (typeof rec.baseTarget   !== 'number') rec.baseTarget   = Number(rec.baseTarget)   || 0;
      if (typeof rec.heroesTarget !== 'number') rec.heroesTarget = Number(rec.heroesTarget) || 0;
      if (typeof rec.manualExtra  !== 'number') rec.manualExtra  = Number(rec.manualExtra)  || 0;
      if (typeof rec.invoices     !== 'number') rec.invoices     = Number(rec.invoices)     || 0;
      if (typeof rec.pieces       !== 'number') rec.pieces       = Number(rec.pieces)       || 0;
      if (typeof rec.isClosed     !== 'boolean') rec.isClosed     = !!rec.isClosed;
      return rec;
    },

    ensureStaffRecord(key, staffId) {
      const rec = this.normalizeDayRecord(key);
      if (!rec || !staffId) return null;
      if (!rec.staffData[staffId]) {
        rec.staffData[staffId] = { target: 0, heroesTarget: 0, sales: 0 };
      }
      const sd = rec.staffData[staffId];
      if (typeof sd.target       !== 'number') sd.target       = Number(sd.target)       || 0;
      if (typeof sd.heroesTarget !== 'number') sd.heroesTarget = Number(sd.heroesTarget) || 0;
      if (typeof sd.sales        !== 'number') sd.sales        = Number(sd.sales)        || 0;
      return sd;
    },

    // ⭐ v23.27: تطبيع وتوحيد كل سجلات الأيام وصيغ التواريخ دفعة واحدة
    normalizeAllDailyRecords() {
      if (!this.daily || typeof this.daily !== 'object') {
        this.daily = {};
        return;
      }
      const migrated = {};
      Object.keys(this.daily).forEach(key => {
        const rec = this.daily[key];
        const parts = key.split('|');
        if (parts.length >= 2) {
          const rawDate = parts[0];
          const branchId = parts.slice(1).join('|');
          const normDate = normalizeDateStr(rawDate);
          const targetKey = normDate ? `${normDate}|${branchId}` : key;
          migrated[targetKey] = rec;
        } else {
          migrated[key] = rec;
        }
      });
      this.daily = migrated;
      Object.keys(this.daily).forEach(key => {
        this.normalizeDayRecord(key);
      });
    },
    // ================================================================
    //  ⭐ v18: ترحيل البيانات من shiaka_ → samx_
    //  ⭐ v23: تصحيح اسم المفتاح القديم (كان shaka_ بالخطأ)
    // ================================================================
    migrateFromShaka() {
      const migrationFlag = 'samx_migration_done_v23';
      if (localStorage.getItem(migrationFlag) === 'true') return;

      // ⭐ v23: المفتاح الصحيح هو shiaka_ (وليس shaka_)
      const oldBranches = localStorage.getItem('shiaka_branches') || localStorage.getItem('shaka_branches');
      const oldStaff = localStorage.getItem('shiaka_staff') || localStorage.getItem('shaka_staff');

      if (!oldBranches && !oldStaff) {
        localStorage.setItem(migrationFlag, 'true');
        return;
      }

      try {
        const keys = [
          'branches', 'staff', 'daily', 'monthlyTargets',
          'monthlyHeroesTargets', 'attendance', 'users',
          'notifications', 'activity_log', 'auto_backups',
          'staff_photos', 'settings_v14', 'theme',
          'last_morning_alert', 'session'
        ];

        let migratedCount = 0;
        keys.forEach(key => {
          const newKey = `samx_${key}`;
          const oldKey1 = `shiaka_${key}`;  // ⭐ الصحيح
          const oldKey2 = `shaka_${key}`;   // احتياطي
          const value = localStorage.getItem(oldKey1) || localStorage.getItem(oldKey2);
          if (value !== null && localStorage.getItem(newKey) === null) {
            localStorage.setItem(newKey, value);
            migratedCount++;
          }
        });

        localStorage.setItem(migrationFlag, 'true');
        console.log(`[Migration] ✅ تم ترحيل ${migratedCount} مفتاح من shiaka_ إلى samx_`);

        setTimeout(() => {
          if (migratedCount > 0) {
            this.showToast(this.t('toast.migration.success', '', { count: migratedCount }), 'success');
          }
        }, 2000);
      } catch (e) {
        console.error('[Migration] Failed:', e);
        localStorage.setItem(migrationFlag, 'true');
      }
    },

    formatNum(n) {
      n = Number(n) || 0;
      return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    },
    // ⭐ v23.13: تنسيق العملة — الرمز الرسمي الجديد U+20C1 بخط مدعوم بالكامل أو النص الصريح ر.س
    formatSAR(amount) {
      const sym = this.currencySymbol || '\u20C1';
      return this.formatNum(amount) + '\u00A0' + sym;
    },
    // ⭐ v23.2: دوال مساعدة لبطاقة الملخص
    summaryStatusIcon(pct) {
      if (pct >= 100) return '✅';
      if (pct >= 70) return '⚠️';
      return '🚨';
    },
    summaryStatusColor(pct) {
      if (pct >= 100) return '#34d399';
      if (pct >= 70) return '#fbbf24';
      return '#fb7185';
    },
    summarySmartMessage() {
      const d = this.dayData;
      const sales = this.branchSales;
      const t = Number(d.baseTarget) || 0;
      if (t === 0) return this.t('summary.msg.noTarget');
      if (sales === 0) return this.t('summary.msg.noSales');
      const pct = (sales / t) * 100;
      if (pct >= 100) {
        const extra = sales - t;
        const extraPct = pct - 100;
        return this.t('summary.msg.exceeded', '', {
          extra: this.formatNum(extra),
          pct: extraPct.toFixed(1),
        });
      }
      if (pct >= 70) {
        const remaining = t - sales;
        return this.t('summary.msg.close', '', {
          remaining: this.formatNum(remaining),
        });
      }
      const remaining = t - sales;
      return this.t('summary.msg.low', '', {
        remaining: this.formatNum(remaining),
      });
    },

    // ⭐ v23.4-FIX: ألوان رسالة الملخص الذكية (كانت مفقودة)
    summaryMessageColor() {
      const d = this.dayData;
      const sales = this.branchSales;
      const t = Number(d.baseTarget) || 0;
      if (t === 0) {
        return { bg: 'rgba(148,163,184,.1)', border: 'rgba(148,163,184,.3)', color: '#94a3b8' };
      }
      if (sales === 0) {
        return { bg: 'rgba(245,158,11,.1)', border: 'rgba(245,158,11,.4)', color: '#fcd34d' };
      }
      const pct = (sales / t) * 100;
      if (pct >= 100) return { bg: 'rgba(16,185,129,.12)', border: 'rgba(16,185,129,.45)', color: '#6ee7b7' };
      if (pct >= 70)  return { bg: 'rgba(245,158,11,.1)',  border: 'rgba(245,158,11,.4)',  color: '#fcd34d' };
      return             { bg: 'rgba(244,63,94,.1)',   border: 'rgba(244,63,94,.4)',   color: '#fda4af' };
    },

    // ⭐ v23.4-FIX: اسم الفرع من الـ id (كانت مفقودة)
    branchName(id) {
      if (!id) return '—';
      const b = this.branches.find(x => x.id === id);
      return b ? b.name : '—';
    },

    // ⭐ v23.4-FIX: عدد موظفي الفرع (كانت مفقودة)
    staffCount(branchId) {
      if (!branchId) return 0;
      return this.staff.filter(s => s.branchId === branchId).length;
    },

    // ⭐ v23.4-FIX: زر تبديل الثيم السريع (كانت مفقودة)
    toggleTheme() {
      const newMode = this.darkMode ? 'light' : 'dark';
      this.settings.themeMode = newMode;
      this.applyThemeMode();
      this.saveSettingsToStorage();
      this.showToast(this.t(newMode === 'dark' ? 'toast.theme.dark' : 'toast.theme.light'), 'success');
    },
    // ================================================================
    //  Branches
    // ================================================================
    saveBranch() {
      if (!this.canManageBranches) {
        this.showToast(this.t('branches.noPermission', 'غير مصرح لك بإدارة الفروع ⛔'), 'error');
        return;
      }
      this.branchError = '';
      const { name, code } = this.branchForm;
      if (!name || !code) { this.branchError = this.t('branches.errors.nameCode'); return; }
      if (this.editingBranch) {
        const b = this.branches.find(x => x.id === this.editingBranch);
        if (b) { b.name = name; b.code = code; }
        this.editingBranch = null;
        this.showToast(this.t('branches.toast.edited'), 'success');
        this.logActivity(this.t('log.branch.edit'), `${name} (${code})`);
      } else {
        if (this.branches.some(b => b.code === code)) { this.branchError = this.t('branches.errors.codeUsed'); return; }
        this.branches.push({ id: this.uid(), name, code });
        this.showToast(this.t('branches.toast.added'), 'success');
        this.logActivity(this.t('log.branch.add'), `${name} (${code})`);
      }
      this.branchForm = { name: '', code: '' };
    },
    editBranch(b) {
      this.editingBranch = b.id;
      this.branchForm = { name: b.name, code: b.code };
    },
    cancelBranchEdit() {
      this.editingBranch = null;
      this.branchForm = { name: '', code: '' };
    },
    deleteBranch(id) {
      if (!this.canManageBranches) {
        this.showToast(this.t('branches.noPermission', 'غير مصرح لك بإدارة الفروع ⛔'), 'error');
        return;
      }
      if (!confirm(this.t('branches.confirm.delete'))) return;
      const b = this.branches.find(x => x.id === id);
      this.branches = this.branches.filter(b => b.id !== id);
      this.staff = this.staff.filter(s => s.branchId !== id);
      if (this.selectedBranchId === id) this.selectedBranchId = '';
      this.showToast(this.t('branches.toast.deleted'), 'success');
      this.logActivity(this.t('log.branch.delete'), b ? b.name : '');
    },
    // ================================================================
    //  Staff
    // ================================================================
    saveStaff() {
      if (!this.canManageStaff) {
        this.showToast(this.t('staffView.noPermission', 'غير مصرح لك بإدارة الموظفين ⛔'), 'error');
        return;
      }
      this.staffError = '';
      const { name, code, branchId, jobTitle } = this.staffForm;
      if (!name || !code || !branchId) { this.staffError = this.t('staffView.errors.incomplete'); return; }
      if (this.editingStaff) {
        const s = this.staff.find(x => x.id === this.editingStaff);
        if (s) { s.name = name; s.code = code; s.branchId = branchId; s.jobTitle = jobTitle; }
        this.editingStaff = null;
        this.showToast(this.t('staffView.toast.edited'), 'success');
        this.logActivity(this.t('log.staff.edit'), name);
      } else {
        this.staff.push({ id: this.uid(), name, code, branchId, jobTitle });
        this.showToast(this.t('staffView.toast.added'), 'success');
        this.logActivity(this.t('log.staff.add'), `${name} → ${this.branchName(branchId)}`);
      }
      this.staffForm = { name: '', code: '', branchId: '', jobTitle: '' };
    },
    editStaff(s) {
      this.editingStaff = s.id;
      this.staffForm = { name: s.name, code: s.code, branchId: s.branchId, jobTitle: s.jobTitle || '' };
    },
    cancelStaffEdit() {
      this.editingStaff = null;
      this.staffForm = { name: '', code: '', branchId: '', jobTitle: '' };
    },
    deleteStaff(id) {
      if (!this.canManageStaff) {
        this.showToast(this.t('staffView.noPermission', 'غير مصرح لك بإدارة الموظفين ⛔'), 'error');
        return;
      }
      if (!confirm(this.t('staffView.confirm.delete'))) return;
      const s = this.staff.find(x => x.id === id);
      this.staff = this.staff.filter(s => s.id !== id);
      this.showToast(this.t('staffView.toast.deleted'), 'success');
      this.logActivity(this.t('log.staff.delete'), s ? s.name : '');
    },
    // ================================================================
    //  Manual Distribution
    // ================================================================
    openDrawer() {
      if (this.monthlyBranchId) { this.distMonth = this.monthlyMonth; this.distBranchId = this.monthlyBranchId; }
      else if (this.allowedBranches.length) this.distBranchId = this.allowedBranches[0].id;
      this.drawerOpen = true;
    },
    monthlyTargetFor(month, branchId, type) {
      if (!month || !branchId) return 0;
      const key = `${month}|${branchId}`;
      return Number((type === 'heroes' ? this.monthlyHeroesTargets : this.monthlyTargets)[key]) || 0;
    },
    initDistDays() {
      if (!this.distMonth || !this.distBranchId) { this.distDays = []; return; }
      const [y, m] = this.distMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      const dayKeys = ['days.sun','days.mon','days.tue','days.wed','days.thu','days.fri','days.sat'];
      const arr = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dt = new Date(y, m - 1, day);
        const d = this.daily[`${dateStr}|${this.distBranchId}`] || { baseTarget: 0, heroesTarget: 0 };
        arr.push({ date: dateStr, dayName: this.t(dayKeys[dt.getDay()]), base: Number(d.baseTarget) || 0, heroes: Number(d.heroesTarget) || 0 });
    }
      this.distDays = arr;
    },
    distributeEvenly() {
      const n = this.distDays.length;
      if (n === 0) return;
      const base = this.monthlyTargetFor(this.distMonth, this.distBranchId, 'base') / n;
      const heroes = this.monthlyTargetFor(this.distMonth, this.distBranchId, 'heroes') / n;
      this.distDays.forEach(d => {
        d.base = Math.round(base * 100) / 100;
        d.heroes = Math.round(heroes * 100) / 100;
      });
      this.showToast(this.t('toast.distribution.evenly'), 'success');
    },
    clearAllDistDays() {
      if (!confirm(this.t('confirm.clearAllDistDays'))) return;
      this.distDays.forEach(d => { d.base = 0; d.heroes = 0; });
    },
    saveDistribution() {
      if (!this.distBranchId) return;
      let count = 0;
      this.distDays.forEach(d => {
        const key = `${d.date}|${this.distBranchId}`;
        const rec = this.normalizeDayRecord(key);
        if (!rec) return;
        rec.baseTarget = Number(d.base) || 0;
        rec.heroesTarget = Number(d.heroes) || 0;
        count++;
      });
      this.showToast(this.t('toast.distribution.saved', '', { count }), 'success');
this.logActivity(this.t('log.distribution.manual'), `${count} يوم - ${this.branchName(this.distBranchId)}`);
nextTick(() => this.renderMonthlyChart());   // ⭐ v23.9-FIX
},
    clearDistribution() {
      if (!confirm(this.t('confirm.clearDistribution'))) return;
      const [y, m] = this.distMonth.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const key = `${dateStr}|${this.distBranchId}`;
        if (this.daily[key]) { this.daily[key].baseTarget = 0; this.daily[key].heroesTarget = 0; }
      }
      this.initDistDays();
this.showToast(this.t('toast.distribution.cleared'), 'success');
nextTick(() => this.renderMonthlyChart());   // ⭐ v23.9-FIX
},

    // ================================================================
    //  استيراد التارجت الشهري من Excel
    // ================================================================
    async handleExcelImport(e) {
      const file = e.target.files[0];
      if (!file) return;

      // ⭐ v23.3: تحميل المكتبة عند الحاجة
      const loaded = await this.loadXlsxStyleLib();
      if (!loaded) {
        alert(this.t('alert.excel.libFailed'));
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = new Uint8Array(ev.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const findSheet = (name) => {
            const key = workbook.SheetNames.find(n => n.toLowerCase().trim() === name.toLowerCase());
            return key ? workbook.Sheets[key] : null;
          };
          const basicSheet = findSheet('basic');
          const challengeSheet = findSheet('challenge');
          if (!basicSheet && !challengeSheet) {
            alert(this.t('alert.excel.sheetNotFound'));
            return;
          }
          const basicRows = basicSheet ? XLSX.utils.sheet_to_json(basicSheet, { header: 1, raw: true, defval: null, cellDates: false }) : [];
          const challengeRows = challengeSheet ? XLSX.utils.sheet_to_json(challengeSheet, { header: 1, raw: true, defval: null, cellDates: false }) : [];
          this.processMonthlyTargetRows(basicRows, challengeRows);
        } catch (err) {
          alert(this.t('alert.excel.readError', '', { error: err.message }));
          console.error(err);
        }
      };
      reader.readAsArrayBuffer(file);
      e.target.value = '';
    },
    processMonthlyTargetRows(basicRows, challengeRows) {
      if (!basicRows.length && !challengeRows.length) {
        alert(this.t('alert.excel.emptyFile'));
        return;
      }
      const headerSource = basicRows.length ? basicRows : challengeRows;
      if (!headerSource.length || headerSource.length < 2) {
        alert(this.t('alert.excel.insufficientRows'));
        return;
      }
      const headerRow = headerSource[0];
      const dateColumns = [];
      let detectedMonth = '';
      for (let i = 3; i < headerRow.length; i++) {
        const cell = headerRow[i];
        if (!cell) continue;
        const dateStr = this.parseExcelDate(cell);
        if (dateStr) dateColumns.push({ colIndex: i, date: dateStr });
      }
      if (dateColumns.length === 0) {
        alert(this.t('alert.excel.noDateColumns'));
        return;
      }
      detectedMonth = dateColumns[0].date.slice(0, 7);
      const basicMap = this.buildBranchTargetMap(basicRows, dateColumns);
      const challengeMap = this.buildBranchTargetMap(challengeRows, dateColumns);
      const allKeys = new Set([...basicMap.keys(), ...challengeMap.keys()]);
      const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
      const preview = [];
      const unmatched = [];
      const conflicts = [];
      allKeys.forEach(key => {
        const b = basicMap.get(key) || { code: '', name: '', total: 0, days: {} };
        const c = challengeMap.get(key) || { code: '', name: '', total: 0, days: {} };
        const code = b.code || c.code;
        const name = b.name || c.name;
        const matched = this.branches.find(br =>
          (code && norm(br.code) === norm(code)) || (name && norm(br.name) === norm(name))
        );
        const basicSumFromDays = Object.values(b.days).reduce((s, v) => s + (Number(v) || 0), 0);
        const heroesSumFromDays = Object.values(c.days).reduce((s, v) => s + (Number(v) || 0), 0);
        const basicTotalFromFile = Number(b.total) || 0;
        const heroesTotalFromFile = Number(c.total) || 0;
        const basicMismatch = basicTotalFromFile > 0 && Math.abs(basicSumFromDays - basicTotalFromFile) > 1;
        const heroesMismatch = heroesTotalFromFile > 0 && Math.abs(heroesSumFromDays - heroesTotalFromFile) > 1;
        const row = {
          code, name, basicTotalFromFile, heroesTotalFromFile,
          basicSumFromDays: Math.round(basicSumFromDays * 100) / 100,
          heroesSumFromDays: Math.round(heroesSumFromDays * 100) / 100,
          basicDays: b.days, heroesDays: c.days,
          matchedBranchId: matched ? matched.id : null,
          matchedBranchName: matched ? matched.name : '',
          basicMismatch, heroesMismatch,
        };
        if (!matched) unmatched.push(row);
        else {
          const hasExisting = this.branchHasMonthlyData(matched.id, detectedMonth);
          if (hasExisting) conflicts.push({ branchId: matched.id, branchName: matched.name });
          preview.push(row);
        }
      });
      preview.sort((a, b) => String(a.code).localeCompare(String(b.code), 'en', { numeric: true }));
      this.importPreview = preview;
      this.importMeta = {
        detectedMonth, dateColumnsCount: dateColumns.length,
        unmatched, conflicts,
        basicFound: !!basicRows.length, challengeFound: !!challengeRows.length,
      };
      const unmatchedPart = unmatched.length ? this.t('toast.import.unmatchedPart', '', { count: unmatched.length }) : '';
      const conflictsPart = conflicts.length ? this.t('toast.import.conflictsPart', '', { count: conflicts.length }) : '';
      this.showToast(this.t('toast.import.loaded', '', { matched: preview.length, unmatched: unmatchedPart, conflicts: conflictsPart }), 'success');
    },
    buildBranchTargetMap(rows, dateColumns) {
      const map = new Map();
      if (!rows || rows.length < 2) return map;
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || !row.length) continue;
        const code = String(row[0] ?? '').trim();
        const name = String(row[1] ?? '').trim();
        const total = Number(row[2]) || 0;
        if (!code && !name) continue;
        const key = code || name;
        const days = {};
        dateColumns.forEach(dc => {
          const v = Number(row[dc.colIndex]);
          if (!isNaN(v) && v > 0) days[dc.date] = v;
        });
        map.set(key, { code, name, total, days });
      }
      return map;
    },
    parseExcelDate(cell) {
      return normalizeDateStr(cell);
    },
    branchHasMonthlyData(branchId, month) {
      if (!branchId || !month) return false;
      const prefix = `${month}-`;
      for (const key of Object.keys(this.daily)) {
        if (key.startsWith(prefix) && key.endsWith(`|${branchId}`)) {
          const rec = this.daily[key];
          if (Number(rec.baseTarget) > 0 || Number(rec.heroesTarget) > 0) return true;
        }
      }
      const monthlyKey = `${month}|${branchId}`;
      if (Number(this.monthlyTargets[monthlyKey]) > 0) return true;
      if (Number(this.monthlyHeroesTargets[monthlyKey]) > 0) return true;
      return false;
    },
    confirmImport() {
      if (!this.importPreview.length) return;
      const meta = this.importMeta || {};
      const month = meta.detectedMonth;
      if (!month) { alert(this.t('alert.import.noMonth')); return; }

      if (meta.conflicts && meta.conflicts.length > 0) {
        const names = meta.conflicts.map(c => c.branchName).slice(0, 5).join('، ');
        const extra = meta.conflicts.length > 5 ? this.t('confirm.import.conflicts.extra', '', { count: meta.conflicts.length - 5 }) : '';
        if (!confirm(this.t('confirm.import.conflicts', '', { count: meta.conflicts.length, month, names: names + extra }))) return;
      }
      const mismatched = this.importPreview.filter(r => r.basicMismatch || r.heroesMismatch);
      if (mismatched.length > 0) {
        if (!confirm(this.t('confirm.import.mismatched', '', { count: mismatched.length }))) return;
      }
      if (!confirm(this.t('confirm.import.final', '', { branches: this.importPreview.length, month, days: meta.dateColumnsCount }))) return;
      let appliedBranches = 0, appliedDays = 0;
      this.importPreview.forEach(row => {
        if (!row.matchedBranchId) return;
        Object.entries(row.basicDays).forEach(([date, value]) => {
          const normDate = normalizeDateStr(date) || date;
          const key = `${normDate}|${row.matchedBranchId}`;
          const rec = this.normalizeDayRecord(key);
          if (!rec) return;
          rec.baseTarget = Number(value) || 0;
          appliedDays++;
        });
        Object.entries(row.heroesDays).forEach(([date, value]) => {
          const normDate = normalizeDateStr(date) || date;
          const key = `${normDate}|${row.matchedBranchId}`;
          const rec = this.normalizeDayRecord(key);
          if (!rec) return;
          rec.heroesTarget = Number(value) || 0;
        });
        const monthlyKey = `${month}|${row.matchedBranchId}`;
        this.monthlyTargets[monthlyKey] = Math.round(row.basicSumFromDays * 100) / 100;
        this.monthlyHeroesTargets[monthlyKey] = Math.round(row.heroesSumFromDays * 100) / 100;
        appliedBranches++;
      });
      this.logActivity(this.t('log.import.monthly'), `${appliedBranches} فرع • ${appliedDays} يوم • ${month}`);
      this.showToast(this.t('toast.import.success', '', { branches: appliedBranches, days: appliedDays }), 'success');
      this.importPreview = [];
      this.importMeta = null;
      this.showImportModal = false;
      if (month) this.monthlyMonth = month;
      
      // ⭐ v23.27: تحديث تارجت اليوم وتوزيعه فورياً إذا كان الفرع والتاريخ معروضين
      if (this.selectedDate && this.selectedBranchId) {
        this.autoDistributeCurrentDay();
      }
      this.persist();
      // ⭐ v23.27: رفع فوري لبيانات التارجت إلى سحابة D1 عبر (/api/sync)
      this._cloudPulledOnce = true;
      this.syncToCloud(true);
      nextTick(() => this.renderMonthlyChart());
    },

    // ================================================================
    //  استيراد الفروع والموظفين (Bulk)
    // ================================================================
    async handleBulkImport(e) {
      const file = e.target.files[0];
      if (!file) return;

      // ⭐ v23.3: تحميل المكتبة عند الحاجة
      const loaded = await this.loadXlsxStyleLib();
      if (!loaded) {
        alert(this.t('alert.excel.libFailed'));
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = new Uint8Array(ev.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null });
          this.processBulkRows(rows);
        } catch (err) { alert(this.t('alert.excel.readError', '', { error: err.message })); }
      };
      reader.readAsArrayBuffer(file);
      e.target.value = '';
    },
    processBulkRows(rows) {
      const dataRows = rows.slice(1).filter(r => r && r.some(c => c !== null && c !== ''));
      if (dataRows.length === 0) { alert(this.t('alert.bulk.emptyFile')); return; }
      const branchMap = new Map();
      const branchNameConflicts = [];
      dataRows.forEach(row => {
        const branchCode = String(row[0] ?? '').trim();
        const branchName = String(row[1] ?? '').trim();
        const staffName = String(row[2] ?? '').trim();
        const staffCode = String(row[3] ?? '').trim();
        const jobTitle = String(row[4] ?? '').trim();
        if (!branchCode && !branchName) return;
        const key = branchCode || branchName;
        if (!branchMap.has(key)) branchMap.set(key, { code: branchCode, name: branchName, staffRows: [] });
        else {
          const existing = branchMap.get(key);
          if (existing.name && branchName && existing.name !== branchName) {
            const conflictMsg = `كود ${branchCode}: اسمان مختلفان — "${existing.name}" و "${branchName}" (سيتم استخدام الأول)`;
            if (!branchNameConflicts.includes(conflictMsg)) branchNameConflicts.push(conflictMsg);
          }
        }
        if (staffName && staffCode) {
          let finalJobTitle = 'بائع';
          if (jobTitle) finalJobTitle = this.normalizeJobTitle(jobTitle);
          branchMap.get(key).staffRows.push({ name: staffName, code: staffCode, jobTitle: finalJobTitle });
        }
      });
      const newBranches = [];
      const existingBranches = [];
      const newStaff = [];
      const duplicateStaff = [];
      branchMap.forEach(branch => {
        const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
        let existingBranch = null;
        for (const b of this.branches) {
          if (branch.code && norm(b.code) === norm(branch.code)) { existingBranch = b; break; }
          if (branch.name && norm(b.name) === norm(branch.name)) { existingBranch = b; break; }
        }
        if (existingBranch) {
          existingBranches.push({
            code: existingBranch.code, name: existingBranch.name,
            staffCount: branch.staffRows.length, existingBranchId: existingBranch.id,
          });
        } else {
          newBranches.push({ code: branch.code, name: branch.name, staffCount: branch.staffRows.length });
        }
        const targetBranchId = existingBranch ? existingBranch.id : null;
        branch.staffRows.forEach(sr => {
          let isDuplicate = false;
          let reason = '';
          const duplicateByCode = this.staff.find(s => norm(s.code) === norm(sr.code));
          if (duplicateByCode) { isDuplicate = true; reason = `الرقم الوظيفي ${sr.code} موجود (${duplicateByCode.name} — ${this.branchName(duplicateByCode.branchId)})`; }
          if (!isDuplicate && targetBranchId) {
            const duplicateByName = this.staff.find(s => s.branchId === targetBranchId && norm(s.name) === norm(sr.name));
            if (duplicateByName) { isDuplicate = true; reason = `الاسم موجود في نفس الفرع`; }
          }
          if (isDuplicate) duplicateStaff.push({ name: sr.name, code: sr.code, branchName: branch.name, reason });
          else newStaff.push({
            name: sr.name, code: sr.code, jobTitle: sr.jobTitle,
            branchName: branch.name, branchCode: branch.code,
            branchKey: branch.code || branch.name,
            isExistingBranch: !!existingBranch,
            existingBranchId: existingBranch?.id || null,
          });
        });
      });
      this.bulkPreview = { loaded: true, newBranches, existingBranches, newStaff, duplicateStaff, branchNameConflicts };
    },
    normalizeJobTitle(input) {
      if (!input) return 'بائع';
      const cleaned = String(input).trim().replace(/\s+/g, ' ');
      if (this.jobTitles.includes(cleaned)) return cleaned;
      const lower = cleaned.toLowerCase();
      for (const jt of this.jobTitles) {
        const jtLower = jt.toLowerCase();
        if (jtLower.includes(lower) || lower.includes(jtLower)) return jt;
      }
      const synonyms = {
        'مدير': 'مدير معرض', 'manager': 'مدير معرض', 'branch manager': 'مدير معرض',
        'نائب': 'نائب مدير معرض', 'assistant': 'نائب مدير معرض', 'assistant manager': 'نائب مدير معرض',
        'مشرف': 'مشرف منطقة', 'supervisor': 'مشرف منطقة', 'area manager': 'مشرف منطقة', 'area': 'مشرف منطقة',
        'بائع': 'بائع', 'salesman': 'بائع', 'seller': 'بائع', 'sales': 'بائع',
        'cashier': 'بائع', 'كاشير': 'بائع',
      };
      for (const [key, value] of Object.entries(synonyms)) {
        if (lower.includes(key)) return value;
      }
      return cleaned;
    },
    isJobTitleValid(title) {
      if (!title) return false;
      return this.jobTitles.includes(title);
    },
    confirmBulkImport() {
      if (!this.canManageBranches || !this.canManageStaff) {
        this.showToast(this.t('branches.noPermission', 'غير مصرح لك باستيراد الفروع والموظفين ⛔'), 'error');
        return;
      }
      if (!this.bulkPreview.loaded) return;
      const { newBranches, newStaff, existingBranches } = this.bulkPreview;
      if (newBranches.length === 0 && newStaff.length === 0) { alert(this.t('alert.bulk.nothingToImport')); return; }
      const invalidJobs = newStaff.filter(s => !this.isJobTitleValid(s.jobTitle));
      if (invalidJobs.length > 0) {
        if (!confirm(this.t('confirm.bulk.invalidJobs', '', { count: invalidJobs.length }))) return;
      }
      if (!confirm(this.t('confirm.bulk.final', '', { branches: newBranches.length, staff: newStaff.length }))) return;
      let addedBranches = 0, addedStaff = 0;
      const branchCodeToId = new Map();
      existingBranches.forEach(eb => {
        const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
        this.branches.forEach(b => {
          if (norm(b.code) === norm(eb.code)) {
            branchCodeToId.set(eb.code, b.id);
            branchCodeToId.set(eb.name, b.id);
          }
        });
      });
      newBranches.forEach(nb => {
        const newBranch = { id: this.uid(), name: nb.name || `فرع ${nb.code}`, code: nb.code || `BR-${Date.now()}` };
        this.branches.push(newBranch);
        branchCodeToId.set(nb.code, newBranch.id);
        branchCodeToId.set(nb.name, newBranch.id);
        addedBranches++;
      });
      newStaff.forEach(sr => {
        let targetBranchId = sr.existingBranchId;
        if (!targetBranchId) targetBranchId = branchCodeToId.get(sr.branchCode) || branchCodeToId.get(sr.branchKey);
        if (!targetBranchId) { console.warn('لم يتم العثور على الفرع:', sr.branchName); return; }
        const jobTitle = this.isJobTitleValid(sr.jobTitle) ? sr.jobTitle : 'بائع';
        this.staff.push({ id: this.uid(), name: sr.name, code: sr.code, branchId: targetBranchId, jobTitle });
        addedStaff++;
      });
      this.logActivity(this.t('log.import.bulk'), `${addedBranches} فرع + ${addedStaff} موظف`);
      this.showToast(this.t('toast.bulk.success', '', { branches: addedBranches, staff: addedStaff }), 'success');
      this.bulkPreview = { loaded: false, newBranches: [], existingBranches: [], newStaff: [], duplicateStaff: [], branchNameConflicts: [] };
      this.showBulkImportModal = false;
      this.schedulePersist();
    },

    // ================================================================
    //  ⭐ v22: أنماط Excel الجاهزة
    // ================================================================
    getExcelStyles() {
      return {
        title: {
          font: { bold: true, sz: 18, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
          fill: { fgColor: { rgb: '1E3A5F' } },
          alignment: { horizontal: 'center', vertical: 'center' },
        },
        subtitle: {
          font: { bold: true, sz: 13, color: { rgb: '0B1220' }, name: 'Calibri' },
          fill: { fgColor: { rgb: 'D4A84B' } },
          alignment: { horizontal: 'center', vertical: 'center' },
        },
        header: {
          font: { bold: true, sz: 11, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
          fill: { fgColor: { rgb: '1E3A5F' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'D4A84B' } },
            bottom: { style: 'thin', color: { rgb: 'D4A84B' } },
            left: { style: 'thin', color: { rgb: 'D4A84B' } },
            right: { style: 'thin', color: { rgb: 'D4A84B' } },
          },
        },
        cell: {
          font: { sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'CCCCCC' } },
            bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
            left: { style: 'thin', color: { rgb: 'CCCCCC' } },
            right: { style: 'thin', color: { rgb: 'CCCCCC' } },
          },
        },
        cellRight: {
          font: { sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
          alignment: { horizontal: 'right', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'CCCCCC' } },
            bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
            left: { style: 'thin', color: { rgb: 'CCCCCC' } },
            right: { style: 'thin', color: { rgb: 'CCCCCC' } },
          },
        },
        excellent: {
          font: { bold: true, sz: 11, color: { rgb: '065F46' }, name: 'Calibri' },
          fill: { fgColor: { rgb: 'D1FAE5' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: '10B981' } },
            bottom: { style: 'thin', color: { rgb: '10B981' } },
            left: { style: 'thin', color: { rgb: '10B981' } },
            right: { style: 'thin', color: { rgb: '10B981' } },
          },
        },
        good: {
          font: { bold: true, sz: 11, color: { rgb: '92400E' }, name: 'Calibri' },
          fill: { fgColor: { rgb: 'FEF3C7' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'F59E0B' } },
            bottom: { style: 'thin', color: { rgb: 'F59E0B' } },
            left: { style: 'thin', color: { rgb: 'F59E0B' } },
            right: { style: 'thin', color: { rgb: 'F59E0B' } },
          },
        },
        poor: {
          font: { bold: true, sz: 11, color: { rgb: '991B1B' }, name: 'Calibri' },
          fill: { fgColor: { rgb: 'FEE2E2' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'thin', color: { rgb: 'EF4444' } },
            bottom: { style: 'thin', color: { rgb: 'EF4444' } },
            left: { style: 'thin', color: { rgb: 'EF4444' } },
            right: { style: 'thin', color: { rgb: 'EF4444' } },
          },
        },
        total: {
          font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
          fill: { fgColor: { rgb: '1E3A5F' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: {
            top: { style: 'medium', color: { rgb: 'D4A84B' } },
            bottom: { style: 'medium', color: { rgb: 'D4A84B' } },
            left: { style: 'thin', color: { rgb: 'D4A84B' } },
            right: { style: 'thin', color: { rgb: 'D4A84B' } },
          },
        },
        number: {
          font: { sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
          alignment: { horizontal: 'center', vertical: 'center' },
          numFmt: '#,##0',
          border: {
            top: { style: 'thin', color: { rgb: 'CCCCCC' } },
            bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
            left: { style: 'thin', color: { rgb: 'CCCCCC' } },
            right: { style: 'thin', color: { rgb: 'CCCCCC' } },
          },
        },
      };
    },
    getPctStyle(pct) {
      const styles = this.getExcelStyles();
      if (pct >= 100) return styles.excellent;
      if (pct >= 70) return styles.good;
      return styles.poor;
    },

    // ================================================================
    //  ⭐ v23: تحميل مكتبة xlsx-js-style
    //  الإصلاح: نبحث عن window.XLSX (وليس XLSXStyle)
    // ================================================================
    // ⭐ v23.3: تحميل Lazy — يُستدعى عند أول استخدام فقط
    _xlsxLoadingPromise: null,
    async loadXlsxStyleLib() {
      // ✅ محمّلة مسبقاً؟
      if (window.XLSX && typeof window.XLSX.write === 'function') return true;

      // ✅ جارٍ التحميل بالفعل؟ — ارجع نفس الـ Promise (يمنع التحميل المزدوج)
      if (this._xlsxLoadingPromise) return this._xlsxLoadingPromise;

      this._xlsxLoadingPromise = (async () => {
        // محاولة 1: محلي
        try {
          await this.loadScript('libs/xlsx.bundle.js');
          if (window.XLSX && typeof window.XLSX.write === 'function') {
            console.log('[Excel] ✅ تم تحميل xlsx محلياً');
            return true;
          }
        } catch (e) {
          console.warn('[Excel] فشل التحميل المحلي:', e);
        }

        // محاولة 2: CDN كاحتياطي
        try {
          await this.loadScript('https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js');
          const ok = !!(window.XLSX && typeof window.XLSX.write === 'function');
          if (ok) console.log('[Excel] ✅ تم تحميل xlsx من CDN');
          return ok;
        } catch (e) {
          console.error('[Excel] فشل التحميل من CDN أيضاً:', e);
          return false;
        }
      })();

      const result = await this._xlsxLoadingPromise;
      this._xlsxLoadingPromise = null;
      return result;
    },
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) { setTimeout(resolve, 100); return; }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(script);
      });
    },

    // ⭐ v23.2-FIX: حفظ Excel بموثوقية على الجوال (بديل XLSX.writeFile)
    saveXlsxWorkbook(wb, filename) {
      try {
        const wbout = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob(
          [wbout],
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.rel = 'noopener';
        a.style.position = 'fixed';
        a.style.left = '-9999px';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          try { document.body.removeChild(a); } catch (e) {}
          URL.revokeObjectURL(url);
        }, 2000);
        return true;
      } catch (e) {
        console.error('[Excel] saveXlsxWorkbook failed:', e);
        this.showToast('❌ فشل حفظ الملف: ' + (e.message || e), 'error');
        return false;
      }
    },

    // ═══════════════════════════════════════════════════════════════
    //  ⭐ v23.2: مشاركة بطاقة اليوم كصورة
    // ═══════════════════════════════════════════════════════════════
       async loadHtml2Canvas() {
      // ⭐ v23.3: المكتبة محمّلة محلياً من index.html
      if (window.html2canvas) {
        this._html2canvasLoaded = true;
        return true;
      }
      // احتياطي: حاول التحميل من CDN فقط إذا فشل التحميل المحلي
      console.warn('[Share] html2canvas غير محمّلة محلياً — محاولة CDN كاحتياطي');
      try {
        await this.loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
        return !!window.html2canvas;
      } catch (e) {
        console.error('[Share] فشل تحميل html2canvas:', e);
        return false;
      }
    },

    // ⭐ v23.6.5: استخدام html-to-image بدل html2canvas لدعم العربية
        async generateSummaryImage() {
      const originalEl = this.$refs.dailySummaryCard;
      if (!originalEl) {
        console.warn('[Share] dailySummaryCard ref not found');
        return null;
      }
      if (!window.htmlToImage) {
        console.error('[Share] html-to-image not loaded');
        return null;
      }

      // ⭐ v23.11.7: إنشاء نسخة أفقية (1200px) off-screen
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:fixed;left:-99999px;top:0;pointer-events:none;z-index:-1;opacity:0;';
      const clone = originalEl.cloneNode(true);
      // ⭐ v23.12: صورة عمودية — إزالة is-horizontal + تحديد عرض ثابت
      clone.classList.remove('is-horizontal');
      clone.classList.add('is-export-card');
      clone.style.width = '720px';
      clone.style.maxWidth = '720px';
      clone.removeAttribute('id');
      // إزالة أي inline display:none من الأصل
      clone.style.display = '';
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // انتظر تحميل الخطوط
      if (document.fonts && document.fonts.load) {
        try {
          await Promise.all([
            document.fonts.load('400 14px Cairo'),
            document.fonts.load('600 14px Cairo'),
            document.fonts.load('700 14px Cairo'),
            document.fonts.load('900 14px Cairo'),
            document.fonts.load('400 14px Tajawal'),
            document.fonts.load('700 14px Tajawal'),
          ]);
        } catch (e) {
          console.warn('[Share] Font load warning:', e);
        }
      }
      // انتظر الـ layout الكامل للكلون
      await new Promise(r => setTimeout(r, 400));

      try {
        const dataUrl = await window.htmlToImage.toPng(clone, {
          pixelRatio: 2,
          backgroundColor: this.darkMode ? '#0e1628' : '#ffffff',
          cacheBust: true,
          skipFonts: false,
          filter: (node) => {
            if (node.style && node.style.display === 'none') return false;
            return true;
          },
          style: {
            fontFamily: "'SaudiRiyal', 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
            direction: this.currentLang === 'ar' ? 'rtl' : 'ltr',
          },
        });

        return await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas);
          };
          img.onerror = reject;
          img.src = dataUrl;
        });
      } catch (e) {
        console.error('[Share] html-to-image failed:', e);
        return null;
      } finally {
        // ⭐ تنظيف دائماً
        try { wrapper.remove(); } catch (e) {}
      }
    },
       // ⭐ v23.11.8: توليد الصورة (blob + dataUrl)
    async _getOrCreateImageBlob() {
      if (this._cachedShareBlob && this._cachedShareDataUrl) {
        return {
          blob: this._cachedShareBlob,
          dataUrl: this._cachedShareDataUrl,
        };
      }

      const canvas = await this.generateSummaryImage();
      if (!canvas) return null;

      const blob = await this.canvasToBlob(canvas);
      if (!blob) return null;

      let dataUrl = '';
      try { dataUrl = canvas.toDataURL('image/png'); } catch (e) {}

      this._cachedShareBlob = blob;
      this._cachedShareDataUrl = dataUrl;
      setTimeout(() => {
        this._cachedShareBlob = null;
        this._cachedShareDataUrl = null;
      }, 60000);

      return { blob, dataUrl };
    },

        // ⭐ v23.12-NEW: توليد + تنزيل مباشر (بدون Modal معاينة)
    async generateAndDownload() {
      if (this.shareGenerating) {
        console.log('[Download] already generating');
        return;
      }
      this.shareGenerating = true;
      this.vibrate(15);

      const safetyTimer = setTimeout(() => {
        if (this.shareGenerating) {
          console.warn('[Download] safety timeout');
          this.shareGenerating = false;
          this.showToast('⚠️ استغرق التوليد وقتاً طويلاً', 'warning');
        }
      }, 15000);

      try {
        this.showToast('⏳ جارٍ توليد الصورة...', 'success');
        const result = await this._getOrCreateImageBlob();

        if (!result || !result.blob) {
          this.showToast('❌ فشل توليد الصورة', 'error');
          return;
        }

        const branch = this.selectedBranch;
        const filename = `SAMX_${branch ? branch.code : 'Report'}_${this.selectedDate}.png`;

        // ─── المحاولة 1: File System Access API (Chrome Desktop) ───
        if (window.showSaveFilePicker) {
          try {
            const handle = await window.showSaveFilePicker({
              suggestedName: filename,
              types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
            });
            const writable = await handle.createWritable();
            await writable.write(result.blob);
            await writable.close();
            this.showToast('✅ تم حفظ الصورة', 'success');
            this.vibrate([10, 30, 10]);
            return;
          } catch (e) {
            if (e.name === 'AbortError') return; // المستخدم ألغى
            console.warn('[Download] SaveFilePicker failed, falling back:', e);
          }
        }

        // ─── المحاولة 2: data URL (يعمل جيداً على Android Chrome) ───
        if (result.dataUrl && result.dataUrl.startsWith('data:')) {
          const a = document.createElement('a');
          a.href = result.dataUrl;
          a.download = filename;
          a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { try { document.body.removeChild(a); } catch(e) {} }, 2000);
          this.showToast('✅ تم التنزيل — ابحث في مجلد Downloads', 'success');
          this.vibrate([10, 30, 10]);
          return;
        }

        // ─── المحاولة 3: blob URL (fallback أخير) ───
        const url = URL.createObjectURL(result.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          try { document.body.removeChild(a); } catch(e) {}
          URL.revokeObjectURL(url);
        }, 3000);
        this.showToast('✅ تم التنزيل — ابحث في مجلد Downloads', 'success');
        this.vibrate([10, 30, 10]);

      } catch (e) {
        console.error('[Download] generateAndDownload failed:', e);
        this.showToast('❌ فشل التنزيل: ' + (e.message || ''), 'error');
      } finally {
        clearTimeout(safetyTimer);
        this.shareGenerating = false;
      }
    },

    // ⭐ v23.11.8: مشاركة مباشرة (من داخل Modal المعاينة)
    async shareImageDirect(target = 'native') {
      if (!this.previewImageBlob) {
        this.showToast('⚠️ لا توجد صورة جاهزة', 'warning');
        return;
      }

      const blob = this.previewImageBlob;
      const filename = this.previewImageFilename || 'SAMX.png';
      const file = new File([blob], filename, { type: 'image/png' });
      const shareText = this.buildShareText();

      // ⭐ Web Share API — لا نستخدم canShare هنا
      if (navigator.share) {
        try {
          // تجربة مباشرة (بعض الأجهزة ترفض canShare لكن تقبل share)
          const shareData = { files: [file], title: 'SAMX Report', text: shareText };
          await navigator.share(shareData);
          this.showToast('✅ تمت المشاركة', 'success');
          return;
        } catch (e) {
          if (e.name === 'AbortError') {
            console.log('[Share] user cancelled');
            return;
          }
          console.warn('[Share] share with files failed:', e);

          // محاولة بدون ملفات (نص فقط)
          try {
            await navigator.share({ title: 'SAMX Report', text: shareText });
            this.showToast('✅ تمت مشاركة النص', 'success');
            return;
          } catch (e2) {
            if (e2.name === 'AbortError') return;
            console.warn('[Share] share text failed:', e2);
          }
        }
      }

      // ─ Fallback نهائي: نسخ النص + إرشاد ─
      try { await navigator.clipboard.writeText(shareText); } catch (e) {}
      this.showToast('💡 الصورة أمامك — اضغط مطولاً عليها لحفظها', 'warning');
    },

    // ⭐ v23.11.8: تنزيل مباشر (من داخل Modal المعاينة)
    async downloadSummaryImage() {
      if (!this.previewImageBlob) {
        this.showToast('⚠️ لا توجد صورة جاهزة', 'warning');
        return;
      }

      const blob = this.previewImageBlob;
      const filename = this.previewImageFilename || 'SAMX.png';

      try {
        // المحاولة 1: File System Access API (Chrome Desktop)
        if (window.showSaveFilePicker) {
          try {
            const handle = await window.showSaveFilePicker({
              suggestedName: filename,
              types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            this.showToast('✅ تم حفظ الصورة', 'success');
            this.vibrate([10, 30, 10]);
            return;
          } catch (e) {
            if (e.name === 'AbortError') return;
            console.warn('[Download] SaveFilePicker failed:', e);
          }
        }

        // المحاولة 2: data URL (يعمل على Android Chrome بشكل أفضل)
        if (this.previewImageUrl && this.previewImageUrl.startsWith('data:')) {
          const a = document.createElement('a');
          a.href = this.previewImageUrl;
          a.download = filename;
          a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { try { document.body.removeChild(a); } catch(e) {} }, 2000);
          this.showToast('✅ تم التنزيل — ابحث في مجلد Downloads', 'success');
          this.vibrate([10, 30, 10]);
          return;
        }

        // المحاولة 3: blob URL
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          try { document.body.removeChild(a); } catch(e) {}
          URL.revokeObjectURL(url);
        }, 3000);
        this.showToast('✅ تم التنزيل — ابحث في مجلد Downloads', 'success');
        this.vibrate([10, 30, 10]);
      } catch (e) {
        console.error('[Download] failed:', e);
        this.showToast('❌ فشل التنزيل', 'error');
      }
    },

    // ⭐ v23.11.8: إغلاق Modal المعاينة
    closeImagePreview() {
      this.showImagePreview = false;
      // لا نمسح الـ blob فوراً — قد يحتاجه المستخدم
      setTimeout(() => {
        this.previewImageBlob = null;
        this.previewImageUrl = '';
        this.previewImageFilename = '';
      }, 500);
    },
    canvasToBlob(canvas) {
      return new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/png');
      });
    },
    buildShareText() {
      const branch = this.selectedBranch;
      const d = this.dayData;
      const lines = [];
      lines.push(this.t('share.text.reportTitle', '', { company: this.activeCompanyName }));
      if (branch) lines.push(this.t('share.text.branch', '', { branch: branch.name }));
      lines.push(this.t('share.text.dateLine', '', {
        date: this.selectedDate,
        day: this.dayNameOfSelectedDate,
      }));
      lines.push('');
      lines.push(this.t('share.text.totalSales', '', { amount: this.formatNum(this.branchSales) }));
      lines.push(this.t('share.text.baseTarget', '', {
        amount: this.formatNum(d.baseTarget),
        pct: this.basePct.toFixed(1),
      }));
      lines.push(this.t('share.text.heroesTarget', '', {
        amount: this.formatNum(d.heroesTarget),
        pct: this.heroesPct.toFixed(1),
      }));
      if (this.shareOptions.showInvoices) lines.push(this.t('share.text.invoices', '', { count: this.formatNum(this.branchInvoices) }));
      if (this.shareOptions.showPieces)   lines.push(this.t('share.text.pieces', '', { count: this.formatNum(this.branchPieces) }));
      if (this.shareOptions.showUPT)      lines.push(this.t('share.text.upt', '', { value: this.branchUPT.toFixed(2) }));
      if (this.shareOptions.showATV)      lines.push(this.t('share.text.atv', '', { value: this.formatNum(this.branchATV) }));

      if (this.shareOptions.showNames && this.summaryStaffSorted.length > 0) {
        const sortKey =
          this.shareOptions.sortBy === 'best'       ? 'share.text.sortBy.best' :
          this.shareOptions.sortBy === 'attendance' ? 'share.text.sortBy.attendance' :
                                                      'share.text.sortBy.alphabetical';
        const sortLabel = this.t(sortKey);
        lines.push('');
        lines.push('━━━━━━━━━━━━━━━━━');
        lines.push(this.t('share.text.staffListHeader', '', { sort: sortLabel }));
        this.summaryStaffSorted.forEach((s, i) => {
  const pct = s.pct.toFixed(0);
  const icon = pct >= 100 ? '✅' : pct >= 70 ? '⚠️' : '🚨';
  if (this.shareOptions.mode === 'brief') {
    lines.push(this.t('share.text.staffBrief', '', { n: i + 1, name: s.name, pct, icon }));
  } else if (this.shareOptions.showAbsolute) {
    // ⭐ v23.9-FIX: اختيار المفتاح الصحيح مباشرة بدل replace() الهشّ
    lines.push(this.t('share.text.staffFull', '', {
      n: i + 1, name: s.name,
      sales: this.formatNum(s.sales),
      pct, icon,
    }));
  } else {
    lines.push(this.t('share.text.staffFullNoSales', '', { n: i + 1, name: s.name, pct, icon }));
  }
});
      }

      lines.push('');
      lines.push(this.summarySmartMessage());
      return lines.join('\n');
    },
     
    async shareAsText() {
      const text = this.buildShareText();
      if (!text) {
        this.showToast(this.t('toast.share.noData'), 'warning');
        return;
      }
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.t('toast.share.title', '', {
              branch: this.selectedBranch?.name || this.activeCompanyName,
            }),
            text: text,
          });
          this.showToast(this.t('toast.share.success'), 'success');
          return;
        } catch (e) {
          if (e && e.name === 'AbortError') return;
          console.warn('[Share] navigator.share failed:', e);
        }
      }
      this.fallbackCopy(text);
    },

    async copySummaryText() {
      const text = this.buildShareText();
      if (!text) {
        this.showToast(this.t('toast.share.noDataCopy'), 'warning');
        return;
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          this.showToast(this.t('toast.share.copied'), 'success');
          return;
        }
      } catch (e) {
        console.warn('[Copy] clipboard API failed:', e);
      }
      this.fallbackCopy(text);
    },

    async shareAsImage() {
      if (!this.selectedBranch) {
        this.showToast(this.t('toast.share.noBranch'), 'warning');
        return;
      }
      this.showToast(this.t('toast.share.generating'), 'success');

      const canvas = await this.generateSummaryImage();
      if (!canvas) {
        this.showToast(this.t('toast.share.imageFailed'), 'error');
        return;
      }
      const blob = await this.canvasToBlob(canvas);
      if (!blob) {
        this.showToast(this.t('toast.share.imageCreateFailed'), 'error');
        return;
      }
      const filename = `SAMX_${this.selectedBranch.code}_${this.selectedDate}.png`;
      const file = new File([blob], filename, { type: 'image/png' });
      const shareText = this.buildShareText();

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: this.t('toast.share.title', '', { branch: this.selectedBranch.name }),
            text: shareText,
          });
          this.showToast(this.t('toast.share.success'), 'success');
          return;
        } catch (e) {
          if (e && e.name === 'AbortError') return;
          console.warn('[Share] navigator.share failed:', e);
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.position = 'fixed';
      a.style.left = '-9999px';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try { document.body.removeChild(a); } catch (e) {}
        URL.revokeObjectURL(url);
      }, 2000);
      this.showToast(this.t('toast.share.imageDownloaded'), 'success');
    },
    // ================================================================
    //  ⭐ v21: مشاركة التوقع
    // ================================================================
    shareForecast() {
      const f = this.monthlyForecast;
      if (!f.available) return;
      const branch = this.branches.find(b => b.id === this.monthlyBranchId);
      const branchName = branch ? branch.name : '';
      const text =
        this.t('share.forecast.title') + '\n\n' +
        this.t('share.forecast.branch', '', { branch: branchName }) + '\n' +
        this.t('share.forecast.month', '', { month: this.monthlyMonth }) + '\n\n' +
        this.t('share.forecast.currentSales', '', { amount: this.formatNum(f.totalSales) }) + '\n' +
        this.t('share.forecast.avgDaily', '', { amount: this.formatNum(f.avgDaily) }) + '\n' +
        this.t('share.forecast.daysRemaining', '', { count: f.daysRemaining }) + '\n\n' +
        this.t('share.forecast.expectedSales', '', { amount: this.formatNum(f.forecastSales) }) + '\n' +
        this.t('share.forecast.target', '', { amount: this.formatNum(f.target) }) + '\n' +
        this.t('share.forecast.expectedPct', '', { pct: f.forecastPct.toFixed(1) }) + '\n\n' +
        `${f.statusIcon} ${f.statusLabel}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => this.showToast(this.t('toast.share.forecastCopied'), 'success'))
          .catch(() => this.fallbackCopy(text));
      } else {
        this.fallbackCopy(text);
      }
    },
    fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.showToast(this.t('toast.share.copied'), 'success');
      } catch (e) {
        alert(this.t('toast.share.notCopied', '', { text }));
      }
      document.body.removeChild(textarea);
    },
      // ================================================================
    //  Charts
    // ================================================================
    // ⭐ v23.3: قراءة ألوان الثيم الحالية للاستخدام في Chart.js
    getChartThemeColors() {
      const styles = getComputedStyle(document.documentElement);
      const primary = styles.getPropertyValue('--theme-primary').trim() || '#d4a84b';
      const secondary = styles.getPropertyValue('--theme-secondary').trim() || '#e6c074';
      const isLight = !this.darkMode;
      return {
        primary,
        secondary,
        textColor: isLight ? '#0f172a' : '#cbd5e1',
        gridColor: isLight ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.06)',
        targetColor: isLight ? '#1d4ed8' : '#3b82f6',
        heroesColor: isLight ? '#b45309' : '#f59e0b',
        primaryAlpha: (a) => {
          // تحويل primary إلى rgba
          const hex = primary.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          return `rgba(${r},${g},${b},${a})`;
        },
      };
    },

    refreshCharts() {
      nextTick(() => {
        if (this.currentView === 'dashboard' || this.currentView === 'kpi') this.renderStaffChart();
        else this.safeDestroyChart('staffChartInstance');

        if (this.currentView === 'analytics') this.renderTrendChart();
        else this.safeDestroyChart('trendChartInstance');

        if (this.currentView === 'monthly') this.renderMonthlyChart();
        else this.safeDestroyChart('monthlyChartInstance');

        if (this.currentView === 'yoy') this.renderYoYChart();
        else this.safeDestroyChart('yoyChartInstance');
      });
    },

    renderStaffChart() {
      try {
        const canvas = this.$refs.staffChart;
        if (!canvas || !document.body.contains(canvas)) {
          return;
        }

        const presentStaff = (this.staffRowsComputed || []).filter(s => s.present);
        if (presentStaff.length === 0) {
          console.log('[Chart] لا موظفون حاضرون — تخطي');
          return;
        }

        const sorted = [...presentStaff].sort((a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0));
        const names = sorted.map(s => s.name);
        const sales = sorted.map(s => Number(s.sales) || 0);
        const pcts  = sorted.map(s => Number(s.pct) || 0);

        const colors = pcts.map(p =>
          p >= 100 ? 'rgba(16,185,129,0.85)' :
          p >= 70  ? 'rgba(245,158,11,0.85)' :
                     'rgba(244,63,94,0.85)'
        );
        const borders = pcts.map(p =>
          p >= 100 ? '#10b981' :
          p >= 70  ? '#f59e0b' :
                     '#ef4444'
        );

        const type = this.staffChartType || 'bar';
        const isBar = type === 'bar';
        const t = this.getChartThemeColors();

        if (canvas.parentElement && isBar) {
          canvas.parentElement.style.height = Math.max(200, sorted.length * 45 + 80) + 'px';
        }

        if (this.staffChartInstance && this.staffChartInstance.canvas === canvas && document.body.contains(canvas)) {
          this.staffChartInstance.data.labels = names;
          this.staffChartInstance.data.datasets[0].data = sales;
          this.staffChartInstance.data.datasets[0].backgroundColor = colors;
          this.staffChartInstance.data.datasets[0].borderColor = borders;
          this.staffChartInstance.$sorted = sorted;
          this.staffChartInstance.$pcts = pcts;
          try {
            this.staffChartInstance.update('none');
            console.log('[Chart] 🔄 staffChart updated with ' + sorted.length + ' staff');
            return;
          } catch (e) {
            console.warn('[Chart] update failed, recreating:', e);
            this.safeDestroyChart('staffChartInstance');
          }
        } else if (this.staffChartInstance) {
          this.safeDestroyChart('staffChartInstance');
        }

        const chart = new Chart(canvas, {
          type: type,
          data: {
            labels: names,
            datasets: [{
              label: 'المبيعات',
              data: sales,
              backgroundColor: colors,
              borderColor: borders,
              borderWidth: isBar ? 1.5 : 3,
              borderRadius: isBar ? 6 : 0,
            }],
          },
          options: {
            indexAxis: isBar ? 'y' : 'x',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 250 },
            plugins: {
              legend: {
                display: !isBar,
                position: 'bottom',
                labels: { color: t.textColor, font: { family: 'Cairo', size: 11 } },
              },
              tooltip: {
                callbacks: {
                  title: (items) => {
                    if (!items.length) return '';
                    const s = chart.$sorted?.[items[0].dataIndex];
                    return s ? s.name : '';
                  },
                  label: (ctx) => {
                    const i = ctx.dataIndex;
                    const s = chart.$sorted?.[i];
                    const p = chart.$pcts?.[i] || 0;
                    return [
                      ' 💰 ' + this.formatNum(s?.sales || 0),
                      ' 🎯 ' + this.formatNum(s?.target || 0),
                      ' 📊 ' + p.toFixed(1) + '%',
                    ];
                  },
                },
              },
            },
            scales: isBar ? {
              x: { beginAtZero: true, ticks: { color: t.textColor }, grid: { color: 'rgba(255,255,255,0.05)' } },
              y: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 11 } }, grid: { display: false } },
            } : {
              x: { display: false },
              y: { display: false },
            },
          },
        });
        chart.$sorted = sorted;
        chart.$pcts = pcts;
        this.staffChartInstance = typeof markRaw === 'function' ? markRaw(chart) : chart;

        console.log('[Chart] ✅ staffChart (' + type + ') with ' + sorted.length + ' staff');

        if (window.ResizeObserver && canvas.parentElement) {
          if (this._staffResizeObserver) {
            try { this._staffResizeObserver.disconnect(); } catch(e) {}
          }
          this._staffResizeObserver = new ResizeObserver(() => {
            if (this.staffChartInstance && this.staffChartInstance.canvas && document.body.contains(this.staffChartInstance.canvas)) {
              try { this.staffChartInstance.resize(); } catch(e) {}
            }
          });
          this._staffResizeObserver.observe(canvas.parentElement);
        }
      } catch (e) {
        console.error('[Chart] renderStaffChart failed:', e);
      }
    },

    renderTrendChart() {
      try {
        const canvas = this.$refs.trendChart;
        if (!canvas || !this.analyticsBranchId || !document.body.contains(canvas)) {
          this.safeDestroyChart('trendChartInstance');
          return;
        }
        this.safeDestroyChart('trendChartInstance');
        const t = this.getChartThemeColors();
        const series = this.analyticsSeries || [];
        const totalSales = (this.analyticsSummary && this.analyticsSummary.totalSales) || 0;
        const totalTarget = this.analyticsTotalTarget || 0;
        const salesLabel = this.currentLang === 'ar'
          ? `المبيعات: ${this.formatNum(totalSales)} ${this.currencySymbol}`
          : `Sales: ${this.formatNum(totalSales)} ${this.currencySymbol}`;
        const targetLabel = this.currentLang === 'ar'
          ? `التارجت: ${this.formatNum(totalTarget)} ${this.currencySymbol}`
          : `Target: ${this.formatNum(totalTarget)} ${this.currencySymbol}`;
        const chart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: series.map(x => x.date.slice(5)),
            datasets: [
              { label: salesLabel, data: series.map(x => x.sales), borderColor: t.primary, backgroundColor: t.primaryAlpha(0.15), fill: true, tension: .35, borderWidth: 2 },
              { label: targetLabel, data: series.map(x => x.target), borderColor: t.targetColor, borderDash: [6, 4], borderWidth: 2 },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: t.textColor, font: { family: 'Cairo' } } } },
            scales: {
              x: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
              y: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
            },
          },
        });
        this.trendChartInstance = typeof markRaw === 'function' ? markRaw(chart) : chart;
      } catch (e) {
        console.error('[Chart] renderTrendChart failed:', e);
      }
    },

    renderMonthlyChart() {
      try {
        const canvas = this.$refs.monthlyChart;
        if (!canvas || !this.monthlyBranchId || !document.body.contains(canvas)) {
          this.safeDestroyChart('monthlyChartInstance');
          return;
        }
        this.safeDestroyChart('monthlyChartInstance');
        const t = this.getChartThemeColors();
        const days = this.monthlyDays || [];
        let cumBase = 0, cumHeroes = 0;
        const baseLine = days.map(d => { cumBase += (d.baseTarget || 0); return cumBase; });
        const heroesLine = days.map(d => { cumHeroes += (d.heroesTarget || 0); return cumHeroes; });
        const chart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: days.map(d => d.date.slice(8)),
            datasets: [
              { label: 'المبيعات', data: days.map(d => d.cumulative), borderColor: t.primary, backgroundColor: t.primaryAlpha(0.15), fill: true, tension: .35, borderWidth: 2 },
              { label: '🎯 أساسي', data: baseLine, borderColor: t.targetColor, borderDash: [6, 4], borderWidth: 2 },
              { label: '🏆 أبطال', data: heroesLine, borderColor: t.heroesColor, borderDash: [3, 3], borderWidth: 2 },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: t.textColor, font: { family: 'Cairo' } } } },
            scales: {
              x: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
              y: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
            },
          },
        });
        this.monthlyChartInstance = typeof markRaw === 'function' ? markRaw(chart) : chart;
      } catch (e) {
        console.error('[Chart] renderMonthlyChart failed:', e);
      }
    },

    renderYoYChart() {
      try {
        const canvas = this.$refs.yoyChart || document.getElementById('yoyChart');
        if (!canvas || !this.yoyBranchId || !document.body.contains(canvas)) {
          this.safeDestroyChart('yoyChartInstance');
          return;
        }
        this.safeDestroyChart('yoyChartInstance');

        const t = this.getChartThemeColors();
        const arr = this.yoyMonthlyComparison || [];

        const chart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: arr.map(r => r.monthName),
            datasets: [
              { label: `${this.yoyYear}`, data: arr.map(r => r.current), backgroundColor: t.primary, borderRadius: 6 },
              { label: `${this.yoyYear - 1}`, data: arr.map(r => r.previous), backgroundColor: t.targetColor, borderRadius: 6 },
            ],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { color: t.textColor, font: { family: 'Cairo' } } } },
            scales: {
              x: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
              y: { ticks: { color: t.textColor, font: { family: 'Cairo', size: 10 } }, grid: { color: t.gridColor } },
            },
          },
        });
        this.yoyChartInstance = typeof markRaw === 'function' ? markRaw(chart) : chart;
        console.log('[Chart] ✅ YoY chart created');
      } catch (e) {
        console.error('[Chart] renderYoYChart failed:', e);
      }
    },
    getMonthSales(year, month, branchId) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const staffIds = this.staff.filter(s => s.branchId === branchId).map(s => s.id);
      let total = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const d = this.daily[`${dateStr}|${branchId}`] || {};
        total += staffIds.reduce((s, id) => s + (Number(d.staffData?.[id]?.sales) || 0), 0) + (Number(d.manualExtra) || 0);
      }
      return total;
    },

    // ================================================================
    //  PDF Exports
    // ================================================================
    async setupArabicPDF() {
      const fontB64 = await loadArabicFont();
      if (!fontB64) return null;
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      doc.addFileToVFS('Amiri-Regular.ttf', fontB64);
      doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
      doc.setFont('Amiri');
      return doc;
    },
    // ⭐ v23: يستخدم الشعار النشط (المخصص)
    async addLogoToPDF(doc) {
      const logo = await getLogoDataURL(this.activeLogo);
      if (logo) { try { doc.addImage(logo, 'PNG', 105 - 25, 8, 50, 15); } catch (e) {} }
    },
    async exportDailyPDF() {
      if (!this.selectedBranch) return;
      this.showToast(this.t('toast.pdf.preparing'), 'success');
      const doc = await this.setupArabicPDF();
      if (!doc) { this.exportDailyCSV(); return; }
      await this.addLogoToPDF(doc);
      doc.setFontSize(16);
      doc.text(this.t('pdf.daily.title', '', { company: this.activeCompanyName }), 105, 32, { align: 'center' });
      doc.setFontSize(11);
      doc.text(this.t('pdf.daily.branch', '', { name: this.selectedBranch.name, code: this.selectedBranch.code }), 105, 40, { align: 'center' });
      doc.text(this.t('pdf.daily.date', '', { date: this.selectedDate, day: this.dayNameOfSelectedDate }), 105, 46, { align: 'center' });
      let y = 58;
      doc.setFontSize(10);
      const kpis = [
        [this.t('report.kpi.totalSales'), this.formatNum(this.branchSales)],
        [this.t('report.kpi.baseTarget'), this.formatNum(this.dayData.baseTarget || 0) + ' (' + this.basePct.toFixed(1) + '%)'],
        [this.t('report.kpi.heroesTarget'), this.formatNum(this.dayData.heroesTarget || 0) + ' (' + this.heroesPct.toFixed(1) + '%)'],
        [this.t('report.kpi.invoices'), this.formatNum(this.branchInvoices)],
        [this.t('report.kpi.pieces'), this.formatNum(this.branchPieces)],
        [this.t('report.kpi.upt'), this.branchUPT.toFixed(2)],
        [this.t('report.kpi.atv'), this.formatNum(this.branchATV)],
        [this.t('report.kpi.attendance'), this.presentCount + ' / ' + this.branchStaff.length],
      ];
      kpis.forEach(([k, v]) => { doc.text(`${k}: ${v}`, 190, y, { align: 'right' }); y += 6; });
      const rows = this.staffRowsComputed.map(s => [s.name, s.jobTitle || '-', s.present ? this.t('report.present') : this.t('report.absent'),
        this.formatNum(s.target), this.formatNum(s.heroesTarget), this.formatNum(s.sales),
        s.pct.toFixed(0) + '%', s.heroesPct.toFixed(0) + '%']);
      doc.autoTable({
        startY: y + 3,
        head: [[this.t('report.col.employee'), this.t('report.col.jobTitle'), this.t('report.col.attendance'), this.t('report.col.target'), this.t('report.col.heroesTarget'), this.t('report.col.sales'), this.t('report.col.basePct'), this.t('report.col.heroesPct')]],
        body: rows, theme: 'grid',
        styles: { font: 'Amiri', fontSize: 8, halign: 'right', cellPadding: 1.5 },
        headStyles: { fillColor: [30, 58, 95], textColor: [230, 192, 116], font: 'Amiri' },
        rtl: true,
      });
      doc.save(`${this.activeCompanyName}_${this.selectedBranch.code}_${this.selectedDate}.pdf`);
      this.showToast(this.t('toast.pdf.exported'), 'success');
    },
    async exportMonthlyPDF() {
      if (!this.monthlyBranchId) return;
      const b = this.branches.find(x => x.id === this.monthlyBranchId);
      this.showToast(this.t('toast.pdf.preparing'), 'success');
      const doc = await this.setupArabicPDF();
      if (!doc) return;
      await this.addLogoToPDF(doc);
      doc.setFontSize(16);
      doc.text(this.t('pdf.monthly.title', '', { company: this.activeCompanyName }), 105, 32, { align: 'center' });
      doc.setFontSize(11);
      doc.text(this.t('pdf.monthly.branchMonth', '', { name: b.name, month: this.monthlyMonth }), 105, 40, { align: 'center' });
      const s = this.monthlySummary;
      let y = 52;
      doc.setFontSize(10);
      const kpis = [
        [this.t('report.kpi.baseTarget'), this.formatNum(this.monthlyBaseTarget)],
        [this.t('report.kpi.heroesTarget'), this.formatNum(this.monthlyHeroesTarget)],
        [this.t('report.kpi.totalSales'), this.formatNum(s.totalSales)],
        [this.t('report.col.basePct'), s.basePct.toFixed(1) + '%'],
        [this.t('report.col.heroesPct'), s.heroesPct.toFixed(1) + '%'],
      ];
      kpis.forEach(([k, v]) => { doc.text(`${k}: ${v}`, 190, y, { align: 'right' }); y += 6; });
      const rows = this.monthlyDays.map(d => [d.date.slice(5), d.dayName, this.formatNum(d.sales),
        this.formatNum(d.baseTarget), this.formatNum(d.heroesTarget),
        d.basePct.toFixed(0) + '%', d.heroesPct.toFixed(0) + '%', this.formatNum(d.cumulative)]);
      doc.autoTable({
        startY: y + 3,
        head: [[this.t('report.col.date'), this.t('report.col.day'), this.t('report.col.sales'), this.t('report.col.base'), this.t('report.col.heroes'), this.t('report.col.basePctShort'), this.t('report.col.heroesPctShort'), this.t('report.col.cumulative')]],
        body: rows, theme: 'grid',
        styles: { font: 'Amiri', fontSize: 8, halign: 'right', cellPadding: 1.2 },
        headStyles: { fillColor: [30, 58, 95], textColor: [230, 192, 116], font: 'Amiri' },
        rtl: true,
      });
      doc.save(`${this.activeCompanyName}_Monthly_${b.code}_${this.monthlyMonth}.pdf`);
      this.showToast(this.t('toast.pdf.exported'), 'success');
    },
    // ================================================================
    //  ⭐ v22/v23: تصدير Excel احترافي - التقرير اليومي
    //  الإصلاح: استخدام window.XLSX (بدل XLSXStyle)
    // ================================================================
    async exportDailyExcel() {
      if (!this.selectedBranch) return;
      this.showToast(this.t('toast.excel.preparing'), 'success');
      const loaded = await this.loadXlsxStyleLib();
      if (!loaded) {
        this.showToast(this.t('toast.excel.libFailed'), 'warning');
        this.exportDailyCSV();
        return;
      }
      try {
        const XLSX = window.XLSX;
        const styles = this.getExcelStyles();
        const branch = this.selectedBranch;
        const dayName = this.dayNameOfSelectedDate;

        const wsData = [];
        const merges = [];
        const rowHeights = [];

        wsData.push(['']);
        rowHeights.push({ hpt: 8 });

        wsData.push(['', '', this.t('excel.daily.title', '', { branch: branch.name }), '', '', '', '', '']);
        merges.push({ s: { r: 1, c: 2 }, e: { r: 1, c: 5 } });
        rowHeights.push({ hpt: 32 });

        wsData.push(['', '', `${this.t('excel.code')}: ${branch.code}`, `${this.t('excel.date')}: ${this.selectedDate}`, `${this.t('excel.day')}: ${dayName}`, '', '', '']);
        merges.push({ s: { r: 2, c: 2 }, e: { r: 2, c: 3 } });
        merges.push({ s: { r: 2, c: 4 }, e: { r: 2, c: 5 } });
        rowHeights.push({ hpt: 24 });

        wsData.push(['']);
        rowHeights.push({ hpt: 8 });

        wsData.push(['', this.t('excel.daily.kpi.totalSales'), this.branchSales, '', this.t('excel.daily.kpi.baseTarget'), this.dayData.baseTarget || 0, this.basePct / 100, '']);
        wsData.push(['', this.t('excel.daily.kpi.heroesTarget'), this.dayData.heroesTarget || 0, '', this.t('excel.daily.kpi.heroesPct'), this.heroesPct / 100, '', '']);
        wsData.push(['', this.t('excel.daily.kpi.invoices'), this.branchInvoices, '', this.t('excel.daily.kpi.pieces'), this.branchPieces, '', '']);
        wsData.push(['', this.t('excel.daily.kpi.upt'), this.branchUPT, '', this.t('excel.daily.kpi.atv'), this.branchATV, '', '']);
        wsData.push(['', this.t('excel.daily.kpi.attendance'), `${this.presentCount} / ${this.branchStaff.length}`, '', '', '', '', '']);
        rowHeights.push({ hpt: 22 }, { hpt: 22 }, { hpt: 22 }, { hpt: 22 }, { hpt: 22 });

        wsData.push(['']);
        rowHeights.push({ hpt: 12 });

        const headerRowIdx = wsData.length;
        wsData.push([this.t('excel.daily.col.num'), this.t('excel.daily.col.employee'), this.t('excel.daily.col.jobTitle'), this.t('excel.daily.col.attendance'), this.t('excel.daily.col.target'), this.t('excel.daily.col.heroesTarget'), this.t('excel.daily.col.sales'), this.t('excel.daily.col.basePct'), this.t('excel.daily.col.heroesPct')]);
        rowHeights.push({ hpt: 28 });

        let totalTarget = 0, totalHeroes = 0, totalSales = 0, presentCount = 0;
        this.staffRowsComputed.forEach((s, idx) => {
          if (s.present) { totalTarget += s.target; totalHeroes += s.heroesTarget; totalSales += s.sales; presentCount++; }
          wsData.push([idx + 1, s.name, s.jobTitle || '-', s.present ? this.t('excel.daily.row.present') : this.t('excel.daily.row.absent'),
            s.target || 0, s.heroesTarget || 0, s.sales || 0, s.pct / 100, s.heroesPct / 100]);
          rowHeights.push({ hpt: 20 });
        });

        const totalRowIdx = wsData.length;
        wsData.push(['', this.t('excel.daily.col.total'), this.t('excel.daily.col.presentCount', '', { count: presentCount }), '',
          totalTarget, totalHeroes, totalSales,
          totalTarget > 0 ? totalSales / totalTarget : 0,
          totalHeroes > 0 ? totalSales / totalHeroes : 0]);
        rowHeights.push({ hpt: 26 });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        ws['!merges'] = merges;
        ws['!cols'] = [
          { wch: 5 }, { wch: 22 }, { wch: 18 }, { wch: 10 },
          { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 },
        ];
        ws['!rows'] = rowHeights;

        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; R++) {
          for (let C = range.s.c; C <= range.e.c; C++) {
            const cellAddr = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[cellAddr]) ws[cellAddr] = { v: '', t: 's' };

            if (R === 1 && C >= 2 && C <= 5) {
              ws[cellAddr].s = styles.title;
            } else if (R === 2 && C >= 2 && C <= 5) {
              ws[cellAddr].s = {
                font: { sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { fgColor: { rgb: 'F3F4F6' } },
              };
                        } else if (R >= 4 && R <= 8) {
              ws[cellAddr].s = {
                font: { bold: true, sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { fgColor: { rgb: R % 2 === 0 ? 'FEF9E7' : 'FFFFFF' } },
                border: {
                  top: { style: 'thin', color: { rgb: 'D4A84B' } },
                  bottom: { style: 'thin', color: { rgb: 'D4A84B' } },
                  left: { style: 'thin', color: { rgb: 'D4A84B' } },
                  right: { style: 'thin', color: { rgb: 'D4A84B' } },
                },
              };
              // ⭐ v23.12-FIX: تنسيق رقمي حسب نوع البيانات في كل صف
              if (R === 4) {
                // صف 5: مبيعات(⃁) + تارجت أساسي(⃁) + نسبة(%)
                if (C === 2 || C === 5) ws[cellAddr].z = '#,##0 "⃁"';
                else if (C === 6) ws[cellAddr].z = '0.0%';
              } else if (R === 5) {
                // صف 6: تارجت أبطال(⃁) + نسبة أبطال(%)
                if (C === 2) ws[cellAddr].z = '#,##0 "⃁"';
                else if (C === 5) ws[cellAddr].z = '0.0%';
              } else if (R === 6) {
                // صف 7: فواتير(عدد) + قطع(عدد)
                if (C === 2 || C === 5) ws[cellAddr].z = '#,##0';
              } else if (R === 7) {
                // صف 8: UPT(عشري) + ATV(⃁)
                if (C === 2) ws[cellAddr].z = '0.00';
                else if (C === 5) ws[cellAddr].z = '#,##0 "⃁"';
              }
              // R === 8 (الحضور) — نص، لا تنسيق
            } else if (R === headerRowIdx) {
            } else if (R === headerRowIdx) {
              ws[cellAddr].s = styles.header;
            } else if (R > headerRowIdx && R < totalRowIdx) {
              const col = C;
              if (col === 7 || col === 8) {
                const pct = (ws[cellAddr].v || 0) * 100;
                ws[cellAddr].s = this.getPctStyle(pct);
                ws[cellAddr].z = '0.0%';
              } else if (col === 4 || col === 5 || col === 6) {
                ws[cellAddr].s = styles.number;
                // ⭐ v23.12: رمز الريال لخلايا المبيعات والتارجت
                ws[cellAddr].z = '#,##0 "⃁"';
              } else {
                ws[cellAddr].s = col === 1 || col === 2 ? styles.cellRight : styles.cell;
              }
            } else if (R === totalRowIdx) {
              ws[cellAddr].s = styles.total;
              if (C === 7 || C === 8) ws[cellAddr].z = '0.0%';
              else if (C >= 4 && C <= 6) ws[cellAddr].z = '#,##0 "⃁"';
            }
           }
          }

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.t('excel.daily.sheetName'));
        this.saveXlsxWorkbook(wb, `${this.activeCompanyName}_${branch.code}_${this.selectedDate}.xlsx`);
        this.showToast(this.t('toast.excel.exported'), 'success');
        this.logActivity(this.t('log.excel.daily'), `${branch.name}`);
      } catch (e) {
        console.error('[Excel] Daily export failed:', e);
        this.showToast(this.t('toast.excel.failed'), 'error');
      }
    },

    exportDailyCSV() {
      if (!this.selectedBranch) return;
      const b = this.selectedBranch;
      const lines = [this.t('csv.daily.title', '', { branch: b.name, date: this.selectedDate }), ''];
      lines.push([this.t('report.col.employee'), this.t('report.col.jobTitle'), this.t('report.col.attendance'), this.t('report.col.target'), this.t('report.col.heroesTarget'), this.t('report.col.sales'), this.t('report.col.basePct'), this.t('report.col.heroesPct')].join(','));
      this.staffRowsComputed.forEach(s => lines.push([
        s.name, s.jobTitle || '-', s.present ? this.t('report.present') : this.t('report.absent'),
        s.target || 0, s.heroesTarget || 0, s.sales || 0,
        s.pct.toFixed(0) + '%', s.heroesPct.toFixed(0) + '%',
      ].join(',')));
      lines.push('');
      lines.push(`${this.t('csv.totalSalesLine')},${this.branchSales}`);
      lines.push(`${this.t('csv.baseLine')},${this.dayData.baseTarget}`);
      lines.push(`${this.t('csv.heroesLine')},${this.dayData.heroesTarget}`);
      lines.push(`${this.t('csv.basePctLine')},${this.basePct.toFixed(1)}%`);
      lines.push(`${this.t('csv.heroesPctLine')},${this.heroesPct.toFixed(1)}%`);
      lines.push(`${this.t('csv.invoicesLine')},${this.branchInvoices}`);
      lines.push(`${this.t('csv.piecesLine')},${this.branchPieces}`);
      lines.push(`${this.t('csv.uptLine')},${this.branchUPT.toFixed(2)}`);
      lines.push(`${this.t('csv.atvLine')},${this.branchATV.toFixed(2)}`);
      const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.activeCompanyName}_${b.code}_${this.selectedDate}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.csv.exported'), 'success');
    },
    // ================================================================
    //  ⭐ v22/v23: تصدير Excel احترافي - التقرير الشهري
    // ================================================================
    async exportMonthlyExcel() {
      if (!this.monthlyBranchId) return;
      this.showToast(this.t('toast.excel.preparingMulti'), 'success');
      const loaded = await this.loadXlsxStyleLib();
      if (!loaded) {
        this.showToast(this.t('toast.excel.libFailed'), 'warning');
        this.exportMonthlyCSV();
        return;
      }
      try {
        const XLSX = window.XLSX;
        const styles = this.getExcelStyles();
        const branch = this.branches.find(x => x.id === this.monthlyBranchId);
        const month = this.monthlyMonth;
        const wb = XLSX.utils.book_new();

        // الشيت 1: ملخص
        const summaryData = [];
        const summaryMerges = [];
        summaryData.push(['']);
        summaryData.push(['', '', this.t('excel.monthly.title', '', { month, branch: branch.name }), '', '', '']);
        summaryMerges.push({ s: { r: 1, c: 2 }, e: { r: 1, c: 4 } });
        summaryData.push(['']);
        summaryData.push(['', this.t('excel.monthly.kpi.totalSales'), this.monthlySummary.totalSales, '', '', '']);
        summaryData.push(['', this.t('excel.monthly.kpi.baseTarget'), this.monthlyBaseTarget, '', '', '']);
        summaryData.push(['', this.t('excel.monthly.kpi.heroesTarget'), this.monthlyHeroesTarget, '', '', '']);
        summaryData.push(['', this.t('excel.monthly.kpi.basePct'), this.monthlySummary.basePct / 100, '', '', '']);
        summaryData.push(['', this.t('excel.monthly.kpi.heroesPct'), this.monthlySummary.heroesPct / 100, '', '', '']);
        summaryData.push(['', this.t('excel.monthly.kpi.daysEntered'), `${this.monthlyDaysWithSales} / ${this.monthlyDays.length}`, '', '', '']);
        const f = this.monthlyForecast;
        if (f.available) {
          summaryData.push(['']);
          summaryData.push(['', this.t('excel.monthly.forecast.title'), '', '', '', '']);
          summaryData.push(['', this.t('excel.monthly.forecast.expected'), f.forecastSales, '', '', '']);
          summaryData.push(['', this.t('excel.monthly.forecast.expectedPct'), f.forecastPct / 100, '', '', '']);
          summaryData.push(['', this.t('excel.monthly.forecast.requiredDaily'), f.requiredDaily, '', '', '']);
        }
        const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
        wsSummary['!merges'] = summaryMerges;
        wsSummary['!cols'] = [{ wch: 5 }, { wch: 30 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 12 }];

        const summaryRange = XLSX.utils.decode_range(wsSummary['!ref']);
        for (let R = 0; R <= summaryRange.e.r; R++) {
          for (let C = 0; C <= summaryRange.e.c; C++) {
            const addr = XLSX.utils.encode_cell({ r: R, c: C });
            if (!wsSummary[addr]) wsSummary[addr] = { v: '', t: 's' };
            if (R === 1 && C >= 2 && C <= 4) {
              wsSummary[addr].s = styles.title;
            } else if (R === 3 || R === 8) {
              if (C === 1) {
                wsSummary[addr].s = {
                  font: { bold: true, sz: 13, color: { rgb: 'FFFFFF' }, name: 'Calibri' },
                  fill: { fgColor: { rgb: 'D4A84B' } },
                  alignment: { horizontal: 'right', vertical: 'center' },
                };
              } else if (C === 2) {
                wsSummary[addr].s = {
                  font: { bold: true, sz: 16, color: { rgb: '0B1220' }, name: 'Calibri' },
                  fill: { fgColor: { rgb: 'FEF3C7' } },
                  alignment: { horizontal: 'center', vertical: 'center' },
                  numFmt: '#,##0',
                };
              }
            } else if (R > 1 && R < summaryData.length) {
              if (C === 1) {
                wsSummary[addr].s = {
                  font: { bold: true, sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
                  alignment: { horizontal: 'right', vertical: 'center' },
                  fill: { fgColor: { rgb: 'F9FAFB' } },
                };
              } else if (C === 2) {
                wsSummary[addr].s = {
                  font: { sz: 12, color: { rgb: '1E3A5F' }, name: 'Calibri', bold: true },
                  alignment: { horizontal: 'center', vertical: 'center' },
                  numFmt: '#,##0.00',
                };
              }
            }
          }
        }
        XLSX.utils.book_append_sheet(wb, wsSummary, this.t('excel.monthly.summarySheet'));
        // الشيت 2: تفصيل يوم بيوم
        const daysData = [];
        daysData.push(['']);
        daysData.push(['', this.t('excel.monthly.days.title'), '', '', '', '', '', '']);
        daysData.push(['']);
        daysData.push([this.t('excel.monthly.days.col.date'), this.t('excel.monthly.days.col.day'), this.t('excel.monthly.days.col.baseTarget'), this.t('excel.monthly.days.col.heroesTarget'), this.t('excel.monthly.days.col.sales'), this.t('excel.monthly.days.col.basePct'), this.t('excel.monthly.days.col.heroesPct'), this.t('excel.monthly.days.col.cumulative')]);
        let cumulative = 0;
        this.monthlyDays.forEach(d => {
          cumulative += d.sales;
          daysData.push([d.date, d.dayName, d.baseTarget || 0, d.heroesTarget || 0, d.sales || 0,
            d.baseTarget > 0 ? d.sales / d.baseTarget : 0,
            d.heroesTarget > 0 ? d.sales / d.heroesTarget : 0, cumulative]);
        });
        const wsDays = XLSX.utils.aoa_to_sheet(daysData);
        wsDays['!cols'] = [
          { wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 14 },
          { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 14 },
        ];
        wsDays['!merges'] = [{ s: { r: 1, c: 1 }, e: { r: 1, c: 6 } }];

        const daysRange = XLSX.utils.decode_range(wsDays['!ref']);
        for (let R = 0; R <= daysRange.e.r; R++) {
          for (let C = 0; C <= daysRange.e.c; C++) {
            const addr = XLSX.utils.encode_cell({ r: R, c: C });
            if (!wsDays[addr]) wsDays[addr] = { v: '', t: 's' };
            if (R === 1) wsDays[addr].s = styles.subtitle;
            else if (R === 3) wsDays[addr].s = styles.header;
            else if (R > 3) {
              if (C === 5 || C === 6) {
                const pct = (wsDays[addr].v || 0) * 100;
                wsDays[addr].s = this.getPctStyle(pct);
                wsDays[addr].z = '0.0%';
              } else if (C === 2 || C === 3 || C === 4 || C === 7) wsDays[addr].s = styles.number;
              else wsDays[addr].s = styles.cell;
            }
          }
        }

        XLSX.utils.book_append_sheet(wb, wsDays, this.t('excel.monthly.daysSheet'));

        this.saveXlsxWorkbook(wb, `${this.activeCompanyName}_Monthly_${branch.code}_${month}.xlsx`);
        this.showToast(this.t('toast.excel.exportedSheets', '', { count: wb.SheetNames.length }), 'success');
        this.logActivity(this.t('log.excel.monthly'), `${branch.name} - ${month}`);
      } catch (e) {
        console.error('[Excel] Monthly export failed:', e);
        this.showToast(this.t('toast.excel.failed'), 'error');
      }
    },
    exportMonthlyCSV() {
      if (!this.monthlyBranchId) return;
      const b = this.branches.find(x => x.id === this.monthlyBranchId);
      const lines = [this.t('csv.monthly.title', '', { branch: b.name, month: this.monthlyMonth }), ''];
      lines.push(`${this.t('report.kpi.baseTarget')},${this.monthlyBaseTarget}`);
      lines.push(`${this.t('report.kpi.heroesTarget')},${this.monthlyHeroesTarget}`);
      lines.push(`${this.t('report.kpi.totalSales')},${this.monthlySummary.totalSales}`, '');
      lines.push([this.t('report.col.date'), this.t('report.col.day'), this.t('report.col.sales'), this.t('report.col.base'), this.t('report.col.heroes'), this.t('report.col.basePct'), this.t('report.col.heroesPct'), this.t('report.col.cumulative')].join(','));
      this.monthlyDays.forEach(d => lines.push([
        d.date, d.dayName, d.sales, d.baseTarget, d.heroesTarget,
        d.basePct.toFixed(0) + '%', d.heroesPct.toFixed(0) + '%', d.cumulative,
      ].join(',')));
      const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.activeCompanyName}_Monthly_${b.code}_${this.monthlyMonth}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.csv.exported'), 'success');
    },
    // ================================================================
    //  ⭐ v22/v23: تصدير ترتيب الفروع Excel
    // ================================================================
    async exportLeaderboardExcel() {
      this.showToast(this.t('toast.excel.preparing'), 'success');
      const loaded = await this.loadXlsxStyleLib();
      if (!loaded) { this.showToast(this.t('toast.excel.libFailedShort'), 'warning'); return; }
      try {
        const XLSX = window.XLSX;
        const styles = this.getExcelStyles();
        const data = [];
        data.push(['']);
        data.push(['', this.t('excel.leaderboard.title'), '', '', '', '']);
        data.push(['', `${this.t('excel.date')}: ${this.selectedDate}`, '', '', '', '']);
        data.push(['']);
        data.push([this.t('excel.leaderboard.col.num'), this.t('excel.leaderboard.col.branch'), this.t('excel.leaderboard.col.sales'), this.t('excel.leaderboard.col.target'), this.t('excel.leaderboard.col.heroesTarget'), this.t('excel.leaderboard.col.basePct'), this.t('excel.leaderboard.col.heroesPct')]);
        this.branchLeaderboard.forEach((row, idx) => {
          data.push([idx + 1, row.name, row.sales, row.baseTarget, row.heroesTarget,
            row.basePct / 100, row.heroesPct / 100]);
        });
        const ws = XLSX.utils.aoa_to_sheet(data);
        ws['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 12 }];
        ws['!merges'] = [
          { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } },
          { s: { r: 2, c: 1 }, e: { r: 2, c: 4 } },
        ];
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = 0; R <= range.e.r; R++) {
          for (let C = 0; C <= range.e.c; C++) {
            const addr = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[addr]) ws[addr] = { v: '', t: 's' };
            if (R === 1 && C >= 1 && C <= 4) ws[addr].s = styles.title;
            else if (R === 2 && C >= 1 && C <= 4) {
              ws[addr].s = {
                font: { sz: 11, color: { rgb: '0B1220' }, name: 'Calibri' },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { fgColor: { rgb: 'F3F4F6' } },
              };
            } else if (R === 4) ws[addr].s = styles.header;
            else if (R > 4) {
              if (C === 5 || C === 6) {
                const pct = (ws[addr].v || 0) * 100;
                ws[addr].s = this.getPctStyle(pct);
                ws[addr].z = '0.0%';
              } else if (C === 2 || C === 3 || C === 4) ws[addr].s = styles.number;
              else if (C === 1) ws[addr].s = styles.cellRight;
              else ws[addr].s = styles.cell;
            }
          }
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.t('excel.leaderboard.sheetName'));
        this.saveXlsxWorkbook(wb, `${this.activeCompanyName}_Leaderboard_${this.selectedDate}.xlsx`);
        this.showToast(this.t('toast.excel.leaderboardExported'), 'success');
      } catch (e) {
        console.error('[Excel] Leaderboard export failed:', e);
        this.showToast(this.t('toast.excel.failed'), 'error');
      }
    },

    exportYoYCSV() {
      if (!this.yoyBranchId) return;
      const b = this.branches.find(x => x.id === this.yoyBranchId);
      const lines = [this.t('csv.yoy.title', '', { branch: b.name, current: this.yoyYear, previous: this.yoyYear - 1 }), ''];
      lines.push([this.t('csv.yoy.colMonth'), String(this.yoyYear), String(this.yoyYear - 1), this.t('csv.yoy.colDiff'), this.t('csv.yoy.colGrowth')].join(','));
      this.yoyMonthlyComparison.forEach(m => lines.push([
        m.monthName, m.current, m.previous, m.diff, m.growth.toFixed(1),
      ].join(',')));
      lines.push('');
      lines.push(`${this.t('csv.yoy.totalCurrent', '', { year: this.yoyYear })},${this.yoyTotalCurrent}`);
      lines.push(`${this.t('csv.yoy.totalPrevious', '', { year: this.yoyYear - 1 })},${this.yoyTotalPrevious}`);
      lines.push(`${this.t('csv.yoy.growthLine')},${this.yoyGrowth.toFixed(1)}%`);
      const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `YoY_${b.code}_${this.yoyYear}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.csv.exported'), 'success');
    },
    // ================================================================
    //  Backup
    // ================================================================
    exportBackup() {
      const data = {
        version: APP_VERSION,
        exportedAt: new Date().toISOString(),
        branches: this.branches, staff: this.staff, daily: this.daily,
        monthlyTargets: this.monthlyTargets,
        monthlyHeroesTargets: this.monthlyHeroesTargets,
        attendance: this.attendance, activityLog: this.activityLog,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `samx_backup_${localDateStr()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.backup.exported'), 'success');
      this.logActivity(this.t('log.backup.export'), 'JSON');
    },
    importBackup(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.branches) throw new Error('invalid file');
          if (!confirm(this.t('confirm.importBackup'))) return;
          this.saveAutoBackup();
          this.branches = data.branches || [];
          this.staff = data.staff || [];
          this.daily = data.daily || {};
          this.monthlyTargets = data.monthlyTargets || {};
          this.monthlyHeroesTargets = data.monthlyHeroesTargets || {};
          this.attendance = data.attendance || {};
          this.normalizeAllDailyRecords();
          this.showToast(this.t('toast.backup.imported'), 'success');
          this.showBackupModal = false;
          this.logActivity(this.t('log.backup.import'), `${this.branches.length} فرع، ${this.staff.length} موظف`);
        } catch (err) { alert('خطأ: ' + err.message); }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    clearAll() {
      if (!confirm(this.t('confirm.clearAllData'))) return;
      if (!confirm(this.t('confirm.clearAllDataFinal'))) return;
      this.saveAutoBackup();
      this.branches = [];
      this.staff = [];
      this.daily = {};
      this.monthlyTargets = {};
      this.monthlyHeroesTargets = {};
      this.attendance = {};
      this.persist();
      this.showToast(this.t('toast.backup.cleared'), 'success');
      this.showBackupModal = false;
      this.logActivity(this.t('log.clearAll'), '');
    },

    // ================================================================
    //  Setup Wizard
    // ================================================================
    checkSetupWizard() {
      try {
        // ⭐ v23.23 (الخيار 1): إيقاف الظهور الإجباري التلقائي للمعالج عند فتح التطبيق
        // لتمكين المستخدمين من تسجيل الدخول والمزامنة السحابية فوراً دون اعتراض على الجوالات
        // مع بقاء كافة إعدادات الهوية والمنشأة والفروع متاحة ومحفوظة 100% في صفحة الإعدادات
        this.setupWizard.isFirstRun = false;
        this.setupWizard.active = false;
        const setupDone = localStorage.getItem('samx_setup_done');
        if (setupDone !== 'true') {
          localStorage.setItem('samx_setup_done', 'true');
        }
      } catch (e) {
        console.warn('[SetupWizard] Check failed:', e);
      }
    },
    openSetupWizard() {
      this.setupWizard.active = true;
      this.setupWizard.step = 0;
      this.setupWizardForm.companyName = this.branding.companyName || '';
      this.setupWizardForm.companyDesc = this.branding.companyDesc || '';
      this.setupWizardForm.logoDataURL = this.branding.logoDataURL || null;
      this.setupWizardForm.sector = this.branding.sectorTemplate || 'general';
      this.setupWizardForm.branchCode = 'BR-001';
      this.setupWizardForm.branchName = '';
    },
    nextSetupStep() {
      if (!this.canProceedSetup) { this.showToast(this.t('toast.setup.incomplete'), 'warning'); return; }
      if (this.setupWizard.step < 4) this.setupWizard.step++;
    },
    prevSetupStep() {
      if (this.setupWizard.step > 0) this.setupWizard.step--;
    },
    skipSetupStep() {
      if (this.setupWizard.step === 1 && !this.setupWizardForm.companyName.trim()) this.setupWizardForm.companyName = 'شركتي';
      if (this.setupWizard.step === 3 && (!this.setupWizardForm.branchCode.trim() || !this.setupWizardForm.branchName.trim())) {
        this.setupWizardForm.branchCode = 'BR-001';
        this.setupWizardForm.branchName = 'الفرع الرئيسي';
      }
      if (this.setupWizard.step < 4) this.setupWizard.step++;
    },
    handleSetupLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 500 * 1024) {
        alert(this.t('alert.logo.sizeTooLarge'));
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        this.setupWizardForm.logoDataURL = e.target.result;
        this.showToast(this.t('toast.setup.logoUploaded'), 'success');
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    },
    removeSetupLogo() { this.setupWizardForm.logoDataURL = null; },
    selectSetupSector(sectorId) { this.setupWizardForm.sector = sectorId; },
    completeSetupWizard() {
      try {
        this.branding.companyName = this.setupWizardForm.companyName.trim() || 'شركتي';
        this.branding.companyDesc = this.setupWizardForm.companyDesc.trim() || 'إدارة المبيعات';
        this.branding.copyrightText = `© ${new Date().getFullYear()} ${this.branding.companyName}`;
        this.branding.logoDataURL = this.setupWizardForm.logoDataURL;
        this.branding.sectorTemplate = this.setupWizardForm.sector;

        const template = this.sectorTemplates.find(t => t.id === this.setupWizardForm.sector);
        if (template && template.labels) this.branding.labels = { ...template.labels };

        this.persistBranding();

        if (this.setupWizardForm.branchName.trim()) {
          const exists = this.branches.some(b =>
            b.code.toLowerCase() === this.setupWizardForm.branchCode.trim().toLowerCase()
          );
          if (!exists) {
            this.branches.push({
              id: this.uid(),
              name: this.setupWizardForm.branchName.trim(),
              code: this.setupWizardForm.branchCode.trim(),
            });
            this.logActivity(this.t('log.setup.branchAdded'), this.setupWizardForm.branchName);
          }
        }

        this.setDefaultSelections();
        this.schedulePersist();
        localStorage.setItem('samx_setup_done', 'true');
        this.setupWizard.isFirstRun = false;
        this.setupWizard.active = false;
        this.showToast(this.t('toast.setup.completed'), 'success');
        this.logActivity(this.t('log.setup.completed'), this.branding.companyName);
      } catch (e) {
        console.error('[SetupWizard] Complete failed:', e);
        alert(this.t('alert.setup.completeError', '', { error: e.message }));
      }
    },
    restartSetupWizard() {
      if (!confirm(this.t('confirm.restartWizard'))) return;
      this.openSetupWizard();
    },

    // ================================================================
    //  White-Label: التخصيص
    // ================================================================
    loadBranding() {
      try {
        const stored = localStorage.getItem('samx_branding');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            this.branding = {
              ...this.branding,
              ...parsed,
              labels: { ...this.branding.labels, ...(parsed.labels || {}) },
            };
          }
        }
      } catch (e) { console.error('[Branding] Load failed:', e); }
      this.brandingForm = {
        companyName: this.branding.companyName,
        companyDesc: this.branding.companyDesc,
        copyrightText: this.branding.copyrightText,
      };
    },
    persistBranding() {
      try { localStorage.setItem('samx_branding', JSON.stringify(this.branding)); }
      catch (e) { console.error('[Branding] Save failed:', e); }
      this.triggerCloudSyncDebounced();
    },
    saveBranding() {
      if (this.brandingForm.companyName) this.branding.companyName = this.brandingForm.companyName.trim();
      if (this.brandingForm.companyDesc) this.branding.companyDesc = this.brandingForm.companyDesc.trim();
      if (this.brandingForm.copyrightText) this.branding.copyrightText = this.brandingForm.copyrightText.trim();
      this.persistBranding();
      this.showToast(this.t('toast.branding.saved'), 'success');
      this.logActivity(this.t('log.branding.edit'), this.t('log.branding.edited'));
    },
    triggerLogoUpload() {
      if (this.$refs.logoInput) this.$refs.logoInput.click();
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 500 * 1024) {
        alert(this.t('alert.logo.sizeTooLarge'));
        event.target.value = '';
        return;
      }
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert(this.t('alert.logo.unsupportedFormat'));
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        this.branding.logoDataURL = e.target.result;
        this.persistBranding();
        this.showToast(this.t('toast.branding.logoUploaded'), 'success');
        this.logActivity(this.t('log.branding.logoUpdate'), file.name);
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    },
    removeCustomLogo() {
      if (!confirm(this.t('confirm.removeLogo'))) return;
      this.branding.logoDataURL = null;
      this.persistBranding();
      this.showToast(this.t('toast.branding.logoRemoved'), 'success');
      this.logActivity(this.t('log.branding.logoDelete'), '');
    },
    applySectorTemplate(template) {
      if (template.id === 'custom') {
        this.branding.sectorTemplate = 'custom';
        this.showToast(this.t('toast.branding.customMode'), 'success');
        return;
      }
      if (!template.labels) return;
      if (!confirm(this.t('confirm.applySectorTemplate', '', { name: template.name }))) return;
      this.branding.labels = { ...template.labels };
      this.branding.sectorTemplate = template.id;
      this.persistBranding();
      this.showToast(this.t('toast.branding.templateApplied', '', { name: this.t('sector.' + template.id + '.name', template.name) }), 'success');
      this.logActivity(this.t('log.template.apply'), template.name);
    },
    updateLabel(key, value) {
      if (!value || !value.trim()) return;
      this.branding.labels[key] = value.trim();
      this.branding.sectorTemplate = 'custom';
      clearTimeout(this._brandingSaveDebounce);
      this._brandingSaveDebounce = setTimeout(() => { this.persistBranding(); }, 800);
    },
    exportBranding() {
      const data = { version: APP_VERSION, exportedAt: new Date().toISOString(), branding: this.branding };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `samx-branding-${localDateStr()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.t('toast.branding.exported'), 'success');
    },
    importBranding(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          if (!data.branding) throw new Error('invalid file');
          if (!confirm(this.t('confirm.importBranding'))) return;
          this.branding = {
            ...this.branding,
            ...data.branding,
            labels: { ...this.branding.labels, ...(data.branding.labels || {}) },
          };
          this.brandingForm = {
            companyName: this.branding.companyName,
            companyDesc: this.branding.companyDesc,
            copyrightText: this.branding.copyrightText,
          };
          this.persistBranding();
          this.showToast(this.t('toast.branding.imported'), 'success');
        } catch (err) { alert('خطأ: ' + err.message); }
      };
      reader.readAsText(file);
      event.target.value = '';
    },
    resetBranding() {
      if (!confirm(this.t('confirm.resetBranding'))) return;
      this.branding = {
        companyName: 'SAMX',
        companyDesc: 'إدارة المبيعات',
        copyrightText: '© 2026 SAMX',
        logoDataURL: null,
        labels: {
          branch: 'فرع', branchPlural: 'فروع',
          staff: 'موظف', staffPlural: 'موظفين',
          sales: 'مبيعات', invoice: 'فاتورة', invoicePlural: 'فواتير',
          piece: 'قطعة', piecePlural: 'قطع',
          target: 'تارجت', manager: 'مدير',
        },
        sectorTemplate: 'general',
      };
      this.brandingForm = { companyName: 'SAMX', companyDesc: 'إدارة المبيعات', copyrightText: '© 2026 SAMX' };
      this.persistBranding();
      this.showToast(this.t('toast.branding.reset'), 'success');
      this.logActivity(this.t('log.branding.reset'), '');
    },

    // ================================================================
    //  البحث الشامل
    // ================================================================
    openSearch() {
      this.showSearchModal = true;
      this.searchQuery = '';
      this.searchResults = [];
      this.searchSelectedIndex = 0;
      nextTick(() => { if (this.$refs.searchInput) this.$refs.searchInput.focus(); });
    },
    closeSearch() {
      this.showSearchModal = false;
      this.searchQuery = '';
      this.searchResults = [];
    },
    performSearch() {
      const q = (this.searchQuery || '').trim().toLowerCase();
      if (!q) { this.searchResults = []; return; }
      const results = [];
      this.allowedBranches.forEach(b => {
        if (b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)) {
          const staffCount = this.staff.filter(s => s.branchId === b.id).length;
          results.push({
            id: b.id, type: 'branch', icon: '🏬',
            title: b.name, subtitle: this.t('search.subtitle.branch', '', { code: b.code, count: staffCount }),
            action: 'branch',
          });
        }
      });
      this.staff.forEach(s => {
        if (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) {
          if (this.currentUser.role === 'branch_manager' && s.branchId !== this.currentUser.branchId) return;
          const branch = this.branches.find(b => b.id === s.branchId);
          results.push({
            id: s.id, type: 'staff', icon: '👤',
            title: s.name,
            subtitle: this.t('search.subtitle.staff', '', { job: s.jobTitle || '—', branch: branch?.name || '—', code: s.code }),
            action: 'staff', branchId: s.branchId,
          });
        }
      });
      if (this.currentUser.role === 'admin') {
        this.users.forEach(u => {
          if (u.fullName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)) {
            results.push({
              id: u.id, type: 'user', icon: '🔐',
              title: u.fullName,
              subtitle: this.t('search.subtitle.user', '', { username: u.username, role: this.roleLabel(u.role) }),
              action: 'user',
            });
          }
        });
      }
      this.searchResults = results.slice(0, 30);
      this.searchSelectedIndex = 0;
    },
    navigateSearch(delta) {
      if (this.searchResults.length === 0) return;
      this.searchSelectedIndex = (this.searchSelectedIndex + delta + this.searchResults.length) % this.searchResults.length;
    },
    selectSearchResult() {
      const r = this.searchResults[this.searchSelectedIndex];
      if (r) this.goToSearchResult(r);
    },
    goToSearchResult(result) {
      if (result.action === 'branch') {
        this.selectedBranchId = result.id;
        this.monthlyBranchId = result.id;
        this.analyticsBranchId = result.id;
        this.yoyBranchId = result.id;
        if (this.canManageBranches) {
          this.openView('branches');
        } else {
          this.openView('dashboard');
        }
      } else if (result.action === 'staff') {
        this.selectedBranchId = result.branchId;
        this.monthlyBranchId = result.branchId;
        if (this.canManageStaff) {
          this.openView('staff');
        } else {
          this.openView('dashboard');
        }
      } else if (result.action === 'user') {
        if (this.currentUser && this.currentUser.role === 'admin') {
          this.openView('users');
        } else {
          this.closeSearch();
          this.showToast(this.t('users.noPermission', 'غير مصرح لك بالوصول لإدارة المستخدمين ⛔'), 'warning');
          return;
        }
      }
      this.closeSearch();
      this.showToast(this.t('toast.search.navigated', '', { title: result.title }), 'success');
    },
    // ================================================================
    //  صور الموظفين
    // ================================================================
    getStaffPhoto(staffId) { return this.staffPhotos[staffId] || null; },
    loadStaffPhotos() {
      try {
        const stored = localStorage.getItem('samx_staff_photos');
        this.staffPhotos = stored ? JSON.parse(stored) : {};
      } catch (e) { this.staffPhotos = {}; }
    },
    persistStaffPhotos() {
      try { localStorage.setItem('samx_staff_photos', JSON.stringify(this.staffPhotos)); }
      catch (e) { console.error('Failed to save photos:', e); }
    },
    uploadStaffPhoto(staffId, event) {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 500 * 1024) {
        alert(this.t('alert.photo.sizeTooLarge'));
        event.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        this.staffPhotos[staffId] = e.target.result;
        this.persistStaffPhotos();
        this.showToast(this.t('toast.photo.uploaded'), 'success');
      };
      reader.readAsDataURL(file);
      // ⭐ v23: إعادة تعيين input لتمكين رفع نفس الصورة مرة أخرى
      event.target.value = '';
    },
    removeStaffPhoto(staffId) {
      if (!confirm(this.t('confirm.removeStaffPhoto'))) return;
      delete this.staffPhotos[staffId];
      this.persistStaffPhotos();
      this.showToast(this.t('toast.photo.deleted'), 'success');
    },

    // ================================================================
    //  الثيمات الجاهزة
    // ================================================================
    applyThemePreset(preset) {
      this.settings.primaryColor = preset.primary;
      this.settings.themeMode = preset.mode;
      this.settings.lightTheme = preset.lightTheme || 'classic';
      const colorObj = this.colorPalette.find(c => c.id === preset.primary);
      if (colorObj) {
        document.documentElement.style.setProperty('--theme-primary', colorObj.primary);
        document.documentElement.style.setProperty('--theme-secondary', colorObj.secondary);
        document.documentElement.style.setProperty('--theme-primary-rgb', colorObj.rgb);
      }
      this.applyThemeMode();
      this.saveSettingsToStorage();
      this.showToast(this.t('toast.theme.applied', '', { name: this.t('theme.' + preset.id + '.name', preset.name) }), 'success');
    },
  },

  async mounted() {
    try {
      const loading = document.getElementById('loading-screen');
      if (loading) loading.style.display = 'none';

      // ⭐ v23: ترحيل البيانات (shiaka_ → samx_)
      this.migrateFromShaka();

      // ⭐ v23.25: تحميل البيانات وفتح بوابة _dataLoaded فورا لكافة العمليات والمزامنة
      this.load();
      await this.initUsers();
      this.restoreSession();
      this.loadSettingsFromStorage();
      this.applyAllSettings();
      // ⭐ v23.3: تطبيق اللغة على DOM
      this.applyLanguageAttributes();
      this.checkSetupWizard();
      this.loadBranding();
            // ⭐ v23.12-FIX: تفعيل Custom Chart Plugins (كانت مفقودة)
      this.registerChartPlugins();

      this._autoThemeCheck = setInterval(() => this.checkAutoTheme(), 10 * 60 * 1000);

      // ⭐ v23.6.6: preload خطوط Cairo + الشعار (يحل مشكلة النقرة الأولى)
      this.preloadFontsAndAssets();

      // ⭐ v23.7: فحص Seed عند بدء التطبيق
      this.checkAndApplySeed();

      // ⭐ v23.8: طلب تخزين دائم (يمنع Chrome Android من مسح البيانات)
      this.requestPersistentStorage();

      this.setupOnlineStatus();
      this.setupPWA();
      this.setupServiceWorker();
      this.setupAutoBackup();
      this.setupAutoLock();
      this.setupNotifications();

      // ⭐ v23.18: تهيئة المزامنة السحابية Cloudflare D1
      window.addEventListener('online', () => {
        this.cloudSyncStatus = 'syncing';
        this.syncFromCloud();
      });
      window.addEventListener('offline', () => {
        this.cloudSyncStatus = 'offline';
      });
      // ⭐ v23.23: السحب الفوري قبل/أثناء شاشة الدخول (Pre-Login Cloud Fetch)
      this.syncFromCloud();

      // ⭐ v23.10: Pull-to-Refresh
      this.setupPullToRefresh();
      // ⭐ v23.17: مزامنة ارتفاع الهيدر لمنع قص العناوين
      this.syncHeaderHeight();
      window.addEventListener('resize', () => this.syncHeaderHeight());

      // ⭐ v23: حفظ البيانات عند إغلاق/تصغير الصفحة
      window.addEventListener('beforeunload', () => this.persistNow());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') this.persistNow();
      });

      // ⭐ v23.19: حارس أمني للتنقل عبر الهاش (Hash Navigation Guard)
      const hash = window.location.hash.slice(1);
      if (hash && ['dashboard', 'kpi', 'admin', 'monthly', 'yoy', 'analytics', 'leaderboard', 'branches', 'staff', 'users'].includes(hash)) {
        if (this.canAccessView(hash)) {
          this.currentView = hash;
        } else {
          try { history.replaceState(null, '', '#'); } catch (e) {}
        }
      }

      window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.slice(1);
        if (newHash && newHash !== this.currentView) {
          if (this.canAccessView(newHash)) {
            this.openView(newHash);
          } else {
            this.showToast(this.t('toast.permissionDenied', 'غير مصرح لك بالوصول إلى هذه الشاشة ⛔'), 'warning');
            try { history.replaceState(null, '', '#' + (this.currentView || 'welcome')); } catch (e) {}
          }
        }
      });

      nextTick(() => this.refreshCharts());

            // ⭐ تشخيص: فعّل الوصول للتطبيق من Console
      window.__samx = this;

      console.log('[SAMX] v' + APP_VERSION + ' mounted ✅');
      console.log('© 2026 SAMX - جميع الحقوق محفوظة');
    } catch (e) {
      console.error('Mount error:', e);
      const loading = document.getElementById('loading-screen');
      if (loading) loading.style.display = 'none';
    }
  },
}).mount('#app');
