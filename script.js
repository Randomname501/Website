const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navAnchors = navLinks.querySelectorAll('a');
const navHeight = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
) || 64;

// Nav: darken on scroll (rAF-throttled — the only scroll listener on the page)
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    ticking = false;
  });
}, { passive: true });

// Mobile menu
const setMenu = (open) => {
  hamburger.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
};
hamburger.addEventListener('click', () => {
  setMenu(!navLinks.classList.contains('open'));
});
navAnchors.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    setMenu(false);
    hamburger.focus();
  }
});

// Active nav link: highlight the topmost section in the upper part of the viewport
const linkedSections = [...navAnchors]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const inView = new Set();
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting ? inView.add(e.target.id) : inView.delete(e.target.id));
  const current = linkedSections.find(s => inView.has(s.id));
  navAnchors.forEach(a => {
    a.classList.toggle('active', current !== undefined && a.getAttribute('href') === `#${current.id}`);
  });
}, { rootMargin: `-${navHeight}px 0px -55% 0px` });
linkedSections.forEach(s => spy.observe(s));

// Scroll-triggered fade-in
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
