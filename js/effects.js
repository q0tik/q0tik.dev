// Extra visual effects
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // === Typewriter effect on About paragraph ===
  var aboutP = document.querySelector('#about p');
  if (aboutP) {
    var fullHTML = aboutP.innerHTML;
    var fullText = aboutP.textContent;
    aboutP.innerHTML = '';
    aboutP.style.visibility = 'visible';

    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        typewrite(aboutP, fullHTML);
      }
    }, { threshold: 0.3 });

    observer.observe(aboutP);
  }

  function typewrite(el, html) {
    // Parse HTML to extract text nodes and tags
    var chars = [];
    var inTag = false;
    var tagBuffer = '';

    for (var i = 0; i < html.length; i++) {
      if (html[i] === '<') {
        inTag = true;
        tagBuffer = '<';
      } else if (html[i] === '>' && inTag) {
        tagBuffer += '>';
        chars.push({ type: 'tag', value: tagBuffer });
        tagBuffer = '';
        inTag = false;
      } else if (inTag) {
        tagBuffer += html[i];
      } else {
        chars.push({ type: 'char', value: html[i] });
      }
    }

    var current = '';
    var idx = 0;

    function step() {
      if (idx >= chars.length) {
        el.innerHTML = html; // ensure final state is exact
        return;
      }

      var item = chars[idx];
      if (item.type === 'tag') {
        current += item.value;
        idx++;
        step(); // tags are instant
        return;
      }

      current += item.value;
      // Close any open tags for display
      el.innerHTML = current;
      idx++;
      setTimeout(step, 12 + Math.random() * 10);
    }

    step();
  }

  // === Mouse trail (pixel sparks) ===
  var trail = [];
  var MAX_TRAIL = 8;

  document.addEventListener('mousemove', function (e) {
    trail.push({
      x: e.clientX,
      y: e.clientY,
      life: 1,
      color: Math.random() > 0.5 ? '#00ff88' : '#ff0080'
    });

    if (trail.length > MAX_TRAIL) {
      var oldest = trail.shift();
      if (oldest.el) oldest.el.remove();
    }
  });

  function renderTrail() {
    for (var i = trail.length - 1; i >= 0; i--) {
      var t = trail[i];
      if (!t.el) {
        t.el = document.createElement('div');
        t.el.style.cssText = 'position:fixed;width:3px;height:3px;pointer-events:none;z-index:9997;image-rendering:pixelated;';
        document.body.appendChild(t.el);
      }

      t.life -= 0.04;
      t.el.style.left = t.x + 'px';
      t.el.style.top = t.y + 'px';
      t.el.style.background = t.color;
      t.el.style.opacity = t.life;

      if (t.life <= 0) {
        t.el.remove();
        trail.splice(i, 1);
      }
    }
    requestAnimationFrame(renderTrail);
  }

  renderTrail();
})();
