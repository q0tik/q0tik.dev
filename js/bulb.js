// Light bulb toggle — dark room mode
(function () {
  'use strict';

  var btn = document.getElementById('bulb-toggle');
  var img = document.getElementById('bulb-img');
  if (!btn || !img) return;

  var isOff = false;

  btn.addEventListener('click', function () {
    isOff = !isOff;
    document.body.classList.toggle('lights-off', isOff);
    img.src = isOff ? 'assets/bulb/bulb-off.png' : 'assets/bulb/bulb-on.png';
  });
})();
