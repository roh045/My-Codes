/* Minimal client-side validation and mock submit flow for Acme Bank login */
(function () {
  const form = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function setSubmitting(isSubmitting) {
    const label = submitBtn.querySelector('.btn-label');
    const spinner = submitBtn.querySelector('.spinner');
    submitBtn.disabled = isSubmitting;
    if (spinner) spinner.hidden = !isSubmitting;
    if (label) label.textContent = isSubmitting ? 'Signing in…' : submitBtn.dataset.defaultLabel || 'Sign in';
  }

  function showAlert(message, type = 'error') {
    alertBox.textContent = message;
    alertBox.hidden = false;
    alertBox.style.borderLeftColor = type === 'error' ? 'var(--danger)' : 'var(--success)';
  }

  function clearAlert() {
    alertBox.hidden = true;
    alertBox.textContent = '';
  }

  function validate() {
    let isValid = true;
    // Username
    if (!usernameInput.value.trim()) {
      usernameInput.setAttribute('aria-invalid', 'true');
      usernameError.textContent = 'Please enter your username or email.';
      isValid = false;
    } else {
      usernameInput.removeAttribute('aria-invalid');
      usernameError.textContent = '';
    }
    // Password
    const password = passwordInput.value;
    if (!password) {
      passwordInput.setAttribute('aria-invalid', 'true');
      passwordError.textContent = 'Please enter your password.';
      isValid = false;
    } else if (password.length < 8) {
      passwordInput.setAttribute('aria-invalid', 'true');
      passwordError.textContent = 'Password must be at least 8 characters.';
      isValid = false;
    } else {
      passwordInput.removeAttribute('aria-invalid');
      passwordError.textContent = '';
    }
    return isValid;
  }

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', function () {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    const pressed = isPassword ? 'true' : 'false';
    togglePasswordBtn.setAttribute('aria-pressed', pressed);
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  });

  // Real-time field validation
  usernameInput.addEventListener('input', function () {
    if (usernameInput.value.trim()) {
      usernameInput.removeAttribute('aria-invalid');
      usernameError.textContent = '';
    }
  });
  passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 8) {
      passwordInput.removeAttribute('aria-invalid');
      passwordError.textContent = '';
    }
  });

  // Mock submit flow
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    clearAlert();
    if (!validate()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setSubmitting(true);
    try {
      // Replace this mock with your real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mocked outcome: if username === "demo" and password === "password123", success
      const success = usernameInput.value.trim().toLowerCase() === 'demo' && passwordInput.value === 'password123';
      if (!success) {
        showAlert('Invalid credentials. Please try again.');
        return;
      }

      showAlert('Signed in successfully. Redirecting…', 'success');
      // In a real app, navigate after token is stored securely
      setTimeout(() => {
        window.location.href = '#/dashboard';
      }, 600);
    } catch (error) {
      showAlert('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  });
})();

