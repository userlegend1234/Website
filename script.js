/* ==========================================================
   OGURION – interactions (vanilla JS, no frameworks)
   ========================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: shadow + mobile nav ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function onScrollHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
  if ('IntersectionObserver' in window && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) sectionObserver.observe(target);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.section .grid-2 > *, .section-title, .card, .project, .member');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ==========================================================
     Exploded view
     ========================================================== */
  var product = document.querySelector('.product');
  var stage = document.querySelector('.explode-stage');
  var parts = stage ? Array.prototype.slice.call(stage.querySelectorAll('.part')) : [];
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));
  var progressBar = document.querySelector('.progress-bar');

  // Which parts are highlighted for each text step (index = step).
  var STEP_PARTS = [[], [0, 1], [2], [3, 4], [0, 1, 2, 3, 4]];

  var layout = null;   // cached geometry
  var currentStep = -1;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function smooth(e0, e1, x) {
    var t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function measure() {
    if (!stage || !parts.length) return;
    // reset width so CSS decides, then scale down if the stack is too tall
    parts.forEach(function (p) { p.style.width = ''; });
    var stageW = stage.clientWidth;
    var stageH = stage.clientHeight;
    var baseW = parts[0].offsetWidth;
    var heights = parts.map(function (p) { return p.offsetHeight; });
    var sumH = heights.reduce(function (a, b) { return a + b; }, 0);
    var n = parts.length;
    var minGap = 6;

    var scale = Math.min(1, (stageH * 0.96) / (sumH + minGap * (n - 1)));
    if (scale < 1) {
      parts.forEach(function (p) { p.style.width = (baseW * scale) + 'px'; });
      heights = heights.map(function (h) { return h * scale; });
      sumH *= scale;
    }
    var partW = baseW * scale;

    var gap = clamp((stageH * 0.96 - sumH) / (n - 1), minGap, 64);

    var assembled = [], exploded = [];
    var ya = 0, ye = 0;
    parts.forEach(function (p, i) {
      var overlap = (parseFloat(p.getAttribute('data-overlap')) || 0) * partW;
      if (i > 0) {
        ya += heights[i - 1] - overlap;
        ye += heights[i - 1] + gap;
      }
      assembled.push(ya);
      exploded.push(ye);
      p.style.zIndex = String(n - i);
    });

    layout = {
      x: Math.max(0, (stageW - partW) * 0.18),
      stageH: stageH,
      assembled: assembled,
      exploded: exploded,
      totalA: assembled[n - 1] + heights[n - 1],
      totalE: exploded[n - 1] + heights[n - 1]
    };
  }

  function renderProduct() {
    if (!product || !layout) return;

    var rect = product.getBoundingClientRect();
    var scrollable = product.offsetHeight - window.innerHeight;
    var t = clamp(-rect.top / scrollable, 0, 1);

    // 0 → assembled, 1 → fully exploded
    var e = reduceMotion ? 1 : smooth(0.04, 0.3, t);
    var total = layout.totalA + (layout.totalE - layout.totalA) * e;
    var offsetY = (layout.stageH - total) / 2;

    parts.forEach(function (p, i) {
      var y = layout.assembled[i] + (layout.exploded[i] - layout.assembled[i]) * e;
      p.style.transform = 'translate3d(' + layout.x + 'px,' + (offsetY + y) + 'px,0)';
      p.classList.toggle('labels-on', e > 0.65);
    });

    // text steps
    var step = Math.min(steps.length - 1, Math.floor(t * steps.length));
    if (step !== currentStep) {
      currentStep = step;
      steps.forEach(function (s, i) {
        s.classList.toggle('is-active', i === step);
        s.classList.toggle('is-past', i < step);
      });
      var highlight = STEP_PARTS[step] || [];
      parts.forEach(function (p, i) {
        p.classList.toggle('is-current', highlight.indexOf(i) !== -1 && step < steps.length - 1);
      });
    }

    if (progressBar) progressBar.style.transform = 'scaleX(' + t + ')';
  }

  // label x-position per part (where the visible object ends)
  parts.forEach(function (p) {
    var lx = p.getAttribute('data-label-x');
    var label = p.querySelector('.part-label');
    if (lx && label) label.style.left = (parseFloat(lx) * 100) + '%';
  });

  /* ---------- scroll loop ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollHeader();
      renderProduct();
      ticking = false;
    });
  }

  function onResize() {
    measure();
    renderProduct();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  // wait for images so heights are correct
  var imgs = stage ? stage.querySelectorAll('img') : [];
  var pending = imgs.length;
  function imgDone() { if (--pending <= 0) onResize(); }
  Array.prototype.forEach.call(imgs, function (img) {
    if (img.complete) imgDone();
    else { img.addEventListener('load', imgDone); img.addEventListener('error', imgDone); }
  });
  if (!imgs.length) onResize();
  onScrollHeader();

  /* ==========================================================
     Hero particles (light, decorative)
     ========================================================== */
  var canvas = document.querySelector('.hero-particles');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, dots = [], running = true;
    // brand colors from the CSS variables in styles.css
    var rootStyle = getComputedStyle(document.documentElement);
    function cssRgb(name, fallback) { return (rootStyle.getPropertyValue(name) || fallback).trim(); }
    var rgb = cssRgb('--accent-rgb', '1, 0, 76');
    var HIGHLIGHTS = [cssRgb('--pink-rgb', '254, 96, 189'), cssRgb('--cyan-rgb', '0, 255, 251')];
    function accent(a) { return 'rgba(' + rgb + ',' + a + ')'; }
    function rgba(c, a) { return 'rgba(' + c + ',' + a + ')'; }

    function sizeCanvas() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(clamp(W * H / 16000, 30, 110));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.15,
          vy: Math.random() * 0.25 + 0.05,
          hot: Math.random() < 0.12,
          hl: HIGHLIGHTS[i % 2],   // pink or cyan when crossing the beam
          glow: 0                  // 1 while in the beam, then fades out
        });
      }
    }

    // a diagonal "measurement beam": particles crossing it light up
    function beamY(x) { return H * 0.78 - x * 0.18; }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      var grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, accent(0));
      grad.addColorStop(0.5, accent(0.3));
      grad.addColorStop(1, accent(0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, beamY(0));
      ctx.lineTo(W, beamY(W));
      ctx.stroke();

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.y > H + 5) { d.y = -5; d.x = Math.random() * W; }
        if (d.x < -5) d.x = W + 5; else if (d.x > W + 5) d.x = -5;

        var near = Math.abs(d.y - beamY(d.x)) < 14;
        d.glow = near ? 1 : Math.max(0, d.glow - 0.006);

        // base particle
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.hot ? accent(0.6) : 'rgba(22,25,29,0.22)';
        ctx.fill();

        // detected particle: pink / cyan highlight with afterglow
        if (d.glow > 0) {
          var g = d.glow;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r + 9 * g, 0, Math.PI * 2);
          ctx.fillStyle = rgba(d.hl, 0.22 * g);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r + 1.6 * g, 0, Math.PI * 2);
          ctx.fillStyle = rgba(d.hl, g);
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = accent(0.55 * g);  // thin blue ring keeps cyan visible on white
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    if (reduceMotion) {
      draw();          // single static frame
      running = false;
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) { running = true; requestAnimationFrame(draw); }
        else if (!visible) running = false;
      }).observe(canvas);
      requestAnimationFrame(draw);
    } else {
      requestAnimationFrame(draw);
    }
  }

  /* ==========================================================
     Contact form (opens the visitor's mail client)
     ========================================================== */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var RECIPIENT = 'info@ogurion.com';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['name', 'email', 'message'].forEach(function (id) {
        var input = form.elements[id];
        var valid = input.value.trim() !== '' && (id !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
        input.parentElement.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      var privacy = form.elements.privacy;
      privacy.closest('.check').classList.toggle('invalid', !privacy.checked);
      if (!privacy.checked) ok = false;

      if (!ok) {
        status.className = 'form-status err';
        status.textContent = 'Please fill in all required fields.';
        return;
      }

      var f = form.elements;
      var subject = 'Website inquiry – ' + f.name.value.trim() + (f.company.value.trim() ? ' (' + f.company.value.trim() + ')' : '');
      var body = f.message.value.trim() + '\n\n—\n' + f.name.value.trim() + '\n' + f.email.value.trim() +
        (f.company.value.trim() ? '\n' + f.company.value.trim() : '');
      window.location.href = 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      status.className = 'form-status ok';
      status.textContent = 'Thank you! Your e-mail program has been opened to send the message.';
      form.reset();
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field, .check');
      if (field) field.classList.remove('invalid');
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
