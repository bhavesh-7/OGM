// File: js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const toggleButtons = document.querySelectorAll('.toggle-password');

  // Toggle Password Visibility
  toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
          const input = document.getElementById(button.dataset.target);
          input.type = input.type === 'password' ? 'text' : 'password';
      });
  });

  // Login Form Handling
  if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('loginEmail').value.trim();
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

  // Registration Form Handling
  if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const users = JSON.parse(localStorage.getItem('users') || '[]');

          const user = {
              id: Date.now(),
              name: document.getElementById('name').value.trim(),
              email: document.getElementById('email').value.trim(),
              mobile: document.getElementById('mobile').value.trim(),
              address: document.getElementById('address').value.trim(),
              password: document.getElementById('password').value,
              orders: []
          };

          // **Check if user already exists before proceeding**
          if (users.some(u => u.email === user.email)) {
              alert('User already exists!');
              return; // Stop execution if user exists
          }

          let isValid = true;

          // Clear previous error messages
          document.querySelectorAll(".error").forEach(error => error.textContent = "");

          // Customer Name Validation
          if (!/^[A-Za-z ]+$/.test(user.name)) {
              document.getElementById("nameError").textContent = "Customer Name must have alphabets only.";
              isValid = false;
          }

          // Email Validation
          if (!user.email.includes("@")) {
              document.getElementById("emailError").textContent = "Email ID not valid.";
              isValid = false;
          }

          // Password Validation
          let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/;
          if (!passwordRegex.test(user.password)) {
              document.getElementById("passwordError").textContent = "Password must be at least 5 characters, contain 1 uppercase, 1 number & 1 special character.";
              isValid = false;
          }

          // Address Validation
          if (user.address.length === 0) {
              document.getElementById("addressError").textContent = "Address field cannot be empty.";
              isValid = false;
          }

          // Contact Number Validation
          if (!/^\d{10}$/.test(user.mobile)) {
              document.getElementById("contactError").textContent = "Contact number must contain exactly 10 digits.";
              isValid = false;
          }

          // If all validations pass, proceed with registration
          if (isValid) {
              let customerId = Math.floor(1000 + Math.random() * 9000); // Generate random Customer ID

              // Show success popup
              document.getElementById("modalCustomerId").textContent = customerId;
              document.getElementById("modalCustomerName").textContent = user.name;
              document.getElementById("modalCustomerEmail").textContent = user.email;

              document.getElementById("popupModal").style.display = "flex";

              // Close popup when clicking the close button
              document.querySelector(".close").addEventListener("click", function () {
                  document.getElementById("popupModal").style.display = "none";
                  window.location.href = 'login.html';

              });

              // Close popup when clicking outside the modal
              window.addEventListener("click", function (event) {
                  let modal = document.getElementById("popupModal");
                  if (event.target === modal) {
                      modal.style.display = "none";
                      window.location.href = 'login.html';

                  }
              });

              // **Save user data only after successful validation**
              users.push(user);
              localStorage.setItem('users', JSON.stringify(users));

              /*alert('Registration successful!');*/
            }
      });
  }
});
