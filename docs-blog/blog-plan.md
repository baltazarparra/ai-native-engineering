# blog-plan.md: Local MDX blog (SSG)

Read `AGENTS.md` before implementation and follow repository conventions. This file is harness documentation (**English**). Blog post copy may follow the site locale (PT-BR primary).

---

## Product summary

The **`/blog`** section is a **static Astro** slice of the site. Posts live as **MDX files** in `src/content/blog/` with validated frontmatter. There is **no custom backend**, **no Notion API**, and **no build-time secrets** for the blog.

---

## Stack

**Astro + TypeScript + MDX + Content Collections + CSS Modules.**

- Posts: `src/content/blog/*.mdx`
- Schema: `src/content.config.ts` → collection `blog`
- Helpers: `src/lib/blog.ts`
- Routes: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`
- Feed: `src/pages/rss.xml.ts` (`@astrojs/rss`)

---

## Post frontmatter contract

| Field         | Type     | Notes                                      |
| ------------- | -------- | ------------------------------------------ |
| title         | string   | Display title                              |
| slug          | string   | URL segment; unique among published posts  |
| summary       | string   | Card / meta description                    |
| publishedAt   | date     | Listing sort (newest first)                |
| updatedAt     | date?    | Optional; used for article modified meta   |
| draft         | boolean  | `true` → excluded from site and RSS        |
| lang          | enum     | `pt-BR` \| `en` (blog routes PT-only for now) |
| tags          | string[] | Optional; shown on cards and post header   |
| cover         | string?  | Path under `public/` or absolute HTTPS URL |

Example:

```mdx
---
title: "My post"
slug: "my-post"
summary: "Short summary."
publishedAt: 2026-05-29
draft: false
lang: "pt-BR"
tags: ["agents"]
cover: "/images/blog/my-post.png"
---

Body in Markdown/MDX…
```

---

## Routes

| Route           | Behavior                                      |
| --------------- | --------------------------------------------- |
| `/blog/`        | Published posts (`draft: false`, `lang: pt-BR`) |
| `/blog/[slug]/` | One static page per slug; MDX body rendered   |
| `/rss.xml`      | RSS feed of published PT-BR posts             |

---

## Build-time rules

- Duplicate `slug` among published posts → **throw** at build.
- `draft: true` → not listed, not in `getStaticPaths`, not in RSS.
- Cover paths are resolved via `withBase()` for site-relative assets in `public/`.

---

## Publishing workflow

1. Add or edit `src/content/blog/your-slug.mdx`.
2. Set `draft: false` when ready.
3. Run `pnpm run lint` and `pnpm run build`.
4. Deploy (push to `main` → GitHub Actions).

---

## Maintenance checklist

- [ ] `/blog/` lists only non-draft PT-BR posts
- [ ] `/blog/[slug]/` renders MDX body
- [ ] Draft posts absent from list, paths, and RSS
- [ ] `pnpm run lint` and `pnpm run build` pass
- [ ] `/rss.xml` returns valid feed
- [ ] Core routes unchanged: `/`, `/sessions/glossario/`, etc.
