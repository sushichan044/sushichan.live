import { handle } from "@astrojs/cloudflare/handler";

import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: Env }>();

app.use(logger())

app.all("*", async (c) => {
  return await handle(c.req.raw, c.env, c.executionCtx);
});

export default app;
