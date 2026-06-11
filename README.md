# Tongue – AI News Analyst Chatbot

Tongue è un chatbot intelligente progettato per fornire agli utenti un riassunto rapido, chiaro e affidabile delle principali notizie a partire da articoli giornalistici recuperati tramite API esterne.

Il progetto nasce dall'idea di trasformare il modo in cui le persone consumano informazione online. Oggi molti utenti passano parte della giornata sui social media, scorrendo rapidamente contenuti brevi e immediati. Tongue applica questa logica al mondo dell'informazione, offrendo pillole giornalistiche sintetiche ma basate su fonti reali.

## Obiettivo

L'obiettivo dell'applicazione è permettere all'utente di capire rapidamente cosa è successo nel mondo, senza dover leggere decine di articoli.

L'utente può selezionare una data, scrivere in linguaggio naturale quali notizie desidera leggere e ricevere un riassunto generato dall'AI.

Il sistema recupera automaticamente articoli giornalistici tramite API esterne, li analizza con un modello linguistico e restituisce una sintesi breve, neutrale e comprensibile.

## Funzionalità principali

- Inserimento di una richiesta in linguaggio naturale.
- Selezione della data di interesse.
- Recupero automatico degli articoli tramite News API.
- Analisi degli articoli tramite modello LLM.
- Generazione di un riassunto breve, neutrale e comprensibile.
- Visualizzazione del risultato direttamente nella pagina web.
- Visualizzazione delle fonti utilizzate.
- Salvataggio delle conversazioni in MongoDB.
- Gestione dei casi in cui non sono disponibili articoli sufficienti.

## Tecnologie utilizzate

- React + Vite per il front end.
- Node.js + Express per il back end.
- News API per il recupero degli articoli.
- OpenAI API per la generazione del riassunto.
- MongoDB Atlas per la persistenza delle conversazioni.
- Netlify per il deploy del front end.
- Render per il deploy del back end.

## Architettura del progetto

Il progetto è composto da due parti principali:

1. Front end React, che permette all'utente di inserire una richiesta e selezionare una data.
2. Back end Node.js, che riceve la richiesta, recupera gli articoli, chiama il modello AI e salva la conversazione.

Il flusso dell'applicazione è il seguente:

1. L'utente inserisce una richiesta in linguaggio naturale e seleziona una data.
2. Il front end invia i dati al back end tramite una richiesta HTTP POST.
3. Il back end interroga News API per recuperare articoli coerenti con la richiesta.
4. Gli articoli recuperati vengono passati a un modello LLM insieme a un system prompt.
5. Il modello genera un riassunto giornalistico chiaro, sintetico e neutrale.
6. La conversazione viene salvata in MongoDB.
7. Il risultato viene restituito al front end e mostrato all'utente.

## Endpoint principale

L'endpoint principale del back end è:

```http
POST /api/news-summary

 Esempio di body della richiesta: json
{
  "message": "politica italiana",
  "date": "2026-06-11"
}
 Esempio di risposta: json
{
  "summary": "Riassunto generato dall'AI",
  "sources": [
    {
      "title": "Titolo articolo",
      "source": "Fonte",
      "url": "Link articolo"
    }
  ]
}
 ## System prompt  Il modello AI agisce come un news analyst per Tongue.  Il suo compito è analizzare gli articoli forniti dal sistema e produrre un riassunto giornalistico breve, chiaro, neutrale e basato esclusivamente sulle fonti disponibili.  Il modello deve:  - riassumere i fatti principali; - usare un tono formale e giornalistico; - evitare opinioni personali o giudizi soggettivi; - non inventare informazioni non presenti negli articoli; - dichiarare esplicitamente quando le fonti non sono sufficienti; - evidenziare eventi chiave, trend e collegamenti tra le notizie; - mantenere la risposta breve e comprensibile.  ## Persistenza dei dati  La persistenza dei dati conversazionali è gestita tramite MongoDB Atlas.  Ogni conversazione viene salvata con le seguenti informazioni:  - messaggio dell'utente; - data selezionata; - articoli recuperati; - risposta generata dall'AI; - data e ora di creazione; - data e ora di aggiornamento.  Questa funzionalità permette di conservare lo storico delle interazioni e dimostra la gestione dei dati conversazionali richiesta dal progetto.  ## Struttura del progetto text
tongue-news-chatbot/
├── backend/
│   ├── models/
│   │   └── Conversation.js
│   ├── routes/
│   │   └── newsRoutes.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── newsService.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
└── README.md
 ## Variabili d'ambiente  Per motivi di sicurezza, le chiavi API e le credenziali non sono incluse nel codice sorgente.  Nel back end è necessario creare un file `.env` dentro la cartella `backend` con le seguenti variabili: env
PORT=5050
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
 Nel front end, in fase di deploy, è possibile configurare la variabile: env
VITE_API_URL=https://url-del-backend.onrender.com
 In locale, il front end usa come URL di default: text
http://localhost:5050
 ## Avvio in locale  Per avviare il progetto in locale è necessario eseguire separatamente back end e front end.  ### Avvio del back end bash
cd backend
npm install
npm run dev
 Il back end sarà disponibile su: text
http://localhost:5050
 ### Avvio del front end bash
cd frontend
npm install
npm run dev
 Il front end sarà disponibile su: text
http://localhost:5173
 ## Deploy  Il progetto può essere pubblicato utilizzando piattaforme gratuite.  ### Back end  Il back end può essere pubblicato su Render come Web Service.  Impostazioni consigliate: text
Root Directory: backend
Build Command: npm install
Start Command: npm start
 Su Render devono essere configurate le seguenti variabili d'ambiente: env
PORT=5050
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
 ### Front end  Il front end può essere pubblicato su Netlify come applicazione Vite.  Impostazioni consigliate: text
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
 Su Netlify deve essere configurata la variabile d'ambiente: env
VITE_API_URL=https://url-del-backend.onrender.com
 ## Sicurezza  Le API key non devono essere inserite direttamente nel codice e non devono essere caricate su GitHub.  Per questo motivo i file `.env` sono esclusi dal versionamento tramite `.gitignore`.  Il file `.gitignore` del back end include: text
node_modules
.env
 Il file `.gitignore` del front end include: text
node_modules
dist
.env
```

## Stato del progetto

Il progetto implementa correttamente:

- front end React con singola input-box;
- selezione della data;
- endpoint back end dedicato;
- recupero articoli tramite API esterne;
- integrazione con modello AI;
- system prompt personalizzato;
- generazione di riassunti giornalistici;
- visualizzazione delle fonti;
- persistenza delle conversazioni;
- predisposizione al deploy.

## Autore

Progetto realizzato da Marco Saccani.