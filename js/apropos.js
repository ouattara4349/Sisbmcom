/* =============================================
   SISBM ACADEMY – apropos.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('loader');
      if (l) {
        l.classList.add('hidden');
        setTimeout(() => { l.style.display = 'none'; }, 500);
      }
    }, 2000);
  });

  /* ── AOS ANIMATIONS ── */
  const obs = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('aos-animate'); obs.unobserve(x.target); }
    });
  }, { threshold: .1 });
  document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

  /* ── COMPTEURS ANIMÉS ── */
  const cObs = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting) { animCount(x.target); cObs.unobserve(x.target); }
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));

  function animCount(el) {
    const t = parseInt(el.getAttribute('data-count'));
    const s = el.getAttribute('data-suffix') || '';
    const d = 1800;
    const start = performance.now();
    const u = (now) => {
      const p = Math.min((now - start) / d, 1);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(e * t) + s;
      if (p < 1) requestAnimationFrame(u);
    };
    requestAnimationFrame(u);
  }

  /* ── WHATSAPP ── */
  const wa = document.getElementById('wa-float');
  if (wa) wa.addEventListener('click', () => window.open('https://wa.me/2250720161466?text=' + encodeURIComponent('Bonjour SISBM Academy.'), '_blank'));

  /* ════════════════════════════════════════
     CAROUSEL HERO – 4 images
  ════════════════════════════════════════ */

  const slides = [
    { src: 'images/notre equipe.png', label: 'Notre équipe' },
    { src: 'images/FORMATION.jpg', label: 'Nos formations' },
    { src: 'images/imserver.jpg', label: 'Nos bureaux' },
    { src: 'images/CERTIFICAT.png', label: 'Nos certifications' }
  ];

  const mainImg   = document.getElementById('carousel-main-img');
  const mainLabel = document.getElementById('carousel-main-label');
  const thumbs    = document.querySelectorAll('.carousel-thumb');
  const dots      = document.querySelectorAll('.cdot');
  const btnPrev   = document.getElementById('carousel-prev');
  const btnNext   = document.getElementById('carousel-next');

  /* Vérifier que le carousel existe sur la page */
  if (!mainImg) return;

  let current      = 0;
  let autoplayTimer = null;

  /* ── Fonction de changement d'image ── */
  function goTo(index) {
    if (index === current) return;
    current = ((index % slides.length) + slides.length) % slides.length;

    /* Fade out */
    mainImg.classList.add('fade-out');

    setTimeout(() => {
      /* Mettre à jour image + label */
      mainImg.src             = slides[current].src;
      mainLabel.textContent   = slides[current].label;

      /* Fade in */
      mainImg.classList.remove('fade-out');

      /* Miniatures actives */
      thumbs.forEach((t, i) => t.classList.toggle('active', i === current));

      /* Points actifs */
      dots.forEach((d, i) => d.classList.toggle('active', i === current));

    }, 300);
  }

  /* ── Clic sur miniature ── */
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => { resetAutoplay(); goTo(i); });
  });

  /* ── Clic sur points ── */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { resetAutoplay(); goTo(i); });
  });

  /* ── Flèches ── */
  if (btnPrev) btnPrev.addEventListener('click', () => { resetAutoplay(); goTo(current - 1); });
  if (btnNext) btnNext.addEventListener('click', () => { resetAutoplay(); goTo(current + 1); });

  /* ── Autoplay toutes les 4 secondes ── */
  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  /* ── Pause au survol ── */
  const carouselWrap = document.querySelector('.hero-carousel-wrap');
  if (carouselWrap) {
    carouselWrap.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carouselWrap.addEventListener('mouseleave', startAutoplay);
  }

  /* ── Swipe tactile (mobile) ── */
  let touchStartX = 0;
  mainImg.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  mainImg.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) { resetAutoplay(); goTo(diff > 0 ? current + 1 : current - 1); }
  }, { passive: true });

  /* ── Démarrer ── */
  startAutoplay();

});