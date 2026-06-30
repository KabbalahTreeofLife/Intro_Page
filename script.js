(function() {
  var loadEl = document.getElementById('load');
  setTimeout(function() {
    loadEl.style.transition = 'opacity 1s ease';
    loadEl.style.opacity = '0';
    setTimeout(function() {
      loadEl.style.display = 'none';
    }, 1000);
  }, 3500);
})();

(function() {
  var track = document.querySelector('.carousel-track');
  var slides = document.querySelectorAll('.carousel-slide');
  var dots = document.querySelectorAll('.carousel-dot');
  var navLinks = document.querySelectorAll('.nav-links a');
  var prevBtn = document.querySelector('.carousel-btn--prev');
  var nextBtn = document.querySelector('.carousel-btn--next');
  var currentIndex = 0;
  var total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';

    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === index);
    });

    navLinks.forEach(function(link, i) {
      link.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { goTo(i); });
  });

  navLinks.forEach(function(link, i) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      goTo(i);
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });
})();

(function() {
  var canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var width, height, columns, drops;
  var startTime = Date.now();
  var introDuration = 4000;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / 22);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -120);
    }
  }

  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

  function draw() {
    var elapsed = Date.now() - startTime;
    var t = Math.min(elapsed / introDuration, 1);
    var ease = 1 - Math.pow(1 - t, 3);

    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, width, height);

    var speed = 0.15 + ease * 0.65;

    for (var i = 0; i < columns; i++) {
      if (i / columns > ease) continue;
      var char = chars[Math.floor(Math.random() * chars.length)];
      var bright = Math.random();
      var alpha = 0.15 + ease * 0.25;
      ctx.fillStyle = bright > 0.9 ? 'rgba(180,255,180,0.9)' : 'rgba(0,255,65,' + alpha + ')';
      ctx.font = '13px monospace';
      ctx.fillText(char, i * 22, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i] += (0.3 + Math.random() * 0.4) * speed;
    }

    setTimeout(draw, 40);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();