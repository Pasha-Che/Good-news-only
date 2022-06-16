const axios = require("axios");

const someEntries = async () => {
  const acc = [];
  for (let i = 1; i < 2; i++) {
    const options = {
      method: "GET",
      url: "https://newsdata2.p.rapidapi.com/news",
      params: { language: "ru", page: `${i}` },
      headers: {
        "X-RapidAPI-Key": "d8fd385eb6mshd5b8e8941a2bc20p19705ejsnea229c5650e7",
        "X-RapidAPI-Host": "newsdata2.p.rapidapi.com",
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
