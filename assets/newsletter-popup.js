/*! GOkidOZ — Newsletter popup. Self-installing.
 * Shows a centered modal inviting newsletter signup a few seconds after load.
 * Reuses the Netlify "newsletter" form (registered via the static footer form).
 * Suppressed via localStorage once dismissed or subscribed. No scroll trigger.
 */
(function(){
  'use strict';
  var KEY = 'gz-newsletter-popup-v1';
  try { if (localStorage.getItem(KEY)) return; } catch(e){}

  var css = ''
  + '.gznp-overlay{position:fixed;inset:0;background:rgba(20,18,30,0.55);backdrop-filter:blur(3px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s ease;}'
  + '.gznp-overlay.show{opacity:1;}'
  + '.gznp-card{position:relative;background:#fff;border-radius:20px;max-width:430px;width:100%;padding:34px 30px 28px;box-shadow:0 24px 60px rgba(0,0,0,0.32);text-align:center;transform:translateY(14px) scale(.98);transition:transform .25s ease;font-family:var(--sans,system-ui);}'
  + '.gznp-overlay.show .gznp-card{transform:none;}'
  + '.gznp-close{position:absolute;top:12px;right:14px;width:30px;height:30px;border:none;background:#f0f0f3;color:#666;border-radius:50%;font-size:18px;line-height:1;cursor:pointer;}'
  + '.gznp-close:hover{background:#e4e4ea;color:#222;}'
  + '.gznp-emoji{font-size:46px;line-height:1;margin-bottom:10px;}'
  + '.gznp-eyebrow{display:inline-block;background:var(--g2,#1A73E8);color:#fff;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:4px 12px;border-radius:14px;margin-bottom:12px;}'
  + '.gznp-title{font-family:var(--serif,Georgia,serif);font-size:25px;font-weight:700;color:var(--g1,#1A1A1E);line-height:1.15;margin:0 0 8px;}'
  + '.gznp-sub{font-size:14.5px;color:var(--text-muted,#5F6B7A);line-height:1.55;margin:0 0 18px;}'
  + '.gznp-form{display:flex;flex-direction:column;gap:10px;}'
  + '.gznp-form input,.gznp-form select{padding:13px 15px;border:1.5px solid var(--border-mid,#d5dbe2);border-radius:11px;font-size:15px;font-family:inherit;width:100%;box-sizing:border-box;background:#fff;}'
  + '.gznp-form input:focus,.gznp-form select:focus{outline:2px solid var(--g2,#1A73E8);outline-offset:-1px;}'
  + '.gznp-two{display:flex;gap:10px;}'
  + '.gznp-btn{background:var(--g2,#1A73E8);color:#fff;border:none;border-radius:11px;padding:13px;font-weight:800;font-size:15px;cursor:pointer;font-family:inherit;}'
  + '.gznp-btn:hover{filter:brightness(1.05);}'
  + '.gznp-fine{font-size:11.5px;color:#9aa3ad;margin-top:12px;}'
  + '.gznp-ok{display:none;padding:16px;background:var(--teal-l,#d8f3ec);color:var(--teal,#0a7d63);border-radius:11px;font-weight:700;font-size:15px;}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function dismiss(set){ try{ if(set) localStorage.setItem(KEY, set); }catch(e){} var o=document.querySelector('.gznp-overlay'); if(o){ o.classList.remove('show'); setTimeout(function(){ o.remove(); }, 260); } }

  function build(){
    if (document.querySelector('.gznp-overlay')) return;
    var o = document.createElement('div');
    o.className = 'gznp-overlay';
    o.innerHTML = ''
      + '<div class="gznp-card" role="dialog" aria-modal="true" aria-label="Newsletter signup">'
      + '<button class="gznp-close" type="button" aria-label="Close">\u00d7</button>'
      + '<div class="gznp-emoji">\ud83d\udc8c</div>'
      + '<div class="gznp-eyebrow">Don\u2019t scroll \u2014 be the first to know!</div>'
      + '<div class="gznp-title">Fun events &amp; news, in your inbox</div>'
      + '<div class="gznp-sub">Join Boston-area parents getting the week\u2019s best kids\u2019 classes, camps &amp; fun events \u2014 plus the latest news.</div>'
      + '<form class="gznp-form" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field">'
      + '<input type="hidden" name="form-name" value="newsletter">'
      + '<p style="display:none;"><label>Don\u2019t fill this out: <input name="bot-field"></label></p>'
      + '<span class="gznp-row" style="display:flex;flex-direction:column;gap:10px;">'
      + '<span class="gznp-two"><input type="text" name="first_name" required placeholder="First name" aria-label="First name"><input type="text" name="last_name" placeholder="Last name" aria-label="Last name"></span>'
      + '<span class="gznp-two"><input type="email" name="email" required placeholder="Email address" aria-label="Email address"><input type="text" name="zip" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="ZIP code" aria-label="ZIP code" style="max-width:120px;"></span>'
      + '<select name="interest" aria-label="What are you interested in?"><option value="All">I\u2019m interested in\u2026 everything!</option><option value="Camps">Camps</option><option value="After-school activities">After-school activities</option><option value="Fun events">Fun events</option></select>'
      + '<button class="gznp-btn" type="submit">Subscribe \u2192</button>'
      + '</span>'
      + '<div class="gznp-ok">\ud83c\udf89 You\u2019re on the list! Check your inbox.</div>'
      + '</form>'
      + '<div class="gznp-fine">Free \u00b7 unsubscribe anytime. We\u2019ll never share your email.</div>'
      + '</div>';
    document.body.appendChild(o);
    requestAnimationFrame(function(){ o.classList.add('show'); });

    o.querySelector('.gznp-close').addEventListener('click', function(){ dismiss('dismissed'); });
    o.addEventListener('click', function(e){ if(e.target===o) dismiss('dismissed'); });
    document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ dismiss('dismissed'); document.removeEventListener('keydown', esc); } });

    var form = o.querySelector('form');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var d = new FormData(form);
      fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(d).toString()})
        .then(after).catch(after);
      function after(){
        form.querySelector('.gznp-row').style.display='none';
        form.querySelector('.gznp-ok').style.display='block';
        try{ localStorage.setItem(KEY,'subscribed'); }catch(e){}
        setTimeout(function(){ dismiss(); }, 2200);
      }
    });
  }

  function start(){ setTimeout(build, 5000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
