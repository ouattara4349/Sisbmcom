document.addEventListener('DOMContentLoaded',()=>{
  /* ── LOADER ── */
  window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');if(l){l.classList.add('hidden');setTimeout(()=>{l.style.display='none'},500)}},2000)});
  // Navbar scroll
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50),{passive:true});
  // Hamburger
  const hb=document.querySelector('.nav-hamburger'),nl=document.querySelector('.nav-links');
  if(hb){
    hb.addEventListener('click',()=>{const o=nl.classList.toggle('mobile-open');hb.setAttribute('aria-expanded',o)});
    nl.querySelectorAll('a:not(.dropdown > a)').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('mobile-open')));
    const dropdownToggle=nl.querySelector('.dropdown > a');
    if(dropdownToggle){
      dropdownToggle.addEventListener('click',(e)=>{
        if(window.innerWidth<=768){
          e.preventDefault();
          e.stopPropagation();
          const dropdown=dropdownToggle.parentElement;
          dropdown.classList.toggle('dropdown-open');
        }
      });
    }

    /* Highlight current page link */
    const pageFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === pageFile || (pageFile === '' && href === 'index.html') || (href === 'service-cybersecurite.html' && pageFile === 'service-cybersecurite.html')) {
        link.classList.add('active');
        const parent = link.closest('.dropdown');
        if (parent) parent.classList.add('dropdown-open');
      }
    });
  }
  // AOS
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
  // Filtres
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const filter=btn.getAttribute('data-filter');
      document.querySelectorAll('.formation-card').forEach(card=>{
        if(filter==='all'||card.getAttribute('data-category')===filter){
          card.style.display='block';
        }else{
          card.style.display='none';
        }
      });
    });
  });
});
