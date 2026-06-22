import type { WPPage } from '../types';
import { wpFetch } from '../wordpress';

export async function getPages(locale?: string): Promise<WPPage[]> {
  return wpFetch<WPPage[]>('/pages', locale);
}

export async function getPage(slug: string, locale?: string): Promise<WPPage> {
  const pages = await wpFetch<WPPage[]>(`/pages&slug=${slug}`, locale);
  return pages[0];
}
