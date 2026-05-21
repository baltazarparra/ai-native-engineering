# Phase completion report: Blog B5 — NotionBlocks MVP

**Phase:** Blog implementation Phase B5 (see [blog-plan.md](../blog-plan.md)).  
**PRD:** [prd-blog/phase5.md](../prd-blog/phase5.md).  
**Depends on:** [Phase B2](phase2.md) — [`src/lib/notion.ts`](../../src/lib/notion.ts) (`BlogPostDetail.blocks`); [Phase B4](phase4.md) — [`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro).  
**Harness context:** [AGENTS.md](../../AGENTS.md), [PLAN.md](../../PLAN.md).

---

## Summary

Phase B5 maps **`BlogPostDetail.blocks`** into article HTML via **`NotionBlocks`** (plus **`NotionBlockPiece`**, **`segment-blocks.ts`**, **`NotionBlocks.module.css`**). The blog-plan minimum block matrix is implemented: **paragraph**, **headings** (Notion `heading_1–3` → **`h2–h4`**), grouped **lists** with **`Astro.self`** nesting, **`code`** as semantic **`<pre><code>`**, **`image`** as **`<img>`**, **quote**, **divider**. Unsupported types show a **muted PT‑BR** line naming **`block.type`** (policy A). **`plain_text`** MVP only via **`notionRichPlain`**.

[`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro): **`NotionBlocks`** when **`post.blocks.length > 0`**, else **`post.summary`** fallback.

**PRD import rule (locked):** Blog components use **`import type { BlogBlockWithChildren }`** from **`notion.ts`** only — no value/runtime import. See [phase5.md](../prd-blog/phase5.md) Scope §1.

---

## Files created or changed

| Path | Change |
|------|--------|
| [`src/components/blog/NotionBlocks.astro`](../../src/components/blog/NotionBlocks.astro) | List segmentation, **`Astro.self`** recursion |
| [`src/components/blog/NotionBlockPiece.astro`](../../src/components/blog/NotionBlockPiece.astro) | Single-block dispatcher + quote **`children`** |
| [`src/components/blog/segment-blocks.ts`](../../src/components/blog/segment-blocks.ts) | Consecutive list run grouping |
| [`src/components/blog/NotionBlocks.module.css`](../../src/components/blog/NotionBlocks.module.css) | Neo Brutalism block styles |
| [`src/lib/notion-rich-text.ts`](../../src/lib/notion-rich-text.ts) | **`notionRichPlain`** |
| [`src/lib/notion.ts`](../../src/lib/notion.ts) | Reuses **`notionRichPlain`** |
| [`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro) | **`NotionBlocks`** + summary fallback |
| [`docs-blog/prd-blog/phase5.md`](../prd-blog/phase5.md) | Phase PRD; type-only import clarification |

**Deferred:** syntax highlighting, **`<Image />`** / **`domains`** (B6), README/nav (B7), CI secrets (B8).

---

## Technical decisions

| Topic | Decision |
|-------|----------|
| **Heading map** | `heading_1` → `<h2>`, `heading_2` → `<h3>`, `heading_3` → `<h4>`; page `<h1>` = post title |
| **`alt` on images** | Caption **`plain_text`** trimmed, else **`''`** |
| **Unsupported blocks** | Visible PT‑BR: `Bloco não suportado nesta versão (<type>)` |
| **Rich text** | **`plain_text`** join only |
| **List recursion** | **`Astro.self`** inside **`li`**; **`NotionBlocks`** ↔ **`Piece`** for quotes |
| **Type imports** | **`import type`** from **`notion.ts`** in blog components (**PRD option A**) |

---

## How the phase was validated

1. **`pnpm run lint`** — exit **0**.
2. **`pnpm run build`** — exit **0** (Notion **`NOTION_*`** present); **`/blog/mo/index.html`** emitted.
3. **`grep '@notionhq/client' src`**: runtime **`Client`** only in **`notion.ts`**; **`import type`** also in **`notion-rich-text.ts`** (per PRD §8).
4. **Blog components:** **`import type`** from **`notion.ts`** only; no **`client:*`** + **`notion`** pairing.
5. **Built HTML check:** Current Published slug **`mo`** has **empty** Notion page body → **summary fallback** rendered (criterion 5 path). **`NotionBlocks`** CSS bundled; add body blocks in Notion for full matrix manual compare.
6. **Manual follow-up:** **`pnpm run preview`** — side-by-side Notion vs **`/blog/{slug}`** for a post with headings/lists/code/image; add **`equation`** block to confirm unsupported marker.

---

## PRD criteria satisfied

Reference: [prd-blog/phase5.md](../prd-blog/phase5.md) — Acceptance criteria (1–8).

| # | Criterion | Satisfied |
|---|-----------|-----------|
| 1 | **`NotionBlocks.astro`** + CSS; slug page renders **`post.blocks`** when non-empty | Yes |
| 2 | Reference post with only supported types builds without throw | Yes at build time; visual matrix compare needs Notion content with blocks |
| 3 | Consecutive bullets/numbers → one **`<ul>`** / **`<ol>`** | Yes (**`segmentListRuns`**) |
| 4 | Nested **`children`** under lists and **`quote`** | Yes (**`Astro.self`** + **`NotionBlocks`** in quote) |
| 5 | Empty **`post.blocks`** → **`summary`** visible | Yes (**`mo`** post validated in **`dist`**) |
| 6 | Unsupported policy documented (**marker**, PT‑BR) | Yes (**`NotionBlockPiece`** + this report) |
| 7 | **`pnpm run lint`** / **`build`** exit **0** | Yes at validation time |
| 8 | **`@notionhq/client`**: runtime in **`notion.ts`** only; no **`client:*`** **`notion`** | Yes; type-only in **`notion-rich-text.ts`** per PRD |

---

## Problems found and resolution

- **`engines.node`** may warn on Node 26 — prefer Node 22 per repo policy.
- **Reference post `mo`** has no Notion body blocks yet — build correctly uses **summary fallback**; populate Notion page content for full manual matrix validation.

---

## Pending work (next phases)

1. **Phase B6** — syntax highlighting; Astro **`<Image />`** + **`image.domains`**.
2. **Phase B7** — README Notion authoring; optional **`/blog/`** nav link.
3. **Phase B8** — CI **`NOTION_*`** policy when secrets missing.
