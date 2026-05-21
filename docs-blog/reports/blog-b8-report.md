# Phase completion report: Blog B8 — CI secrets policy

**Phase:** Blog implementation Phase B8 (see [blog-plan.md](../blog-plan.md)).  
**PRD:** [prd-blog/phase8.md](../prd-blog/phase8.md).  
**Depends on:** Blog pipeline (B2–B7).  
**Harness context:** [AGENTS.md](../../AGENTS.md), [PLAN.md](../../PLAN.md).

---

## Summary

Phase B8 wires **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** into the GitHub Pages **build** job, aligns CI with **pnpm** (matching **`pnpm-lock.yaml`** and local docs), and documents production vs fork behaviour in **`README.md`**. Missing secrets on **`push` to `main`** cause a **failed build** (existing **`notion.ts`** `requiredEnv` errors) — no empty-blog stub. No application source changes.

---

## Files created or changed

| Path | Change |
|------|--------|
| [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) | Job **`env`** from **`secrets.*`**; **`package-manager: pnpm`**; **`pnpm run build`**; YAML comments |
| [`README.md`](../../README.md) | **`### CI / GitHub Actions`** under Blog (Notion) |
| [`docs-blog/blog-plan.md`](../blog-plan.md) | GitHub Pages note → B8 fail-loud policy |
| [`docs-blog/reports/blog-b8-report.md`](blog-b8-report.md) | This report |

**Not changed:** `src/lib/notion.ts`, blog Astro pages, `astro.config.mjs`.

---

## Technical decisions

| Topic | Decision |
|-------|----------|
| **Missing secrets on `main`** | **Fail build** (no `SKIP_NOTION`) |
| **Secret injection** | Build job **`env:`** block — `${{ secrets.NOTION_TOKEN }}`, `${{ secrets.NOTION_DATABASE_ID }}` |
| **CI package manager** | **pnpm** + **`pnpm run build`** (was **npm** without lockfile) |
| **Fork PR CI** | Document only; no workflow workaround |
| **Plaintext in YAML** | Secret **names** in comments only; no values |

---

## Maintainer checklist (before / after merge)

1. In GitHub **Settings → Secrets and variables → Actions**, create **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** on the **canonical** repository.
2. Merge B8 and verify **Deploy to GitHub Pages** is green on **`main`** (or run **workflow_dispatch**).
3. Confirm live **`/blog/`** shows Published posts.
4. Optional fail-loud test: temporarily remove one secret → rebuild should fail with `Missing required environment variable: NOTION_*`.

---

## How the phase was validated

1. **`pnpm run lint`** — exit **0**.
2. **`pnpm run build`** (local `.env`) — exit **0**; blog pages still generated.
3. Workflow YAML review: secrets via **`secrets.*`** only; no echoed values.
4. **`@notionhq/client`:** runtime import only in **`notion.ts`**; type-only in **`notion-rich-text.ts`**.
5. **CI on `main`:** Maintainer must confirm green Actions run after secrets are configured (not verifiable from repo alone without GitHub access).

---

## PRD criteria satisfied

Reference: [prd-blog/phase8.md](../prd-blog/phase8.md) — Acceptance criteria (1–8).

| # | Criterion | Satisfied |
|---|-----------|-----------|
| 1 | Workflow injects **`NOTION_*`** from **`secrets.*`** | Yes |
| 2 | No plaintext credentials in workflow | Yes |
| 3 | CI uses **pnpm** consistent with lockfile/README | Yes |
| 4 | Green deploy with secrets on canonical repo | **Maintainer verify** after secrets configured |
| 5 | Absent secrets → fail with missing-env error | Yes (via **`notion.ts`**; maintainer can optional-test) |
| 6 | README documents CI secrets + fork limitation | Yes |
| 7 | Local **lint** / **build** unchanged | Yes at validation time |
| 8 | **`blog-b8-report.md`** + docs index | Yes |

---

## Problems found and resolution

| Issue | Resolution |
|-------|------------|
| CI used **npm** without **`package-lock.json`** | Switched **`withastro/action`** to **pnpm** |

---

## Blog feature status

Phases **B1–B8** complete per [blog-plan.md](../blog-plan.md): dependency contract, Notion module, listing/detail, blocks, Shiki/images, discoverability/README, and CI secrets policy.
