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
var currentUser = 0;

track.style.transition = 'none';
track.style.transform = 'translateX(-100%)';
setTimeout(function() {
  track.style.transition = 'transform .5s ease-in-out';
}, 20);

function updateDotsAndNav() {
  for (var i = 0; i < dots.length; i++) {
    if (i === currentUser) {
      dots[i].classList.add('active');
      navLinks[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
      navLinks[i].classList.remove('active');
    }
  }
}

function snapTo(index) {
  track.style.transition = 'none';
  currentSlide = index;
  track.style.transform = 'translateX(-' + (index * 100) + '%)';
  setTimeout(function() {
    track.style.transition = 'transform .5s ease-in-out';
  }, 20);
}

function goTo(newIndex) {
  if (newIndex < 0) {
    newIndex = total - 1;
  }
  if (newIndex >= total) {
    newIndex = 0;
  }
  if (newIndex === currentUser) {
    return;
  }

  var prev = currentUser;
  currentUser = newIndex;
  updateDotsAndNav();

  var goingForward;
  if (prev === total - 1 && newIndex === 0) {
    goingForward = true;
  } else if (prev === 0 && newIndex === total - 1) {
    goingForward = false;
  } else {
    goingForward = newIndex > prev;
  }

  if (goingForward) {
    if (prev === total - 1 && newIndex === 0) {
      currentSlide = total + 1;
    } else {
      currentSlide = currentUser + 1;
    }
  } else {
    if (prev === 0 && newIndex === total - 1) {
      currentSlide = 0;
    } else {
      currentSlide = currentUser + 1;
    }
  }

  track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
}

track.addEventListener('transitionend', function(e) {
  if (e.propertyName !== 'transform') return;
  if (currentSlide === 0) {
    snapTo(total);
  } else if (currentSlide === total + 1) {
    snapTo(1);
  }
});

prevBtn.addEventListener('click', function() { goTo(currentUser - 1); });
nextBtn.addEventListener('click', function() { goTo(currentUser + 1); });

for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', makeHandler(i));
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', makeHandler(i));
}

function makeHandler(index) {
  return function(e) {
    if (e.target.tagName === 'A') e.preventDefault();
    goTo(index);
  };
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') goTo(currentUser - 1);
  if (e.key === 'ArrowRight') goTo(currentUser + 1);
});

var canvas = document.getElementById('matrixCanvas');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var cols, drops;
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 22);
    drops = [];
    for (var i = 0; i < cols; i++) {
      drops[i] = Math.floor(Math.random() * -120);
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < cols; i++) {
      var char = chars[Math.floor(Math.random() * chars.length)];
      var bright = Math.random();
      ctx.fillStyle = bright > 0.9 ? 'rgba(180,255,180,0.9)' : 'rgba(0,255,65,0.35)';
      ctx.font = '13px monospace';
      ctx.fillText(char, i * 22, drops[i] * 20);
      if (drops[i] * 20 > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i] += 0.4 + Math.random() * 0.4;
    }
  }

  resizeCanvas();
  setInterval(draw, 50);
  window.addEventListener('resize', resizeCanvas);
}
