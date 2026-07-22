/* =====================================================================
   Oncle Libom — site behaviour
   - Bilingual EN | FR in-page toggle (data-en / data-fr)
   - Light / dark theme (persisted in memory for the session)
   - Mobile menu, devotional language tabs, share helpers, reveal on scroll
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- state (in-memory; no browser storage) ---------- */
  var state = {
    lang: (navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en",
    theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  };

  /* ---------- language ---------- */
  function applyLang(lang) {
    state.lang = lang;
    document.documentElement.setAttribute("lang", lang);

    // Elements carrying both languages as data attributes
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val === null) return;
      // Preserve child markup when the attribute contains HTML entities/tags
      if (el.hasAttribute("data-html")) { el.innerHTML = val; }
      else { el.textContent = val; }
    });

    // Attribute translations, e.g. data-en-placeholder / data-fr-placeholder
    document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute("data-" + lang + "-placeholder") || "");
    });
    document.querySelectorAll("[data-en-aria]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-" + lang + "-aria") || "");
    });

    // Blocks that show only in one language (e.g. devotional body)
    document.querySelectorAll("[data-lang-only]").forEach(function (el) {
      el.classList.toggle("hide", el.getAttribute("data-lang-only") !== lang);
    });

    // Update switch buttons
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang);
    });

    // Update <title> and meta description if bilingual versions provided
    var t = document.querySelector('title[data-' + lang + ']');
    if (t) document.title = t.getAttribute("data-" + lang);
  }

  /* ---------- theme ---------- */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
  }

  /* ---------- init on DOM ready ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(state.theme);
    applyLang(state.lang);

    // Language switch
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });

    // Theme toggle
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(state.theme === "dark" ? "light" : "dark");
      });
    });

    // Mobile menu
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open);
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); });
      });
    }

    // Devotional language tabs (independent of global language)
    document.querySelectorAll("[data-dev-tabs]").forEach(function (group) {
      var buttons = group.querySelectorAll(".dev-tabs button");
      buttons.forEach(function (b) {
        b.addEventListener("click", function () {
          var lang = b.getAttribute("data-lang");
          buttons.forEach(function (x) { x.classList.toggle("active", x === b); });
          group.querySelectorAll("[data-dev-lang]").forEach(function (panel) {
            panel.classList.toggle("hide", panel.getAttribute("data-dev-lang") !== lang);
          });
        });
      });
    });

    // Share buttons
    document.querySelectorAll("[data-share]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var url = window.location.href;
        var title = btn.getAttribute("data-share-title") || document.title;
        var type = btn.getAttribute("data-share");
        if (type === "whatsapp") {
          window.open("https://wa.me/?text=" + encodeURIComponent(title + " — " + url), "_blank");
        } else if (type === "facebook") {
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank");
        } else if (type === "x") {
          window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url), "_blank");
        } else if (type === "copy" && navigator.clipboard) {
          navigator.clipboard.writeText(url).then(function () {
            var old = btn.getAttribute("aria-label");
            btn.setAttribute("aria-label", state.lang === "fr" ? "Lien copié" : "Link copied");
            setTimeout(function () { btn.setAttribute("aria-label", old); }, 1500);
          });
        } else if (navigator.share) {
          navigator.share({ title: title, url: url });
        }
      });
    });

    // Forms — front-end only, show a friendly confirmation
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.querySelector("[data-form-msg]");
        if (msg) { msg.classList.remove("hide"); }
        form.reset();
      });
    });

    // Reveal on scroll
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    // Footer year
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
