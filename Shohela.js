let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideWidth = slides[0].offsetWidth;
let intervalId;
let touchStartX;

// Clone first and last slides for infinite loop
let firstSlide = slides[0].cloneNode(true);
let lastSlide = slides[slides.length - 1].cloneNode(true);
slider.appendChild(firstSlide);
slider.insertBefore(lastSlide, slides[0]);

// Set slider width
slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;

// Navigation functions
function gotoNextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease';
      currentSlide = 0;
      slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    }, 0);
  } else {
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
  }
  updateDots();
}

function gotoPrevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease';
      currentSlide = slides.length - 1;
      slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    }, 0);
  } else {
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
  }
  updateDots();
}

// Touch event listeners
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const swipeThreshold = 50;
  if (touchEndX - touchStartX > swipeThreshold) {
    gotoPrevSlide();
  } else if (touchStartX - touchEndX > swipeThreshold) {
    gotoNextSlide();
  }
});

// Mouse event listeners (optional)
slider.addEventListener('mousedown', (e) => {
  touchStartX = e.clientX;
});

slider.addEventListener('mouseup', (e) => {
  const touchEndX = e.clientX;
  const swipeThreshold = 50;
  if (touchEndX - touchStartX > swipeThreshold) {
    gotoPrevSlide();
  } else if (touchStartX - touchEndX > swipeThreshold) {
    gotoNextSlide();
  }
});

// Dots event listeners
  dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    updateDots();
  });
});

// Update dots
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) {
      dot.classList.add('active');
    }
  });
}

// Automatic sliding
intervalId = setInterval(() => {
  gotoNextSlide();
}, 5000);

// Pause automatic sliding on hover
slider.addEventListener('mouseover', () => {
  clearInterval(intervalId);
});

slider.addEventListener('mouseout', () => {
  intervalId = setInterval(() => {
    gotoNextSlide();
  }, 5000);
}); 