# REDESIGN.md — "The Institute" Editorial Redesign

Art direction and execution plan for a full visual redesign of the AI-Native Engineers site, referencing the design language of <https://www.mit.edu/>.

This is a planning document. No implementation until the phases below are explicitly approved. Follows the `/planejar` workflow (files, sequence, risks, validation). Delivery strategy: **work happens directly on `main` as a sequence of logical commits; nothing is pushed until the full validation gate in section 11 passes.** No PRs, no feature branches.

---

## 1. Objective

Replace the current playful Neo-Brutalist interface with a quiet, confident, typography-led editorial system — the clarity of an institutional newsroom (MIT) applied to a learning curriculum — without touching content, routes, i18n, or the Astro + CSS Modules architecture.

## 2. Diagnosis: why the current UI feels dated and amateur

The current design is competently built, but its *language* works against the content's authority:

- **Four loud accents at once** (yellow `#f5c518`, electric blue `#2952e8`, acid green `#00b34a`, coral `#ff5c5c`) — nothing is emphasized when everything is.
- **Toy-layer interactions**: cursor-following ghost cursors (`HeroGhostCursors`), cursor trail (`HeroCursorTrail`), draggable stickers (`HeroStickers`), a "capture counter" game (`HeroCaptureCounter`), page-turn swoosh sounds, and screen shake. These read as gimmicks, not craft.
- **Heavy furniture everywhere**: 2–4px black borders and hard offset shadows on every card, badge, and button — visual shouting that flattens hierarchy.
- **Rounded, bubbly display type** (Space Grotesk) that signals "startup landing page", not "reference material".
- Motion language built on overshoot/spring easings (`ease-snap`, `ease-out-back`) — bouncy where it should be calm.

The site teaches judgment, validation, and professional rigor. The interface must look like it practices them.

## 3. Reference analysis: mit.edu

What makes mit.edu feel elegant and worth borrowing:

| Trait | Observation | Translation for us |
| --- | --- | --- |
| Editorial, content-first | Homepage is a newsroom: one big feature story, then a grid of stories | Home becomes "the curriculum as front page": one feature session + a clean story grid |
| Chromatic discipline | Black, white, grays, and ONE signal red (`#A31F34` cardinal) | Retire 4 accents → 1 signal red + ink + paper |
| Typography is the brand | Huge, tight, confident headlines; minimal chrome | Investment moves from borders/shadows into type scale and spacing |
| Restraint in motion | No playful cursors, no sound; content carries the page | Remove the entire toy layer; keep only quiet fades |
| Hairline structure | Separation by whitespace and 1px rules, not boxes | 4px borders + offset shadows → 1px hairlines + whitespace |
| Institutional wordmark | Simple, typographic, recognizable | Typographic wordmark + a single red square as the brand mark |

What we deliberately do **not** copy: photography-led heroes (we have no photo budget — we use typographic "covers" instead), and MIT's dense mega-footer (ours stays compact).

## 4. Art direction

### 4.1 Concept: "The Institute"

A reading institution, not an app. Principles, in order:

1. **Type before decoration** — if a screen needs interest, fix the typography, not the borders.
2. **One voice** — one accent color, used sparingly, always with intent.
3. **Whitespace is the grid** — sections separate by rhythm and hairlines, not boxes.
4. **Calm motion** — things fade and settle; nothing bounces, shakes, or makes noise.
5. **Editorial permanence** — the site should feel printed, not rendered.

### 4.2 Palette

Light theme (paper):

| Token | Value | Role |
| --- | --- | --- |
| `--color-surface` | `#FAF8F4` | warm paper background (keeps brand warmth) |
| `--color-surface-alt` | `#F2EFE8` | alternating section bands |
| `--color-surface-raised` | `#FFFFFF` | cards, header |
| `--color-text` | `#1C1B18` | body |
| `--color-text-muted` | `#5B584F` | secondary text |
| `--color-heading` | `#0E0E0C` | display type |
| `--color-accent` | `#A31F34` | **the one accent** — signal red (MIT cardinal) |
| `--color-accent-strong` | `#7C1626` | accent hover/active |
| `--color-fg-on-accent` | `#FFFFFF` | text on red |
| `--color-line` | `#E1DCD2` | 1px hairlines |
| `--color-focus` | `#2952E8` | focus ring only (functional, not brand) |
| `--color-code-bg` / `--color-code-fg` | `#17150F` / `#F2EDE2` | code stays dark in both themes |

Dark theme (charcoal, not blue-graphite): surfaces `#131311` / `#1A1916` / `#22211D`; text `#E9E6DE` / muted `#A8A499`; heading `#F5F3EC`; accent brightened to `#E04B42` for contrast; lines `#2E2C27`; focus `#8FB0FF`.

Level indicators (beginner/intermediate/advanced) stop being color-coded; they become uppercase micro-labels. Color is no longer load-bearing for meaning (WCAG win).

### 4.3 Typography

- **Display/headings**: `Inter Tight` (variable, 500–800), tracking `-0.02em`–`-0.03em` on large sizes. Replaces Space Grotesk.
- **Editorial serif moment**: `Newsreader` (italic, optical size) for the hero lede, pull quotes, and the manifesto strip. This is the "elegance" lever.
- **Body**: `Inter` (unchanged). **Code**: `JetBrains Mono` (unchanged).
- Google Fonts link in `BaseLayout.astro` updated accordingly; still 3 families, `display=swap`, preconnect already in place.
- New display step: `--text-display: clamp(2.75rem, 1.5rem + 5vw, 4.5rem)` for the home H1 and session titles; H2 scale slightly reduced so prose pages feel like articles, not posters.
- Kicker/eyebrow style: `--font-body`, 11–12px, uppercase, `letter-spacing: 0.12em`, muted or accent.

### 4.4 Surfaces, lines, elevation

- Borders: `--border-thin/thick` (2–4px solid ink) → `--line: 1px solid var(--color-line)`. Ink-colored borders survive only on the inverted ink band (see 5.1).
- Shadows: hard offsets (`4px 4px 0`) are retired. Flat by default; a single soft ambient `--shadow-overlay: 0 8px 24px rgb(0 0 0 / 0.08)` exists only for floating UI (mobile nav, popovers).
- Radius: institutional square — `--radius-sm: 2px` on interactive elements, `0` elsewhere. (A thread of the old brand's severity, refined.)
- Layout measure: prose column `--container-md` (~68ch) for articles; `--container-xl` only for card grids.

### 4.5 Motion

- **Removed entirely**: page swoosh audio (`HeroStickers/sound.ts` + the script block in `BaseLayout.astro`), `data-screen-shake`, ghost cursors, cursor trail, capture counter, draggable stickers.
- View transitions: keep `ClientRouter`, but replace slide + spring-overshoot with a 160–220ms crossfade / 8px settle; `ease-snap`/`ease-out-back` deleted; keyframes renamed `brutal-*` → neutral names.
- Interactive states: hover = color/underline changes and `translateY(-1px)` at most. Press = no translation.
- Audit `prefers-reduced-motion` coverage in the same pass.

### 4.6 Brand mark

Typographic wordmark: **AI-Native Engineers** in Inter Tight 700, preceded by a small red square (`■`, 0.5em). No logo asset needed; works as favicon (red square on paper) replacing `favicon.svg`.

## 5. Page direction

### 5.1 Home (`/`, `/en/`) — the front page

MIT newsroom pattern, top to bottom:

1. **Masthead hero**: kicker badge ("100% gratuito e open source" → plain uppercase kicker, not a chip), H1 at `--text-display`, one-paragraph lede in Newsreader italic, primary CTA (solid ink button) + secondary text link. No stickers, no cursors, no counter, no sound.
2. **Feature story**: Session 3 (`maturidade` — the flagship) as a full-width feature card: giant index numeral `03`, title at H2-display size, summary, meta row. This is our "photo" — typographic cover.
3. **The curriculum grid**: the 3 sessions as uniform editorial cards — hairline border, index numeral, title, summary, meta (level, minutes), arrow link. Hover: border darkens to ink, title underlines. Nothing lifts.
4. **Manifesto strip**: full-bleed inverted ink band (the one place the old heavy contrast survives, now as punctuation): 2–3 lines in Newsreader italic, paper text — "AI-native não é pedir código. É operar com contexto, julgamento e validação."
5. **More from the institute**: Blog and Projeto Prático as compact hairline-row lists (title + meta + arrow), MIT "More News" style, each with a single "Ver tudo →" link.
6. **Footer** (restyled in Phase 3) + `Discussion` block restyled to match (hairline container, no box-shadow theater).

### 5.2 Session pages — the article

- Hero becomes an article header: breadcrumbs (quiet), kicker (`heroLabel`), H1 display, meta row (level · reading time · updated) set between two hairline rules.
- Body column narrowed to ~68ch; H2/H3 get more air; pull quotes in Newsreader italic with a 2px accent left rule.
- "Where this breaks" block: callout with 2px accent left border on `surface-alt`, not a bordered box.
- `SectionNav`: slim, sticky, uppercase micro-labels; active item = accent text + 2px accent left rule.
- `ProgressTracker`: 2px accent bar, no chrome.
- `ReferencesList`: numbered endnotes, hairline-separated rows.
- `NextSessionCTA`: full-width hairline card with big numeral, echoing the feature card.
- Keep `transition:name="session-hero-title"` (shared-element transition survives, re-timed).

### 5.3 Other templates

- **Blog index / post**: same article system as sessions (shared primitives make this cheap).
- **Projeto (4 steps)**: step pages get a numbered step rail (01–04) instead of card chrome.
- **Colinha (cheatsheet)**: dense reference table look — hairline row grid, mono accents where relevant.
- **Harness Engineering hub**: editorial index list like "More from the institute".
- **404**: oversized numeral + one line + one link. Ink band optional.
- **kitchen-sink**: kept permanently (dev-only) as the visual regression page for the new system.

## 6. Component direction

| Component | From | To |
| --- | --- | --- |
| `Button` | thick border + hard shadow + press-translate | primary: solid ink → hover accent; secondary: 1px ink outline → hover fill; ghost: underlined text; radius 2px |
| `Card` | 4px border, offset shadow, lift on hover | 1px hairline, flat, hover = border→ink + title underline; optional index numeral slot |
| `Badge` | colored fill chips | uppercase 11px hairline chip, neutral; single `accent` variant (red text + red hairline) for "Novo" |
| `Grid` / `SectionBlock` | unchanged API | retuned gaps/padding scale; `alt` band uses `surface-alt` |
| `SiteHeader` | boxed, playful | sticky, `surface-raised`, 1px bottom hairline, red-square wordmark, quiet icon buttons (GitHub, theme, flags) |
| `Footer` | — | hairline top rule, 3 quiet columns, small type |
| `Breadcrumbs` / `SectionNav` / `ReferencesList` / `NextSessionCTA` | brutalist chrome | per 5.2 |
| `Discussion` (Liveblocks) | boxed | hairline container; verify Liveblocks theming inherits our CSS vars |
| `ThemeToggle` | — | restyle only (icon button, no border box) |

## 7. What gets removed

Files deleted (home toy layer — the "amateur" signal):

- `src/components/HeroStickers/` (incl. `sound.ts`)
- `src/components/HeroGhostCursors/`
- `src/components/HeroCursorTrail/`
- `src/components/HeroCaptureCounter/`
- audio init + swoosh script in `BaseLayout.astro`, `data-screen-shake` hooks
- `motion` dependency if nothing else uses it after deletion (audit first; removal lands in Phase 8 with the lockfile change)
- Legacy token aliases in `tokens.css` (final cleanup in Phase 8)

Kept untouched: all content (`src/content/**`), i18n (`src/lib/i18n.ts`), routes, Content Collections, `Discussion`, `ProgressTracker`, theme system, view-transition names.

## 8. Execution plan — sequential commits on `main`

**Strategy: no PRs, no feature branches.** Work lands directly on the local `main` as a sequence of logical, bisect-friendly commits — one per phase below — and is pushed **once, at the very end**, after the full validation gate in section 11 is green.

Rules of engagement:

- **Phase 0 — safety baseline**: tag the pre-redesign HEAD before touching anything: `git tag pre-redesign-baseline`. Rollback is one `git reset --hard pre-redesign-baseline` away at any point.
- **Commit per phase**: message convention `redesign: <phase name>` (e.g. `redesign: foundations — tokens, typography, fonts`). Split a phase into two commits only if it keeps the history clearer.
- **Every commit must build**: run `npm run lint` + `npm run build` before each commit so every point in history is deployable. Intermediate *visual* states between phases may be rough (see risks) — that's fine, nothing ships until the final push.
- **Push = release**: GitHub Actions deploys `main` to GitHub Pages on push, so the single final push happens only after section 11 is fully green.
- The 400-line rule in `AGENTS.md` governs PRs and does not apply here; commits still stay scoped and logical.

| Phase / commit | Scope | Main paths |
| --- | --- | --- |
| 0. Baseline | Tag current HEAD, confirm clean tree | `git tag pre-redesign-baseline` |
| 1. Foundations | New tokens (both themes), globals.css typography + motion keyframes, font links, favicon | `src/styles/tokens.css`, `src/styles/globals.css`, `src/layouts/BaseLayout.astro`, `public/favicon.svg` |
| 2. Primitives | Button, Badge, Card, Grid, SectionBlock restyle + kitchen-sink refresh (dev page) | `src/components/{Button,Badge,Card,Grid,SectionBlock}/`, `src/pages/kitchen-sink.astro`, `src/pages/en/kitchen-sink.astro` |
| 3. Chrome | SiteHeader (+ ThemeToggle), Footer, Breadcrumbs, SectionNav | `src/components/{SiteHeader,ThemeToggle,Footer,Breadcrumbs,SectionNav}/` |
| 4. Home de-gimmick | Delete toy layer (files + wiring + sound), strip hero to markup only | `src/pages/index.astro`, `src/pages/en/index.astro`, deleted component dirs, `BaseLayout.astro` script |
| 5. Home editorial | New hero, feature card, curriculum grid, manifesto band, "more from" rows | `src/pages/index.astro`, `src/pages/en/index.astro` (+ page-level styles) |
| 6. Article template | SessionLayout, NextSessionCTA, ReferencesList, ProgressTracker styles | `src/layouts/SessionLayout.astro`, `src/components/{NextSessionCTA,ReferencesList,ProgressTracker,Discussion}/` |
| 7. Secondary templates I | blog index + post (pt/en), colinha (pt/en) | `src/pages/blog/`, `src/pages/en/blog/`, `src/pages/colinha.astro`, `src/pages/en/colinha.astro` |
| 8. Secondary templates II | projeto 4 steps (pt/en), harness-engineering (pt/en), 404 (pt/en) | `src/pages/projeto/`, `src/pages/en/project/`, `src/pages/harness-engineering/`, `src/pages/en/harness-engineering/`, `src/pages/404.astro`, `src/pages/en/404.astro` |
| 9. Deps & docs | remove `motion` if unused, update `AGENTS.md` design section, `PLAN.md`, `ROADMAP.md`; delete legacy token aliases | `package.json`, `package-lock.json`, `AGENTS.md`, `PLAN.md`, `ROADMAP.md`, `tokens.css` |
| 10. Validate & push | Full gate from section 11; then the single `git push` | — |

Sequence is strictly ordered: 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10. Phases 4 and 5 may land as one commit if that reads better in history.

## 9. Out of scope

- Content rewrites (`src/content/**`), new sessions, new routes
- Liveblocks/Discussion functionality changes (visual restyle only)
- Search, comments policy, analytics
- Tailwind or any new CSS/animation framework (architecture rules unchanged)

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Push to `main` = production deploy (GitHub Actions → Pages) | Nothing is pushed until section 11 is fully green; Phase 0 baseline tag gives instant rollback; if a defect slips through, fix-forward with a follow-up commit |
| Token rewrite cascades into every CSS Module at once (after Phase 1, components look broken until Phases 2–3 land) | Keep old token names as aliases during Phase 1; accept rough intermediate visuals — nothing ships until the final push; kitchen-sink review after every phase |
| Dark theme treated as an afterthought | Both themes specified in 4.2 and reviewed side-by-side in Phase 1; dark is part of every phase's manual check |
| Red accent fails contrast somewhere | Contrast table in Phase 1 (`#A31F34` on paper/white = AA for large text; body-size red only for bold/uppercase; links stay ink + underline) |
| Liveblocks `Discussion` theming doesn't inherit our vars | Inspect its theme API in Phase 6; worst case it keeps a neutral default that still matches the hairline container |
| View-transition rename breaks shared-element refs | Do **not** rename `transition:name` values; only re-time/re-ease keyframes |
| `motion` still imported by a kept island | Grep before removal in Phase 9; if used, keep the dep and note it |
| pt-BR / en drift | Every page phase touches both locales in the same commit |
| Long-lived local work lost or corrupted | Commit at every phase boundary (10 commits total); optionally push to a throwaway remote branch mid-way for backup without triggering the Pages deploy of `main` |

## 11. Validation

**Per phase (before each commit):** `npm run lint` · `npm run build` · kitchen-sink visual check at 375 / 768 / 1024 / 1440.

**Final gate (Phase 10, before the single push):**

- `npm run lint` · `npm run format:check` · `npm run build` — all green
- Full click-through of **every route** in pt-BR and en, in both themes
- Manual check at 375 / 768 / 1024 / 1440 on home, one session, blog index, one projeto step, colinha, 404
- Keyboard walkthrough (focus ring visible everywhere) · `prefers-reduced-motion` spot check
- Lighthouse mobile ≥ 90 perf / 100 a11y target (toy-layer JS removal should improve current numbers)
- WCAG contrast spot-audit of the pairs in 4.2
- Only then: `git push`

## 12. Docs to update (Phase 9)

- `AGENTS.md` → replace "Design System: Neo Brutalism" with the Editorial/Institutional system (palette, typography, hairlines, calm motion); keep architecture rules untouched.
- `PLAN.md` → update design-language references if any conflict.
- `ROADMAP.md` → append a "Redesign (The Institute)" track mirroring section 8, with checkboxes.
- This file stays at repo root as the art-direction source of truth.

## Next step

Approve (or adjust) the direction, then run `/executar`-style implementation starting at **Phase 0 (baseline tag) → Phase 1 (Foundations)**, committing directly on `main`.
