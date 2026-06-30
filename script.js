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