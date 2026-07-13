const burger = document.querySelector('.burger');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const servicesWrap = document.querySelector('.nav-services');
const servicesToggle = document.querySelector('.services-toggle');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });
  navLinks.forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}
if (servicesWrap && servicesToggle) {
  servicesToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = servicesWrap.classList.toggle('open');
    servicesToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!servicesWrap.contains(e.target)) {
      servicesWrap.classList.remove('open');
      servicesToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const faqTriggers = document.querySelectorAll('.faq-trigger');
function closeItem(trigger){const panel=document.getElementById(trigger.getAttribute('aria-controls'));const icon=trigger.querySelector('.faq-icon');trigger.setAttribute('aria-expanded','false');if(icon)icon.textContent='+';if(panel){panel.style.maxHeight='0px';setTimeout(()=>{if(trigger.getAttribute('aria-expanded')==='false')panel.hidden=true;},360);}}
function openItem(trigger){const panel=document.getElementById(trigger.getAttribute('aria-controls'));const icon=trigger.querySelector('.faq-icon');trigger.setAttribute('aria-expanded','true');if(icon)icon.textContent='×';if(panel){panel.hidden=false;panel.style.maxHeight=`${panel.scrollHeight}px`;}}
faqTriggers.forEach((trigger)=>{trigger.addEventListener('click',()=>{const isOpen=trigger.getAttribute('aria-expanded')==='true';faqTriggers.forEach((other)=>{if(other!==trigger)closeItem(other);});if(isOpen)closeItem(trigger);else openItem(trigger);});});

const modalButtons = document.querySelectorAll('.service-modal-open');
let activeModal = null;
let lastFocused = null;
function openModal(modal){if(!modal) return; lastFocused=document.activeElement; activeModal=modal; modal.hidden=false; document.body.classList.add('modal-open'); const dialog=modal.querySelector('.service-modal-dialog'); if(dialog) dialog.focus();}
function closeModal(){if(!activeModal) return; activeModal.hidden=true; document.body.classList.remove('modal-open'); if(lastFocused) lastFocused.focus(); activeModal=null;}
modalButtons.forEach((btn)=>btn.addEventListener('click',()=>openModal(document.getElementById(btn.dataset.modal))));
document.addEventListener('click',(e)=>{if(e.target instanceof HTMLElement && e.target.dataset.close==='service-modal') closeModal();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape' && activeModal) closeModal();});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:0.14});
  revealElements.forEach((el)=>revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

// Reviews slider
(function () {
  const track = document.getElementById('reviewsTrack');
  const dotsWrap = document.getElementById('reviewsDots');
  const prev = document.querySelector('.reviews-nav.prev');
  const next = document.querySelector('.reviews-nav.next');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;

  function perView() {
    if (window.innerWidth >= 1120) return 3;
    if (window.innerWidth >= 760) return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, slides.length - perView());
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i += 1) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = i === index ? 'active' : '';
      b.setAttribute('aria-label', `Слайд ${i + 1}`);
      b.addEventListener('click', () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(b);
    }
  }

  function update() {
    const pct = 100 / perView();
    track.style.transform = `translateX(-${index * pct}%)`;
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    if (prev) prev.disabled = index <= 0;
    if (next) next.disabled = index >= maxIndex();
  }

  prev?.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });

  next?.addEventListener('click', () => {
    index = Math.min(maxIndex(), index + 1);
    update();
  });

  window.addEventListener('resize', () => {
    index = Math.min(index, maxIndex());
    renderDots();
    update();
  });

  renderDots();
  update();
})();
