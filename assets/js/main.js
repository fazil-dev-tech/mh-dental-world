/* ============================================================
   MH DENTAL WORLD — Main JS Utilities
   Navbar · Scroll Reveal · Counters · FAQ · Carousel · Toast
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initFAQ();
  initLightbox();
  initMobileCTA();
  populateContactLinks();
  animateCountersOnScroll();
});

/* ── Navbar Scroll + Hamburger ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    // fire on load
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ── FAQ Accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // close siblings
      item.parentElement.querySelectorAll('.faq-item.active').forEach(sibling => {
        if (sibling !== item) sibling.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });
}

/* ── Lightbox ── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      lbImg.src = trigger.dataset.lightbox || trigger.querySelector('img')?.src || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lbClose) {
    lbClose.addEventListener('click', closeLightbox);
  }
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ── Mobile Sticky CTA ── */
function initMobileCTA() {
  const callBtn = document.getElementById('mobile-call-btn');
  const waBtn = document.getElementById('mobile-wa-btn');
  if (callBtn) callBtn.href = MH.getCallLink();
  if (waBtn) waBtn.href = MH.getWhatsAppLink();
}

/* ── Populate Contact Links ── */
function populateContactLinks() {
  // WhatsApp floating
  const floatingWA = document.getElementById('floating-whatsapp');
  if (floatingWA) floatingWA.href = MH.getWhatsAppLink();

  // All elements with data-phone
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.textContent = MH.CLINIC.phone;
    if (el.tagName === 'A') el.href = MH.getCallLink();
  });

  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = MH.CLINIC.email;
    if (el.tagName === 'A') el.href = `mailto:${MH.CLINIC.email}`;
  });

  document.querySelectorAll('[data-address]').forEach(el => {
    el.textContent = MH.CLINIC.address;
  });

  document.querySelectorAll('[data-timings]').forEach(el => {
    el.textContent = MH.CLINIC.timings;
  });
}

/* ── Animated Counters ── */
function animateCountersOnScroll() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '50px' });

  counters.forEach(el => {
    // If element is already visible, animate immediately
    if (isInViewport(el)) {
      setTimeout(() => animateCounter(el), 300);
    } else {
      observer.observe(el);
    }
  });

  // Also listen for scroll for any missed elements
  let scrollTimer;
  function onScroll() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      counters.forEach(el => {
        if (el.dataset.animated !== 'true' && isInViewport(el)) {
          animateCounter(el);
        }
      });
    }, 100);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}

function animateCounter(el) {
  if (el.dataset.animated === 'true') return;
  el.dataset.animated = 'true';
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ── Reviews Carousel ── */
function initReviewsCarousel(trackSelector = '.reviews-track', opts = {}) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const cards = track.children;
  let currentIndex = 0;
  const gap = 32;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updatePosition() {
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const cardWidth = cards[0]?.offsetWidth || 0;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Controls
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; updatePosition(); }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      if (currentIndex < maxIndex) { currentIndex++; updatePosition(); }
    });
  }

  // Dots
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { currentIndex = i; updatePosition(); });
  });

  window.addEventListener('resize', updatePosition);
  updatePosition();

  // Auto-play
  if (opts.autoplay) {
    setInterval(() => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, cards.length - visible);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updatePosition();
    }, opts.interval || 5000);
  }
}

/* ── Toast Notifications ── */
function showToast(message, type = 'success', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s var(--ease-out) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Export
window.MH = window.MH || {};
window.MH.showToast = showToast;
window.MH.initReviewsCarousel = initReviewsCarousel;
