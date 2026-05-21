# PRD: Blog Phase B6 — Code highlighting and optimised images

**References:** [blog-plan.md](../blog-plan.md) (Phase B6); [phase5.md](phase5.md); [phase4.md](phase4.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md).

**Phase mapping:** Blog **Phase B6**. Polishes **Notion `code`** and **`image`** blocks (and aligned cover imagery) introduced in [Phase B5](phase5.md). Depends on **`NotionBlocks`** / **`NotionBlockPiece`**. Does **not** ship README / global nav (**Phase B7**), CI **`NOTION_*`** policy (**Phase B8**), or new block types.

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as [phase1.md](phase1.md).

---

## Goal

Make blog **code blocks** readable with **syntax highlighting** at build time, and make **remote images** (Notion body + optional cover surfaces) use Astro **`<Image />`** where the static pipeline allows—without breaking **`pnpm run build`**, Neo Brutalism styling, or the **no client-side Notion SDK** rule from earlier phases.

---

## Scope

### 1. Syntax highlighting (`code` blocks)

**Baseline (B5):** [`NotionBlockPiece.astro`](../../src/components/blog/NotionBlockPiece.astro) renders **`<pre><code class="language-*">`** with plain text.

**B6 requirements:**

- Add **one** build-time highlighter approach (**repo has none today**; blog-plan: reuse if present, else improve beyond plain monospace).
- **Default implementation choice:** **Shiki** (or Astro-documented equivalent) generating **static HTML** at build time—**no** `client:*` highlighter runtime required.
- Preserve Notion **`language`** hint when present (`language-*` class or Shiki language id).
- Styling must remain **CSS Modules + tokens** (Neo Brutalism: bordered `pre`, readable contrast, optional line numbers **off** unless trivial).
- **Do not** introduce disallowed animation libraries per **AGENTS.md** (highlighter ≠ animation library).

**Out of B6 for code:** copy-to-clipboard UI, line highlighting on hover, runnable sandboxes.

### 2. Optimised images (`image` blocks + config)

**Baseline (B5):** plain **`<img src={notionUrl}>`** in **`NotionBlockPiece`**; cover hero on **[`[slug].astro`](../../src/pages/blog/[slug].astro)** and **`PostCard`** also use **`<img>`** with **`coverUrl`**.

**B6 requirements:**

- Replace **in-body** Notion **`image`** blocks with Astro **`<Image />`** from **`astro:assets`** (or project-standard image wrapper) where URLs are valid at build time.
- Update **[`astro.config.mjs`](../../astro.config.mjs)** with documented **`image.domains`** and/or **`image.remotePatterns`** covering Notion-hosted URLs used in practice (e.g. `*.notion.so`, `*.amazonaws.com`, `*.s3.*`—**verify against real `coverUrl` / block URLs** during implementation).
- **Width / height strategy (locked default):** max content width consistent with article column (~920px logical); supply **`width`/`height`** or **`inferSize`** per Astro docs so layout stability and Lighthouse do not regress. Document final choice in **`blog-b6-report.md`**.
- **`alt` / caption:** keep B5 policy—caption-derived **`alt`**, else empty string; **`figcaption`** unchanged.
- **`loading="lazy"`** acceptable for below-fold body images; hero cover may stay **`eager`** on detail page.

**Recommended in B6 (same patterns, if low effort):**

- Detail page **cover** **`img`** → **`<Image />`**.
- **`PostCard`** cover band → **`<Image />`** or shared helper.

**If a Notion URL cannot be optimised** (unknown host, expired signed URL at build, fetch failure): **fail build with clear error** **or** documented fallback to **`<img>`** for that asset only—**pick one in implementation and record in B6 report** (default: **build-time warning + fallback `<img>`** so one bad asset does not block entire site).

### 3. Shared helper (optional)

- **`src/components/blog/NotionImage.astro`** (or **`src/lib/blog-image.ts`**) centralising remote URL rules and **`<Image />`** props—reduces duplication between **`NotionBlockPiece`**, **`PostCard`**, **`[slug]`** hero.

### 4. Documentation touchpoints

- Short note in **`docs-blog/reports/blog-b6-report.md`**: domains/patterns added, highlighter package, fallback policy.
- **Optional:** one paragraph in root **`README.md`** under blog env section listing **remote image hosts**—full Notion authoring guide remains **B7**.

---

## Out of scope

- New Notion block types or **`NotionBlocks`** matrix changes (**B5** owns block coverage).
- Inline rich-text annotations (bold, links) in paragraphs.
- **`README`** full Notion setup (**B7**).
- Global nav/footer **`/blog/`** link (**B7**).
- CI secrets / fork behaviour (**B8**).
- **`/en/blog/`** unless rescoped.
- Image CDN outside Astro static pipeline.

---

## Technical notes

- **Static build:** highlighting and image optimisation run during **`astro build`** only.
- **Notion signed URLs:** file URLs from Notion API may be **time-limited**; static HTML embeds whatever URL was valid at build. Document operational expectation: **rebuild** refreshes assets; long-lived hotlink breakage is a known CMS limitation.
- **Sharp:** Astro image pipeline typically uses **`sharp`** (already in **`package.json`** `onlyBuiltDependencies`); ensure CI/local can build images.
- **Secrets:** still no **`NOTION_*`** in client bundles.

---

## Acceptance criteria

1. A Published post with at least one **`code`** block builds and renders **visually distinct** syntax highlighting (not plain monochrome only).
2. A Published post with at least one in-body **`image`** block builds using **`<Image />`** (or documented wrapper) and displays in preview.
3. **`astro.config.mjs`** documents allowed **remote** image hosts/patterns used by Notion in this project.
4. **`pnpm run lint`** and **`pnpm run build`** exit **`0`** with valid **`NOTION_*`**.
5. B5 behaviour preserved: lists, headings, unsupported marker, empty-body **summary** fallback, no **`client:*`** **`notion.ts`** imports.
6. No new **`@notionhq/client`** importers beyond existing **`notion.ts`** / type-only **`notion-rich-text.ts`** rule from B5 PRD.
7. Cover surfaces (**detail hero** and/or **`PostCard`**) upgraded to **`<Image />`** **or** explicitly deferred with reason in **`blog-b6-report.md`** (not silent).

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | `pnpm install` → `pnpm run lint` → `pnpm run build` |
| 2 | `pnpm run preview` → open a post with **code** + **image** blocks |
| 3 | Confirm code: language label from Notion maps sensibly; colors/contrast readable in light theme |
| 4 | Confirm images: no broken layout; reasonable size; caption still shows when set |
| 5 | Optional: Lighthouse on one **`/blog/{slug}/`** URL (performance / CLS spot check) |
| 6 | Regression: `/blog/` listing, sessions routes, `pnpm run build` page count stable aside from expected blog assets |

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Notion URL host not in `remotePatterns` | Capture real URLs from API during dev; list in config + report |
| Signed URL expiry after deploy | Rebuild policy; avoid promising permanent hotlinks in docs |
| Shiki bundle size / build time | Limit to languages used in content or default grammar set |
| One bad image URL fails whole build | Prefer per-image fallback policy (documented) |
| Hero vs body image different hosts | Same remotePatterns union; test both |

---

## Honest vagueness (defaults for this PRD)

| Ambiguity | Default |
|-----------|---------|
| Highlighter package | **Shiki** at build time unless repo already adds equivalent |
| Bad remote image at build | **Fallback `<img>`** + log/warn; do not fail entire build |
| Cover + PostCard `<Image />` | **In scope** if same helper; otherwise **document deferral** |
| Line numbers in code blocks | **Off** |
| Lighthouse | **Optional** manual spot check, not CI gate in B6 |
