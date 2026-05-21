# Phase completion report: Blog B3 — Listing page and PostCard

**Phase:** Blog implementation Phase B3 (see [blog-plan.md](../blog-plan.md)).  
**PRD:** [prd-blog/phase3.md](../prd-blog/phase3.md).  
**Depends on:** Phase B2 — [`prd-blog/phase2.md`](../prd-blog/phase2.md), [`src/lib/notion.ts`](../../src/lib/notion.ts) (`getPosts()`).  
**Harness context:** [AGENTS.md](../../AGENTS.md), [PLAN.md](../../PLAN.md), [README.md](../../README.md).

---

## Summary

Phase B3 introduced the first public blog surface: **`/blog/`** is generated at **build time** by calling **`await getPosts()`** in [`src/pages/blog/index.astro`](../../src/pages/blog/index.astro). Each Published post renders as **`PostCard`**, linking to **`blog/{slug}`** paths via **`withBase`**. Listing uses a **vertical stack** (`role="list"`), **`pt-BR`** layout copy, **`pt-BR`** long-form dates (or muted **Sem data**), **CSS line-clamp** on summaries (no truncation in **`notion.ts`**), and **omits the cover band** when **`coverUrl`** is absent. An **explicit empty state** renders when **`getPosts()`** returns **`[]`** without swallowing **`getPosts()`** errors into a fake-empty UI.

Phase B4 detail routes are **not** part of this phase; clicking a card may **404** until **`/blog/[slug]/`** ships.

---

## Files created or changed

| Path | Change |
|------|--------|
| [`src/pages/blog/index.astro`](../../src/pages/blog/index.astro) | **Created.** `getPosts()`, `BaseLayout` + **`lang="pt-BR"`**, `Footer`, empty-post branch vs card list (`<ul>` stack). |
| [`src/pages/blog/blog-index.module.css`](../../src/pages/blog/blog-index.module.css) | **Created.** Listing stack spacing, empty-state + intro typography. |
| [`src/components/blog/PostCard.astro`](../../src/components/blog/PostCard.astro) | **Created.** Card link → **`withBase(\`blog/${encodeURIComponent(slug)}\`)`**; cover **`img`** when **`coverUrl`** set; **`alt={title}`** on image. |
| [`src/components/blog/PostCard.module.css`](../../src/components/blog/PostCard.module.css) | **Created.** Neo Brutalist card shell, **`line-clamp`**, **`meta`/date** muted styles. |

**Not changed (per PRD out of scope):** `src/pages/blog/[slug].astro`, `NotionBlocks`, global header/footer Discovery link to **`/blog/`** (deferred **B7**), CI secrets (**B8**), `README.md` Notion authoring guide (**B7**).

---

## Technical decisions

1. **Layout:** Multi-column grid deferred; listing is a **single-column stack** (mobile-first); matches execution plan pinning.
2. **Missing **`coverUrl`:** **Omit** the image region (documented inline in **`PostCard.astro`**); no placeholder illustration in B3.
3. **Missing **`publishedAt`:** Show muted **Sem data** (PRD default), not omission.
4. **`href` / trailing slash parity:** Compose paths like session routes (**`blog/{slug}`** under **`BASE_URL`** via **`withBase`**); aligns with **`getSessionHref`** style (no custom trailing-slash rules added in this phase).
5. **Accessibility:** **`globals.css`** `:focus-visible` outlines apply to the **`PostCard`** anchor; **`min-height`** hints at comfortable tap targets; listing uses **`role="list"`** + **`role="listitem"`** (implicit on `<li>`).
6. **Slug encoding:** **`encodeURIComponent(slug)`** in **`href`** for reserved URL characters; future B4 **`getStaticPaths`** should stay consistent with decoding expectations.

---

## How the phase was validated

1. **`pnpm run lint`** — exit **`0`**.
2. **`pnpm run build`** — exit **`0`** (static **`/blog/`** emitted; **`getPosts()`** invoked during prerender — requires valid **`NOTION_*`** in local **`.env`** or CI secrets when exercised).
3. **`rg "@notionhq/client" src`** — only **`src/lib/notion.ts`** consumes the SDK (**B2/B3 invariant** review).
4. **No **`notion`** imports paired with **`client:*`** hydration** — blog route is Astro-only SSR/build context.

Recommended **manual** follow-ups aligned with PRD manual validation checklist: **`pnpm run preview`** on **`/blog/`**, Draft-vs-Published spot check, Cover present/absent matrix, narrow viewport tap targets, deliberate empty DB exercise (temporary flip to Draft) if not already exercised.

---

## PRD criteria satisfied

Reference: [prd-blog/phase3.md](../prd-blog/phase3.md) §Acceptance criteria (1–8).

| # | Criterion | Satisfied |
|---|-----------|-----------|
| 1 | **`index.astro`** **`await getPosts()`**, listing vs empty | Yes |
| 2 | **`PostCard.astro`** + module CSS map **`BlogPostSummary`** visibly | Yes |
| 3 | Zero Published → build succeeds + honest empty shell | Intended (implement empty branch + no catch-around **`getPosts()`**); validate with ephemeral Notion tweak if unsure |
| 4 | Card **`href`** via **`withBase`** → **`blog/{slug}`** | Yes |
| 5 | Draft never appears (delegated **`getPosts()`**) | Yes by contract—spot-check in Notion when convenient |
| 6 | **`@notionhq/client`** only **`notion.ts`**; **`notion.ts`** never from **`client:*`** bundles | Yes |
| 7 | Lint clean | Yes at validation time |
| 8 | Build clean with secrets; misconfig throws surfaced | Failures propagate from **`notion`** (no fake-empty catch) |

**PRD scope/out-of-scope:** Items marked out of **`phase3`** (detail route blocks, README, nav, CI secrets) were **not** implemented.

---

## Problems found and resolution

This phase reused known env friction from earlier troubleshooting: **`pnpm exec tsx notion-smoke.ts`** validates **`NOTION_*`** before asserting blog builds behave; contributors must **`Cmd+S`** real secrets into **`./.env`** (repo root beside **`package.json`**), never into **`.env.example`**.

(Optional environment note unrelated to artefact completeness: local validation may emit **`engines.node`** warnings when Node major exceeds **`>=22 <23`** declared in **`package.json`**. Prefer Node **22** for repository policy alignment.)

---

## Pending work or limitations for the next phase

1. **Phase B4 — Detail route (`[slug]`):** `getStaticPaths` from **`getPosts()`** slugs, **`getPostBySlug`** for body scaffolding before **`NotionBlocks`** (**B5**).
2. **404 after click:** Listing links exist before detail pages resolve—expect **temporary 404** on **`/blog/{slug}`** unless B4 merges in tandem or links are withheld.
3. **Phase B7 — Discoverability:** Add **`/blog/`** pointer from global nav/footer/README when product wants public discovery.
4. **Phase B8 — CI secrets:** Decide **fail / skip / empty blog** builds when **`NOTION_*`** missing on GitHub Actions; current B3 build **hits Notion whenever listing prerenders.**
