// File: js/orders.js

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const container = document.getElementById('orders-container');
  if (!container) return;

  const orders = user.orders || [];

  if (orders.length === 0) {
    container.innerHTML = '<p>You have no past orders.</p>';
    return;
  }

  orders.forEach(order => {
    const div = document.createElement('div');
    div.className = 'order-card';
    div.innerHTML = `
      <h4>Order #${order.id}</h4>
      <p>Date: ${order.date}</p>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} - Qty: ${item.qty} - ₹${item.total}</li>
        `).join('')}
      </ul>
      <hr/>
    `;
    container.appendChild(div);
  });
});

