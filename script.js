(() => {
  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initTheme();
  initNavigation();
  initProjectFilters();
  initReveal();
  updateYear();

  function initTheme() {
    const savedTheme = localStorage.getItem('yz-theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || preferredTheme;
    setTheme(theme);

    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('yz-theme', nextTheme);
      });
    });
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle').forEach((button) => {
      button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      const icon = button.querySelector('.theme-icon');
      if (icon) icon.textContent = isDark ? '☀' : '◐';
    });

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', isDark ? '#111616' : '#f3f1e9');
  }

  function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const willOpen = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      body.classList.toggle('menu-open', willOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) close();
    });
  }

  function initProjectFilters() {
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('[data-categories]')];
    const emptyState = document.querySelector('.empty-state');
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        let visibleCount = 0;

        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });

        cards.forEach((card) => {
          const categories = card.dataset.categories.split(' ');
          const visible = filter === 'all' || categories.includes(filter);
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });

        if (emptyState) emptyState.hidden = visibleCount !== 0;
      });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    root.classList.add('has-motion');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    items.forEach((item) => observer.observe(item));
  }

  function updateYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = year; });
  }
})();
