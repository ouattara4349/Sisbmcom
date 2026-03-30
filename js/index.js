/* =============================================
   SISBM ACADEMY – index.js (Page d'accueil)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 2000); // Délai minimum de 2 secondes
  });

  /* ── 1. NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── 2. MENU MOBILE (hamburger) ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', open);
    });

    /* Fermer le menu au clic en dehors */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    /* Fermer au clic sur un lien — SANS bloquer la navigation */
    navLinks.querySelectorAll('a:not(.dropdown > a)').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Handle dropdown toggle on mobile */
    const dropdownToggle = navLinks.querySelector('.dropdown > a');
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const dropdown = dropdownToggle.parentElement;
          dropdown.classList.toggle('dropdown-open');
        }
      });
    }
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

  /* ── 5. SCROLL SMOOTH POUR ANCRES INTERNES UNIQUEMENT ── */
  /*
    CORRECTION DU BUG :
    L'ancien code utilisait 'a[href^="#"]' qui capturait aussi
    des liens comme "contact.html#contact-form" en cherchant "#"
    n'importe où dans le href.

    Désormais on ne cible QUE les href qui commencent
    EXACTEMENT par "#" (ancres pures sur la même page).
    Tous les liens vers d'autres pages naviguent normalement.
  */
  document.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href') || '';

    /* Ancre pure sur la même page : "#section" */
    if (href.startsWith('#') && href.length > 1) {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        /* Si la cible n'existe pas → navigation normale */
      });
    }
    /* Liens vers d'autres pages (services.html, formations.html,
       contact.html#faq, etc.) → jamais interceptés */
  });

  /* ── 6. BOUTON WHATSAPP ── */
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.addEventListener('click', () => {
      window.open(
        'https://wa.me/2250720161466?text=' +
        encodeURIComponent('Bonjour SISBM, je souhaite des informations sur vos services.'),
        '_blank'
      );
    });
  }

  /* ── 7. TYPEWRITER EFFECT ── */
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const texts = ['avenir numérique', 'sécurité robuste', 'transformation digitale'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed   = 80;
    const deletingSpeed = 50;
    const delayBetween  = 1500;

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

  /* ── 8. TESTIMONIALS CAROUSEL ── */
  const testiTrack = document.querySelector('.testi-track');
  const testiDots = document.querySelectorAll('.testi-dot');
  const testiPrev = document.querySelector('.testi-prev');
  const testiNext = document.querySelector('.testi-next');
  
  if (testiTrack && testiDots.length > 0) {
    let currentIndex = 0;
    const totalSlides = testiDots.length;
    let autoSlideInterval;
    const isMobile = window.innerWidth <= 768;

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= totalSlides) currentIndex = 0;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      
      testiTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      testiDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
      if (!isMobile) {
        autoSlideInterval = setInterval(nextSlide, 4000);
      }
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Manual navigation
    if (testiNext) testiNext.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      if (!isMobile) startAutoSlide();
    });

    if (testiPrev) testiPrev.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      if (!isMobile) startAutoSlide();
    });

    // Dot navigation
    testiDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(index);
        if (!isMobile) startAutoSlide();
      });
    });

    // Pause on hover (desktop only)
    if (!isMobile) {
      const carousel = document.querySelector('.testi-carousel');
      if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
      }
    }

    // Start auto slide (desktop only)
    startAutoSlide();
  }

});