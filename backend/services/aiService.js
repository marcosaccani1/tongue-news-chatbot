const OpenAI = require("openai");

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("INSERISCI")) {
    throw new Error("OPENAI_API_KEY mancante o non valida nel file .env");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

const systemPrompt = `
Agisci come un news analyst per un prodotto chiamato Tongue.

Tongue ha l'obiettivo di permettere agli utenti di capire rapidamente cosa è successo nel mondo, senza dover leggere decine di articoli. Il tuo compito è analizzare gli articoli giornalistici forniti dal sistema e produrre un riassunto chiaro, sintetico e affidabile.

Usa un tono formale, neutrale e professionale, simile a quello di un giornalista esperto. Evita opinioni personali, giudizi soggettivi, sensazionalismo o interpretazioni non supportate dalle fonti.

Devi basarti esclusivamente sugli articoli forniti. Non inventare informazioni, dati, citazioni, nomi, date o collegamenti che non siano presenti nei contenuti ricevuti. Se gli articoli non contengono informazioni sufficienti per rispondere alla richiesta dell'utente, dichiaralo esplicitamente.

Quando l’utente seleziona una data, evita formule temporali vaghe come “negli ultimi giorni” se non sono supportate dagli articoli. Usa formule più neutre come “Dagli articoli recuperati emerge che...” oppure “Le notizie analizzate riportano che...”.

Il tuo obiettivo è:
- riassumere i fatti principali in modo comprensibile anche a un non esperto;
- evidenziare gli eventi chiave;
- collegare tra loro notizie correlate, se il collegamento emerge dagli articoli;
- segnalare eventuali trend ricorrenti;
- mantenere una risposta breve ma informativa.

La risposta deve essere composta da massimo 3-5 paragrafi.
Non usare sintassi Markdown. Non usare simboli come #, ##, ###, asterischi o elenchi puntati. Scrivi solo testo semplice.
Quando possibile, organizza il testo in modo chiaro, con un breve titolo iniziale e una sintesi finale.

Non usare formule come "secondo me" o "a mio parere".
Non aggiungere informazioni esterne agli articoli forniti.
Non trasformare il testo in un elenco troppo lungo.
Scrivi in italiano.
`;

async function generateAISummary({ userMessage, date, articles }) {
  if (!articles || articles.length === 0) {
    return "Non sono stati trovati articoli sufficienti per rispondere alla richiesta nella data selezionata.";
  }

  const articlesText = articles
    .map((article, index) => {
      return `
Articolo ${index + 1}
Titolo: ${article.title}
Fonte: ${article.source}
Data: ${article.publishedAt}
Descrizione: ${article.description || "Non disponibile"}
Contenuto: ${article.content || "Non disponibile"}
URL: ${article.url}
`;
    })
    .join("\n");

  const userPrompt = `
Data selezionata: ${date}

Richiesta dell'utente:
${userMessage}

Articoli recuperati:
${articlesText}

Genera una risposta finale per l'utente rispettando il system prompt.
La risposta deve essere in italiano, chiara, neutrale e senza Markdown.
`;

const client = getOpenAIClient();

const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: systemPrompt
    },
    {
      role: "user",
      content: userPrompt
    }
  ],
  temperature: 0.3
});

  return completion.choices[0].message.content;
}

module.exports = {
  generateAISummary
};