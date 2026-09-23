const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const mobile=document.querySelector('.mobile-nav');
const close=document.querySelector('.menu-close');
function setMenu(open){if(!mobile||!toggle)return;mobile.classList.toggle('open',open);mobile.inert=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');document.body.classList.toggle('nav-open',open);if(open)close.focus();else toggle.focus()}
toggle?.addEventListener('click',()=>setMenu(!mobile.classList.contains('open')));
close?.addEventListener('click',()=>setMenu(false));
mobile?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(!mobile?.classList.contains('open'))return;if(event.key==='Escape')setMenu(false);if(event.key==='Tab'){const focusable=[...mobile.querySelectorAll('a,button')];const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>36),{passive:true});
header?.classList.toggle('scrolled',scrollY>36);
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
const sectionLinks=[...document.querySelectorAll('.desktop-nav a')];
if(sectionLinks.length){const sections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(section=>sectionObserver.observe(section))}
