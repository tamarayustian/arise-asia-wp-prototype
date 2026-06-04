const WP_BASE = 'http://localhost:8080';
const WP_API = `${WP_BASE}/?rest_route=/wp/v2`;

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
}

export async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPost(slug: string): Promise<WPPost> {
  const res = await fetch(`${WP_API}/posts&slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const posts = await res.json();
  return posts[0];
}
