# PRD: Blog Phase B4 — Detail route (`/blog/[slug]/`)

**References:** [blog-plan.md](../blog-plan.md) Phase B4; [phase2.md](phase2.md); [phase3.md](phase3.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md) (site-wide product context only).

**Phase mapping:** Blog implementation **Phase B4**. Ships **`src/pages/blog/[slug].astro`** with **`getStaticPaths()`** derived from **`getPosts()`**. Renders **`BlogPostDetail`** via **`getPostBySlug`**. Depends on **`src/lib/notion.ts`** ([Phase B2](phase2.md)). Does **not** implement **`NotionBlocks`** (Phase B5), README Notion authoring (Phase B7), or CI **`NOTION_*`** policy (Phase B8).

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as Phase B1 PRD ([phase1.md](phase1.md)).

---

## Goal

Emit **one static HTML file per Published post** under **`blog/{slug}/`**, composed with **`withBase`** relative to **`site`**, so links from **`PostCard`** ([Phase B3](phase3.md)) resolve to real detail pages. **Draft** entries must emit **zero** detail routes.

---

## Scope

### 1. `src/pages/blog/[slug].astro`

**`getStaticPaths`**

- At **module / build evaluation** time only, **`import`**, **`await getPosts()`** from **`../../lib/notion.ts`** (**never** `client:*`).
- Return **`posts.map`** → **`{ params: { slug: post.slug } }`** plus optional **`props`** if **`getPostBySlug`** should run once per path in **`getStaticPaths`** instead of fetching again at page render (**choose one consistent pattern**).
- **Source of paths:** **`getPosts()`** only (**Published-only** by construction).

**Slug parity**

- **`PostCard`** uses **`encodeURIComponent(slug)`** in **`href`**. Astro **`params.slug`** arrives **decoded**. **`params.slug`** from **`getStaticPaths`** MUST use the **`post.slug`** plain-text value from **`getPosts()`** (same **`Slug`** field contract as **`notion.ts`**).

**Detail fetch**

- Page render: **`await getPostBySlug(Astro.params.slug)`** unless the full **`BlogPostDetail`** is passed via **`props`** from **`getStaticPaths`**.
- **`getPostBySlug`** **must succeed** for every emitted **`slug`**. If **`null`** for an emitted slug during **`astro build`**, **`throw`** an **`Error`** that includes the slug — no silent blank page (align Phase B2 “fail loudly” ethos).

### 2. Layout, metadata, navigation

- **`BaseLayout`**, **`lang="pt-BR"`**, **`Footer`**: mirror **[`src/pages/blog/index.astro`](../../src/pages/blog/index.astro)**.
- **`<title>` / meta:** **`post.title`** and **`post.summary`** (trim or truncate for description length — document briefly in-page or comment if capped).
- **Back to listing:** prominent link **`withBase('blog/')`** (or equivalent path that resolves like **`PostCard`** + repo **`base`**). **Trailing slash** behavior must stay **consistent** with Phase B3 and [astro.config.mjs](../../astro.config.mjs) (currently no explicit **`trailingSlash`** override).

### 3. Article body (B4 versus B5)

**Full block → HTML richness** is **[Phase B5](../blog-plan.md)** (**`NotionBlocks`**). Phase B4 must **not** ship a visually empty shell:

- **Required:** **`post.summary`** rendered as semantic prose surrogate (e.g. **`<p>`** and/or **`SectionBlock`**, Neo Brutalism typography).
- **Optional hero:** **`post.coverUrl`** **`img`** with **`alt`** from **`post.title`** (styling parity with **`PostCard`** acceptable).
- **Blocks:** **`post.blocks`** need **not** be expanded in Phase B4. **Do not** build the full **`NotionBlocks`** matrix here. (**Default:** omit dev-only **`blocks`** dumps from production.)

---

## Out of scope

- **`src/components/blog/NotionBlocks.astro`** (Phase B5).
- **`Image`** optimisation, Astro **`image.domains`**, fenced-code highlighting polish (Phase B5–B6).
- **`README`** Notion guide (Phase B7); optional global nav/footer link to **`/blog/`** unless trivially aligned — default **defer** to Phase B7.
- CI **`NOTION_*`** policy (Phase B8).
- **`/en/blog/[slug]`** unless product rescopes.

---

## User flow

1. Visitor opens **`/blog/`**, clicks **`PostCard`** → **`/blog/{slug}/`** (adapt to **`trailingSlash`** as configured).
2. Sees **title**, **date/metadata** (**pt-BR** acceptable like listing), **`summary`** body, **`Back`** to listing.
3. **Unknown / non-emitted slug** (**typo**, **Draft**, **removed**) → **`404`** UX aligned with **`404.astro`** / static hosting (**see Technical notes**).

---

## Technical notes

**Static paths and 404**

- **`getStaticPaths`** defines which slugs produce HTML. **Draft** and **never-built** slugs **must not** return **`200`** with an empty skeleton.
- **`Unknown slug`** in **`pnpm run preview`**: behaviour depends on Astro / adapter (**verify** versus GitHub Pages and baseline **[404.astro](../../src/pages/404.astro)** behaviour). Manual validation must confirm a fabricated **`/blog/fake-slug/`** request shows site **`404`** UX, not a deceptive **`200`** empty layout.

In **[`astro.config.mjs`](../../astro.config.mjs)**, **`site`** is set for canonical URLs and there is **`no`** explicit **`trailingSlash`** setting at time of writing — **do not** diverge **`PostCard`** **`href`** semantics without documenting.

---

## Acceptance criteria

1. **`src/pages/blog/[slug].astro`** exports **`getStaticPaths`** sourcing slugs **`from`** **`getPosts()`**.
2. **`getStaticPaths`** output excludes **Draft** (**inherited** **`getPosts()`**).
3. **`pnpm run lint`** and **`pnpm run build`** exit **`0`** with valid **`NOTION_*`** (**local / CI mirror B2 assumptions** until B8 clarifies skips).
4. For **every emitted slug**, **`getPostBySlug`** returns non-null **`BlogPostDetail`** or **build fails** explicitly.
5. **`post.summary`** visible on emitted pages (**surrogate body** until **`NotionBlocks`**).
6. **Back link** resolves via **`withBase`** to **`/blog/`**.
7. **No** **`@notionhq/client`** import outside **`notion.ts`**; **`notion.ts`** must not be imported from **`client:*`** components.
8. **Preview:** fabricated slug under **`blog/`** shows **site 404** (not deceptive **`200`** empty page).

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | **`pnpm install`** → **`pnpm run lint`** → **`pnpm run build`** |
| 2 | **`pnpm run preview`**: **`/blog/`** → open **two** **`PostCard`** URLs; confirm **`title`**, **`summary`**, **`Back`** |
| 3 | Open **`/blog/this-slug-does-not-exist/`** (adapt path to **`trailingSlash`**) → expect **`404`** UX consistent with **`404.astro`** |
| 4 | **`rg '@notionhq/client' src`** — **`notion.ts`** only |
| 5 | **Keyboard:** **`Back`** link focus outline; sane heading structure |

---

## Risks / open questions

| Risk / question | Mitigation / resolution |
|-----------------|------------------------|
| **Slug edit** mid-build | Rare; rerun build; B2 duplicate slugs fail fast |
| **`base`** / **`site`** mismatches Pages | Compose all links with **`withBase`** |
| **`summary`** feels thin vs full post | Accepted until **`NotionBlocks`** (B5); no placeholder marketing line required |

**Open decisions (defaults for B4):**

- **`Date` display:** match **`PostCard`** (**pt-BR** / **`Sem data`** muted — same UX).
- **`Optional cover`:** parity with **`PostCard`** (Scope section 3).

---

## Honest vagueness refined (from blog-plan Phase B4)

| Original ambiguity | Decision in PRD |
|--------------------|----------------|
| Trailing slashes / Paths | Match repo default + **`withBase`** / **`PostCard`**; validate preview + **`build`** tree |
| **404 Astro API** | Implementer aligns with current **`astro.config`**; **manual** **`preview`** check on fake slug |
| Body vs **`NotionBlocks`** (Phase B5) | **`summary`** is mandatory surrogate; **`blocks`** need not render in Phase B4 |
