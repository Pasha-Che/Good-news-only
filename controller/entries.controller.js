const axios = require('axios');

const someEntries = async () => {
  const acc = [];
  for (let i = 1; i < 10; i++) {
    const options = {
      method: 'GET',
      url: 'https://newsdata2.p.rapidapi.com/news',
      params: { language: 'ru', page: `${i}` },
      headers: {
        'X-RapidAPI-Key': 'ec7100a130msh32a06eda392b1edp1fad49jsn68423f356073',
        'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com',
      },
    };
    const res = await axios.request(options);
    const data = res.data;

    acc.push(...data.results);
  }
  const result = acc.map((el) => {
    return {
      title: el.title,
      description: el.description,
      link: el.link,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  return result;
};

someEntries();

module.exports = someEntries;
