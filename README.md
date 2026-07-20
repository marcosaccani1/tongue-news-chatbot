# Tongue – DevOps Lifecycle Project

## Descrizione del progetto

Tongue è un’applicazione web full stack che consente all’utente di cercare notizie e ottenere un’analisi generata tramite intelligenza artificiale.

Il frontend è sviluppato con React e Vite, mentre il backend utilizza Node.js ed Express. Il backend comunica con servizi esterni per recuperare le notizie e generare le risposte, e utilizza MongoDB Atlas per la persistenza dei dati.

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
- gestione sicura delle variabili d’ambiente;
- pipeline CI con linting e build;
- pipeline CD con deploy automatico;
- monitoraggio uptime;
- error tracking con Sentry.

## Ambienti

### Development

Ambiente utilizzato per lo sviluppo locale.

Caratteristiche:

- frontend eseguito su `http://localhost:5173`;
- backend eseguito su `http://localhost:5050`;
- variabili configurate tramite file `.env`;
- avvio iniziale tramite npm;
- successivamente avvio tramite Docker Compose;
- logging dettagliato;
- ambiente Sentry impostato su `development`.

### Staging

Ambiente utilizzato per validare l’applicazione prima della produzione.

Caratteristiche:

- deploy associato al branch `develop` o a una preview deployment;
- configurazioni separate dalla produzione;
- variabili d’ambiente dedicate;
- ambiente Sentry impostato su `staging`;
- utilizzato per test funzionali e verifica delle integrazioni.

### Production

Ambiente pubblico utilizzato dagli utenti finali.

Caratteristiche:

- deploy automatico dopo un push su `main`;
- frontend pubblicato su Netlify;
- backend pubblicato su Render;
- database ospitato su MongoDB Atlas;
- secrets configurati nelle piattaforme cloud e in GitHub;
- uptime monitor configurato con UptimeRobot;
- error tracking configurato con Sentry;
- ambiente Sentry impostato su `production`.

## Strumenti scelti

### GitHub

GitHub viene utilizzato per ospitare il repository e gestire il versionamento del codice.

### GitHub Actions

GitHub Actions viene utilizzato per la pipeline CI/CD perché:

- è integrato direttamente con il repository;
- permette di eseguire workflow a ogni push o pull request;
- consente la gestione centralizzata dei secrets;
- rende facilmente consultabili log e cronologia delle pipeline;
- permette di bloccare il deploy quando lint o build falliscono.

### Docker

Docker viene utilizzato per creare immagini riproducibili del frontend e del backend.

### Docker Compose

Docker Compose viene utilizzato per avviare localmente frontend e backend con un unico comando.

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

## Variabili d’ambiente

Le variabili sensibili non vengono salvate nel repository.

I file reali:

```text
frontend/.env
backend/.env
```

sono esclusi tramite `.gitignore`.

I file:

```text
frontend/.env.example
backend/.env.example
```

documentano invece le variabili necessarie senza includere valori sensibili.

## Avvio locale senza Docker

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Il frontend sarà disponibile su:

```text
http://localhost:5173
```

## Stato del progetto

- [x] Analisi iniziale
- [x] Definizione degli ambienti
- [x] Gestione iniziale dei file `.env`
- [x] Endpoint di health check
- [ ] Dockerfile frontend
- [ ] Dockerfile backend
- [ ] Docker Compose
- [ ] Pipeline CI
- [ ] Pipeline CD
- [ ] Deploy automatico
- [ ] Sentry
- [ ] UptimeRobot