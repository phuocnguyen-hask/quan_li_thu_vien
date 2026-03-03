document.addEventListener('DOMContentLoaded', () => {

  const ITEMS_PER_PAGE = 8;
  const MAX_PAGE_SHOW = 5;
  const TOTAL_ITEMS = 20;

  // ===== URL PARAMS =====
  const params = new URLSearchParams(window.location.search);
  const season = params.get('season') || 'spring';
  const year = params.get('year') || '2026';
  let currentPage = parseInt(params.get('page')) || 1;

  // ===== MAP SEASON =====
  const seasonMap = {
    spring: "Mùa xuân",
    summer: "Mùa hè",
    fall: "Mùa thu",
    winter: "Mùa đông"
  };

  const seasonName = seasonMap[season] || "Mùa xuân";

  // ===== BREADCRUMB =====
  const breadcrumbYear = document.getElementById('breadcrumb-year');
  const breadcrumbSeason = document.getElementById('breadcrumb-season');

  if (breadcrumbYear && breadcrumbSeason) {
    breadcrumbYear.innerText = year;
    breadcrumbYear.href = `season.html?year=${year}&season=${season}`;

    breadcrumbSeason.innerText = seasonName;
    breadcrumbSeason.href = `season.html?year=${year}&season=${season}`;
  }

  // ===== TITLE =====
  const titleElement = document.getElementById('season-title');
  if (titleElement) {
    titleElement.innerText =
      `DANH SÁCH ANIME THUỘC ${seasonName.toUpperCase()} ${year}`;
  }

  // ===== PAGINATION =====
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // ===== RENDER ANIME LIST =====
  const list = document.getElementById('anime-list');
  if (!list) return;

  list.innerHTML = '';

  // ===== COMING SOON 2026 (Summer, Fall, Winter) =====
if (
  year === "2026" &&
  (season === "summer" || season === "fall" || season === "winter")
) {

  list.innerHTML = `
    <div class="coming-soon-box">
      <h2>COMING SOON</h2>
      <p>Nội dung đang được cập nhật...</p>
    </div>
  `;

  // Ẩn pagination nhưng không xóa
  const topPage = document.getElementById("pagination-top");
  const bottomPage = document.getElementById("pagination-bottom");

  if (topPage) topPage.style.display = "none";
  if (bottomPage) bottomPage.style.display = "none";

  return; // dừng render anime
}

  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(start + ITEMS_PER_PAGE - 1, TOTAL_ITEMS);

  for (let i = start; i <= end; i++) {
    const card = document.createElement('div');
    card.className = 'anime-card click-to-watch';

    card.innerHTML = `
      <img src="images/season/${year}/${season}/thumb${i}.jpg"
           onerror="this.style.display='none'">
      <span class="anime-title">Anime ${i}</span>
    `;

    list.appendChild(card);
  }

  // ===== PAGINATION UI =====
  function renderPagination(id) {
    const p = document.getElementById(id);
    if (!p) return;

    p.innerHTML = "";

    p.innerHTML += `<span>Trang ${currentPage} của ${totalPages}</span>`;

    if (currentPage > 1) {
      p.innerHTML += `<a href="?year=${year}&season=${season}&page=1">Trang Đầu</a>`;
    }

    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_SHOW / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGE_SHOW - 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        p.innerHTML += `<span class="active">${i}</span>`;
      } else {
        p.innerHTML += `<a href="?year=${year}&season=${season}&page=${i}">${i}</a>`;
      }
    }

    if (currentPage < totalPages) {
      p.innerHTML += `<a href="?year=${year}&season=${season}&page=${totalPages}">Trang Cuối</a>`;
    }
  }

  renderPagination("pagination-top");
  renderPagination("pagination-bottom");

  // ===== CLICK TO WATCH =====
  document.querySelectorAll('.click-to-watch').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img) return;

      const posterSrc = encodeURIComponent(img.getAttribute('src'));
      window.location.href = `watch.html?poster=${posterSrc}`;
    });
  });

});