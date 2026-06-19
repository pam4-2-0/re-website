// Shrink header on scroll (Aron-style)
const mainHeader = document.querySelector('header.l-header');
if (mainHeader) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Sidenav controls
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidenav = document.getElementById('sidenav');
const sidenavClose = document.getElementById('sidenavClose');
const backdrop = document.getElementById('backdrop');

function openSidenav() {
  sidenav.classList.add('open');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidenav() {
  sidenav.classList.remove('open');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidenav);
if (sidenavClose) sidenavClose.addEventListener('click', closeSidenav);
if (backdrop) backdrop.addEventListener('click', closeSidenav);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && sidenav && sidenav.classList.contains('open')) {
    closeSidenav();
  }
});

// Scroll reveal — observe .reveal elements, thêm class .visible khi vào viewport
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    e.isIntersecting
      ? e.target.classList.add('visible')
      : e.target.classList.remove('visible');
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
