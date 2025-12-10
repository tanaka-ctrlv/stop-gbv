// script.js

document.addEventListener("DOMContentLoaded", function () {
  // If user prefers reduced motion, skip animations
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Just add in-view immediately
    document.querySelectorAll(".card, .timeline-year h2").forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }

  // Create an IntersectionObserver to watch cards + headings
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

  // Observe each card and each year heading
  const itemsToObserve = document.querySelectorAll(".card, .timeline-year h2");

  itemsToObserve.forEach(function (item) {
    observer.observe(item);
  });
});
