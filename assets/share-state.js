/*! GOkidOZ — Shareable filter state.
 * Keeps the page URL in sync with the filter controls so copying the address
 * (or the injected "Copy link" button) shares the exact same search results.
 * Restores state from the URL on load. Self-installing, dependency-free. */
(function(){
  'use strict';

  // Which control ids count as "filters" we persist to the URL.
  var ID_RE = /^(f-|as-|cm-|cal-)/;
  // Ignore buttons / non-state controls.
  function isStateControl(el){
    if(!el || !el.id) return false;
    if(!ID_RE.test(el.id)) return false;
    var tag = el.tagName;
    if(tag === 'SELECT' || tag === 'TEXTAREA') return true;
    if(tag === 'INPUT'){
      var t = (el.type||'text').toLowerCase();
      return t==='text' || t==='search' || t==='number' || t==='email';
    }
    return false;
  }
  function controls(){
    return [].slice.call(document.querySelectorAll('select[id],input[id],textarea[id]'))
             .filter(isStateControl);
  }

  var restoring = false;

  function writeURL(){
    if(restoring) return;
    var params = new URLSearchParams();
    controls().forEach(function(el){
      var v = (el.value || '').trim();
      if(v) params.set(el.id, v);
    });
    var qs = params.toString();
    var url = location.pathname + (qs ? '?' + qs : '') + location.hash;
    try { history.replaceState(null, '', url); } catch(e){}
  }

  function fire(el){
    var tag = el.tagName, t = (el.type||'').toLowerCase();
    if(tag === 'SELECT' || t === 'number'){
      el.dispatchEvent(new Event('change', {bubbles:true}));
    } else {
      el.dispatchEvent(new Event('input', {bubbles:true}));
      el.dispatchEvent(new Event('change', {bubbles:true}));
    }
  }

  function readURL(){
    var params = new URLSearchParams(location.search);
    if(![].slice.call(params.keys()).length) return false;
    restoring = true;
    var any = false;
    // Apply town first, then radius, then the rest — so distance logic settles right.
    var order = ['f-town','as-town','f-radius','as-radius'];
    var applied = {};
    function apply(el){
      if(!el || applied[el.id]) return;
      if(params.has(el.id)){
        el.value = params.get(el.id);
        fire(el);
        any = true;
      }
      applied[el.id] = true;
    }
    var byId = {};
    controls().forEach(function(el){ byId[el.id] = el; });
    order.forEach(function(id){ apply(byId[id]); });
    controls().forEach(apply);
    restoring = false;
    return any;
  }

  function wire(){
    controls().forEach(function(el){
      if(el.__ggShareWired) return;
      el.__ggShareWired = true;
      var ev = (el.tagName === 'SELECT' || (el.type||'')==='number') ? 'change' : 'input';
      el.addEventListener(ev, writeURL);
      el.addEventListener('change', writeURL);
    });
  }

  // "Copy link" button next to the reset/clear control.
  function injectCopyButton(){
    if(document.getElementById('gg-share-btn')) return;
    var reset = document.querySelector('.filter-reset, #f-reset, #as-clear, #cm-reset');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'gg-share-btn';
    btn.textContent = '🔗 Copy link to these results';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:6px;margin-left:10px;background:#fff;border:1.5px solid rgba(26,115,232,0.30);color:#1A73E8;font-family:inherit;font-weight:700;font-size:12.5px;padding:7px 14px;border-radius:20px;cursor:pointer;transition:background .15s,border-color .15s;vertical-align:middle;';
    btn.addEventListener('mouseenter', function(){ btn.style.background = '#EAF2FE'; });
    btn.addEventListener('mouseleave', function(){ btn.style.background = '#fff'; });
    btn.addEventListener('click', function(){
      writeURL();
      var done = function(){
        var old = btn.textContent;
        btn.textContent = '✓ Link copied!';
        btn.style.background = '#D8F3EC'; btn.style.borderColor = '#0a7d63'; btn.style.color = '#0a7d63';
        setTimeout(function(){
          btn.textContent = old;
          btn.style.background = '#fff'; btn.style.borderColor = 'rgba(26,115,232,0.30)'; btn.style.color = '#1A73E8';
        }, 1800);
      };
      var url = location.href;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).then(done, function(){ window.prompt('Copy this link:', url); });
      } else {
        window.prompt('Copy this link:', url);
      }
    });
    if(reset && reset.parentNode){
      reset.parentNode.insertBefore(btn, reset.nextSibling);
    } else {
      // Fallback: drop it just above the first results grid.
      var grid = document.querySelector('.center-grid, .cm-grid, .subj-grid');
      if(grid && grid.parentNode){
        var wrap = document.createElement('div');
        wrap.style.cssText = 'text-align:right;margin:0 0 12px;';
        wrap.appendChild(btn);
        grid.parentNode.insertBefore(wrap, grid);
      }
    }
  }

  function start(){
    if(!controls().length) return;
    injectCopyButton();
    wire();
    // Defer restore so each page's own filter logic (and town-radius.js) is wired.
    setTimeout(function(){ readURL(); }, 220);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
