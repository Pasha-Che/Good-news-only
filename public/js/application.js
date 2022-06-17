const form = document.forms.search;
const news = document.querySelector('.news');
const searchInput = document.getElementById('searching');
const tags = document.getElementById('goodWordsContainer');

console.log(searchInput);
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // window.location = '/';
    const res = await response.json();
    console.log(res);
    const arrNews = res.entries
      .map(
        (el) => `<div class="my-5">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">${el.title}</h5>
    <p class="card-text">${el.description}</p>
    <a href=${el.link} class="btn btn-primary">Подробнее</a>
  </div>
</div>
</div>`
      )
      .join(' ');
    // console.log(res);
    news.innerHTML = '';
    console.log(res.newWord);
    news.insertAdjacentHTML('afterbegin', arrNews);
    console.log(res);
  }
});

(() => {
  fetch('/goodWords')
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const str = res.goodWords.map((el) => {
          return `<div class="d-grid gap-2 d-md-block">
      <button class="btn btn-primary" type="button">${el.goodword}</button>
    </div>`;
        })
        .join('');
      tags.insertAdjacentHTML('beforebegin', str);
    });
})();
