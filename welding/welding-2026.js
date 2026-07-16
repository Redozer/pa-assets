/* ═══ Стики-бар CTA ═══ */
(function(){
  var bar=document.createElement('div');
  bar.id='pa-sticky-bar';
  bar.innerHTML='<style>'+
  '#pa-sticky-bar{position:fixed;bottom:0;left:0;right:0;z-index:9999;transform:translateY(100%);transition:transform .4s cubic-bezier(.22,.68,0,1.2),opacity .4s ease;opacity:0;pointer-events:none}'+
  '#pa-sticky-bar.is-visible{transform:translateY(0);opacity:1;pointer-events:auto}'+
  '.pasb-inner{background:rgba(8,8,16,.82);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);border-top:1px solid rgba(255,255,255,.08);box-shadow:0 -8px 32px rgba(0,0,0,.3);position:relative}'+
  '.pasb-inner::before{content:\'\';display:block;position:absolute;bottom:100%;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,92,64,.35) 30%,rgba(255,255,255,.12) 50%,rgba(255,92,64,.35) 70%,transparent 100%)}'+
  '.pasb-wrap{max-width:1280px;margin:0 auto;height:60px;display:flex;align-items:center;justify-content:center;padding:0 24px;gap:10px}'+
  '.pasb-btn{display:inline-flex;align-items:center;gap:7px;font-family:Manrope,-apple-system,sans-serif;font-size:13px;font-weight:700;padding:10px 20px;border-radius:999px;text-decoration:none;cursor:pointer;border:none;white-space:nowrap;transition:all .2s ease}'+
  '.pasb-btn--primary{background:#FF5C40;color:#fff;box-shadow:0 4px 16px rgba(255,92,64,.35)}'+
  '.pasb-btn--primary:hover{background:#FF7257;transform:translateY(-1px)}'+
  '.pasb-btn--ghost{background:rgba(255,255,255,.07);color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.12)}'+
  '.pasb-btn--ghost:hover{background:rgba(255,255,255,.12);color:#fff}'+
  '.pasb-close{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;line-height:1;flex-shrink:0;transition:all .2s;margin-left:4px}'+
  '.pasb-close:hover{background:rgba(255,255,255,.10);color:rgba(255,255,255,.7)}'+
  '</style>'+
  '<div class="pasb-inner"><div class="pasb-wrap">'+
  '<a class="pasb-btn pasb-btn--primary" href="#contacts">Получить КП</a>'+
  '<a class="pasb-btn pasb-btn--ghost" href="https://forms.prideautomatics.com/audit.html" target="_blank" rel="noopener">Запросить аудит</a>'+
  '<button class="pasb-close" id="pasbCloseBtn" aria-label="Закрыть">×</button>'+
  '</div></div>';
  document.body.appendChild(bar);
  var dismissed=false;
  function onScroll(){
    if(dismissed)return;
    var y=window.scrollY||window.pageYOffset;
    var c=document.getElementById('contacts');
    var hide=c&&c.getBoundingClientRect().top<window.innerHeight;
    if(y>700&&!hide)bar.classList.add('is-visible');
    else bar.classList.remove('is-visible');
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  document.getElementById('pasbCloseBtn').addEventListener('click',function(){dismissed=true;bar.classList.remove('is-visible')});
})();
/* ═══ Контроллер страницы welding-robots (Прайд-Автоматикс, 2026) ═══ */
(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var API='https://forms.prideautomatics.com/api/submit/welding';

/* ── style-hover / style-focus шим ── */
document.querySelectorAll('[style-hover]').forEach(function(el){
  var base=el.getAttribute('style')||'', extra=el.getAttribute('style-hover');
  el.addEventListener('mouseenter',function(){el.setAttribute('style',base+';'+extra)});
  el.addEventListener('mouseleave',function(){el.setAttribute('style',base)});
});
document.querySelectorAll('[style-focus]').forEach(function(el){
  var base=el.getAttribute('style')||'', extra=el.getAttribute('style-focus');
  el.addEventListener('focus',function(){el.setAttribute('style',base+';'+extra)});
  el.addEventListener('blur',function(){el.setAttribute('style',base)});
});

/* ── появление блоков (reveal) ── */
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls=[];
if(!reduced){
  Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'),function(el){
    if(el.getBoundingClientRect().top>window.innerHeight*0.95){
      el.style.opacity='0';el.style.transform='translateY(26px)';revealEls.push(el);
    }
  });
}

/* ── счётчики ── */
function animateNum(fn,from,to,dur){
  var start=performance.now();
  var ease=function(t){return 1-Math.pow(1-t,3)};
  (function tick(now){
    var t=Math.min(1,((now||performance.now())-start)/dur);
    fn(Math.round(from+(to-from)*ease(t)));
    if(t<1)requestAnimationFrame(tick);
  })(performance.now());
  setTimeout(function(){fn(to)},dur+300);
}
var countersDone=reduced, cliDone=reduced;
function runCaseCounters(){
  animateNum(function(v){
    var el=$('pf-vag'); if(el)el.textContent=v;
    var m=$('pf-vag-mult'); if(m)m.textContent=(v<=60?1:Math.min(4,Math.ceil((v-60)/60)+1));
    var b=$('pf-vag-bar'); if(b)b.style.width=Math.min(100,Math.round(v/240*100))+'%';
  },60,240,2000);
  animateNum(function(v){
    var el=$('pf-roi-count'); if(el)el.textContent=v;
    var b=$('pf-roi-bar'); if(b)b.style.width=Math.min(100,Math.round(v/18*100))+'%';
  },0,7,1500);
  animateNum(function(v){var el=$('pf-nom');if(el)el.textContent=v},0,22,1500);
}
function runCliCounter(){
  animateNum(function(v){var el=$('pf-cli');if(el)el.textContent=v},0,400,1700);
}

/* ── скролл-обработчик: reveal, счётчики, прогресс процесса ── */
function check(){
  var vh=window.innerHeight;
  if(revealEls.length){
    var batch=0;
    revealEls=revealEls.filter(function(el){
      if(el.getBoundingClientRect().top<vh*0.92){
        el.style.opacity='';el.style.transform='';
        el.style.animation='pf-reveal 0.7s cubic-bezier(0.22,1,0.36,1) '+(batch*90)+'ms both';
        batch++;return false;
      }
      return true;
    });
  }
  var dash=$('case-dash');
  if(dash&&!countersDone&&dash.getBoundingClientRect().top<vh*0.82){countersDone=true;runCaseCounters()}
  var test=$('test');
  if(test&&!cliDone&&test.getBoundingClientRect().top<vh*0.7){cliDone=true;runCliCounter()}
  var track=$('proc-track'),fill=$('proc-line-fill');
  if(track&&fill){
    var r=track.getBoundingClientRect();
    var p=Math.min(1,Math.max(0,(vh*0.85-r.top)/(vh*0.55)));
    fill.style.width=(p*100).toFixed(1)+'%';
  }
}
window.addEventListener('scroll',check,{passive:true});
window.addEventListener('resize',check,{passive:true});
setInterval(check,350);
check();

/* ── hero-видео: автозапуск (muted, без звука — разрешено браузерами) ── */
var heroBox=$('hero-video'),heroWrap=$('hero-iframe-wrap'),heroPlay=$('hero-play-btn'),heroFrame=$('hero-iframe');
function heroPlayVideo(){
  if(!heroFrame||heroFrame.dataset.started)return;
  heroFrame.dataset.started='1';
  heroFrame.src='https://player.vimeo.com/video/1113550135?autoplay=1&loop=1&muted=1&background=1&dnt=1';
  if(heroWrap)heroWrap.style.display='block';
  if(heroPlay)heroPlay.style.display='none';
}
if(heroFrame){
  /* стартуем после загрузки страницы — плеер не мешает отрисовке первого экрана */
  if(document.readyState==='complete')setTimeout(heroPlayVideo,200);
  else window.addEventListener('load',function(){setTimeout(heroPlayVideo,200)});
  /* запасной вариант: если автозапуск заблокирован — клик по постеру */
  if(heroBox)heroBox.addEventListener('click',heroPlayVideo);
}

/* ── ROI-виджет ── */
var welders=2,salary=120,rtk=5;
function grad(pct){return 'linear-gradient(to right, #FF5C40 0%, #FF5C40 '+pct+'%, rgba(255,255,255,0.18) '+pct+'%, rgba(255,255,255,0.18) 100%)'}
function fmt(n){return n.toLocaleString('ru-RU')}
function roiRender(){
  var el;
  if(el=$('pf-welders'))el.textContent=welders;
  if(el=$('pf-salary-label'))el.textContent=fmt(salary)+' 000 ₽';
  if(el=$('pf-rtk-label'))el.textContent=(rtk%1===0?rtk:rtk.toFixed(1))+' млн ₽';
  var monthly=welders*salary*1000*1.36;
  var months=Math.max(1,Math.ceil(rtk*1000000/monthly));
  if(el=$('pf-roi-months')){el.textContent=months;el.style.animation='none';void el.offsetWidth;el.style.animation='pf-roi-pop 0.35s ease'}
  if(el=$('pf-roi-barw'))el.style.width=Math.min(100,Math.round(months/18*100))+'%';
  if(el=$('pf-annual'))el.textContent=fmt(Math.round(welders*salary*1.36*12));
  if(el=$('pf-5y')){var net=(monthly*60-rtk*1000000)/1000000;el.textContent=net>=0?net.toFixed(1):'0'}
  var iw=$('pf-in-welders'),is=$('pf-in-salary'),ir=$('pf-in-rtk');
  if(iw)iw.style.background=grad(((welders-1)/4*100).toFixed(0));
  if(is)is.style.background=grad(((salary-60)/140*100).toFixed(0));
  if(ir)ir.style.background=grad(((rtk-2)/8*100).toFixed(0));
}
var iw=$('pf-in-welders'),is_=$('pf-in-salary'),ir=$('pf-in-rtk');
if(iw)iw.addEventListener('input',function(e){welders=parseInt(e.target.value);roiRender()});
if(is_)is_.addEventListener('input',function(e){salary=parseInt(e.target.value);roiRender()});
if(ir)ir.addEventListener('input',function(e){rtk=parseFloat(e.target.value);roiRender()});
roiRender();

/* ── анатомия РТК: маркеры, чипы, автоцикл ── */
var partData=[
  {title:"Робот-манипулятор",text:"6 осей, повторяемость ±0,06 мм. Kawasaki или Regal — под вашу серию и бюджет."},
  {title:"Сварочный источник",text:"CO₂ / MIG / MAG / TIG. Синхронизирован с движением робота — стабильная дуга на всём шве."},
  {title:"Позиционер",text:"Два поста — пока робот варит на одном, оператор загружает второй. Вращение и наклон открывают доступ к каждому шву."},
  {title:"Оснастка",text:"Проектируем под вашу деталь: базирование и прижим повторяются от цикла к циклу."},
  {title:"Ограждение и безопасность",text:"Сетчатое ограждение, световые барьеры на входах, вытяжка дыма и кнопки аварийного останова. Участок соответствует нормам охраны труда."}
];
var activePart=4, autoCycle=true;
var markers=document.querySelectorAll('.pf-marker'),chips=document.querySelectorAll('.pf-chip');
function partRender(){
  markers.forEach(function(b){
    var i=+b.dataset.i,a=(i===activePart);
    b.style.background=a?'#FF5C40':'rgba(15,14,12,0.72)';
    b.style.color=a?'#14100E':'#F2F0EB';
    b.style.transform='translate(-50%,-50%) scale('+(a?1.18:1)+')';
    var ring=b.querySelector('.pf-ring'); if(ring)ring.style.opacity=a?'1':'0';
  });
  chips.forEach(function(c){
    var i=+c.dataset.i,a=(i===activePart);
    c.style.borderColor=a?'#161514':'#DDD9D0';
    c.style.background=a?'#161514':'#FFFFFF';
    c.style.color=a?'#F2F0EB':'#161514';
    var n=c.querySelector('.pf-chip-num'); if(n)n.style.color=a?'#FF8A70':'#FF5C40';
  });
  var el;
  if(el=$('pf-idx'))el.textContent='УЗЕЛ 0'+(activePart+1)+' / 05';
  if(el=$('pf-part-title'))el.textContent=partData[activePart].title;
  if(el=$('pf-part-text'))el.textContent=partData[activePart].text;
}
function selectPart(i){activePart=i;autoCycle=false;partRender()}
markers.forEach(function(b){b.addEventListener('click',function(){selectPart(+b.dataset.i)})});
chips.forEach(function(c){c.addEventListener('click',function(){selectPart(+c.dataset.i)})});
setInterval(function(){if(autoCycle){activePart=(activePart+1)%5;partRender()}},3500);

/* ── FAQ-аккордеон ── */
var openFaq=0;
var faqItems=document.querySelectorAll('.pf-faq-item');
function faqRender(){
  faqItems.forEach(function(item,i){
    var open=(i===openFaq);
    item.style.borderColor=open?'#FF5C40':'#E4E0D6';
    var plus=item.querySelector('.pf-faq-plus'); if(plus)plus.style.transform='rotate('+(open?45:0)+'deg)';
    var body=item.querySelector('.pf-faq-body');
    if(body){body.style.maxHeight=(open?280:0)+'px';body.style.opacity=open?'1':'0'}
  });
}
document.querySelectorAll('.pf-faq-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var i=+btn.dataset.i; openFaq=(openFaq===i?-1:i); faqRender();
  });
});


/* ── выбор бренда робота → метка в форме КП ── */
var pfBrand = null;
document.querySelectorAll('.pf-brand-cp').forEach(function(a){
  a.addEventListener('click', function(){
    pfBrand = a.dataset.brand;
    var box = $('pf-cp-brand'), val = $('pf-cp-brand-val');
    if (box && val) { val.textContent = 'РОБОТЫ ' + pfBrand.toUpperCase(); box.style.display = 'block'; }
  });
});

/* ── отправка форм ── */
function digits(s){return (s||'').replace(/\D/g,'')}
function send(payload){
  return fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json().catch(function(){return{}})});
}
function retryLater(payload,attempt){
  attempt=attempt||1; if(attempt>5)return;
  setTimeout(function(){send(payload).catch(function(){retryLater(payload,attempt+1)})},attempt*15000);
}
function markError(el,msg,errId){
  var box=errId?$(errId):null;
  if(box&&msg){box.textContent=msg;box.style.display='block'}
  if(!el)return;
  el.style.borderColor='#FF5C40';el.style.boxShadow='0 0 0 3px rgba(255,92,64,0.25)';
  el.addEventListener('input',function h(){
    el.style.borderColor='';el.style.boxShadow='';
    if(box)box.style.display='none';
    el.removeEventListener('input',h);
  });
  el.focus();
}
function wireForm(btnId,gather,validate,sentId,formId,errId){
  var btn=$(btnId); if(!btn)return;
  btn.addEventListener('click',function(){
    var bad=validate();
    if(bad){markError(bad.el,bad.msg,errId);return}
    var payload=gather();
    btn.disabled=true;btn.textContent='Отправляем…';
    send(payload).catch(function(){
      try{localStorage.setItem('pride_welding_'+Date.now(),JSON.stringify(payload))}catch(e){}
      retryLater(payload);
    });
    /* показываем подтверждение сразу после попытки отправки */
    setTimeout(function(){
      var f=$(formId),s=$(sentId);
      if(f)f.style.display='none';
      if(s)s.style.display='block';
    },400);
  });
}
wireForm('pf-test-btn',
  function(){return{form:'welding-test',source:'welding-robots-2026',name:$('pf-test-name').value.trim(),phone:$('pf-test-phone').value.trim(),ts:new Date().toISOString(),page:location.href}},
  function(){
    if(!$('pf-test-name').value.trim())return{el:$('pf-test-name'),msg:'Укажите имя и компанию'};
    if(digits($('pf-test-phone').value).length<10)return{el:$('pf-test-phone'),msg:'Укажите телефон — перезвоним и согласуем дату'};
    return null;
  },'pf-test-sent','pf-test-form','pf-test-err');
wireForm('pf-cp-btn',
  function(){return{form:'welding-cp',source:'welding-robots-2026',robot:pfBrand||'',name:$('pf-cp-name').value.trim(),contact:$('pf-cp-contact').value.trim(),ts:new Date().toISOString(),page:location.href}},
  function(){
    if(!$('pf-cp-name').value.trim())return{el:$('pf-cp-name'),msg:'Укажите имя и компанию'};
    var c=$('pf-cp-contact').value.trim();
    if(!c)return{el:$('pf-cp-contact'),msg:'Укажите телефон или e-mail — куда прислать КП'};
    if(digits(c).length<10&&c.indexOf('@')===-1)return{el:$('pf-cp-contact'),msg:'Похоже на опечатку: нужен телефон (11 цифр) или e-mail'};
    return null;
  },'pf-cp-sent','pf-cp-form','pf-cp-err');
})();
