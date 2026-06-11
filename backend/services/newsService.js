const axios = require("axios");

function cleanSearchQuery(message) {
  return message
    .replace(/riassumimi/gi, "")
    .replace(/principali/gi, "")
    .replace(/notizie/gi, "")
    .replace(/sulla/gi, "")
    .replace(/sulle/gi, "")
    .replace(/sul/gi, "")
    .replace(/del/gi, "")
    .replace(/della/gi, "")
    .replace(/di oggi/gi, "")
    .trim();
}

async function fetchNewsArticles(message, date) {
  const apiKey = process.env.NEWS_API_KEY;
  const query = cleanSearchQuery(message) || message;

  console.log("Query usata per News API:", query);
  console.log("Data usata per News API:", date);

  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: query,
      from: date,
      to: date,
      language: "it",
      sortBy: "publishedAt",
      pageSize: 10,
      apiKey
    }
  });

  let articles = response.data.articles || [];

  if (articles.length === 0) {
    console.log("Nessun articolo trovato nella data selezionata. Provo una ricerca più ampia.");

    const fallbackResponse = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        language: "it",
        sortBy: "publishedAt",
        pageSize: 10,
        apiKey
      }
    });

    articles = fallbackResponse.data.articles || [];
  }

  return articles.map((article) => ({
    title: article.title,
    source: article.source?.name || "Fonte non disponibile",
    url: article.url,
    publishedAt: article.publishedAt,
    description: article.description,
    content: article.content
  }));
}

module.exports = {
  fetchNewsArticles
};