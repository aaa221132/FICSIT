/* FICSIT Theme Switcher (Dark & Light) */

(function () {
  const currentTheme = localStorage.getItem('ficsit_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

function toggleFicsitTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ficsit_theme', next);
  
  if (window.showToast) {
    window.showToast(`Тему змінено на: ${next === 'dark' ? 'ТЕМНА (FICSIT Industrial)' : 'СВІТЛА'}`);
  }
}
