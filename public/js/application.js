const form = document.forms.search;
const news = document.querySelector('.news');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const response = await fetch('http://localhost:3000/search', {
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
    news.innerHTML = '';
    news.insertAdjacentHTML('afterbegin', `<h1>${res[0].title}</h1>`);
  }
});
