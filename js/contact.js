document.addEventListener('DOMContentLoaded',()=>{
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50),{passive:true});
  const hb=document.querySelector('.nav-hamburger'),nl=document.querySelector('.nav-links');
  if(hb){hb.addEventListener('click',()=>{const o=nl.classList.toggle('mobile-open');hb.setAttribute('aria-expanded',o)});nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('mobile-open')))}
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('aos-animate');obs.unobserve(x.target)}})},{threshold:.1});
  document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
  // FAQ
  document.querySelectorAll('.faq-item').forEach(item=>{item.querySelector('.faq-q').addEventListener('click',()=>{const open=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));if(!open)item.classList.add('open')})});
  // Afficher champ formation si service = formation
  const serviceSelect=document.getElementById('cf-service');
  const formationGroup=document.getElementById('formation-group');
  if(serviceSelect){serviceSelect.addEventListener('change',()=>{if(serviceSelect.value==='formation'){formationGroup.style.display='block'}else{formationGroup.style.display='none'}})}
  // Pre-fill from URL
  const params=new URLSearchParams(window.location.search);
  const f=params.get('formation');
  if(f&&serviceSelect){serviceSelect.value='formation';formationGroup.style.display='block';const fs=document.getElementById('cf-formation');if(fs){const opts=fs.querySelectorAll('option');opts.forEach(o=>{if(o.value===f||o.text.toLowerCase().includes(f.replace('-',' ')))o.selected=true})}}
  // Formulaire
  const form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    let valid=true;
    const name=document.getElementById('cf-name'),email=document.getElementById('cf-email'),service=document.getElementById('cf-service'),msg=document.getElementById('cf-message');
    const errName=document.getElementById('err-name'),errEmail=document.getElementById('err-email'),errService=document.getElementById('err-service'),errMsg=document.getElementById('err-message');
    if(!name.value.trim()){errName.textContent='Ce champ est requis';valid=false}else{errName.textContent=''}
    if(!email.value.includes('@')){errEmail.textContent='Email invalide';valid=false}else{errEmail.textContent=''}
    if(!service.value){errService.textContent='Veuillez sélectionner un objet';valid=false}else{errService.textContent=''}
    if(!msg.value.trim()){errMsg.textContent='Veuillez décrire votre demande';valid=false}else{errMsg.textContent=''}
    if(!valid)return;
    const btn=document.getElementById('submit-btn'),txt=document.getElementById('btn-text'),load=document.getElementById('btn-loading'),success=document.getElementById('form-success');
    btn.disabled=true;txt.style.display='none';load.style.display='inline';
    setTimeout(()=>{btn.disabled=false;txt.style.display='inline';load.style.display='none';success.style.display='block';form.reset();formationGroup.style.display='none';setTimeout(()=>{success.style.display='none'},5000)},1500);
  })}
  const wa=document.getElementById('wa-float');
  if(wa)wa.addEventListener('click',()=>window.open('https://wa.me/+225 07 20 16 14 66?text='+encodeURIComponent('Bonjour SISBM Academy, je souhaite un devis.'),'_blank'));
  // Image circulaire animation
  const heroImg=document.querySelector('.page-hero-image-circle img');
  if(heroImg){heroImg.addEventListener('mouseenter',()=>{heroImg.style.transform='scale(1.08) rotate(2deg)';heroImg.style.transition='all 0.3s ease'});heroImg.addEventListener('mouseleave',()=>{heroImg.style.transform='scale(1) rotate(0)'})}
});
