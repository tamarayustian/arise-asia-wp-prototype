import { localeToPolylang } from "./constants";

const WP_BASE = process.env.WP_API_URL || "http://localhost:8080";
const WP_API = `${WP_BASE}/?rest_route=/wp/v2`;

function langParam(locale?: string): string {
  const slug = locale ? localeToPolylang[locale] : undefined;
  return slug ? `&lang=${slug}` : "";
}

export async function wpFetch<T>(
  endpoint: string,
  locale?: string,
): Promise<T> {
  const url = `${WP_API}${endpoint}${langParam(locale)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}
