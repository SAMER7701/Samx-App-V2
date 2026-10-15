// ================================================================
//  SAMX i18n — English (en)
//  Owner: Smeer.S.A | Dev: SAMX Team
//  © 2026 SAMX - All rights reserved
//  ⭐ v23.4: Batch 6.2a — Common/App/Auth/Nav/Service/Header
// ================================================================

(function() {
  'use strict';

  window.SAMX_i18n_en = {

    // ─── Meta ───
    'meta.lang': 'en',
    'meta.dir': 'ltr',
    'meta.name': 'English',
    'meta.copyright': 'All rights reserved',
    'meta.poweredBy': 'Powered by SAMX',

    // ─── Common ───
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.confirm': 'Confirm',
    'common.all': 'All',
    'common.none': 'None',
    'common.chooseBranch': '— Select a branch —',
    'common.choose': '— Select —',
    'common.searchPlaceholder': '🔍 Search...',

    // ─── App ───
    'app.name': 'SAMX',
    'app.version': 'Version',
    'app.tagline': 'Sales Management System',
    'app.description': 'An integrated system for managing and tracking branch sales',
    'app.loading': 'Loading...',

    // ─── Auth ───
    'auth.login.title': '🔐 Login',
    'auth.username': 'Username',
    'auth.usernamePlaceholder': 'Username',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': '••••••••',
    'auth.remember': 'Remember me for 30 days',
    'auth.loginBtn': 'Login',
    'auth.loggingBtn': '⏳...',
    'auth.logout': 'Logout',
    'auth.welcome': 'Welcome',
    'auth.tagline': 'An integrated branch sales management system',
    'auth.connection.online': '🟢 Online',
    'auth.connection.offline': '🔴 Offline',
    'auth.errors.invalid': 'Invalid credentials',
    'auth.errors.empty': 'Enter username and password',
    'auth.errors.generic': 'Error: {error}',

    // ─── Nav ───
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.kpi': 'KPIs',
    'nav.admin': 'Admin Panel',
    'nav.monthly': 'Monthly',
    'nav.yoy': 'Year-over-Year',
    'nav.analytics': 'Analytics',
    'nav.leaderboard': 'Leaderboard',
    'nav.branches': 'Branches',
    'nav.staff': 'Staff',
    'nav.users': 'Users',
    'nav.settings': 'Settings',
    'nav.backup': 'Backup',
    'nav.activity': 'Activity Log',
    'nav.notifications': 'Notifications',
    'nav.mobile.dashboard': 'Dash',
    'nav.mobile.kpi': 'KPI',
    'nav.mobile.monthly': 'Month',
    'nav.mobile.leaderboard': 'Rank',
    'nav.mobile.home': 'Home',
    'nav.mobile.more': 'More',

    // ─── Service (Welcome) ───
    'service.welcome.title': 'Welcome {name} 👋',
    'service.welcome.subtitle': 'Choose a service to continue',
    'service.dashboard.title': 'Dashboard',
    'service.dashboard.sub': 'Enter and track sales',
    'service.dashboard.tooltip': 'Daily dashboard',
    'service.kpi.title': 'KPIs',
    'service.kpi.sub': 'UPT / ATV / Achievement',
    'service.kpi.tooltip': 'UPT, ATV and KPIs',
    'service.admin.title': 'Admin Panel',
    'service.admin.sub': 'Overview',
    'service.admin.tooltip': 'Branches overview',
    'service.monthly.title': 'Monthly',
    'service.monthly.sub': 'Sales progress',
    'service.monthly.tooltip': 'Monthly target and sales',
    'service.yoy.title': 'YoY',
    'service.yoy.sub': 'YoY',
    'service.yoy.tooltip': 'Year-over-Year comparison',
    'service.analytics.title': 'Analytics',
    'service.analytics.sub': 'Sales trends',
    'service.analytics.tooltip': 'Sales trend analysis',
    'service.leaderboard.title': 'Leaderboard',
    'service.leaderboard.sub': 'Branch performance',
    'service.leaderboard.tooltip': 'Branches ranked by performance',
    'service.branches.title': 'Branches',
    'service.branches.sub': '{count} branches',
    'service.branches.tooltip': 'Add and edit branches',
    'service.staff.title': 'Staff',
    'service.staff.sub': '{count} staff',
    'service.staff.tooltip': 'Add and edit staff',
    'service.users.title': 'Users',
    'service.users.sub': '{count} users',
    'service.users.tooltip': 'Admins and managers',

    // ─── Header ───
    'header.tooltips.search': 'Global search',
    'header.tooltips.notifications': 'Notifications',
    'header.tooltips.offline': 'Offline',
    'header.tooltips.language.toAr': 'التبديل للعربية',
    'header.tooltips.language.toEn': 'Switch to English',
    'header.tooltips.settings': 'Settings',
    'header.tooltips.theme.day': 'Day mode',
    'header.tooltips.theme.night': 'Night mode',
    'header.tooltips.activity': 'Activity log',
    'header.tooltips.backup': 'Backup',
    'header.tooltips.logout': 'Logout',
    'header.notifications.title': '🔔 Notifications',
    'header.notifications.clearAll': 'Clear all',
    'header.notifications.empty': 'No notifications',
    'header.role.admin': 'Admin',
    'header.role.manager': 'Manager',
    'header.role.branch_manager': 'Branch Manager',

    // ─── PWA ───
    'pwa.install.title': 'Install the app on your phone',
    'pwa.install.sub': 'Works offline',
    'pwa.install.btn': 'Install',
    'pwa.installed': '✅ App installed',
    'pwa.manualHint': 'Open browser menu → "Add to Home Screen"',

    // ─── Update ───
    'update.available': '🎉 New version available',
    'update.btn': 'Update',

    // ─── Lock ───
    'lock.title': '🔒 App Locked',
    'lock.subtitle': 'Enter password to continue',
    'lock.passwordPlaceholder': 'Password',
    'lock.unlockBtn': '🔓 Unlock',
    'lock.logoutBtn': 'Logout',
    'lock.errors.wrongPassword': 'Wrong password',
    'lock.errors.userNotFound': 'User not found',
    'lock.unlocked': '🔓 Unlocked',

    // ─── Language ───
    'lang.ar': 'العربية',
    'lang.en': 'English',
    'lang.switch': 'Switch language',
    // ═══════════════════════════════════════════════════════
    //  Batch 6.2b — Dashboard Header + Filter + Live KPI
    // ═══════════════════════════════════════════════════════

    // ─── Morning Alert ───
    'notif.morning.title': 'Morning Alert',
    'notif.morning.ok': 'OK',

    // ─── Dashboard Header ───
    'dashboard.title': '📊 Dashboard',
    'dashboard.subtitle': 'Enter and track daily sales',
    'dashboard.backTooltip': 'Back to home',

    // ─── Dashboard Filter ───
    'dashboard.filter.date': '📅 Date',
    'dashboard.filter.branch': '🏬 Branch',
    'dashboard.filter.today': 'Today',
    'dashboard.filter.yesterday': 'Yesterday',
    'dashboard.filter.minus7': '-7',
    'dashboard.filter.plus1': '+1',

    // ─── Historical Mode Notice ───
    'dashboard.historical.notice': 'Historical entry mode — editing {day} ({date})',
    'dashboard.historical.backToday': 'Today',

    // ─── Empty State ───
    'dashboard.empty.selectBranch': 'Select a branch to start',

    // ─── Live KPI Section ───
    'dashboard.live.title': '⚡ Live KPIs',
    'dashboard.live.totalBranch': '💰 Branch Total',
    'dashboard.live.staffPrefix': 'Staff: ',
    'dashboard.live.extraPrefix': ' + Extra: ',
    'dashboard.live.basePct': '🎯 Base %',
    'dashboard.live.heroesPct': '🏆 Heroes %',
    'dashboard.live.topSeller': '🏆 Top Seller',
    'dashboard.live.noTopSeller': '—',
    'dashboard.live.topSellerHint': '{sales} ({pct}%)',

    // ─── Smart Alerts (Computed) ───
    'dashboard.alert.noSalesToday': 'No sales recorded today yet',
    'dashboard.alert.baseAchieved': 'Base target achieved ({pct}%) — push for Heroes!',
    'dashboard.alert.heroesAchieved': 'Excellent! Heroes target achieved ({pct}%)',
    // ═══════════════════════════════════════════════════════
    //  Batch 6.2c — Dashboard Targets + Inv/Pcs + Staff
    // ═══════════════════════════════════════════════════════

    // ─── Branch Targets Section ───
    'dashboard.target.title': '🎯 Branch Target',
    'dashboard.target.baseLabel': '🎯 Base Target',
    'dashboard.target.heroesLabel': '🏆 Heroes Target',
    'dashboard.target.manualExtraLabel': '💰 Manual Sales (no staff)',

    // ─── Invoice / Pieces Section ───
    'dashboard.invPcs.title': '📊 Branch Metrics — Invoices & Pieces',
    'dashboard.invPcs.subtitle': 'Enter invoice count and pieces count for the whole branch on this day',
    'dashboard.invPcs.invoicesLabel': '📄 Invoices Count',
    'dashboard.invPcs.invoicesHint': 'Total sales transactions for the day',
    'dashboard.invPcs.piecesLabel': '📦 Pieces Count',
    'dashboard.invPcs.piecesHint': 'Total pieces sold for the day',
    'dashboard.invPcs.uptLabel': '🎯 UPT — Units per Transaction',
    'dashboard.invPcs.uptHint': '{pieces} ÷ {invoices}',
    'dashboard.invPcs.atvLabel': '💰 ATV — Average Transaction Value',
    'dashboard.invPcs.atvHint': 'SAR / invoice',

    // ─── Staff Table — Section Header & Actions ───
    'dashboard.staff.title': '💰 Staff Sales Entry',
    'dashboard.staff.actions.excel': '📊 Excel',
    'dashboard.staff.actions.compare': '📊 Compare',
    'dashboard.staff.actions.markAllPresent': '✅ All Present',
    'dashboard.staff.actions.autoDistHint': '⚡ Auto Distribution',
    'dashboard.staff.actions.clearAll': '🗑️ Clear All',

    // ─── Staff Table — Empty ───
    'dashboard.staff.empty': '⚠️ No staff available',

    // ─── Staff Table — Columns ───
    'dashboard.staff.table.attendance': 'Att.',
    'dashboard.staff.table.employee': 'Employee',
    'dashboard.staff.table.target': '🎯 Target',
    'dashboard.staff.table.heroesTarget': '🏆 Heroes',
    'dashboard.staff.table.sales': '💰 Sales',
    'dashboard.staff.table.basePct': '% Base',
    'dashboard.staff.table.heroesPct': '% Heroes',

    // ─── Staff Table — Total Row ───
    'dashboard.staff.table.total': 'Total',
    'dashboard.staff.table.presentCount': '{count} present',

    // ─── Staff Table — Pagination ───
    'dashboard.staff.pagination.prev': 'Previous',
    'dashboard.staff.pagination.next': 'Next',
    'dashboard.staff.pagination.page': 'Page {current} of {total}',

    // ─── Staff Mobile Card ───
    'dashboard.staff.mobile.targetLabel': '🎯 Target',
    'dashboard.staff.mobile.heroesLabel': '🏆 Heroes',
    'dashboard.staff.mobile.salesLabel': '💰 Sales Achieved',

    // ─── Staff Avatar ───
    'dashboard.staff.avatar.uploadTitle': 'Change photo of {name}',

    // ─── Chart Section ───
    'dashboard.chart.title': '📊 Staff Sales Distribution',
    // ═══════════════════════════════════════════════════════
    //  Batch 6.2d — Daily Summary Card + Share
    // ═══════════════════════════════════════════════════════

    // ─── Summary Card Labels ───
    'summary.label.totalSales': '💰 Total Sales',
    'summary.label.baseTarget': '🎯 Base Target',
    'summary.label.heroesTarget': '🏆 Heroes Target',
    'summary.stat.invoices': '📄 Invoices',
    'summary.stat.pieces': '📦 Pieces',
    'summary.stat.upt': '🎯 UPT',
    'summary.stat.atv': '💰 ATV',
    'summary.staff.title': '👥 Staff ({count})',
    'summary.staff.anonymous': 'Staff {n}',
    'summary.footer.poweredBy': 'Powered by SAMX',
    'summary.shareBtn': '📤 Share Board',

    // ─── Summary Smart Messages ───
    'summary.msg.noTarget': '📝 No target set for today yet',
    'summary.msg.noSales': '⏰ No sales recorded today yet',
    'summary.msg.exceeded': '🎉 Excellent! Exceeded target by {extra} (+{pct}%)',
    'summary.msg.close': '💪 Close! Only {remaining} left to hit target',
    'summary.msg.low': '⚠️ Need a push tomorrow — {remaining} remaining',

    // ─── Share Modal ───
'modal.share.title': "📤 Share Today's Card",
    'modal.share.options': '⚙️ Display Options',
    'modal.share.showNames': '👤 Names',
    'modal.share.showAbsolute': '🔢 Sales Numbers',
    'modal.share.showInvoices': '📄 Invoices',
    'modal.share.showPieces': '📦 Pieces',
    'modal.share.showUPT': '🎯 UPT',
    'modal.share.showATV': '💰 ATV',
    'modal.share.sort': '📊 Staff Sort',
    'modal.share.sort.best': '🏆 Best First',
    'modal.share.sort.attendance': '📋 By Attendance',
    'modal.share.sort.alphabetical': '🔤 Alphabetical',
    'modal.share.preview': '👁️ Live Preview',
    'modal.share.btnImage': '📷 Image',
    'modal.share.btnText': '💬 Text',
    'modal.share.btnCopy': '📋',
    'modal.share.hint': '💡 Changes apply instantly to the card on the board',

    // ─── Share Text ───
    'share.text.reportTitle': '📊 {company} Sales Report',
    'share.text.branch': '🏬 {branch}',
    'share.text.dateLine': '📅 {date} • {day}',
    'share.text.totalSales': '💰 Total Sales: {amount}',
    'share.text.baseTarget': '🎯 Base Target: {amount} ({pct}%)',
    'share.text.heroesTarget': '🏆 Heroes Target: {amount} ({pct}%)',
    'share.text.invoices': '📄 Invoices: {count}',
    'share.text.pieces': '📦 Pieces: {count}',
    'share.text.upt': '🎯 UPT: {value}',
    'share.text.atv': '💰 ATV: {value}',
    'share.text.staffListHeader': '👥 Staff Performance ({sort}):',
    'share.text.sortBy.best': 'Best Sellers',
    'share.text.sortBy.attendance': 'By Attendance',
    'share.text.sortBy.alphabetical': 'Alphabetical',
    'share.text.staffBrief': '{n}. {name} — {pct}% {icon}',
    'share.text.staffFull': '{n}. {name} • {sales} • {pct}% {icon}',
'share.text.staffBrief': '{n}. {name} — {pct}% {icon}',
'share.text.staffFull': '{n}. {name} • {sales} • {pct}% {icon}',
'share.text.staffFullNoSales': '{n}. {name} • {pct}% {icon}',   // ⭐ v23.9-FIX

    // ─── Share Forecast ───
    'share.forecast.title': '📊 *Month-End Forecast*',
    'share.forecast.branch': '🏬 Branch: {branch}',
    'share.forecast.month': '📅 Month: {month}',
    'share.forecast.currentSales': '💰 Current Sales: {amount}',
    'share.forecast.avgDaily': '📈 Daily Average: {amount}',
    'share.forecast.daysRemaining': '📅 Days Remaining: {count}',
    'share.forecast.expectedSales': '🔮 *Expected Month-End: {amount}*',
    'share.forecast.target': '🎯 Target: {amount}',
    'share.forecast.expectedPct': '📊 Expected %: {pct}%',

    // ─── Share Toasts ───
    'toast.share.title': '{branch} Report',
    'toast.share.generating': '⏳ Generating image...',
    'toast.share.noData': '⚠️ No data to share',
    'toast.share.noDataCopy': '⚠️ No data to copy',
    'toast.share.noBranch': '⚠️ Select a branch first',
    'toast.share.success': '✅ Shared successfully',
    'toast.share.copied': '📋 Report copied',
    'toast.share.imageFailed': '❌ Image generation failed — check connection',
    'toast.share.imageCreateFailed': '❌ Failed to create image',
    'toast.share.imageDownloaded': '✅ Image downloaded — share it from gallery',
    'toast.share.forecastCopied': '📋 Forecast copied',
    'toast.share.notCopied': 'Copy failed — you can select manually:\n\n{text}',

    // ─── Test ───
    'test.hello': 'Welcome to SAMX',
    'test.i18nWorks': 'Translation system is working',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.2e.1 — Days + KPI View
    // ═══════════════════════════════════════════════════════

    // ─── Days of Week ───
    'days.sun': 'Sunday',
    'days.mon': 'Monday',
    'days.tue': 'Tuesday',
    'days.wed': 'Wednesday',
    'days.thu': 'Thursday',
    'days.fri': 'Friday',
    'days.sat': 'Saturday',

    // ─── KPI View ───
    'kpi.title': '🎯 KPIs',
    'kpi.subtitle': 'UPT / ATV / Achievement',
    'kpi.filter.date': '📅 Date',
    'kpi.filter.branch': '🏬 Branch',
    'kpi.filter.month': '📅 Month',
    'kpi.filter.chooseBranch': '— Select a branch —',
    'kpi.empty.selectBranch': 'Select a branch to view KPIs',
    'kpi.upt.today': '🎯 UPT — Today',
    'kpi.upt.unit': 'Units / Invoice',
    'kpi.atv.today': '💰 ATV — Today',
    'kpi.atv.unit': 'SAR / Invoice',
    'kpi.achieve.today': '🎯 Branch Achievement — Today',
    'kpi.achieve.month': '🏆 Branch Achievement — Month',
    'kpi.month.title': '📅 Monthly KPIs ({month})',
    'kpi.month.upt': '🎯 Month UPT',
    'kpi.month.atv': '💰 Month ATV',
    'kpi.month.invoices': '📄 Month Invoices',
    'kpi.month.pieces': '📦 Month Pieces',
    'kpi.month.activeDays': '📅 Active Days',
    'kpi.trend.title': '📈 Last 7 Days — UPT & ATV',
    'kpi.trend.colDate': 'Date',
    'kpi.trend.colDay': 'Day',
    'kpi.trend.colSales': '💰 Sales',
    'kpi.trend.colInvoices': '📄 Invoices',
    'kpi.trend.colPieces': '📦 Pieces',
    'kpi.trend.colUpt': '🎯 UPT',
    'kpi.trend.colAtv': '💵 ATV',
    'kpi.rank.title': "👥 Staff Ranking — Today's Achievement",
    'kpi.rank.empty': 'No data available',
    'kpi.rank.sales': '💰 Sales',
    'kpi.rank.target': '🎯 Target',
    'kpi.rank.pct': 'Achievement %',
    'kpi.staff.title': '📊 Staff Performance — Month ({month})',
    'kpi.staff.colNum': '#',
    'kpi.staff.colEmployee': 'Employee',
    'kpi.staff.colSales': '💰 Sales',
    'kpi.staff.colTarget': '🎯 Target',
    'kpi.staff.colDays': '📅 Days',
    'kpi.staff.colPct': '% Achievement',
    'kpi.noData.title': 'No data entered for this day yet',
    'kpi.noData.hint': 'Go back to Dashboard to enter sales, invoices, and pieces',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.2e.2 — Monthly View + Forecast
    // ═══════════════════════════════════════════════════════

    // ─── Monthly Header ───
    'monthly.title': '📅 Monthly Tracking',
    'monthly.subtitle': 'Monthly targets and sales',

    // ─── Monthly Filter ───
    'monthly.filter.month': '📅 Month',
    'monthly.filter.branch': '🏬 Branch',
    'monthly.filter.choose': '— Select —',
    'monthly.filter.baseTarget': '🎯 Base Target',
    'monthly.filter.heroesTarget': '🏆 Heroes Target',

    // ─── Monthly Actions ───
    'monthly.actions.import': '📥 Import Excel',
    'monthly.actions.distribute': '✏️ Manual Distribute',
    'monthly.actions.pdf': '📄 PDF',
    'monthly.actions.excel': '📊 Professional Excel',

    // ─── Monthly Empty ───
    'monthly.empty.select': 'Select a month and branch',

    // ─── Monthly Summary ───
    'monthly.summary.totalSales': '💰 Month Total',
    'monthly.summary.basePct': '🎯 Base %',
    'monthly.summary.heroesPct': '🏆 Heroes %',
    'monthly.summary.daysEntered': '📅 Days Entered',

    // ─── Monthly Forecast ───
    'monthly.forecast.title': '🔮 Month-End Forecast',
    'monthly.forecast.current': 'Current',
    'monthly.forecast.pastMonth': 'Past Month',
    'monthly.forecast.share': '📤 Share',
    'monthly.forecast.noData.title': 'No sales entered for this month yet',
    'monthly.forecast.noData.hint': 'Start entering daily sales to see the forecast',
    'monthly.forecast.basedOn': 'Based on daily average of {avg} over {days} active days',
    'monthly.forecast.currentSales': '💰 Current Sales',
    'monthly.forecast.expected': '🔮 Expected Month-End',
    'monthly.forecast.target': '🎯 Target',
    'monthly.forecast.expectedPct': '📊 Expected %',
    'monthly.forecast.currentLabel': 'Current: {value}',
    'monthly.forecast.expectedLabel': 'Expected: {value}',
    'monthly.forecast.targetLabel': 'Target: {value}',
    'monthly.forecast.pct0': '0%',
    'monthly.forecast.pct50': '50%',
    'monthly.forecast.pct100': '100% (Target)',
    'monthly.forecast.remainingDays': '📅 Days Remaining',
    'monthly.forecast.daysUnit': '{count} days',
    'monthly.forecast.ofTotalDays': 'of {total} days',
    'monthly.forecast.avgDaily': '📈 Daily Average',
    'monthly.forecast.basedOnActiveDays': 'Based on {count} active days',
    'monthly.forecast.requiredDaily': '⚡ Required Daily',
    'monthly.forecast.forTarget': 'to hit target',
    'monthly.forecast.expectedSurplus': '🎉 Expected Surplus',
    'monthly.forecast.aboveTarget': 'above target',
    'monthly.forecast.confidence': 'Confidence:',
    'monthly.forecast.confidenceHigh': '🟢 High',
    'monthly.forecast.confidenceMedium': '🟡 Medium',
    'monthly.forecast.confidenceLow': '🔴 Low',
    'monthly.forecast.hint': '💡 Forecast is approximate based on current performance',

    // ─── Forecast Status Labels ───
    'monthly.forecast.status.unavailable': 'Unavailable',
    'monthly.forecast.status.noData': 'No data yet',
    'monthly.forecast.status.excellent': 'Excellent forecast — will achieve comfortably',
    'monthly.forecast.status.achieving': 'Expected to hit target',
    'monthly.forecast.status.close': 'Close to target — needs a push',
    'monthly.forecast.status.risky': 'At risk — needs extra effort',
    'monthly.forecast.status.critical': 'Critical — far from target',

    // ─── Monthly Chart ───
    'monthly.chart.title': '📈 Sales Progress',

    // ─── Monthly Day-by-Day ───
    'monthly.days.title': '📋 Day-by-Day Breakdown',
    'monthly.days.colDate': 'Date',
    'monthly.days.colDay': 'Day',
    'monthly.days.colBase': '🎯 Base',
    'monthly.days.colHeroes': '🏆 Heroes',
    'monthly.days.colSales': '💰 Sales',
    'monthly.days.colBasePct': '% Base',
    'monthly.days.colHeroesPct': '% Heroes',
    'monthly.days.colCumulative': 'Cumulative',
    'monthly.days.today': '• Today',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.2e.3 — YoY + Analytics + Leaderboard + Admin
    // ═══════════════════════════════════════════════════════

    // ─── Months ───
    'months.1': 'January',
    'months.2': 'February',
    'months.3': 'March',
    'months.4': 'April',
    'months.5': 'May',
    'months.6': 'June',
    'months.7': 'July',
    'months.8': 'August',
    'months.9': 'September',
    'months.10': 'October',
    'months.11': 'November',
    'months.12': 'December',

    // ─── YoY View ───
    'yoy.title': '📆 Year-over-Year',
    'yoy.subtitle': 'Year-over-Year comparison (YoY)',
    'yoy.filter.year': 'Year',
    'yoy.filter.branch': 'Branch',
    'yoy.filter.choose': '— Select —',
    'yoy.actions.export': '📊 Export',
    'yoy.empty.select': 'Select a branch',
    'yoy.summary.totalCurrent': 'Total {year}',
    'yoy.summary.totalPrevious': 'Total {year}',
    'yoy.summary.growth': 'Growth Rate',
    'yoy.chart.title': '📊 {current} vs {previous}',
    'yoy.compare.title': '📋 Monthly Comparison',
    'yoy.compare.colMonth': 'Month',
    'yoy.compare.colDiff': 'Difference',
    'yoy.compare.colGrowth': 'Growth',

    // ─── Analytics View ───
    'analytics.title': '📈 Analytics',
    'analytics.subtitle': 'Sales trend analysis',
    'analytics.filter.branch': 'Branch',
    'analytics.filter.range': 'Range',
    'analytics.filter.choose': '— Select —',
    'analytics.range.7': 'Last 7 days',
    'analytics.range.14': 'Last 14 days',
    'analytics.range.30': 'Last 30 days',
    'analytics.range.90': 'Last 90 days',
    'analytics.empty.select': 'Select a branch',
    'analytics.summary.total': '📊 Range Total',
    'analytics.summary.avg': '📈 Daily Average',
    'analytics.summary.best': '🏆 Best Day',
    'analytics.summary.days': '📅 Days Count',
    'analytics.chart.title': '📈 Sales Trend',

    // ─── Leaderboard View ───
    'leaderboard.title': '🏆 Branch Ranking',
    'leaderboard.subtitle': 'Branches ranked by performance',
    'leaderboard.today.title': "Today's Ranking",
    'leaderboard.filter.date': 'Date:',
    'leaderboard.actions.excel': '📊 Excel',
    'leaderboard.empty': 'No data',

    // ─── Admin View ───
    'admin.title': '👑 Admin Panel',
    'admin.subtitle': 'Comprehensive view of all branches',
    'admin.totals.title': '📊 Branches Overview',
    'admin.totals.date': 'Date:',
    'admin.kpi.totalBranches': '🏬 Total Branches',
    'admin.kpi.totalSales': '💰 Total Sales',
    'admin.kpi.achieved': '✅ Branches Achieved Target',
    'admin.kpi.lagging': '⚠️ Lagging Branches',
    'admin.status.title': '📋 Branches Status',
    'admin.branch.staffCount': '{count} staff',
    'admin.branch.presentCount': '{count} present',
    'admin.branch.base': '🎯 Base',
    'admin.branch.heroes': '🏆 Heroes',
    'admin.status.unrecorded': 'Not Recorded',
    'admin.status.excellent': '✅ Excellent',
    'admin.status.good': '⚠️ Good',
    'admin.status.late': '🚨 Late',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.3a — Branches + Staff + Users
    // ═══════════════════════════════════════════════════════

    // ─── Branches View ───
    'branches.title': '🏬 Branch Management',
    'branches.subtitle': '{count} branches registered',
    'branches.noPermission': '⛔ No permission',
    'branches.importQuick.title': '📥 Quick Import from Excel',
    'branches.importQuick.sub': 'Import branches and staff at once from an Excel file',
    'branches.importQuick.btn': '📥 Upload Excel File',
    'branches.form.addTitle': '➕ Add Branch',
    'branches.form.editTitle': '✏️ Edit Branch',
    'branches.form.name': 'Name',
    'branches.form.code': 'Code',
    'branches.errors.nameCode': 'Enter name and code',
    'branches.errors.codeUsed': 'Code already in use',
    'branches.toast.edited': 'Updated',
    'branches.toast.added': 'Added',
    'branches.toast.deleted': 'Deleted',
    'branches.confirm.delete': 'Delete branch? Its staff and data will be deleted.',
    'branches.list.title': '📋 Branches ({count})',
    'branches.list.empty': 'No results',
    'branches.list.info': 'Code: {code} • Staff: {count}',

    // ─── Staff View ───
    'staffView.title': '👥 Staff Management',
    'staffView.subtitle': '{count} staff registered',
    'staffView.noPermission': '⛔ No permission',
    'staffView.form.addTitle': '➕ Add Staff',
    'staffView.form.editTitle': '✏️ Edit Staff',
    'staffView.form.name': 'Name',
    'staffView.form.code': 'Employee ID',
    'staffView.form.jobTitle': 'Job Title',
    'staffView.form.branch': 'Branch',
    'staffView.form.choose': '— Select —',
    'staffView.errors.incomplete': 'Complete all fields',
    'staffView.toast.edited': 'Updated',
    'staffView.toast.added': 'Added',
    'staffView.toast.deleted': 'Deleted',
    'staffView.confirm.delete': 'Delete staff member?',
    'staffView.list.title': '👥 Staff ({count})',
    'staffView.list.searchPlaceholder': '🔍 Search by name or ID...',
    'staffView.list.colPhoto': 'Photo',
    'staffView.list.colName': 'Name',
    'staffView.list.colJob': 'Job Title',
    'staffView.list.colCode': 'ID',
    'staffView.list.colBranch': 'Branch',
    'staffView.list.colActions': 'Actions',

    // ─── Users View ───
    'users.title': '🔐 User Management',
    'users.subtitle': '{count} users',
    'users.noPermission': '⛔ Admin only',
    'users.form.addTitle': '➕ Add User',
    'users.form.editTitle': '✏️ Edit',
    'users.form.fullName': 'Full Name',
    'users.form.username': 'Username',
    'users.form.password': 'Password',
    'users.form.role': 'Role',
    'users.form.branch': 'Branch',
    'users.form.choose': '— Select —',
    'users.form.permissions': '🔐 Permissions',
    'users.errors.nameUser': 'Enter name and username',
    'users.errors.passwordShort': 'Password must be at least 4 characters',
    'users.errors.userExists': 'Username already exists',
    'users.toast.edited': 'Updated',
    'users.toast.added': 'Added',
    'users.toast.deleted': 'Deleted',
    'users.toast.cannotDeleteSelf': '⚠️ You cannot delete your current account',
    'users.toast.cannotDeleteLastAdmin': '⚠️ Cannot delete the last admin in the system',
    'users.confirm.delete': 'Delete user "{name}"?',
    'users.list.title': '👤 Users ({count})',
    'users.list.you': '(You)',
    'users.list.colName': 'Name',
    'users.list.colUser': 'Username',
    'users.list.colRole': 'Role',
    'users.list.colBranch': 'Branch',
    'users.list.colActions': 'Actions',

    // ─── Permissions ───
    'permissions.enterDailySales': 'Enter Daily Sales',
    'permissions.editTarget': 'Edit Target',
    'permissions.manageBranches': 'Manage Branches',
    'permissions.manageStaff': 'Manage Staff',
    'permissions.exportReports': 'Export Reports',
    'permissions.viewFinancialReports': 'View Financial Reports',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.3b.1 — Settings Modal: Shell + Appearance + Colors + Layout
    // ═══════════════════════════════════════════════════════

    // ─── Settings Modal Shell ───
    'settings.title': '⚙️ Settings',
    'settings.saveFooter': '💾 Save Settings',
    'settings.closeFooter': 'Close',

    // ─── Settings Tabs (labels only) ───
    'settings.tabs.appearance': 'Theme & Display',
    'settings.tabs.identity': 'Branding & Info',
    'settings.tabs.labels': 'Sector & Labels',
    'settings.tabs.system': 'System & Data',
    'settings.tabs.colors': 'Colors',
    'settings.tabs.layout': 'Layout',
    'settings.tabs.language': 'Language',
    'settings.tabs.about': 'About',
    'settings.tabs.data': 'Data',

    // ─── Appearance Tab ───
    'settings.appearance.fontSize': '📝 Font Size',
    'settings.appearance.small': 'Small',
    'settings.appearance.large': 'Large',
    'settings.appearance.currentSize': 'Current size: {size}px',
    'settings.appearance.fontFamily': '🔤 Font Family',
    'settings.appearance.density': '📐 UI Density',
    'settings.appearance.density.compact': 'Compact',
    'settings.appearance.density.normal': 'Normal',
    'settings.appearance.density.cozy': 'Cozy',
    'settings.appearance.currencyFormat': '💰 Currency Symbol Format',
    'settings.appearance.currencySymbol': 'Official Symbol (⃁)',
    'settings.appearance.currencyText': 'Text Format (SAR)',
    'settings.appearance.currencyHint': 'The official Saudi Riyal symbol is supported on all mobile & desktop devices.',
    'settings.appearance.presets': '🎨 Theme Presets',
    'settings.appearance.mode': '🌗 Mode',
    'settings.appearance.mode.dark': '🌙 Dark',
    'settings.appearance.mode.light': '☀️ Light',
    'settings.appearance.mode.auto': '🔄 Auto',
    'settings.appearance.lightTheme': '🎨 Light Mode Style',
    'settings.appearance.lightTheme.classic': '🌞 Classic',
    'settings.appearance.lightTheme.warm': '🍦 Warm',
    'settings.appearance.lightTheme.gray': '🌫️ Gray',

    // ─── Colors Tab ───
    'settings.colors.title': '🎨 Primary Brand Color',
    'settings.colors.subtitle': 'Applied to buttons and highlighted elements',

    // ─── Layout Tab ───
    'settings.layout.staffPerPage': '👥 Staff per Page',
    'settings.layout.autoDist': '⚡ Auto Target Distribution',
    'settings.layout.autoDist.desc': 'When enabled, branch target is automatically distributed among present staff.',
    'settings.layout.autoDist.on': '✅ Enabled',
    'settings.layout.autoDist.off': '⛔ Disabled',

    // ─── Theme Presets (Names + Descriptions) ───
    'theme.shiaka-gold.name': 'Shiaka Gold',
    'theme.shiaka-gold.desc': 'Official theme — gold and navy',
    'theme.royal-blue.name': 'Royal Blue',
    'theme.royal-blue.desc': 'Professional and elegant',
    'theme.emerald-fresh.name': 'Emerald Fresh',
    'theme.emerald-fresh.desc': 'Easy on the eyes',
    'theme.elegant-light.name': 'Classic Light',
    'theme.elegant-light.desc': 'Pure white and elegant',
    'theme.warm-light.name': 'Warm Light',
    'theme.warm-light.desc': 'Comfortable beige',
    'theme.violet-lux.name': 'Violet Lux',
    'theme.violet-lux.desc': 'Luxurious and distinctive',

    // ─── Color Palette Names ───
    'color.gold': 'Gold',
    'color.royal': 'Royal Blue',
    'color.emerald': 'Emerald',
    'color.violet': 'Violet',
    'color.orange': 'Orange',
    'color.crimson': 'Crimson',
    'color.teal': 'Teal',
    'color.black': 'Elegant Black',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.3b.2 — Identity + Labels + Language Info + About + Data
    // ═══════════════════════════════════════════════════════

    // ─── Identity Tab ───
    'settings.identity.intro.title': '🏢 Your Company Identity',
    'settings.identity.intro.desc': 'Customize logo, name, and copyright — they will appear everywhere in the app (UI + reports).',
    'settings.identity.logo.title': '🖼️ Company Logo',
    'settings.identity.logo.preview': 'Preview',
    'settings.identity.logo.upload': '📁 Upload New Logo',
    'settings.identity.logo.remove': '🗑️ Remove Custom Logo',
    'settings.identity.logo.specs': '📏 Recommended size: 512×512 px',
    'settings.identity.logo.formats': '🎨 Supported formats: PNG • JPG • SVG • WebP',
    'settings.identity.logo.maxSize': '⚠️ Max size: 500 KB',
    'settings.identity.info.title': '📝 Company Information',
    'settings.identity.info.companyName': '🏢 Company Name',
    'settings.identity.info.companyDesc': '💬 Short Description',
    'settings.identity.info.copyright': '©️ Copyright Text',
    'settings.identity.info.namePlaceholder': 'e.g. SAMX',
    'settings.identity.info.descPlaceholder': 'e.g. Sales Management',
    'settings.identity.info.copyrightPlaceholder': 'e.g. © 2026 SAMX',
    'settings.identity.info.save': '💾 Save Changes',
    'settings.identity.wizard.title': '🧙 Setup Wizard',
    'settings.identity.wizard.desc': 'Restart the wizard to update your data step by step.',
    'settings.identity.wizard.restart': '🚀 Restart Wizard',
    'settings.identity.manage.title': '⚙️ Identity Management',
    'settings.identity.manage.export': '📤 Export Identity (JSON)',
    'settings.identity.manage.import': '📥 Import Identity',
    'settings.identity.manage.reset': '🔄 Reset to Default',

    // ─── Labels Tab ───
    'settings.labels.intro.title': '🏷️ Your Company Labels',
    'settings.labels.intro.desc': 'Customize terms to fit your sector. Pick a template or edit manually.',
    'settings.labels.templates.title': '🎯 Ready Templates',
    'settings.labels.edit.title': '✏️ Edit Labels',
    'settings.labels.edit.branch': '🏬 Branch (singular)',
    'settings.labels.edit.branchPlural': '🏬 Branches (plural)',
    'settings.labels.edit.staff': '👤 Staff (singular)',
    'settings.labels.edit.staffPlural': '👥 Staff (plural)',
    'settings.labels.edit.invoice': '📄 Invoice (singular)',
    'settings.labels.edit.invoicePlural': '📄 Invoices (plural)',
    'settings.labels.edit.piece': '📦 Piece (singular)',
    'settings.labels.edit.piecePlural': '📦 Pieces (plural)',
    'settings.labels.edit.target': '🎯 Target',
    'settings.labels.edit.manager': '👔 Manager',
    'settings.labels.edit.hint': '💾 Auto-save — changes apply instantly',

    // ─── Sector Templates ───
    'sector.general.name': 'General',
    'sector.general.desc': 'Fits any company',
    'sector.retail.name': 'Retail / Stores',
    'sector.retail.desc': 'Store • Seller • Pieces',
    'sector.restaurant.name': 'Restaurants / Cafes',
    'sector.restaurant.desc': 'Branch • Waiter • Orders',
    'sector.pharmacy.name': 'Pharmacies',
    'sector.pharmacy.desc': 'Pharmacy • Pharmacist • Prescriptions',
    'sector.custom.name': 'Custom',
    'sector.custom.desc': 'Full manual editing',

    // ─── Language Tab (extra info) ───
    'settings.language.intro.title': '🌍 App Language',
    'settings.language.intro.desc': 'Choose the app interface language. Texts are translated automatically via i18n.',
    'settings.language.choose': '🗣️ Choose Language',
    'settings.language.info.title': 'ℹ️ Information',
    'settings.language.info.current': 'Current Language',
    'settings.language.info.dir': 'Direction',
    'settings.language.info.keys': 'Translated Keys Count',
    'settings.language.ar': 'العربية',
    'settings.language.en': 'English',
    'settings.language.arDesc': 'RTL — Right to Left',
    'settings.language.enDesc': 'LTR — Left to Right',
    'settings.language.active': '✓ مفعَّلة',
    'settings.language.activeEn': '✓ Active',
    'settings.language.warning.title': '⚠️ Important Note',
    'settings.language.warning.desc': 'Some screens are not fully migrated yet — we are working on it gradually.',

    // ─── About Tab ───
    'settings.about.tagline': 'An integrated system for sales management',
    'settings.about.version': 'Version',
    'settings.about.owner.title': '👤 Owner',
    'settings.about.owner.name': 'Name',
    'settings.about.dev.title': '👨‍💻 Developer',
    'settings.about.dev.name': 'Name',
    'settings.about.contact.title': '📞 Contact & Support',
    'settings.about.contact.whatsapp': 'Support WhatsApp',
    'settings.about.contact.email': 'Email',
    'settings.about.copyright.title': '📜 Copyright',
    'settings.about.copyright.reserved': 'All rights reserved',
    'settings.about.copyright.protected': 'This app is protected by intellectual property rights',

    // ─── Data Tab ───
    'settings.data.title': '💾 Data Management',
    'settings.data.export': '📤 Export Settings (JSON)',
    'settings.data.import': '📥 Import Settings',
    'settings.data.reset': '🔄 Reset Settings',
    'settings.data.storage.title': '📊 Storage Info',
    'settings.data.storage.branches': 'Branches',
    'settings.data.storage.staff': 'Staff',
    'settings.data.storage.days': 'Recorded Days',
    'settings.data.storage.backups': 'Backups',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.3c — Search + Compare + Activity + Backup + Import + Bulk
    // ═══════════════════════════════════════════════════════

    // ─── Search Modal ───
    'search.placeholder': 'Search branches, staff, users...',
    'search.empty.title': 'Type to search all data',
    'search.empty.sub': 'Branches • Staff • Users',
    'search.noResults': 'No results for "{query}"',
    'search.group.branches': '🏬 Branches',
    'search.group.staff': '👥 Staff',
    'search.group.users': '🔐 Users',
    'search.type.branch': 'Branch',
    'search.type.staff': 'Staff',
    'search.type.user': 'User',
    'search.subtitle.branch': 'Code: {code} • {count} staff',
    'search.subtitle.staff': '{job} • {branch} • ID: {code}',
    'search.subtitle.user': '@{username} • {role}',

    // ─── Compare Modal ───
    'modal.compare.title': '📊 Staff Comparison',
    'modal.compare.noBranch': 'Select a branch first',
    'modal.compare.noStaff': 'No staff in this branch',
    'modal.compare.subtitle': 'Ranking staff of branch {branch} on {date}',
    'modal.compare.sales': '💰 Sales',
    'modal.compare.target': '🎯 Target',
    'modal.compare.achievement': '📊 Achievement',
    'modal.compare.heroes': '🏆 Heroes',

    // ─── Activity Log Modal ───
    'modal.activity.title': '📜 Activity Log',
    'modal.activity.empty': 'No activity',
    'modal.activity.clear': '🗑️ Clear Log',

    // ─── Backup Modal ───
    'modal.backup.title': '💾 Backup',
    'modal.backup.info': '✅ Auto backups every hour + daily backup',
    'modal.backup.export': '⬇️ Export Backup (JSON)',
    'modal.backup.import': '⬆️ Import Backup',
    'modal.backup.auto.header': '📚 Auto Backups ({count})',
    'modal.backup.auto.empty': 'None',
    'modal.backup.auto.restore': 'Restore',
    'modal.backup.clearAll': '🗑️ Clear All',

    // ─── Import Modal (Monthly Target) ───
    'modal.import.title': '📥 Import Monthly Target',
    'modal.import.format.title': '📋 Supported Formats:',
    'modal.import.format.basic': '• Row BASIC: Base Target',
    'modal.import.format.challenge': '• Row Challenge: Heroes Target',
    'modal.import.format.branch': '• Each branch with its code and name',
    'modal.import.chooseFile': '📁 Choose Excel File',
    'modal.import.meta.month': '📅 Detected Month',
    'modal.import.meta.days': '📆 Days Count',
    'modal.import.meta.basic': '✅ BASIC',
    'modal.import.meta.challenge': '🏆 Challenge',
    'modal.import.meta.exists': 'Present',
    'modal.import.meta.missing': 'Not present',
    'modal.import.stats.matched': '✅ Matched Branches',
    'modal.import.stats.unmatched': '⚠️ Unmatched (skipped)',
    'modal.import.stats.conflicts': '🔔 Have data',
    'modal.import.unmatched.header': '⚠️ Branches in file not in system (will be skipped):',
    'modal.import.unmatched.more': '... and {count} more',
    'modal.import.conflicts.header': '🔔 Branches with existing data in {month} (will be replaced):',
    'modal.import.preview.header': '📋 Matched Branches ({count})',
    'modal.import.col.code': 'Code',
    'modal.import.col.name': 'Branch Name',
    'modal.import.col.basic': '🎯 BASIC',
    'modal.import.col.challenge': '🏆 Challenge',
    'modal.import.col.status': 'Status',
    'modal.import.note': '⚠️ The ⚠️ symbol indicates a mismatch between "Month Total" column and the sum of daily columns — the sum will be used (more accurate).',
    'modal.import.confirm': '✅ Confirm Import ({count} branches)',
    'modal.import.cancel': 'Cancel',

    // ─── Bulk Import Modal ───
    'modal.bulk.title': '📥 Import Branches & Staff',
    'modal.bulk.format.title': '📋 Required File Format:',
    'modal.bulk.format.colA': 'Column A: Branch Code',
    'modal.bulk.format.colB': 'Column B: Branch Name',
    'modal.bulk.format.colC': 'Column C: Staff Name',
    'modal.bulk.format.colD': 'Column D: Employee ID',
    'modal.bulk.format.colE': 'Column E (optional): Job Title',
    'modal.bulk.format.jobs': '💼 Available Job Titles:',
    'modal.bulk.format.jobsDefault': 'If Column E is empty → defaults to "بائع"',
    'modal.bulk.format.skipFirst': '⚠️ First row is treated as headers and skipped',
    'modal.bulk.chooseFile': '📁 Choose Excel File (.xlsx / .xls / .csv)',
    'modal.bulk.preview.title': '👁️ Import Preview',
    'modal.bulk.stats.newBranches': 'New Branches',
    'modal.bulk.stats.existingBranches': 'Existing Branches',
    'modal.bulk.stats.newStaff': 'New Staff',
    'modal.bulk.stats.duplicates': 'Duplicates (skipped)',
    'modal.bulk.newBranches.header': '✨ New Branches:',
    'modal.bulk.existingBranches.header': '🔄 Existing Branches (staff will be added):',
    'modal.bulk.existingBranches.count': '{count} staff',
    'modal.bulk.newStaff.header': '👥 New Staff ({count})',
    'modal.bulk.newStaff.hint': 'You can edit each staff member\'s job title 👇',
    'modal.bulk.col.employee': 'Employee',
    'modal.bulk.col.code': 'ID',
    'modal.bulk.col.branch': 'Branch',
    'modal.bulk.col.jobTitle': '💼 Job Title',
    'modal.bulk.duplicates.header': '⚠️ Duplicate Staff (will be skipped):',
    'modal.bulk.duplicates.more': '... and {count} more',
    'modal.bulk.conflicts.title': '⚠️ Warnings:',
    'modal.bulk.confirm': '✅ Confirm Import ({branches} branches + {staff} staff)',
    'modal.bulk.cancel': 'Cancel',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.4a.1 — Confirm + Alert dialogs
    // ═══════════════════════════════════════════════════════

    // ─── Confirm dialogs ───
    'confirm.logout': 'Log out?',
    'confirm.restoreBackup': 'Restore backup from {date}?',
    'confirm.clearActivityLog': 'Clear activity log?',
    'confirm.distributeTargets': 'Distribute target to present staff?',
    'confirm.clearAllSales': 'Reset all sales?',
    'confirm.clearAllDistDays': 'Reset all values?',
    'confirm.clearDistribution': 'Remove distribution?',
    'confirm.removeLogo': 'Remove custom logo and revert to default?',
    'confirm.applySectorTemplate': 'Apply template "{name}"?\n\nAll current labels will be replaced.',
    'confirm.resetBranding': 'Reset identity to default (SAMX)?',
    'confirm.restartWizard': 'Restart the setup wizard?\n\nNote: Current data will not be deleted.',
    'confirm.importBranding': 'Replace current identity?',
    'confirm.importBackup': 'Replace current data?',
    'confirm.clearAllData': 'Delete all data?',
    'confirm.clearAllDataFinal': 'Final confirmation — cannot be undone!',
    'confirm.importSettings': 'Replace current settings?',
    'confirm.resetSettings': 'Reset all settings to defaults?',
    'confirm.removeStaffPhoto': 'Delete staff photo?',

    // ─── Alert dialogs ───
    'alert.excel.libFailed': '⚠️ Failed to load Excel library — check your internet connection',
    'alert.excel.sheetNotFound': '⚠️ Sheet "BASIC" or "Challenge" not found in file.',
    'alert.excel.readError': 'Error reading file: {error}',
    'alert.excel.emptyFile': 'File is empty or contains no data',
    'alert.excel.insufficientRows': 'File does not contain enough data rows',
    'alert.excel.noDateColumns': '⚠️ No date columns found in file.',
    'alert.import.noMonth': 'Month could not be determined',
    'alert.bulk.emptyFile': 'File is empty or contains no valid data',
    'alert.bulk.nothingToImport': 'Nothing to import',
    'alert.setup.completeError': 'Error completing setup: {error}',
    'alert.logo.sizeTooLarge': 'Logo size is too large. Max 500 KB',
    'alert.logo.unsupportedFormat': 'Unsupported logo format. Use PNG, JPG, SVG, or WebP',
    'alert.photo.sizeTooLarge': 'Photo size is too large. Max 500 KB',

    // ─── Confirm dialogs with dynamic counts (Import) ───
    'confirm.import.conflicts': '⚠️ Important Notice\n\nThere are {count} branches with existing data in month {month}:\n{names}\n\nAll existing data will be replaced.\n\nContinue?',
    'confirm.import.conflicts.extra': ' and {count} more',
    'confirm.import.mismatched': '⚠️ There are {count} branches with a mismatch between the "Month Total" column and the sum of daily columns.\n\nThe sum computed from daily columns will be used (more accurate).\n\nContinue?',
    'confirm.import.final': 'Will import:\n• {branches} matched branches\n• Month: {month}\n• Days count: {days}\n\nContinue?',
    'confirm.bulk.invalidJobs': '⚠️ There are {count} staff with unknown job titles.\n\nThey will be set to "بائع" automatically.\n\nContinue?',
    'confirm.bulk.final': 'Will import:\n• {branches} new branches\n• {staff} new staff\n\nContinue?',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.4a.2 — Toast Messages
    // ═══════════════════════════════════════════════════════

    // ─── Login / Session ───
    'toast.login.welcome': 'Welcome {name}',

    // ─── Settings ───
    'toast.settings.saved': '✅ Settings saved',
    'toast.settings.reset': '🔄 Reset complete',
    'toast.settings.exported': '📤 Settings exported',
    'toast.settings.imported': '📥 Settings imported',

    // ─── Theme / Appearance ───
    'toast.theme.dark': '🌙 Dark mode',
    'toast.theme.light': '☀️ Light mode',
    'toast.theme.auto': '🔄 Auto mode',
    'toast.theme.applied': '🎨 Theme "{name}" applied',
    'toast.theme.colorChanged': '🎨 Color changed to {name}',

    // ─── Attendance / Distribution ───
    'toast.attendance.allPresent': 'All present ✅',
    'toast.attendance.distributed': 'Distributed to {count} present',
    'toast.distribution.saved': 'Saved ({count} days)',
    'toast.distribution.cleared': 'Removed',
    'toast.distribution.evenly': 'Evenly distributed',
    'toast.sales.reset': 'Reset complete',

    // ─── PWA / Connection ───
    'toast.pwa.installed': '✅ Installed',
    'toast.pwa.appInstalled': '✅ App installed',
    'toast.pwa.manualHint': 'Open browser menu → "Add to Home Screen"',
    'toast.connection.online': '🟢 Online',
    'toast.connection.offline': '🔴 Offline — data saved locally',

    // ─── Backup ───
    'toast.backup.trimmed': '⚠️ Backups reduced to save space',
    'toast.backup.noSpace': '⚠️ No space available — old backups deleted',
    'toast.backup.restored': '✅ Restored',
    'toast.backup.exported': 'Exported',
    'toast.backup.imported': 'Imported',
    'toast.backup.cleared': 'Deleted',

    // ─── Lock ───
    'toast.lock.unlocked': '🔓 Unlocked',

    // ─── Import / Bulk ───
    'toast.import.loaded': '✅ Loaded {matched} matched branches{unmatched}{conflicts}',
    'toast.import.unmatchedPart': ' • {count} unmatched',
    'toast.import.conflictsPart': ' • {count} have data',
    'toast.import.success': '✅ Imported {branches} branches and {days} daily distributions',
    'toast.bulk.success': '✅ Imported {branches} branches and {staff} staff',

    // ─── Navigation ───
    'toast.date.navigated': '📅 Navigated to {date} — you can edit data',
    'toast.search.navigated': '↗️ Navigated to {title}',

    // ─── Staff Photo ───
    'toast.photo.uploaded': '📸 Photo uploaded',
    'toast.photo.deleted': '🗑️ Photo deleted',

    // ─── Branding / Identity ───
    'toast.branding.saved': '✅ Identity saved',
    'toast.branding.logoUploaded': '🖼️ Logo uploaded successfully',
    'toast.branding.logoRemoved': '🗑️ Logo removed',
    'toast.branding.templateApplied': '✅ Template "{name}" applied',
    'toast.branding.customMode': '⚙️ You can edit each label manually',
    'toast.branding.exported': '📤 Identity exported',
    'toast.branding.imported': '📥 Identity imported',
    'toast.branding.reset': '🔄 Reset complete',

    // ─── Migration ───
    'toast.migration.success': '✅ Data migrated automatically ({count} items)',

    // ─── Setup Wizard ───
    'toast.setup.completed': '🎉 App setup completed successfully!',
    'toast.setup.logoUploaded': '🖼️ Logo uploaded',
    'toast.setup.incomplete': '⚠️ Complete the required fields',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.4a.3 — Notifications + Morning Alert + Log Activity
    // ═══════════════════════════════════════════════════════

    // ─── Notifications (Smart) ───
    'notif.branchesNotRecorded.title': '⏰ Branches missing sales today',
    'notif.branchesNotRecorded.bodyOne': 'Branch {branch} has not recorded yet',
    'notif.branchesNotRecorded.bodyMany': '{count} branches have not recorded yet: {list}',
    'notif.branchesNotRecorded.ellipsis': '...',
    'notif.heroesTarget.title': '🏆 Heroes Target!',
    'notif.heroesTarget.body': 'Branch {branch} achieved {pct}%',
    'notif.lowAchievement.title': '⚠️ Low achievement',
    'notif.lowAchievement.body': 'Branch {branch} is at {pct}% only',
    'notif.confetti.title': '🎉 Heroes Target!',
    'notif.confetti.body': 'Heroes target achieved ({pct}%)',

    // ─── Morning Alert ───
    'morning.oneBranch': 'No sales entered yesterday for branch: {branch}',
    'morning.manyBranches': 'No sales entered yesterday for {count} branches: {list}',
    'morning.manyMore': ' and {count} more',
    'morning.listSeparator': ', ',

    // ─── Activity Log (Action Titles) ───
    'log.unknown': 'Unknown',
    'log.login': 'Login',
    'log.logout': 'Logout',
    'log.branch.add': 'Add Branch',
    'log.branch.edit': 'Edit Branch',
    'log.branch.delete': 'Delete Branch',
    'log.staff.add': 'Add Staff',
    'log.staff.edit': 'Edit Staff',
    'log.staff.delete': 'Delete Staff',
    'log.user.add': 'Add User',
    'log.user.edit': 'Edit User',
    'log.user.delete': 'Delete User',
    'log.settings.edit': 'Edit Settings',
    'log.settings.updated': 'General settings updated',
    'log.excel.daily': 'Export Excel',
    'log.excel.monthly': 'Export Monthly Excel',
    'log.distribution.manual': 'Manual Distribution',
    'log.import.monthly': 'Import Monthly Target',
    'log.import.bulk': 'Import from Excel',
    'log.template.apply': 'Apply Sector Template',
    'log.branding.edit': 'Edit Identity',
    'log.branding.edited': 'Company info updated',
    'log.branding.logoUpdate': 'Update Logo',
    'log.branding.logoDelete': 'Delete Logo',
    'log.branding.reset': 'Reset Identity',
    'log.setup.branchAdded': 'Add Branch (Wizard)',
    'log.setup.completed': 'Complete Setup Wizard',
    'log.backup.export': 'Export Backup',
    'log.backup.import': 'Import Backup',
    'log.backup.importDetails': '{branches} branches, {staff} staff',
    'log.clearAll': 'Delete All Data',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.4b.1 — PDF + CSV Exports
    // ═══════════════════════════════════════════════════════

    // ─── Shared Report Keys (KPIs) ───
    'report.kpi.totalSales': 'Total Sales',
    'report.kpi.baseTarget': '🎯 Base Target',
    'report.kpi.heroesTarget': '🏆 Heroes Target',
    'report.kpi.invoices': '📄 Invoices',
    'report.kpi.pieces': '📦 Pieces',
    'report.kpi.upt': '🎯 UPT',
    'report.kpi.atv': '💰 ATV',
    'report.kpi.attendance': 'Attendance',
    'report.kpi.basePct': '📊 Base %',
    'report.kpi.heroesPct': '📊 Heroes %',
    'report.kpi.daysEntered': '📅 Days Entered',

    // ─── Shared Report Keys (Row Status) ───
    'report.present': 'Present',
    'report.absent': 'Absent',
    'report.total': 'Total',
    'report.presentCount': '{count} present',

    // ─── Shared Report Keys (Column Headers) ───
    'report.col.num': '#',
    'report.col.employee': 'Employee',
    'report.col.jobTitle': 'Job',
    'report.col.jobTitleFull': 'Job Title',
    'report.col.attendance': 'Attendance',
    'report.col.target': '🎯 Target',
    'report.col.targetSimple': 'Target',
    'report.col.heroesTarget': '🏆 Heroes',
    'report.col.heroesTargetFull': 'Heroes Target',
    'report.col.sales': 'Sales',
    'report.col.basePct': '% Base',
    'report.col.heroesPct': '% Heroes',
    'report.col.basePctShort': '% B',
    'report.col.heroesPctShort': '% H',
    'report.col.date': 'Date',
    'report.col.day': 'Day',
    'report.col.base': '🎯 Base',
    'report.col.heroes': '🏆 Heroes',
    'report.col.cumulative': 'Cumulative',
    'report.col.branch': 'Branch',

    // ─── PDF Daily Report ───
    'pdf.daily.title': 'Daily Sales Report - {company}',
    'pdf.daily.branch': 'Branch: {name} ({code})',
    'pdf.daily.date': 'Date: {date} • {day}',

    // ─── PDF Monthly Report ───
    'pdf.monthly.title': 'Monthly Sales Report - {company}',
    'pdf.monthly.branchMonth': 'Branch: {name} • Month: {month}',

    // ─── PDF Toasts ───
    'toast.pdf.preparing': 'Preparing...',
    'toast.pdf.exported': 'Exported',
    'toast.pdf.csvFallback': '⚠️ PDF setup failed — exporting as CSV',

    // ─── CSV Daily Report ───
    'csv.daily.title': 'Daily Report - {branch} - {date}',
    'csv.totalSalesLine': 'Branch Total',
    'csv.baseLine': '🎯 Base',
    'csv.heroesLine': '🏆 Heroes',
    'csv.basePctLine': '% Base',
    'csv.heroesPctLine': '% Heroes',
    'csv.invoicesLine': '📄 Invoices',
    'csv.piecesLine': '📦 Pieces',
    'csv.uptLine': 'UPT',
    'csv.atvLine': 'ATV',

    // ─── CSV Monthly Report ───
    'csv.monthly.title': 'Monthly Report - {branch} - {month}',

    // ─── CSV YoY Report ───
    'csv.yoy.title': 'YoY Comparison - {branch} - {current} vs {previous}',
    'csv.yoy.colMonth': 'Month',
    'csv.yoy.colDiff': 'Difference',
    'csv.yoy.colGrowth': 'Growth %',
    'csv.yoy.totalCurrent': 'Total {year}',
    'csv.yoy.totalPrevious': 'Total {year}',
    'csv.yoy.growthLine': 'Growth',

    // ─── CSV Toasts ───
    'toast.csv.exported': 'Exported',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.4b.2 — Excel Exports (Daily + Monthly + Leaderboard)
    // ═══════════════════════════════════════════════════════

    // ─── Excel Common ───
    'excel.code': 'Code',
    'excel.date': 'Date',
    'excel.day': 'Day',

    // ─── Excel Daily Report ───
    'excel.daily.title': 'Daily Sales Report - {branch}',
    'excel.daily.sheetName': 'Daily Report',
    'excel.daily.kpi.totalSales': '💰 Total Sales',
    'excel.daily.kpi.baseTarget': '🎯 Base Target',
    'excel.daily.kpi.heroesTarget': '🏆 Heroes Target',
    'excel.daily.kpi.basePct': '📊 Base %',
    'excel.daily.kpi.heroesPct': '🏆 Heroes %',
    'excel.daily.kpi.invoices': '📄 Invoices',
    'excel.daily.kpi.pieces': '📦 Pieces',
    'excel.daily.kpi.upt': '🎯 UPT',
    'excel.daily.kpi.atv': '💰 ATV',
    'excel.daily.kpi.attendance': '👥 Attendance',
    'excel.daily.col.num': '#',
    'excel.daily.col.employee': 'Employee',
    'excel.daily.col.jobTitle': 'Job Title',
    'excel.daily.col.attendance': 'Attendance',
    'excel.daily.col.target': 'Target',
    'excel.daily.col.heroesTarget': 'Heroes Target',
    'excel.daily.col.sales': 'Sales',
    'excel.daily.col.basePct': '% Base',
    'excel.daily.col.heroesPct': '% Heroes',
    'excel.daily.col.total': 'Total',
    'excel.daily.col.presentCount': '{count} present',
    'excel.daily.row.present': 'Present',
    'excel.daily.row.absent': 'Absent',

    // ─── Excel Monthly Report — Sheet 1 (Summary) ───
    'excel.monthly.title': 'Month {month} Report - {branch}',
    'excel.monthly.summarySheet': '📊 Summary',
    'excel.monthly.kpi.totalSales': '💰 Total Sales',
    'excel.monthly.kpi.baseTarget': '🎯 Base Target',
    'excel.monthly.kpi.heroesTarget': '🏆 Heroes Target',
    'excel.monthly.kpi.basePct': '📊 Base %',
    'excel.monthly.kpi.heroesPct': '📊 Heroes %',
    'excel.monthly.kpi.daysEntered': '📅 Days Entered',
    'excel.monthly.forecast.title': '🔮 Month-End Forecast',
    'excel.monthly.forecast.expected': '📈 Expected',
    'excel.monthly.forecast.expectedPct': '📊 Expected %',
    'excel.monthly.forecast.requiredDaily': '⚡ Required Daily',

    // ─── Excel Monthly Report — Sheet 2 (Days) ───
    'excel.monthly.daysSheet': '📅 Day-by-Day',
    'excel.monthly.days.title': '📅 Day-by-Day Breakdown',
    'excel.monthly.days.col.date': 'Date',
    'excel.monthly.days.col.day': 'Day',
    'excel.monthly.days.col.baseTarget': 'Base Target',
    'excel.monthly.days.col.heroesTarget': 'Heroes Target',
    'excel.monthly.days.col.sales': 'Sales',
    'excel.monthly.days.col.basePct': '% Base',
    'excel.monthly.days.col.heroesPct': '% Heroes',
    'excel.monthly.days.col.cumulative': 'Cumulative',

    // ─── Excel Leaderboard ───
    'excel.leaderboard.title': '🏆 Branch Ranking',
    'excel.leaderboard.sheetName': '🏆 Ranking',
    'excel.leaderboard.col.num': '#',
    'excel.leaderboard.col.branch': 'Branch',
    'excel.leaderboard.col.sales': 'Sales',
    'excel.leaderboard.col.target': 'Target',
    'excel.leaderboard.col.heroesTarget': 'Heroes Target',
    'excel.leaderboard.col.basePct': '% Base',
    'excel.leaderboard.col.heroesPct': '% Heroes',

    // ─── Excel Toasts ───
    'toast.excel.preparing': '⏳ Preparing Excel file...',
    'toast.excel.preparingMulti': '⏳ Preparing multi-sheet Excel file...',
    'toast.excel.libFailed': '⚠️ Failed to load library — exporting as CSV',
    'toast.excel.exported': '✅ Professional Excel file exported',
    'toast.excel.exportedSheets': '✅ Exported {count} sheets',
    'toast.excel.leaderboardExported': '✅ Branch ranking exported',
    'toast.excel.failed': '❌ Export failed — try CSV',
    'toast.excel.libFailedShort': '⚠️ Failed to load library',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.5 — Setup Wizard + Drawer + Meta
    // ═══════════════════════════════════════════════════════

    // ─── Setup Wizard: Step 0 (Welcome) ───
    'wizard.welcome.title': '🚀 Welcome to SAMX',
    'wizard.welcome.subtitle': 'An integrated system for sales tracking',
    'wizard.welcome.feature.identity': 'Your Identity',
    'wizard.welcome.feature.sector': 'Sector',
    'wizard.welcome.feature.branch': 'First Branch',
    'wizard.welcome.timeHint': '⏱️ Takes less than a minute',
    'wizard.welcome.start': 'Start Now →',

    // ─── Setup Wizard: Step 1 (Identity) ───
    'wizard.identity.title': '🏢 Your Company Identity',
    'wizard.identity.subtitle': 'Will be used in reports and interfaces',
    'wizard.identity.uploadLogo': '📁 Upload Logo',
    'wizard.identity.removeLogo': '🗑️ Remove',
    'wizard.identity.companyName': 'Company Name',
    'wizard.identity.companyNamePlaceholder': 'e.g. Al-Fahd Trading Co.',
    'wizard.identity.companyDesc': 'Short Description',
    'wizard.identity.companyDescPlaceholder': 'e.g. Sales Management',
    'wizard.identity.required': '*',

    // ─── Setup Wizard: Step 2 (Sector) ───
    'wizard.sector.title': '🎯 Choose Your Sector',
    'wizard.sector.subtitle': 'Labels will be set automatically based on your sector',

    // ─── Setup Wizard: Step 3 (Branch) ───
    'wizard.branch.title': '🏬 Add First Branch',
    'wizard.branch.subtitle': 'You can add more branches later',
    'wizard.branch.code': 'Branch Code',
    'wizard.branch.name': 'Branch Name',
    'wizard.branch.namePlaceholder': 'e.g. Riyadh Main Branch',

    // ─── Setup Wizard: Step 4 (Complete) ───
    'wizard.complete.title': 'Setup Complete!',
    'wizard.complete.summaryName': '🏢 Name:',
    'wizard.complete.summarySector': '🎯 Sector:',
    'wizard.complete.summaryBranch': '🏬 Branch:',
    'wizard.complete.defaultCompany': 'My Company',
    'wizard.complete.defaultSector': 'General',
    'wizard.complete.defaultBranch': 'Main Branch',
    'wizard.complete.hint': '💡 You can change anything from Settings later',
    'wizard.complete.startUsing': '🎉 Start Using',

    // ─── Setup Wizard: Navigation ───
    'wizard.nav.prev': '← Previous',
    'wizard.nav.next': 'Next →',
    'wizard.nav.skip': 'Skip',

    // ─── Drawer (Manual Distribution) ───
    'drawer.title': '✏️ Manual Target Distribution',
    'drawer.filter.month': 'Month',
    'drawer.filter.branch': 'Branch',
    'drawer.filter.choose': '— Select —',
    'drawer.summary.baseMonthly': '🎯 Monthly Base',
    'drawer.summary.heroesMonthly': '🏆 Monthly Heroes',
    'drawer.summary.baseSum': 'Base Sum',
    'drawer.summary.heroesSum': 'Heroes Sum',
    'drawer.actions.evenly': '⚖️ Evenly',
    'drawer.actions.clearValues': '🗑️ Reset',
    'drawer.input.base': 'Base',
    'drawer.input.heroes': 'Heroes',
    'drawer.actions.save': '💾 Save Distribution',
    'drawer.actions.remove': '🗑️ Remove',

    // ─── Meta ───
    'meta.ownerName': 'Smeer.S.A',
    'meta.devName': 'SAMX Team',

    // ═══════════════════════════════════════════════════════
    //  Batch 6.6 — Final: Job Titles + Locale Timestamps
    // ═══════════════════════════════════════════════════════

    // ─── Job Titles (for display only — stored value stays Arabic) ───
    'jobTitle.branchManager': 'Branch Manager',
    'jobTitle.assistantBranchManager': 'Assistant Branch Manager',
    'jobTitle.areaSupervisor': 'Area Supervisor',
    'jobTitle.seller': 'Seller',

    // ─── Locale ───
    'locale.code': 'en-US',
    'locale.dateTime': 'en-US',
    'locale.time': 'en-US',

    // ═══════════════════════════════════════════════════════
    //  Batch 7.0 — Seed Versioning
    // ═══════════════════════════════════════════════════════

    'seed.update.title': '🎉 New update available',
    'seed.update.body': 'Version {version} — {month}',
    'seed.update.btnUpdate': 'Update Now',
    'seed.update.btnLater': 'Later',
    'seed.update.success': '✅ Updated while keeping your data',
    'seed.update.failed': '❌ Update failed — try again',
    'seed.export.btn': '📦 Export Seed',
    'seed.export.success': '✅ Seed file exported',
    'seed.export.versionPrompt': 'New version number (e.g., 1.0):',
    'seed.reload.btn': '🔄 Reload Seed',
    'seed.reload.confirm': 'Seed data will be reloaded. Your daily sales will be kept. Continue?',
    'seed.export.includeUsersPrompt': 'Include users in Seed?\n\n⚠️ Warning: Password hashes will be included in the file.\nKeep the file in a safe place.',
    'settings.data.saveNow': 'Force Save Now',
  };
})();