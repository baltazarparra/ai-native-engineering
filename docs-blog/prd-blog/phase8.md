# PRD: Blog Phase B8 — CI secrets policy

**References:** [blog-plan.md](../blog-plan.md) (Phase B8, § GitHub Pages note); [phase7.md](phase7.md); [phase1.md](phase1.md); [AGENTS.md](../../AGENTS.md); [PLAN.md](../../PLAN.md).

**Phase mapping:** Blog **Phase B8**. Makes **GitHub Actions** behaviour for Notion-backed builds **explicit and safe**: encrypted secrets for production deploys, documented fork/PR limitations, no tokens in YAML. Depends on blog routes and **`src/lib/notion.ts`** (B2+). Does **not** add blog features, Notion block changes, or **`/en/blog/`**.

**Package manager:** [pnpm](../../pnpm-lock.yaml) — workflow should align with repo tooling (see §2).

---

## Goal

Pushes to the **canonical** repository’s default branch produce a **green** deploy workflow when maintainers configure the required GitHub secrets, and **fail loudly** when secrets are missing on that path—so production never silently ships a broken or half-configured blog. Contributors understand **why fork PR builds may not have Notion access** and where to set secrets locally vs in GitHub.

---

## Scope

### 1. Production deploy workflow — [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)

**Baseline (B7):** Workflow runs on **`push` to `main`** and **`workflow_dispatch`**. Build uses **`withastro/action`** with **`package-manager: npm`** and **`build-cmd: npm run build`**, while the repo documents **pnpm** only (no `package-lock.json`). **No** `NOTION_TOKEN` / `NOTION_DATABASE_ID` are passed into the build step today—production builds either fail at Notion import time or only succeed if secrets exist elsewhere undocumented.

**B8 requirements:**

- Pass Notion env into the **build** job (not deploy) using **GitHub Actions secrets** only:
  - `NOTION_TOKEN` ← `${{ secrets.NOTION_TOKEN }}`
  - `NOTION_DATABASE_ID` ← `${{ secrets.NOTION_DATABASE_ID }}`
- **No plaintext** tokens, database IDs, or integration secrets in workflow YAML, commit messages, or logs (do not echo secret values in steps).
- Add **workflow comments** (YAML `#`) listing required secret **names** and pointer to README § Blog / this PRD.
- **Align package manager with repo (locked default):** set **`package-manager: pnpm`** (and matching install/build invocation per `withastro/action` docs) so CI matches local **`pnpm run build`** and **`pnpm-lock.yaml`**. Remove reliance on non-existent **`npm`** lockfile for CI reproducibility.
- Keep **Node 22** aligned with **`package.json` `engines`**.
- **Do not** add new workflows unless a separate PR-check workflow is explicitly needed; default is **update deploy.yml only**.

**Production path behaviour (locked default):**

| Event | Repo | Secrets present | Expected build |
|-------|------|-----------------|----------------|
| `push` → `main` | Canonical upstream | Yes | **Success**; `/blog/` and slug pages include Notion content |
| `push` → `main` | Canonical upstream | No | **Fail** with clear missing-env error from `notion.ts` (no silent skip) |
| `workflow_dispatch` | Canonical | Yes / No | Same as above |

Rationale: the public site advertises **`/blog/`** (B7); an empty or omitted blog on production without failing is worse than a red CI until secrets are configured.

### 2. Forks and pull requests

**B8 requirements (documentation + workflow comments, not necessarily code):**

- Document that **GitHub does not expose repository secrets to workflows from untrusted forks** (and often not to fork-owned PRs against upstream).
- **Locked default:** No “empty blog stub” or `SKIP_NOTION` build flag in B8—fork PR CI **may fail** on `pnpm run build` if blog pages call Notion without env. README states expectation; optional workflow note in YAML.
- **Optional (in scope only if trivial):** Run deploy workflow only on `push` to `main` (already true)—do **not** add `pull_request` trigger unless product explicitly rescopes.

**Out of B8 for forks:** automatic Notion-less build for external PRs (would require `notion.ts` or page-level gating—defer).

### 3. README and harness docs

**Baseline:** [README.md](../../README.md) § **Blog (Notion)** covers local `.env`; no **GitHub Actions** subsection.

**B8 requirements:**

- Add **`### CI / GitHub Actions`** (or equivalent) under **Blog (Notion)** describing:
  - Secret names: **`NOTION_TOKEN`**, **`NOTION_DATABASE_ID`**
  - Where to add them: repository **Settings → Secrets and variables → Actions**
  - That **push to `main`** on the canonical repo **requires** both for a green deploy
  - Fork/contributor PR limitation (no upstream secrets on fork PRs)
  - Link to [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)
- **Do not** paste secret values or example real UUIDs/tokens.

**Optional:** Short cross-link in [docs-blog/blog-plan.md](../blog-plan.md) § GitHub Pages note pointing to B8 policy (one paragraph max).

### 4. Phase completion artifact

- After implementation: **`docs-blog/reports/blog-b8-report.md`** — secrets wired, pnpm alignment, fail-loud policy, fork notes, validation evidence (Actions run or local simulation).
- Update [docs-blog/README.md](../README.md) reports index to include **`blog-b8-report.md`** and **`phase8.md`**.

---

## Out of scope

- Stub blog / conditional `getStaticPaths` when secrets absent (empty blog without failing).
- New GitHub environments beyond existing **`github-pages`** deploy pattern.
- Rotating Notion tokens automatically or Notion webhook rebuild triggers.
- **`/en/blog/`**, Notion block matrix, Shiki/images (B5–B6).
- Requiring secrets on **local** `pnpm run build` for contributors without blog work (local `.env` remains contributor-owned; unchanged).
- **Org-level** secret sharing documentation beyond a sentence (“org admins can set repo secrets”).

---

## Technical notes

- **Build-time only:** Secrets are read during **`astro build`** in CI; they must not appear in client bundles (existing B2–B7 rule; re-verify with grep on `dist/` in manual validation).
- **`notion.ts`:** No change required if missing env already throws **`Missing required environment variable: …`**—B8 validates that message surfaces in CI logs when secrets are unset.
- **Sharp / image pipeline:** Production CI must still run image optimisation (B6); ensure Node/pnpm setup does not skip **`sharp`** native install (existing **`pnpm.onlyBuiltDependencies`** policy).
- **Secret rotation:** Operational note in README—update GitHub secret, re-run deploy; no code change.

---

## Acceptance criteria

1. [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) injects **`NOTION_TOKEN`** and **`NOTION_DATABASE_ID`** from **`secrets.*`** into the build job environment (names exact).
2. Workflow contains **no plaintext** Notion credentials.
3. Workflow uses **pnpm** (or documented equivalent) consistent with [**`pnpm-lock.yaml`**](../../pnpm-lock.yaml) and README commands.
4. With secrets configured on the canonical repo, **`push` to `main`** (or manual **`workflow_dispatch`**) completes **build + deploy** and published site includes current **Published** blog posts.
5. With secrets **absent** on a test branch/workflow experiment, build **fails** with an identifiable missing-env error (not a silent empty blog on production).
6. **README.md** documents CI secret names, setup location, production requirement, and fork limitation.
7. **`pnpm run lint`** and local **`pnpm run build`** (with local `.env`) still exit **0**—B8 workflow-only changes must not break local dev.
8. **`docs-blog/reports/blog-b8-report.md`** exists after implementation; **`docs-blog/README.md`** indexes phase8 + report.

---

## Manual validation

| Step | Action |
|------|--------|
| 1 | Confirm GitHub repo **Actions secrets** exist: `NOTION_TOKEN`, `NOTION_DATABASE_ID` |
| 2 | Push to **`main`** (or run **workflow_dispatch**) — workflow **green** |
| 3 | Open deployed site **`/blog/`** — Published posts visible |
| 4 | Temporarily remove/rename one secret (maintainer test) — rebuild **fails**; logs mention missing `NOTION_*` |
| 5 | Read workflow YAML — comments list secret names; no token substrings |
| 6 | Optional: inspect `dist/` or built assets — no `NOTION_TOKEN` literal in client JS |
| 7 | Regression: `/`, `/sessions/glossario/` still deploy; lint local pass |

**Fork test (documentation only if no fork available):** Confirm README explains fork PRs do not receive upstream secrets.

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Secrets missing on first deploy after B8 | README + workflow comments; fail loud on `main` |
| Fork PR CI always red | Document; contributors use local `.env` for blog work |
| `npm` vs `pnpm` drift in CI | Align `withastro/action` to **pnpm** in B8 |
| Secret leaked in Action logs | Never `echo` secrets; use env block only |
| Notion API outage during deploy | Transient failure acceptable; retry workflow; note in report |
| Maintainers use wrong secret names | Exact names in YAML comments + README table |

---

## Honest vagueness (defaults for this PRD)

| Ambiguity | Default |
|-----------|---------|
| Missing secrets on production `main` | **Fail build** (no silent empty blog) |
| Missing secrets on fork PR | **Document**; no stub implementation in B8 |
| Package manager in CI | **pnpm** (fix `npm` in deploy workflow) |
| Separate PR workflow | **No** new workflow; **deploy.yml** only |
| `pull_request` trigger | **Not added** |
| Second environment for staging | **Out of scope** |

---

## Implementation hints (non-normative)

Example build env block (illustrative only):

```yaml
env:
  NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
  NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
```

Place under the **build** job (or the step that runs `astro build`), not the deploy job.

Likely touch points:

| Path | Likely change |
|------|----------------|
| [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) | Secrets env, pnpm, comments |
| [`README.md`](../../README.md) | CI subsection under Blog |
| [`docs-blog/reports/blog-b8-report.md`](../reports/blog-b8-report.md) | Add after implementation |
| [`docs-blog/README.md`](../README.md) | Index phase8 + b8 report |

**Unlikely:** `src/lib/notion.ts`, blog Astro pages, `astro.config.mjs`.
