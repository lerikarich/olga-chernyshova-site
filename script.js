const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-nav');
const toast = document.querySelector('.toast');
let toastTimer;

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-service]').forEach((control) => control.addEventListener('click', (event) => {
  if (control.tagName === 'A') event.preventDefault();
  const service = control.dataset.service;
  toast.textContent = `Вы выбрали: ${service}. Напишите нам — подберём подходящий уход.`;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3800);
  if (control.tagName === 'A') setTimeout(() => { window.location.hash = 'contacts'; }, 250);
}));
