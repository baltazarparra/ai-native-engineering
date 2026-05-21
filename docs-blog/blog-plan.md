# blog-plan.md: Notion-powered blog (SSG)

Read `AGENTS.md` before implementation and follow repository conventions. This file is harness documentation (**English**). Blog post copy may follow the site locale (PT-BR primary).

**Contributor setup:** root [README.md](../README.md) § Blog (Notion) (Notion integration, `.env`, local build, GitHub Actions secrets).

---

## Product summary

Add a **`/blog`** section to the existing **static Astro** site. Posts live in a **Notion database** and are fetched **only at build time** (SSG). There is **no custom backend**, **no separate database server**, and **no authentication**. Notion is the source of truth for blog entries.

Secrets (`NOTION_TOKEN`, `NOTION_DATABASE_ID`) exist **only** in local env / CI secrets and must **never** appear in client bundles.

---

## Implementation status

Phases **B1–B8** are **complete**: dependency contract → `notion.ts` → listing/detail routes → `NotionBlocks` → Shiki + optimised images → site discoverability + README → CI secrets on deploy.

---

## V1 scope

### In scope

- **`/blog/`** — Published rows only, sorted by **PublishedAt** (newest first).
- **`/blog/[slug]/`** — One static page per published slug; body from Notion blocks.
- **`Draft`** — Never listed; never in `getStaticPaths`.
- **`src/lib/notion.ts`** — All `@notionhq/client` usage here; **no** `client:*` imports of this module.
- **`src/components/blog/`** — `PostCard`, `NotionBlocks`, `NotionBlockPiece`, `NotionImage`, CSS Modules + tokens.
- Block types in **Minimum Notion block support** (below).

### Out of scope (for now)

- Custom CMS replacing Notion
- Auth or on-site draft preview
- Runtime API routes for blog reads
- Comments, reactions, subscriptions, RSS
- **`/en/blog/`** unless rescoped
- Migrating curriculum sessions into Notion

---

## Stack

**Astro + TypeScript + MDX + React islands (selective) + CSS Modules.** Blog pages are `.astro` and call Notion during **`astro build`** only. Dependencies include `@notionhq/client`, `shiki` (code highlighting), `sharp` (image pipeline).

---

## Notion database contract

| Property      | Notion type   | Notes                                      |
| ------------- | ------------- | ------------------------------------------ |
| Title         | Title         | Display title                              |
| Slug          | Rich text     | URL segment; unique among published posts |
| Status        | Select        | `Published` \| `Draft`                     |
| PublishedAt   | Date          | Sort key for listing                       |
| Summary       | Rich text     | Card / meta description                    |
| Cover         | Files or URL  | Optional hero image                        |

Environment variables (see `.env.example`):

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

---

## Routes

| Route           | Behavior                                      |
| --------------- | --------------------------------------------- |
| `/blog/`        | Published posts; `getPosts()` at build time   |
| `/blog/[slug]/` | Published post; `getPostBySlug()` + blocks    |

---

## `src/lib/notion.ts`

- **`getPosts()`** — Published rows only; sort by **PublishedAt**; map to `BlogPostSummary`.
- **`getPostBySlug(slug)`** — Published match only; fetch block tree with pagination/recursion.

**Build-time rules (implemented):**

- Empty slug on a Published row → **throw**.
- Duplicate slug among Published rows → **throw**.
- Missing **PublishedAt** → sort last (stable tie-break by title).

---

## Pages and components

| Artifact | Purpose |
| -------- | ------- |
| `src/pages/blog/index.astro` | Listing |
| `src/pages/blog/[slug].astro` | Detail; `getStaticPaths` from published slugs |
| `src/components/blog/PostCard.astro` | Card → `withBase('blog/{slug}')` |
| `src/components/blog/NotionBlocks.astro` | Block tree renderer |
| `src/lib/notion-rich-text.ts` | `notionRichPlain` / minimal inline HTML |

Site chrome: **`BaseLayout`**, **`Footer`** (blog link), PT-BR home blog CTA — see `getBlogHref()` in `src/lib/i18n.ts`.

---

## Minimum Notion block support

| Block | Rendering |
| ----- | ----------- |
| `paragraph`, `heading_1–3` | Plain / inline rich text (`h2–h4` for headings; page `h1` = title) |
| `bulleted_list_item`, `numbered_list_item` | Grouped lists; nested `children` via `Astro.self` |
| `code` | Build-time **Shiki** (`github-light`) |
| `image` | **Astro `<Image />`** when host allowlisted; else warn + `<img>` fallback |
| `quote`, `divider` | Semantic markup + tokens |
| Other types | Visible PT-BR unsupported marker with `block.type` |

Paragraphs that are **entirely inline code** in Notion are highlighted like code blocks. Use Notion **`/code`** blocks for multi-line syntax highlighting.

Remote image hosts: `astro.config.mjs` → `image.remotePatterns` (Notion / AWS / CloudFront). Rebuild after content changes; signed URLs may expire until redeploy.

---

## GitHub Pages and CI

Production deploy: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) on **`push` to `main`** and **`workflow_dispatch`**.

- Build job passes **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** from GitHub Actions secrets.
- Uses **pnpm** and **`pnpm run build`** (aligned with `pnpm-lock.yaml`).
- **Missing secrets on `main` → build fails** (no silent empty blog).
- Fork workflows do not receive upstream secrets; use local `.env` for blog development.

Details: README § Blog (Notion) → **CI / GitHub Actions**.

---

## Maintenance checklist

- [ ] `/blog/` lists **only** Published posts
- [ ] `/blog/[slug]/` renders blocks (or summary fallback when body empty)
- [ ] Draft rows absent from list and static paths
- [ ] `pnpm run lint` and `pnpm run build` pass (local `.env` or CI secrets)
- [ ] No `NOTION_*` literals in client bundles (`dist/` spot check)
- [ ] Core routes unchanged: `/`, `/sessions/glossario/`, etc.
