document.addEventListener('DOMContentLoaded',()=>{
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50),{passive:true});
  const hb=document.querySelector('.nav-hamburger'),nl=document.querySelector('.nav-links');
  if(hb){hb.addEventListener('click',()=>{const o=nl.classList.toggle('mobile-open');hb.setAttribute('aria-expanded',o)});nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('mobile-open')))}
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
  // Filtre catégories
  document.querySelectorAll('.cat-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.getAttribute('data-cat');
      document.querySelectorAll('.article-card').forEach(card=>{
        if(f==='all'||card.getAttribute('data-cat')===f){card.style.display='';card.removeAttribute('data-hidden')}
        else{card.style.display='none';card.setAttribute('data-hidden','')}
      });
    });
  });
  // Recherche
  const search=document.getElementById('blog-search');
  if(search){search.addEventListener('input',()=>{const q=search.value.toLowerCase();document.querySelectorAll('.article-card').forEach(card=>{const txt=card.textContent.toLowerCase();card.style.display=txt.includes(q)?'':'none'})})}
  // Newsletter
  const nlBtn=document.querySelector('.nl-form .btn-primary');
  if(nlBtn){nlBtn.addEventListener('click',()=>{const inp=document.querySelector('.nl-form input');if(inp&&inp.value.includes('@')){nlBtn.textContent='✓ Inscrit !';nlBtn.style.background='#00A896';inp.value='';setTimeout(()=>{nlBtn.textContent='S\'abonner';nlBtn.style.background=''},3000)}})}
  const wa=document.getElementById('wa-float');
  if(wa)wa.addEventListener('click',()=>window.open('https://wa.me/2250700000000?text='+encodeURIComponent('Bonjour SISBM Academy.'),'_blank'));
});
