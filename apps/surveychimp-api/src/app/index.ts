import * as express from 'express';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import {  handleGlobalErrors } from '@surveychimp/surveychimp-lib';
import surveyRouter from './routes/surveyRouter';

const app = express();

Sentry.init({
    dsn: "https://967dc9d337aa4acfb480e6243cb985f7@o4504162624339968.ingest.sentry.io/4504162691842048",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Required to parse json body
app.use(express.json());

//Routers
app.use(surveyRouter);

app.use(Sentry.Handlers.errorHandler());

//Global error handler
app.use(handleGlobalErrors);

export default app;