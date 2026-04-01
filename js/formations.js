document.addEventListener('DOMContentLoaded',()=>{
  /* ── FAQ ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ── LOADER ── */
  window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');if(l){l.classList.add('hidden');setTimeout(()=>{l.style.display='none'},500)}},2000)});

  /* ── AOS ── */
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));

  /* ── FILTRES ── */
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
