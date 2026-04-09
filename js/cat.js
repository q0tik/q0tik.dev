// Gray cat — sitting idle on the right
(function () {
  'use strict';

  var container = document.getElementById('cat');
  if (!container) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sprite = document.createElement('div');
  sprite.className = 'cat-sprite idle';
  sprite.setAttribute('aria-hidden', 'true');
  container.appendChild(sprite);
})();

// Tricolor cat — lying on the bar, paw swinging
(function () {
  'use strict';

  var container = document.getElementById('cat-lying');
  if (!container) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sprite = document.createElement('div');
  sprite.className = 'cat-lying-sprite paw-swing';
  sprite.setAttribute('aria-hidden', 'true');
  container.appendChild(sprite);
})();
