// Burger menu, scroll reveals, active nav
(function () {
  'use strict';

  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  // ─── Burger Menu Toggle ───
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
      const expanded = burger.classList.contains('open');
      burger.setAttribute('aria-expanded', expanded);
    });

    // Close menu when a nav link is clicked
    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── Scroll Reveal with IntersectionObserver ───
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    sections.forEach(function (section) {
      revealObserver.observe(section);
    });
  } else {
    // Fallback: show everything
    sections.forEach(function (section) {
      section.classList.add('visible');
    });
  }

  // ─── Active Nav Link on Scroll ───
  if ('IntersectionObserver' in window) {
    var activeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            allNavLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 48) + 'px 0px -40% 0px'
      }
    );

    sections.forEach(function (section) {
      activeObserver.observe(section);
    });
  }
})();
