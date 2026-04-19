(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var selectors = [
    "main > section",
    ".hero__titles > *",
    ".site-footer__main > *",
    ".gallery__item",
    ".info-card",
  ];

  function collect() {
    var seen = new Set();
    var out = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (seen.has(el)) return;
        seen.add(el);
        out.push(el);
      });
    });
    return out;
  }

  function setup() {
    var els = collect();
    if (reduce) {
      els.forEach(function (el) {
        el.classList.add("reveal", "is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -6% 0px",
        threshold: [0, 0.12, 0.25],
      }
    );

    els.forEach(function (el) {
      el.classList.add("reveal");
      if (el.classList.contains("gallery__item") && el.parentElement) {
        var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty("--reveal-i", String(Math.max(0, idx)));
      }
      io.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
