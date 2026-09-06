/* ==========================================================================
   3-TIER ROLE & AUTHENTICATION SYSTEM  v2
   1. ГІСТЬ (Guest)            — Незареєстрований відвідувач
   2. КОРИСТУВАЧ (User)        — Зареєстрований покупець
   3. АДМІНІСТРАЦІЯ (Admin)    — Виключно 3 виділені акаунти
   ========================================================================== */

/* Immutable admin credentials — hardcoded, cannot be changed via UI */
const SYSTEM_ADMINS = {
  "admin@store.ua":  { id: "usr_admin_1", name: "Адміністратор Головний", phone: "+380 44 999 00 00", password: "adminpass" },
  "admin2@store.ua": { id: "usr_admin_2", name: "Олексій Сидоренко",       phone: "+380 67 555 11 22", password: "admin2pass" },
  "admin3@store.ua": { id: "usr_admin_3", name: "Марія Коваленко",          phone: "+380 93 444 88 77", password: "admin3pass" }
};

/* Normalize email for lookup */
function _normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

/* Check if a given email belongs to one of the 3 system admins */
function _isAdminEmail(email) {
  return Object.prototype.hasOwnProperty.call(SYSTEM_ADMINS, _normalizeEmail(email));
}

const AuthManager = {

  /* ────────────────────────────────────────────────────────────
     getCurrentUser()
     Returns the stored session user object, or null for guests.
     Guarantees role is correct every time it's read.
  ──────────────────────────────────────────────────────────── */
  getCurrentUser() {
    try {
      const raw = localStorage.getItem('db_session');
      if (!raw || raw === 'null') return null;

      const u = JSON.parse(raw);
      if (!u || typeof u !== 'object' || !u.email) return null;

      /* Force correct role — never trust what was stored */
      u.role = _isAdminEmail(u.email) ? 'admin' : 'user';

      return u;
    } catch (e) {
      return null;
    }
  },

  /* Tier 1 — Guest check */
  isGuest() {
    return this.getCurrentUser() === null;
  },

  /* Tier 2 — Any logged-in user (user or admin) */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /* Tier 3 — Admin only: strictly the 3 system accounts */
  isAdmin() {
    const user = this.getCurrentUser();
    if (!user || !user.email) return false;
    return _isAdminEmail(user.email);
  },

  /* Guard: redirect guests to login */
  requireAuth(actionName = 'виконати цю дію') {
    if (!this.isLoggedIn()) {
      if (window.showToast) window.showToast(`Щоб ${actionName}, увійдіть або зареєструйтесь!`);
      setTimeout(() => { window.location.href = 'profile.html'; }, 700);
      return false;
    }
    return true;
  },

  /* ────────────────────────────────────────────────────────────
     loginUser(email, password)
     Supports admins first, then regular users from DB.
  ──────────────────────────────────────────────────────────── */
  loginUser(email, password) {
    const cleanEmail = _normalizeEmail(email);
    const cleanPass  = (password || '').trim();

    /* Check system admins first */
    if (_isAdminEmail(cleanEmail)) {
      const adminData = SYSTEM_ADMINS[cleanEmail];
      if (adminData.password !== cleanPass) {
        if (window.showToast) window.showToast('Невірний пароль!', 'warning');
        return { success: false, message: 'Невірний пароль' };
      }
      const sessionUser = {
        id:    adminData.id,
        name:  adminData.name,
        email: cleanEmail,
        phone: adminData.phone,
        role:  'admin'
      };
      this._saveSession(sessionUser);
      if (window.showToast) window.showToast(`👑 Вхід виконано! Вітаємо, ${adminData.name}!`);
      return { success: true, user: sessionUser };
    }

    /* Regular users */
    const users = DataStore.getUsersDB();
    const user  = users.find(u => _normalizeEmail(u.email) === cleanEmail && u.passwordHash === cleanPass);

    if (!user) {
      if (window.showToast) window.showToast('Невірний e-mail або пароль!', 'warning');
      return { success: false, message: 'Невірні дані' };
    }

    user.role = 'user';
    this._saveSession(user);
    if (window.showToast) window.showToast(`Вітаємо, ${user.name}! Вхід успішний.`);
    return { success: true, user: user };
  },

  /* ────────────────────────────────────────────────────────────
     registerUser — for new regular customers only
  ──────────────────────────────────────────────────────────── */
  registerUser(name, email, password, phone = '') {
    const cleanEmail = _normalizeEmail(email);

    if (_isAdminEmail(cleanEmail)) {
      if (window.showToast) window.showToast('Ця адреса зарезервована для адміністрації. Виконайте вхід.', 'warning');
      return { success: false };
    }

    const users = DataStore.getUsersDB();
    if (users.find(u => _normalizeEmail(u.email) === cleanEmail)) {
      if (window.showToast) window.showToast('Акаунт з такою поштою вже існує!', 'warning');
      return { success: false };
    }

    const newUser = {
      id:           'usr_' + Date.now(),
      name:         name.trim(),
      email:        cleanEmail,
      phone:        (phone || '').trim() || '+380',
      passwordHash: password.trim(),
      role:         'user',
      createdAt:    new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    DataStore.saveUsersDB(users);
    this._saveSession(newUser);

    if (window.showToast) window.showToast(`Реєстрація успішна! Вітаємо, ${newUser.name}!`);
    return { success: true, user: newUser };
  },

  /* Update profile fields */
  updateUserProfile(name, phone, email) {
    const user = this.getCurrentUser();
    if (!user) return;

    user.name  = name.trim();
    user.phone = phone.trim();
    /* Admins cannot change their email */
    if (!_isAdminEmail(user.email) && email) {
      user.email = _normalizeEmail(email);
    }

    this._saveSession(user);

    let users = DataStore.getUsersDB();
    users = users.map(u => u.id === user.id ? { ...u, ...user } : u);
    DataStore.saveUsersDB(users);

    if (window.showToast) window.showToast('Дані акаунту успішно оновлено!');
  },

  /* Internal: write session to localStorage */
  _saveSession(user) {
    localStorage.setItem('db_session', JSON.stringify(user));
  },

  /* Backward compat alias */
  createSession(user) { this._saveSession(user); },

  logout() {
    localStorage.setItem('db_session', 'null');
    if (window.showToast) window.showToast('Ви вийшли з акаунту');
    setTimeout(() => { window.location.href = 'index.html'; }, 400);
  }
};
