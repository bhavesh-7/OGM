// File: js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'home.html';
      } else {
        alert('Invalid email or password!');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value,
        password: document.getElementById('password').value,
        orders: []
      };

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === user.email)) {
        alert('User already exists!');
        return;
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      window.location.href = 'login.html';
    });
  }
});

