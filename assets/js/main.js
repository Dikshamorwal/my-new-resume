// ===== PATH RESOLVER =====
function base() {
  const depth = window.location.pathname.replace(/\/$/, '').split('/').length - 1;
  return depth > 0 ? '../'.repeat(depth) : '';
}

// ===== NAVBAR COMPONENT =====
function navbarHTML() {
  const b = base();
  return `
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="${b}index.html" class="navbar-brand">Diksha <span>Morwal</span></a>
    <div class="navbar-links" id="navbarLinks">
      <a href="${b}index.html" data-page="index">Home</a>
      <a href="${b}about.html" data-page="about">About</a>
      <a href="${b}skills.html" data-page="skills">Skills</a>
      <a href="${b}experience.html" data-page="experience">Experience</a>
      <a href="${b}blog.html" data-page="blog">Blog</a>
      <a href="${b}contact.html" data-page="contact">Contact</a>
      <a href="${b}resume.html" data-page="resume">Resume</a>
    </div>
    <div class="navbar-cta">
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>`; }

// ===== FOOTER COMPONENT =====
function footerHTML() {
  const b = base();
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <h3>Diksha <span>Morwal</span></h3>
        <p>Python Backend Developer</p>
      </div>
      <div class="footer-social">
        <a href="https://github.com/Dikshamorwal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href="mailto:dikshamorwal3[at]gmail[dot]com" aria-label="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </a>
        <a href="tel:+919810650887" aria-label="Phone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
        <a href="${b}contact.html" aria-label="Contact">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Diksha Morwal. All rights reserved.</p>
    </div>
  </div>
</footer>`; }

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  highlightActivePage();
  setupHamburger();
  setupScrollEffects();
  setupFadeIn();
  setupSkillBars();
  setupBlogSearch();
  setupContactForm();
});

// ===== INJECT COMPONENTS =====
function injectComponents() {
  const headerPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (headerPlaceholder) headerPlaceholder.innerHTML = navbarHTML();
  if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML();
}

// ===== ACTIVE PAGE =====
function highlightActivePage() {
  const page = document.body.dataset.page;
  if (!page) return;
  const links = document.querySelectorAll('.navbar-links a');
  links.forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active-page');
    }
  });
}

// ===== HAMBURGER =====
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navbarLinks = document.getElementById('navbarLinks');
  if (!hamburger || !navbarLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarLinks.classList.toggle('open');
  });

  navbarLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbarLinks.classList.remove('open');
    });
  });
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== FADE IN ANIMATIONS =====
function setupFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== SKILL BARS =====
function setupSkillBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + '%';
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.skill-bar-fill').forEach(el => observer.observe(el));
}

// ===== BLOG SEARCH =====
function setupBlogSearch() {
  const searchInput = document.getElementById('blogSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const text = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const category = card.querySelector('.blog-card-category')?.textContent?.toLowerCase() || '';
      if (title.includes(query) || text.includes(query) || category.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ===== CONTACT FORM =====
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.backgroundColor = '#059669';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}
