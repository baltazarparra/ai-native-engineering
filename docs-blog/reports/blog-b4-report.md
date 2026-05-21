# Phase completion report: Blog B4 — Detail route (`/blog/[slug]/`)

**Phase:** Blog implementation Phase B4 (see [blog-plan.md](../blog-plan.md)).  
**PRD:** [prd-blog/phase4.md](../prd-blog/phase4.md).  
**Depends on:** Phase B2 ([`prd-blog/phase2.md`](../prd-blog/phase2.md)) — [`src/lib/notion.ts`](../../src/lib/notion.ts) (`getPosts`, `getPostBySlug`); Phase B3 listing + **`PostCard`**.  
**Harness context:** [AGENTS.md](../../AGENTS.md), [PLAN.md](../../PLAN.md), [README.md](../../README.md).

---

## Summary

Phase B4 adds **static HTML per Published slug** via [`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro). **`getStaticPaths`** uses **`await getPosts()`** so Draft rows never emit routes. Each page **`await getPostBySlug(slug)`** and **throws `Error`** if **`null`** (fail loud vs silent shell). **`BaseLayout`**, **`SectionBlock`**, **`Footer`**, and **`lang="pt-BR"`** mirror the listing pattern. Visible content is **title**, **published date / “Sem data”** (matching **`PostCard`**), **`summary`** as surrogate body (full **`blocks`** deferred to **`NotionBlocks`**, Phase B5), optional **`img`** hero when **`coverUrl`** exists (**`alt={title}`**), and **`Voltar ao blog`** via **`withBase('blog/')`**.

Meta **`description`** is **`trimMetaDescription(post.summary)`** (soft cap **`~160`** chars; inline comment in **`[slug].astro`** documents intent).

---

## Files created or changed

| Path | Change |
|------|--------|
| [`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro) | **Created.** **`getStaticPaths`** from **`getPosts()`**, detail fetch **`getPostBySlug`**, **`throw`** on missing post, layout + surrogate body. |
| [`src/pages/blog/blog-post.module.css`](../../src/pages/blog/blog-post.module.css) | **Created.** Hero, meta/back link, article body typography (tokens aligned with `PostCard` / Neo Brutalism). |

**Not implemented (Phase B5+):** **`NotionBlocks`**, optimised remote images (**B6**), README authoring (**B7**), CI **`NOTION_*`** policy (**B8**).

---

## Technical decisions

1. **`getPostBySlug` at render (not Props):** One **`notion.ts`** fetch per Published page at build time (**`getPosts()` once for paths**, then **`N`** detail fetches). Avoids Astro **`props`** serialization of large **`BlogBlockWithChildren`** trees (blocks still fetched and unused until **`B5`; PRD permits this trade-off).
2. **Surrogate body:** **`post.summary`** is rendered inside a **`<p>`** with **`styles.summary`** (**`blog-post.module.css`**); **`white-space: pre-wrap`** preserves intentional line breaks if Notion-derived text carries them.
3. **Unknown slug UX (Phase 4 PRD criterion 8):** Astro **`output: static`** does **not** emit HTML for fabricated slugs. **`dist/blog/this-slug-does-not-exist/`** is **absent** after **`pnpm run build`** (validated). Serving **`dist/`** with **`python3 -m http.server`** (**local check only**) returned HTTP **404** for **`/blog/this-slug-does-not-exist/`** and **200** for an emitted **`/blog/{slug}/`**. Automated **`pnpm run preview`** curls to **`127.0.0.1`** failed here (**connection refused**); **`astro preview`** / GitHub Pages should still be manually spot-checked vs **[404.astro](../../src/pages/404.astro)** (host-dependent).

---

## How the phase was validated

1. **`pnpm run lint`** — exit **`0`**.
2. **`pnpm run build`** — exit **`0`** (**Notion **`NOTION_*`** present** — blog detail prerenders hit API).
3. **`rg "@notionhq/client" src`** — only **`src/lib/notion.ts`**.
4. **Static tree:** **`dist/blog/this-slug-does-not-exist/`** **missing** post-build.
5. **Static **`http.server`** spot-check:** bogus slug → **`404`**, emitted slug → **`200`** (Python **`http.server`**, not **`astro preview`).

---

## PRD criteria satisfied

Reference: [`prd-blog/phase4.md`](../prd-blog/phase4.md) — Acceptance criteria (1–8).

| # | Criterion | Satisfied |
|---|-----------|-----------|
| 1 | **`[slug].astro`** exports **`getStaticPaths`** **`from`** **`getPosts()`** | Yes |
| 2 | Draft excluded (**`getPosts()`**) | Yes (by **`notion`** filter) |
| 3 | **`pnpm`** lint/build **`0`** with secrets | Yes at validation time |
| 4 | Emitted **`slug`** ⇒ non-null **`BlogPostDetail`** or explicit **`throw`** | Yes (**`throw Error`** wrapping **`null`** ) |
| 5 | **`post.summary`** visible | Yes |
| 6 | **`withBase('blog/')`** back link | Yes |
| 7 | **`@notionhq/client`** only **`notion.ts`**; **`notion`** not from **`client:*`** | Yes |
| 8 | Fabricated **`/blog/…`** must not imply a deceptive empty **`200`** | Satisfied (**no fabricated slug directory under **`dist/`**)**; **`python3 -m http.server`** returned **404** for a fake path vs **200** for an emitted slug. **`astro preview`**: suggested manual spot-check for parity with **404 copy**. |

---

## Problems found and resolution

- **Engines warning:** **`package.json`** **`engines.node`** may warn on Node **26** (same caveat as **`blog-b3-report.md`**) — prefer Node **22** when convenient.
- **`astro preview`** + localhost curls were unreliable in this automated environment — a short **`Python`** **`http.server`** on **`dist/`** was used for deterministic **404 vs 200** probes.

---

## Pending work or limitations for the next phases

1. **Phase B5 (`NotionBlocks`):** Shipped — see [`blog-b5-report.md`](blog-b5-report.md).
2. **Phase B6 — Images:** Astro **`Image`** / **`domains`** for covers if needed.
3. **Phase B7 — Discoverability:** **`README`** + optional nav/footer **`/blog/`** link.
4. **Phase B8 — CI:** Decide **`NOTION_*`** absent behaviour (fail vs skip vs empty blog).
