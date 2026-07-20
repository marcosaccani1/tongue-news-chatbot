import { useState } from "react";
import * as Sentry from "@sentry/react";
import { getNewsSummary } from "./services/api";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message || !date) {
      setError("Inserisci una richiesta e seleziona una data.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setSources([]);

    try {
      const data = await getNewsSummary(message, date);
      setSummary(data.summary);
      setSources(data.sources || []);
    } catch (err) {
      Sentry.captureException(err, {
        tags: {
          operation: "generate-news-summary",
        },
        extra: {
          selectedDate: date,
          requestedTopic: message,
        },
      });

      setError(
        err.message ||
          "Si è verificato un errore durante la generazione del riassunto.",
      );
    } finally {
      setLoading(false);
    }
  };

  const simulateSentryError = () => {
    const testError = new Error(
      "Errore di test Sentry - Tongue DevOps project",
    );

    Sentry.captureException(testError, {
      tags: {
        operation: "sentry-test",
      },
    });

    console.error(testError);
  };

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <span className="badge">AI News Analyst</span>
          <h1>Tongue</h1>
          <p>
            Seleziona una data, scrivi quali notizie vuoi leggere e ricevi un
            riassunto chiaro, rapido e giornalistico.
          </p>
        </header>

        <main className="card">
          <label htmlFor="news-date">Seleziona una data</label>
          <input
            id="news-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <label htmlFor="news-message">Cosa vuoi sapere?</label>
          <textarea
            id="news-message"
            placeholder="Esempio: Riassumimi le principali notizie sulla sostenibilità ambientale in Italia"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Analisi in corso..." : "Genera riassunto"}
          </button>

          {import.meta.env.VITE_ENABLE_SENTRY_TEST === "true" && (
            <button type="button" onClick={simulateSentryError}>
              Simula errore Sentry
            </button>
          )}

          {error && <p className="error">{error}</p>}
        </main>

        {summary && (
          <section className="result">
            <h2>Risultato</h2>
            <p>{summary}</p>

            {sources.length > 0 && (
              <div className="sources">
                <h3>Fonti utilizzate</h3>

                <p className="sources-note">
                  Articoli recuperati tramite API giornalistiche e utilizzati
                  per generare il riassunto.
                </p>

                {sources.slice(0, 5).map((source, index) => (
                  <a
                    key={`${source.url}-${index}`}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title} — {source.source}
                  </a>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;