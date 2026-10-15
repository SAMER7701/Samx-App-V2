// ================================================================
//  SAMX i18n — Core Manager
//  المالك: Smeer.S.A | المطور: SAMX Team
//  © 2026 SAMX - جميع الحقوق محفوظة
//  ⭐ v23.3: مدير الترجمة — Phase 5
// ================================================================

(function() {
  'use strict';

  const STORAGE_KEY = 'samx_lang';
  const DEFAULT_LANG = 'ar';
  const SUPPORTED_LANGS = ['ar', 'en'];

  let _currentLang = DEFAULT_LANG;
  const _translations = {};

  // ─── تسجيل قاموس لغة ───
  function registerTranslations(lang, dict) {
    if (!lang || !dict || typeof dict !== 'object') return false;
    _translations[lang] = dict;
    return true;
  }

  // ─── الحصول على اللغة الحالية ───
  function getLang() {
    return _currentLang;
  }

  // ─── تعيين اللغة ───
  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return false;
    _currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    return true;
  }

  // ─── تحميل اللغة المحفوظة ───
  function loadLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        _currentLang = saved;
      }
    } catch (e) {}
    return _currentLang;
  }

  // ─── ترجمة مفتاح (مع دعم Interpolation) ⭐ v23.4 ───
  function t(key, fallback, params) {
    if (!key) return fallback !== undefined ? fallback : '';

    // 1. ابحث في اللغة الحالية
    const dict = _translations[_currentLang] || {};
    let val = dict[key];

    // 2. Fallback إلى العربية
    if (val === undefined) {
      const arDict = _translations[DEFAULT_LANG] || {};
      val = arDict[key];
    }

    // 3. Fallback إلى القيمة المُمرَّرة أو المفتاح نفسه
    if (val === undefined) {
      val = fallback !== undefined ? fallback : key;
    }

    // 4. ⭐ v23.4: Interpolation — {name} → قيمة
    if (params && typeof val === 'string') {
      val = val.replace(/\{(\w+)\}/g, (match, k) => {
        return params[k] !== undefined ? params[k] : match;
      });
    }

    return val;
  }
  // ─── فحص وجود مفتاح ───
  function has(key) {
    const dict = _translations[_currentLang] || {};
    return dict[key] !== undefined;
  }

  // ─── اتجاه اللغة ───
  function getDir() {
    return _currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  // ─── إحصائيات (للتشخيص) ───
  function stats() {
    const result = {};
    Object.keys(_translations).forEach(lang => {
      result[lang] = Object.keys(_translations[lang]).length;
    });
    return {
      current: _currentLang,
      supported: SUPPORTED_LANGS,
      keys: result,
    };
  }

  // ═══════════════════════════════════════════════════════════════
  //  تسجيل اللغات تلقائياً عند التحميل
  // ═══════════════════════════════════════════════════════════════
  if (window.SAMX_i18n_ar) registerTranslations('ar', window.SAMX_i18n_ar);
  if (window.SAMX_i18n_en) registerTranslations('en', window.SAMX_i18n_en);
  loadLang();

  // ═══════════════════════════════════════════════════════════════
  //  التصدير العام
  // ═══════════════════════════════════════════════════════════════
  window.SAMX_i18n = {
    registerTranslations,
    getLang,
    setLang,
    loadLang,
    t,
    has,
    getDir,
    stats,
    SUPPORTED_LANGS,
    DEFAULT_LANG,
  };

  console.log(
    `[i18n] ✅ v23.4 — التحميل تم — اللغة: ${_currentLang} — ` +
    `المفاتيح: ${JSON.stringify(stats().keys)} — ` +
    `Interpolation: ✅`
  );
})();