/*! GOkidOZ — Back to top button. Self-contained, no deps. */
(function(){
  'use strict';
  var btn = document.createElement('button');
  btn.id = 'gz-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  var css = document.createElement('style');
  css.textContent =
    '#gz-top{position:fixed;right:20px;bottom:20px;z-index:1200;width:48px;height:48px;border:none;border-radius:50%;'
    + 'background:#1A73E8;color:#fff;font-size:22px;font-weight:700;line-height:1;cursor:pointer;'
    + 'box-shadow:0 4px 14px rgba(11,61,145,0.32);opacity:0;visibility:hidden;transform:translateY(10px);'
    + 'transition:opacity .2s,transform .2s,visibility .2s;display:flex;align-items:center;justify-content:center;}'
    + '#gz-top.show{opacity:1;visibility:visible;transform:translateY(0);}'
    + '#gz-top:hover{background:#0B3D91;}'
    + '@media(max-width:600px){#gz-top{right:14px;bottom:14px;width:44px;height:44px;font-size:20px;}}';
  function init(){
    document.head.appendChild(css);
    document.body.appendChild(btn);
    function onScroll(){
      if(window.pageYOffset > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    btn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
    onScroll();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
