/* GOkidOZ site-wide search — injects a search bar under the nav on every page.
   Reads window.GZ_SEARCH_INDEX (from search-index.js). Self-contained. */
(function(){
  // ---- find this script & compute root prefix (so links resolve from any folder depth) ----
  var me = document.currentScript;
  if(!me){ var ss=document.querySelectorAll('script[src]'); for(var i=0;i<ss.length;i++){ if(/site-search\.js/.test(ss[i].src)) me=ss[i]; } }
  var src = me ? me.getAttribute('src') : 'assets/site-search.js';
  var PREFIX = src.replace(/assets\/site-search\.js.*$/, ''); // '', '../', '../../', '../../../'

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function(){
    var INDEX = window.GZ_SEARCH_INDEX || [];
    if(!INDEX.length) return;

    // ---- styles ----
    var css = document.createElement('style');
    css.textContent = [
      '.gz-search-bar{background:#fff;border-bottom:1px solid var(--border-mid,rgba(26,115,232,.18));padding:10px 20px;position:relative;z-index:60;}',
      '.gz-search-wrap{max-width:640px;margin:0 auto;position:relative;}',
      '.gz-search-input-row{display:flex;align-items:center;gap:8px;background:var(--g7,#f1f6fd);border:1.5px solid var(--border-mid,rgba(26,115,232,.18));border-radius:12px;padding:9px 14px;transition:border-color .15s,box-shadow .15s;}',
      '.gz-search-input-row:focus-within{border-color:var(--g2,#1A73E8);box-shadow:0 2px 12px rgba(26,115,232,.13);background:#fff;}',
      '.gz-search-ic{font-size:16px;line-height:1;opacity:.7;flex-shrink:0;}',
      '.gz-search-input{flex:1;border:none;background:transparent;outline:none;font-family:var(--sans,inherit);font-size:15px;color:var(--text,#1f2937);min-width:0;}',
      '.gz-search-input::placeholder{color:var(--text-muted,#5f6b7a);}',
      '.gz-search-clear{border:none;background:transparent;color:var(--text-muted,#5f6b7a);font-size:18px;cursor:pointer;padding:0 2px;line-height:1;display:none;}',
      '.gz-search-results{position:absolute;left:0;right:0;top:calc(100% + 8px);background:#fff;border:1px solid var(--border-mid,rgba(26,115,232,.18));border-radius:14px;box-shadow:0 12px 38px rgba(20,40,80,.16);overflow:hidden;display:none;max-height:70vh;overflow-y:auto;}',
      '.gz-search-results.open{display:block;}',
      '.gz-sr-item{display:block;padding:11px 16px;text-decoration:none;border-bottom:1px solid var(--border,rgba(26,115,232,.08));transition:background .12s;}',
      '.gz-sr-item:last-child{border-bottom:none;}',
      '.gz-sr-item:hover,.gz-sr-item.active{background:var(--g7,#f1f6fd);}',
      '.gz-sr-title{font-family:var(--serif,Georgia,serif);font-size:15px;font-weight:600;color:var(--g1,#1A73E8);margin:0 0 2px;}',
      '.gz-sr-desc{font-size:12.5px;color:var(--text-muted,#5f6b7a);line-height:1.45;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}',
      '.gz-sr-empty{padding:16px;text-align:center;color:var(--text-muted,#5f6b7a);font-size:14px;}',
      '.gz-sr-head{padding:8px 16px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted,#5f6b7a);background:var(--g7,#f1f6fd);}',
      '@media(max-width:600px){.gz-search-bar{padding:8px 12px;}.gz-search-input{font-size:16px;}}'
    ].join('');
    document.head.appendChild(css);

    // ---- bar markup ----
    var bar = document.createElement('div');
    bar.className = 'gz-search-bar';
    bar.innerHTML =
      '<div class="gz-search-wrap">'+
        '<div class="gz-search-input-row">'+
          '<span class="gz-search-ic">🔍</span>'+
          '<input type="text" class="gz-search-input" placeholder="Search GOkidOZ — activities, camps, tutors, towns…" aria-label="Search the whole site" autocomplete="off">'+
          '<button class="gz-search-clear" aria-label="Clear search" type="button">×</button>'+
        '</div>'+
        '<div class="gz-search-results" role="listbox"></div>'+
      '</div>';

    var nav = document.querySelector('nav');
    if(nav && nav.parentNode){ nav.parentNode.insertBefore(bar, nav.nextSibling); }
    else { document.body.insertBefore(bar, document.body.firstChild); }

    var input = bar.querySelector('.gz-search-input');
    var clear = bar.querySelector('.gz-search-clear');
    var panel = bar.querySelector('.gz-search-results');
    var activeIdx = -1, current = [];

    function score(item, q){
      var t=(item.t||'').toLowerCase(), d=(item.d||'').toLowerCase(), hay=t+' '+d;
      if(t===q) return 100;
      if(t.indexOf(q)===0) return 80;
      if(t.indexOf(q)>-1) return 60;
      if(hay.indexOf(q)>-1) return 45;            // exact phrase anywhere (incl. listing names)
      // all words present across title+desc
      var words=q.split(/\s+/).filter(Boolean), all=true, hits=0;
      for(var i=0;i<words.length;i++){ if(hay.indexOf(words[i])>-1){ hits++; } else { all=false; } }
      if(all) return 30 + (d.indexOf(q)>-1?10:0);
      if(hits>0) return 10 + hits;                 // partial multi-word match
      return -1;
    }

    function render(q){
      q=(q||'').trim().toLowerCase();
      if(!q){ panel.classList.remove('open'); panel.innerHTML=''; clear.style.display='none'; return; }
      clear.style.display='block';
      var scored=[];
      for(var i=0;i<INDEX.length;i++){ var s=score(INDEX[i],q); if(s>=0) scored.push([s,INDEX[i]]); }
      scored.sort(function(a,b){ return b[0]-a[0]; });
      current = scored.slice(0,12).map(function(x){return x[1];});
      activeIdx=-1;
      if(!current.length){ panel.innerHTML='<div class="gz-sr-empty">No matches for “'+q.replace(/</g,'')+'”. Try a broader word like “music”, “camp” or a town name.</div>'; panel.classList.add('open'); return; }
      var html='<div class="gz-sr-head">'+current.length+' result'+(current.length>1?'s':'')+'</div>';
      current.forEach(function(it){
        html+='<a class="gz-sr-item" href="'+PREFIX+it.u+'"><div class="gz-sr-title">'+esc(it.t)+'</div><div class="gz-sr-desc">'+esc(it.d||'')+'</div></a>';
      });
      panel.innerHTML=html;
      panel.classList.add('open');
    }
    function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('focus', function(){ if(input.value.trim()) render(input.value); });
    clear.addEventListener('click', function(){ input.value=''; render(''); input.focus(); });

    input.addEventListener('keydown', function(e){
      var items=panel.querySelectorAll('.gz-sr-item');
      if(e.key==='ArrowDown'){ e.preventDefault(); if(!items.length)return; activeIdx=Math.min(activeIdx+1,items.length-1); setActive(items); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); if(!items.length)return; activeIdx=Math.max(activeIdx-1,0); setActive(items); }
      else if(e.key==='Enter'){ if(activeIdx>-1&&items[activeIdx]){ window.location.href=items[activeIdx].getAttribute('href'); } else if(items[0]){ window.location.href=items[0].getAttribute('href'); } }
      else if(e.key==='Escape'){ input.value=''; render(''); input.blur(); }
    });
    function setActive(items){ items.forEach(function(it,i){ it.classList.toggle('active', i===activeIdx); }); if(items[activeIdx]) items[activeIdx].scrollIntoView({block:'nearest'}); }

    document.addEventListener('click', function(e){ if(!bar.contains(e.target)) panel.classList.remove('open'); });
  });
})();
