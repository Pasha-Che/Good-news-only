const axios = require("axios");

const someEntries = async () => {
  const options = {
    method: "GET",
    url: "https://newsdata2.p.rapidapi.com/news",
    params: { language: "ru", page: "1" },
    headers: {
      "X-RapidAPI-Key": "2ee6ec0a95msh303863cb6fd2637p1afe47jsn04d0796f69ac",
      "X-RapidAPI-Host": "newsdata2.p.rapidapi.com",
    },
  };

  const res = await axios.request(options);
  const data = res.data;
  const entries = [];
  data.results.map((el) => {
    entries.push({
      title: el.title,
      description: el.description,
      link: el.link,
      createdAt: el.pubDate,
      updatedAt: new Date(),
    });
  });
  return entries;
};

someEntries();
module.exports = someEntries;
