document.addEventListener('DOMContentLoaded',()=>{
  /* ── LOADER ── */
  window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');if(l){l.classList.add('hidden');setTimeout(()=>{l.style.display='none'},500)}},2000)});
  // Navbar scroll
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50),{passive:true});
  // Hamburger
  const hb=document.querySelector('.nav-hamburger'),nl=document.querySelector('.nav-links');
  if(hb){hb.addEventListener('click',()=>{const o=nl.classList.toggle('mobile-open');hb.setAttribute('aria-expanded',o)});nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('mobile-open')))}
  // AOS
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
  // Filtres
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.getAttribute('data-filter');
      document.querySelectorAll('.formation-detail').forEach(card=>{
        if(f==='all'||card.getAttribute('data-level')===f){card.style.display='';card.removeAttribute('data-hidden')}
        else{card.style.display='none';card.setAttribute('data-hidden','')}
      });
    });
  });
  // FAQ
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click',()=>{
      const open=item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
      if(!open)item.classList.add('open');
    });
  });
  // Pre-select formation from URL param
  const params=new URLSearchParams(window.location.search);
  const f=params.get('formation');
  if(f){const el=document.getElementById(f.replace('-off','').replace('-def',''));if(el){setTimeout(()=>{const top=el.getBoundingClientRect().top+window.scrollY-130;window.scrollTo({top,behavior:'smooth'})},500)}}
  // WhatsApp
  const wa=document.getElementById('wa-float');
  if(wa)wa.addEventListener('click',()=>window.open('https://wa.me/2250700000000?text='+encodeURIComponent('Bonjour SISBM, je souhaite des informations sur vos formations.'),'_blank'));
});
