# PRD: Blog Phase B1 — Dependency and env contract

**References:** [blog-plan.md](../blog-plan.md) Phase B1; [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md) (site-wide product context only).

**Phase mapping:** Blog implementation **Phase B1**. Does **not** implement Notion queries, `/blog` routes, or README authoring instructions for Notion (those belong to Phase B2+ per blog-plan).

**Package manager:** This repository uses **pnpm**. The committed lockfile is **[pnpm-lock.yaml](../../pnpm-lock.yaml)** at the repo root. Phase B1 updates that lockfile—not `package-lock.json`. Scripts in `package.json` are invoked with `pnpm run <script>` (equivalent to `npm run` for this project).

---

## Goal

Prepare the repository so the official Notion SDK is available at the correct version range for upcoming build-time integration, and establish a **safe environment-variable contract** (`NOTION_TOKEN`, `NOTION_DATABASE_ID`) via `.env.example`, without exposing secrets or shipping Notion code to the browser.

---

## Scope

1. **Dependency**
   - Add **`@notionhq/client`** as a runtime dependency in [package.json](../../package.json) (aligned with existing semver style: caret `^` on minor-range updates unless team pins otherwise).

2. **Environment contract**
   - Add **[`.env.example`](../../.env.example)** at repository root containing **both** variables named exactly:
     - `NOTION_TOKEN`
     - `NOTION_DATABASE_ID`
   - Values must be **non-secret placeholders** only (empty string after `=` or short descriptive placeholders such as `secret_integration_token_here`), plus brief comments stating:
     - Tokens are obtained from a Notion integration.
     - Database ID identifies the posts database described in blog-plan (property contract unchanged).

3. **Lockfile**
   - Update **`pnpm-lock.yaml`** via **`pnpm add @notionhq/client`** (preferred) or **`pnpm install`** after a verified `package.json` edit so installs are reproducible.

4. **Verification discipline**
   - After merge of implementation work for this phase: **`pnpm install`** succeeds (CI-equivalent: **`pnpm install --frozen-lockfile`**); **`pnpm run lint`** and **`pnpm run build`** still pass with **no new errors** (warnings unchanged unless pre-existing).

---

## Out of scope

- **`src/lib/notion.ts`** or any Notion API calls.
- **`/blog`** routes, layouts, `PostCard`, `NotionBlocks`, or Astro `getStaticPaths` for blog.
- **README.md** updates for Notion setup (explicitly Phase B7 in blog-plan).
- **GitHub Actions** secrets wiring (Phase B8).
- **Astro `env` schema** / `astro.config` changes solely for typed env — optional later if team adopts Astro env schemas; not required for B1 deliverables as written.
- **Database creation**, property setup, or content authoring in Notion (documentation phase).

---

## User flow

**End users:** None in Phase B1 — no new pages or UI.

**Contributors / developers (setup-only narrative):**

1. Clone repository and run `pnpm install`.
2. Copy `.env.example` → `.env` (local file; gitignored).
3. Paste real `NOTION_TOKEN` and `NOTION_DATABASE_ID` when implementing Phase B2+ (not required for B1 acceptance).

---

## UI states

Not applicable — no user-facing UI is introduced in Phase B1.

*(Optional developer-facing mental model: “repo builds exactly as before; blog-related env vars exist only as documented placeholders.”)*

---

## Technical notes

- **Stack constraint:** Remains Astro + TypeScript + MDX + React islands + CSS Modules per [AGENTS.md](../../AGENTS.md). Phase B1 adds **only** `@notionhq/client`.
- **Secrets:** Real `.env` must remain ignored. [`.gitignore`](../../.gitignore) already ignores `.env` and `.env.*` with **`!.env.example`** — verify this stays true after edits (no accidental un-ignore of `.env`).
- **Client bundle:** Phase B1 must **not** import `@notionhq/client` from any page or React island; adding the package alone satisfies B1 as long as nothing imports it yet.
- **Node:** [package.json](../../package.json) declares `engines.node` (`>=22 <23`); CI/local must satisfy this when installing.
- **pnpm:** Ensure **pnpm** is available locally and in CI (version pinned in CI optional but recommended). Do not introduce a root **`package-lock.json`** unless the project explicitly migrates from pnpm to npm.

---

## Acceptance criteria

1. `@notionhq/client` appears under **`dependencies`** in `package.json` with an appropriate semver range.
2. `.env.example` exists at repo root and lists **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** with placeholder-only values and brief comments (English per harness-doc convention).
3. **`pnpm-lock.yaml`** reflects the new dependency (resolved entries updated after install/add).
4. No real integration token or database ID appears in git history for this change.
5. `pnpm run lint` exits 0.
6. `pnpm run build` exits 0.

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | Fresh or clean `node_modules`: run **`pnpm install`** (optional strict check: **`pnpm install --frozen-lockfile`** after lockfile is committed). |
| 2 | Confirm **`pnpm run lint`** passes. |
| 3 | Confirm **`pnpm run build`** passes. |
| 4 | Open `.env.example` — confirm placeholders only; grep repo for accidental `secret_` / long tokens (spot check). |
| 5 | Confirm `.gitignore` still ignores `.env` and allows `.env.example`. |
| 6 | Smoke existing routes locally (`pnpm run dev` / `pnpm run preview`): `/`, `/sessions/glossario/` — unchanged behavior (no blog route expected yet). |

---

## Risks / open questions

| Risk / question | Mitigation / resolution |
|-----------------|-------------------------|
| Accidental commit of `.env` with secrets | Never commit `.env`; rely on `.gitignore`; optional PR checklist. |
| Fork contributors confused without README Notion docs | Accepted gap until Phase B7; `.env.example` comments give minimal orientation only. |
| Dependency version drift / breaking API | Pin acceptable range in PR review; Phase B2 will validate API usage against chosen client version. |
| **`pnpm install --frozen-lockfile` fails in CI** | Lockfile must be regenerated locally after dependency changes and committed; align CI with same pnpm major version when possible. |
| Astro or tooling treats env vars unexpectedly before B2 | No runtime consumption in B1; if build suddenly reads `.env`, ensure absence of `.env` in CI still passes — unchanged from today if nothing imports Notion. |

**Open decisions:** None required for B1 beyond agreeing caret vs pin for `@notionhq/client` at PR review.

---

## Honest vagueness refined (from blog-plan B1)

| Original gap | Resolution in this PRD |
|--------------|----------------------|
| “Clean install” | Use **`pnpm install`** locally; **`pnpm install --frozen-lockfile`** for CI-style reproducibility once `pnpm-lock.yaml` is committed. |
| “`.env.example` empty placeholders” | Use empty values **or** obvious non-real placeholders **plus** comments (integration + DB ID purpose). |
| Lockfile “if repo uses one” | Repo uses **`pnpm-lock.yaml`** — updating it via **`pnpm add`** / **`pnpm install`** is **in scope**. |
