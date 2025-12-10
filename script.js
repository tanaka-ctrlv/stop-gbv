// script.js

document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ---------- INTRO OVERLAY ----------

  const overlay = document.getElementById("intro-overlay");

  if (overlay) {
    if (prefersReducedMotion) {
      // Skip intro animations for users who prefer reduced motion
      overlay.remove();
    } else {
      document.body.classList.add("no-scroll");

      // Show "NO to VAW" after scattered words
      setTimeout(function () {
        overlay.classList.add("show-final");
      }, 2600); // ~2.6s

      // Slide overlay away
      setTimeout(function () {
        overlay.classList.add("slide-out");
      }, 4200); // ~4.2s

      // Remove overlay once slide-out finishes
      overlay.addEventListener("transitionend", function () {
        if (overlay.classList.contains("slide-out")) {
          overlay.remove();
          document.body.classList.remove("no-scroll");
        }
      });
    }
  }

  // ---------- SCROLL-IN ANIMATION (cards + year headings) ----------

  const itemsToObserve = document.querySelectorAll(".card, .timeline-year h2");

  if (prefersReducedMotion) {
    // If reduced motion, just show everything immediately
    itemsToObserve.forEach(function (el) {
      el.classList.add("in-view");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Stop observing once it's visible
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2 // 20% of element needs to be visible
      }
    );

    itemsToObserve.forEach(function (item) {
      observer.observe(item);
    });
  }

  // ---------- BACK TO TOP BUTTON ----------

  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
