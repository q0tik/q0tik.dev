// Fake terminal overlay — press ` to toggle
(function () {
  'use strict';

  var overlay, input, output, isOpen = false;

  var commands = {
    help: function () {
      return [
        'Available commands:',
        '  help        — this message',
        '  whoami      — about me',
        '  skills      — tech stack',
        '  projects    — my projects',
        '  contacts    — how to reach me',
        '  matrix      — enter the matrix',
        '  clear       — clear terminal',
        '  sudo rm -rf / — do it, I dare you',
        '  exit        — close terminal'
      ].join('\n');
    },
    whoami: function () {
      return 'q0tik — backend engineer, 6+ years.\nFintech, crypto, quant trading.\nBuilding high-load systems by day,\npixel art games by night.';
    },
    skills: function () {
      return [
        '[backend]  Python, FastAPI, Django, asyncio, Celery',
        '[data/ai]  pandas, NumPy, Claude API, LangChain',
        '[infra]    PostgreSQL, Redis, Kafka, Docker, K8s'
      ].join('\n');
    },
    projects: function () {
      return [
        'Voidreign — pixel-art MMORPG [WIP]',
        'Finansoid — Telegram mini-app for budgeting'
      ].join('\n');
    },
    contacts: function () {
      return 'GitHub:   github.com/q0tik\nTelegram: q0tik.t.me';
    },
    matrix: function () {
      if (window.__startMatrix) {
        window.__startMatrix();
        return 'Wake up, Neo...';
      }
      return 'Matrix module not loaded.';
    },
    clear: function () {
      output.innerHTML = '';
      return '';
    },
    exit: function () {
      toggle();
      return '';
    },
    'sudo rm -rf /': function () {
      printLine('Deleting system files...');
      var bar = document.createElement('div');
      bar.className = 'terminal-line';
      bar.textContent = '';
      output.appendChild(bar);

      var progress = 0;
      var full = 20;
      var interval = setInterval(function () {
        progress++;
        var filled = '';
        for (var i = 0; i < progress; i++) filled += '█';
        for (var j = progress; j < full; j++) filled += '░';
        bar.textContent = filled + ' ' + (progress * 5) + '%';
        output.scrollTop = output.scrollHeight;

        if (progress >= full) {
          clearInterval(interval);
          printLine('');
          printLine('Just kidding. Nice try though.');
          output.scrollTop = output.scrollHeight;
        }
      }, 120);

      return '';
    }
  };

  function create() {
    overlay = document.createElement('div');
    overlay.className = 'terminal-overlay';
    overlay.innerHTML =
      '<div class="terminal-window">' +
        '<div class="terminal-header">q0tik@dev ~ <span class="terminal-close">[x]</span></div>' +
        '<div class="terminal-output"></div>' +
        '<div class="terminal-input-line">' +
          '<span class="terminal-prompt">$&nbsp;</span>' +
          '<input type="text" class="terminal-input" spellcheck="false" autocomplete="off">' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    output = overlay.querySelector('.terminal-output');
    input = overlay.querySelector('.terminal-input');

    printLine('Type "help" for available commands.\n');

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var cmd = input.value.trim();
        if (!cmd) return;
        printLine('$ ' + cmd);
        input.value = '';

        var handler = commands[cmd] || commands[cmd.toLowerCase()];
        if (handler) {
          var result = handler();
          if (result) printLine(result);
        } else {
          printLine('command not found: ' + cmd);
        }

        output.scrollTop = output.scrollHeight;
      }
      if (e.key === 'Escape') {
        toggle();
      }
    });

    overlay.querySelector('.terminal-close').addEventListener('click', toggle);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) toggle();
    });
  }

  function printLine(text) {
    var line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    output.appendChild(line);
  }

  function toggle() {
    if (!overlay) create();
    isOpen = !isOpen;
    overlay.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      // Prevent iOS zoom on focus
      var viewport = document.querySelector('meta[name=viewport]');
      if (viewport) viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
      input.focus();
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
      var tag = document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (!isOpen) return;
      }
      e.preventDefault();
      toggle();
    }
  });

  // Terminal button on navbar (for mobile)
  var termBtn = document.getElementById('terminal-btn');
  if (termBtn) {
    termBtn.addEventListener('click', function () {
      toggle();
    });
  }
})();
