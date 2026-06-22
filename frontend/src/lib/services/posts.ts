import type { WPPost } from "../types";
import { wpFetch } from "../wordpress";

export async function getPosts(locale?: string): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", locale);
}

export async function getPost(slug: string, locale?: string): Promise<WPPost> {
  const posts = await wpFetch<WPPost[]>(`/posts&slug=${slug}`, locale);
  return posts[0];
}
