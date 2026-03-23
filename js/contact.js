/* =============================================
   SISBM ACADEMY – contact.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '2250720161466';

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

  /* ── NAVBAR SCROLL ── */
  const nb = document.getElementById('navbar');
  if (nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

  /* ── MENU MOBILE ── */
  const hb = document.querySelector('.nav-hamburger');
  const nl = document.querySelector('.nav-links');
  if (hb) {
    hb.addEventListener('click', () => {
      const o = nl.classList.toggle('mobile-open');
      hb.setAttribute('aria-expanded', o);
    });
    nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('mobile-open')));
  }

  /* ── AOS ── */
  const obs = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('aos-animate'); obs.unobserve(x.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

  /* ── FAQ ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ── Afficher champ formation si service = formation ── */
  const serviceSelect  = document.getElementById('cf-service');
  const formationGroup = document.getElementById('formation-group');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      formationGroup.style.display = serviceSelect.value === 'formation' ? 'block' : 'none';
    });
  }

  /* ── Pré-remplir depuis URL (?formation=cyber-off) ── */
  const params = new URLSearchParams(window.location.search);
  const f = params.get('formation');
  if (f && serviceSelect) {
    serviceSelect.value = 'formation';
    formationGroup.style.display = 'block';
    const fs = document.getElementById('cf-formation');
    if (fs) {
      fs.querySelectorAll('option').forEach(o => {
        if (o.value === f || o.text.toLowerCase().includes(f.replace('-', ' '))) o.selected = true;
      });
    }
  }

  /* ════════════════════════════════════════
     FORMULAIRE → WHATSAPP STRUCTURÉ
  ════════════════════════════════════════ */

  const form = document.getElementById('contact-form'); /* ton id original */

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      /* ── Champs ── */
      const name      = document.getElementById('cf-name');
      const email     = document.getElementById('cf-email');
      const phone     = document.getElementById('cf-phone');
      const company   = document.getElementById('cf-company');
      const service   = document.getElementById('cf-service');
      const formation = document.getElementById('cf-formation');
      const budget    = document.getElementById('cf-budget');
      const msg       = document.getElementById('cf-message');
      const rgpd      = document.getElementById('cf-rgpd');

      /* ── Validation ── */
      let valid = true;
      const errName    = document.getElementById('err-name');
      const errEmail   = document.getElementById('err-email');
      const errService = document.getElementById('err-service');
      const errMsg     = document.getElementById('err-message');

      if (!name.value.trim())        { errName.textContent    = 'Ce champ est requis';           valid = false; } else { errName.textContent    = ''; }
      if (!email.value.includes('@')){ errEmail.textContent   = 'Email invalide';                valid = false; } else { errEmail.textContent   = ''; }
      if (!service.value)            { errService.textContent = 'Veuillez sélectionner un objet';valid = false; } else { errService.textContent = ''; }
      if (!msg.value.trim())         { errMsg.textContent     = 'Veuillez décrire votre demande';valid = false; } else { errMsg.textContent     = ''; }

      if (rgpd && !rgpd.checked) {
        alert('Veuillez accepter la politique de confidentialité.');
        valid = false;
      }

      if (!valid) return;

      /* ── Construire le message WhatsApp bien structuré ── */
      const serviceLabel  = service.options[service.selectedIndex].text;
      const formationVal  = (formation && formation.value) ? formation.options[formation.selectedIndex].text : null;
      const budgetVal     = (budget && budget.value)       ? budget.options[budget.selectedIndex].text       : null;
      const phoneVal      = phone && phone.value.trim()    ? phone.value.trim()   : 'Non renseigné';
      const companyVal    = company && company.value.trim()? company.value.trim() : 'Non renseignée';

      const message = [
        '━━━━━━━━━━━━━━━━━━━━',
        '📋 *NOUVELLE DEMANDE – SISBM*',
        '━━━━━━━━━━━━━━━━━━━━',
        '',
        '👤 *Nom :* '        + name.value.trim(),
        '📧 *Email :* '      + email.value.trim(),
        '📞 *Téléphone :* '  + phoneVal,
        '🏢 *Entreprise :* ' + companyVal,
        '',
        '━━━━━━━━━━━━━━━━━━━━',
        '🎯 *Objet :* '      + serviceLabel,
        formationVal ? '🎓 *Formation :* ' + formationVal : null,
        budgetVal    ? '💰 *Budget :* '    + budgetVal    : null,
        '',
        '━━━━━━━━━━━━━━━━━━━━',
        '💬 *Message :*',
        msg.value.trim(),
        '━━━━━━━━━━━━━━━━━━━━',
      ]
      .filter(line => line !== null)
      .join('\n');

      /* ── Feedback visuel ── */
      const btn     = document.getElementById('submit-btn');
      const btnTxt  = document.getElementById('btn-text');
      const btnLoad = document.getElementById('btn-loading');
      const success = document.getElementById('form-success');

      btn.disabled = true;
      if (btnTxt)  btnTxt.style.display  = 'none';
      if (btnLoad) btnLoad.style.display = 'inline';

      /* ── Ouvrir WhatsApp après 800ms ── */
      setTimeout(() => {

        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message), '_blank');

        /* Réinitialiser bouton */
        btn.disabled = false;
        if (btnTxt)  btnTxt.style.display  = 'inline';
        if (btnLoad) btnLoad.style.display = 'none';

        /* Message succès */
        if (success) {
          success.style.display = 'flex';
          setTimeout(() => { success.style.display = 'none'; }, 6000);
        }

        /* Reset formulaire */
        form.reset();
        if (formationGroup) formationGroup.style.display = 'none';

      }, 800);
    });
  }

  /* ── WHATSAPP FLOTTANT ── */
  const wa = document.getElementById('wa-float');
  if (wa) {
    wa.addEventListener('click', () => {
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Bonjour SISBM Academy, je souhaite un devis.'), '_blank');
    });
  }

  /* ── IMAGE CIRCULAIRE ANIMATION (hover) ── */
  const heroImg = document.querySelector('.page-hero-image-circle img');
  if (heroImg) {
    heroImg.addEventListener('mouseenter', () => {
      heroImg.style.transform  = 'scale(1.08) rotate(2deg)';
      heroImg.style.transition = 'all 0.3s ease';
    });
    heroImg.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'scale(1) rotate(0)';
    });
  }

});