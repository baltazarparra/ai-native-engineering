import { getCollection, getEntries, type CollectionEntry } from 'astro:content';
import type { AlternateLink, Lang } from './i18n';
import {
  defaultLang,
  getBlogHref,
  getBlogIndexAlternateLinks,
  supportedLangs,
} from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;
export type BlogReference = CollectionEntry<'references'>;

export const ENGINEERING_SERIES_KEY = 'engineering-beyond-the-prompt';
const ENGINEERING_SERIES_TOTAL = 3;

export interface BlogSeriesLink {
  title: string;
  href: string;
}

export interface BlogSeriesContext {
  key: string;
  title: string;
  order: number;
  total: number;
  previous?: BlogSeriesLink;
  next?: BlogSeriesLink;
}

function comparePosts(a: BlogEntry, b: BlogEntry): number {
  const dateOrder = b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  if (dateOrder !== 0) return dateOrder;

  if (
    a.data.series &&
    b.data.series &&
    a.data.series.key === b.data.series.key
  ) {
    const seriesOrder = a.data.series.order - b.data.series.order;
    if (seriesOrder !== 0) return seriesOrder;
  }

  return a.data.slug.localeCompare(b.data.slug);
}

function assertEngineeringSeries(posts: BlogEntry[]): void {
  const seriesPosts = posts.filter(
    (post) => post.data.series?.key === ENGINEERING_SERIES_KEY,
  );

  if (seriesPosts.length === 0) return;

  const expectedTotal = seriesPosts[0].data.series?.total;
  if (!expectedTotal) throw new Error('Engineering series total is missing.');
  if (expectedTotal !== ENGINEERING_SERIES_TOTAL) {
    throw new Error(
      `Engineering series needs ${ENGINEERING_SERIES_TOTAL} parts; found total ${expectedTotal}.`,
    );
  }

  const draftStates = new Set(seriesPosts.map((post) => post.data.draft));
  if (draftStates.size !== 1) {
    throw new Error('Engineering series must be published atomically.');
  }

  const translationKeysByOrder = new Map<number, Set<string>>();
  const publicationDatesByOrder = new Map<number, Set<number>>();

  for (const lang of supportedLangs) {
    const localized = seriesPosts.filter((post) => post.data.lang === lang);
    if (localized.length !== expectedTotal) {
      throw new Error(
        `Engineering series needs ${expectedTotal} ${lang} posts; found ${localized.length}.`,
      );
    }

    const orders = localized
      .map((post) => post.data.series?.order)
      .sort(
        (a, b) =>
          (a ?? Number.MAX_SAFE_INTEGER) - (b ?? Number.MAX_SAFE_INTEGER),
      );
    const expectedOrders = Array.from(
      { length: expectedTotal },
      (_, index) => index + 1,
    );
    if (orders.join(',') !== expectedOrders.join(',')) {
      throw new Error(`Engineering series order is invalid for ${lang}.`);
    }

    const seriesTitles = new Set(
      localized.map((post) => post.data.series?.title),
    );
    if (seriesTitles.size !== 1) {
      throw new Error(`Engineering series title is inconsistent for ${lang}.`);
    }

    for (const post of localized) {
      const series = post.data.series;
      if (!series || series.total !== expectedTotal) {
        throw new Error(
          `Engineering series total is inconsistent for ${lang}.`,
        );
      }
      if (!post.data.translationKey) {
        throw new Error(
          `Engineering series translation key is missing for ${lang}.`,
        );
      }
      const keys =
        translationKeysByOrder.get(series.order) ?? new Set<string>();
      keys.add(post.data.translationKey);
      translationKeysByOrder.set(series.order, keys);

      const dates =
        publicationDatesByOrder.get(series.order) ?? new Set<number>();
      dates.add(post.data.publishedAt.getTime());
      publicationDatesByOrder.set(series.order, dates);
    }
  }

  for (const [order, keys] of translationKeysByOrder) {
    if (keys.size !== 1) {
      throw new Error(
        `Engineering series part ${order} has mismatched translations.`,
      );
    }
  }

  const translationKeys = [...translationKeysByOrder.values()].flatMap(
    (keys) => [...keys],
  );
  if (new Set(translationKeys).size !== expectedTotal) {
    throw new Error('Engineering series translation keys are not unique.');
  }

  for (const [order, dates] of publicationDatesByOrder) {
    if (dates.size !== 1) {
      throw new Error(
        `Engineering series part ${order} has mismatched publication dates.`,
      );
    }
  }
}

async function assertBlogReferences(posts: BlogEntry[]): Promise<void> {
  await Promise.all(
    posts.map(async (post) => {
      const resolved = (await getEntries(post.data.references)) as Array<
        BlogReference | undefined
      >;
      if (resolved.some((reference) => !reference)) {
        throw new Error(
          `Blog references are incomplete for ${post.data.slug}.`,
        );
      }
    }),
  );
}

export async function getPublishedPosts(lang: Lang): Promise<BlogEntry[]> {
  const posts = await getCollection('blog');
  await assertBlogReferences(posts);
  assertEngineeringSeries(posts);
  return posts
    .filter((post) => post.data.lang === lang && !post.data.draft)
    .sort(comparePosts);
}

export async function getBlogReferences(
  post: BlogEntry,
): Promise<BlogReference[]> {
  return getEntries(post.data.references);
}

export async function getBlogSeriesContext(
  post: BlogEntry,
): Promise<BlogSeriesContext | undefined> {
  const series = post.data.series;
  if (!series) return undefined;

  const localized = (await getPublishedPosts(post.data.lang))
    .filter((entry) => entry.data.series?.key === series.key)
    .sort(
      (a, b) =>
        (a.data.series?.order ?? Number.MAX_SAFE_INTEGER) -
        (b.data.series?.order ?? Number.MAX_SAFE_INTEGER),
    );
  const index = localized.findIndex((entry) => entry.id === post.id);
  const previous = localized[index - 1];
  const next = localized[index + 1];

  return {
    ...series,
    previous: previous
      ? {
          title: previous.data.title,
          href: getBlogHref(post.data.lang, previous.data.slug),
        }
      : undefined,
    next: next
      ? {
          title: next.data.title,
          href: getBlogHref(post.data.lang, next.data.slug),
        }
      : undefined,
  };
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
