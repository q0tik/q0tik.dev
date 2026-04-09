// Space horse flying across the background in random directions
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var horse = document.createElement('div');
  horse.className = 'space-horse east';
  horse.setAttribute('aria-hidden', 'true');
  document.body.appendChild(horse);

  var isMoving = false;

  function fly() {
    if (isMoving) return;
    isMoving = true;

    var vh = window.innerHeight;
    var vw = window.innerWidth;

    // Random angle (radians) for trajectory
    var angle = Math.random() * Math.PI * 2;

    // Start point: off-screen in the opposite direction of angle
    // We place the start far enough outside the viewport
    var cx = vw / 2;
    var cy = vh / 2;
    var diag = Math.sqrt(vw * vw + vh * vh) / 2 + 150;

    var startX = cx - Math.cos(angle) * diag;
    var startY = cy - Math.sin(angle) * diag;
    var endX = cx + Math.cos(angle) * diag;
    var endY = cy + Math.sin(angle) * diag;

    // Pick spritesheet based on horizontal direction
    var goRight = endX > startX;
    horse.className = 'space-horse ' + (goRight ? 'east' : 'west');

    horse.style.left = startX + 'px';
    horse.style.top = startY + 'px';
    horse.style.display = 'block';

    // Random rotation: slow spin CW or CCW
    var rotSpeed = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 25); // deg/sec
    var duration = 10000 + Math.random() * 8000;
    var startTime = performance.now();

    function step(now) {
      var elapsed = now - startTime;
      var progress = elapsed / duration;

      if (progress >= 1) {
        horse.style.display = 'none';
        isMoving = false;
        setTimeout(fly, 4000 + Math.random() * 12000);
        return;
      }

      var x = startX + (endX - startX) * progress;
      var y = startY + (endY - startY) * progress;
      var rot = (elapsed / 1000) * rotSpeed;

      horse.style.left = x + 'px';
      horse.style.top = y + 'px';
      horse.style.transform = 'translate(-50%, -50%) rotate(' + rot + 'deg)';

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  setTimeout(fly, 2000 + Math.random() * 4000);
})();
