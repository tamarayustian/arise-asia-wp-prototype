import { defineMiddleware } from "astro:middleware";

const LOCALES = ["en", "id", "zh-TW"];

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const firstSegment = pathname.split("/")[1];
  if (LOCALES.includes(firstSegment)) {
    return next();
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_astro/") ||
    pathname.includes(".")
  ) {
    return next();
  }

  return context.redirect(`/en${pathname}`, 302);
});
