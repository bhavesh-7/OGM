// File: js/layout.js

function checkLoginRedirect() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    window.location.href = 'login.html';
  }
  return user;
}

function generateHeader() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const header = `
    <nav class="navbar">
      <h2>Grocery Mart</h2>
      <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="orders.html">Orders</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="help.html">Help</a></li>
        <li><a href="#" id="logout">Logout</a></li>
      </ul>
      ${user ? `<span class="username">Hi, ${user.name}</span>` : ""}
    </nav>
  `;
  document.getElementById('main-header').innerHTML = header;

  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    });
  }
}

function generateSidebar(categories = []) {
  const menu = document.getElementById('category-menu');
  if (!menu) return;
  menu.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    li.addEventListener('click', () => filterProducts(cat));
    menu.appendChild(li);
  });
}

if (document.getElementById('main-header')) {
  generateHeader();
}
