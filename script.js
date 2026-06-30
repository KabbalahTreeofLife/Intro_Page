(function() {
  var loadEl = document.getElementById('load');
  var loadNo = loadEl.querySelector('#load-no div');
  var pct = 0;
  var interval = setInterval(function() {
    pct += Math.floor(Math.random() * 12) + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      loadNo.textContent = '100%';
      setTimeout(function() {
        loadEl.style.transition = 'opacity .6s ease';
        loadEl.style.opacity = '0';
        setTimeout(function() {
          loadEl.style.display = 'none';
        }, 600);
      }, 400);
      return;
    }
    loadNo.textContent = pct + '%';
  }, 120);
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
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < drops.length; i++) {
      var char = chars[Math.floor(Math.random() * chars.length)];
      var bright = Math.random();
      ctx.fillStyle = bright > 0.9 ? 'rgba(180,255,180,0.9)' : 'rgba(0,255,65,0.35)';
      ctx.font = '13px monospace';
      ctx.fillText(char, i * 22, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i] += 0.4 + Math.random() * 0.4;
    }
  }

  resize();
  setInterval(draw, 50);
  window.addEventListener('resize', resize);
})();