var track = document.querySelector('.carousel-track');
var slides = document.querySelectorAll('.carousel-slide');
var dots = document.querySelectorAll('.carousel-dot');
var navLinks = document.querySelectorAll('.nav-links a');
var prevBtn = document.querySelector('.carousel-btn--prev');
var nextBtn = document.querySelector('.carousel-btn--next');
var total = slides.length;

var firstClone = slides[0].cloneNode(true);
var lastClone = slides[total - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

var currentSlide = 1;

track.style.transition = 'none';
track.style.transform = 'translateX(-100%)';
setTimeout(function() { track.style.transition = 'transform .5s ease-in-out'; }, 20);

function moveCarousel() {
  track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
  updateIndicators();
}

function updateIndicators() {
  var userIndex = currentSlide - 1;
  if (currentSlide === 0) userIndex = total - 1;
  if (currentSlide === total + 1) userIndex = 0;

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === userIndex);
    navLinks[i].classList.toggle('active', i === userIndex);
  }
}

track.addEventListener('transitionend', function() {
  if (currentSlide === 0) {
    track.style.transition = 'none';
    currentSlide = total;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
  } else if (currentSlide === total + 1) {
    track.style.transition = 'none';
    currentSlide = 1;
    track.style.transform = 'translateX(-100%)';
  }
  track.offsetHeight; // Force reflow
  track.style.transition = 'transform .5s ease-in-out';
});

nextBtn.addEventListener('click', function() { currentSlide++; moveCarousel(); });
prevBtn.addEventListener('click', function() { currentSlide--; moveCarousel(); });

for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', makeHandler(i));
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', makeHandler(i));
}

function makeHandler(index) {
  return function(e) {
    currentSlide = index + 1;
    if (e.target.tagName === 'A') e.preventDefault();
    moveCarousel();
  };
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') { currentSlide--; moveCarousel(); }
  if (e.key === 'ArrowRight') { currentSlide++; moveCarousel(); }
});

// --- MATRIX CANVAS (FIXED) ---
var canvas = document.getElementById('matrixCanvas');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var columns = [];
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
  
  var fontSize = 13;
  var charWidth = 22;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var colCount = Math.floor(canvas.width / charWidth);
    columns = [];
    for (var i = 0; i < colCount; i++) {
      // Keep initial offset reasonable (between 0 and -200px) so rain starts immediately
      columns[i] = Math.random() * -200; 
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var colCount = columns.length;

    for (var i = 0; i < colCount; i++) {
      var char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.9 ? 'rgba(180,255,180,0.9)' : 'rgba(0,255,65,0.35)';
      ctx.font = fontSize + 'px monospace';
      
      // Draw text directly at the pixel value stored in columns[i]
      ctx.fillText(char, i * charWidth, columns[i]);
      
      if (columns[i] > canvas.height && Math.random() > 0.98) {
        columns[i] = 0;
      }
      
      // Fixed falling speed calculation (adds roughly 8px to 16px per frame)
      columns[i] += (8 + Math.random() * 8);
    }
  }

  resizeCanvas();
  setInterval(draw, 50);
  window.addEventListener('resize', resizeCanvas);
}
