# Tongue – DevOps Lifecycle Project

## Descrizione del progetto

Tongue è un’applicazione web full stack che consente all’utente di selezionare una data, inserire un argomento di interesse e ottenere un riassunto delle notizie tramite intelligenza artificiale.

Il frontend è sviluppato con React e Vite, mentre il backend utilizza Node.js ed Express. Il backend comunica con servizi esterni per recuperare le notizie e generare il riassunto, e utilizza MongoDB Atlas per la persistenza dei dati.

## Architettura

```text
Utente
  |
  v
Frontend React + Vite
  |
  v
Backend Node.js + Express
  |
  +--> News API
  |
  +--> OpenAI API
  |
  +--> MongoDB Atlas
```

## Obiettivi DevOps

L’obiettivo del progetto è implementare un ciclo DevOps completo comprendente:

- ambiente di sviluppo locale;
- containerizzazione con Docker;
- orchestrazione locale con Docker Compose;
- separazione tra development, staging e production;
- gestione sicura delle variabili d’ambiente e dei secrets;
- pipeline CI con linting e build;
- pipeline CD con deploy automatico;
- monitoraggio della disponibilità del servizio;
- error tracking tramite Sentry.

## Ambienti

### Development

Ambiente utilizzato per lo sviluppo e i test locali.

Caratteristiche:

- frontend Vite disponibile su `http://localhost:5173` quando avviato tramite npm;
- frontend Docker disponibile su `http://localhost:8080`;
- backend disponibile su `http://localhost:5050`;
- variabili configurate tramite file `.env` locali;
- avvio tramite npm oppure Docker Compose;
- logging dettagliato;
- ambiente Sentry impostato su `development`.

### Staging

Ambiente utilizzato per validare l’applicazione prima del rilascio in produzione.

Caratteristiche:

- deploy associato al branch `develop` o a una preview deployment;
- configurazioni separate dalla produzione;
- variabili d’ambiente dedicate;
- ambiente Sentry impostato su `staging`;
- test delle funzionalità e delle integrazioni esterne;
- verifica del comportamento dell’app prima del merge su `main`.

### Production

Ambiente pubblico utilizzato dagli utenti finali.

Caratteristiche:

- deploy automatico dopo un push sul branch `main`;
- frontend pubblicato su Netlify;
- backend pubblicato su Render;
- database ospitato su MongoDB Atlas;
- secrets configurati nelle piattaforme cloud e in GitHub;
- uptime monitor configurato con UptimeRobot;
- error tracking configurato con Sentry;
- ambiente Sentry impostato su `production`.

## Strategia Git

Il progetto utilizza i seguenti branch:

- `feature/*`: sviluppo di nuove funzionalità o configurazioni;
- `develop`: integrazione e staging;
- `main`: versione stabile destinata alla produzione.

Il lavoro relativo al ciclo DevOps viene inizialmente sviluppato nel branch:

```text
feature/devops-lifecycle
```

## Strumenti scelti

### GitHub

GitHub viene utilizzato per ospitare il repository, gestire il versionamento del codice e conservare la cronologia delle modifiche.

### GitHub Actions

GitHub Actions viene utilizzato per la pipeline CI/CD perché:

- è integrato direttamente con GitHub;
- permette di eseguire workflow automatici a ogni push o pull request;
- consente la gestione centralizzata dei secrets;
- rende facilmente consultabili i log e la cronologia delle pipeline;
- permette di bloccare il deploy quando lint o build falliscono;
- non richiede l’integrazione di una piattaforma CI esterna.

### Docker

Docker viene utilizzato per creare immagini riproducibili del frontend e del backend.

Il frontend utilizza una build multi-stage:

1. Node.js genera i file statici dell’applicazione;
2. Nginx pubblica il contenuto della cartella `dist`.

Il backend utilizza un’immagine Node.js Alpine e installa soltanto le dipendenze necessarie in produzione.

### Docker Compose

Docker Compose viene utilizzato per avviare localmente frontend e backend con un solo comando.

Compose gestisce:

- build delle immagini;
- porte dei servizi;
- variabili d’ambiente;
- dipendenze tra frontend e backend;
- health check;
- rete Docker locale.

### Netlify

Netlify viene utilizzato per il deploy pubblico del frontend.

### Render

Render viene utilizzato per il deploy pubblico del backend.

### MongoDB Atlas

MongoDB Atlas viene utilizzato come database cloud.

### Sentry

Sentry viene utilizzato per raccogliere e analizzare gli errori applicativi.

### UptimeRobot

UptimeRobot viene utilizzato per verificare periodicamente la disponibilità dell’applicazione pubblica.

## Pianificazione

1. Analisi dell’applicazione e definizione degli ambienti.
2. Preparazione delle variabili d’ambiente.
3. Creazione dei Dockerfile.
4. Creazione di Docker Compose.
5. Verifica dell’avvio locale.
6. Configurazione della pipeline CI.
7. Configurazione del deploy automatico.
8. Integrazione di Sentry.
9. Configurazione di UptimeRobot.
10. Raccolta di screenshot e link per la consegna.

## Struttura del progetto

```text
tongue-news-chatbot/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

I file `.env` sono presenti soltanto nell’ambiente locale e non vengono inclusi nel repository.

## Variabili d’ambiente

Le variabili sensibili non vengono salvate nel repository.

I file reali:

```text
frontend/.env
backend/.env
```

sono esclusi tramite `.gitignore` e `.dockerignore`.

I file:

```text
frontend/.env.example
backend/.env.example
```

documentano invece le variabili necessarie senza includere valori sensibili.

### Variabili backend

```env
NODE_ENV=development
PORT=5050
MONGODB_URI=
NEWS_API_KEY=
OPENAI_API_KEY=
FRONTEND_URL=http://localhost:8080
```

### Variabili frontend

```env
VITE_API_URL=http://localhost:5050
```

Le variabili che iniziano con `VITE_` vengono incorporate nel frontend durante la fase di build.

## Sicurezza dei secrets

Il file `.gitignore` esclude:

```text
.env
.env.*
```

mantenendo versionabili soltanto i file dimostrativi:

```text
.env.example
```

Per verificare che un file `.env` non sia tracciato:

```bash
git ls-files backend/.env
git ls-files frontend/.env
```

I comandi non devono restituire alcun risultato.

Per controllare che i file siano ignorati:

```bash
git check-ignore -v backend/.env
git check-ignore -v frontend/.env
```

Per verificare la cronologia Git:

```bash
git log --all -- backend/.env
git log --all -- frontend/.env
```

Prima di ogni commit è possibile controllare il contenuto in staging con:

```bash
git diff --cached
```

## Avvio locale senza Docker

### Prerequisiti

- Node.js installato;
- npm installato;
- file `backend/.env` configurato;
- file `frontend/.env` configurato;
- accesso ai servizi MongoDB Atlas, News API e OpenAI.

### Backend

```bash
cd backend
npm install
npm run dev
```

Il backend sarà disponibile su:

```text
http://localhost:5050
```

Health check:

```text
http://localhost:5050/health
```

Risposta prevista:

```json
{
  "status": "ok",
  "service": "tongue-backend",
  "environment": "development",
  "timestamp": "..."
}
```

### Frontend

Da un secondo terminale:

```bash
cd frontend
npm install
npm run dev
```

Il frontend sarà disponibile su:

```text
http://localhost:5173
```

In questo caso il backend deve autorizzare tramite CORS l’origine:

```env
FRONTEND_URL=http://localhost:5173
```

## Containerizzazione manuale

### Build del backend

Dalla directory principale del progetto:

```bash
docker build -t tongue-backend:local ./backend
```

### Avvio del backend

```bash
docker run --rm \
  --name tongue-backend \
  --env-file backend/.env \
  -p 5050:5050 \
  tongue-backend:local
```

### Build del frontend

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:5050 \
  -t tongue-frontend:local \
  ./frontend
```

### Avvio del frontend

```bash
docker run --rm \
  --name tongue-frontend \
  -p 8080:80 \
  tongue-frontend:local
```

Il frontend containerizzato sarà disponibile su:

```text
http://localhost:8080
```

Il relativo health check sarà disponibile su:

```text
http://localhost:8080/health
```

Quando il frontend viene eseguito sulla porta `8080`, il backend deve autorizzare questa origine:

```env
FRONTEND_URL=http://localhost:8080
```

### Controllo dei container

```bash
docker ps
```

### Arresto dei container

```bash
docker stop tongue-frontend tongue-backend
```

## Avvio locale con Docker Compose

### Prerequisiti

- Docker Desktop installato e in esecuzione;
- file `backend/.env` configurato con le variabili richieste;
- porte `5050` e `8080` disponibili.

### Verifica della configurazione

Per validare la sintassi del file Compose senza stampare la configurazione completa:

```bash
docker compose config --quiet
```

Il comando:

```bash
docker compose config
```

mostra invece la configurazione risolta e può includere i valori caricati dal file `.env`. Il relativo output non deve essere condiviso se contiene credenziali o token.

### Avvio

Dalla directory principale del progetto:

```bash
docker compose up --build
```

Docker Compose:

1. costruisce l’immagine del backend;
2. costruisce l’immagine del frontend;
3. avvia il backend;
4. attende che il backend superi l’health check;
5. avvia il frontend.

I servizi saranno disponibili ai seguenti indirizzi:

- frontend: `http://localhost:8080`;
- backend: `http://localhost:5050`;
- health check frontend: `http://localhost:8080/health`;
- health check backend: `http://localhost:5050/health`.

### Avvio in background

```bash
docker compose up --build -d
```

### Stato dei servizi

```bash
docker compose ps
```

Il risultato atteso mostra entrambi i servizi con stato `healthy`.

### Visualizzazione dei log

Tutti i servizi:

```bash
docker compose logs
```

Log in tempo reale:

```bash
docker compose logs -f
```

Solo backend:

```bash
docker compose logs backend
```

Solo frontend:

```bash
docker compose logs frontend
```

### Arresto

```bash
docker compose down
```

Il comando arresta e rimuove i container e la rete creata da Docker Compose.

### Ricostruzione completa delle immagini

```bash
docker compose build --no-cache
docker compose up
```

## Health check

Il backend espone:

```text
GET /health
```

e restituisce informazioni sullo stato del servizio.

Il frontend espone tramite Nginx:

```text
GET /health
```

Gli health check vengono utilizzati da Docker Compose per:

- verificare la disponibilità dei servizi;
- impedire l’avvio prematuro del frontend;
- individuare eventuali problemi durante l’avvio;
- fornire endpoint utilizzabili dai sistemi di monitoraggio.

## Verifiche eseguite

Sono state completate le seguenti verifiche locali:

- avvio del backend tramite npm;
- avvio del frontend tramite Vite;
- linting del frontend;
- build di produzione del frontend;
- build dell’immagine Docker del backend;
- build dell’immagine Docker del frontend;
- avvio dei due container separatamente;
- verifica degli health check;
- verifica della comunicazione frontend-backend;
- avvio completo tramite Docker Compose;
- verifica di entrambi i servizi con stato healthy;
- esecuzione di una richiesta completa dall’interfaccia.

## Pipeline CI

La Continuous Integration è implementata tramite GitHub Actions nel file:

```text
.github/workflows/ci.yml
```

Il workflow viene eseguito automaticamente in caso di:

- push su `main`;
- push su `develop`;
- push su `feature/devops-lifecycle`;
- pull request verso `main`;
- pull request verso `develop`.

La pipeline contiene tre job.

### Frontend lint and build

Il job:

1. scarica il repository;
2. configura Node.js;
3. installa le dipendenze con `npm ci`;
4. esegue il linting;
5. crea la build di produzione del frontend.

### Backend lint

Il job:

1. scarica il repository;
2. configura Node.js;
3. installa le dipendenze con `npm ci`;
4. esegue il linting del backend.

### Build Docker images

Il job viene eseguito soltanto dopo il completamento corretto dei controlli frontend e backend.

Costruisce:

```text
tongue-backend:ci
tongue-frontend:ci
```

Le immagini vengono costruite per verificarne la validità, ma in questa fase non vengono pubblicate in un container registry.

Se un comando di linting restituisce un errore, il relativo job fallisce e la build Docker non viene eseguita.

## Stato del progetto

- [x] Analisi iniziale
- [x] Definizione degli ambienti
- [x] Gestione iniziale dei file `.env`
- [x] Endpoint di health check backend
- [x] Endpoint di health check frontend
- [x] Dockerfile frontend
- [x] Dockerfile backend
- [x] Docker Compose
- [x] Test locale dei container
- [x] Documentazione dei comandi Docker
- [x] Linting backend
- [x] Pipeline CI
- [ ] Configurazione GitHub Secrets
- [ ] Pipeline CD
- [ ] Deploy automatico
- [ ] Integrazione Sentry
- [ ] Configurazione UptimeRobot
- [ ] Raccolta screenshot e link finali