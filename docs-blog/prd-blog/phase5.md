# PRD: Blog Phase B5 — NotionBlocks MVP (`/blog/[slug]/` body)

**References:** [blog-plan.md](../blog-plan.md) (Phase B5, Minimum Notion block support); [phase4.md](phase4.md); [phase3.md](phase3.md); [phase2.md](phase2.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md).

**Phase mapping:** Blog **Phase B5**. Renders the published **post body** from `BlogPostDetail.blocks` supplied by `getPostBySlug` in [`src/lib/notion.ts`](../../src/lib/notion.ts). Supersedes the Phase B4 summary-only surrogate when `post.blocks` is non-empty. Does **not** deliver syntax highlighting, Astro `<Image />` / `image.domains` policy (**Phase B6**), global README / nav (**Phase B7**), or CI `NOTION_*` policy (**Phase B8**).

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as [phase1.md](phase1.md).

---

## Goal

Map Notion `BlockObjectResponse` trees (`BlogBlockWithChildren` with recursive `children`) into semantic HTML at build time so `/blog/{slug}/` reads as a coherent article (headings, paragraphs, lists, quotes, rules, code blocks, images) for types in **blog-plan.md**. Styling follows Neo Brutalism (**CSS Modules + tokens**, **no Tailwind**, per **AGENTS.md**).

---

## Scope

### 1. `src/components/blog/NotionBlocks.astro` (primary contract)

- **Pure Astro**; **no** `client:*` on this subtree.
- **Prop:** `blocks: BlogBlockWithChildren[]` (exported from `notion.ts`).
- Implements the **minimum block matrix** (below).
- **List grouping:** consecutive `bulleted_list_item` → one `<ul>`; consecutive `numbered_list_item` → one `<ol>` (valid HTML).
- **Recursion:** `list_item` and `quote` `children` use the **same rules** (`Astro.self` or helpers).
- **`@notionhq/client`** must **not** be imported from `src/components/blog/`. **`notion.ts`** may be referenced with **`import type`** only (e.g. `BlogBlockWithChildren`); **no value/runtime** import and **no** `client:*` hydration pulling `notion.ts`.

Helper files (e.g. `segment-blocks.ts`, `NotionBlockPiece.astro`) are allowed. The detail route [`src/pages/blog/[slug].astro`](../../src/pages/blog/[slug].astro) imports `NotionBlocks` as the stable public API.

### 2. Module CSS

- `NotionBlocks.module.css` (name may vary): typography, `blockquote` rail, `pre`/`code`, lists, `figure`/`img`, `hr`, muted unsupported fallback.

### 3. `src/pages/blog/[slug].astro`

- When `post.blocks.length > 0`, article body renders `<NotionBlocks blocks={post.blocks} />` below title/meta/cover (Phase B4 layout).
- When `post.blocks.length === 0`, show `post.summary` so the page is never visually empty.

### 4. Optional: `src/lib/notion-rich-text.ts`

**Recommended:** `notionRichPlain(rich_text)` joins `plain_text`. `notion.ts` may reuse it for Title/Slug/Summary (**DRY**).

---

## Minimum Notion block support (canonical)

Per [blog-plan.md](../blog-plan.md):

| Block type | MVP requirement |
|------------|-----------------|
| `paragraph` | `<p>`; omit if trimmed `plain_text` is empty |
| `heading_1`, `heading_2`, `heading_3` | Map to `h2`/`h3`/`h4` so **exactly one** `h1` exists (article title in slug page). Document map in **`docs-blog/reports/blog-b5-report.md`** |
| `bulleted_list_item`, `numbered_list_item` | One grouped `<ul>`/`<ol>` per sibling run; recurse `children` |
| `code` | `<pre><code>`; no new highlighter unless already in **`package.json`** (else Phase B6). Optional `language-*` class on `<code>` for future hooks |
| `image` | `<img>`; pick and document **`alt`** (caption vs empty); `loading="lazy"` acceptable (`<Image />` is Phase B6) |
| `quote` | `<blockquote>` + nested `children` |
| `divider` | `<hr>` (styled) |

**Rich text (MVP):** use `RichTextItemResponse.plain_text` concatenation only. Bold, italic, links, mentions, equations: **explicitly out of scope** for B5.

---

## Unsupported block policy (must document)

**Default:** visible, muted PT‑BR line naming `block.type` (**build must not throw**).

**Alternative (product approval only):** silent omission — document if chosen.

---

## Out of scope

- Prism / Shiki / rehype (Phase B6 unless already installed)
- Astro `<Image />`, `image.domains` (Phase B6)
- README Notion authoring, `/blog` global nav (Phase B7)
- CI `NOTION_*` fork policy (Phase B8)
- `/en/blog/[slug]` unless rescoped

---

## Acceptance criteria

1. `src/components/blog/NotionBlocks.astro` + module CSS exist; slug detail page renders `post.blocks` when non-empty.

2. A reference Notion post using **only** supported block types builds (**no throw**) with readable headings, paragraphs, lists, quote, divider, code, image.

3. Consecutive bullets or numbers share **one** `<ul>`/`<ol>` (not N one-item wrappers) unless documented exception.

4. Nested `children` under list items and `quote` recurse safely for trees returned by `getPostBySlug` (**Phase B2** paging).

5. Empty `post.blocks` → `post.summary` still visible.

6. Unsupported behaviour matches documented **marker vs silent** policy; cite in **`blog-b5-report.md`** or code comments.

7. `pnpm run lint` and `pnpm run build` exit `0` with valid `NOTION_*` (full CI strategy remains B8).

8. `rg '@notionhq/client' src` → runtime SDK only in `src/lib/notion.ts`; `notion-rich-text.ts` may use `import type` from `@notionhq/client`; `notion.ts` never imported via `client:*` (type-only imports in blog components are allowed).

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | `pnpm install` → `pnpm run lint` → `pnpm run build` |
| 2 | `pnpm run preview`: `/blog/` → open ≥2 `PostCard` links if available |
| 3 | Compare Notion vs built HTML: headings, bullets, numbered, quote, divider, code, image |
| 4 | Add one unsupported block (e.g. `equation`) → confirm marker vs silent |
| 5 | Optional: empty body row → summary fallback visible |
| 6 | `rg '@notionhq/client' src` → notion.ts only |

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Plain-text MVP loses authoring formatting | Document in B5 report; richer typography later |
| Large trees vs build latency | Already paginated **B2** (`blocks.children.list`) |
| Heading outline quirks | Fixed map (e.g. Notion heading_1 → `h2`); record in report |
| Remote images 404/CORS | Accept in B5; optimise in B6 |

---

## Honest vagueness (defaults for this PRD)

| Ambiguity | Default |
|-----------|---------|
| Unsupported blocks | Visible PT‑BR marker |
| Inline rich text | `plain_text` only |
| Notion headings → HTML | `heading_1–3` → `h2–h4`; single `h1` = page title |
| Code colours | Semantic `<pre><code>` only until B6 |
