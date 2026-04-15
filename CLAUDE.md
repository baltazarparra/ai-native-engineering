# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive, static, responsive educational website (PT-BR) that teaches what it means to work as an AI-Native Engineer in 2026. Built for non-technical and junior audiences (QA, PM, designers, recruiters, founders) — not just senior devs. The full product spec is in `PLAN.md`.

## Development Commands

```bash
npm run dev        # Local dev server with hot reload
npm run build      # Static site generation
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run format     # Prettier
```

Deploy: GitHub Actions → GitHub Pages (auto-deploy on push to main).

## Tech Stack & Architecture

**Astro + TypeScript + MDX + React islands + CSS Modules + Motion**

- **Astro** is the framework — chosen because this is content-first, not app-first. Ships minimal JS via island architecture.
- **React** is used only for interactive islands (quizzes, comparators, steppers, filters) — not for page-level rendering.
- **CSS Modules + CSS Variables + design tokens** — no Tailwind. The Neo Brutalism visual language requires authorial control that utility-first CSS undermines.
- **Motion** (framer-motion successor) for meaningful animations only — prefer CSS for simple hover/transition effects.
- **Content Collections** with schema validation for all session content (MDX with typed frontmatter).

### Key Architecture Decisions

- Static HTML pages with selective hydration (`client:*` directives on islands only)
- Content lives in `src/content/sessions/*.mdx` with frontmatter schema enforced by Content Collections
- Data files (`src/data/`) for tools, models, and glossary definitions — separate from UI
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

6 sessions, each at its own route:

- `/ai-native-engineer/` — What is an AI-Native Engineer (Session 0)
- `/glossario/` — Terminology (Session 1)
- `/ferramentas/` — Tools: IDEs vs CLI (Session 2)
- `/modelos/` — LLMs and models (Session 3)
- `/maturidade/` — Evolution of AI in development (Session 4, most important)
- `/como-operar/` — How to work AI-native in practice (Session 5)

Every session page follows a fixed template: hero → 30s summary → main explanation → why it matters → real example → where it breaks → interactive block → takeaway → references.

## Design System: Neo Brutalism

- High contrast, block layout, thick black borders, hard offset shadows (no blur, no glassmorphism, no gradients)
- Palette: warm light background, pure black, 2-3 vibrant accents (yellow, electric blue, acid green, or coral)
- Heavy-weight headlines, neutral readable body text
- Mobile-first: single column, reduced decoration, comfortable touch targets
- WCAG contrast compliance, visible focus states, `prefers-reduced-motion` support
- Breakpoints: mobile ≤767px, tablet 768-1023px, desktop 1024px+, wide 1440px+

## Editorial Rules

- All content in PT-BR, natural and direct — not academic
- Never favor specific tools; teach categories and patterns, use tools as market snapshots
- Always: simple explanation first, then technical depth
- Include examples from PM, QA, and product perspectives — not just dev
- Every interaction must explain better, organize better, or increase retention. If it doesn't, remove it.
- Acronyms must be explained before technical deep-dives
- `updatedAt` field per session to track content freshness
