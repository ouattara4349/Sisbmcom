document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.getElementById("nav-overlay");

  const isMobileLayout = () => window.matchMedia("(max-width: 900px)").matches;

  function setMenuOpen(open) {
    if (!navLinks || !hamburger) return;
    if (!isMobileLayout()) return;
    
    navLinks.classList.toggle("mobile-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    if (overlay) {
      overlay.classList.toggle("is-visible", open);
      overlay.setAttribute("aria-hidden", String(!open));
    }
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) {
      navLinks.querySelectorAll(".dropdown.dropdown-open").forEach((d) => {
        d.classList.remove("dropdown-open");
        const t = d.querySelector(".nav-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
  }

  if (navbar) {
    window.addEventListener(
      "scroll",
      () => navbar.classList.toggle("scrolled", window.scrollY > 8),
      { passive: true }
    );
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !navLinks.classList.contains("mobile-open");
      setMenuOpen(willOpen);
    });

    overlay?.addEventListener("click", () => setMenuOpen(false));

    document.addEventListener("click", (e) => {
      if (navbar && !navbar.contains(e.target) && overlay && !overlay.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    navLinks.querySelectorAll(":scope > li:not(.dropdown) > a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("mobile-open")) setMenuOpen(false);
      });
    });

    navLinks.querySelectorAll(".dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("mobile-open")) setMenuOpen(false);
      });
    });
  }

  document.querySelectorAll(".dropdown .nav-dropdown-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      if (!isMobileLayout() && !navLinks?.classList.contains("mobile-open")) return;
      e.preventDefault();
      const dropdown = trigger.closest(".dropdown");
      if (!dropdown || !navLinks) return;

      const open = !dropdown.classList.contains("dropdown-open");
      navLinks.querySelectorAll(".dropdown.dropdown-open").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("dropdown-open");
          const other = d.querySelector(".nav-dropdown-trigger");
          if (other) other.setAttribute("aria-expanded", "false");
        }
      });
      dropdown.classList.toggle("dropdown-open", open);
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobileLayout()) setMenuOpen(false);
  });
});