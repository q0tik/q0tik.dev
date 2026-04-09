// 3D rotating skill tag cloud
(function () {
  'use strict';

  var container = document.getElementById('skills-orbit');
  if (!container) return;

  var skills = [
    { name: 'Python', group: 'backend' },
    { name: 'FastAPI', group: 'backend' },
    { name: 'Django', group: 'backend' },
    { name: 'asyncio', group: 'backend' },
    { name: 'SQLAlchemy', group: 'backend' },
    { name: 'Celery', group: 'backend' },
    { name: 'Pydantic', group: 'backend' },
    { name: 'Pytest', group: 'backend' },
    { name: 'REST API', group: 'backend' },
    { name: 'pandas', group: 'data' },
    { name: 'NumPy', group: 'data' },
    { name: 'Claude API', group: 'data' },
    { name: 'LangChain', group: 'data' },
    { name: 'ClickHouse', group: 'data' },
    { name: 'RAG', group: 'data' },
    { name: 'PostgreSQL', group: 'infra' },
    { name: 'Redis', group: 'infra' },
    { name: 'Kafka', group: 'infra' },
    { name: 'Docker', group: 'infra' },
    { name: 'Kubernetes', group: 'infra' },
    { name: 'Nginx', group: 'infra' },
    { name: 'Prometheus', group: 'infra' },
    { name: 'Grafana', group: 'infra' },
    { name: 'CI/CD', group: 'infra' },
    { name: 'Linux', group: 'infra' },
    { name: 'Elasticsearch', group: 'infra' }
  ];

  var items = [];
  var radius;
  var angleX = 0;
  var angleY = 0;
  var targetAngleX = 0;
  var targetAngleY = 0;
  var isDragging = false;
  var lastX = 0;
  var lastY = 0;
  var autoSpeedX = 0.002;
  var autoSpeedY = 0.003;

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
    } else {
      angleX += (targetAngleX - angleX) * 0.1;
      angleY += (targetAngleY - angleY) * 0.1;
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
      autoSpeedX = 0.002;
      autoSpeedY = 0.003;
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
    e.preventDefault();
    var dx = e.touches[0].clientX - lastX;
    var dy = e.touches[0].clientY - lastY;
    angleY += dx * 0.005;
    angleX += dy * 0.005;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }, { passive: false });

  container.addEventListener('touchend', function () {
    isDragging = false;
    autoSpeedX = 0.002;
    autoSpeedY = 0.003;
  });

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    autoSpeedX = 0;
    autoSpeedY = 0;
  }

  init();
  render();
})();
