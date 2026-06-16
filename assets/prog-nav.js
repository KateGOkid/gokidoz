/*! GOkidOZ — Prev/Next navigation between sibling program pages. */
(function(){
  'use strict';
  // Ordered groups of program pages (filename without .html → label)
  var GROUPS = [
    { name:"Instruments", pages:[
      ["piano","🎹 Piano"],["violin","🎻 Violin"],["viola","🎻 Viola"],["cello","🎻 Cello"],
      ["double-bass","🎻 Double Bass"],["harp","🎵 Harp"],["guitar","🎸 Guitar"],["bass-guitar","🎸 Bass Guitar"],
      ["flute","🪈 Flute"],["clarinet","🎵 Clarinet"],["saxophone","🎷 Saxophone"],["trumpet","🎺 Trumpet"],
      ["trombone","🎺 Trombone"],["french-horn","🎺 French Horn"],["drums","🥁 Drums"],["percussion","🪘 Percussion"],
      ["accordion","🪗 Accordion"]
    ]},
    { name:"Sports", pages:[
      ["soccer","⚽ Soccer"],["baseball","⚾ Baseball"],["lacrosse","🥍 Lacrosse"],["tennis","🎾 Tennis"],
      ["golf","⛳ Golf"],["swimming","🏊 Swimming"],["gymnastics","🤸 Gymnastics"],["hockey-ice-skating","⛸️ Hockey & Skating"],
      ["martial-arts","🥋 Martial Arts"],["fencing","🤺 Fencing"],["badminton","🏸 Badminton"],
      ["table-tennis","🏓 Table Tennis"],["cross-country","🏃 Cross Country"],["volleyball","🏐 Volleyball"],["ski","⛷️ Ski"]
    ]}
  ];

  var path = location.pathname.split('/').pop().replace('.html','');
  var group=null, idx=-1;
  for (var g=0; g<GROUPS.length; g++){
    for (var i=0; i<GROUPS[g].pages.length; i++){
      if (GROUPS[g].pages[i][0]===path){ group=GROUPS[g]; idx=i; break; }
    }
    if (group) break;
  }
  if (!group) return;

  var pages = group.pages;
  var prev = idx>0 ? pages[idx-1] : pages[pages.length-1];
  var next = idx<pages.length-1 ? pages[idx+1] : pages[0];

  var css = document.createElement('style');
  css.textContent =
    '.gz-prognav{display:flex;justify-content:space-between;align-items:center;gap:12px;max-width:1080px;margin:8px auto 36px;padding:0 20px;flex-wrap:wrap;}'
    +'.gz-prognav a{display:inline-flex;align-items:center;gap:8px;background:var(--white,#fff);border:1.5px solid var(--border-mid,#D9E2EC);border-radius:24px;padding:11px 18px;text-decoration:none;color:var(--g1,#0B3D91);font-family:var(--sans,system-ui);font-weight:700;font-size:13.5px;transition:transform .15s,box-shadow .15s,border-color .15s;}'
    +'.gz-prognav a:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(11,61,145,0.10);border-color:var(--g4,#9CC0F0);}'
    +'.gz-prognav .gz-pn-mid{font-size:12px;color:var(--text-muted,#627D98);font-weight:600;}'
    +'@media(max-width:560px){.gz-prognav .gz-pn-mid{display:none;}.gz-prognav a{flex:1;justify-content:center;}}';
  document.head.appendChild(css);

  function build(){
    var wrap=document.createElement('div');
    wrap.className='gz-prognav';
    wrap.innerHTML='<a href="'+prev[0]+'.html" aria-label="Previous">← '+prev[1]+'</a>'
      +'<span class="gz-pn-mid">'+group.name+' · '+(idx+1)+' / '+pages.length+'</span>'
      +'<a href="'+next[0]+'.html" aria-label="Next">'+next[1]+' →</a>';
    // place at the top — right after the hero / page header
    var top=document.querySelector('.subj-hero')||document.querySelector('.page-header');
    if(top && top.parentNode){ top.parentNode.insertBefore(wrap, top.nextSibling); wrap.style.marginTop='18px'; }
    else { document.body.insertBefore(wrap, document.body.firstChild); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
