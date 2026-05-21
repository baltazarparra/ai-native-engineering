# PRD: Blog Phase B3 — Listing page and PostCard

**References:** [blog-plan.md](../blog-plan.md) Phase B3 and §§ Product summary, Notion database contract; [phase2.md](phase2.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md) (site-wide product context only).

**Phase mapping:** Blog implementation **Phase B3**. Ships **`/blog/`** listing only. Depends on **`src/lib/notion.ts`** ([Phase B2](phase2.md)). Does **not** implement **`[slug]`** detail pages (Phase B4), **`NotionBlocks`** (Phase B5), README Notion authoring (Phase B7), or CI secrets policy (Phase B8).

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as Phase B1 PRD ([phase1.md](phase1.md)).

---

## Goal

Render a **build-time-static** **`/blog/`** listing page sourced from **`getPosts()`**, with one **`PostCard`** per Published post so visitors can browse titles, summaries, dates, and optionally cover art preview. Each card links to **`/blog/{slug}/`** (detail route deferred to Phase B4).

---

## Scope

### 1. `src/pages/blog/index.astro`

- At **module / build evaluation** time only, **`import`**, then **`await getPosts()`** from **`../../lib/notion.ts`** inside Astro frontmatter scoped to server/build (never `client:*`).
- Pass each returned **`BlogPostSummary`** entry to **`PostCard`** (iterate in template).
- Page uses existing **`BaseLayout.astro`** (or an equivalent wrapper that preserves site header/footer, typography tokens, **`lang`** for metadata). **`lang`** for this phase: **`pt-BR`** (site default). Do **not** add **`/en/blog/`** in B3 unless an explicit rescope PR says otherwise — English mirroring stays out until product asks for it.

- **`title`** / **`description`**: Appropriate listing labels (Portuguese-facing copy is acceptable; harness PRD remains English).

- **Empty listing:** render an **explicit empty state** (heading + short explanatory line) — **no** uncaught rejects, **no** blank flash. Builds must succeed even when **`getPosts()`** returns **`[]`** (valid empty Notion Published set).

- **Errors:** **`getPosts()`** throws remain **fatal** — treat as Misconfiguration/content contract failure (mirror B2 “fail loudly” ethos). Listing must not swallow errors into a misleading empty state.

### 2. `src/components/blog/PostCard.astro` + `PostCard.module.css`

- **Pure Astro** (+ CSS Modules). **No** React island unless justified by Phase B7+ UX (default: **none**).

- **Props:** Map from **`BlogPostSummary`**: at minimum **`title`**, **`slug`**, **`summary`**, **`publishedAt`** (nullable handling), **`coverUrl`** (nullable).

- **Link:** **`href`** must resolve to **`/blog/{slug}/`** using **`withBase`** / URL patterns consistent with **`src/lib/i18n.ts`** and **`astro.config`** so GitHub **`base`** and Pages deploys stay correct.

- **`publishedAt` display:** **`pt-BR`** locale (`Intl` or `toLocaleDateString`), human-readable (“13 de maio de 2026” style or short numeric — pick one consistently). **Missing date:** omit date line OR show muted “Sem data”—document in CSS comment or component README line if needed _(choose one behaviour in implementation; default: **muted “Sem data”** label)_.

- **Summary:** Clamp length visually (CSS **`line-clamp`**) rather than truncation in Notion mapper for B3 — keep mapping pure in **`notion.ts`**.

- **Cover (`coverUrl`):** If present → render **`img`** (`alt=""` decorative allowed if redundant with title **`alt={title}`** preferred for a11y) with reasonable **`width`/`height` or intrinsic sizing** via CSS Module. If absent → omit image region or show neutral bordered placeholder aligned with Neo Brutalism tokens (**no** new animation libraries).

- **Focus:** Card link is keyboard-focusable (`<a>` wrapping card or unmistakable interactive surface); **`outline` / `:focus-visible`** visible per AGENTS/design system.

---

## Out of scope

- **`src/pages/blog/[slug].astro`**, **`getStaticPaths`** for slug detail, full post **`NotionBlocks`** rendering — Phase B4 / B5.
- **README.md** onboarding for Notion (Phase B7).
- **Global nav/footer link** to **`/blog/`** unless already trivially consistent with Phase B7 (default: **no** footer/header entry in B3 — optional small note in Risks).
- **`NotionBlocks`**, fenced code highlighting, optimised remote images policy — Phase B5–B6.
- **`client:*`** hydration unless product explicitly rescopes Phase B3.
- **`@notionhq/client`** imports outside **`notion.ts`**.

---

## User flow

**Site visitor**

1. Open **`/blog/`**.
2. Sees either a **grid or vertical stack** of post cards (**Published-only** semantics inherited from **`getPosts()`**) or empty state messaging.
3. Clicks card → **`/blog/{slug}/`**. (**Note:**until Phase B4 ships, destinations may **404** in preview — acceptable if B4 follows immediately or if cards ship disabled; **default expectation:** merge B4 before exposing nav to production, see Risks.)

**Maintainer / CI**

1. **`NOTION_*`** present at build → listing builds with real rows.
2. Zero Published rows → static page still builds (**empty honest state**).

---

## UI states

| State               | Requirement                                      |
|--------------------|--------------------------------------------------|
| **Loading** (SSG) | N/A — fully static HTML; no client skeleton.       |
| **Has posts**     | Visible cards sorted per **`getPosts()`** order. |
| **No posts**      | Honest messaging; semantic heading; no crash.       |
| **Missing cover**| Layout stable; spacing unchanged.               |
| **Missing date** | As defined in Scope (muted label or omit — pick once). |

---

## Technical notes

- **Secrets:** **`getPosts()`** runs only at **`astro build` / SSR build step** inside Node — unchanged from Phase B2. Never expose **`PUBLIC_`** prefixed copies of **`NOTION_*`**.
- **Ordering:** Guaranteed by **`notion.ts`** — listing must **not** re-sort contrary to **`getPosts()`** contract.
- **Slug safety:** Use **`encodeURIComponent`** (or Astro **`url`/path**) when composing **`href`** if slugs contain reserved URL characters despite Notion authoring guidance.
- **Design system:** **`PostCard.module.css`** consumes existing **tokens / patterns** (**`globals.css`** variables, **`Card`/grid** references from existing components where sensible). No Tailwind.
- **`trailingSlash` / `BASE_URL`:** Match repository defaults so `/blog/` and `/blog/[slug]/` resolve on GitHub Pages like session routes (**verify** alongside Phase B4 if ambiguous — open item if needed).

---

## Acceptance criteria

1. **`src/pages/blog/index.astro`** exists and **`await getPosts()`** in server/build-only context renders listing or empty state.
2. **`src/components/blog/PostCard.astro`** + **`PostCard.module.css`** exist; **`PostCard`** maps **`BlogPostSummary`** fields visually.
3. **Empty Published set** yields **successful** **`pnpm run build`** and readable empty **`/blog/`** HTML — no throw.
4. Every card **`href`** is built with **`withBase`** so it resolves to **`blog/{slug}/`** consistently with **`BASE_URL`** / GitHub Pages.
5. **Draft** Never appears (inherited **`getPosts()`** filter — regression spot-check).
6. **No** **`@notionhq/client`** import outside **`notion.ts`**; **no** `notion.ts` import from **`client:*`** components.
7. **`pnpm run lint`** exits **`0`**.
8. **`pnpm run build`** exits **`0`** with valid **`NOTION_*`** and throws **clear failures** when Phase B2 preconditions violated (consistent with **`getPosts()`**).

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | **`pnpm install`** → **`pnpm run lint`** → **`pnpm run build`** with populated **`.env`**. |
| 2 | **`pnpm run preview`** — open **`/blog/`**, confirm Published posts appear sorted like Notion **`PublishedAt` desc**. |
| 3 | **Empty-state check:** Temporary Notion test (archive all Published or use throwaway workspace) → rebuild → **`/blog/`** shows Honest messaging (restore data after). |
| 4 | **Keyboard:** tab through listing; focus outlines visible per card/link. |
| 5 | **Mobile width:** sanity check stacking / tap targets (**≥ ~44×44 px** logical target on primary link). |
| 6 | **Cover row:** Edit one post with **`Cover`** + one without → both render cleanly. |

---

## Risks / open questions

| Risk / question | Mitigation / resolution |
|-----------------|------------------------|
| **B3 without B4** → card links **404** | Prefer landing B4 in same milestone or disabling primary nav until **`[slug]`** exists; communicate in changelog. |
| **CI lacks `NOTION_*`** | Deferred to **Phase B8** explicit policy (**fail**, **skip blog**, empty — pick one globally). |
| **Remote cover URL / CORS / hotlinks** | B3 **`img`** with `coverUrl`; document known limitations until **`<Image />` / domains** (**Phase B6**). |
| **Rate limits slow CI** | Accept B2 pagination; escalate retry/backoff later if measurable. |

**Open decisions (resolved here for B3):**

- **`publishedAt` locale:** **`pt-BR`** (**Scope**).
- **Missing date:** **`Sem data`** muted text **or omit** — implementer chooses one and documents in **`PostCard`** file comment (**default: muted `"Sem data"`**).

---

## Honest vagueness refined (from blog-plan B3)

| Original gap | Resolution in this PRD |
|--------------|-------------------------|
| “Date formatting locale” | **`pt-BR`** for listing cards. |
| “Missing cover URL” | Omit image band or bordered placeholder (**Scope**); no crash. |
| “Mobile + desktop” | Manual validation (**grid/stack** whichever matches existing primitives). |
