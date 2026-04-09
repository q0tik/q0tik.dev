// Konami Code easter egg: ↑↑↓↓←→←→BA
(function () {
  'use strict';

  var sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  // ArrowUp=38, ArrowDown=40, ArrowLeft=37, ArrowRight=39, B=66, A=65
  var pos = 0;
  var active = false;

  document.addEventListener('keydown', function (e) {
    if (active) return;

    var code = e.keyCode || e.which;

    if (code === sequence[pos]) {
      pos++;
      if (pos === sequence.length) {
        pos = 0;
        activate();
      }
    } else {
      pos = 0;
    }
  });

  function activate() {
    if (active) return;
    active = true;

    document.body.classList.add('overdrive');

    var msg = document.createElement('div');
    msg.className = 'konami-msg';
    msg.textContent = 'SYSTEM OVERLOAD';
    document.body.appendChild(msg);

    setTimeout(function () {
      document.body.classList.remove('overdrive');
      msg.remove();
      active = false;
    }, 3500);
  }
})();
