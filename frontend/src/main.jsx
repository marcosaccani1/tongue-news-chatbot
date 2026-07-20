import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const appEnvironment =
  import.meta.env.VITE_APP_ENV || import.meta.env.MODE;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: appEnvironment,
    sendDefaultPii: false,
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);