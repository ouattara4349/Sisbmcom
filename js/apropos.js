document.addEventListener('DOMContentLoaded',()=>{
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50),{passive:true});
  const hb=document.querySelector('.nav-hamburger'),nl=document.querySelector('.nav-links');
  if(hb){hb.addEventListener('click',()=>{const o=nl.classList.toggle('mobile-open');hb.setAttribute('aria-expanded',o)});nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('mobile-open')))}
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
  // Compteurs animés
  const cObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){animCount(x.target);cObs.unobserve(x.target)}})},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));
  function animCount(el){const t=parseInt(el.getAttribute('data-count')),s=el.getAttribute('data-suffix')||'',d=1800,start=performance.now();const u=(now)=>{const p=Math.min((now-start)/d,1),e=1-Math.pow(1-p,4);el.textContent=Math.floor(e*t)+s;if(p<1)requestAnimationFrame(u)};requestAnimationFrame(u)}
  const wa=document.getElementById('wa-float');
  if(wa)wa.addEventListener('click',()=>window.open('https://wa.me/2250700000000?text='+encodeURIComponent('Bonjour SISBM Academy.'),'_blank'));
});
