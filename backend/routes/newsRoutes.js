const express = require("express");
const Conversation = require("../models/Conversation");
const { fetchNewsArticles } = require("../services/newsService");
const { generateAISummary } = require("../services/aiService");

const router = express.Router();

router.post("/news-summary", async (req, res) => {
  console.log("Richiesta ricevuta dal frontend:", req.body);

  try {
    const { message, date } = req.body;

    if (!message || !date) {
      return res.status(400).json({
        error: "Messaggio e data sono obbligatori."
      });
    }

    const articles = await fetchNewsArticles(message, date);

    console.log("Articoli recuperati:", articles.length);

    const summary = await generateAISummary({
      userMessage: message,
      date,
      articles
    });

    await Conversation.create({
      userMessage: message,
      selectedDate: date,
      articles,
      aiResponse: summary
    });

    res.json({
      summary,
      sources: articles.map((article) => ({
        title: article.title,
        source: article.source,
        url: article.url
      }))
    });
  } catch (error) {
    console.error("Errore completo:", error.response?.data || error.message);

    res.status(500).json({
      error:
        error.response?.data?.message ||
        error.message ||
        "Errore durante la generazione del riassunto."
    });
  }
});

module.exports = router;