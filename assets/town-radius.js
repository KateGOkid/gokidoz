/*! GOkidOZ — Town radius filter helper. Self-installing.
 * Exposes window.gzDist(a,b) (miles) and window.gzTownOK(selTown,cardTown),
 * and injects a "Within" radius <select id="f-radius"> next to #f-town. */
(function(){
  'use strict';
  var TC = {
    norfolk:[42.1176,-71.3248],wrentham:[42.064,-71.3284],franklin:[42.0834,-71.3967],milford:[42.1398,-71.5162],stow:[42.4368,-71.5051],georgetown:[42.7251,-70.9839],newburyport:[42.8126,-70.8773],ipswich:[42.6792,-70.8412],hamilton:[42.6126,-70.8589],lawrence:[42.707,-71.1631],methuen:[42.7262,-71.1909],chelmsford:[42.5998,-71.3673],dracut:[42.67,-71.3018],westford:[42.5793,-71.4376],littleton:[42.5376,-71.4884],harvard:[42.5001,-71.5817],marshfield:[42.0918,-70.7056],duxbury:[42.0418,-70.6722],hanover:[42.114,-70.812],pembroke:[42.0654,-70.8079],rockland:[42.1306,-70.9162],norton:[41.9668,-71.1851],'west-dennis':[41.6629,-70.17],'south-end':[42.3388,-71.0765],waban:[42.3268,-71.2298],leominster:[42.5251,-71.7598],'n-dartmouth':[41.6362,-70.9928],mendon:[42.1043,-71.5523],'allston-brighton':[42.349,-71.1338],'east-walpole':[42.1543,-71.212],'greater-boston':[42.3601,-71.0589],

    wellesley:[42.2968,-71.2924],newton:[42.3370,-71.2092],'west-newton':[42.3490,-71.2300],
    'newton-upper-falls':[42.3140,-71.2160],auburndale:[42.3460,-71.2470],'newton-highlands':[42.3220,-71.2070],
    brookline:[42.3318,-71.1212],needham:[42.2809,-71.2378],natick:[42.2835,-71.3495],
    framingham:[42.2793,-71.4162],waltham:[42.3765,-71.2356],lexington:[42.4430,-71.2290],
    belmont:[42.3959,-71.1786],arlington:[42.4154,-71.1565],cambridge:[42.3736,-71.1097],
    somerville:[42.3876,-71.0995],boston:[42.3601,-71.0589],'back-bay':[42.3503,-71.0810],
    'south-boston':[42.3330,-71.0490],dorchester:[42.3016,-71.0676],roxbury:[42.3251,-71.0956],
    'jamaica-plain':[42.3098,-71.1147],roslindale:[42.2870,-71.1290],brighton:[42.3500,-71.1560],
    allston:[42.3539,-71.1337],charlestown:[42.3782,-71.0602],medford:[42.4184,-71.1062],
    malden:[42.4251,-71.0662],everett:[42.4084,-71.0537],revere:[42.4084,-71.0120],
    winthrop:[42.3751,-70.9828],chelsea:[42.3917,-71.0328],quincy:[42.2529,-71.0023],
    milton:[42.2495,-71.0662],dedham:[42.2436,-71.1662],westwood:[42.2138,-71.2245],
    norwood:[42.1945,-71.1992],walpole:[42.1418,-71.2495],canton:[42.1584,-71.1448],
    sharon:[42.1237,-71.1786],stoughton:[42.1251,-71.1023],braintree:[42.2079,-71.0037],
    weymouth:[42.2208,-70.9395],hingham:[42.2418,-70.8898],dover:[42.2465,-71.2829],
    sherborn:[42.2390,-71.3690],medfield:[42.1873,-71.3062],millis:[42.1670,-71.3578],
    holliston:[42.2001,-71.4234],ashland:[42.2612,-71.4634],hopkinton:[42.2287,-71.5226],
    weston:[42.3668,-71.3033],wayland:[42.3626,-71.3617],sudbury:[42.3834,-71.4162],
    lincoln:[42.4264,-71.3040],concord:[42.4604,-71.3489],bedford:[42.4906,-71.2761],
    burlington:[42.5048,-71.1956],woburn:[42.4793,-71.1523],winchester:[42.4523,-71.1370],
    stoneham:[42.4801,-71.0998],melrose:[42.4584,-71.0662],wakefield:[42.5043,-71.0723],
    reading:[42.5256,-71.0959],watertown:[42.3709,-71.1828],marlborough:[42.3459,-71.5523],
    westborough:[42.2695,-71.6162],northborough:[42.3195,-71.6412],southborough:[42.3056,-71.5245],
    peabody:[42.5279,-70.9287],danvers:[42.5751,-70.9300],salem:[42.5195,-70.8967],
    marblehead:[42.5001,-70.8578],beverly:[42.5584,-70.8800],lynn:[42.4668,-70.9495],
    swampscott:[42.4709,-70.9176],saugus:[42.4654,-71.0101],andover:[42.6583,-71.1368],
    'north-andover':[42.6986,-71.1351],amesbury:[42.8584,-70.9301],haverhill:[42.7762,-71.0773],
    foxborough:[42.0654,-71.2478],foxboro:[42.0654,-71.2478],'north-reading':[42.5751,-71.0787],tewksbury:[42.6109,-71.2342],walpole:[42.1418,-71.2495],billerica:[42.5584,-71.2689],fitchburg:[42.5834,-71.8023],mansfield:[42.0334,-71.2189],easton:[42.0240,-71.0790],
    plymouth:[41.9584,-70.6673],lenox:[42.3565,-73.2848],lee:[42.3045,-73.2487],
    pittsfield:[42.4501,-73.2454],boxborough:[42.4884,-71.5176],middleton:[42.5951,-71.0162],gloucester:[42.6159,-70.6620],'woods-hole':[41.5237,-70.6712],
    'east-sandwich':[41.7390,-70.4519],
    'hyde-park':[42.2553,-71.1248],'north-reading':[42.5751,-71.0787],charlton:[42.1370,-71.9698],
    falmouth:[41.5515,-70.6148],onset:[41.7407,-70.6595],'yarmouth-port':[41.7029,-70.2411],
    bourne:[41.7412,-70.5990],mashpee:[41.6490,-70.4805],sandwich:[41.7590,-70.4936],
    harwich:[41.6862,-70.0758],barnstable:[41.7003,-70.3002],cotuit:[41.6168,-70.4370],
    dennis:[41.7353,-70.1936],brewster:[41.7601,-70.0825],'west-barnstable':[41.6968,-70.3742],
    yarmouth:[41.7057,-70.2286],chatham:[41.6821,-69.9597],cataumet:[41.6695,-70.6189],
    osterville:[41.6276,-70.3833],'west-yarmouth':[41.6515,-70.2289],hyannis:[41.6529,-70.2828],
    wellfleet:[41.9301,-70.0331],'east-brookfield':[42.2237,-72.0481],peru:[42.4209,-73.0500],
    beckett:[42.3320,-73.0801],otis:[42.1890,-73.0884],hinsdale:[42.4376,-73.1218],
    tolland:[42.0795,-72.9259],shrewsbury:[42.2959,-71.7128],'east-boston':[42.3702,-71.0389],
    worcester:[42.2626,-71.8023],bridgewater:[41.9904,-70.9750],acton:[42.4851,-71.4328],
    topsfield:[42.6376,-70.9495],lowell:[42.6334,-71.3162],lakeville:[41.8459,-70.9492],
    middleton:[42.5951,-71.0162],'newton-centre':[42.3293,-71.1923],'west-roxbury':[42.2843,-71.1573],
    hudson:[42.3917,-71.5662],wilmington:[42.5465,-71.1737],bolton:[42.4334,-71.6079],
    maynard:[42.4334,-71.4495],groton:[42.6112,-71.5745],northampton:[42.3251,-72.6412],
    florence:[42.3215,-72.6829],leverett:[42.4548,-72.5006],'south-yarmouth':[41.6690,-70.1764],
    norwell:[42.1618,-70.7945],cohasset:[42.2418,-70.8034],scituate:[42.1959,-70.7259],
    holyoke:[42.2043,-72.6162],agawam:[42.0695,-72.6148],'new-bedford':[41.6362,-70.9342],
    fairhaven:[41.6376,-70.9039],middleborough:[41.8929,-70.9112],'fall-river':[41.7015,-71.1550],
    swansea:[41.7451,-71.1898],taunton:[41.9001,-71.0898],
    providence:[41.8240,-71.4128],newport:[41.4901,-71.3128],bristol:[41.6862,-71.2662],warwick:[41.7001,-71.4162],lincoln:[41.9112,-71.4450],
    londonderry:[42.8651,-71.3739],hampstead:[42.8806,-71.1812],'manchester-nh':[42.9956,-71.4548],'concord-nh':[43.2081,-71.5376],'salem-nh':[42.7884,-71.2009],candia:[43.0762,-71.2784],
    austin:[30.2672,-97.7431],
        pensacola:[30.4213,-87.2169],viera:[28.2569,-80.7204],rockledge:[28.3503,-80.7256],lithia:[27.8714,-82.2143],stuart:[27.1973,-80.2528],'palm-city':[27.1689,-80.2917],'cooper-city':[26.0570,-80.2717],kendall:[25.6793,-80.3173],'fort-myers':[26.6406,-81.8723],
    miami:[25.7617,-80.1918],'miami-beach':[25.7907,-80.1300],'fort-lauderdale':[26.1224,-80.1373],hollywood:[26.0112,-80.1495],'pembroke-pines':[26.0078,-80.2963],'coral-springs':[26.2712,-80.2706],'boca-raton':[26.3683,-80.1289],'delray-beach':[26.4615,-80.0728],'west-palm-beach':[26.7153,-80.0534],'palm-beach-gardens':[26.8234,-80.1387],jupiter:[26.9342,-80.0942],'palm-bay':[28.0345,-80.5887],melbourne:[28.0836,-80.6081],orlando:[28.5383,-81.3792],kissimmee:[28.2920,-81.4076],'winter-park':[28.5999,-81.3392],'winter-garden':[28.5653,-81.5862],lakeland:[28.0395,-81.9498],tampa:[27.9506,-82.4572],'st-petersburg':[27.7676,-82.6403],clearwater:[27.9659,-82.8001],brandon:[27.9378,-82.2859],sarasota:[27.3364,-82.5307],bradenton:[27.4989,-82.5748],naples:[26.1420,-81.7948],'fort-myers':[26.6406,-81.8723],'cape-coral':[26.5629,-81.9495],jacksonville:[30.3322,-81.6557],'ponte-vedra':[30.2394,-81.3856],gainesville:[29.6516,-82.3248],tallahassee:[30.4383,-84.2807],hialeah:[25.8576,-80.2781],'pompano-beach':[26.2379,-80.1248],'port-st-lucie':[27.2730,-80.3582],doral:[25.8195,-80.3553],aventura:[25.9565,-80.1389],plantation:[26.1276,-80.2331],sunrise:[26.1669,-80.2564],davie:[26.0765,-80.2521],'coral-gables':[25.7215,-80.2684],'key-biscayne':[25.6937,-80.1626],'fl':[27.9944,-81.7603],
    'new-haven':[41.3083,-72.9279],hartford:[41.7658,-72.6734],bridgeport:[41.1792,-73.1894],stamford:[41.0534,-73.5387],waterbury:[41.5582,-73.0515],hamden:[41.3959,-72.8968],manchester:[41.7759,-72.5215],middletown:[41.5623,-72.6506],norwalk:[41.1177,-73.4082],shelton:[41.3165,-73.0932],middlebury:[41.5276,-73.1290],
    ma:[42.36,-71.10]
  };
  function norm(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]/g,''); }
  // build a normalized lookup so 'New Haven' / 'new-haven' both resolve
  var NTC={}; for(var k in TC){ NTC[norm(k)]=TC[k]; }
  function coord(t){ return NTC[norm(t)]||null; }
  window.gzDist=function(a,b){
    var A=coord(a),B=coord(b); if(!A||!B) return null;
    var R=3959, dLat=(B[0]-A[0])*Math.PI/180, dLon=(B[1]-A[1])*Math.PI/180,
        la=A[0]*Math.PI/180, lb=B[0]*Math.PI/180,
        h=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(la)*Math.cos(lb)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
  };
  // selTown selected in filter; cardTown is the card's data-town. Honors #f-radius.
  window.gzTownOK=function(sel,card){
    if(!sel) return true;
    card=card||'';
    if(card===sel) return true;
    var rad=document.getElementById('f-radius');
    var mi=rad?parseFloat(rad.value)||0:0;
    if(!mi) return card===sel;
    var d=window.gzDist(sel,card);
    return d!==null && d<=mi;
  };
  // Inject the radius dropdown + wire it to re-run the page filter.
  function inject(){
    var town=document.getElementById('f-town');
    if(!town) return;
    if(document.getElementById('f-radius')) { wire(); return; }
    var field=town.closest('.filter-field')||town.parentNode;
    var wrap=document.createElement('div');
    wrap.className=(field.className||'filter-field');
    wrap.innerHTML='<label for="f-radius">Within</label>'+
      '<select id="f-radius">'+
      '<option value="">Any distance</option>'+
      '<option value="5">5 miles</option>'+
      '<option value="10">10 miles</option>'+
      '<option value="15">15 miles</option>'+
      '<option value="25">25 miles</option>'+
      '</select>';
    if(field.nextSibling) field.parentNode.insertBefore(wrap, field.nextSibling);
    else field.parentNode.appendChild(wrap);
    wire();
  }
  function wire(){
    var rad=document.getElementById('f-radius'), town=document.getElementById('f-town');
    if(!rad||!town||rad.__gzWired) return;
    rad.__gzWired=true;
    rad.addEventListener('change', function(){
      gzAuto=false;        // user took manual control of the radius…
      gzUserRadius=true;   // …so stop auto-broadening until they change town
      gzPass=true;         // this re-run is internal, not a genuine town change
      // re-run whatever the page binds to the town <select>
      town.dispatchEvent(new Event('change'));
    });
  }

  /* ---- Auto-broaden: never leave a chosen town empty or with a single lonely result ---- */
  var gzAuto=false, gzPass=false, gzUserRadius=false, gzReason=0;
  function visibleCount(){
    var n=0, cards=document.querySelectorAll('.center-card');
    for(var i=0;i<cards.length;i++){ if(cards[i].offsetParent!==null) n++; }
    return n;
  }
  function townLabel(town){
    var o=town.options&&town.options[town.selectedIndex];
    return (o?o.textContent:town.value).replace(/^[^A-Za-z]+/,'').trim()||town.value;
  }
  function note(msg){
    var el=document.getElementById('gz-radius-note');
    if(!msg){ if(el) el.style.display='none'; return; }
    if(!el){
      el=document.createElement('div');
      el.id='gz-radius-note';
      el.style.cssText='margin:0 0 14px;padding:11px 16px;background:#FFF6E0;border:1px solid #F0D27A;border-radius:10px;color:#7A5B12;font-size:13.5px;font-weight:600;line-height:1.5;';
      var anchor=document.getElementById('f-empty');
      if(anchor&&anchor.parentNode) anchor.parentNode.insertBefore(el, anchor);
      else { var first=document.querySelector('.center-card'); if(first&&first.parentNode) first.parentNode.insertBefore(el, first); else return; }
    }
    el.textContent=msg; el.style.display='';
  }
  function deferred(){
    var town=document.getElementById('f-town'), rad=document.getElementById('f-radius');
    if(!town||!rad) return;
    // Auto-broaden only applies to true listing pages (.center-card grids),
    // not subject-overview pages that use .subj-card.
    if(!document.querySelector('.center-card')){ note(null); return; }
    if(!gzPass){ gzAuto=false; gzUserRadius=false; } // a genuine (user) town change clears prior auto state
    gzPass=false;
    if(!town.value){ note(null); return; }
    var vis=visibleCount();
    // Auto-broaden when a town has 0 or just 1 in-town match (and the user
    // hasn't manually set a radius). 0 → 15mi, lonely single → 10mi nearby.
    if(!gzUserRadius && !rad.value && vis<=1){
      gzReason=vis;
      rad.value=(vis===0?'15':'10'); gzAuto=true; gzPass=true;
      town.dispatchEvent(new Event('change'));
      return;
    }
    if(gzAuto && rad.value){
      var t=townLabel(town);
      if(gzReason===0){
        note('No listings right in '+t+' yet — showing options within '+rad.value+' miles.');
      } else if(vis>1){
        note('Just one listing in '+t+' — also showing nearby options within '+rad.value+' miles.');
      } else {
        note(null); // nothing nearby either; show the single result on its own
      }
    } else {
      note(null);
    }
  }
  function wireBroaden(){
    var town=document.getElementById('f-town');
    if(!town||town.__gzBroaden) return;
    town.__gzBroaden=true;
    town.addEventListener('change', function(){ setTimeout(deferred,0); });
  }

  /* ---- Distance sort: in-town first, then nearest towns outward ---- */
  var gzOrig=null; // original DOM order per parent, captured once
  function gzNearest(sel,townStr){
    var best=9999, toks=(townStr||'').split(/\s+/);
    for(var i=0;i<toks.length;i++){
      var tk=toks[i]; if(!tk) continue;
      var d=window.gzDist(sel,tk);
      if(d===null){ if(tk===sel) d=0; else continue; }
      if(d<best) best=d;
    }
    return best;
  }
  function gzHasTown(townStr,sel){
    return (townStr||'').split(/\s+/).indexOf(sel)>=0;
  }
  function doSort(){
    var town=document.getElementById('f-town'); if(!town) return;
    var cards=document.querySelectorAll('.center-card[data-town]');
    if(!cards.length) return;
    if(!gzOrig){ gzOrig=new Map(); cards.forEach(function(c){ var p=c.parentNode; if(!gzOrig.has(p)) gzOrig.set(p,[]); gzOrig.get(p).push(c); }); }
    var t=town.value;
    gzOrig.forEach(function(list,parent){
      var arr=list.slice();
      if(t){
        arr.sort(function(a,b){
          var va=a.style.display==='none', vb=b.style.display==='none';
          if(va!==vb) return va?1:-1;                 // hidden cards sink
          var ta=a.dataset.town||'', tb=b.dataset.town||'';
          var ina=gzHasTown(ta,t)?0:1, inb=gzHasTown(tb,t)?0:1;
          if(ina!==inb) return ina-inb;               // exact-town matches first
          var da=gzNearest(t,ta), db=gzNearest(t,tb);
          if(da!==db) return da-db;                   // then nearest outward
          return list.indexOf(a)-list.indexOf(b);     // stable
        });
      }
      arr.forEach(function(c){ parent.appendChild(c); });
    });
  }
  function wireSort(){
    var town=document.getElementById('f-town');
    if(!town||town.__gzSort) return;
    town.__gzSort=true;
    var box=town.closest('.filter-card')||town.closest('.filter-row')||document;
    box.addEventListener('change', function(){ setTimeout(doSort,0); });
    box.addEventListener('input', function(){ setTimeout(doSort,0); });
  }

  function start(){ inject(); wireBroaden(); wireSort(); setTimeout(deferred,80); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
