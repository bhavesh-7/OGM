// File: js/cart.js

function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const cartContainer = document.getElementById('cart-items');

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }

  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${product.name}</span>
        <span>Qty: ${item.qty}</span>
        <span>Total: ₹${product.price * item.qty}</span>
      `;
      cartContainer.appendChild(div);
    }
  });
}

function checkout() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  const orderItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      name: product.name,
      price: product.price,
      qty: item.qty,
      total: product.price * item.qty
    };
  });

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const index = users.findIndex(u => u.id === user.id);
  const order = {
    id: Date.now(),
    items: orderItems,
    date: new Date().toLocaleString()
  };

  users[index].orders.push(order);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('loggedInUser', JSON.stringify(users[index]));
  localStorage.removeItem('cart');
  alert('Order placed successfully!');
  window.location.href = 'orders.html';
}

