/**
 * ================================================================
 *  SAMX v24.0.0 — db.js
 *  المرحلة الأولى: تهيئة قاعدة البيانات المحلية عبر Dexie.js (IndexedDB)
 *  قاعدة البيانات: SamxDatabaseV24
 *  © 2026 SAMX - جميع الحقوق محفوظة
 * ================================================================
 */

// رابط CDN المعتمد لتحميل Dexie عند الحاجة في المتصفح
const DEXIE_CDN_URL = 'https://cdn.jsdelivr.net/npm/dexie@4.0.11/dist/dexie.min.js';

/**
 * دالة التأكد من توفر مكتبة Dexie.js في البيئة الحالية (Browser أو Node)
 */
async function loadDexie() {
  if (typeof window !== 'undefined' && window.Dexie) {
    return window.Dexie;
  }

  // محاولة استيراد ديناميكي للمكتبة إذا كنا في بيئة تدعم ESM
  try {
    const module = await import('dexie');
    return module.default || module.Dexie || module;
  } catch (e) {
    // بيئة المتصفح: تحميل السكربت عبر عنصر script إن لم يكن متاحاً
    if (typeof document !== 'undefined') {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${DEXIE_CDN_URL}"]`);
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve(window.Dexie));
          existingScript.addEventListener('error', reject);
          if (window.Dexie) return resolve(window.Dexie);
          return;
        }

        const script = document.createElement('script');
        script.src = DEXIE_CDN_URL;
        script.async = true;
        script.onload = () => {
          if (window.Dexie) {
            resolve(window.Dexie);
          } else {
            reject(new Error('Dexie script loaded but window.Dexie is unavailable'));
          }
        };
        script.onerror = () => reject(new Error('Failed to load Dexie.js from CDN'));
        document.head.appendChild(script);
      });
    }
    throw new Error('Dexie is not available in current environment');
  }
}

/**
 * فئة إدارة قاعدة بيانات SAMX v24
 */
class SamxDatabase {
  constructor() {
    this.name = 'SamxDatabaseV24';
    this.versionNumber = 1;
    this.instance = null;
    this.isReady = false;
    this._initPromise = null;
  }

  /**
   * تهيئة وفتح اتصال قاعدة البيانات مع تعريف الجداول والفهارس
   */
  async init() {
    if (this.instance && this.isReady) {
      return this.instance;
    }
    if (this._initPromise) {
      return this._initPromise;
    }

    this._initPromise = (async () => {
      const DexieClass = await loadDexie();
      const db = new DexieClass(this.name);

      // تعريف المخطط (Schema) والفهارس بدقة متوافقة 100% مع متطلبات v24
      db.version(this.versionNumber).stores({
        branches: 'id, code, name',
        staff: 'id, branchId, code, name',
        daily: 'key, date, branchId, isClosed',
        monthlyTargets: 'key, month, branchId',
        users: 'id, username, role',
        settings: 'id',
      });

      await db.open();
      this.instance = db;
      this.isReady = true;
      console.log(`[SamxDB] ✅ Database "${this.name}" v${this.versionNumber} initialized successfully`);
      return db;
    })();

    try {
      const db = await this._initPromise;
      return db;
    } finally {
      this._initPromise = null;
    }
  }

  /**
   * الحصول على نسخة Dexie الحالية
   */
  async getDb() {
    if (!this.instance || !this.isReady) {
      return await this.init();
    }
    return this.instance;
  }
}

// إنشاء النسخة المفردة (Singleton)
export const samxDbInstance = new SamxDatabase();

/**
 * اختصار لتشغيل قاعدة البيانات
 */
export async function initDatabase() {
  return await samxDbInstance.init();
}

// ================================================================
//  دوال مساعدة لجدول الفروع (Branches)
// ================================================================

export async function getAllBranches() {
  const db = await samxDbInstance.getDb();
  return await db.branches.toArray();
}

export async function getBranchById(id) {
  if (!id) return null;
  const db = await samxDbInstance.getDb();
  return await db.branches.get(String(id));
}

export async function getBranchByCode(code) {
  if (!code) return null;
  const db = await samxDbInstance.getDb();
  return await db.branches.where('code').equalsIgnoreCase(String(code).trim()).first();
}

export async function saveBranch(branch) {
  if (!branch || !branch.id) throw new Error('Branch must have a valid id');
  const db = await samxDbInstance.getDb();
  await db.branches.put({
    ...branch,
    id: String(branch.id),
    code: String(branch.code || '').trim(),
    name: String(branch.name || '').trim(),
    updatedAt: Date.now(),
  });
  return branch;
}

export async function saveBranchesBatch(branchesList) {
  if (!Array.isArray(branchesList) || branchesList.length === 0) return 0;
  const db = await samxDbInstance.getDb();
  const sanitized = branchesList.map(b => ({
    ...b,
    id: String(b.id),
    code: String(b.code || '').trim(),
    name: String(b.name || '').trim(),
    updatedAt: Date.now(),
  }));
  await db.branches.bulkPut(sanitized);
  return sanitized.length;
}

export async function deleteBranch(id) {
  if (!id) return false;
  const db = await samxDbInstance.getDb();
  await db.branches.delete(String(id));
  return true;
}

// ================================================================
//  دوال مساعدة لجدول الموظفين (Staff)
// ================================================================

export async function getAllStaff() {
  const db = await samxDbInstance.getDb();
  return await db.staff.toArray();
}

export async function getStaffByBranch(branchId) {
  if (!branchId) return [];
  const db = await samxDbInstance.getDb();
  return await db.staff.where('branchId').equals(String(branchId)).toArray();
}

export async function getStaffById(id) {
  if (!id) return null;
  const db = await samxDbInstance.getDb();
  return await db.staff.get(String(id));
}

export async function saveStaffMember(staffMember) {
  if (!staffMember || !staffMember.id) throw new Error('Staff member must have a valid id');
  const db = await samxDbInstance.getDb();
  await db.staff.put({
    ...staffMember,
    id: String(staffMember.id),
    branchId: String(staffMember.branchId || ''),
    code: String(staffMember.code || '').trim(),
    name: String(staffMember.name || '').trim(),
    jobTitle: staffMember.jobTitle || 'بائع',
    updatedAt: Date.now(),
  });
  return staffMember;
}

export async function saveStaffBatch(staffList) {
  if (!Array.isArray(staffList) || staffList.length === 0) return 0;
  const db = await samxDbInstance.getDb();
  const sanitized = staffList.map(s => ({
    ...s,
    id: String(s.id),
    branchId: String(s.branchId || ''),
    code: String(s.code || '').trim(),
    name: String(s.name || '').trim(),
    jobTitle: s.jobTitle || 'بائع',
    updatedAt: Date.now(),
  }));
  await db.staff.bulkPut(sanitized);
  return sanitized.length;
}

export async function deleteStaffMember(id) {
  if (!id) return false;
  const db = await samxDbInstance.getDb();
  await db.staff.delete(String(id));
  return true;
}

// ================================================================
//  دوال مساعدة لجدول اليوميات وسجل المبيعات (Daily Records)
//  المفتاح الأساسي: key صيغته "date|branchId" (مثال: "2026-10-25|BR01")
// ================================================================

export function makeDayKey(date, branchId) {
  return `${String(date).trim()}|${String(branchId).trim()}`;
}

export async function getDayRecord(date, branchId) {
  if (!date || !branchId) return null;
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  return await db.daily.get(key);
}

export async function saveDayRecord(date, branchId, data = {}) {
  if (!date || !branchId) throw new Error('date and branchId are required');
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  const existing = (await db.daily.get(key)) || {};

  const record = {
    ...existing,
    ...data,
    key,
    date: String(date).trim(),
    branchId: String(branchId).trim(),
    baseTarget: Number(data.baseTarget ?? existing.baseTarget ?? 0),
    heroesTarget: Number(data.heroesTarget ?? existing.heroesTarget ?? 0),
    manualExtra: Number(data.manualExtra ?? existing.manualExtra ?? 0),
    mtdSales: Number(data.mtdSales ?? existing.mtdSales ?? 0),
    invoices: Number(data.invoices ?? existing.invoices ?? 0),
    pieces: Number(data.pieces ?? existing.pieces ?? 0),
    staffData: data.staffData || existing.staffData || {},
    isClosed: Boolean(data.isClosed ?? existing.isClosed ?? false),
    updatedAt: Date.now(),
  };

  await db.daily.put(record);
  return record;
}

export async function updateStaffSales(date, branchId, staffId, salesValue) {
  if (!date || !branchId || !staffId) return null;
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  const record = (await db.daily.get(key)) || {
    key,
    date: String(date).trim(),
    branchId: String(branchId).trim(),
    baseTarget: 0,
    heroesTarget: 0,
    manualExtra: 0,
    staffData: {},
    isClosed: false,
  };

  if (!record.staffData) record.staffData = {};
  const currentStaffRec = record.staffData[staffId] || { sales: 0, target: 0, heroesTarget: 0 };
  currentStaffRec.sales = Number(salesValue) || 0;
  record.staffData[staffId] = currentStaffRec;
  record.updatedAt = Date.now();

  await db.daily.put(record);
  return record;
}

export async function getDaysByMonth(month, branchId = null) {
  if (!month) return [];
  const db = await samxDbInstance.getDb();
  let query = db.daily.where('date').between(`${month}-01`, `${month}-31`, true, true);
  if (branchId) {
    return await query.filter(r => r.branchId === String(branchId)).toArray();
  }
  return await query.toArray();
}

export async function closeDayRecord(date, branchId, closeMeta = {}) {
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  const rec = (await db.daily.get(key)) || { key, date, branchId };

  rec.isClosed = true;
  rec.closedAt = Date.now();
  rec.closedBy = closeMeta.closedBy || 'Admin';
  rec.closedRole = closeMeta.closedRole || 'admin';
  rec.closeNote = closeMeta.closeNote || '';
  rec.updatedAt = Date.now();

  await db.daily.put(rec);
  return rec;
}

export async function reopenDayRecord(date, branchId, reason = '') {
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  const rec = await db.daily.get(key);
  if (!rec) return null;

  rec.isClosed = false;
  rec.reopenedAt = Date.now();
  rec.reopenReason = reason;
  rec.updatedAt = Date.now();

  await db.daily.put(rec);
  return rec;
}

export async function deleteDayRecord(date, branchId) {
  const key = makeDayKey(date, branchId);
  const db = await samxDbInstance.getDb();
  await db.daily.delete(key);
  return true;
}

// ================================================================
//  دوال مساعدة لجدول التارجت الشهري (Monthly Targets)
//  المفتاح الأساسي: key صيغته "month|branchId" (مثال: "2026-10|BR01")
// ================================================================

export function makeMonthKey(month, branchId) {
  return `${String(month).trim()}|${String(branchId).trim()}`;
}

export async function getMonthlyTarget(month, branchId) {
  if (!month || !branchId) return null;
  const key = makeMonthKey(month, branchId);
  const db = await samxDbInstance.getDb();
  return await db.monthlyTargets.get(key);
}

export async function saveMonthlyTarget(month, branchId, targetData = {}) {
  if (!month || !branchId) throw new Error('month and branchId are required');
  const key = makeMonthKey(month, branchId);
  const db = await samxDbInstance.getDb();
  const existing = (await db.monthlyTargets.get(key)) || {};

  const record = {
    ...existing,
    ...targetData,
    key,
    month: String(month).trim(),
    branchId: String(branchId).trim(),
    baseTarget: Number(targetData.baseTarget ?? existing.baseTarget ?? 0),
    heroesTarget: Number(targetData.heroesTarget ?? existing.heroesTarget ?? 0),
    updatedAt: Date.now(),
  };

  await db.monthlyTargets.put(record);
  return record;
}

export async function getAllMonthlyTargets(month = null) {
  const db = await samxDbInstance.getDb();
  if (month) {
    return await db.monthlyTargets.where('month').equals(String(month).trim()).toArray();
  }
  return await db.monthlyTargets.toArray();
}

// ================================================================
//  دوال مساعدة لجدول المستخدمين (Users)
// ================================================================

export async function getAllUsers() {
  const db = await samxDbInstance.getDb();
  return await db.users.toArray();
}

export async function getUserById(id) {
  if (!id) return null;
  const db = await samxDbInstance.getDb();
  return await db.users.get(String(id));
}

export async function getUserByUsername(username) {
  if (!username) return null;
  const db = await samxDbInstance.getDb();
  return await db.users.where('username').equalsIgnoreCase(String(username).trim()).first();
}

export async function saveUser(user) {
  if (!user || !user.id) throw new Error('User must have a valid id');
  const db = await samxDbInstance.getDb();
  await db.users.put({
    ...user,
    id: String(user.id),
    username: String(user.username || '').trim(),
    role: user.role || 'manager',
    updatedAt: Date.now(),
  });
  return user;
}

export async function deleteUser(id) {
  if (!id) return false;
  const db = await samxDbInstance.getDb();
  await db.users.delete(String(id));
  return true;
}

// ================================================================
//  دوال مساعدة لجدول الإعدادات (Settings)
// ================================================================

export async function getSettings(id = 'app_settings') {
  const db = await samxDbInstance.getDb();
  return await db.settings.get(id);
}

export async function saveSettings(settingsData, id = 'app_settings') {
  const db = await samxDbInstance.getDb();
  const record = {
    ...settingsData,
    id,
    updatedAt: Date.now(),
  };
  await db.settings.put(record);
  return record;
}

// ================================================================
//  دوال النسخ الاحتياطي ومسح قاعدة البيانات (Backup & Maintenance)
// ================================================================

export async function exportDatabaseToJson() {
  const db = await samxDbInstance.getDb();
  const [branches, staff, daily, monthlyTargets, users, settings] = await Promise.all([
    db.branches.toArray(),
    db.staff.toArray(),
    db.daily.toArray(),
    db.monthlyTargets.toArray(),
    db.users.toArray(),
    db.settings.toArray(),
  ]);

  return {
    version: '24.0.0',
    exportedAt: new Date().toISOString(),
    databaseName: samxDbInstance.name,
    data: { branches, staff, daily, monthlyTargets, users, settings },
  };
}

export async function clearAllDatabase() {
  const db = await samxDbInstance.getDb();
  await Promise.all([
    db.branches.clear(),
    db.staff.clear(),
    db.daily.clear(),
    db.monthlyTargets.clear(),
    db.users.clear(),
    db.settings.clear(),
  ]);
  console.log('[SamxDB] ⚠️ All tables cleared');
  return true;
}

// إتاحة الكائن في نافذة المتصفح العالمية عند التضمين المباشر
if (typeof window !== 'undefined') {
  window.SamxDB = {
    samxDbInstance,
    initDatabase,
    // Branches
    getAllBranches,
    getBranchById,
    getBranchByCode,
    saveBranch,
    saveBranchesBatch,
    deleteBranch,
    // Staff
    getAllStaff,
    getStaffByBranch,
    getStaffById,
    saveStaffMember,
    saveStaffBatch,
    deleteStaffMember,
    // Daily Records
    makeDayKey,
    getDayRecord,
    saveDayRecord,
    updateStaffSales,
    getDaysByMonth,
    closeDayRecord,
    reopenDayRecord,
    deleteDayRecord,
    // Monthly Targets
    makeMonthKey,
    getMonthlyTarget,
    saveMonthlyTarget,
    getAllMonthlyTargets,
    // Users
    getAllUsers,
    getUserById,
    getUserByUsername,
    saveUser,
    deleteUser,
    // Settings
    getSettings,
    saveSettings,
    // Maintenance
    exportDatabaseToJson,
    clearAllDatabase,
  };
}

export default samxDbInstance;
