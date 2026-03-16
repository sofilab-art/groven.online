/* ═══════════════════════════════════════════════
   GROVEN · MAIN.JS
   Static Canvas Hero + Page Interactions
   ═══════════════════════════════════════════════ */

'use strict';

// ── NAV SCROLL STATE ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ══════════════════════════════════════════════════════════════════
// HERO CANVAS — Animated Node Graph
// ══════════════════════════════════════════════════════════════════

(function initHeroCanvas() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var nodes = [];
  var edges = [];
  var w, h;
  var dpr = window.devicePixelRatio || 1;
  var animId;

  // Node types with colors
  var TYPES = [
    { color: 'rgba(116,198,157,0.6)', radius: 3 },   // mint / seed
    { color: 'rgba(64,145,108,0.5)',  radius: 4 },    // forest / branch
    { color: 'rgba(45,106,79,0.4)',   radius: 5 },    // deep green / leaf
    { color: 'rgba(212,163,115,0.35)', radius: 3.5 }, // warm / experience
    { color: 'rgba(59,130,246,0.3)',  radius: 3 }     // blue / question
  ];

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = [];
    edges = [];
    var count = Math.min(Math.floor((w * h) / 8000), 120);

    for (var i = 0; i < count; i++) {
      var type = TYPES[Math.floor(Math.random() * TYPES.length)];
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: type.radius + Math.random() * 2,
        color: type.color,
        baseAlpha: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Create edges between nearby nodes
    for (var a = 0; a < nodes.length; a++) {
      var connections = 0;
      for (var b = a + 1; b < nodes.length; b++) {
        if (connections >= 2) break;
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && Math.random() < 0.4) {
          edges.push({ a: a, b: b });
          connections++;
        }
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    var t = time * 0.001;

    // Draw edges
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      var na = nodes[e.a];
      var nb = nodes[e.b];
      var dx = na.x - nb.x;
      var dy = na.y - nb.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var alpha = Math.max(0, 1 - dist / 180) * 0.12;

      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = 'rgba(116,198,157,' + alpha + ')';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Draw and update nodes
    for (var j = 0; j < nodes.length; j++) {
      var n = nodes[j];

      // Slow drift
      n.x += n.vx;
      n.y += n.vy;

      // Wrap around edges
      if (n.x < -10) n.x = w + 10;
      if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10;
      if (n.y > h + 10) n.y = -10;

      // Pulse
      var pulse = Math.sin(t + n.phase) * 0.15 + 0.85;
      var r = n.r * pulse;

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2);
      var grad = ctx.createRadialGradient(n.x, n.y, r * 0.5, n.x, n.y, r * 2.5);
      grad.addColorStop(0, n.color.replace(/[\d.]+\)$/, (n.baseAlpha * 0.15) + ')'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createNodes();
    animId = requestAnimationFrame(draw);
  }

  // Pause when hero is not visible
  var heroSection = document.getElementById('hero');
  var heroObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      if (!animId) animId = requestAnimationFrame(draw);
    } else {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }
  }, { threshold: 0.05 });
  heroObserver.observe(heroSection);

  window.addEventListener('resize', function() {
    resize();
    createNodes();
  });

  init();
})();
