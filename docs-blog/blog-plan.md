# blog-plan.md: Notion-powered blog (SSG)

Read `AGENTS.md` before implementation and follow repository conventions. This file is harness documentation (**English**). Blog post copy may follow the site locale (PT-BR primary).

---

## Product summary

Add a **`/blog`** section to the existing **static Astro** site. Posts live in a **Notion database** and are fetched **only at build time** (SSG). There is **no custom backend**, **no separate database server**, and **no authentication**. Notion is the source of truth for blog entries.

Secrets (`NOTION_TOKEN`, `NOTION_DATABASE_ID`) exist **only** in local env / CI secrets and must **never** appear in client bundles.

---

## V1 scope (exact)

### In scope

- **`/blog/`** — Lists rows where Notion **Status** is **Published**, ordered by **PublishedAt** (newest first; tie-break if dates missing must be defined).
- **`/blog/[slug]/`** — One static page per published slug; full body rendered from Notion blocks.
- **`Draft`** rows — Never listed and never generate static paths.
- **`src/lib/notion.ts`** — All `@notionhq/client` usage centralized here; **no** imports from `client:*` islands.
- **`src/components/blog/`** — `PostCard`, `NotionBlocks`, plus `*.module.css` using existing design tokens (no Tailwind, no styled-components).
- Block types listed in **Minimum Notion block support** (below).
- **`README.md`** — How to create the Notion DB, properties, integration token, `.env`, and build.

### Out of scope for V1

See **Out of scope (for now)** at the end.

---

## Initial stack (single direction)

**Keep the repo stack:** **Astro + TypeScript + MDX + Content Collections + React islands + CSS Modules** (`AGENTS.md`). Blog pages are **`.astro`** pages that call Notion **during `astro build`** only.

**Add one dependency:** `@notionhq/client`.

### Why this stack

- The site is already Astro-first and content-oriented; adding a parallel “blog CMS” server would contradict GitHub Pages static hosting.
- Notion replaces a backend **as an authoring DB + API**, while the shipped site stays static HTML.
- CSS Modules + tokens keeps the blog visually aligned with Neo Brutalism rules without new styling systems.

---

## Notion database contract

| Property      | Notion type   | Notes                                      |
| ------------- | ------------- | ------------------------------------------ |
| Title         | Title         | Display title                              |
| Slug          | Rich text     | URL segment; unique among published posts |
| Status        | Select        | `Published` \| `Draft`                     |
| PublishedAt   | Date          | Sort key for listing                       |
| Summary       | Rich text     | Card / meta description                    |
| Cover         | Files or URL  | Hero image when present                    |

Environment variables (document in `.env.example`):

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

---

## Routes

| Route             | Behavior                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| `/blog/`          | Published posts only; sorted by `PublishedAt` descending                 |
| `/blog/[slug]/`   | Published post only; body from Notion blocks                             |

---

## `src/lib/notion.ts` responsibilities

- **`getPosts()`** — Query database; filter `Status === Published`; map to typed posts; sort; paginate API responses if the DB exceeds one page.
- **`getPostBySlug(slug)`** — Resolve **published** page by slug; fetch block children (paginate/recurse as needed); return metadata + blocks for rendering.

**Implementation must resolve:**

- Missing **Slug** or **duplicate slug** among published rows → fail build loudly **or** exclude unsafe rows (pick one and document).
- Missing **PublishedAt** → stable fallback (e.g. sort last).

---

## Pages and components

| Artifact                         | Purpose                                       |
| -------------------------------- | --------------------------------------------- |
| `src/pages/blog/index.astro`     | Listing; calls `getPosts()` at build time    |
| `src/pages/blog/[slug].astro`    | Detail; `getStaticPaths` from published only |
| `src/components/blog/PostCard.astro` | Listing card + module CSS               |
| `src/components/blog/NotionBlocks.astro` | Block tree → markup + module CSS   |

Use existing **`BaseLayout.astro`** (or equivalent) for shared chrome unless a minimal blog-only wrapper is explicitly justified.

---

## Minimum Notion block support

- `paragraph`
- `heading_1`, `heading_2`, `heading_3`
- `bulleted_list_item`, `numbered_list_item` (minimum: one nesting level acceptable)
- `code` — Highlight **only if** the project already has a highlighter; else `<pre><code>` + follow-up
- `image` — Prefer Astro `<Image />` when remote config allows; else documented `<img>` fallback
- `quote`, `divider`

---

## Release validation checklist

- [ ] `/blog/` lists **only** Published posts.
- [ ] `/blog/[slug]/` renders full content for a published post.
- [ ] Draft never appears in list or static paths.
- [ ] `npm run build` and `npm run lint` pass without new unjustified warnings.
- [ ] Smoke test: `/`, `/sessions/glossario/`, `/sessions/ferramentas/`, `/sessions/maturidade/` unchanged in behavior.
- [ ] No `NOTION_*` strings in client bundles (grep / inspect build output).

---

## GitHub Pages note

Production builds run in **GitHub Actions**. If the workflow invokes Notion:

- Store **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** as **encrypted repository secrets**.
- If secrets are absent (forks, optional jobs), define explicit behavior: **fail blog build**, **skip blog pages**, or **build empty blog** — pick one and document it in `README.md` and in Phase B8.

Static output remains ordinary HTML/CSS/JS; nothing Notion-specific ships to browsers except public image URLs returned by the API.

---

## Implementation phases

After **every** phase: run **`npm run lint`** and **`npm run build`**; smoke existing routes above plus `/blog/` when it exists.

---

### Phase B1 — Dependency and env contract

**Objective:** Official SDK installed; env contract documented without leaking secrets.

**Deliverables**

- Add `@notionhq/client` to the project.
- Add `.env.example` with `NOTION_TOKEN` and `NOTION_DATABASE_ID` (empty placeholders).

**Acceptance criteria**

- Clean install; lockfile updated if the repo uses one.
- `.env.example` committed; real `.env` gitignored.

**Manual validation**

- `npm ci` / `npm install` succeeds.

**Risks**

- Token committed by mistake → mitigate via `.gitignore` review.

**Open decisions**

- None.

---

### Phase B2 — Notion module

**Objective:** Single module encapsulates all API access used by blog pages.

**Deliverables**

- `src/lib/notion.ts`: client creation from env vars; `getPosts()`; `getPostBySlug()` with Published-only filtering; pagination for database query and block children as needed.

**Acceptance criteria**

- With valid `.env`, local build returns correct published list and blocks for one slug.
- No `client:*` component imports this file.

**Manual validation**

- Temporarily log counts during dev build or use one-off script (removed before merge if noisy).

**Risks**

- Notion rate limits on large builds → paginate; cache minimally if needed later.

**Open decisions**

- Duplicate slug strategy (fail vs exclude).

---

### Phase B3 — Listing page and PostCard

**Objective:** `/blog/` renders from `getPosts()`.

**Deliverables**

- `src/pages/blog/index.astro`
- `src/components/blog/PostCard.astro` + `PostCard.module.css`

**Acceptance criteria**

- Empty DB shows an honest empty state (no crash).
- Cards link to `/blog/[slug]/` using Notion slug field.

**Manual validation**

- Visual check mobile + desktop; focus visible on interactive elements.

**Risks**

- Missing cover URL handling → placeholder or omit gracefully.

**Open decisions**

- Date formatting locale (match site locale).

---

### Phase B4 — Detail route and static paths

**Objective:** One HTML file per published post at build time.

**Deliverables**

- `src/pages/blog/[slug].astro` with `getStaticPaths()` driven by `getPosts()` slugs only.
- Load full post via `getPostBySlug`.

**Acceptance criteria**

- Draft rows never produce paths.
- Unknown slug → Astro 404 behavior consistent with site config.

**Manual validation**

- `npm run build` then `npm run preview`; open several slugs.

**Risks**

- `base` / trailing slash mismatch on Pages → align with existing `astro.config`.

**Open decisions**

- Whether trailing slashes match existing session URLs.

---

### Phase B5 — NotionBlocks MVP

**Objective:** Render core block types for readable articles.

**Deliverables**

- `src/components/blog/NotionBlocks.astro` + module CSS implementing minimum block list.

**Acceptance criteria**

- Reference post in Notion renders headings, paragraphs, lists, quote, divider without throwing.

**Manual validation**

- Compare Notion UI vs built page side-by-side.

**Risks**

- Rich unsupported blocks ignored silently vs visible “unsupported” marker — prefer documented behavior.

**Open decisions**

- Policy for unsupported block types.

---

### Phase B6 — Code and images

**Objective:** Code and images look acceptable and stay performant.

**Deliverables**

- Code: reuse existing highlighter if present; else semantic code block.
- Images: Astro `<Image />` where allowed; document `domains`/remote patterns in Astro config if required.

**Acceptance criteria**

- Sample post with fenced code + image builds cleanly.

**Manual validation**

- Lighthouse spot check on one blog URL (optional, quick).

**Risks**

- Remote Notion image URLs vs Astro image optimization constraints.

**Open decisions**

- Width/height strategy for arbitrary remote images.

---

### Phase B7 — Navigation + README

**Objective:** Blog is discoverable and reproducible for contributors.

**Deliverables**

- Link `/blog/` from existing global navigation/footer pattern (same tokens/components).
- README section: Notion DB setup, bot/integration token, property types, copying database ID, `.env`, local build.

**Acceptance criteria**

- New contributor can follow README only and see posts locally with valid secrets.

**Manual validation**

- Ask someone else or simulate fresh clone + README steps.

**Risks**

- Internal-only Notion workspace blocks contributors → document sharing minimal template DB optional.

**Open decisions**

- Optional public template duplicate of the DB for demos.

---

### Phase B8 — CI secrets policy

**Objective:** GitHub Actions behavior is explicit and safe.

**Deliverables**

- Workflow documents required secrets for blog-enabled builds **or** conditional skip/fail path per **GitHub Pages note**.
- No plaintext tokens in YAML.

**Acceptance criteria**

- Push to default branch yields green CI **or** documented intentional skip with empty blog.

**Manual validation**

- Test workflow on branch / fork behavior per documented policy.

**Risks**

- Fork PRs cannot use secrets → document expectation.

**Open decisions**

- Fail vs skip when secrets missing.

---

## Out of scope (for now)

- Custom CMS replacing Notion for the blog
- Any database other than Notion for blog source data
- Authentication or drafts preview on the site
- Server-side rendering / runtime API routes for blog reads (must remain build-time for this plan)
- Comments, reactions, subscriptions
- Migrating curriculum sessions from Content Collections into Notion (unless explicitly rescoped later)
- New animation libraries beyond `AGENTS.md` rules

---

## Honest refinement note

This plan is executable but **depends on Notion availability and tokens during build**. If CI secrets are missing, the shipped blog may be empty or builds may fail—**Phase B8** must lock that decision intentionally rather than accidentally.
