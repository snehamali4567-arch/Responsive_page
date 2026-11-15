const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const links      = navLinks.querySelectorAll('a');
const sections   = document.querySelectorAll('section');

// ── Login modal elements ──
const loginBtn     = document.getElementById('loginBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const loginForm    = document.getElementById('loginForm');
const formError    = document.getElementById('formError');

// ── Scroll: toggle .scrolled ──
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightActiveLink();
}, { passive: true });

// ── Hamburger toggle ──
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active link on scroll ──
function highlightActiveLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Modal open / close ──
function openModal() {
  modalOverlay.classList.add('open');
  document.getElementById('email').focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  loginForm.reset();
  formError.textContent = '';
}

loginBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

// close on backdrop click
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Login form submit (client-side demo validation) ──
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  formError.textContent = '';

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    formError.textContent = 'Please fill in all fields.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formError.textContent = 'Enter a valid email address.';
    return;
  }

  if (password.length < 6) {
    formError.textContent = 'Password must be at least 6 characters.';
    return;
  }

  // Simulate successful login
  closeModal();
  alert(`Welcome, ${email}!`);
});