const form = document.forms.search;
const news = document.querySelector('.news');
const searchInput = document.getElementById('searching');
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
    const arrNews = res.map(el => `<div class="my-5">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">${el.title}</h5>
    <p class="card-text">${el.description}</p>
    <a href=${el.link} class="btn btn-primary">Подробнее</a>
  </div>
</div>
</div>`).join(' ');
    // console.log(res);
    news.innerHTML = '';
    news.insertAdjacentHTML('afterbegin', arrNews);
    console.log(res);
  }
});

{/* <div class="my-5">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">${this.description}</p>
    <a href=${this.link} class="btn btn-primary">Подробнее</a>
  </div>
</div>
</div> */}