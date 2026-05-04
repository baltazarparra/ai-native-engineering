# 🦾 AI-Native Engineering

**No hype. No empty buzzwords. Just the map that matters.**

An educational, interactive, visually strong website that teaches what you actually need to understand to work in engineering in a world of agents, using accessible, human language.

## The Problem

The market already treats AI as a normal part of software work. Adoption is massive, perceived productivity has increased, but trust has not kept up. The gap is not between using AI and not using it; it is between **using it poorly** and **using it well**.

This site exists to close that gap: to organize the chaos, translate the terminology, and show that AI-native engineering is about **context, judgment, validation, and flow**, not about "asking for code."

## Who It Is For

- QA, Product Managers, Product Designers, Tech Recruiters, founders, and technology leaders
- Junior and mid-level developers who still mix up tools, models, agents, CLIs, and workflows
- Any curious person who wants a clear mental map of the topic

## Content

The home page starts with a compact foundations primer, then the site continues through 3 progressive sessions:

| #   | Session                | Route                    | What It Teaches                                                |
| --- | ---------------------- | ------------------------ | -------------------------------------------------------------- |
| 1   | Glossary               | `/sessions/glossario/`   | LLM, model, token, prompt, agent, harness, MCP, and more       |
| 2   | Tools and Models       | `/sessions/ferramentas/` | IDEs, CLIs, cloud agents, product vs model, task-fit choices   |
| 3   | SDD and Harness Design | `/sessions/maturidade/`  | Spec-driven contracts, agent harnesses, validation, governance |

Each session follows a fixed template: 30-second summary → main explanation → why it matters → real example when useful → where it breaks → takeaway → references. Interactive blocks are included only when they clearly improve learning.

## Stack

| Layer         | Technology                                  |
| ------------- | ------------------------------------------- |
| Framework     | [Astro](https://astro.build)                |
| Language      | TypeScript                                  |
| Content       | MDX + Content Collections                   |
| Interactivity | React (islands only where needed)           |
| Animation     | [Motion](https://motion.dev)                |
| Styles        | CSS Modules + CSS Variables + design tokens |
| Lint/Format   | ESLint + Prettier                           |
| Deploy        | GitHub Actions → GitHub Pages               |

### Why Astro

The project is content-first, not app-first. Astro generates static HTML and hydrates only the interactive blocks (islands), keeping JavaScript minimal. It is a great fit for an educational website that needs to be fast on mobile.

### Why Not Tailwind

Neo Brutalism calls for an authored visual language: thick borders, hard shadows, and a controlled palette. CSS Modules + design tokens provide explicit control without making the site feel like a template.

## Development

```bash
npm install        # Install dependencies
npm run dev        # Dev server with hot reload
npm run build      # Static build
npm run preview    # Preview the production build
npm run lint       # ESLint
npm run format     # Prettier
```

## Discussion Comments

Session pages include a Giscus-powered discussion area backed by GitHub
Discussions. The default embed is configured for
`baltazarparra/ai-native-engineering` using the `General` discussion category
and explicit per-page terms, such as `page:pt-BR:glossario`, instead of URL
pathnames. This keeps local preview, GitHub Pages, and client-side navigation
from accidentally sharing a discussion thread.

To reconfigure the embedded comments:

1. Enable GitHub Discussions in the repository.
2. Install and authorize the [Giscus GitHub app](https://github.com/apps/giscus).
3. Use the [Giscus configuration page](https://giscus.app/) to get the repo and
   category IDs.
4. Override these public build variables when needed:

```bash
PUBLIC_GISCUS_REPO=baltazarparra/ai-native-engineering
PUBLIC_GISCUS_REPO_ID=R_kgDOSDoWVA
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOSDoWVM4C68fs
PUBLIC_GISCUS_LANG=pt
```

The embed starts with the light Giscus theme and syncs to the site's own
dark/light toggle at runtime.

## Agent Skills

This repository also exposes reusable agent skills through the open `npx skills`
workflow. List the available skills:

```bash
npx skills@latest add baltazarparra/ai-native-engineering --list
```

Install the quality gate skill for Codex:

```bash
npx skills@latest add baltazarparra/ai-native-engineering --skill quality-gate --agent codex --global
```

## Design: Neo Brutalism

- High contrast, thick black borders, offset shadows with no blur
- Limited palette: warm light background, pure black, 2-3 vibrant accents
- Heavy headlines, neutral and readable body text
- Mobile-first with breakpoints at 768px, 1024px, and 1440px
- WCAG compliance and visible focus states

**Core rule:** striking at first glance, easy to use by the fifth minute.

## Editorial Principles

- Teach without idolizing tools, showing categories and patterns instead
- Simple explanation first, technical depth second
- Examples from QA, PM, and product, not only hardcore development
- Every interaction must explain better, organize better, or improve retention
- Acronyms are explained before any deep dive

## License

[MIT](LICENSE)
