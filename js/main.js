/* ════════════════════════════════════════════════════════════
   main.js v5 — loader, nav, reveals, counters,
   project grid + filters, tools, certificates, BI board
   ════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ━━━ LOADER — quick fade, no theater ━━━ */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('done');
    initAll();
  }, reduced ? 0 : 350);
});

/* ━━━ NAV ━━━ */
const nav = document.getElementById('nav');
const prog = document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('stuck', window.scrollY > 16);
  const h = document.documentElement;
  prog.style.width = (h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(window.scrollY >= s.offsetTop-200) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('act', a.getAttribute('href')==='#'+cur);
  });
},{passive:true});

const ham = document.getElementById('ham');
const mob = document.getElementById('mob-nav');
ham.addEventListener('click',()=>{
  const open = mob.classList.toggle('open');
  ham.setAttribute('aria-expanded', open);
});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mob.classList.remove('open');
  ham.setAttribute('aria-expanded','false');
}));

/* ━━━ SCROLL REVEAL ━━━ */
const revObs = new IntersectionObserver(es=>{
  es.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('in'), Math.min(i*50,200));
      revObs.unobserve(e.target);
    }
  });
},{threshold:.06, rootMargin:'0px 0px -30px 0px'});

/* ━━━ COUNTERS ━━━ */
function countUp(el, target, dur, suffix){
  if(reduced){ el.textContent = target+(suffix||''); return; }
  const t0 = performance.now();
  (function f(now){
    const k = Math.min((now-t0)/dur, 1);
    el.textContent = Math.round(target*(1-Math.pow(1-k,3)))+(suffix||'');
    if(k<1) requestAnimationFrame(f);
  })(t0);
}
let statsDone=false;
const statObs = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting && !statsDone){
      statsDone=true;
      document.querySelectorAll('[data-count]').forEach(el=>{
        countUp(el, parseInt(el.dataset.count,10), 1400, el.dataset.suffix||'');
      });
    }
  });
},{threshold:.4});

/* ━━━ PROJECT CARD VISUALS ━━━ */
const VISUALS = {
  dash: `
    <div class="grid-tex"></div>
    <div class="mock-dash">
      <div class="col" style="flex:1.3">
        <div class="mock-panel" style="flex:1">
          <div class="mp-t">Revenue · Monthly</div>
          <div class="mock-bars">
            ${[34,52,41,68,57,80,72,95].map(h=>`<i style="height:${h}%"></i>`).join('')}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mock-panel"><div class="mp-t">Plan Split</div><div class="mock-donut"></div></div>
        <div class="mock-panel" style="flex:1"><div class="mp-t">Invoices</div><div class="mock-rows"><i></i><i></i><i></i></div></div>
      </div>
    </div>`,
  term: `
    <div class="grid-tex"></div>
    <div class="mock-term">
      <div><span class="c">▸ session</span> 8f3a91 <span class="g">AUTHENTICATED</span></div>
      <div>&nbsp; device&nbsp;&nbsp; <span class="o">Windows 11 · Chrome 137</span></div>
      <div>&nbsp; network <span class="o">152.58.x.x · Kanpur, IN</span></div>
      <div>&nbsp; fingerprint <span class="c">match: known_device ✓</span></div>
      <div><span class="r">▸ alert</span> new login · region change <span class="r">[FLAG]</span></div>
      <div><span class="c">▸ watch</span> 3 active sessions <span class="g">monitoring…</span></div>
    </div>`,
  bi: `
    <div class="grid-tex"></div>
    <div class="mock-dash">
      <div class="col" style="flex:1.4">
        <div class="mock-panel" style="flex:1">
          <div class="mp-t">Student Capstone · Sales KPI</div>
          <div class="mock-bars">
            ${[45,70,38,82,60,90,55,75].map(h=>`<i style="height:${h}%"></i>`).join('')}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mock-panel"><div class="mp-t">DAX Coverage</div><div class="mock-donut"></div></div>
        <div class="mock-panel" style="flex:1"><div class="mp-t">Modules</div><div class="mock-rows"><i></i><i></i><i></i></div></div>
      </div>
    </div>`,
  ml: `
    <div class="grid-tex"></div>
    <div class="mock-term">
      <div><span class="c">▸ model</span> RandomForest(n=400) <span class="g">trained</span></div>
      <div>&nbsp; recall&nbsp;&nbsp;&nbsp; <span class="o">0.84</span> · precision <span class="o">0.79</span></div>
      <div>&nbsp; accuracy&nbsp; <span class="g">0.87 ✓</span></div>
      <div><span class="c">▸ drivers</span> tenure ▮▮▮▮▮ support ▮▮▮▮</div>
      <div>&nbsp; usage_decay ▮▮▮ payment ▮▮</div>
      <div><span class="c">▸ scoring</span> 10,000 customers <span class="g">complete</span></div>
    </div>`,
  cloud: `
    <div class="grid-tex"></div>
    <div class="mock-term">
      <div><span class="c">▸ cron</span> 02:00 etl_daily.py <span class="g">OK · 99% uptime</span></div>
      <div>&nbsp; extract&nbsp; <span class="g">▰▰▰▰▰▰▰▰</span> 50k rows</div>
      <div>&nbsp; transform <span class="g">▰▰▰▰▰▰▰</span> pandas</div>
      <div>&nbsp; load&nbsp;&nbsp;&nbsp;&nbsp; <span class="g">▰▰▰▰▰▰</span> done 4m12s</div>
      <div><span class="c">▸ cloudwatch</span> 0 alarms <span class="g">HEALTHY</span></div>
      <div><span class="o">▸ next run</span> in 23h 47m · unattended</div>
    </div>`,
  fin: `
    <div class="grid-tex"></div>
    <div class="mock-dash">
      <div class="col" style="flex:1.4">
        <div class="mock-panel" style="flex:1">
          <div class="mp-t">Margin Variance · YoY</div>
          <div class="mock-bars">
            ${[60,45,72,50,85,66,92,78].map(h=>`<i style="height:${h}%"></i>`).join('')}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mock-panel"><div class="mp-t">RLS Roles</div><div class="mock-donut"></div></div>
        <div class="mock-panel" style="flex:1"><div class="mp-t">Drill Levels</div><div class="mock-rows"><i></i><i></i><i></i></div></div>
      </div>
    </div>`,
};

/* ━━━ PROJECT GRID ━━━ */
function renderProjects(filter){
  const grid = document.getElementById('pj-grid');
  grid.innerHTML = PROJECTS.map(p=>{
    const show = filter==='all' || p.cats.includes(filter);
    return `
    <button class="pcard ${p.hero?'hero-card':''} ${show?'':'hidden'} rv" data-id="${p.id}" aria-haspopup="dialog">
      <div class="pc-visual">
        ${VISUALS[p.visual]||'<div class="grid-tex"></div>'}
        <span class="pc-badge ${p.accent}"><span class="bd"></span>${p.badge}</span>
        ${p.live?'<span class="pc-live-pill">● Live</span>':''}
      </div>
      <div class="pc-body">
        <div class="pc-num">PROJECT ${p.num} · CASE STUDY</div>
        <div class="pc-name">${p.name}</div>
        <p class="pc-tag">${p.tag}</p>
        <div class="pc-tech">${p.tech.slice(0,6).map(t=>`<span>${t}</span>`).join('')}</div>
        <div class="pc-foot">
          <span class="pc-open">View case study <span class="arr">→</span></span>
          <span class="pc-stats">
            ${p.stats.map(s=>`<span class="pc-ministat"><b>${s.b}</b><i>${s.i}</i></span>`).join('')}
          </span>
        </div>
      </div>
    </button>`;
  }).join('');

  grid.querySelectorAll('.pcard').forEach(card=>{
    card.addEventListener('click',()=>window.CaseStudy.open(card.dataset.id));
    revObs.observe(card);
  });
}

document.querySelectorAll('.pf').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pf').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    renderProjects(btn.dataset.f);
  });
});

/* ━━━ PLATFORMS & TOOLS ━━━ */
function renderTools(){
  const grid = document.getElementById('tools-grid');
  if(!grid) return;
  grid.innerHTML = TOOLS.map(g=>`
    <div class="tool-group rv">
      <div class="tg-head">
        <span class="ic" aria-hidden="true">${g.ic}</span>
        <div><h3>${g.g}</h3><div class="ct">${g.d}</div></div>
      </div>
      <div class="tg-items">${g.items.map(i=>`<span>${i}</span>`).join('')}</div>
    </div>`).join('');
  grid.querySelectorAll('.tool-group').forEach(el=>revObs.observe(el));
}

/* ━━━ CERTIFICATES ━━━ */
function renderCerts(){
  const grid = document.getElementById('cert-grid');
  if(!grid) return;
  grid.innerHTML = CERTS.map(c=>`
    <div class="cert rv">
      <div class="cert-top">
        <span class="cert-logo" aria-hidden="true">${c.logo}</span>
        <span class="cert-yr">${c.yr}</span>
      </div>
      <div class="cert-n">${c.n}</div>
      <div class="cert-org">${c.org}</div>
      <div class="cert-tags">${c.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <a class="cert-verify" href="${c.url||VERIFY_FALLBACK}" target="_blank" rel="noopener">Verify credential ↗</a>
    </div>`).join('');
  grid.querySelectorAll('.cert').forEach(el=>revObs.observe(el));
}

/* ━━━ BI BOARD ━━━ */
const biObs = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); biObs.unobserve(e.target);} });
},{threshold:.3});

/* ━━━ INIT ━━━ */
function initAll(){
  renderProjects('all');
  renderTools();
  renderCerts();
  document.querySelectorAll('.rv').forEach(el=>revObs.observe(el));
  const hs = document.querySelector('.hero-stats');
  if(hs) statObs.observe(hs);
  const bi = document.querySelector('.bi-board');
  if(bi) biObs.observe(bi);
  const yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();
}
})();
