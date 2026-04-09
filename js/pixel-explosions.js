// Click anywhere to spawn pixel firework bursts
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var colors = ['#00ff88', '#ff0080', '#00bfff', '#ffcc00', '#fff'];
  var PARTICLE_COUNT = 12;

  document.addEventListener('click', function (e) {
    // Don't explode on interactive elements
    var tag = e.target.tagName;
    if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || e.target.closest('.terminal-overlay')) return;

    spawn(e.clientX, e.clientY);
  });

  function spawn(x, y) {
    var particles = [];

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      var el = document.createElement('div');
      el.style.cssText =
        'position:fixed;width:3px;height:3px;pointer-events:none;z-index:9997;' +
        'image-rendering:pixelated;background:' + colors[Math.floor(Math.random() * colors.length)] + ';';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      document.body.appendChild(el);

      var angle = (Math.PI * 2 / PARTICLE_COUNT) * i + (Math.random() - 0.5) * 0.5;
      var speed = 2 + Math.random() * 3;

      particles.push({
        el: el,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        gravity: 0.08
      });
    }

    function animate() {
      var alive = false;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.life <= 0) continue;

        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= p.decay;

        p.el.style.left = p.x + 'px';
        p.el.style.top = p.y + 'px';
        p.el.style.opacity = p.life;

        if (p.life <= 0) {
          p.el.remove();
        }
      }
      if (alive) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
})();
