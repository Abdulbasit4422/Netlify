(() => {
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem('ao-theme'); } catch (_) { return null; } })();
  if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;

  document.querySelectorAll('.theme-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('ao-theme', next); } catch (_) { /* storage may be unavailable */ }
      button.setAttribute('aria-label', next === 'dark' ? 'Switch to light colour theme' : 'Switch to dark colour theme');
    });
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.hidden) {
        mobileNav.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const researchItems = document.querySelectorAll('.research-item[data-category], .project-tile[data-category]');
  if (filterButtons.length && researchItems.length) {
    filterButtons.forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((candidate) => candidate.classList.toggle('is-selected', candidate === button));
      researchItems.forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.category !== filter;
      });
    }));
  }

  document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const original = button.innerHTML;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = 'Email address copied';
    } catch (_) {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.setAttribute('readonly', '');
      helper.style.position = 'absolute';
      helper.style.left = '-9999px';
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand('copy');
      helper.remove();
      button.textContent = copied ? 'Email address copied' : value;
    }
    window.setTimeout(() => { button.innerHTML = original; }, 2200);
  }));

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
