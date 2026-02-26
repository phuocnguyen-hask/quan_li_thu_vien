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
