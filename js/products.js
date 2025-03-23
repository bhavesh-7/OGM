// File: js/products.js

document.addEventListener('DOMContentLoaded', () => {
  const defaultProducts = [
    { id: 1, name: 'Apples', category: 'Fruits', price: 120 },
    { id: 2, name: 'Tomatoes', category: 'Vegetables', price: 40 },
    { id: 3, name: 'Potatoes', category: 'Vegetables', price: 30 },
    { id: 4, name: 'Bananas', category: 'Fruits', price: 60 },
    { id: 5, name: 'Bread', category: 'Bakery', price: 50 }
  ];

  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }

  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const categories = [...new Set(products.map(p => p.category))];

  if (typeof generateSidebar === 'function') {
    generateSidebar(categories);
  }

  if (document.getElementById('products-container')) {
    renderProducts(products);
  }
});

function renderProducts(productList) {
  const container = document.getElementById('products-container');
  if (!container) return;

  container.innerHTML = '';
  productList.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function filterProducts(category) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered);
}

