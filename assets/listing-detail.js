/*! GOkidOZ — Listing detail router. Self-installing.
 * Makes every directory card open an on-site detail page (new tab) carrying
 * that card's full info + the official direct link. Non-destructive: filters,
 * search and maps still read the same cards/attributes.
 */
(function(){
  'use strict';
  // Relative URL prefix to project root, from this script's own (relative) src.
  function rootPrefix(){
    var s = document.currentScript;
    if(!s){ var ss=document.getElementsByTagName('script'); for(var i=ss.length-1;i>=0;i--){ if((ss[i].getAttribute('src')||'').indexOf('listing-detail.js')>=0){ s=ss[i]; break; } } }
    var src=(s&&s.getAttribute('src'))||'';
    var i=src.indexOf('assets/listing-detail.js');
    return i>=0 ? src.slice(0,i) : '';   // e.g. "../" or "../../"
  }
  var ROOT = rootPrefix();

  function txt(el){ return el ? (el.textContent||'').replace(/\s+/g,' ').trim() : ''; }

  function serialize(card){
    var nameEl = card.querySelector('.center-name');
    var name = txt(nameEl);
    if(!name) return null;
    // official/direct link: prefer the name's link, else first http link, else the book button
    var url='';
    var a = (nameEl && nameEl.querySelector('a[href^="http"]'))
          || card.querySelector('.center-book[href^="http"]')
          || card.querySelector('a[href^="http"]');
    if(a) url=a.href;
    // phone
    var phone='';
    var tel = card.querySelector('a[href^="tel:"]');
    if(tel) phone = txt(tel).replace(/^\D*/,'') || tel.getAttribute('href').replace('tel:','');
    var badges=[];
    card.querySelectorAll('.center-price').forEach(function(b){ var t=txt(b); if(t) badges.push(t); });
    var desc = txt(card.querySelector('.center-specialty'));
    var meta=[];
    var labels=card.querySelectorAll('.center-meta-label');
    var values=card.querySelectorAll('.center-meta-value');
    for(var i=0;i<labels.length;i++){
      var v=values[i];
      var va = v && v.querySelector('a[href^="http"]');
      meta.push({ l:txt(labels[i]), v:txt(v), vurl: va?va.href:'' });
    }
    return { name:name, url:url, phone:phone, badges:badges, desc:desc, meta:meta };
  }

  function detailHref(card){
    var data=serialize(card);
    if(!data) return null;
    return ROOT+'detail.html#'+encodeURIComponent(JSON.stringify(data));
  }

  // strip a meta label/value pair when the value is a website or phone link
  function stripContactRows(card){
    var labels=card.querySelectorAll('.center-meta-label');
    var values=card.querySelectorAll('.center-meta-value');
    for(var i=labels.length-1;i>=0;i--){
      var v=values[i];
      if(v && v.querySelector('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]')){
        if(values[i]) values[i].remove();
        if(labels[i]) labels[i].remove();
      }
    }
    // standalone link rows (directory variants)
    card.querySelectorAll('.center-site, .center-map, .center-actions').forEach(function(e){ e.remove(); });
  }

  function makeCardClickable(card, href){
    card.style.cursor='pointer';
    card.addEventListener('click', function(e){
      if(e.target.closest('.gz-rating, button, input, textarea, select')) return; // keep rating etc.
      if(e.target.closest('a')) return; // let explicit links act
      window.open(href,'_blank','noopener');
    });
  }

  function wire(){
    var cards=document.querySelectorAll('.center-card');
    cards.forEach(function(card){
      if(card.getAttribute('data-ld')) return;
      var href=detailHref(card);          // capture url/phone/meta BEFORE stripping
      if(!href) return;
      card.setAttribute('data-ld','1');
      // 1) name -> detail page
      var nameA=card.querySelector('.center-name a');
      if(nameA){ nameA.href=href; nameA.target='_blank'; nameA.rel='noopener'; }
      else {
        var nameEl=card.querySelector('.center-name');
        if(nameEl){ nameEl.style.cursor='pointer'; nameEl.addEventListener('click',function(){ window.open(href,'_blank','noopener'); }); }
      }
      // 2) remove direct contact links from the card — they live on the detail page now
      stripContactRows(card);
      // 3) single clear action -> detail page
      var book=card.querySelector('.center-book');
      if(book){
        book.href=href; book.target='_blank'; book.rel='noopener';
        book.removeAttribute('onclick');
        book.textContent='View details ↗';
      }
      // 4) whole card clickable
      makeCardClickable(card, href);
    });
    wireGym();
  }

  // ---- .gym-card support (gymnastics page) ----
  function serializeGym(card){
    var nameEl=card.querySelector('.gym-card-name');
    var name=txt(nameEl);
    if(!name) return null;
    var url='';
    var a=(nameEl&&nameEl.querySelector('a[href^="http"]'))||card.querySelector('a[href^="http"]');
    if(a) url=a.href;
    var phone='';
    var tel=card.querySelector('a[href^="tel:"]');
    if(tel) phone=tel.getAttribute('href').replace('tel:','');
    var badges=[]; card.querySelectorAll('.gym-card-badge').forEach(function(b){var t=txt(b);if(t)badges.push(t);});
    var desc=txt(card.querySelector('.gym-card-spec'));
    var meta=[];
    card.querySelectorAll('.gym-card-row').forEach(function(r){
      var t=txt(r); if(!t) return;
      // split leading emoji label from value
      var m=t.match(/^(\S+)\s+(.*)$/);
      var va=r.querySelector('a[href^="http"]');
      meta.push({ l:m?m[1]:'•', v:m?m[2]:t, vurl: va?va.href:'' });
    });
    return { name:name, url:url, phone:phone, badges:badges, desc:desc, meta:meta };
  }
  function wireGym(){
    document.querySelectorAll('.gym-card').forEach(function(card){
      if(card.getAttribute('data-ld')) return;
      var data=serializeGym(card); if(!data) return;
      card.setAttribute('data-ld','1');
      var href=ROOT+'detail.html#'+encodeURIComponent(JSON.stringify(data));
      var nameA=card.querySelector('.gym-card-name a');
      if(nameA){ nameA.href=href; nameA.target='_blank'; nameA.rel='noopener'; }
      else {
        var nameEl=card.querySelector('.gym-card-name');
        if(nameEl){ nameEl.style.cursor='pointer'; nameEl.addEventListener('click',function(){ window.open(href,'_blank','noopener'); }); }
      }
      // remove direct website/phone rows — contact lives on the detail page
      card.querySelectorAll('.gym-card-row').forEach(function(r){
        if(r.querySelector('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]')) r.remove();
      });
      makeCardClickable(card, href);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wire);
  else wire();
})();
