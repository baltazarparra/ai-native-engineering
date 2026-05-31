import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;

/** Meta description soft cap (~160 chars). */
export const BLOG_META_DESC_MAX = 160;

export function trimMetaDescription(raw: string): string {
  const t = raw.trim().replace(/\s+/g, ' ');
  if (t.length <= BLOG_META_DESC_MAX) return t;
  return `${t.slice(0, BLOG_META_DESC_MAX - 1)}…`;
}

function assertUniqueSlugs(posts: BlogEntry[]): void {
  const seen = new Map<string, string>();
  for (const post of posts) {
    const slug = post.data.slug;
    const prev = seen.get(slug);
    if (prev !== undefined) {
      throw new Error(
        `Duplicate blog slug "${slug}" (${prev} and ${post.id})`,
      );
    }
    seen.set(slug, post.id);
  }
}

export function sortBlogPosts(posts: BlogEntry[]): BlogEntry[] {
  return [...posts].sort((a, b) => {
    const at = a.data.publishedAt.getTime();
    const bt = b.data.publishedAt.getTime();
    if (bt !== at) return bt - at;
    return a.data.title.localeCompare(b.data.title, 'pt-BR');
  });
}

export async function getPublishedBlogPosts(
  lang: Lang = 'pt-BR',
): Promise<BlogEntry[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => !data.draft && data.lang === lang,
  );
  assertUniqueSlugs(posts);
  return sortBlogPosts(posts);
}

export async function getBlogPostBySlug(
  slug: string,
  lang: Lang = 'pt-BR',
): Promise<BlogEntry | undefined> {
  const normalized = slug.trim();
  if (!normalized) return undefined;

  const matches = await getCollection(
    'blog',
    ({ data }) =>
      !data.draft && data.lang === lang && data.slug === normalized,
  );

  if (matches.length === 0) return undefined;
  if (matches.length > 1) {
    throw new Error(
      `Multiple published blog posts share slug "${normalized}"`,
    );
  }
  return matches[0];
}
