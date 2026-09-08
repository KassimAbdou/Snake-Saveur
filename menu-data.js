(function () {
  const STORAGE_KEY = 'snake-saveur-menu-data-v2';

  const DEFAULT_MENU_ITEMS = [
    { id: 'pilau-royal', name: 'Pilau Royal', category: 'Plats de riz', price: 3000, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2001.11.00_f93165aa.jpg' },
    { id: 'pain-chocolat', name: 'Pain Chocolat', category: 'Viennoiseries', price: 1200, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2001.11.00_e743aace.jpg' },
    { id: 'boissons', name: 'Les boissons', category: 'Rafraîchissement', price: 500, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2001.31.27_18f6a335.jpg' },
    { id: 'the-cafe', name: 'Thé & Café', category: 'Café & Thé', price: 500, available: true, image: 'cozy-cafe-with-steaming-cups-coffee_1022456-159128.avif' },
    { id: 'riz-mataba', name: 'Riz, Mataba, Poulet et Nshari', category: 'Plats de riz', price: 3500, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2003.26.41_a45eec5e.jpg' },
    { id: 'riz-poisson', name: 'Riz, Poisson, Mataba et Nshari', category: 'Plats de riz', price: 3500, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2001.33.52_33921e01.jpg' },
    { id: 'sambousa', name: 'Sambousa', category: 'Viennoiseries', price: 50, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2005.01.57_ac9e8c89.jpg' },
    { id: 'boitriye', name: 'Boitriye', category: 'Viennoiseries', price: 100, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2005.01.59_82c76705.jpg' },
    { id: 'kouskouma', name: 'Kouskouma', category: 'Viennoiseries', price: 50, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2005.01.57_78a3d58f.jpg' },
    { id: 'jus-naturel', name: 'Jus Naturel', category: 'Rafraîchissement', price: 250, available: true, image: 'WhatsApp%20Image%202025-10-23%20%C3%A0%2001.11.01_58ed13a4.jpg' },
    { id: 'cafe', name: 'Café avec ou sans sucre ou lait', category: 'Café & Thé', price: 500, available: true, image: 'types-of-coffee-for-weight-loss_1024x1024.jpg' },
    { id: 'the', name: 'Thé avec ou sans sucre ou lait', category: 'Café & Thé', price: 500, available: true, image: 'hd-digital-art-wallpaper-background_783884-142661.avif' }
  ];

  function makeId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'menu-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function normalizeMenuItems(items) {
    if (!Array.isArray(items) || items.length === 0) return DEFAULT_MENU_ITEMS;

    return items.map((item) => ({
      id: item.id || makeId(),
      name: item.name || 'Nouveau plat',
      category: item.category || 'Autres',
      price: Number(item.price) || 0,
      available: item.available !== false,
      image: item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80'
    }));
  }

  function getMenuData() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return normalizeMenuItems(Array.isArray(raw) ? raw : DEFAULT_MENU_ITEMS);
    } catch (error) {
      return DEFAULT_MENU_ITEMS;
    }
  }

  function saveMenuData(items) {
    const normalized = normalizeMenuItems(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent('snakeSaveurMenuUpdated'));
  }

  function setMenuData(items) {
    saveMenuData(items);
  }

  window.SnakeSaveurMenu = {
    STORAGE_KEY,
    DEFAULT_MENU_ITEMS,
    normalizeMenuItems,
    getMenuData,
    saveMenuData,
    setMenuData
  };
})();
