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
