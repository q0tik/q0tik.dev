// Hacker text scramble on section titles when they scroll into view
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var glyphs = '@#$%&*!?><{}[]|/\\~^+=_0123456789';
  var titles = document.querySelectorAll('.section-title');
  var scrambled = new Set();

  function scramble(el) {
    // Get only the text content (skip ::before and ::after pseudo content)
    var original = el.textContent.trim();
    if (!original || scrambled.has(el)) return;
    scrambled.add(el);

    var length = original.length;
    var iterations = 0;
    var revealed = 0;
    var frameDelay = 40; // ms between frames
    var revealEvery = 5; // reveal one char every N iterations

    function step() {
      var display = '';
      for (var i = 0; i < length; i++) {
        if (original[i] === ' ') {
          display += ' ';
        } else if (i < revealed) {
          display += original[i];
        } else {
          display += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      el.textContent = display;
      iterations++;

      if (iterations % revealEvery === 0) {
        revealed++;
      }

      if (revealed <= length) {
        setTimeout(step, frameDelay);
      } else {
        el.textContent = original;
      }
    }

    // Start with full scramble for a beat
    setTimeout(step, 200);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scramble(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    titles.forEach(function (title) {
      observer.observe(title);
    });
  }
})();
