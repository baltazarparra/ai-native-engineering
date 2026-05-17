# PRD: Blog Phase B2 — Notion module (`src/lib/notion.ts`)

**References:** [blog-plan.md](../blog-plan.md) Phase B2 and §§ Product summary, Notion database contract, `notion.ts` responsibilities; [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md) (site-wide product context only).

**Phase mapping:** Blog implementation **Phase B2**. Introduces **build-time-only** Notion access via **`src/lib/notion.ts`**. Does **not** add `/blog` pages, `PostCard`, `NotionBlocks`, README Notion guides, or CI secrets policy (Phase B3+ / B7 / B8).

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as Phase B1 PRD ([phase1.md](phase1.md)).

---

## Goal

Provide a single server/build-side module that initializes the official Notion client from environment variables and exposes **`getPosts()`** and **`getPostBySlug(slug)`** so later phases can render static blog routes. **Draft** database rows must never appear in results. **No** `@notionhq/client` usage outside this module; **no** imports from `client:*` islands.

---

## Scope

1. **`src/lib/notion.ts`**
   - Read **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** at module use time (runtime of the build process). Use the same variable names as [`.env.example`](../../.env.example). Do not log or stringify secret values.
   - Instantiate **`Client`** from `@notionhq/client` (or equivalent supported constructor) once per build process pattern (lazy singleton or explicit factory — pick one and keep it boring).
   - **`getPosts()`**
     - Query the configured database ([blog-plan database contract](../blog-plan.md#notion-database-contract)).
     - Return only rows where **`Status`** select property equals **`Published`** (exact string match).
     - Map each row to a **typed** “post summary” suitable for listing and for `getStaticPaths` later: at minimum **page id** (Notion), **title** (plain text from Title), **slug** (plain text from Slug rich text), **publishedAt** (Date or `null` if missing), **summary** (plain text from Summary rich text), **cover URL** when Cover is present (support **file** and **external** URL shapes per Notion API).
     - Sort by **`publishedAt` descending**. Rows with **missing `publishedAt`** sort **after** all dated rows (stable tie-break: **title** ascending UTF-8).
     - **Paginate** database query until all results are retrieved (`start_cursor` loop).
     - **Duplicate slug detection (among Published rows):** if two or more Published rows share the same non-empty slug, **throw** a descriptive `Error` during the call (fail fast; no silent merge). This resolves the blog-plan open decision for B2 as **fail**, not exclude.
     - **Missing Slug on a Published row:** **throw** with page id referenced in the message (fail fast; data must be fixed in Notion). This replaces “exclude unsafe rows” for B2.
   - **`getPostBySlug(slug: string)`**
     - Normalize input: trim; treat empty string as not found.
     - Resolve **at most one** Published page whose Slug matches.
     - If **none** → return **`null`** (or a documented Result type — pick one; `null` is default here).
     - If match: fetch **all block children** for the page via the blocks API, **paginating** `next_cursor` until complete. Include **nested** content: if a block has `has_children`, recursively fetch children (depth unbounded unless Notion/API limits require a cap — document any cap).
     - Return **metadata** (same fields as needed for detail page later) plus a **typed array/list of raw block objects** (or a minimal internal representation) sufficient for **`NotionBlocks`** in Phase B5 to consume without re-fetching.

2. **Shared types**
   - Export TypeScript types/interfaces for post summary and for the `getPostBySlug` return shape (names are implementer’s choice; must be stable for Phase B3–B5).

3. **Non-behavioral guardrails**
   - **Do not** add `import` of `src/lib/notion.ts` from any React island or any file loaded with `client:*`.
   - **Do not** add `/blog` routes in this phase (no `src/pages/blog/*` unless an **ephemeral** local-only file used for debugging — see Manual validation — **must not** be merged).

4. **Lint / build**
   - **`pnpm run lint`** and **`pnpm run build`** exit **0** after this phase. Because no production page imports `notion.ts` yet, the build might not hit the Notion API; API validation is covered under Manual validation below.

---

## Out of scope

- **`src/pages/blog/*`**, **`PostCard`**, **`NotionBlocks`**, layouts, navigation links to `/blog`.
- **README.md** updates for Notion setup (Phase B7).
- **GitHub Actions** secrets and conditional build behaviour (Phase B8).
- **Astro `env` schema** in `astro.config` — optional follow-up if the team wants typed env; not required for B2.
- **Syntax highlighting**, **`<Image />`**, and other presentation concerns (Phase B5–B6).
- **Caching / durability** beyond simple pagination (e.g. Redis, disk cache).
- **Draft preview** or authenticated Notion flows.

---

## User flow

**Site visitors:** None — no new routes.

**Maintainer / release engineer (build-time narrative):**

1. Ensure **`.env`** contains valid `NOTION_TOKEN` and `NOTION_DATABASE_ID` (local or CI secret in later phases).
2. Run **`pnpm run build`** — in B2 alone, Notion may not be invoked until a caller exists; see validation.
3. Use a **temporary local script or REPL** (not committed, or committed only if team explicitly chooses a `scripts/` smoke — default: **not committed**) to call `getPosts()` / `getPostBySlug()` and confirm results match Notion.

---

## UI states

Not applicable — no user-facing UI.

---

## Technical notes

- **Execution context:** Code runs in **Node** during `astro build` / SSG when imported from `.astro` frontmatter or server-only modules. Follow [AGENTS.md](../../AGENTS.md): no client bundle exposure of secrets; do not prefix Notion vars with `PUBLIC_`.
- **Property names:** Implement against the **exact** Notion property names from [blog-plan](../blog-plan.md#notion-database-contract): `Title`, `Slug`, `Status`, `PublishedAt`, `Summary`, `Cover`. If Notion returns unexpected types, fail loudly or coerce with explicit, documented rules in code comments (one place only).
- **Status value:** Treat **Published** as the only publish state; **`Draft`** and any other value are excluded.
- **Rate limits:** Use pagination everywhere; optional small delay or retry for 429 is **not** required in B2 — document as follow-up if builds become large.
- **Error surface:** Prefer **thrown errors** with clear messages for misconfiguration (missing env, missing database, permission errors) so CI/logs are actionable.

---

## Acceptance criteria

1. **`src/lib/notion.ts`** exists and is the **only** module that imports `@notionhq/client`.
2. **`getPosts()`** returns **only** `Published` rows, sorted by **`publishedAt` desc** with missing dates last; paginates DB query; **throws** on duplicate slugs among Published or on Published row **without** slug.
3. **`getPostBySlug()`** returns **`null`** for unknown slug and for **Draft** matches; for a Published match returns metadata + full block tree (paginated; children recursive as in Scope).
4. **No** `client:*` component or client-only file imports `src/lib/notion.ts` (enforce by review + grep).
5. **`pnpm run lint`** exits 0.
6. **`pnpm run build`** exits 0.
7. **With valid `.env`**, a maintainer can run a **local, ephemeral check** (temporary script or REPL — not merged) calling `getPosts()` and `getPostBySlug()` and see results consistent with Notion UI for at least one Published page (and confirm Draft excluded).

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | **`pnpm install`** (or **`pnpm install --frozen-lockfile`**). |
| 2 | **`pnpm run lint`**. |
| 3 | **`pnpm run build`**. |
| 4 | **Grep:** `rg "@notionhq/client" src` — hits only **`notion.ts`** (or re-exports forbidden — should be single file). |
| 5 | **Grep:** `rg "from ['\"].*notion|notion\\.ts" src/components src/pages` — no import of `notion.ts` from obvious client islands (adjust path as needed). |
| 6 | **With `.env`:** ephemeral script calling `getPosts()` — count and slugs match Published-only expectation; repeat for `getPostBySlug` for one known slug; confirm Draft rows never appear. |
| 7 | **Edge case (optional):** In a throwaway Notion copy, duplicate slug between two Published rows — confirm **`getPosts()`** throws with readable error. |

---

## Risks / open questions

| Risk / question | Mitigation / resolution |
|-----------------|-------------------------|
| Notion API / property shape drift | Pin behaviour to blog-plan contract; assert types at mapping layer; fail with clear errors. |
| Large posts or many blocks → slow builds | Pagination + recursive children; optimize in later phase if measured. |
| **B2 without any page importing the module** → build does not prove API connectivity | Accepted: **Manual validation step 6** + Phase B3 will call `getPosts()` during build. |
| **CI without secrets** | Out of scope for B2 (B8); local validation assumes `.env` or future secrets. |

**Open decisions:** None for duplicate/missing slug among Published — this PRD specifies **fail fast** for both duplicate slug and missing slug. Adjust only via explicit change to this PRD.

---

## Honest vagueness refined (from blog-plan B2)

| Original gap | Resolution in this PRD |
|--------------|----------------------|
| “Duplicate slug strategy (fail vs exclude)” | **Fail** inside **`getPosts()`** when duplicates exist among Published. |
| “Missing PublishedAt” | Sort **after** dated posts; secondary **title** ascending. |
| “Missing Slug” on Published | **Throw** with page id — do not silently skip. |
| “Temporary log / one-off script” | **Ephemeral** local verification; do not merge debug pages unless team explicitly allows a `scripts/` smoke tool. |
