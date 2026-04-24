# Roadmap

We ship one phase at a time. Each phase gets validated before we move on. No skipping ahead, no half-baked work leaking into the next phase.

Phase 0 (discovery) is already done. That is `PLAN.md`.

---

## Phase 1: Project Foundation

Get the skeleton up and running. Zero visual polish, zero content. Just the infrastructure that everything else builds on top of.

### What We Ship

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

### Done When

- `npm run dev` serves the site locally
- `npm run build` generates static output with no errors
- the dummy session renders its MDX content at the right route
- Content Collections schema catches a bad frontmatter field (test it by breaking one on purpose)
- push to main triggers GH Actions and deploys successfully
- `npm run lint` and `npm run format` both run clean

---

## Phase 2: Neo Brutalism Design System

Build the visual language as reusable primitives. No pages yet, just the component toolkit. Everything mobile-first.

### What We Ship

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

### Done When

- kitchen-sink page looks intentionally brutal and readable at the same time
- all components pass WCAG contrast on the chosen palette
- components look solid on 375px, 768px, 1024px and 1440px
- zero JS shipped for these components (pure Astro + CSS)

---

## Phase 3: Home Page

The front door. If someone lands here and does not understand what this site is about in 10 seconds, we failed.

### What We Ship

- [ ] `Hero` section: strong headline, subtitle with the value prop, primary CTA ("Start with the basics"), secondary CTA ("See the full map")
- [ ] `WhyThisExists` block: 3-4 short paragraphs explaining the gap between using AI and using AI well
- [ ] `JourneyMap` / `SessionCards`: clickable cards for each of the 3 sessions, showing title, summary, level, reading time
- [ ] `SDDHarnessPreview`: compact visual showing the professional loop (Spec > Context > Execution > Validation > Governance)
- [ ] `Footer`: credits, content version, last revision date, source links
- [ ] proper `<head>` meta: title, description, OG tags for the home page
- [ ] mobile layout validated

### Done When

- home page explains the product without clicking anything else
- all 4 session cards link to their routes (even if those pages are just stubs for now)
- the SDD + Harness preview is readable and makes sense to someone who's never heard of SDD
- page loads fast, Lighthouse perf score stays above 90 on mobile
- looks intentionally neo-brutalist, not accidentally broken

---

## Phase 4: Session Page Template

Build the reusable layout that every session page will use. Get it right once so we can produce content without touching layout code again.

### What We Ship

- [ ] `SessionLayout.astro` fully built out with all template zones:
  - session hero (title, subtitle, level badge, reading time, hero label)
  - "in 30 seconds" plain-language summary block
  - main narrative content area (MDX body)
  - "why this matters" section
  - "where this breaks" anti-pattern block
  - interactive block slot (empty for now, React island will plug in later)
  - takeaway summary
  - "want to go deeper?" references section with typed links (article, docs, talk, video, research)
  - next session CTA
- [ ] `SectionNav`: sticky/sidebar nav for long pages with section anchors
- [ ] `ReferencesList` component consuming the references collection
- [ ] responsive behavior: mobile collapses to linear flow, desktop gets sticky nav
- [ ] one real session fully rendered with placeholder content to prove the template works end-to-end

### Done When

- creating a new session is just "write an MDX file with frontmatter, done"
- all template zones render correctly and look good at all breakpoints
- sticky nav highlights current section on scroll
- references section pulls from the references collection by ID
- the template enforces visual consistency without being rigid about content length

---

## Phase 5: Core Content

Write the home foundations primer and all 3 sessions for real. This is the meat of the product. No placeholders, no "lorem ipsum", no "TODO write this later."

### What We Ship

- [ ] Home foundations primer
  - compact definitions for AI-Native Engineer, AI agent, and coding agent
- [ ] Session 1: Glossary (`/sessions/glossario/`)
  - all terms: LLM, model, inference, context, token, prompt, system prompt, IDE, CLI, agent, code agent, autocomplete, code context, MCP, harness
  - simple and technical definitions for each
- [ ] Session 2: Tools and Models (`/sessions/ferramentas/`)
  - IDE, CLI, and cloud-agent categories, plus product vs model distinction
  - model profiles by task type and editorial guidance on reading benchmarks critically
- [ ] Session 3: SDD and Harness Design (`/sessions/maturidade/`)
  - spec-driven contracts, harness layers, validation gates, governance, and enterprise workflow examples
- [ ] curated references for each session (2-4 "start here", 2-4 primary sources, 1-3 videos/talks)
- [ ] `src/data/glossary.ts` and session/chapter metadata populated with real data

### Done When

- all 3 sessions are published and accessible from the home page
- content tone is consistent across all sessions: natural PT-BR, direct, no academic fluff
- no session mentions a specific tool without framing it as a market example, not gospel
- every acronym is explained before being used technically
- every session has its references section populated with real links
- a non-technical person can read any session and walk away understanding the core idea

---

## Phase 6: Interactive Components

This is where React islands come in. Every interactive block must pass the test: does it explain better, organize better, or increase retention? If not, it does not ship.

### What We Ship

- [ ] `GlossaryCardGrid` (React island): expandable cards with "simple" and "technical" toggle, search/filter
- [ ] `SDDHarnessFlow` (React island): interactive loop showing spec, context, execution, validation, governance, and learning
- [ ] `ProgressTracker`: reading progress per session, persisted in localStorage
- [ ] Motion animations where they genuinely help: card entrances, state transitions, phase changes. CSS for everything else

### Done When

- each retained interactive component is plugged into its session page and works on mobile
- islands hydrate only when needed (`client:visible` or `client:idle`)
- no island ships more than ~50KB of JS (check bundle)
- localStorage persistence works for self-assessment and progress tracker
- Lighthouse perf stays above 85 on mobile with all islands loaded

---

## Phase 7: Polish and Ship

Last pass. Fix everything that is "good enough" and make it actually good.

### What We Ship

- [ ] accessibility audit: contrast, focus order, screen reader flow, aria labels where needed
- [ ] SEO: per-page meta titles, descriptions, OG tags, proper heading hierarchy, clean slugs
- [ ] OG images: one per session (can be generated or static)
- [ ] 404 page with helpful navigation back to home
- [ ] content review: typos, broken links, outdated references, tone consistency
- [ ] performance review: Lighthouse mobile audit, bundle analysis, image optimization (prefer SVG/CSS)
- [ ] cross-browser sanity check: Chrome, Safari, Firefox on desktop and mobile
- [ ] final deploy validation: GH Pages serves everything correctly, no broken routes

### Done When

- Lighthouse scores: perf >90, a11y >95, SEO >95 on mobile
- every page has unique OG tags and renders a proper preview when shared
- keyboard-only navigation works across the entire site
- all links in references sections are alive and point to the right thing
- a non-technical person can go from home to any session and back without getting lost
- deploy is stable and auto-triggers on push to main

---

## Not in Scope (Post-MVP Backlog)

Things we might do later, but absolutely not now:

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
