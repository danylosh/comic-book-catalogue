import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { ENV } from "./env.server";
import { auth } from "./services";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: ENV.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", async (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("OK");
});

import { serve } from "@hono/node-server";

const port = Number(process.env.PORT ?? 3002);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
