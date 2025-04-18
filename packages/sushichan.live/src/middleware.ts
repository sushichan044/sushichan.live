import { sequence, defineMiddleware } from "astro:middleware";

const redirectIfNotFound = defineMiddleware(async (c, next) => {
  const res = await next();

  if (c.url.pathname !== "/404" && res.status === 404) {
    console.log("Redirecting to 404 page");
    return c.rewrite("/404");
  }

  return res;
});

export const onRequest = sequence(redirectIfNotFound);
