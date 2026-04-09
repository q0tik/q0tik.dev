// Matrix rain effect — triggered from terminal command "matrix"
(function () {
  'use strict';

  var canvas, ctx, columns, drops;
  var isRunning = false;
  var animId;
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

  window.__startMatrix = function () {
    if (isRunning) return;
    isRunning = true;

    canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9996;pointer-events:none;opacity:0.7;';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');
    resize();

    var fontSize = 14;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = fontSize + 'px monospace';

      for (var i = 0; i < drops.length; i++) {
        var char = chars[Math.floor(Math.random() * chars.length)];
        var x = i * fontSize;
        var y = drops[i] * fontSize;

        ctx.fillStyle = drops[i] > 0 ? 'rgba(0, 255, 136, ' + (0.5 + Math.random() * 0.5) + ')' : 'transparent';
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    // Scramble all visible text on the page
    scrambleAll();

    // Stop after 4 seconds
    setTimeout(function () {
      cancelAnimationFrame(animId);
      canvas.style.transition = 'opacity 1s';
      canvas.style.opacity = '0';
      setTimeout(function () {
        canvas.remove();
        isRunning = false;
      }, 1000);
    }, 5000);
  };

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', function () {
    if (isRunning) resize();
  });

  var glyphs = '@#$%&*!?><{}[]|/\\~^+=_0123456789';

  function scrambleAll() {
    // Find all text-containing elements in main, footer
    var selectors = 'main p, main h2, main h3, .project-tag, .footer p, .skill-tag';
    var els = document.querySelectorAll(selectors);

    els.forEach(function (el) {
      // Skip elements with children that have their own text (avoid double-scramble)
      if (el.querySelector('span, a, img')) {
        scrambleTextNodes(el);
      } else {
        scrambleElement(el);
      }
    });
  }

  var SCRAMBLE_DURATION = 5000; // 5 seconds for everything

  function scrambleElement(el) {
    var original = el.textContent;
    if (!original.trim()) return;

    var length = original.length;
    // Calculate interval so all chars reveal in SCRAMBLE_DURATION
    var interval = Math.max(16, Math.floor(SCRAMBLE_DURATION / (length * 2)));
    var iterations = 0;
    var revealed = 0;

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

      if (iterations % 2 === 0) revealed++;

      if (revealed <= length) {
        setTimeout(step, interval);
      } else {
        el.textContent = original;
      }
    }

    step();
  }

  function scrambleTextNodes(el) {
    // Walk direct text node children only
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        scrambleTextNode(node);
      }
    }
  }

  function scrambleTextNode(node) {
    var original = node.textContent;
    var length = original.length;
    var interval = Math.max(16, Math.floor(SCRAMBLE_DURATION / (length * 2)));
    var iterations = 0;
    var revealed = 0;

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
      node.textContent = display;
      iterations++;

      if (iterations % 2 === 0) revealed++;

      if (revealed <= length) {
        setTimeout(step, interval);
      } else {
        node.textContent = original;
      }
    }

    step();
  }
})();
