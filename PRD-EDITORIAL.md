# PRD: Editorial Voice, Tone, and Narrative Revision

| Field | Value |
| --- | --- |
| Status | Approved for execution |
| Owner | baltz |
| Created | 2026-07-19 |
| Execution plan | `EDITORIAL-ROADMAP.md` (phases, PR split, validation) |
| Voice source of truth | `TONE.md` |

## 1. Context

AI-Native Engineers is an open PT-BR-first curriculum teaching what it means to work as an AI-Native Engineer, aimed at non-technical and junior audiences (QA, PM, designers, recruiters, founders). A full editorial audit ran on 2026-07-19 across every user-facing surface in both locales: 3 lessons, blog, home, /projeto chapters, colinha, 404, redirect pages, and i18n microcopy.

The audit confirmed the voice work is largely done. Live content has zero violations of the `TONE.md` hard rules (no em dashes, no terminology drift, no hype, correct brand usage), and the English surfaces read native. The remaining problems are narrow and named below.

## 2. Problem

1. The site has no formalized narrative. A strong throughline exists implicitly (the reader moves from producing demos by prompting to owning the system that produces software), but no document states it, so future content has no arc to serve. The home page shows bare section titles with no connective tissue.
2. The signature two-beat contrast ("Não é X. É Y.") is repeated 14+ times. 13 instances live in the deprecated harness series, which is dead content behind hard redirects and still sits in the tree.
3. The PT reader, the primary audience, has the poorer version of the publish chapter: the EN mirror carries two sections PT lacks.
4. Small compliance gaps: one banned intensifier in EN, "PRD" used without first-use expansion, one en dash range, and stale statements in `TONE.md` §7 and `REDESIGN.md` that contradict the shipped site.

## 3. Goals

- G1: A written narrative canon (throughline, per-surface register, canonical phrases, signature-move governance) lives in `TONE.md` and governs all future content.
- G2: Zero instances of the audited voice violations in the tree, achieved primarily by deleting the dead legacy layer rather than rewriting dead prose.
- G3: PT and EN project chapters mirror heading-for-heading, with PT receiving the richer publish content.
- G4: The home page carries the narrative arc using one-line section ledes, with no layout or design-system changes.
- G5: Editorial guides (`TONE.md`, `REDESIGN.md`) describe the site as it actually ships.

## 4. Non-goals

- No visual redesign, token, or component changes beyond enabling the existing unused `.section-head__lede` style on the home page.
- No rewriting of the 3 lessons; they passed the audit and were refreshed in commit `ceba3f4`.
- No new routes, collections, or i18n structure changes.
- New blog essays are recommended (roadmap Phase 5) but are not a requirement of this PRD.

## 5. Users and impact

- PT-BR readers (primary): richer publish chapter, a home page that tells them where the journey goes, consistent voice everywhere.
- EN readers: small polish fixes; mirrors stay 1:1.
- Content contributors and agents: one canon to write against; less dead code to trip over; guides that match reality.

## 6. Requirements

### FR1: Narrative canon in TONE.md (roadmap Phase 1)

- FR1.1: New "Narrative" section defining the throughline ("da demo ao sistema"), the reader-journey register table, the canonical phrase list, and the rule of at most one two-beat contrast per page.
- FR1.2: §7 updated to reflect that /projeto already converged and the harness series is removed.
- FR1.3: `REDESIGN.md` gains an errata note pointing to `CLAUDE.md` and `AGENTS.md` as the current design source of truth.

### FR2: Dead layer removal (roadmap Phase 2)

- FR2.1: `src/components/harness/` (content pt/en, components, hooks), `HarnessChapterLayout.astro`, and `src/lib/harness-progress.ts` are removed.
- FR2.2: `harness-chapters.ts` is reduced to the minimal data the redirect pages need, or inlined and deleted.
- FR2.3: The dead `harness` block in `src/lib/i18n.ts`, the four unwired `Hero*` components, and the legacy `accent` field in `sessions.ts` are removed.
- FR2.4: Kitchen-sink demo copy complies with the em dash ban and drops the stale Newsreader mention.
- FR2.5: All `/harness-engineering/*` redirects keep working in both locales with correct hreflang.

### FR3: Live content fixes (roadmap Phase 3)

- FR3.1: EN lesson polish: remove "extremely", naturalize the two flagged translationese passages, restructure the flagged "not only" sentence.
- FR3.2: The two EN-only publish sections are backported to `projeto/publicar.astro` in the site's PT voice.
- FR3.3: "PRD" is expanded on first use in the build chapter, both locales.
- FR3.4: The "2–3 linhas" en dash range becomes "2 a 3 linhas".

### FR4: Home narrative pass (roadmap Phase 4)

- FR4.1: One-line ledes under the curriculum, blog, and project sections on both home pages, reusing existing styles and existing i18n copy where available (`t.project.homeDesc`).
- FR4.2: Hero and manifesto remain untouched.

## 7. Acceptance criteria

- `npm run lint`, `npm run format:check`, and `npm run build` pass after every phase.
- Grep guards return empty on user-facing sources: em dash in prose, "é importante notar", "vale lembrar", "extremely", "incredibly", "revolucionário" (except the existing critical usage in `ferramentas.mdx`).
- PT/EN heading trees match on all mirrored surfaces.
- A first-time visitor can retell the site's story from the home page alone.
- Every PR respects the 400-line cap outside `src/content/**`; deletions are split across PRs as needed.

## 8. Risks

| Risk | Mitigation |
| --- | --- |
| Deleting the harness layer breaks redirect slugs or hreflang | FR2.5 click-through in both locales before merge; slugs kept in data, not derived |
| Backported PT sections drift from the site voice | Write against `TONE.md` checklist; read-aloud pass |
| Narrative ledes read as marketing filler | Ledes state the arc in plain language; one line each; no adjectives without information |
| Guides drift again after this pass | Phase 6 records an optional CI `tone-check` follow-up in `ROADMAP.md` |

## 9. Rollout

Sequenced as `EDITORIAL-ROADMAP.md` phases 1 to 6, one phase per PR set, validated with the `quality-gate` skill before handoff. No feature flags; every merge deploys via the existing GitHub Pages workflow.
