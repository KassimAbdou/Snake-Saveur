(function () {
  const STORAGE_KEY = 'snake-saveur-menu-data-v2';

  function getMenuData() {
    let data = [];

    if (window.SnakeSaveurMenu && typeof window.SnakeSaveurMenu.getMenuData === 'function') {
      const resolved = window.SnakeSaveurMenu.getMenuData();
      data = Array.isArray(resolved) ? resolved : (Array.isArray(resolved.items) ? resolved.items : []);
      return data;
    }

    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      data = Array.isArray(raw) ? raw : [];
    } catch (error) {
      data = [];
    }

    return data;
  }

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function renderItemCard(item) {
    return `
      <div class="menu-item" data-prix="${Number(item.price) || 0}" data-item-id="${item.id}">
        <img src="${item.image || ''}" alt="${item.name}">
        <h3>${item.name}</h3>
        <span>${Number(item.price) || 0}fr</span>
      </div>
    `;
  }

  function bindSelectionUI() {
    const items = document.querySelectorAll('.menu-item');
    const totalEl = document.querySelector('.total');
    if (!items.length) return;

    items.forEach((item) => {
      const qty = document.createElement('input');
      qty.type = 'number';
      qty.min = '1';
      qty.value = '1';
      qty.className = 'qty-input';
      qty.style.display = 'none';
      item.appendChild(qty);

      item.addEventListener('click', (event) => {
        if (event.target === qty) return;
        item.classList.toggle('selected');
        const isSelected = item.classList.contains('selected');
        qty.style.display = isSelected ? 'block' : 'none';
        if (!isSelected) qty.value = '1';
        updateTotal();
      });

      qty.addEventListener('input', () => {
        if (item.classList.contains('selected')) updateTotal();
      });
    });

    function updateTotal() {
      let total = 0;
      items.forEach((item) => {
        if (!item.classList.contains('selected')) return;
        const unit = Number(item.dataset.prix) || 0;
        const q = Number(item.querySelector('.qty-input').value) || 1;
        total += unit * q;
      });
      if (totalEl) totalEl.textContent = `Total : ${total}fr`;
    }
  }

  function normalizePageName(value) {
    try {
      return decodeURIComponent(String(value || '')).trim();
    } catch (error) {
      return String(value || '');
    }
  }

  function buildNormalizedKey(value) {
    return normalizePageName(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function resolvePageCategory(currentPage) {
    const pageKey = buildNormalizedKey(currentPage);
    const categoryMap = {
      sourcerizhtml: 'Plats de riz',
      viennoiserieshtml: 'Viennoiseries',
      rafraichissementhtml: 'Rafraîchissement',
      thecafhtml: 'Café & Thé',
      thecafehtml: 'Café & Thé',
      menuhtml: 'ALL'
    };

    return categoryMap[pageKey] || null;
  }

  function renderPage() {
    const items = getMenuData();
    const container = document.querySelector('.menu, #menuContainer');
    if (!container) return;

    const currentPage = normalizePageName(window.location.pathname.split('/').pop() || 'index.html');
    const pageCategory = resolvePageCategory(currentPage);
    const visibleItems = items.filter((item) => item && item.available !== false && (!pageCategory || pageCategory === 'ALL' || item.category === pageCategory));

    if (pageCategory && pageCategory !== 'ALL') {
      container.innerHTML = visibleItems.map(renderItemCard).join('');
    } else {
      const grouped = {};
      visibleItems.forEach((item) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });

      container.innerHTML = Object.entries(grouped).map(([category, group]) => `
        <div class="menu-category">
          <h2>${category}</h2>
          <div class="menu-grid">${group.map(renderItemCard).join('')}</div>
        </div>
      `).join('');
    }

    bindSelectionUI();
    const total = document.querySelector('.total');
    if (total) total.textContent = 'Total : 0fr';
  }

  function attachSyncListeners() {
    window.addEventListener('snakeSaveurMenuUpdated', renderPage);
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY) renderPage();
    });
  }

  attachSyncListeners();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPage, { once: true });
  } else {
    renderPage();
  }
})();
