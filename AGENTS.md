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

## Commit Discipline

Keep each commit small enough to review, revert, and bisect. This matches the phased delivery style in `ROADMAP.md` and `BLOG-ROADMAP.md`.

**Policy**

- At most **400 changed lines** per commit (insertions + deletions combined)
- Applies to code, layouts, components, config, styles, and data files outside editorial content
- **Does not apply** to files under `src/content/**` (session MDX, blog Markdown, references JSON). Those may exceed 400 lines in a dedicated content commit
- Prefer committing lockfiles (`package-lock.json`, `pnpm-lock.yaml`) separately from feature work when practical

**When a change would exceed the limit**

- Split into logical commits (for example: schema, then layout, then routes)
- Use `git add -p` to stage partial changes
- Do not bundle unrelated refactors with feature work
- Content-only changes under `src/content/**` may stay in their own commits regardless of size

**Enforcement**

- Documented policy only; there is no pre-commit hook or CI check yet. Follow the rule by convention until automation is added.

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
- **CSS Modules + CSS Variables + design tokens**. No Tailwind. The Neo Brutalism visual language requires authorial control that utility-first CSS undermines.
- **CSS-first animations**. Decorative and state-transition animations must be pure CSS. JavaScript animation is reserved for _interactive physics_ (drag, pointer tracking, procedural motion): use `motion` (drag only) or bespoke `requestAnimationFrame` loops. Do not introduce other animation libraries (GSAP, anime, react-spring, etc) without explicit approval.
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

## Design System: Neo Brutalism

- High contrast, block layout, thick black borders, hard offset shadows (no blur, no glassmorphism, no gradients)
- Palette: warm light background, pure black, 2-3 vibrant accents (yellow, electric blue, acid green, or coral)
- Heavy-weight headlines, neutral readable body text
- Mobile-first: single column, reduced decoration, comfortable touch targets
- WCAG contrast compliance and visible focus states
- Breakpoints: mobile ≤767px, tablet 768-1023px, desktop 1024px+, wide 1440px+

## Editorial Rules

- User-facing content should be natural, direct, and non-academic in its target locale
- Never favor specific tools; teach categories and patterns, use tools as market snapshots
- Always: simple explanation first, then technical depth
- Include examples from PM, QA, and product perspectives, not just dev
- Every interaction must explain better, organize better, or increase retention. If it doesn't, remove it.
- Acronyms must be explained before technical deep-dives
- `updatedAt` field per session to track content freshness
