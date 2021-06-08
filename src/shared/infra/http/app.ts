import "reflect-metadata";
import "dotenv/config";
import "../../container";
import "../../container/provider";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import uploadConfig from "@config/uploads.ts/upload.config";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import AppError from "../../errors/AppError";
import rateLimiter from "./middlewares/rateLimiter";
import routes from "./routes";

createConnection();
const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
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

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/avatar", express.static(`${uploadConfig.dest}/avatar`));
app.use("/cars", express.static(`${uploadConfig.dest}/cars`));

app.use(cors());
app.use(routes);

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 429 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ error: error.message });
    }
    return response
      .status(500)
      .json({ error: `Internal server error - ${error.message}` });
  }
);

export { app };
