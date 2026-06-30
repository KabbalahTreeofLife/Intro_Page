var currentSlide = 0;
var totalSlides = 3;

function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentSlide = index;

  var track = document.getElementById('sliderTrack');
  track.style.transform = 'translateX(-' + (index * 100) + '%)';

  var navLinks = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < navLinks.length; i++) {
    if (i === index) {
      navLinks[i].classList.add('active');
    } else {
      navLinks[i].classList.remove('active');
    }
  }

  var dots = document.querySelectorAll('.dot');
  for (var j = 0; j < dots.length; j++) {
    if (j === index) {
      dots[j].classList.add('active');
    } else {
      dots[j].classList.remove('active');
    }
  }
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
  if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
});
