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