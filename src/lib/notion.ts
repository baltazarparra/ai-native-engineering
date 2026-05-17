/**
 * Build-time Notion API access for the blog feature (Phase B2).
 * Property names MUST match docs-blog/blog-plan.md (Title, Slug, Status, PublishedAt, Summary, Cover).
 * Do not import this module from React islands or client:* hydrated components.
 */

import { Client, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";

function env(key: string): string | undefined {
  try {
    const fromMeta = import.meta.env[key];
    if (typeof fromMeta === "string" && fromMeta.trim()) return fromMeta.trim();
  } catch {
    /* import.meta.env unavailable */
  }
  if (typeof process !== "undefined") {
    const v = process.env[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function requiredEnv(key: string): string {
  const value = env(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

let notionClient: Client | null = null;

function getClient(): Client {
  if (!notionClient) {
    notionClient = new Client({ auth: requiredEnv("NOTION_TOKEN") });
  }
  return notionClient;
}

function getDatabaseId(): string {
  return requiredEnv("NOTION_DATABASE_ID");
}

/**
 * `@notionhq/client` v5 queries rows via dataSources.query, not databases.query.
 * `NOTION_DATABASE_ID` remains the database UUID from the URL; we resolve its primary data source once per process.
 */
let cachedBlogDataSourceId: string | null = null;

async function getBlogDataSourceId(): Promise<string> {
  if (cachedBlogDataSourceId) return cachedBlogDataSourceId;

  const client = getClient();
  const databaseId = getDatabaseId();
  const db = await client.databases.retrieve({ database_id: databaseId });

  if (!("data_sources" in db)) {
    throw new Error(
      `Notion database ${databaseId}: retrieve returned no data_sources (partial response?)`,
    );
  }
  const sources = db.data_sources;
  if (!sources?.length) {
    throw new Error(`Notion database ${databaseId}: empty data_sources — cannot query posts`);
  }

  cachedBlogDataSourceId = sources[0].id;
  return cachedBlogDataSourceId;
}

function plainRichText(items: RichTextItemResponse[]): string {
  return items.map((t) => t.plain_text).join("");
}

function readTitle(page: PageObjectResponse): string {
  const p = page.properties.Title;
  if (!p || p.type !== "title") {
    throw new Error(`Notion page ${page.id}: expected Title as title property`);
  }
  return plainRichText(p.title).trim();
}

function readSlug(page: PageObjectResponse): string {
  const p = page.properties.Slug;
  if (!p || p.type !== "rich_text") {
    throw new Error(`Notion page ${page.id}: expected Slug as rich_text property`);
  }
  return plainRichText(p.rich_text).trim();
}

function readSummary(page: PageObjectResponse): string {
  const p = page.properties.Summary;
  if (!p || p.type !== "rich_text") {
    throw new Error(`Notion page ${page.id}: expected Summary as rich_text property`);
  }
  return plainRichText(p.rich_text).trim();
}

function readPublishedAt(page: PageObjectResponse): Date | null {
  const p = page.properties.PublishedAt;
  if (!p || p.type !== "date") {
    throw new Error(`Notion page ${page.id}: expected PublishedAt as date property`);
  }
  const start = p.date?.start;
  if (!start) return null;
  const d = new Date(start);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Notion page ${page.id}: invalid PublishedAt date`);
  }
  return d;
}

function readCoverUrl(page: PageObjectResponse): string | null {
  const p = page.properties.Cover;
  if (!p) return null;
  if (p.type !== "files") {
    throw new Error(`Notion page ${page.id}: expected Cover as files property`);
  }
  const first = p.files[0];
  if (!first) return null;
  if (first.type === "external") return first.external.url;
  if (first.type === "file") return first.file.url;
  return null;
}

function mapPageToSummary(page: PageObjectResponse): BlogPostSummary {
  const slug = readSlug(page);
  if (!slug) {
    throw new Error(
      `Notion page ${page.id}: Published row has empty Slug after trim — fix in Notion`,
    );
  }
  return {
    id: page.id,
    title: readTitle(page),
    slug,
    publishedAt: readPublishedAt(page),
    summary: readSummary(page),
    coverUrl: readCoverUrl(page),
  };
}

/** Listing / static paths — Phase B3+. */
export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  publishedAt: Date | null;
  summary: string;
  coverUrl: string | null;
}

/** Nested blocks for Phase B5 NotionBlocks — preserves tree via optional children. */
export type BlogBlockWithChildren = BlockObjectResponse & {
  children?: BlogBlockWithChildren[];
};

export interface BlogPostDetail extends BlogPostSummary {
  blocks: BlogBlockWithChildren[];
}

function sortPosts(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort((a, b) => {
    const at = a.publishedAt?.getTime();
    const bt = b.publishedAt?.getTime();
    const aHas = at !== undefined && !Number.isNaN(at);
    const bHas = bt !== undefined && !Number.isNaN(bt);
    if (aHas && bHas && at !== undefined && bt !== undefined) {
      if (bt !== at) return bt - at;
      return a.title.localeCompare(b.title, "en");
    }
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return a.title.localeCompare(b.title, "en");
  });
}

function assertUniqueSlugs(posts: BlogPostSummary[]): void {
  const seen = new Map<string, string>();
  for (const p of posts) {
    const prev = seen.get(p.slug);
    if (prev !== undefined) {
      throw new Error(
        `Duplicate blog slug "${p.slug}" among Published pages (ids ${prev} and ${p.id})`,
      );
    }
    seen.set(p.slug, p.id);
  }
}

async function fetchBlockChildrenTree(blockId: string): Promise<BlogBlockWithChildren[]> {
  const client = getClient();
  const nodes: BlogBlockWithChildren[] = [];
  let cursor: string | undefined;

  do {
    const res = await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const item of res.results) {
      if (!("type" in item)) continue;
      const block = item as BlockObjectResponse;
      const node = block as BlogBlockWithChildren;
      if (block.has_children) {
        node.children = await fetchBlockChildrenTree(block.id);
      }
      nodes.push(node);
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return nodes;
}

/**
 * All Published rows in the configured database, newest PublishedAt first.
 * Throws if any Published row lacks slug text or duplicate slugs exist.
 */
export async function getPosts(): Promise<BlogPostSummary[]> {
  const client = getClient();
  const dataSourceId = await getBlogDataSourceId();
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await client.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      start_cursor: cursor,
    });

    for (const row of res.results) {
      if (isFullPage(row)) pages.push(row);
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  const summaries = pages.map(mapPageToSummary);
  assertUniqueSlugs(summaries);
  return sortPosts(summaries);
}

/**
 * Published post by slug, or null if not found / empty slug input.
 * Draft rows never match (filtered by Status in query).
 * Throws if more than one Published row shares the slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const normalized = slug.trim();
  if (!normalized) return null;

  const client = getClient();
  const dataSourceId = await getBlogDataSourceId();

  const res = await client.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: "Status", select: { equals: "Published" } },
        { property: "Slug", rich_text: { equals: normalized } },
      ],
    },
  });

  const matchPages = res.results.filter(isFullPage);

  if (matchPages.length === 0) return null;
  if (matchPages.length > 1) {
    throw new Error(
      `Multiple Published pages share slug "${normalized}" (${matchPages.map((p) => p.id).join(", ")})`,
    );
  }

  const page = matchPages[0];
  const summary = mapPageToSummary(page);
  const blocks = await fetchBlockChildrenTree(page.id);

  return {
    ...summary,
    blocks,
  };
}
