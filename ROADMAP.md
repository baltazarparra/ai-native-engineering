# ROADMAP

we ship one phase at a time. each phase gets validated before we move on. no skipping ahead, no half-baked stuff leaking into the next phase.

phase 0 (discovery) is already done. that's the PLAN.md.

---

## Phase 1: project foundation

get the skeleton up and running. zero visual polish, zero content. just the infra that everything else builds on top of.

### what we ship

- [ ] `npm create astro` with TypeScript strict mode
- [ ] MDX integration installed and configured
- [ ] Content Collections set up with session schema (frontmatter types, validation)
- [ ] References collection (JSON/YAML) with basic schema
- [ ] `BaseLayout.astro` with html head, meta charset, viewport, slot
- [ ] `SessionLayout.astro` extending base, rendering MDX content with frontmatter
- [ ] one dummy session MDX file rendering at `/sessions/[slug]`
- [ ] `src/styles/tokens.css` with placeholder CSS variables (colors, spacing, fonts, borders, shadows)
- [ ] `src/styles/globals.css` importing tokens, basic reset
- [ ] ESLint + Prettier configured and working
- [ ] GitHub Actions workflow deploying to GitHub Pages on push to main
- [ ] `astro.config.mjs` with `site` and `base` set for GH Pages

### done when

- `npm run dev` serves the site locally
- `npm run build` generates static output with no errors
- the dummy session renders its MDX content at the right route
- Content Collections schema catches a bad frontmatter field (test it by breaking one on purpose)
- push to main triggers GH Actions and deploys successfully
- `npm run lint` and `npm run format` both run clean

---

## Phase 2: neo brutalism design system

build the visual language as reusable primitives. no pages yet, just the component toolkit. everything mobile-first.

### what we ship

- [ ] `tokens.css` finalized: color palette (warm bg, pure black, 2-3 vibrant accents), spacing scale, font stacks, border widths, shadow offsets
- [ ] typography system: headline weights, body font, reading-friendly sizes and line-heights
- [ ] grid system: responsive layout primitives with CSS Modules
- [ ] `Button` component: primary, secondary, ghost variants with thick borders, hard shadows, clear hover/focus/active states
- [ ] `Card` component: expandable variant, neo brutalism borders and shadows, responsive
- [ ] `Badge`/`Label` component for tags, levels, reading time
- [ ] `SectionBlock` component: consistent spacing wrapper for page sections
- [ ] link styles: visible, obvious, no mystery meat
- [ ] focus states: keyboard nav must be super obvious
- [ ] a simple `/kitchen-sink` page showing all components together (dev-only, we nuke it later)

### done when

- kitchen-sink page looks intentionally brutal and readable at the same time
- all components pass WCAG contrast on the chosen palette
- components look solid on 375px, 768px, 1024px and 1440px
- zero JS shipped for these components (pure Astro + CSS)

---

## Phase 3: home page

the front door. if someone lands here and doesn't understand what this site is about in 10 seconds, we failed.

### what we ship

- [ ] `Hero` section: strong headline, subtitle with the value prop, primary CTA ("Começar pelo básico"), secondary CTA ("Ver o mapa completo")
- [ ] `WhyThisExists` block: 3-4 short paragraphs explaining the gap between using AI and using AI well
- [ ] `JourneyMap` / `SessionCards`: clickable cards for each of the 6 sessions, showing title, summary, level, reading time
- [ ] `MaturityPreview`: compact visual showing the 5 phases (Consulta > Autocomplete > Vibe Coding > SDD > Harness Engineering)
- [ ] `Footer`: credits, content version, last revision date, source links
- [ ] proper `<head>` meta: title, description, OG tags for the home page
- [ ] mobile layout validated

### done when

- home page explains the product without clicking anything else
- all 6 session cards link to their routes (even if those pages are just stubs for now)
- the maturity preview is readable and makes sense to someone who's never heard of SDD
- page loads fast, Lighthouse perf score stays above 90 on mobile
- looks intentionally neo-brutalist, not accidentally broken

---

## Phase 4: session page template

build the reusable layout that every session page will use. get it right once so we can crank out content without touching layout code again.

### what we ship

- [ ] `SessionLayout.astro` fully built out with all template zones:
  - session hero (title, subtitle, level badge, reading time, hero label)
  - "em 30 segundos" plain-language summary block
  - main narrative content area (MDX body)
  - "por que isso importa" section
  - "onde isso quebra" anti-pattern block
  - interactive block slot (empty for now, React island will plug in later)
  - takeaway summary
  - "quer se aprofundar?" references section with typed links (artigo, doc, talk, video, pesquisa)
  - next session CTA
- [ ] `SectionNav`: sticky/sidebar nav for long pages with section anchors
- [ ] `ReferencesList` component consuming the references collection
- [ ] responsive behavior: mobile collapses to linear flow, desktop gets sticky nav
- [ ] one real session fully rendered with placeholder content to prove the template works end-to-end

### done when

- creating a new session is just "write an MDX file with frontmatter, done"
- all template zones render correctly and look good at all breakpoints
- sticky nav highlights current section on scroll
- references section pulls from the references collection by ID
- the template enforces visual consistency without being rigid about content length

---

## Phase 5: core content

write all 6 sessions for real. this is the meat of the product. no placeholders, no "lorem ipsum", no "TODO write this later".

### what we ship

- [ ] Session 0: O que é um AI-Native Engineer (`/ai-native-engineer/`)
  - definition, what changed, what didn't, anti-patterns, self-assessment questions (static for now)
- [ ] Session 1: Glossário (`/glossario/`)
  - all terms: LLM, modelo, inferência, contexto, token, prompt, system prompt, IDE, CLI, agente, agente de código, autocomplete, contexto de código, MCP, harness
  - simple and technical definitions for each
- [ ] Session 2: Ferramentas (`/ferramentas/`)
  - IDE vs CLI categories, examples (Cursor, Antigravity, Copilot, Claude Code, Codex CLI, OpenCode)
  - comparison structure (where it runs, best for, user type, strengths, common risk)
- [ ] Session 3: Modelos (`/modelos/`)
  - product vs model distinction, profiles by task type, editorial guidance on reading benchmarks critically
- [ ] Session 4: Maturidade (`/maturidade/`)
  - all 5 phases with what/why/where it works/where it breaks/what the next phase fixes
- [ ] Session 5: Como operar (`/como-operar/`)
  - workflow, pre-request checklist, pre-accept checklist, examples by profile (PM, QA, junior dev, senior dev, tech lead)
- [ ] curated references for each session (2-4 "start here", 2-4 primary sources, 1-3 videos/talks)
- [ ] `src/data/tools.ts`, `src/data/models.ts`, `src/data/glossary.ts` populated with real data

### done when

- all 6 sessions are published and accessible from the home page
- content tone is consistent across all sessions: natural PT-BR, direct, no academic fluff
- no session mentions a specific tool without framing it as a market example, not gospel
- every acronym is explained before being used technically
- every session has its references section populated with real links
- a non-technical person can read any session and walk away understanding the core idea

---

## Phase 6: interactive components

this is where React islands come in. every interactive block must pass the test: does it explain better, organize better, or increase retention? if not, it doesn't ship.

### what we ship

- [ ] `GlossaryCardGrid` (React island): expandable cards with "simple" and "technical" toggle, search/filter
- [ ] `ToolComparison` (React island): filterable comparison by user type (non-technical, junior, experienced, leadership) and view mode (by interface vs by workflow)
- [ ] `ModelTaskMatcher` (React island): select a task, see which model characteristics matter most
- [ ] `MaturityStepper` (React island): interactive timeline/stepper walking through the 5 phases, with before/after and practical cases
- [ ] `SelfAssessment` (React island): 5-7 questions, localStorage score, 3 result profiles (exploring, operating, structuring)
- [ ] `ProgressTracker`: reading progress per session, persisted in localStorage
- [ ] Motion animations where they genuinely help: card entrances, state transitions, phase changes. CSS for everything else

### done when

- each interactive component is plugged into its session page and works on mobile
- islands hydrate only when needed (`client:visible` or `client:idle`)
- no island ships more than ~50KB of JS (check bundle)
- localStorage persistence works for self-assessment and progress tracker
- Lighthouse perf stays above 85 on mobile with all islands loaded

---

## Phase 7: polish and ship

last pass. fix everything that's "good enough" and make it actually good.

### what we ship

- [ ] accessibility audit: contrast, focus order, screen reader flow, aria labels where needed
- [ ] SEO: per-page meta titles, descriptions, OG tags, proper heading hierarchy, clean slugs
- [ ] OG images: one per session (can be generated or static)
- [ ] 404 page with helpful navigation back to home
- [ ] content review: typos, broken links, outdated references, tone consistency
- [ ] performance review: Lighthouse mobile audit, bundle analysis, image optimization (prefer SVG/CSS)
- [ ] cross-browser sanity check: Chrome, Safari, Firefox on desktop and mobile
- [ ] final deploy validation: GH Pages serves everything correctly, no broken routes

### done when

- Lighthouse scores: perf >90, a11y >95, SEO >95 on mobile
- every page has unique OG tags and renders a proper preview when shared
- keyboard-only navigation works across the entire site
- all links in references sections are alive and point to the right thing
- a non-technical person can go from home to any session and back without getting lost
- deploy is stable and auto-triggers on push to main

---

## not in scope (post-MVP backlog)

stuff we might do later but absolutely not now:

- local search
- learning paths by profile
- english version
- workflow template builder
- global glossary with filters
- market changelog
- newsletter signup
- PDF export
- dark mode
- auth / user accounts
- CMS integration
- gamification
