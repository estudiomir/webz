/* Shared by the Webz demo sites: picks the language the visitor was using on estudiowebz.com and adds the "demo by Webz" tag. */
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('webz-lang'); } catch (e) {}
  var ok = function (v) { return v === 'es' || v === 'en'; };
  var lang = ok(q) ? q : ok(saved) ? saved : ((navigator.language || '').slice(0, 2) === 'es' ? 'es' : 'en');
  document.documentElement.lang = lang;
  window.DEMO_LANG = lang;
  window.demoT = function (en, es) { return lang === 'es' ? es : en; };

  window.demoI18n = function () {
    if (lang === 'es') {
      document.querySelectorAll('[data-es]').forEach(function (el) { el.innerHTML = el.getAttribute('data-es'); });
      document.querySelectorAll('[data-es-aria]').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute('data-es-aria')); });
      var t = document.querySelector('title[data-es-title]');
      if (t) document.title = t.getAttribute('data-es-title');
    }
    document.querySelectorAll('[data-setlang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-setlang') === lang));
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-setlang');
        if (next === lang) return;
        var u = new URL(location.href);
        u.searchParams.set('lang', next);
        location.href = u.toString();
      });
    });
    var tag = document.createElement('a');
    tag.className = 'webz-tag';
    tag.href = '../../?lang=' + lang + '#work';
    tag.innerHTML = '<span class="webz-tag-dot"></span><span>' + demoT('Demo site by <b>Webz</b>', 'Sitio demo de <b>Webz</b>') + '</span><span class="webz-tag-back">' + demoT('Back', 'Volver') + ' ↗</span>';
    document.body.appendChild(tag);
  };

  /* The header steps aside while the visitor scrolls down and comes back when they scroll up, so it never sits on top of the content. */
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var y = window.scrollY || 0;
    if (y <= 90) { nav.classList.remove('nav-away'); lastY = y; }
    else if (y > lastY + 6) { nav.classList.add('nav-away'); lastY = y; }
    else if (y < lastY - 6) { nav.classList.remove('nav-away'); lastY = y; }
  }, { passive: true });
})();
