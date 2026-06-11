const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

export async function getNewsSummary(message, date) {
  const response = await fetch(`${API_URL}/api/news-summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      date
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Errore durante la richiesta al server");
  }

  return data;
}