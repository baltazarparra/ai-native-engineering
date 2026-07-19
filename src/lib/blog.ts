import { getCollection, type CollectionEntry } from 'astro:content';
import type { AlternateLink, Lang } from './i18n';
import {
  defaultLang,
  getBlogHref,
  getBlogIndexAlternateLinks,
  supportedLangs,
} from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(lang: Lang): Promise<BlogEntry[]> {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => post.data.lang === lang && !post.data.draft)
    .sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
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

export async function getPostByTranslationKey(
  lang: Lang,
  translationKey: string,
): Promise<BlogEntry | undefined> {
  const posts = await getCollection('blog');
  const post = posts.find(
    (entry) =>
      entry.data.lang === lang &&
      entry.data.translationKey === translationKey &&
      !entry.data.draft,
  );
  return post;
}

export async function getBlogAlternateLinks(
  translationKey: string,
): Promise<AlternateLink[]> {
  const links: AlternateLink[] = [];

  for (const lang of supportedLangs) {
    const post = await getPostByTranslationKey(lang, translationKey);
    if (post) {
      links.push({ lang, href: getBlogHref(lang, post.data.slug) });
    }
  }

  const defaultPost = await getPostByTranslationKey(
    defaultLang,
    translationKey,
  );

  if (defaultPost) {
    links.push({
      lang: 'x-default',
      href: getBlogHref(defaultLang, defaultPost.data.slug),
    });
  }

  return links;
}

export async function getBlogPostAlternateLinks(
  post: BlogEntry,
): Promise<AlternateLink[]> {
  const indexLinks = getBlogIndexAlternateLinks();

  if (!post.data.translationKey) {
    return indexLinks;
  }

  const pairLinks = await getBlogAlternateLinks(post.data.translationKey);
  const pairByLang = new Map(
    pairLinks
      .filter((link): link is AlternateLink & { lang: Lang } =>
        supportedLangs.includes(link.lang as Lang),
      )
      .map((link) => [link.lang, link.href]),
  );

  return indexLinks.map((link) => {
    if (link.lang === 'x-default') {
      return {
        ...link,
        href: pairByLang.get(defaultLang) ?? link.href,
      };
    }

    const postHref = pairByLang.get(link.lang as Lang);
    return postHref ? { ...link, href: postHref } : link;
  });
}
