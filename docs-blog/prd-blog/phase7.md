# PRD: Blog Phase B7 — Navigation and README

**References:** [blog-plan.md](../blog-plan.md) (Phase B7); [phase6.md](phase6.md); [phase5.md](phase5.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md).

**Phase mapping:** Blog **Phase B7**. Makes the Notion-backed **`/blog/`** section **discoverable** on the public site and **reproducible** for contributors via root **`README.md`**. Depends on shipped blog routes (**B3–B4**), **`notion.ts`** (**B2**), and polished blocks/images (**B5–B6**). Does **not** define GitHub Actions secrets policy (**Phase B8**), **`/en/blog/`**, or new Notion block types.

**Package manager:** [pnpm](../../pnpm-lock.yaml) — same conventions as [phase1.md](phase1.md).

---

## Goal

A visitor can find the blog from existing site chrome without knowing the URL, and a contributor can follow **only** the root **`README.md`** (plus **`.env.example`**) to configure Notion, run a local build, and see Published posts at **`/blog/`** and **`/blog/{slug}/`**.

---

## Scope

### 1. Site discoverability (`/blog/` link)

**Baseline (B3–B6):** Blog routes exist at **`/blog/`** and **`/blog/[slug]/`** but **no** global link from [`SiteHeader`](../../src/components/SiteHeader/SiteHeader.astro), [`Footer`](../../src/components/Footer/Footer.astro), or the home page points to them.

**B7 requirements:**

- Add a **stable URL helper** in [`src/lib/i18n.ts`](../../src/lib/i18n.ts), e.g. **`getBlogHref(lang: Lang): string`**, returning **`withBase('blog/')`** for **`pt-BR`** (trailing slash consistent with existing route helpers). **Do not** add **`/en/blog/`** in B7 unless explicitly rescoped.
- Add a **Footer** text link to the blog listing using Neo Brutalism tokens already used in [`Footer.module.css`](../../src/components/Footer/Footer.module.css). Label copy via **`ui[lang]`** (new keys under **`footer`** or a small **`nav`** namespace)—**PT-BR primary** label (default: **Blog**).
- Add **one** additional discoverability surface on the **PT-BR home page** ([`src/pages/index.astro`](../../src/pages/index.astro)) so the blog is not footer-only. **Locked default:** a compact block in the same spirit as the existing **Harness Engineering** CTA section (badge + heading + short line + **`Button`** → **`getBlogHref(lang)`**). Copy in **PT-BR**; no new React island required.
- Links must use **`getBlogHref`** / **`withBase`** so GitHub Pages **`base`** stays correct.
- **Accessibility:** visible **`:focus-visible`** on new links; descriptive **`aria-label`** only where the visible label is insufficient.
- **English home (`/en/`):** **Out of scope** for B7 nav copy unless trivial to mirror one link—default **PT-BR home only** for the CTA block; Footer link appears on all pages that render **`Footer`** with the chosen **`lang`**.

**Explicit non-goals for nav:**

- Rebuilding **`SiteHeader`** into a full primary nav bar.
- Blog link in **session sidebars** or **MDX** templates.
- RSS, search, or tags.

### 2. Root `README.md` — Notion blog contributor guide

**Baseline:** [`.env.example`](../../.env.example) documents variable **names** and points to **`docs-blog/blog-plan.md`**. Root [**`README.md`**](../../README.md) has **no** blog section.

**B7 requirements:** Add a dedicated **`## Blog (Notion)`** section (English prose per harness rules) covering at minimum:

| Topic | Content |
|-------|---------|
| **What it is** | Static **`/blog/`** generated at build time from a Notion database; no runtime API in the browser. |
| **Prerequisites** | Node **22.x** (per **`package.json` `engines`**), **pnpm**, Notion workspace access. |
| **Integration** | Create a Notion integration; copy **internal integration secret** → **`NOTION_TOKEN`**. |
| **Database** | Create database with properties matching [blog-plan.md](../blog-plan.md) § Notion database contract: **Title**, **Slug**, **Status** (`Published` \| `Draft`), **PublishedAt**, **Summary**, **Cover**. |
| **Share with integration** | Connect integration to the database (or parent page) so API queries succeed. |
| **Database ID** | Extract UUID from Notion URL → **`NOTION_DATABASE_ID`**. |
| **Local env** | Copy **`.env.example`** → **`.env`**; never commit **`.env`**. |
| **Build commands** | **`pnpm install`**, **`pnpm run build`**, **`pnpm run preview`**; open **`/blog/`**. |
| **Publishing workflow** | Set **Status** to **Published**; unique **Slug** per Published row; **Draft** never appears on site. |
| **Authoring tips** | Use Notion **`/code`** blocks for syntax highlighting; **Cover** and in-body **image** blocks use Astro image pipeline (see B6 **`image.remotePatterns`** in [`astro.config.mjs`](../../astro.config.mjs)); **rebuild** after content changes; signed file URLs may expire until next deploy. |
| **Troubleshooting** | Missing env → build error naming variable; duplicate slug → build error; empty list → valid with empty state; optional pointer to **`notion-smoke.ts`** if present for env diagnostics. |
| **Deeper docs** | Link to **`docs-blog/blog-plan.md`** and phase reports under **`docs-blog/reports/`**. |

**README must not** embed real tokens, database IDs, or private workspace URLs.

**Optional (low effort, in scope if trivial):** One sentence under **Contributing** pointing to the Blog section for Notion-backed posts.

### 3. Harness doc cross-links

- Update [`docs-blog/README.md`](../README.md) index to list **`phase7.md`**.
- **No** requirement to duplicate the full README guide inside **`docs-blog/`**—single source of truth remains root **`README.md`** for contributors.

### 4. Phase completion artifact

- After implementation, add **`docs-blog/reports/blog-b7-report.md`** (same pattern as B5/B6): files touched, nav surfaces added, README section summary, validation commands.

---

## Out of scope

- **GitHub Actions** / fork **`NOTION_*`** behaviour (**Phase B8**).
- **`/en/blog/`** listing or detail routes.
- New **`NotionBlocks`** types, inline rich-text beyond B6, or CMS features (comments, search, pagination UI).
- **Public Notion template duplicate** of the database (optional future; mention as risk only).
- Changing **`notion.ts`** query logic unless required for README accuracy (default: **no code changes** in **`notion.ts`**).
- **Lighthouse / SEO** campaigns beyond sensible link labels already on blog pages.

---

## User flows

### Visitor

1. Lands on home (or any page with **Footer**).
2. Sees **Blog** entry point (home CTA and/or footer).
3. Navigates to **`/blog/`**, opens a post card → **`/blog/{slug}/`**.

### Contributor

1. Reads **`README.md` § Blog (Notion)**.
2. Creates integration + database per contract; fills **`.env`**.
3. Runs **`pnpm run build`** and **`pnpm run preview`**.
4. Confirms Published rows appear; Draft rows do not.

---

## Technical notes

- **i18n:** Reuse [`withBase`](../../src/lib/i18n.ts) and existing **`Lang`** types; blog remains **PT-BR content** at **`/blog/*`** routes.
- **Components:** Prefer **pure Astro** + CSS Modules for any new chrome; **no** `client:*` + **`notion.ts`** pairing.
- **Secrets:** README and UI copy must never instruct committing **`.env`**.
- **Existing pages:** Blog listing/detail already use **`BaseLayout`** + **`Footer`**; B7 only adds outward links **into** the blog.
- **Smoke script:** If [`notion-smoke.ts`](../../notion-smoke.ts) exists, README may reference it as an optional env check (no requirement to modify the script in B7).

---

## Acceptance criteria

1. **Footer** on a representative page (e.g. home or a session page) includes a working link to **`/blog/`** (respecting site **`base`**).
2. **PT-BR home** includes a visible blog discoverability block with link to **`/blog/`** (per locked default above).
3. Root **`README.md`** contains a **`## Blog (Notion)`** section satisfying the topic table in §2 without secrets.
4. **`getBlogHref`** (or equivalent) exists in **`i18n.ts`** and is used by new links (no hard-coded `/blog/` paths that ignore **`base`**).
5. **`pnpm run lint`** and **`pnpm run build`** exit **`0`** with valid **`NOTION_*`** (blog pages still generated).
6. B3–B6 behaviour unchanged: listing, detail, **NotionBlocks**, Shiki code, **NotionImage**, empty-state and duplicate-slug policies.
7. No new runtime **`@notionhq/client`** importers beyond **`notion.ts`** (+ type-only **`notion-rich-text.ts`** per B5).
8. **`docs-blog/README.md`** indexes **`phase7.md`**; **`blog-b7-report.md`** exists after implementation.

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | Fresh-read **`README.md` § Blog** — follow steps on a clean clone mental walk (or real clone) |
| 2 | **`pnpm run lint`** → **`pnpm run build`** → **`pnpm run preview`** |
| 3 | Home → click blog CTA → **`/blog/`** loads |
| 4 | Session page → Footer **Blog** → **`/blog/`** loads |
| 5 | Confirm **`/sessions/glossario/`** (or another core route) still builds and renders |
| 6 | Optional: temporarily rename env vars — build error message is understandable |
| 7 | In Notion, set one row to **Draft** — rebuild — post absent from list and static paths |

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Contributors lack Notion workspace access | README states requirement; optional template DB noted as future |
| README drifts from **`blog-plan.md`** property contract | Single table copied from blog-plan; link to canonical plan |
| Footer-only discovery too weak | Home CTA block required by default |
| Hard-coded `/blog/` breaks GitHub Pages subpath | **`getBlogHref`** + **`withBase`** enforced in PR review |
| Internal-only integration blocks forks | Document sharing DB with integration; B8 will cover CI |

---

## Honest vagueness (defaults for this PRD)

| Ambiguity | Default |
|-----------|---------|
| Nav placement beyond Footer | **PT-BR home CTA block** (Harness-style), not **SiteHeader** mega-nav |
| Footer label | **Blog** (PT-BR); English UI strings only where **`ui['en']`** already used on shared chrome |
| **`/en/blog/`** | **Out of scope** |
| README language | **English** section in root README (harness docs rule) |
| Public Notion template | **Optional future**; not required for B7 acceptance |
| **`notion-smoke.ts` changes** | **Reference only**; no change required |
| SiteHeader blog link | **Deferred** unless implementation already touches header for another reason |

---

## Implementation hints (non-normative)

Likely touch points:

| Path | Likely change |
|------|----------------|
| [`src/lib/i18n.ts`](../../src/lib/i18n.ts) | **`getBlogHref`**, **`ui`** strings |
| [`src/components/Footer/Footer.astro`](../../src/components/Footer/Footer.astro) | Blog link |
| [`src/components/Footer/Footer.module.css`](../../src/components/Footer/Footer.module.css) | Link styling if needed |
| [`src/pages/index.astro`](../../src/pages/index.astro) | Blog CTA section |
| [`README.md`](../../README.md) | **§ Blog (Notion)** |
| [`docs-blog/README.md`](../README.md) | PRD index |

Unlikely: **`src/lib/notion.ts`**, blog components under **`src/components/blog/`**, **`astro.config.mjs`**.
