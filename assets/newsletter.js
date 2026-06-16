/*! GOkidOZ — newsletter wiring → MailerLite.
 * Takes over every <form name="newsletter"> (homepage hero box + footer box on
 * all pages), posts the email to MailerLite, and shows the success message.
 * Keeps the site's own styling; replaces the old Netlify wiring. */
(function(){
  'use strict';
  var ENDPOINT = 'https://assets.mailerlite.com/jsonp/2400552/forms/189395281204216945/subscribe';

  function showSuccess(form){
    var fields = form.querySelector('.nl-fields'), succ = form.querySelector('.nl-success');
    var fnrow  = form.querySelector('.fn-row'),    fnok = form.querySelector('.fn-ok');
    if (fields && succ){ fields.style.display = 'none'; succ.style.display = 'block'; }
    if (fnrow && fnok){ fnrow.style.display = 'none'; fnok.style.display = 'block'; }
    if (!succ && !fnok){
      // generic fallback: replace the form's inner controls with a thank-you line
      form.innerHTML = '<div style="width:100%;padding:11px;background:var(--teal-l,#d8f3ec);color:var(--teal,#0a7d63);border-radius:10px;font-weight:700;font-size:14px;text-align:center;">🎉 You\u2019re on the list!</div>';
    }
  }

  function wire(form){
    if (form.__mlWired) return;
    form.__mlWired = true;
    // strip the old Netlify wiring so it doesn't fire
    form.removeAttribute('onsubmit');
    form.onsubmit = null;
    form.setAttribute('action', ENDPOINT);
    form.setAttribute('method', 'post');

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? (input.value || '').trim() : '';
      if (!email){ if (input) input.focus(); return; }

      // Tag where the signup came from (homepage hero box vs site footer).
      var source = form.closest('.foot-news') ? 'footer'
                 : (form.querySelector('.nl-fields') ? 'homepage-hero' : 'footer');
      var body = 'fields[email]=' + encodeURIComponent(email)
               + '&fields[signup_source]=' + encodeURIComponent(source)
               + '&ml-submit=1&anticsrf=true';
      // no-cors: the subscribe still registers; response is opaque (we can't read it,
      // so we optimistically show success either way).
      fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function(){ showSuccess(form); })
        .catch(function(){ showSuccess(form); });
    });
  }

  function init(){
    var forms = document.querySelectorAll('form[name="newsletter"]');
    for (var i = 0; i < forms.length; i++) wire(forms[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
