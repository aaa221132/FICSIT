/* Electronics Store Cart State Manager (User-Isolated Cart Data) */

const CartManager = {
  getCartKey() {
    return `db_cart_${DataStore.getActiveUserKey()}`;
  },

  getCart() {
    return JSON.parse(localStorage.getItem(this.getCartKey()) || '[]');
  },

  saveCart(cart) {
    localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
    this.updateBadges();
  },

  addToCart(productId, qty = 1) {
    // Guest Access Restriction Guard
    if (!AuthManager.isLoggedIn()) {
      AuthManager.requireAuth("додавати товари в кошик та купувати");
      return;
    }

    const cart = this.getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty: qty });
    }
    this.saveCart(cart);
    const product = DataStore.getProductById(productId);
    if (window.showToast && product) {
      window.showToast(`Додано в кошик: ${product.title}`);
    }
  },

  updateQty(productId, delta) {
    if (!AuthManager.isLoggedIn()) return;
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
      }
    }
    this.saveCart(cart);
  },

  removeFromCart(productId) {
    if (!AuthManager.isLoggedIn()) return;
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    if (window.showToast) {
      window.showToast('Товар видалено з кошика');
    }
  },

  clearCart() {
    localStorage.setItem(this.getCartKey(), JSON.stringify([]));
    this.updateBadges();
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.qty, 0);
  },

  getCartDetailed() {
    const cart = this.getCart();
    const products = DataStore.getProducts();
    return cart.map(item => {
      const prod = products.find(p => p.id === item.id);
      return prod ? { ...prod, qty: item.qty } : null;
    }).filter(Boolean);
  },

  getTotalPrice() {
    const items = this.getCartDetailed();
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  updateBadges() {
    const count = this.getCartCount();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(b => b.textContent = count);
  }
};
