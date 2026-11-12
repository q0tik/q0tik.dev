// Scroll reveals for sections
(function () {
  'use strict';

  var sections = document.querySelectorAll('.section');

  // ─── Scroll Reveal with IntersectionObserver ───
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    sections.forEach(function (section) {
      revealObserver.observe(section);
    });
  } else {
    // Fallback: show everything
    sections.forEach(function (section) {
      section.classList.add('visible');
    });
  }
})();
