import cssText from '../css/style.css?inline';

// Injeta o CSS de forma otimizada (sem reflow forçado)
if (document.adoptedStyleSheets !== undefined) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
} else {
  const styleEl = document.createElement('style');
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
}

document.addEventListener('DOMContentLoaded', () => {
  // === NAVBAR SCROLL EFFECT ===
  const header = document.querySelector('header');
  let ticked = false;
  window.addEventListener('scroll', () => {
    if (!ticked) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticked = false;
      });
      ticked = true;
    }
  }, { passive: true });

  // === MOBILE MENU TOGGLE ===
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // === LAZY LOADING AND SCROLL ANIMATION ===
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));
});
