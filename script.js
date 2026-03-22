document.addEventListener('DOMContentLoaded', () => {
  initActiveNav();
  initMobileMenu();
});

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function update() {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(s => {
      if (scrollY >= s.offsetTop) current = s.id;
    });

    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;

  let overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function toggle() {
    const open = sidebar.classList.toggle('open');
    overlay.classList.toggle('show', open);
  }

  function close() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', close);

  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) close();
    });
  });
}
