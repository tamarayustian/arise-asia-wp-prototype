const WP_BASE = process.env.WP_API_URL || 'http://localhost:8080';
const WP_API = `${WP_BASE}/?rest_route=/wp/v2`;

const localeToPolylang: Record<string, string> = {
  en: 'en',
  id: 'id',
  'zh-TW': 'zh',
};

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  acf?: Record<string, unknown>;
}

function langParam(locale?: string): string {
  const slug = locale ? localeToPolylang[locale] : undefined;
  return slug ? `&lang=${slug}` : '';
}

export async function getPosts(locale?: string): Promise<WPPost[]> {
  const res = await fetch(`${WP_API}/posts${langParam(locale)}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPost(slug: string, locale?: string): Promise<WPPost> {
  const res = await fetch(`${WP_API}/posts&slug=${slug}${langParam(locale)}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const posts = await res.json();
  return posts[0];
}
