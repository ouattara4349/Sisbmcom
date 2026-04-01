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
      const errPhone   = document.getElementById('err-phone');
      const errService = document.getElementById('err-service');
      const errMsg     = document.getElementById('err-message');

      if (!name.value.trim())        { errName.textContent    = 'Ce champ est requis';           valid = false; } else { errName.textContent    = ''; }
      if (!email.value.includes('@')){ errEmail.textContent   = 'Email invalide';                valid = false; } else { errEmail.textContent   = ''; }
      
      // Validation du téléphone : uniquement chiffres, espaces, +, -, parenthèses
      const phoneRegex = /^[0-9+\s\-()]+$/;
      if (phone && phone.value.trim()) {
        if (!phoneRegex.test(phone.value.trim())) {
          errPhone.textContent = 'Numéro invalide : utilisez uniquement des chiffres';
          valid = false;
        } else {
          errPhone.textContent = '';
        }
      } else {
        errPhone.textContent = '';
      }
      
      if (!service.value)            { errService.textContent = 'Veuillez sélectionner un objet';valid = false; } else { errService.textContent = ''; }
      if (!msg.value.trim())         { errMsg.textContent     = 'Veuillez décrire votre demande';valid = false; } else { errMsg.textContent     = ''; }

      if (rgpd && !rgpd.checked) {
        alert('Veuillez accepter la politique de confidentialité.');
        valid = false;
      }

      if (!valid) return;

      /* ── Feedback visuel ── */
      const btn     = document.getElementById('submit-btn');
      const btnTxt  = document.getElementById('btn-text');
      const btnLoad = document.getElementById('btn-loading');
      const success = document.getElementById('form-success');

      btn.disabled = true;
      if (btnTxt)  btnTxt.style.display  = 'none';
      if (btnLoad) btnLoad.style.display = 'inline';

      /* ── Envoyer via Formspree ── */
      const formData = new FormData();
      formData.append('name', name.value.trim());
      formData.append('email', email.value.trim());
      formData.append('phone', phoneVal);
      formData.append('company', companyVal);
      formData.append('service', serviceLabel);
      formData.append('formation', formationVal || '');
      formData.append('budget', budgetVal || '');
      formData.append('message', msg.value.trim());

      /* ⚠️ FORMSPREE ID - NE PAS MODIFIER */
      fetch('https://formspree.io/f/xojplwld', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          /* ── Succès ── */
          if (btnLoad) btnLoad.style.display = 'none';
          success.style.display = 'block';
          form.reset();
          if (formationGroup) formationGroup.style.display = 'none';
          setTimeout(() => { success.style.display = 'none'; btn.disabled = false; if (btnTxt) btnTxt.style.display = 'inline'; }, 5000);
        } else {
          throw new Error('Erreur');
        }
      })
      .catch(() => {
        /* ── Erreur → Message d'erreur ── */
        btn.disabled = false;
        if (btnLoad) btnLoad.style.display = 'none';
        if (btnTxt)  btnTxt.style.display  = 'inline';
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');

        if (success) {
          success.style.display = 'flex';
          setTimeout(() => { success.style.display = 'none'; }, 6000);
        }

        form.reset();
        if (formationGroup) formationGroup.style.display = 'none';
      });
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