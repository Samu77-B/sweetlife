(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const backdrop = document.getElementById("nav-backdrop");
  const links = document.getElementById("primary-navigation");

  if (!nav || !toggle || !backdrop || !links) return;

  const mq = window.matchMedia("(max-width: 880px)");

  function setOpen(open) {
    nav.classList.toggle("site-nav--open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    backdrop.hidden = !open;
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("site-nav-open", open);
  }

  function close() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    const next = !nav.classList.contains("site-nav--open");
    setOpen(next);
  });

  backdrop.addEventListener("click", close);

  links.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      if (mq.matches) close();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("site-nav--open")) {
      close();
      toggle.focus();
    }
  });

  mq.addEventListener("change", function (e) {
    if (!e.matches) close();
  });

  var footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
})();
