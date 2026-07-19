# PRD: Editorial Voice, Tone, and Narrative Revision

| Field                 | Value                                        |
| --------------------- | -------------------------------------------- |
| Status                | Approved for execution                       |
| Owner                 | baltz                                        |
| Created               | 2026-07-19                                   |
| Execution plan        | [EDITORIAL-ROADMAP.md](EDITORIAL-ROADMAP.md) |
| Voice source of truth | [TONE.md](TONE.md)                           |

## 1. Context

AI-Native Engineers is an open PT-BR-first curriculum teaching what it means to
work as an AI-Native Engineer. It serves non-technical and junior audiences,
including QA, PM, designers, recruiters, and founders.

An editorial audit ran on 2026-07-19 against commit `ceba3f4` across the three
lessons, blog, home, project chapters, colinha, 404 pages, legacy redirect
pages, i18n microcopy, and component strings in both locales. The live content
is largely aligned with `TONE.md`. The remaining violations and structural
cleanup are narrow and listed below.

## 2. Problem

1. The site has no formal narrative canon. A throughline exists implicitly,
   moving the reader from prompting a demo to owning the system that produces
   software, but future content has no written arc to serve.
2. The signature two-beat contrast ("Não é X. É Y.") is overused. Most
   occurrences are in a discontinued Harness Engineering layer that remains in
   the tree behind client-side redirect pages.
3. The PT reader, the primary audience, has a poorer publish chapter than the
   EN mirror.
4. The home page presents the right sections without enough connective tissue
   to make the reader journey explicit.
5. Small compliance and documentation gaps remain: one banned EN intensifier,
   translationese, an unexplained acronym, en dash ranges, and historical
   design guidance presented without an errata.

## 3. Goals

- G1: Add a written narrative canon to `TONE.md`: throughline, per-surface
  register, canonical vocabulary, and signature-move governance.
- G2: Remove the discontinued harness and hero-toy layers while preserving
  every legacy redirect URL and locale alternate.
- G3: Resolve the audited content violations and restore PT/EN parity in the
  project chapters.
- G4: Make the home page communicate the narrative arc through one-line
  section ledes, without changing its layout or design system.
- G5: Make active editorial and design guidance describe the site as it ships.

## 4. Non-goals

- No visual redesign, token changes, new components, or new animation.
- No broad lesson rewrite. Only the targeted compliance edits listed in FR3
  are allowed.
- No new routes, collections, or i18n architecture.
- No change from the existing client-side legacy redirect mechanism to HTTP
  redirects.
- New blog essays are a post-rollout backlog item, not part of this PRD.

## 5. Users and impact

- PT-BR readers: richer publish guidance and a clearer journey from theory to
  practice.
- EN readers: more natural lesson prose and a maintained locale mirror.
- Contributors and agents: one narrative canon and less dead code to inspect.

## 6. Requirements

### FR1: Narrative and documentation canon (roadmap Phase 1)

- FR1.1: Add a "Narrative" section to `TONE.md` defining the throughline
  ("da demo ao sistema"), reader journey, canonical vocabulary, and a limit of
  one two-beat contrast per user-facing page.
- FR1.2: Update `TONE.md` section 7 to describe the current project register and
  the discontinued harness series accurately.
- FR1.3: Add an errata to `REDESIGN.md` that identifies it as historical design
  rationale and points to `AGENTS.md` and `CLAUDE.md` for current rules.

### FR2: Dead-layer removal with redirect preservation (roadmap Phases 2 and 3)

- FR2.1: Replace the large harness content model with a minimal redirect
  manifest containing stable PT/EN slugs.
- FR2.2: Remove `src/components/harness/`, `HarnessChapterLayout.astro`,
  `harness-chapter.css`, `src/lib/harness-progress.ts`, and the old harness data
  module.
- FR2.3: Remove the dead harness i18n block, the four unwired hero-toy
  components, their Liveblocks infrastructure, and the unused session `accent`
  field.
- FR2.4: Remove orphan Liveblocks dependencies, environment documentation, and
  global CSS. Keep `motion`, which remains in use by the shared `Reveal` island.
- FR2.5: Keep all 14 legacy Harness Engineering pages generated in both
  locales, with `noindex`, correct alternate links, and the existing redirect
  targets.
- FR2.6: Make kitchen-sink copy match the shipped type system and punctuation
  rules.

### FR3: Targeted live-content corrections (roadmap Phase 4)

- FR3.1: Remove "extremely", naturalize the two flagged translationese
  passages, and restructure the flagged "not only" sentence.
- FR3.2: Reduce repeated two-beat contrasts in the PT and EN maturity lessons,
  keeping the strongest closing move.
- FR3.3: Backport the two EN-only publish sections to PT in the site's workshop
  register.
- FR3.4: Expand PRD on first use in both build chapters.
- FR3.5: Replace the `2–3` range in both planning chapters with locale-natural
  wording.

### FR4: Home narrative pass (roadmap Phase 5)

- FR4.1: Add one-line ledes below the curriculum, blog, and project headings on
  both home pages.
- FR4.2: Reuse existing `.section-head__lede` styles and existing i18n copy
  where it fits.
- FR4.3: Keep the hero, manifesto, layout, and motion untouched.

## 7. Acceptance criteria

- `npm run lint`, `npm run format:check`, and `npm run build` pass in Node 22.
- All 14 legacy Harness Engineering pages are present in `dist`, keep their
  redirect targets, and expose PT, EN, and `x-default` alternates.
- No imports or runtime configuration remain for deleted harness, hero-toy, or
  Liveblocks code.
- Candidate scans for em dash, en dash separators, hedge filler, and banned
  intensifiers contain no user-visible violation. Comment-only and historical
  documentation matches are triaged separately.
- PT and EN project chapter heading trees match by semantic position.
- The PT and EN maturity lessons each contain at most one two-beat contrast.
- A first-time visitor can explain the site's journey from the home page alone.

## 8. Risks

| Risk                                             | Mitigation                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Legacy URLs disappear during harness deletion    | Introduce and build the minimal redirect manifest before deleting the old layer         |
| Lockfile drift after removing Liveblocks         | Update both committed lockfiles with the same Node 22/npm runtime and run a clean build |
| Targeted lesson edits turn into a broad rewrite  | Limit changes to the audited sentences and preserve frontmatter, structure, and claims  |
| PT publish copy reads like a literal translation | Write against the workshop register in `TONE.md` and perform a read-aloud pass          |
| Home ledes become marketing filler               | One line per section, concrete arc language, no layout or motion changes                |

## 9. Rollout

Work lands directly on local `main` as logical commits following
`EDITORIAL-ROADMAP.md`. Nothing is pushed until the final quality gate and
manual checks pass. The existing GitHub Pages workflow deploys after the single
final push.
