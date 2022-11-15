import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

Sentry.init({
    dsn: "https://4a68eaade26f4b0c81f1be2e2a712816@o4504162624339968.ingest.sentry.io/4504162649243648",
    integrations: [new BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
);
