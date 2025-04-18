import { sequence, defineMiddleware } from "astro:middleware";

const redirectIfNotFound = defineMiddleware(async (c, next) => {
  const res = await next();

  console.log("From Middleware", res.status);

  if (res.status === 404) {
    return c.rewrite("/404");
  }

  return res;
});

export const onRequest = sequence(redirectIfNotFound);
