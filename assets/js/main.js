(() => {
  'use strict';

  const doc = document;

  // Switch exploration CTAs to App Store buttons only when an actual listing URL is provided.
  const storeURL = window.HEARTORA_CONFIG?.appStoreUrl?.trim();
  if (storeURL && /^https:\/\/apps\.apple\.com\//i.test(storeURL)) {
    doc.querySelectorAll('[data-store-cta]').forEach((link) => {
      link.href = storeURL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Download Heartora on the App Store (opens in a new tab)');
      const svg = link.querySelector('svg')?.outerHTML || '';
      link.innerHTML = 'Get Heartora on iOS ' + svg;
    });
  }
  doc.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  // Progressive enhancement: content remains visible if JavaScript is off.
  const revealElements = [...doc.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    doc.documentElement.classList.add('js-ready');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.06 });
    revealElements.forEach((element) => observer.observe(element));
  }

  const menuButton = doc.querySelector('.menu-toggle');
  const nav = doc.querySelector('#primary-nav');
  const closeMenu = () => {
    doc.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
  };
  menuButton?.addEventListener('click', () => {
    const open = !doc.body.classList.contains('menu-open');
    doc.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  doc.addEventListener('click', (event) => {
    if (doc.body.classList.contains('menu-open') && !event.target.closest('.site-header')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) closeMenu();
  }, { passive: true });

  const gallery = doc.querySelector('#gallery-track');
  doc.querySelectorAll('[data-scroll]').forEach((control) => {
    control.addEventListener('click', () => {
      if (!gallery) return;
      const direction = control.dataset.scroll === 'next' ? 1 : -1;
      const firstItem = gallery.querySelector('.gallery-tile');
      const distance = firstItem ? firstItem.getBoundingClientRect().width + 18 : 290;
      gallery.scrollBy({ left: direction * distance, behavior: 'smooth' });
    });
  });

  const dialog = doc.querySelector('#preview-dialog');
  const dialogImage = doc.querySelector('#dialog-image');
  const dialogCaption = doc.querySelector('#dialog-caption');
  doc.querySelectorAll('[data-preview]').forEach((tile) => {
    tile.addEventListener('click', () => {
      if (!dialog || !dialogImage) return;
      dialogImage.src = tile.dataset.preview;
      dialogImage.alt = tile.querySelector('img')?.alt || 'Heartora preview';
      if (dialogCaption) dialogCaption.textContent = tile.dataset.caption || 'Heartora preview';
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  doc.querySelector('#dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  doc.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const address = button.dataset.copyEmail;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(address);
          copied = true;
        }
      } catch (_) { /* Gracefully fall back below. */ }
      if (!copied) {
        const field = doc.createElement('textarea');
        field.value = address;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        doc.body.appendChild(field);
        field.select();
        try { copied = doc.execCommand('copy'); } catch (_) { copied = false; }
        field.remove();
      }
      const caption = button.querySelector('span');
      if (caption) {
        caption.textContent = copied ? 'Copied!' : 'Select the address above';
        window.setTimeout(() => { caption.textContent = 'Copy email'; }, 2000);
      }
    });
  });
})();
