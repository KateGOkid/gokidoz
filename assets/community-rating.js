/*!
 * GOkidOZ Community Rating — self-contained widget.
 * Lets visitors leave their own star rating + short comment on any provider card.
 * Stored in browser localStorage (no backend). Per-card aggregate (average + count) is shown.
 * Auto-attaches to: .center-card, .pc-card, .ru-school.
 * Uses .center-name, .pc-card-name, or .ru-school-name (first match) to derive a stable card ID.
 */
(function(){
  'use strict';

  const STORAGE_KEY = 'gokidoz-community-ratings-v1';
  const SELECTORS = '.center-card, .pc-card, .ru-school, .violin-card, .gym-card';
  const NAME_SELECTORS = '.center-name, .pc-card-name, .ru-school-name, .violin-card strong, .gym-card-name';

  // ---------- styles ----------
  const css = `
.gz-rating{margin-top:12px;padding:10px 12px;background:#FFF8E1;border:1px dashed #E5C168;border-radius:10px;font-family:var(--sans,system-ui);font-size:12.5px;color:#3a2a10;}
.gz-rating-row{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:nowrap;}
.gz-rating-label{font-weight:700;color:#7A5A10;letter-spacing:.01em;display:inline-flex;align-items:center;gap:4px;flex-shrink:0;}
.gz-rating-summary{margin-top:7px;color:#3a2a10;display:flex;gap:6px;align-items:center;flex-wrap:wrap;min-width:0;}
.gz-rating-summary:empty{display:none;}
.gz-rating-stars-show{color:#E5A20F;font-size:14px;letter-spacing:1.5px;font-weight:600;}
.gz-rating-avg{font-weight:700;color:#7A5A10;}
.gz-rating-empty{color:#8a7048;font-style:italic;}
.gz-rating-count{color:#8a7048;}
.gz-rating-btn{background:#fff;border:1px solid #E5C168;color:#7A5A10;font-weight:700;padding:5px 11px;border-radius:8px;cursor:pointer;font-size:12px;font-family:inherit;white-space:nowrap;}
.gz-rating-btn:hover{background:#FFF1C2;}
.gz-rating-form{margin-top:10px;padding-top:10px;border-top:1px dashed #E5C168;display:flex;flex-direction:column;gap:8px;}
.gz-rating-form[hidden]{display:none;}
.gz-rating-stars{display:inline-flex;gap:1px;}
.gz-rating-stars button{background:none;border:none;color:#E5A20F;font-size:26px;cursor:pointer;padding:0 1px;line-height:1;transition:transform .1s;}
.gz-rating-stars button:hover{transform:scale(1.15);}
.gz-rating-comment,.gz-rating-name{padding:7px 10px;border:1px solid #E5C168;border-radius:6px;font:inherit;font-size:12.5px;background:#fff;width:100%;box-sizing:border-box;}
.gz-rating-comment:focus,.gz-rating-name:focus{outline:2px solid #E5A20F;outline-offset:-1px;}
.gz-rating-actions{display:flex;gap:8px;align-items:center;}
.gz-rating-submit{background:#7A5A10;color:#fff;border:none;font-weight:700;padding:7px 14px;border-radius:6px;cursor:pointer;font:inherit;font-size:12.5px;}
.gz-rating-submit:disabled{opacity:.4;cursor:not-allowed;}
.gz-rating-cancel{background:transparent;border:none;color:#8a7048;cursor:pointer;font:inherit;font-size:12px;text-decoration:underline;}
.gz-rating-thanks{padding:6px 10px;background:#E8F5E9;border:1px solid #A5D6A7;border-radius:6px;color:#1B5A2D;font-size:12.5px;font-weight:600;display:none;}
.gz-rating-thanks.show{display:block;}
.gz-rating-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);display:flex;align-items:center;gap:11px;background:#1B5A2D;color:#fff;padding:14px 20px;border-radius:13px;box-shadow:0 12px 34px rgba(0,0,0,.28);font:inherit;font-size:13.5px;line-height:1.35;z-index:99999;opacity:0;transition:opacity .3s ease,transform .3s ease;max-width:90vw;}
.gz-rating-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
.gz-rating-toast-ic{font-size:22px;line-height:1;}
.gz-rating-recent{margin-top:8px;padding-top:8px;border-top:1px dashed #E5C168;font-size:11.5px;color:#5a4434;line-height:1.5;}
.gz-rating-recent-item{margin-bottom:3px;}
.gz-rating-recent-item:last-child{margin-bottom:0;}
.gz-rating-recent-stars{color:#E5A20F;font-size:11px;letter-spacing:.5px;margin-right:5px;}
.gz-rating-already{display:inline-block;margin-left:6px;padding:2px 7px;background:#E8F5E9;color:#1B5A2D;border-radius:8px;font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ---------- storage ----------
  function loadAll(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch(e){ return {}; }
  }
  function saveAll(data){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e){}
  }
  // Send each new rating to the site owner via Netlify Forms (same backend as the
  // newsletter signup). On the deployed Netlify site this emails kate@gokidoz.com /
  // shows up in the Forms dashboard. In preview it no-ops gracefully.
  function emailRating(listingId, listingName, stars, comment, name){
    try {
      var body = new URLSearchParams({
        'form-name': 'rating',
        'listing': listingName || listingId || '',
        'stars': String(stars) + ' / 5',
        'reviewer': name || '(anonymous)',
        'comment': comment || '',
        'page': (location && location.pathname) || ''
      }).toString();
      fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: body }).catch(function(){});
    } catch(e){}
  }
  // floating toast confirmation when a rating is submitted
  function showToast(stars){
    var t = document.createElement('div');
    t.className = 'gz-rating-toast';
    t.innerHTML = '<span class="gz-rating-toast-ic">\u2705</span><span><strong>Thanks for your rating!</strong><br><span style="opacity:.85;">' + '\u2605'.repeat(stars) + ' added \u00b7 it helps other families.</span></span>';
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 350); }, 3200);
  }
  function getRatings(id){ return loadAll()[id] || []; }
  function addRating(id, stars, comment, name){
    const all = loadAll();
    if (!all[id]) all[id] = [];
    all[id].push({s: stars, c: (comment||'').slice(0,140), n: (name||'').slice(0,40), d: Date.now()});
    saveAll(all);
  }
  function hasUserRated(id){
    // Mark this rating with a per-browser flag so we can show "you already rated"
    return !!localStorage.getItem('gz-rated-' + id);
  }
  function markUserRated(id){
    localStorage.setItem('gz-rated-' + id, '1');
  }

  // ---------- shared server ratings (Netlify Blobs via /api/ratings) ----------
  // SERVER_AGG[id] = {count, avg, recent:[...]} populated from the server so every
  // visitor sees the same averages. Falls back silently to localStorage in preview
  // or if the API is unavailable.
  var SERVER_AGG = {};
  var RENDERERS = {}; // id -> [renderFn,...] so we can refresh after the batch fetch
  function registerRenderer(id, fn){ (RENDERERS[id] = RENDERERS[id] || []).push(fn); }
  function refresh(id){ (RENDERERS[id] || []).forEach(function(fn){ try{ fn(); }catch(e){} }); }
  function fetchServer(ids){
    if (!ids.length) return;
    fetch('/api/ratings?ids=' + encodeURIComponent(ids.join(',')))
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){
        if (!data) return;
        Object.keys(data).forEach(function(id){ SERVER_AGG[id] = data[id]; refresh(id); });
      })
      .catch(function(){});
  }
  function postServer(id, listing, stars, comment, name){
    return fetch('/api/ratings', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id:id, listing:listing, stars:stars, comment:comment, name:name, page:(location&&location.pathname)||'' })
    }).then(function(r){ return r.ok ? r.json() : null; }).catch(function(){ return null; });
  }

  // ---------- helpers ----------
  function slug(s){
    return (s || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);
  }
  function average(arr){
    if (!arr.length) return 0;
    return arr.reduce((a,r) => a + r.s, 0) / arr.length;
  }
  function starsRow(n){
    const r = Math.round(n);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }
  function escapeHtml(s){
    return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function timeAgo(t){
    const d = Date.now() - t;
    if (d < 60*1000) return 'just now';
    if (d < 60*60*1000) return Math.floor(d/60000) + 'm ago';
    if (d < 24*60*60*1000) return Math.floor(d/3600000) + 'h ago';
    if (d < 30*24*60*60*1000) return Math.floor(d/86400000) + 'd ago';
    return Math.floor(d/(30*86400000)) + 'mo ago';
  }

  // ---------- widget ----------
  function createWidget(card){
    if (card.querySelector('.gz-rating')) return; // already attached
    const nameEl = card.querySelector(NAME_SELECTORS);
    if (!nameEl) return;
    const name = (nameEl.textContent || '').trim();
    const id = slug(name);
    if (!id) return;

    const w = document.createElement('div');
    w.className = 'gz-rating';
    w.dataset.gzId = id;
    w.innerHTML = `
      <div class="gz-rating-row">
        <span class="gz-rating-label">🌟 GOkidOZ parent rating</span>
        <button class="gz-rating-btn" type="button">✏️ Rate this</button>
      </div>
      <div class="gz-rating-summary"></div>
      <div class="gz-rating-form" hidden>
        <div class="gz-rating-stars" role="radiogroup" aria-label="Your rating">
          <button type="button" data-v="1" aria-label="1 star" title="Poor">☆</button>
          <button type="button" data-v="2" aria-label="2 stars" title="Fair">☆</button>
          <button type="button" data-v="3" aria-label="3 stars" title="Good">☆</button>
          <button type="button" data-v="4" aria-label="4 stars" title="Very good">☆</button>
          <button type="button" data-v="5" aria-label="5 stars" title="Excellent">☆</button>
        </div>
        <input class="gz-rating-name" type="text" placeholder="Your name" maxlength="40">
        <input class="gz-rating-comment" type="text" placeholder="Optional · share why (max 140 chars)" maxlength="140">
        <div class="gz-rating-actions">
          <button class="gz-rating-submit" type="button" disabled>Submit rating</button>
          <button class="gz-rating-cancel" type="button">Cancel</button>
        </div>
      </div>
      <div class="gz-rating-thanks">Thanks! Your rating helps other Boston families.</div>
      <div class="gz-rating-recent"></div>
    `;
    card.appendChild(w);

    const sumEl = w.querySelector('.gz-rating-summary');
    const formEl = w.querySelector('.gz-rating-form');
    const btn = w.querySelector('.gz-rating-btn');
    const starBtns = [...w.querySelectorAll('.gz-rating-stars button')];
    const commentEl = w.querySelector('.gz-rating-comment');
    const nameInputEl = w.querySelector('.gz-rating-name');
    const submitEl = w.querySelector('.gz-rating-submit');
    const cancelEl = w.querySelector('.gz-rating-cancel');
    const thanksEl = w.querySelector('.gz-rating-thanks');
    const recentEl = w.querySelector('.gz-rating-recent');

    let selectedStars = 0;

    function render(){
      const localRatings = getRatings(id);
      const srv = SERVER_AGG[id];
      // Prefer the shared server aggregate (everyone sees the same number);
      // fall back to this browser's local ratings when the API isn't reachable.
      const count = srv ? srv.count : localRatings.length;
      const avg = srv ? srv.avg : average(localRatings);
      const userTag = hasUserRated(id) ? '<span class="gz-rating-already">You rated this</span>' : '';
      if (!count) {
        sumEl.innerHTML = '<span class="gz-rating-empty">No ratings yet — be the first</span>' + userTag;
      } else {
        sumEl.innerHTML =
          `<span class="gz-rating-stars-show" aria-hidden="true">${starsRow(avg)}</span>` +
          `<span class="gz-rating-avg">${avg.toFixed(1)}</span>` +
          `<span class="gz-rating-count">· ${count} ${count === 1 ? 'rating' : 'ratings'}</span>` +
          userTag;
      }
      // Latest 2 comments — prefer server-side recent, else local
      const source = (srv && srv.recent && srv.recent.length) ? srv.recent : localRatings;
      const withComments = source.filter(r => r.c).slice(-2).reverse();
      if (withComments.length) {
        recentEl.innerHTML = withComments.map(r =>
          `<div class="gz-rating-recent-item"><span class="gz-rating-recent-stars">${starsRow(r.s)}</span>"${escapeHtml(r.c)}" <span style="color:#aa9070;">· ${r.n ? escapeHtml(r.n) + ' · ' : ''}${timeAgo(r.d)}</span></div>`
        ).join('');
      } else {
        recentEl.innerHTML = '';
      }
    }

    function setStars(n){
      selectedStars = n;
      starBtns.forEach(b => b.textContent = (+b.dataset.v <= n) ? '★' : '☆');
      submitEl.disabled = n < 1;
    }

    function openForm(){
      formEl.hidden = false;
      btn.style.display = 'none';
      thanksEl.classList.remove('show');
      commentEl.focus();
    }
    function closeForm(){
      formEl.hidden = true;
      btn.style.display = '';
      setStars(0);
      commentEl.value = '';
      if (nameInputEl) nameInputEl.value = '';
    }

    btn.addEventListener('click', openForm);
    cancelEl.addEventListener('click', closeForm);
    starBtns.forEach(b => {
      b.addEventListener('click', () => setStars(+b.dataset.v));
      b.addEventListener('mouseenter', () => {
        const v = +b.dataset.v;
        starBtns.forEach(bb => bb.textContent = (+bb.dataset.v <= v) ? '★' : '☆');
      });
    });
    w.querySelector('.gz-rating-stars').addEventListener('mouseleave', () => {
      starBtns.forEach(b => b.textContent = (+b.dataset.v <= selectedStars) ? '★' : '☆');
    });
    submitEl.addEventListener('click', () => {
      if (selectedStars < 1) return;
      const cmt = commentEl.value.trim();
      const nm = nameInputEl ? nameInputEl.value.trim() : '';
      addRating(id, selectedStars, cmt, nm);
      emailRating(id, name, selectedStars, cmt, nm);
      // Save to shared server store, then refresh from the authoritative count.
      postServer(id, name, selectedStars, cmt, nm).then(function(res){
        if (res && res.count) { SERVER_AGG[id] = { count: res.count, avg: res.avg, recent: (SERVER_AGG[id]&&SERVER_AGG[id].recent)||[] }; }
        refresh(id);
      });
      markUserRated(id);
      closeForm();
      render();
      thanksEl.classList.add('show');
      setTimeout(() => thanksEl.classList.remove('show'), 3000);
      showToast(selectedStars);
    });

    registerRenderer(id, render);
    render();
  }

  function init(){
    document.querySelectorAll(SELECTORS).forEach(createWidget);
    // Batch-load shared ratings for every listing on the page in one request.
    fetchServer(Object.keys(RENDERERS));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
