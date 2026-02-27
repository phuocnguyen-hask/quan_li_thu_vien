const ITEMS_PER_PAGE = 8;
const MAX_PAGE_SHOW = 5;
const TOTAL_ITEMS = 20;

// url params
const params = new URLSearchParams(window.location.search);
const genre = params.get('type') || 'action';
let currentPage = parseInt(params.get('page')) || 1;

// title
const genreName = genre.replace(/-/g, ' ').toLowerCase();

breadcrumb = document.getElementById('breadcrumb-genre');
breadcrumb.innerText = genreName;
breadcrumb.href = `cate.html?type=${genre}`;
document.getElementById('genre-title').innerText = 
`DANH SÁCH ANIME THUỘC THỂ LOẠI ${genreName}`;

// pagination
const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);
if (currentPage < 1) {
  currentPage = 1;
}
if (currentPage > totalPages) {
  currentPage = totalPages;
}

// render anime list
const list = document.getElementById('anime-list');
list.innerHTML = '';

const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
const end = Math.min(start + ITEMS_PER_PAGE - 1, TOTAL_ITEMS);

for (let i = start; i <= end; i++){
    const card = document.createElement('div');
    card.className = 'anime-card click-to-watch';
    card.innerHTML = `
        <img src="images/cate/${genre}/thumb${i}.jpg"
             onerror="this.style.display='none'">
        <span class="anime-title">Anime ${i}</span>
    `;
    list.appendChild(card);
}
// pagination UI
function renderPagination(id) {
  const p = document.getElementById(id);
  p.innerHTML = "";

  p.innerHTML += `<span>Trang ${currentPage} của ${totalPages}</span>`;

  if (currentPage > 1) {
    p.innerHTML += `<a href="?type=${genre}&page=1">Trang Đầu</a>`;
  }

  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_SHOW / 2));
  let endPage = Math.min(totalPages, startPage + MAX_PAGE_SHOW - 1);

  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      p.innerHTML += `<span class="active">${i}</span>`;
    } else {
      p.innerHTML += `<a href="?type=${genre}&page=${i}">${i}</a>`;
    }
  }

  if (currentPage < totalPages) {
    p.innerHTML += `<a href="?type=${genre}&page=${totalPages}">Trang Cuối</a>`;
  }
}

renderPagination("pagination-top");
renderPagination("pagination-bottom");

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