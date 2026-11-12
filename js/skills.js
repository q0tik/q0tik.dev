// 3D rotating skill tag cloud
(function () {
  'use strict';

  var container = document.getElementById('skills-orbit');
  if (!container) return;

  var skills = [
    { name: 'Claude Code', group: 'ai' },
    { name: 'Harness Engineering', group: 'ai' },
    { name: 'Python', group: 'data' },
    { name: 'Docker', group: 'infra' },
    { name: 'Claude API', group: 'ai' },
    { name: 'Go', group: 'data' },
    { name: 'Kubernetes', group: 'infra' },
    { name: 'MCP', group: 'ai' },
    { name: 'FastAPI', group: 'data' },
    { name: 'Nomad', group: 'infra' },
    { name: 'LangGraph', group: 'ai' },
    { name: 'asyncio', group: 'data' },
    { name: 'Vault', group: 'infra' },
    { name: 'LangChain', group: 'ai' },
    { name: 'gRPC', group: 'data' },
    { name: 'GitLab CI', group: 'infra' },
    { name: 'OpenAI API', group: 'ai' },
    { name: 'WebSocket', group: 'data' },
    { name: 'GitHub Actions', group: 'infra' },
    { name: 'OpenRouter', group: 'ai' },
    { name: 'PostgreSQL', group: 'data' },
    { name: 'Prometheus', group: 'infra' },
    { name: 'RAG', group: 'ai' },
    { name: 'Evals', group: 'ai' },
    { name: 'ClickHouse', group: 'data' },
    { name: 'Grafana', group: 'infra' },
    { name: 'pgvector', group: 'ai' },
    { name: 'Redis', group: 'data' },
    { name: 'Linux', group: 'infra' },
    { name: 'Kafka', group: 'data' },
    { name: 'AWS', group: 'infra' },
    { name: 'pandas', group: 'data' }
  ];

  var items = [];
  var radius;
  var angleX = 0;
  var angleY = 0;
  var isDragging = false;
  var lastX = 0;
  var lastY = 0;
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var BASE_X = REDUCED ? 0 : 0.002;
  var BASE_Y = REDUCED ? 0 : 0.003;
  var autoSpeedX = BASE_X;
  var autoSpeedY = BASE_Y;

  // Fibonacci sphere distribution
  function distributeOnSphere(count) {
    var points = [];
    var phi = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < count; i++) {
      var y = 1 - (i / (count - 1)) * 2;
      var radiusAtY = Math.sqrt(1 - y * y);
      var theta = phi * i;
      points.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY
      });
    }
    return points;
  }

  function init() {
    radius = Math.min(container.offsetWidth / 2.5, 200);
    var points = distributeOnSphere(skills.length);

    for (var i = 0; i < skills.length; i++) {
      var el = document.createElement('span');
      el.className = 'skill-tag';
      el.setAttribute('data-group', skills[i].group);
      el.textContent = skills[i].name;
      container.appendChild(el);

      items.push({
        el: el,
        origX: points[i].x,
        origY: points[i].y,
        origZ: points[i].z,
        x: 0, y: 0, z: 0
      });
    }
  }

  function rotatePoint(px, py, pz) {
    // Rotate around Y axis
    var cosY = Math.cos(angleY);
    var sinY = Math.sin(angleY);
    var x1 = px * cosY - pz * sinY;
    var z1 = px * sinY + pz * cosY;

    // Rotate around X axis
    var cosX = Math.cos(angleX);
    var sinX = Math.sin(angleX);
    var y1 = py * cosX - z1 * sinX;
    var z2 = py * sinX + z1 * cosX;

    return { x: x1, y: y1, z: z2 };
  }

  function render() {
    var cx = container.offsetWidth / 2;
    var cy = container.offsetHeight / 2;

    if (!isDragging) {
      angleX += autoSpeedX;
      angleY += autoSpeedY;
    }

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var pos = rotatePoint(item.origX, item.origY, item.origZ);

      var scale = (pos.z + 1.5) / 2.5; // 0.2 to 1.0
      var x = pos.x * radius + cx;
      var y = pos.y * radius + cy;

      item.el.style.left = x + 'px';
      item.el.style.top = y + 'px';
      item.el.style.fontSize = (7 + scale * 5) + 'px';
      item.el.style.opacity = (0.2 + scale * 0.8).toFixed(2);
      item.el.style.zIndex = Math.round(scale * 100);
      item.el.style.transform = 'translate(-50%, -50%)';
    }

    requestAnimationFrame(render);
  }

  // Mouse drag
  container.addEventListener('mousedown', function (e) {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    autoSpeedX = 0;
    autoSpeedY = 0;
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    angleY += dx * 0.005;
    angleX += dy * 0.005;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  window.addEventListener('mouseup', function () {
    if (isDragging) {
      isDragging = false;
      autoSpeedX = BASE_X;
      autoSpeedY = BASE_Y;
    }
  });

  // Touch drag
  container.addEventListener('touchstart', function (e) {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    autoSpeedX = 0;
    autoSpeedY = 0;
  }, { passive: true });

  container.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    var dx = e.touches[0].clientX - lastX;
    angleY += dx * 0.005;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', function () {
    isDragging = false;
    autoSpeedX = BASE_X;
    autoSpeedY = BASE_Y;
  });


  window.addEventListener('resize', function () {
    radius = Math.min(container.offsetWidth / 2.5, 200);
  });

  init();
  render();
})();
