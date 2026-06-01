import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(lang: Lang): Promise<BlogEntry[]> {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => post.data.lang === lang && !post.data.draft)
    .sort(
      (a, b) =>
        b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export async function getPostBySlug(
  lang: Lang,
  slug: string,
): Promise<BlogEntry | undefined> {
  const posts = await getCollection('blog');
  const post = posts.find(
    (entry) => entry.data.lang === lang && entry.data.slug === slug,
  );
  if (!post || post.data.draft) return undefined;
  return post;
}
