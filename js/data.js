/* Real Electronics Store Data & DB Storage Layer */

// Helper SVG Renders for Real Electronics Products
function createRealTechSvg(type, brandColor = '#f47a20') {
  const svgs = {
    laptop: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="22" width="64" height="42" rx="4" fill="#1e1e24" stroke="${brandColor}" stroke-width="3"/><rect x="22" y="26" width="56" height="34" fill="#0f172a"/><path d="M8 68 h84 l-6 8 h-72 Z" fill="${brandColor}"/><rect x="42" y="69" width="16" height="3" fill="#ffffff" opacity="0.8"/></svg>`,
    cpu: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="25" width="50" height="50" rx="4" fill="#2d2d32" stroke="${brandColor}" stroke-width="4"/><rect x="36" y="36" width="28" height="28" fill="#1e1e20" stroke="${brandColor}" stroke-width="2"/><text x="50" y="54" font-size="10" font-weight="bold" fill="${brandColor}" text-anchor="middle">CPU</text><path d="M30 15 v10 M50 15 v10 M70 15 v10 M30 75 v10 M50 75 v10 M70 75 v10 M15 30 h10 M15 50 h10 M15 70 h10 M75 30 h10 M75 50 h10 M75 70 h10" stroke="${brandColor}" stroke-width="3"/></svg>`,
    gpu: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="30" width="70" height="40" rx="4" fill="#222226" stroke="${brandColor}" stroke-width="3"/><circle cx="35" cy="50" r="12" fill="none" stroke="${brandColor}" stroke-width="3"/><circle cx="65" cy="50" r="12" fill="none" stroke="${brandColor}" stroke-width="3"/><path d="M15 45 h-8 v10 h8 Z" fill="${brandColor}"/></svg>`,
    phone: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="15" width="40" height="70" rx="8" fill="#18181b" stroke="${brandColor}" stroke-width="3"/><rect x="34" y="22" width="32" height="54" fill="#09090b"/><circle cx="50" cy="80" r="2.5" fill="${brandColor}"/></svg>`,
    monitor: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="20" width="70" height="45" rx="3" fill="#1e1e24" stroke="${brandColor}" stroke-width="3"/><rect x="18" y="23" width="64" height="39" fill="#020617"/><path d="M45 65 h10 v15 h-10 Z M32 80 h36 v4 h-36 Z" fill="${brandColor}"/></svg>`,
    keyboard: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="35" width="70" height="30" rx="4" fill="#27272a" stroke="${brandColor}" stroke-width="3"/><path d="M22 42 h8 v5 h-8 Z M34 42 h8 v5 h-8 Z M46 42 h8 v5 h-8 Z M58 42 h8 v5 h-8 Z M70 42 h8 v5 h-8 Z M22 52 h56 v6 h-56 Z" fill="${brandColor}"/></svg>`
  };
  const icon = svgs[type] || svgs.laptop;
  return `data:image/svg+xml;utf8,${encodeURIComponent(icon)}`;
}

const REAL_ELECTRONICS_PRODUCTS = [
  {
    id: "prod_macbook_pro16",
    title: "Ноутбук Apple MacBook Pro 16\" M3 Max (64GB / 1TB SSD) Space Black",
    category: "laptops",
    price: 184999,
    inStock: true,
    brand: "Apple",
    processor: "Apple M3 Max (16-core)",
    ram: "64 GB",
    gpu: "Apple M3 Max (40-core GPU)",
    image: createRealTechSvg('laptop', '#38bdf8'),
    description: "Надпотужний професійний ноутбук Apple з чіпом M3 Max, 16-дюймовим Liquid Retina XDR дисплеєм 120 Гц та автономністю до 22 годин."
  },
  {
    id: "prod_asus_rog_strix",
    title: "Ноутбук ASUS ROG Strix SCAR 18 (i9-14900HX / 32GB / RTX 4090 16GB)",
    category: "laptops",
    price: 169999,
    inStock: true,
    brand: "ASUS",
    processor: "Intel Core i9-14900HX",
    ram: "32 GB DDR5",
    gpu: "NVIDIA GeForce RTX 4090 16GB",
    image: createRealTechSvg('laptop', '#f47a20'),
    description: "Флагманський ігровий ноутбук 2026 року з 18-дюймовим 240Hz Nebula HDR QHD+ екраном, трифазним рідинним охолодженням та підсвічуванням ROG Aura Sync."
  },
  {
    id: "prod_lenovo_legion_7",
    title: "Ноутбук Lenovo Legion Pro 7 (Ryzen 9 7945HX / 32GB / RTX 4080 12GB)",
    category: "laptops",
    price: 124999,
    inStock: true,
    brand: "Lenovo",
    processor: "AMD Ryzen 9 7945HX",
    ram: "32 GB DDR5",
    gpu: "NVIDIA GeForce RTX 4080 12GB",
    image: createRealTechSvg('laptop', '#ef4444'),
    description: "Потужний ноутбук для геймінгу та 3D-моделювання з AI-чіпом LA2-Q та екраном PureSight Gaming 240Hz."
  },
  {
    id: "prod_intel_i9_14900k",
    title: "Процесор Intel Core i9-14900K (LGA1700, 24 ядра, 32 потоки, до 6.0 GHz)",
    category: "components",
    price: 25499,
    inStock: true,
    brand: "Intel",
    processor: "Intel Core i9-14900K",
    ram: "N/A",
    gpu: "Intel UHD Graphics 770",
    image: createRealTechSvg('cpu', '#0284c7'),
    description: "Топовий настільний процесор Intel 14-го покоління з розблокованим множником, підтримкою PCIe 5.0 та DDR5."
  },
  {
    id: "prod_amd_ryzen_7800x3d",
    title: "Процесор AMD Ryzen 7 7800X3D (AM5, 8 ядер, 16 потоків, 3D V-Cache)",
    category: "components",
    price: 18999,
    inStock: true,
    brand: "AMD",
    processor: "AMD Ryzen 7 7800X3D",
    ram: "N/A",
    gpu: "N/A",
    image: createRealTechSvg('cpu', '#dc2626'),
    description: "Найкращий ігровий процесор у світі завдяки інноваційній технології 96MB 3D V-Cache та мікроархітектурі Zen 4."
  },
  {
    id: "prod_rtx_4090_asus",
    title: "Відеокарта ASUS ROG Strix GeForce RTX 4090 24GB GDDR6X OC Edition",
    category: "components",
    price: 98999,
    inStock: true,
    brand: "NVIDIA",
    processor: "N/A",
    ram: "N/A",
    gpu: "NVIDIA GeForce RTX 4090 24GB",
    image: createRealTechSvg('gpu', '#22c55e'),
    description: "Абсолютний лідер продуктивності відеокарт NVIDIA Ada Lovelace з кулером Axial-tech та випаровувальною камерою."
  },
  {
    id: "prod_iphone15_promax",
    title: "Смартфон Apple iPhone 15 Pro Max 512GB Titanium Black",
    category: "smartphones",
    price: 64999,
    inStock: true,
    brand: "Apple",
    processor: "Apple A17 Pro",
    ram: "8 GB",
    gpu: "A17 Pro 6-core GPU",
    image: createRealTechSvg('phone', '#94a3b8'),
    description: "Флагманський смартфон із титановим корпусом, кнопкою Action Button, 5x оптичним зумом та роз'ємом USB-C 3.0."
  },
  {
    id: "prod_samsung_s24_ultra",
    title: "Смартфон Samsung Galaxy S24 Ultra 12/512GB Titanium Gray",
    category: "smartphones",
    price: 57999,
    inStock: true,
    brand: "Samsung",
    processor: "Snapdragon 8 Gen 3 for Galaxy",
    ram: "12 GB",
    gpu: "Adreno 750",
    image: createRealTechSvg('phone', '#f47a20'),
    description: "Інноваційний смартфон зі вбудованим пером S-Pen, функціями штучного інтелекту Galaxy AI та 200 Мп капорою."
  },
  {
    id: "prod_lg_ultragear_oled",
    title: "Монітор 27\" LG UltraGear OLED 27GR95QE-B (2560x1440, 240Hz, 0.03ms)",
    category: "monitors",
    price: 39999,
    inStock: true,
    brand: "LG",
    processor: "N/A",
    ram: "N/A",
    gpu: "N/A",
    image: createRealTechSvg('monitor', '#a855f7'),
    description: "Преміальний OLED геймінг-монітор з розширенням QHD, частотою 240Hz, миттєвим відкликом 0.03ms та бездоганним чорним кольором."
  },
  {
    id: "prod_samsung_odyssey_g9",
    title: "Монітор 49\" Samsung Odyssey OLED G9 G95SC (5120x1440, 240Hz Curved)",
    category: "monitors",
    price: 69999,
    inStock: false,
    brand: "Samsung",
    processor: "N/A",
    ram: "N/A",
    gpu: "N/A",
    image: createRealTechSvg('monitor', '#06b6d4'),
    description: "Надвигнутий вигнутий OLED монітор із співвідношенням сторін 32:9 Neo Quantum Processor Pro."
  },
  {
    id: "prod_razer_deathstalker",
    title: "Клавіатура Razer DeathStalker V2 Pro RGB Wireless Linear Optical",
    category: "accessories",
    price: 9499,
    inStock: true,
    brand: "Razer",
    processor: "N/A",
    ram: "N/A",
    gpu: "N/A",
    image: createRealTechSvg('keyboard', '#22c55e'),
    description: "Низькопрофільна бездротова оптична клавіатура з перемикачами Razer Low-Profile Optical та підсвічуванням Razer Chroma."
  },
  {
    id: "prod_logitech_superlight2",
    title: "Миша бездротова Logitech G PRO X SUPERLIGHT 2 Magenta",
    category: "accessories",
    price: 6499,
    inStock: true,
    brand: "Logitech",
    processor: "N/A",
    ram: "N/A",
    gpu: "N/A",
    image: createRealTechSvg('keyboard', '#ec4899'),
    description: "Кіберспортивна легка миша вагою 60 грам з сенсором HERO 2 (32000 DPI) та оптико-механічними перемикачами LIGHTFORCE."
  }
];

// Initialize Database Storage
function initDatabase() {
  if (!localStorage.getItem('db_products')) {
    localStorage.setItem('db_products', JSON.stringify(REAL_ELECTRONICS_PRODUCTS));
  }
  if (!localStorage.getItem('db_users')) {
    localStorage.setItem('db_users', JSON.stringify([
      {
        id: "usr_admin_1",
        name: "Адміністратор",
        email: "admin@store.ua",
        phone: "+380 44 999 00 00",
        passwordHash: "adminpass",
        role: "admin",
        createdAt: "2026-08-16"
      },
      {
        id: "usr_admin_2",
        name: "Олексій Сидоренко",
        email: "admin2@store.ua",
        phone: "+380 67 555 11 22",
        passwordHash: "admin2pass",
        role: "admin",
        createdAt: "2026-08-16"
      },
      {
        id: "usr_admin_3",
        name: "Марія Коваленко",
        email: "admin3@store.ua",
        phone: "+380 93 444 88 77",
        passwordHash: "admin3pass",
        role: "admin",
        createdAt: "2026-08-16"
      },
      {
        id: "usr_user_1",
        name: "Іван Петренко",
        email: "user@store.ua",
        phone: "+380 67 123 45 67",
        passwordHash: "userpass",
        role: "user",
        createdAt: "2026-08-16"
      }
    ]));
  }

  // Default session is GUEST (null) for unregistered visitors!
  if (localStorage.getItem('db_session') === null) {
    localStorage.setItem('db_session', 'null');
  }

  if (!localStorage.getItem('db_cart')) localStorage.setItem('db_cart', JSON.stringify([]));
  if (!localStorage.getItem('db_compare')) localStorage.setItem('db_compare', JSON.stringify([]));
  if (!localStorage.getItem('db_recent')) localStorage.setItem('db_recent', JSON.stringify([]));
  if (!localStorage.getItem('db_orders')) localStorage.setItem('db_orders', JSON.stringify([]));
  if (!localStorage.getItem('db_reviews')) localStorage.setItem('db_reviews', JSON.stringify({}));
  if (!localStorage.getItem('db_questions')) localStorage.setItem('db_questions', JSON.stringify({}));
  if (!localStorage.getItem('ficsit_theme')) localStorage.setItem('ficsit_theme', 'dark');
}

const DataStore = {
  getProducts() {
    return JSON.parse(localStorage.getItem('db_products') || '[]');
  },
  saveProducts(products) {
    localStorage.setItem('db_products', JSON.stringify(products));
  },
  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },
  addProduct(product) {
    const products = this.getProducts();
    product.id = 'prod_' + Date.now();
    products.unshift(product);
    this.saveProducts(products);
    return product;
  },
  updateProduct(updated) {
    let products = this.getProducts();
    products = products.map(p => p.id === updated.id ? updated : p);
    this.saveProducts(products);
  },
  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },

  getUsersDB() {
    return JSON.parse(localStorage.getItem('db_users') || '[]');
  },
  saveUsersDB(users) {
    localStorage.setItem('db_users', JSON.stringify(users));
  },

  getActiveUserKey() {
    const raw = localStorage.getItem('db_session');
    if (!raw || raw === 'null') return 'guest';
    try {
      const u = JSON.parse(raw);
      return u ? u.id : 'guest';
    } catch(e) {
      return 'guest';
    }
  },

  getOrders() {
    const key = `db_orders_${this.getActiveUserKey()}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  },
  addOrder(order) {
    const key = `db_orders_${this.getActiveUserKey()}`;
    const orders = JSON.parse(localStorage.getItem(key) || '[]');
    orders.unshift(order);
    localStorage.setItem(key, JSON.stringify(orders));
  },

  getRecentlyViewed() {
    const key = `db_recent_${this.getActiveUserKey()}`;
    const ids = JSON.parse(localStorage.getItem(key) || '[]');
    const products = this.getProducts();
    return ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  },
  addRecentlyViewed(id) {
    const key = `db_recent_${this.getActiveUserKey()}`;
    let list = JSON.parse(localStorage.getItem(key) || '[]');
    list = list.filter(item => item !== id);
    list.unshift(id);
    if (list.length > 8) list.pop();
    localStorage.setItem(key, JSON.stringify(list));
  },


  // Interactive Reviews API (with Image & Moderation Support)
  getReviews(productId) {
    const allReviews = JSON.parse(localStorage.getItem('db_reviews') || '{}');
    return allReviews[productId] || [];
  },
  addReview(productId, review) {
    const allReviews = JSON.parse(localStorage.getItem('db_reviews') || '{}');
    if (!allReviews[productId]) allReviews[productId] = [];
    allReviews[productId].unshift({
      id: 'rev_' + Date.now(),
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      images: review.images || [], // Array of attached customer photos
      userId: review.userId || 'usr_guest',
      date: new Date().toLocaleDateString('uk-UA') + ' ' + new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('db_reviews', JSON.stringify(allReviews));
  },
  deleteReview(productId, reviewId) {
    const allReviews = JSON.parse(localStorage.getItem('db_reviews') || '{}');
    if (allReviews[productId]) {
      allReviews[productId] = allReviews[productId].filter(r => r.id !== reviewId);
      localStorage.setItem('db_reviews', JSON.stringify(allReviews));
    }
  },
  getAllReviews() {
    const allReviews = JSON.parse(localStorage.getItem('db_reviews') || '{}');
    const products = this.getProducts();
    const result = [];
    for (const [prodId, revList] of Object.entries(allReviews)) {
      const prod = products.find(p => p.id === prodId);
      revList.forEach(r => {
        result.push({
          ...r,
          productId: prodId,
          productTitle: prod ? prod.title : prodId,
          productImage: prod ? prod.image : ''
        });
      });
    }
    return result.sort((a, b) => b.id.localeCompare(a.id));
  },
  getAverageRating(productId) {
    const reviews = this.getReviews(productId);
    if (reviews.length === 0) return 5.0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  },

  // Interactive Questions API (with Moderation & Official Answers)
  getQuestions(productId) {
    const allQuestions = JSON.parse(localStorage.getItem('db_questions') || '{}');
    return allQuestions[productId] || [];
  },
  addQuestion(productId, question) {
    const allQuestions = JSON.parse(localStorage.getItem('db_questions') || '{}');
    if (!allQuestions[productId]) allQuestions[productId] = [];
    allQuestions[productId].unshift({
      id: 'q_' + Date.now(),
      userName: question.userName,
      questionText: question.questionText,
      answerText: '',
      answeredBy: '',
      answeredDate: '',
      date: new Date().toLocaleDateString('uk-UA')
    });
    localStorage.setItem('db_questions', JSON.stringify(allQuestions));
  },
  deleteQuestion(productId, questionId) {
    const allQuestions = JSON.parse(localStorage.getItem('db_questions') || '{}');
    if (allQuestions[productId]) {
      allQuestions[productId] = allQuestions[productId].filter(q => q.id !== questionId);
      localStorage.setItem('db_questions', JSON.stringify(allQuestions));
    }
  },
  answerQuestion(productId, questionId, answerText, answeredBy = 'Адміністрація FICSIT') {
    const allQuestions = JSON.parse(localStorage.getItem('db_questions') || '{}');
    if (allQuestions[productId]) {
      const q = allQuestions[productId].find(item => item.id === questionId);
      if (q) {
        q.answerText = answerText;
        q.answeredBy = answeredBy;
        q.answeredDate = new Date().toLocaleDateString('uk-UA');
        localStorage.setItem('db_questions', JSON.stringify(allQuestions));
      }
    }
  },
  getAllQuestions() {
    const allQuestions = JSON.parse(localStorage.getItem('db_questions') || '{}');
    const products = this.getProducts();
    const result = [];
    for (const [prodId, qList] of Object.entries(allQuestions)) {
      const prod = products.find(p => p.id === prodId);
      qList.forEach(q => {
        result.push({
          ...q,
          productId: prodId,
          productTitle: prod ? prod.title : prodId,
          productImage: prod ? prod.image : ''
        });
      });
    }
    return result.sort((a, b) => b.id.localeCompare(a.id));
  },

  // Admin All Orders API
  getAllOrdersAdmin() {
    const users = this.getUsersDB();
    let all = [];
    // Gather all user order keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('db_orders_')) {
        try {
          const list = JSON.parse(localStorage.getItem(key) || '[]');
          all = all.concat(list);
        } catch(e) {}
      }
    }
    return all.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
  },
  updateOrderStatusAdmin(orderId, newStatus) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('db_orders_')) {
        try {
          let list = JSON.parse(localStorage.getItem(key) || '[]');
          let found = false;
          list = list.map(o => {
            if (o.id === orderId) {
              found = true;
              return { ...o, status: newStatus };
            }
            return o;
          });
          if (found) {
            localStorage.setItem(key, JSON.stringify(list));
          }
        } catch(e) {}
      }
    }
  }
};

initDatabase();

