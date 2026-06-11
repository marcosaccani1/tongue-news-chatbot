import { useState } from "react";
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
      setError(err.message || "Si è verificato un errore durante la generazione del riassunto.");
    } finally {
      setLoading(false);
    }
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
          <label>Seleziona una data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Cosa vuoi sapere?</label>
          <textarea
            placeholder="Esempio: Riassumimi le principali notizie sulla sostenibilità ambientale in Italia"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Analisi in corso..." : "Genera riassunto"}
          </button>

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
                Articoli recuperati tramite API giornalistiche e utilizzati per generare il riassunto.
              </p>

                {sources.slice(0, 5).map((source, index) => (
                  <a
                    key={index}
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