/* ════════════════════════════════════════════════════════════
   case-study.js — renders a project deep-dive into the
   slide-in panel. Data-driven from PROJECTS (data.js).
   ════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const overlay = document.getElementById('cs-overlay');
const panel   = document.getElementById('cs-panel');
let currentId = null;
let lastFocus = null;

const esc = s => String(s);

/* ── block renderers ── */
const R = {
  text: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      ${b.ps.map(p=>`<p class="cs-txt">${p}</p>`).join('')}
    </section>`,

  arch: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-arch">
        ${b.layers.map(L=>`
          <div class="arch-layer">
            <div class="arch-name">${L.name}</div>
            <div class="arch-items">${L.items.map(i=>`<span>${i}</span>`).join('')}</div>
            ${L.note?`<div class="arch-note">${L.note}</div>`:''}
          </div>`).join('')}
      </div>
    </section>`,

  steps: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-steps">
        ${b.steps.map(s=>`
          <div class="step"><div><div class="t">${s.tt}</div><div class="d">${s.d}</div></div></div>`).join('')}
      </div>
    </section>`,

  grid: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-grid2">
        ${b.items.map(i=>`
          <div class="cs-cell"><span class="ic" aria-hidden="true">${i.ic}</span>
          <div class="t">${i.tt}</div><div class="d">${i.d}</div></div>`).join('')}
      </div>
    </section>`,

  list: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <ul class="cs-list">${b.items.map(i=>`<li><span>${i}</span></li>`).join('')}</ul>
    </section>`,

  pairs: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-pairs">
        ${b.pairs.map(p=>`
          <div class="pair"><div class="c"><span>${p.c}</span></div>
          <div class="s"><span>${p.s}</span></div></div>`).join('')}
      </div>
    </section>`,

  stack: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-stackgrid">
        ${b.groups.map(g=>`
          <div class="sg"><div class="gname">${g.g}</div>
          <div class="gitems">${g.items.map(i=>`<span>${i}</span>`).join('')}</div></div>`).join('')}
      </div>
    </section>`,

  apis: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-apis">
        ${b.apis.map(a=>`
          <div class="api"><span class="m ${a.m.toLowerCase()}">${a.m}</span>
          <span class="p">${a.p}</span><span class="d">${a.d}</span></div>`).join('')}
      </div>
    </section>`,

  shots: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <div class="cs-shots">
        ${b.shots.map(s=>`
          <figure class="shot">
            <div class="sbar"><i></i><i></i><i></i><span>preview</span></div>
            <div class="sbody"><span class="si" aria-hidden="true">▣</span><span style="font-family:var(--f-mono);font-size:.56rem;letter-spacing:.14em">SCREENSHOT SLOT</span></div>
            <figcaption class="scap">${s.cap}</figcaption>
          </figure>`).join('')}
      </div>
    </section>`,

  road: b => `
    <section class="cs-sec">
      <h3 class="cs-h"><span class="n">//</span> ${b.h}</h3>
      <ul class="cs-road">${b.items.map(i=>`<li><span>${i}</span></li>`).join('')}</ul>
    </section>`,
};

function render(p){
  const idx  = PROJECTS.findIndex(x=>x.id===p.id);
  const prev = PROJECTS[(idx-1+PROJECTS.length)%PROJECTS.length];
  const next = PROJECTS[(idx+1)%PROJECTS.length];

  panel.innerHTML = `
    <div class="cs-top">
      <div class="cs-crumb">CASE STUDY <span style="color:var(--ink-3)">/</span> <b>${esc(p.name)}</b></div>
      <button class="cs-close" id="cs-x" aria-label="Close case study">✕</button>
    </div>
    <div class="cs-inner">
      <header class="cs-hero">
        <div class="cs-badges">
          ${p.pills.map(b=>`<span class="cs-pill ${b.c}"><span class="d"></span>${b.t}</span>`).join('')}
        </div>
        <h2 class="cs-title" id="cs-title">${esc(p.name)}</h2>
        <p class="cs-tag">${p.tag}</p>
        <div class="cs-actions">
          ${p.live?`<a class="btn btn-gold" href="${p.live}" target="_blank" rel="noopener">Open live product ↗</a>`:''}
          <a class="btn btn-line" href="https://github.com/Ayush231002" target="_blank" rel="noopener">GitHub profile</a>
          <a class="btn btn-cyan" href="#contact" id="cs-discuss">Discuss this build</a>
        </div>
      </header>

      <div class="cs-meta">
        ${p.meta.map(m=>`<div><div class="l">${m.l}</div><div class="v">${m.v}</div></div>`).join('')}
      </div>

      <div class="cs-metrics">
        ${p.metrics.map(m=>`<div class="cs-mt"><b>${m.v}</b><span>${m.l}</span></div>`).join('')}
      </div>

      ${p.blocks.map(b=>R[b.t]?R[b.t](b):'').join('')}

      <nav class="cs-nav" aria-label="Other case studies">
        <button data-go="${prev.id}"><span class="dir">← Previous</span><span class="pn">${esc(prev.name)}</span></button>
        <button data-go="${next.id}" class="next"><span class="dir">Next →</span><span class="pn">${esc(next.name)}</span></button>
      </nav>
    </div>`;

  panel.querySelector('#cs-x').addEventListener('click', close);
  panel.querySelectorAll('[data-go]').forEach(btn=>{
    btn.addEventListener('click',()=>{ open(btn.dataset.go, true); });
  });
  const discuss = panel.querySelector('#cs-discuss');
  if(discuss) discuss.addEventListener('click',e=>{
    e.preventDefault(); close();
    setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),350);
  });
  if(window.bindCursorHovers) window.bindCursorHovers(panel);
}

function open(id, keepOpen){
  const p = PROJECTS.find(x=>x.id===id);
  if(!p) return;
  currentId = id;
  if(!keepOpen) lastFocus = document.activeElement;
  render(p);
  overlay.classList.add('on');
  panel.classList.add('on');
  panel.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  panel.scrollTop = 0;
  panel.querySelector('.cs-close')?.focus({preventScroll:true});
}

function close(){
  overlay.classList.remove('on');
  panel.classList.remove('on');
  panel.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  currentId = null;
  if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
}

overlay.addEventListener('click', close);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && currentId) close();
});

window.CaseStudy = {open, close};
})();
