const slider = document.querySelector('.movie-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
if (!slider || !prevBtn || !nextBtn) {
  console.error('Slider or navigation buttons not found!');
}else {
  const scrollAmount = 300;

  nextBtn.addEventListener('click', () => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (slider.scrollLeft <= 0) {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: 'smooth'
      });
    } else {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  });
}
