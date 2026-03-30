// Cat sprite animation state machine
(function () {
  'use strict';

  var container = document.getElementById('cat');
  if (!container) return;

  // Create the sprite element
  var sprite = document.createElement('div');
  sprite.className = 'cat-sprite idle';
  sprite.setAttribute('aria-hidden', 'true');
  container.appendChild(sprite);

  // ─── State Machine ───
  var currentState = 'idle';
  var locked = false;

  // Animation durations in ms (must match CSS)
  var durations = {
    blink: 300,
    'head-turn': 800,
    groom: 1200
  };

  // Random intervals for each action [min, max] in ms
  var intervals = {
    blink: [3000, 6000],
    'head-turn': [8000, 15000],
    groom: [15000, 30000]
  };

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function playAction(action) {
    if (locked) return;
    locked = true;
    currentState = action;

    sprite.className = 'cat-sprite ' + action;

    // When animation finishes, return to idle
    setTimeout(function () {
      sprite.className = 'cat-sprite idle';
      currentState = 'idle';
      locked = false;
    }, durations[action]);
  }

  // Schedule recurring random actions
  function scheduleAction(action) {
    var range = intervals[action];
    var delay = randomBetween(range[0], range[1]);

    setTimeout(function () {
      if (!locked) {
        playAction(action);
      }
      scheduleAction(action);
    }, delay);
  }

  // Start all schedulers
  scheduleAction('blink');
  scheduleAction('head-turn');
  scheduleAction('groom');

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sprite.className = 'cat-sprite';
    sprite.style.backgroundPosition = '0 0';
  }
})();
