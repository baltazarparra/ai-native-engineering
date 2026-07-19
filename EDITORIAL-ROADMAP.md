# Editorial Roadmap: Voice, Tone, and Narrative

Execution plan for [PRD-EDITORIAL.md](PRD-EDITORIAL.md). `TONE.md` remains the
source of truth for user-facing voice. `AGENTS.md` and `CLAUDE.md` govern the
implementation workflow and current architecture.

## Delivery strategy

- Work directly on local `main` in logical, bisect-friendly commits.
- Do not open pull requests. The 400-line PR cap does not apply to commits.
- Do not push intermediate commits. Push once, after Phase 6 is green.
- Keep each implementation commit scoped to one phase or independently
  verifiable subpart.
- Use Linux Node 22 from the WSL environment for dependency and quality-gate
  commands. Do not mix Windows and Linux Node installations.

## Locked decisions

| Decision               | Choice                                                                |
| ---------------------- | --------------------------------------------------------------------- |
| Voice source of truth  | `TONE.md`                                                             |
| Narrative throughline  | Da demo ao sistema                                                    |
| Legacy harness content | Delete it; preserve redirect URLs only                                |
| Redirect mechanism     | Keep the existing static page plus `window.location.replace` behavior |
| Publish parity base    | Backport the richer EN sections to PT                                 |
| Home scope             | Copy-only ledes; no layout or motion changes                          |
| New blog essays        | Post-rollout backlog, outside this PRD                                |
| Push timing            | One push after the complete final gate                                |

## Phase 1: Canon and active documentation

**Objective:** Make editorial and design guidance match the shipped site before
changing content.

### What we ship

- [ ] Add the narrative canon to `TONE.md`.
- [ ] Update `TONE.md` section 7 for the current project and legacy-route state.
- [ ] Add a historical errata to `REDESIGN.md`.
- [ ] Correct the PRD and this roadmap so scope, terminology, rollout, and
      acceptance criteria agree.

### Done when

- Active docs agree on narrative, current design authority, and rollout.
- No new em dash or en dash separator is added to user-facing examples.

### Validate

- Read the four documents as one set.
- Review added lines with `git diff --check` and a diff-scoped dash scan.

## Phase 2: Stable legacy redirect contract

**Objective:** Decouple generated legacy URLs from the discontinued harness
content model before deleting it.

### What we ship

- [ ] Create `src/data/harness-redirects.ts` with stable IDs and PT/EN slugs.
- [ ] Move legacy alternate-link generation into the redirect manifest.
- [ ] Update both dynamic redirect routes to consume the new manifest.
- [ ] Keep both overview redirect routes unchanged except for any helper rename
      required by the manifest.

### Done when

- The two overview pages and twelve chapter pages still build.
- Each chapter page points to the matching legacy URL in the other locale and
  includes `x-default`.
- PT redirects to `/sessions/maturidade/`; EN redirects to
  `/en/sessions/maturity/`.

### Validate

- Run lint, format check, and build.
- Inspect generated redirect HTML and alternate links in `dist`.

## Phase 3: Remove discontinued code and dependencies

**Objective:** Delete the harness implementation, hero toys, and their orphaned
infrastructure without changing live features.

### What we ship

- [ ] Delete `src/components/harness/`, `HarnessChapterLayout.astro`,
      `harness-chapter.css`, `src/lib/harness-progress.ts`, and
      `src/data/harness-chapters.ts`.
- [ ] Remove the harness UI block from `src/lib/i18n.ts`.
- [ ] Delete the four unwired `Hero*` directories.
- [ ] Delete `src/lib/liveblocks.ts`, remove Liveblocks dependencies, update
      both lockfiles, remove the obsolete environment entry, and remove the global
      Liveblocks badge rule.
- [ ] Keep `motion`; `src/components/motion/Reveal.tsx` still imports it.
- [ ] Remove the unused session `accent` property.
- [ ] Update PT/EN kitchen-sink copy to the current type system and dash rules.

### Done when

- Repository searches find no imports of deleted modules.
- `package.json`, `package-lock.json`, and `pnpm-lock.yaml` contain no
  Liveblocks dependency.
- Legacy redirect pages still pass the Phase 2 contract.

### Validate

- Run lint, format check, and build.
- Search for deleted symbols, paths, Liveblocks configuration, and legacy
  session accents.

## Phase 4: Targeted content fixes and locale parity

**Objective:** Fix the audited live-content issues without reopening the full
curriculum.

### What we ship

- [ ] Naturalize the four flagged EN lesson passages.
- [ ] Reduce the repeated two-beat contrasts in both maturity lessons, keeping
      the strongest closing move.
- [ ] Backport "When to automate" and "What to take from here" to PT publish.
- [ ] Expand PRD on first use in both build chapters.
- [ ] Replace the `2–3` range in both planning chapters.

### Done when

- The maturity lessons contain at most one two-beat contrast per locale.
- PT/EN project headings match by semantic position.
- Changed prose passes the `TONE.md` checklist and read-aloud review.

### Validate

- Run lint, format check, and build.
- Compare project heading trees.
- Run targeted editorial scans over changed user-facing files.

## Phase 5: Home narrative ledes

**Objective:** Make the home page express the reader journey with the smallest
possible copy-only change.

### What we ship

- [ ] One-line curriculum lede naming vocabulary, tools, method, and ownership.
- [ ] One-line blog lede distinguishing field essays from the curriculum.
- [ ] One-line project lede connecting theory to practice.
- [ ] Equivalent treatment in English.
- [ ] Reuse `.section-head__lede`; do not add components, layout rules, images,
      or motion.

### Done when

- A top-to-bottom read explains the path from demo to system.
- Each lede stays concise and concrete.
- Hero and manifesto diffs are empty.

### Validate

- Run lint, format check, and build.
- Review both homes at mobile and desktop widths, in both themes.
- Perform the `taste-skill` copy and pre-flight checks relevant to this
  copy-only change.

## Phase 6: Final gate, documentation sync, and push

**Objective:** Validate the complete editorial track and publish it once.

### What we ship

- [ ] Update the redesign track and follow-ups in `ROADMAP.md` to remove stale
      harness, hero-toy, and Liveblocks work.
- [ ] Run the full quality gate under Linux Node 22.
- [ ] Verify all generated legacy redirect pages and locale alternates.
- [ ] Run editorial candidate scans and manually triage comment-only matches.
- [ ] Review both locales, both themes, and representative mobile/desktop
      widths.
- [ ] Push local `main` once all checks pass.

### Quality gate

```bash
npm run lint
npm run format:check
npm run build
```

### Required searches

- Deleted imports and paths: harness components/layout/progress, hero toys, and
  Liveblocks.
- User-facing dash candidates: `—` and `–`.
- Voice candidates: `é importante notar`, `vale lembrar`, `extremely`,
  `incredibly`, and `revolucionário`.
- PT/EN project heading parity.

### Completion rule

Do not push with a failing command, a missing redirect page, an unresolved
user-visible editorial candidate, or an unexplained locale mismatch.

## Out of scope

- New blog essays
- Visual redesign or new motion
- New routes or collection changes
- HTTP redirect infrastructure
- Newsletter, search, analytics, or unrelated roadmap backlog
