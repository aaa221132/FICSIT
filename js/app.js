/* Common UI Components & Navigation Logic */

// Set Theme on Load
document.documentElement.setAttribute('data-theme', localStorage.getItem('ficsit_theme') || 'light');

function toggleFicsitTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('ficsit_theme', target);
}

// Render Header matching Rozetka structure
function renderFicsitHeader(activeTab = '') {
  const headerContainer = document.getElementById('ficsitHeader');
  if (!headerContainer) return;

  const user = AuthManager.getCurrentUser();
  const isAdmin = AuthManager.isAdmin();
  const cartCount = CartManager.getCartCount();
  const compareCount = CompareManager.getCompareList().length;

  headerContainer.innerHTML = `
    <header class="ficsit-header">
      <div class="top-bar" style="gap: 12px;">
        <a href="index.html" class="brand-logo" style="flex-shrink: 0;">
          <div class="logo-icon">F</div>
          <div class="brand-text">
            <span class="brand-title">FICSIT</span>
            <span class="brand-subtitle">ЕЛЕКТРОНІКА</span>
          </div>
        </a>

        <!-- Rozetka Catalog Button -->
        <a href="catalog.html" class="header-catalog-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          Каталог
        </a>

        <!-- Search Bar -->
        <div class="search-container" style="flex: 1; max-width: 850px; display: flex; align-items: center;">
          <input type="text" id="globalSearchInput" class="search-input" placeholder="Я шукаю..." onkeydown="if(event.key==='Enter') executeGlobalSearch()" style="border-radius: var(--radius-md) 0 0 var(--radius-md); height: 38px; padding-right: 14px; width: 100%;">
          <button class="search-btn" onclick="executeGlobalSearch()" title="Знайти" style="position: relative; right: auto; top: auto; transform: none; background: linear-gradient(135deg, #00a046, #00c853); border: 1px solid #00e676; border-left: none; color: #fff; padding: 0 20px; border-radius: 0 var(--radius-md) var(--radius-md) 0; height: 38px; font-weight: 800; font-size: 13px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(0, 200, 83, 0.3);">
            Знайти
          </button>
        </div>

        <div class="header-actions" style="flex-shrink: 0; display: flex; align-items: center; gap: 10px;">
          <div class="theme-switch-wrap" onclick="toggleFicsitTheme()" title="Перемикання теми (Темна / Світла)">
            <span>Тема</span>
            <div class="theme-switch">
              <div class="switch-dot"></div>
            </div>
          </div>

          <a href="compare.html" class="header-badge-btn" title="Список порівняння">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="compare-badge-count badge-count">${compareCount}</span>
          </a>

          <a href="cart.html" class="header-badge-btn" title="Кошик покупок">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge-count badge-count">${cartCount}</span>
          </a>

          <a href="profile.html" class="header-badge-btn" style="${isAdmin ? 'border-color: var(--accent-orange); color: var(--accent-orange); font-weight: 700;' : ''}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>${user ? (isAdmin ? 'Адмін' : user.name.split(' ')[0]) : 'Увійти'}</span>
          </a>
        </div>
      </div>

      <!-- Sub-Navigation Bar -->
      <nav class="category-nav-bar">
        <div class="category-nav-container">
          <a href="index.html" class="cat-tab ${activeTab === 'home' ? 'active' : ''}">ГОЛОВНА</a>
          <a href="catalog.html" class="cat-tab ${activeTab === 'catalog' ? 'active' : ''}">КАТАЛОГ</a>
          <a href="orders.html" class="cat-tab ${activeTab === 'orders' ? 'active' : ''}">МОЇ ЗАМОВЛЕННЯ</a>
        </div>
      </nav>
    </header>

    ${isAdmin ? `
      <!-- Persistent Floating Admin Widget (Bottom-Right) -->
      <div style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
        <a href="admin.html" style="background: linear-gradient(135deg, #f47a20, #ea580c); color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 50px; font-weight: 800; font-size: 13px; box-shadow: 0 6px 25px rgba(244,122,32,0.5); display: inline-flex; align-items: center; gap: 8px; border: 2px solid #fff; text-transform: uppercase; letter-spacing: 0.5px; transition: transform 0.2s ease, box-shadow 0.2s ease;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Центр Адміністратора</span>
        </a>
      </div>
    ` : ''}
  `;
}

// Render Footer
function renderFicsitFooter() {
  const footerContainer = document.getElementById('ficsitFooter');
  if (!footerContainer) return;
  footerContainer.innerHTML = `
    <footer class="ficsit-footer">
      <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="text-align: left;">
          <strong style="color: var(--text-primary); text-transform: uppercase;">FICSIT ELECTRONICS &copy; 2026</strong>
          <p style="margin-top: 4px; color: var(--text-secondary);">Офіційний магазин сучасної електроніки та комп'ютерної техніки.</p>
        </div>
        <div style="display: flex; gap: 20px; font-weight: 600;">
          <a href="index.html">Головна</a>
          <a href="catalog.html">Каталог</a>
          <a href="orders.html">Мої Замовлення</a>
          <a href="profile.html">Акаунт</a>
        </div>
      </div>
    </footer>
  `;
}

// Global Search
function executeGlobalSearch() {
  const input = document.getElementById('globalSearchInput');
  if (input && input.value.trim()) {
    window.location.href = `catalog.html?search=${encodeURIComponent(input.value.trim())}`;
  }
}

// Universal Render Card Helper with Rozetka Badges, Admin Controls, and "Немає Зображення"
function createProductCardHtml(product, index = 0) {
  const isCompared = CompareManager.isInCompare(product.id);
  const badgeType = index % 3 === 0 ? 'АКЦІЯ' : (index % 3 === 1 ? 'ТОП ПРОДАЖІВ' : 'НОВИНКА');
  const badgeColor = badgeType === 'АКЦІЯ' ? '#ef4444' : (badgeType === 'ТОП ПРОДАЖІВ' ? '#f47a20' : '#10b981');
  const isAdmin = AuthManager.isAdmin();

  // Dynamic reviews calculation from database
  const reviews = DataStore.getReviews(product.id);
  const avgRating = DataStore.getAverageRating(product.id);

  // Clean White Background with Bold Black "НЕМАЄ ЗОБРАЖЕННЯ" when image is empty
  const imageHtml = (product.image && product.image.trim()) 
    ? `<img src="${product.image}" alt="${product.title}">` 
    : `<div style="background-color: #ffffff; color: #000000; width: 100%; height: 100%; min-height: 160px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 13px; text-transform: uppercase; border-radius: var(--radius-sm); text-align: center; box-shadow: inset 0 0 10px rgba(0,0,0,0.1); padding: 10px; line-height: 1.2;">НЕМАЄ ЗОБРАЖЕННЯ</div>`;

  return `
    <div class="product-card" style="position: relative;">
      
      <!-- Admin Mode Badge on Card (Positioned Top Right) -->
      ${isAdmin ? `
        <div style="position: absolute; top: 8px; left: 8px; z-index: 5; background: var(--accent-orange); color: #fff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
          Адмін
        </div>
      ` : `
        <span style="position: absolute; top: 8px; left: 8px; background-color: ${badgeColor}; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 3px; text-transform: uppercase; z-index: 2;">
          ${badgeType}
        </span>
      `}
      
      <div class="card-img-wrap" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
        <div style="position: absolute; ${isAdmin ? 'top: 36px;' : 'top: 30px;'} right: 8px; display: flex; flex-direction: column; gap: 6px; z-index: 4;">
          <button class="btn-icon ${isCompared ? 'active' : ''}" style="width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="event.stopPropagation(); CompareManager.toggleCompare('${product.id}')" title="Додати до порівняння">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          </button>
        </div>

        ${imageHtml}
      </div>
      
      <div>
        <h3 class="card-title" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">${product.title}</h3>
        
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 12px;">
          <span style="color: #facc15; font-weight: 700; display: flex; align-items: center; gap: 3px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${avgRating}
          </span>
          <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 3px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${reviews.length} відгуків
          </span>
        </div>

        <p class="card-specs-brief">
          ${product.brand ? `Бренд: <strong>${product.brand}</strong>` : ''} 
          ${product.processor && product.processor !== 'N/A' ? ` | ${product.processor}` : ''}
        </p>

        <div class="card-price-row">
          <div>
            <span class="price-main">${product.price.toLocaleString('uk-UA')} ₴</span>
          </div>
          <span class="stock-tag ${product.inStock ? 'in-stock' : 'out-stock'}">
            ${product.inStock ? 'В наявності' : 'Під замовлення'}
          </span>
        </div>
      </div>

      <div class="card-actions-row" style="margin-top: 8px;">
        <button class="btn-primary" onclick="CartManager.addToCart('${product.id}')" ${!product.inStock ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          В кошик
        </button>

        <!-- Direct Admin Controls on EVERY Product Card -->
        ${isAdmin ? `
          <button class="btn-secondary" style="flex: 0 0 auto; padding: 8px 10px; display: flex; align-items: center; justify-content: center;" onclick="event.stopPropagation(); openQuickEditModal('${product.id}')" title="Редагувати товар">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-danger" style="flex: 0 0 auto; padding: 8px 10px; display: flex; align-items: center; justify-content: center;" onclick="event.stopPropagation(); quickDeleteProductCard('${product.id}')" title="Видалити товар">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

// =========================================================
// ПОВНЕ РЕДАГУВАННЯ ТОВАРУ ДЛЯ АДМІНІСТРАЦІЇ НА МІСЦІ
// =========================================================

window.quickDeleteProductCard = function(id) {
  const p = DataStore.getProductById(id);
  if (confirm(`Видалити товар "${p ? p.title : id}" з бази магазину?`)) {
    DataStore.deleteProduct(id);
    if (window.showToast) window.showToast('Товар видалено з бази');
    location.reload();
  }
};

window.openQuickEditModal = function(id) {
  const product = DataStore.getProductById(id);
  if (!product) return;
  
  let modal = document.getElementById('quickEditModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickEditModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="modal-box" onclick="event.stopPropagation()" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
      <div class="modal-header">
        <h3 class="modal-title" style="color: var(--accent-orange);">✏️ Редагування товару (Адміністратор)</h3>
        <button class="modal-close" onclick="closeQuickEditModal()">&times;</button>
      </div>
      <form onsubmit="saveQuickEdit(event, '${id}')">
        
        <div class="form-group">
          <label class="form-label">Назва товару</label>
          <input type="text" id="qeTitle" class="form-input" value="${product.title}" required>
        </div>

        <!-- Image Management Group with Remove Option -->
        <div class="form-group">
          <label class="form-label">Зображення товару</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="qeImage" class="form-input" value="${product.image || ''}" placeholder="Введіть URL або завантажте файл..." style="flex: 2;" oninput="updateQeImagePreview(this.value)">
            <input type="file" id="qeImageFile" accept="image/*" class="form-input" style="flex: 1;" onchange="handleQeFileUpload(event)">
          </div>
          <input type="hidden" id="qeImageBase64" value="">
          
          <div id="qePreviewWrap" style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img id="qeImgPreview" src="${product.image || ''}" alt="Preview" style="width: 45px; height: 45px; object-fit: contain; background: #fff; border-radius: 4px; padding: 2px; ${!product.image ? 'display:none;' : ''}">
              <span id="qeImgStatus" style="font-size: 12px; color: ${product.image ? '#10b981' : 'var(--text-secondary)'};">
                ${product.image ? '✅ Зображення встановлено' : '❌ Зображення відсутнє (буде "НЕМАЄ ЗОБРАЖЕННЯ")'}
              </span>
            </div>
            <button type="button" class="btn-danger" style="padding: 4px 8px; font-size: 11px;" onclick="clearQeImage()">
              🗑️ Прибрати фото
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Ціна в гривнях (₴)</label>
            <input type="number" id="qePrice" class="form-input" value="${product.price}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Бренд</label>
            <input type="text" id="qeBrand" class="form-input" value="${product.brand || 'Apple'}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">CPU</label>
            <input type="text" id="qeProcessor" class="form-input" value="${product.processor || 'N/A'}">
          </div>
          <div class="form-group">
            <label class="form-label">RAM</label>
            <input type="text" id="qeRam" class="form-input" value="${product.ram || 'N/A'}">
          </div>
          <div class="form-group">
            <label class="form-label">GPU</label>
            <input type="text" id="qeGpu" class="form-input" value="${product.gpu || 'N/A'}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Опис товару</label>
          <textarea id="qeDescription" class="form-textarea" rows="3">${product.description || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="qeInStock" ${product.inStock ? 'checked' : ''}>
            <span>Товар є в наявності на складі</span>
          </label>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 16px;">
          <button type="button" class="btn-secondary" style="flex: 1;" onclick="closeQuickEditModal()">Скасувати</button>
          <button type="submit" class="btn-primary" style="flex: 2; padding: 12px;">💾 Зберегти зміни</button>
        </div>
      </form>
    </div>
  `;
  
  modal.classList.add('active');
};

window.updateQeImagePreview = function(url) {
  const img = document.getElementById('qeImgPreview');
  const status = document.getElementById('qeImgStatus');
  if (url.trim()) {
    img.src = url.trim();
    img.style.display = 'block';
    status.textContent = '✅ Зображення встановлено';
    status.style.color = '#10b981';
  } else {
    img.style.display = 'none';
    status.textContent = '❌ Зображення відсутнє (буде "НЕМАЄ ЗОБРАЖЕННЯ")';
    status.style.color = 'var(--text-secondary)';
  }
};

window.clearQeImage = function() {
  document.getElementById('qeImage').value = '';
  document.getElementById('qeImageBase64').value = '';
  document.getElementById('qeImageFile').value = '';
  const img = document.getElementById('qeImgPreview');
  img.style.display = 'none';
  img.src = '';
  const status = document.getElementById('qeImgStatus');
  status.textContent = '❌ Зображення відсутнє (буде "НЕМАЄ ЗОБРАЖЕННЯ")';
  status.style.color = 'var(--text-secondary)';
};

window.handleQeFileUpload = function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('qeImageBase64').value = e.target.result;
      document.getElementById('qeImage').value = '';
      const img = document.getElementById('qeImgPreview');
      img.src = e.target.result;
      img.style.display = 'block';
      const status = document.getElementById('qeImgStatus');
      status.textContent = '✅ Завантажено файл зображення';
      status.style.color = '#10b981';
    };
    reader.readAsDataURL(file);
  }
};

window.closeQuickEditModal = function() {
  const modal = document.getElementById('quickEditModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.saveQuickEdit = function(event, id) {
  event.preventDefault();
  const product = DataStore.getProductById(id);
  if (!product) return;

  const imgUrl = document.getElementById('qeImage').value.trim();
  const imgB64 = document.getElementById('qeImageBase64').value;
  // If user cleared everything, finalImage will be empty string ''
  const finalImage = imgB64 || imgUrl || '';

  product.title = document.getElementById('qeTitle').value.trim();
  product.price = parseFloat(document.getElementById('qePrice').value) || 0;
  product.brand = document.getElementById('qeBrand').value.trim();
  product.processor = document.getElementById('qeProcessor').value.trim();
  product.ram = document.getElementById('qeRam').value.trim();
  product.gpu = document.getElementById('qeGpu').value.trim();
  product.description = document.getElementById('qeDescription').value.trim();
  product.inStock = document.getElementById('qeInStock').checked;
  product.image = finalImage;

  DataStore.updateProduct(product);
  closeQuickEditModal();
  
  if (window.showToast) {
    window.showToast(`Товар "${product.title}" успішно оновлено!`);
  }
  
  setTimeout(() => location.reload(), 400);
};
