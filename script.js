/* Navigation and unobtrusive progressive enhancement. */
/* Apply the saved theme before styles paint; storage may be blocked in private browsing. */
(() => {
  'use strict';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { preference = localStorage.getItem('serene-theme'); } catch {}
  const initialTheme = preference === 'light' || preference === 'dark'
    ? preference : (systemTheme.matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = initialTheme;
})();

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  document.body.classList.add('js');
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let hasPreference = false;
  try { hasPreference = ['light', 'dark'].includes(localStorage.getItem('serene-theme')); } catch {}
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#19151f' : '#faf8f5';
  }
  themeButton.hidden = false;
  applyTheme(document.documentElement.dataset.theme);
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    hasPreference = true;
    applyTheme(theme);
    try { localStorage.setItem('serene-theme', theme); } catch {}
  });
  systemTheme.addEventListener('change', event => {
    if (!hasPreference) applyTheme(event.matches ? 'dark' : 'light');
  });
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  const links = [...menu.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const mobile = window.matchMedia('(max-width: 800px)');

  function closeMenu(restoreFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    menu.classList.remove('is-open');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.classList.toggle('is-open', open);
  });
  links.forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  navbar.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!navbar.contains(document.activeElement)) closeMenu();
    });
  });
  mobile.addEventListener('change', () => closeMenu());

  function updateNavigation() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    const offset = navbar.getBoundingClientRect().height + 70;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    }
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
      current = sections[sections.length - 1].id;
    }
    links.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', updateNavigation);
  updateNavigation();
  document.querySelector('#year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .timeline-card, .skill-category, .project-card, .achievement-card').forEach(element => observer.observe(element));
  }
});
