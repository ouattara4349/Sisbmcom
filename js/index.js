/* =============================================
   SISBM ACADEMY – index.js (Page d'accueil)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── 2. MENU MOBILE (hamburger) ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', open);
    });
    // Fermer au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  /* ── 3. ANIMATIONS AU SCROLL (AOS léger) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  /* ── 4. COMPTEURS ANIMÉS ── */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'));
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start    = performance.now();
    const update   = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* ── 5. SCROLL SMOOTH POUR ANCRES ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 6. BOUTON WHATSAPP ── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.addEventListener('click', () => {
      const phone   = '2250700000000'; // ← Remplacer par le vrai numéro
      const message = encodeURIComponent('Bonjour SISBM Academy, je souhaite avoir des informations sur vos services.');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
  }

  /* ── 7. TYPEWRITER EFFECT ── */
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const texts = ['avenir numérique', 'sécurité robuste', 'transformation digitale'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const delayBetween = 1500;

    function typewriter() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typewriterEl.textContent = currentText.substring(0, charIndex);

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typewriter, delayBetween);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typewriter, 500);
      } else {
        setTimeout(typewriter, isDeleting ? deletingSpeed : typingSpeed);
      }
    }

    setTimeout(typewriter, 500);
  }

});
