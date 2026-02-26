const params = new URLSearchParams(window.location.search);
const poster = params.get('poster');

const posterImg = document.getElementById('anime-poster');

if (poster && posterImg) {
  posterImg.src = poster;
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
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        document.querySelectorAll('.tab-btn')
            .forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content')
            .forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`tab-${tab}`).classList.add('active');
    });
});
// =========================
// RELATED MOVIES SLIDER
// =========================
const slider = document.querySelector('.related-track');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');

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
