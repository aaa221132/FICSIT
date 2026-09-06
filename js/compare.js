/* Electronics Store Comparison Manager (User-Isolated Data) */

const CompareManager = {
  getCompareKey() {
    return `db_compare_${DataStore.getActiveUserKey()}`;
  },

  getCompareList() {
    return JSON.parse(localStorage.getItem(this.getCompareKey()) || '[]');
  },

  saveCompareList(list) {
    localStorage.setItem(this.getCompareKey(), JSON.stringify(list));
    this.updateBadges();
  },

  toggleCompare(productId) {
    let list = this.getCompareList();
    const product = DataStore.getProductById(productId);
    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
      if (window.showToast) window.showToast(`Вилучено з порівняння: ${product ? product.title : ''}`);
    } else {
      if (list.length >= 4) {
        if (window.showToast) window.showToast('Максимум 4 товари для порівняння!', 'warning');
        return;
      }
      list.push(productId);
      if (window.showToast) window.showToast(`Додано до порівняння: ${product ? product.title : ''}`);
    }
    this.saveCompareList(list);
  },

  isInCompare(productId) {
    return this.getCompareList().includes(productId);
  },

  getCompareProducts() {
    const list = this.getCompareList();
    const products = DataStore.getProducts();
    return list.map(id => products.find(p => p.id === id)).filter(Boolean);
  },

  updateBadges() {
    const count = this.getCompareList().length;
    const badges = document.querySelectorAll('.compare-badge-count');
    badges.forEach(b => b.textContent = count);
  }
};
