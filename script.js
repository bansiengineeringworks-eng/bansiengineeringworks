/* ===========================
   BANSI ENGINEERING WORKS
   script.js
=========================== */

// ---- NAV: scroll shadow ----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- MOBILE MENU ----
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ---- SCROLL ANIMATIONS ----
const fadeEls = document.querySelectorAll(
  '.service-card, .why-item, .pg-cell, .tag, .section-header, .cap-text, .cap-visual, .contact-info, .contact-form'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in groups
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (Array.from(fadeEls).indexOf(entry.target) % 6));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('[name="name"]').value.trim();
  const phone = contactForm.querySelector('[name="phone"]').value.trim();

  if (!name || !phone) {
    // Highlight empty required fields
    contactForm.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#E24B4A';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    return;
  }

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    contactForm.reset();
    submitBtn.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 1200);
});

// ---- SMOOTH SCROLL for older browsers ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PRECISION GRID: hover tilt effect ----
document.querySelectorAll('.pg-cell').forEach(cell => {
  cell.addEventListener('mousemove', (e) => {
    const rect = cell.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cell.style.transform = `perspective(300px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.04)`;
  });
  cell.addEventListener('mouseleave', () => {
    cell.style.transform = '';
  });
});

// ---- ACTIVE NAV LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-nav');
    }
  });
}, { passive: true });
