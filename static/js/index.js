const slider = document.querySelector('.movie-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (!slider || !prevBtn || !nextBtn) {
  console.error('Slider or navigation buttons not found!');
} else {
  const scrollAmount = 300;

  nextBtn.addEventListener('click', () => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (slider.scrollLeft <= 0) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.click-to-watch').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img) return;

      const posterSrc = encodeURIComponent(img.getAttribute('src'));
      window.location.href = `watch.html?poster=${posterSrc}`;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links > li > a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (!linkPage) return;

    if (currentPage.startsWith("season.html") && linkPage === "season.html") {
      link.classList.add("active");
    }

    if (currentPage === linkPage) {
      link.classList.add("active");
    }
  });
});