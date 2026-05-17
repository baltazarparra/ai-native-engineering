# Phase completion report: Blog B1 — Dependency and env contract

**Phase:** Blog implementation Phase B1 (see [blog-plan.md](../blog-plan.md)).  
**PRD:** [prd-blog/phase1.md](../prd-blog/phase1.md).  
**Harness context:** [AGENTS.md](../../AGENTS.md), [PLAN.md](../../PLAN.md), [README.md](../../README.md).

---

## Summary

Phase B1 added the official Notion SDK as a runtime dependency, documented the required environment variables in a committed `.env.example`, updated `pnpm-lock.yaml` so installs resolve `@notionhq/client`, and kept all Notion usage out of application source until Phase B2. No `/blog` routes or `src/lib/notion.ts` were introduced.

Additional repository hygiene was needed so verification commands could pass on Windows + pnpm 11 (ignored lifecycle scripts for native tooling dependencies).

---

## Files created or changed

| Path | Change |
|------|--------|
| `package.json` | Added `@notionhq/client` dependency (`^5.21.0`); added `pnpm.onlyBuiltDependencies` listing `esbuild` and `sharp`. |
| `pnpm-lock.yaml` | Updated to include `@notionhq/client` and importer wiring consistent with pnpm lockfile v9. |
| `.env.example` | **Created** at repo root with `NOTION_TOKEN` and `NOTION_DATABASE_ID` (empty placeholders) and English comments. |
| `src/pages/projeto/construir.astro` | Removed stray Git merge conflict markers that blocked ESLint/Astro compilation during validation (unrelated to blog UI; required for lint/build green). |

**Not changed (per PRD out of scope):** `README.md`, GitHub Actions workflows, `src/lib/notion.ts`, blog pages under `src/pages/blog/`.

---

## Technical decisions

1. **Package manager:** Locked Phase B1 execution to **pnpm** and **`pnpm-lock.yaml`** per the PRD update (no root `package-lock.json`).
2. **SDK version:** Used **`^5.21.0`** for `@notionhq/client` (caret range; explicit pin deferred to PR review policy in PRD).
3. **pnpm 11 lifecycle scripts:** Recorded **`pnpm.onlyBuiltDependencies`** for `esbuild` and `sharp` so documented installs align with Astro/Vite toolchain expectations; **`pnpm approve-builds --all`** was run locally once so blocked postinstall/install scripts could run.
4. **Invoking pnpm on Windows:** Validation used **`pnpm.CMD`** from `%LOCALAPPDATA%\pnpm\bin\` where PowerShell execution policy blocked `pnpm.ps1`.

---

## How the phase was validated

1. **`pnpm approve-builds --all`** then **`pnpm install --frozen-lockfile`** — completed successfully after addressing ignored builds for `esbuild` and `sharp`.
2. **`pnpm run lint`** — completed with exit code 0 after resolving merge markers in `src/pages/projeto/construir.astro`.
3. **`pnpm run build`** — completed with exit code 0 (static build produced successfully).
4. **Manual checks aligned with PRD:** `.gitignore` continues to ignore `.env` while allowing `.env.example`; no `@notionhq` imports were added under `src/` (confirmed via search during the phase).

---

## PRD criteria satisfied

Reference: [prd-blog/phase1.md](../prd-blog/phase1.md) — Acceptance criteria and Manual validation.

| Criterion | Satisfied |
|-----------|-----------|
| (1) `@notionhq/client` in `dependencies` | Yes |
| (2) `.env.example` with exact variable names, placeholders, English comments | Yes |
| (3) `pnpm-lock.yaml` reflects the dependency | Yes |
| (4) No real secrets committed in tracked files for this work | Yes for authored artifacts (`.env.example` placeholders only); assumes contributors did not commit a populated `.env`. |
| (5) Lint passes (`pnpm run lint`) | Yes at validation time |
| (6) Build passes (`pnpm run build`) | Yes at validation time |
| Manual validation steps M1–M6 | Covered by install + lint + build + spot checks noted above |

**PRD scope/out-of-scope:** Items explicitly out of scope for B1 (Notion module, blog routes, README Notion guide, CI secrets, Astro env schema) were **not** implemented — consistent with the PRD.

---

## Problems found and resolution

| Problem | Resolution |
|---------|------------|
| `pnpm` not on PATH or PowerShell blocked `pnpm.ps1` (execution policy) | Used **`pnpm.CMD`** with full path under `%LOCALAPPDATA%\pnpm\bin\`. |
| **`ERR_PNPM_IGNORED_BUILDS`** for `esbuild` / `sharp` on install | Ran **`pnpm approve-builds --all`**; added **`pnpm.onlyBuiltDependencies`** in `package.json`. |
| ESLint/Astro parse failure from unresolved **`<<<<<<<`** markers in `construir.astro` | Resolved conflicts by keeping the Portuguese copy consistent with “fase” wording and removing markers. |

---

## Pending work or limitations for the next phase

1. **Phase B2 (`src/lib/notion.ts`):** Implement `getPosts()` / `getPostBySlug()`, Published-only filtering, pagination, and the duplicate-or-missing **Slug** strategy called out in [blog-plan.md](../blog-plan.md).
2. **Local `.env`:** Contributors still need a real `.env` (not committed) to exercise the API during B2; **README Notion setup remains Phase B7** per PRD.
3. **CI:** **Phase B8** still needs an explicit policy for secrets and optional **`pnpm approve-builds`** / frozen installs on GitHub Actions — not part of B1.
4. **Fresh clone caveat:** New machines may still need **`pnpm approve-builds`** interaction unless CI/docs codify trusted builds fully; **`onlyBuiltDependencies`** documents intent but behaviour depends on pnpm version/policy.
