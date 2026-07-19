# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

An interactive, static, responsive educational website (PT-BR) that teaches what it means to work as an AI-Native Engineer. Built for non-technical and junior audiences (QA, PM, designers, recruiters, founders), not just senior devs. The full product spec is in `PLAN.md`.

## Harness Documentation Language

All harness and operational documents must be written in English, including `AGENTS.md`, `CLAUDE.md`, `PLAN.md`, `README.md`, roadmap files, PRDs, and any future agent-facing instructions.

User-facing educational content may follow the page locale. The primary audience remains PT-BR, with English content supported where the site provides localized routes.

## Development Commands

```bash
npm run dev        # Local dev server with hot reload
npm run build      # Static site generation
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run format     # Prettier
```

Deploy: GitHub Actions → GitHub Pages (auto-deploy on push to main).

## PR discipline

Keep each **pull request** small enough to review, revert, and merge safely. This matches the phased delivery style in `ROADMAP.md` and `BLOG-ROADMAP.md`.

**Policy**

- At most **400 changed lines per PR** (insertions + deletions combined), measured as `git diff <base>...HEAD` on paths **outside** `src/content/**`
- Applies to code, layouts, components, config, styles, and data files outside editorial content
- **Does not apply** to PRs that only touch `src/content/**` (session MDX, blog Markdown, references JSON). Those may exceed 400 lines in a dedicated content-only PR
- **Mixed PRs** (code + content): only non-`src/content/**` paths count toward the 400-line cap; prefer splitting into a code PR and a content PR when either side would exceed the limit
- **Commits** inside a PR should still be logical and bisect-friendly, but there is **no per-commit line cap**
- Prefer lockfiles (`package-lock.json`, `pnpm-lock.yaml`) in their own PR when practical

**When a PR would exceed the limit**

- Split into stacked or independent PRs (for example: schema, then layout, then routes), not one giant PR with many small commits
- Use branch-per-phase on top of the previous merge, or a split-to-PRs workflow before opening the PR
- Do not bundle unrelated refactors with feature work
- Content-only changes under `src/content/**` may stay in their own PR regardless of size

**Enforcement**

- Documented policy only; there is no pre-merge hook or CI check yet. Follow the rule by convention until automation is added.
- Before opening a PR, check size against the base branch:

```bash
git diff upstream/main...HEAD --shortstat -- . ':(exclude)src/content'
```

Adjust `upstream/main` to the real base branch.

## Agent Skills

Project skills live under `.cursor/skills/` and `skills/`. Invoke by name when you need a specific workflow.

| Skill | Path | When to use |
| --- | --- | --- |
| `analisar` | `.cursor/skills/analisar/SKILL.md` | Before implementation: analyze a plan `.md` (scope, repo state, locked decisions). Invoke with `/analisar`. Read-only — no code until explicitly requested. |
| `planejar` | `.cursor/skills/planejar/SKILL.md` | Before implementation: tactical dev plan for the current roadmap phase (files, sequence, risks, validation). Invoke with `/planejar`. Read-only — no code until explicitly requested. |
| `executar` | `.cursor/skills/executar/SKILL.md` | During implementation: review the phase plan, implement, validate, and hand off. Invoke with `/executar`. |
| `quality-gate` | `skills/quality-gate/SKILL.md` | After code edits: run lint, build, and other checks before handoff. Runs inside `/executar` Step 3 (Validate). |

Suggested order for phased work: `/analisar` (optional) → `/planejar` → `/executar` → `quality-gate`.

## Tech Stack & Architecture

**Astro + TypeScript + MDX + React islands + CSS Modules**

- **Astro** is the framework. It was chosen because this is content-first, not app-first. Ships minimal JS via island architecture.
- **React** is used only for interactive islands (quizzes, comparators, steppers, filters), not for page-level rendering.
- **CSS Modules + CSS Variables + design tokens**. No Tailwind. The editorial visual language ("The Institute", see `REDESIGN.md`) requires authorial control that utility-first CSS undermines.
- **CSS-first animations**. Decorative and state-transition animations must be pure CSS, and calm: fades and small settles only — no springs, shake, or sound. JavaScript animation is reserved for _interactive physics_ (drag, pointer tracking, procedural motion) via bespoke `requestAnimationFrame` loops. Do not introduce animation libraries (GSAP, anime, react-spring, motion, etc) without explicit approval.
- **Content Collections** with schema validation for all session content (MDX with typed frontmatter).

### Key Architecture Decisions

- Static HTML pages with selective hydration (`client:*` directives on islands only)
- Content lives in `src/content/sessions/*.mdx` with frontmatter schema enforced by Content Collections
- Data files (`src/data/`) for glossary definitions, sessions, chapters, and shared metadata, separate from UI
- Layouts: `BaseLayout.astro` (site-wide) and `SessionLayout.astro` (session pages with standard template)
- Dynamic session routes via `src/pages/sessions/[slug].astro`

### Content Model (Session Frontmatter)

```yaml
title: string
slug: string
order: number # publication/navigation order
summary: string # 30-second plain-language summary
readingTime: number
level: beginner | intermediate | advanced
tags: string[]
heroLabel: string
references: string[] # IDs linking to references collection
updatedAt: date
```

## Site Structure

The home page contains a compact foundations primer for "AI-Native Engineer", "AI agent", and "coding agent". The deeper curriculum is organized into 3 sessions generated under the dynamic `/sessions/[slug]/` route:

- `/sessions/glossario/`: Terminology (Session 1)
- `/sessions/ferramentas/`: Tools and models (Session 2)
- `/sessions/maturidade/`: SDD and Harness Design for professional AI-native software delivery (Session 3, most important)

Every session page follows a fixed template: hero → 30s summary → main explanation → why it matters → real example when useful → where it breaks → takeaway → references. Interactive blocks are used only when they clearly improve explanation, organization, or retention.

## Design System: The Institute (Editorial)

The visual language is a quiet, typography-led editorial system inspired by institutional sites like mit.edu. Full art direction and rationale live in `REDESIGN.md`. It replaced the old Neo-Brutalist system.

- One accent only: signal red (`--color-accent`); everything else is paper, ink, and hairlines. Color never carries meaning alone (levels, statuses, and types are text labels).
- Surfaces: warm paper background, white raised surfaces, charcoal dark theme (never blue-graphite).
- Structure: 1px hairlines (`var(--line)`) and whitespace separate sections. No thick borders, no hard offset shadows — all `--shadow-*` tokens are `none`; `var(--shadow-overlay)` exists only for floating UI.
- Typography: Inter Tight for display/headings (`--font-display`, tracking -0.02em), Inter for body, Newsreader italic for ledes and pull quotes (`--font-serif`), JetBrains Mono for code.
- Brand mark: typographic wordmark preceded by a small red square; favicon is the red square on paper.
- Motion: calm only — fades and small settles with `var(--ease-standard)`. No springs, no screen shake, no audio.
- Patterns: `.kicker` micro-labels mark sections; badges are neutral hairline chips (`variant="accent"` reserved for true highlights); cards are flat with hairline borders and underline-on-hover titles; the inverted ink band is reserved for the manifesto moment.
- Mobile-first: single column, reduced decoration, comfortable touch targets.
- WCAG contrast compliance and visible focus states.
- Breakpoints: mobile ≤767px, tablet 768-1023px, desktop 1024px+, wide 1440px+

## Editorial Rules

- User-facing content should be natural, direct, and non-academic in its target locale
- Never favor specific tools; teach categories and patterns, use tools as market snapshots
- Always: simple explanation first, then technical depth
- Include examples from PM, QA, and product perspectives, not just dev
- Every interaction must explain better, organize better, or increase retention. If it doesn't, remove it.
- Acronyms must be explained before technical deep-dives
- `updatedAt` field per session to track content freshness
