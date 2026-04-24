# PLAN.md: AI-Native Engineer Learning Site

## 1. Project Summary

Create an interactive, static, responsive website, published through GitHub Pages, that teaches in accessible human language what a person needs to understand to operate as an **AI-Native Engineer** in 2026.

The product must not speak only to senior developers. It needs to work for:

- non-technical people working in digital product, such as QA, PMs, Product Designers, Tech Recruiters, and product leadership;
- people with low seniority in technology;
- beginner developers who still confuse tools, models, agents, CLIs, and workflows.

The central proposal is simple:

**explain the market, translate the terminology, map the tooling landscape, organize the evolution of AI usage in development, and make clear that AI-native is not "asking for code", but operating with context, judgment, validation, and flow.**

---

## 2. Product Thesis

The market already treats AI as a normal part of software work, but there is still a large gap between **using AI** and **working well with AI**.

The latest data points to a clear scenario:

- AI usage in development is already massive;
- perceived productivity has increased;
- trust has not increased at the same pace;
- teams need process, validation, and context, not just access to tools.

This changes the focus of the site. The content must not sell hype. It must teach:

1. the right vocabulary;
2. the difference between tool, model, and workflow;
3. how practice evolved from simple consultation to agents;
4. why verification, planning, and harness/context engineering became central pieces.

---

## 3. Market Reading Baseline

### 3.1 Practical Definition of AI-Native Engineer

We will use a practical definition inspired by Addy Osmani:

> an AI-Native Engineer is someone who integrates AI deeply into the daily workflow and starts thinking about every task by asking whether AI can help do it faster, better, or differently.

But the site must not treat this as a slogan. It must make clear that this comes with:

- human supervision;
- validation;
- goal clarity;
- good project structure;
- the ability to review output, not just accept it.

### 3.2 What Market Data Suggests

The combined reading of the sources indicates:

- Adoption is no longer niche. Stack Overflow 2025 shows that 84% of respondents use or plan to use AI in the development process, and 51% of professional developers use AI daily.
- The DORA 2025 report shows 90% adoption among software professionals, with more than 80% reporting productivity gains and 59% reporting positive impact on quality.
- At the same time, trust trails adoption. Stack Overflow 2025 shows more people distrusting the accuracy of AI outputs than trusting them.
- The biggest frustration reported by developers is a "solution that is almost right, but not quite", followed by more costly debugging of AI-generated code.
- Anthropic shows that coding remains one of the strongest uses of its platforms, and that correction, software modification, and UI-focused app-building tasks are among the most relevant uses.

### 3.3 Strategic Interpretation

The site therefore needs to teach a more mature mental model:

**AI-native engineer = operator of AI-assisted work systems**
and not merely
**person who writes good prompts**.

That operator needs to understand at least five layers:

1. language and concepts;
2. tool categories;
3. model capabilities and limits;
4. spec-driven contracts;
5. harness mechanisms: context, validation, rules, tools, tests, governance, and review.

---

## 4. Target Audience

### Primary

People in digital product and technology who are not deep engineering specialists, but need to understand the new landscape:

- QA
- Product Manager
- Product Ops
- Tech Recruiter
- Product Designer
- Founder
- technology leadership in transition

### Secondary

- junior and mid-level developers;
- curious people trying to enter the topic;
- professionals who use AI at work but still do not have a clear mental map.

### Expected Consumption Profile

- enters on mobile, but may also study on desktop;
- wants direct, human explanations without unnecessary jargon;
- tolerates depth, as long as there is progression;
- wants references to go deeper later.

---

## 5. User Goals

By the end of the site, the person should be able to:

- explain what LLM, model, agent, CLI, IDE, and harness mean without sounding like they memorized buzzwords;
- differentiate IDE tools from terminal tools;
- understand that "model" is not the same as "product";
- recognize the phases of AI usage in development;
- understand why vibe coding appeared, why it fails in several contexts, and why more structured approaches emerge;
- perceive that AI-native engineering is as much about context engineering and validation as it is about code generation.

---

## 6. Content Principles

### 6.1 Language

The site language should be:

- organic;
- human;
- direct;
- natural in the target locale;
- not academic;
- not excessively formal.

Harness and operational documentation must remain in English. User-facing educational content may follow the page locale, with PT-BR as the primary audience and English supported where localized routes exist.

### 6.2 Teaching Approach

Each page needs to follow a progression of depth:

1. short and simple explanation;
2. why it matters;
3. real example;
4. where it breaks;
5. how to think better about the topic;
6. references.

### 6.3 Explanation Style

Whenever possible:

- use simple comparisons;
- explain acronyms before going deeper;
- show a "short" version and then a "more technical" version;
- bring examples from QA, PM, and product teams, not only hardcore development examples.

### 6.4 Important Editorial Rule

The site must not look like a tool fanboy.

It must show categories and patterns.
Tools enter as concrete market examples, not as definitive truth.

---

## 7. Information Architecture

## Home Page `/`

The home page should work as:

- a short manifesto;
- a navigation map;
- a visual index of the sessions;
- a democratic entry point.

### Home Structure

#### 7.1 Hero

Content:

- strong title;
- subtitle explaining the promise;
- primary CTA: "Start with the basics";
- secondary CTA: "See the full map".

Possible copy direction:

- "What you actually need to understand to work in engineering in a world of agents"
- "No hype. No empty buzzwords. Just the map that matters."

#### 7.2 "Why This Exists" Block

Explains in simple language:

- AI has already entered software work;
- many people are using it, few understand the whole picture;
- the site exists to organize this chaos.

#### 7.3 "Journey Map" Block

Clickable cards for each session.

#### 7.4 "How to Study" Block

Explains that:

- it can be read linearly;
- it can be navigated by question;
- each session ends with references.

#### 7.5 "SDD + Harness" Block

A summarized visualization of the professional flow:
Spec → Context → Execution → Validation → Governance

#### 7.6 Editorial Footer

- credits;
- sources;
- content version;
- last revision date.

---

## 8. Product Sessions

## Home Foundations Primer

**Location:** Home page, immediately below the hero.

This primer replaces the old foundations page and frames everything else without forcing users into a separate route.

### Objective

Answer, in a compact brutalist format:

- what an AI-Native Engineer is;
- what an AI agent is;
- what a coding agent is;
- why context, review, validation, and decision-making remain human responsibilities.

### Structure

- `HomeFoundations` component;
- three concise cards;
- no JavaScript;
- links from the old foundations route should redirect to this block.

---

## Session 1: Popular New Terminology

**Slug:** `/glossario/`

### Objective

Provide minimum literacy so anyone can continue through the site without getting lost.

### Required Concepts

- LLM
- model
- inference
- context
- token
- prompt
- system prompt
- IDE
- CLI
- agent
- code agent
- autocomplete
- code context
- MCP
- harness

### Page Structure

- short intro: "if these words all sound the same, you are not alone"
- card grid;
- each card opens:
  - simple definition;
  - more technical definition;
  - real example;
  - common mistake.

### Interactions

- hover/click cards;
- "short explanation" and "technical explanation" mode;
- mini quiz at the end;
- button: "see this in real tools".

### Editorial Note

"Harness" and "SDD" must be handled honestly:

- explain that they are terms used in certain circles;
- make clear that there is not always universal standardization;
- define how the site will use these terms.

---

## Session 2: Tools and Models: Choose Without Hype

**Slug:** `/sessions/ferramentas/`

### Objective

Help the user understand the difference between tools, products, and models, then choose combinations based on workflow friction and task difficulty.

### Main Teaching Axis

- tools are where work happens: IDEs, CLIs, cloud agents, prompt-to-app platforms;
- products are user-facing experiences that may embed different models;
- models are the reasoning/generation layer behind the experience;
- tool choice matters less than workflow, judgment, context, and validation;
- model choice should be task-fit, not leaderboard-driven.

### Tool Surface Examples

- IDEs and editor-integrated assistants: Cursor, Windsurf, GitHub Copilot, Antigravity;
- terminal and CLI agents: Claude Code, Codex CLI, Kimi Code, OpenCode, GitHub Copilot CLI;
- cloud agents and delegated work: Codex App, Google Jules, Devin.

### Model Concepts This Page Needs to Teach

- product and model are different things;
- models vary in reasoning, speed, cost, context window, code ability, and follow-through reliability;
- a larger context window helps, but does not remove the need to choose relevant context;
- there is no absolute "best model";
- benchmarks are signals, not answers.

### Suggested Organization

- explain tool/product/model separation first;
- explain IDE, CLI, and cloud-agent surfaces;
- explain model concepts without becoming academic;
- describe task profiles:
  - fast models for consultation and exploration;
  - balanced models for daily code writing/review;
  - stronger models for planning and architecture;
  - large-context models for documents and broad analysis;
  - open/open-weight models for privacy, cost, or control.
- end with a practical example that combines surface, model, and process.

### Interactions

No dedicated interactive block for this session. The page should stay editorial and concise. If interactivity is reintroduced later, it must explain better than the prose.

### Important Tone

This page must make clear:
**tools and models do not replace method**.

---

## Session 3: SDD and Harness Design

**Slug:** `/sessions/maturidade/`

This is the most important session in the product.

### Objective

Explain how professional AI-native delivery combines:

- **SDD (Spec-Driven Development):** turning intent into a clear, reviewable, versioned, verifiable contract.
- **Harness Design:** designing the agent work system around that contract: instructions, context, tools, permissions, validation, review, audit, and feedback loops.

The session replaces the previous "maturity phases" and "how to operate" split. It should teach that enterprise-grade AI software work is not about a single better prompt; it is about a coherent delivery system.

### Core Thesis

- SDD defines what must be true.
- Harness Design makes it possible to execute, validate, govern, and improve that truth repeatedly.
- SDD without a harness becomes documentation theater.
- A harness without SDD becomes automation without direction.

### What It Should Teach

- what a spec is and is not;
- anatomy of a useful agent-facing spec;
- how to scale from prompt to contract without becoming bureaucratic;
- what an agent harness includes;
- why repository-local, versioned context matters;
- how validation gates turn model output into reviewable software;
- how permissions, tools, MCP, CI, PR review, and audit trails fit together;
- how failures should improve specs, tests, rules, docs, or tools.

### Page Structure

- the shift that matters;
- why this matters for enterprise teams;
- what SDD is;
- anatomy of a good spec;
- what SDD is not;
- what Harness Design is;
- how SDD and Harness Design work together;
- applied corporate example;
- where this breaks;
- how to start without bureaucracy;
- takeaway.

### Interactions

- `SDDHarnessFlow` React island: interactive map showing the loop from intent contract to context package, controlled execution, validation gates, governance, and system learning.
- The old maturity stepper and checklist generator should not ship in the main flow unless redesigned around SDD + Harness.

---

## 9. Standard Template for Detail Pages

Every session page must follow a consistent structure:

1. **Session hero**
   - title
   - subtitle
   - difficulty level
   - reading time

2. **Plain-language summary**
   - "in 30 seconds"

3. **Main explanation**
   - short and clear narrative

4. **Why this matters**
   - practical impact

5. **Applied example**
   - real use case

6. **Where this breaks**
   - risks and anti-patterns

7. **Interactive block**
   - comparison, quiz, timeline, or simulator

8. **Final summary**
   - "what to take away"

9. **References**
   - articles
   - videos
   - official docs

---

## 10. Reference Strategy at the End of Each Session

Each session ends with a fixed area called:
**"Want to go deeper?"**

### Area Organization

- 2 to 4 "start here" links
- 2 to 4 "docs and primary sources" links
- 1 to 3 "videos / talks" links
- 1 "critical reading" block when it makes sense

### Curation Rules

- prioritize primary sources;
- avoid generic YouTubers as central sources;
- whenever official docs exist, prefer them;
- use 1 or 2 critical readings to balance the discourse;
- show the link type:
  - article
  - documentation
  - talk
  - video
  - research

---

## 11. Visual Direction: Neo Brutalism

## 11.1 Central Principle

The interface should use Neo Brutalism not as visual costume, but as a coherent language to:

- attract attention;
- feel contemporary;
- keep a strong identity;
- reinforce structural clarity.

Research points to a recurring set of characteristics:

- high contrast;
- block-based layout;
- strong colors;
- thick borders;
- large typography;
- raw or less polished elements;
- hard, simple, offset shadows.

But there is a critical point:
**without balance, the style can become noise and harm accessibility and understanding**.

### 11.2 Practical Translation for This Project

#### Palette

Use at most:

- 1 light base color;
- strong black;
- 2 or 3 vibrant accents.

Suggested direction:

- slightly warm light background;
- pure black for outlines and primary typography;
- accents such as yellow, electric blue, acid green, or coral.

#### Typography

- heavy-weight headlines;
- neutral and very readable body font;
- avoid "weird" fonts in paragraphs.

#### Borders and Shadows

- thick black borders;
- shadows offset in one direction;
- no blur;
- no glassmorphism;
- no excessive gradients.

#### Layout

- large cards;
- grids with strong rhythm;
- slight controlled asymmetry;
- generous breathing room between blocks.

#### Components

- buttons with clear states;
- visible links;
- simple and obvious hover;
- very apparent keyboard focus.

#### Illustrations and Ornaments

- simple geometric shapes;
- stickers, seals, and labels may exist;
- use sparingly;
- do not pollute dense content areas.

### 11.3 Most Important UX Rule

Neo Brutalism here should be:
**striking at first glance, but easy to use by the fifth minute**.

That means:

- never sacrifice readability;
- never hide navigation;
- never use mysterious interactions.

### 11.4 Responsive Guidelines

On mobile:

- prioritize linear reading;
- collapse grids into stacks;
- keep contrast and comfortable touch targets;
- reduce decorative elements;
- preserve visual weight without crushing the content.

### 11.5 Accessibility

Even with a strong visual style:

- acceptable WCAG contrast;
- visible focus;
- keyboard navigation;
- do not rely only on color to represent state;
- text and CTAs always readable.

---

## 12. Interaction and Creative Development

The site should be interactive, but it must not become a free-form playground.

### Recommended Interactions

- expandable cards;
- SDD + Harness flow map;
- comparison filters;
- quick quizzes;
- interactive checklists;
- hover and entrance micro-animations;
- reading progress;
- sticky nav per session.

### Interactions to Avoid in the MVP

- heavy parallax;
- intrusive smooth scroll;
- transitions that delay reading;
- unnecessary loaders;
- canvas/3D without real pedagogical value.

### Rule

Every interaction must fulfill one of three roles:

1. explain better;
2. organize better;
3. increase retention without reducing clarity.

If it does not fulfill one of these roles, it is removed.

---

## 13. Best Technical Stack for GitHub Pages

## Main Recommendation

**Astro + TypeScript + MDX + Content Collections + React islands + Motion + CSS Modules / CSS tokens**

### 13.1 Why Astro Is the Best Choice Here

This project is more content-first than app-first.

We need:

- real static pages;
- good loading performance;
- good indexing;
- simple routes;
- per-page detail;
- interactive components only where they make sense;
- easy deployment to GitHub Pages.

Astro fits very well because:

- it has an official guide for GitHub Pages deployment;
- it supports `base` and `site` for repository pages or custom domains;
- it works very well for content sites;
- it allows MDX for rich content;
- it supports content collections with schema, validation, and typing;
- it allows hydrating only interactive blocks as islands, keeping everything else light.

### 13.2 Why Not Use a Pure React SPA as the First Choice

A Vite + React SPA would work, but it is not the best first choice for this case because:

- the project is strongly editorial;
- statically generated pages are better for content and maintenance;
- using React for everything tends to increase JavaScript unnecessarily;
- the main interactivity need is local, not global.

### 13.3 Where React Enters

React enters only in interactive islands:

- comparators;
- quizzes;
- SDD + Harness flow map;
- filters;
- checklists;
- progress UI.

### 13.4 Motion

Use `motion` only where animation truly improves understanding:

- card entrances;
- state changes;
- transitions between phases;
- interaction feedback.

For simple hover and small effects, prefer CSS.

### 13.5 Style

Do not use Tailwind as the main visual layer.

Reason:

- the project needs an authored visual language;
- Neo Brutalism requires more careful visual decisions;
- CSS Modules + design tokens make the system more explicit and less template-like.

Tailwind can speed things up, but here it increases the chance of a generic result.

### 13.6 Stack Summary

- **Framework:** Astro
- **Language:** TypeScript
- **Content:** MDX
- **Content structure:** Astro Content Collections
- **Interactivity:** React islands
- **Animation:** Motion
- **Styles:** CSS Modules + CSS variables + global token file
- **Lint/format:** ESLint + Prettier
- **Deploy:** GitHub Actions to GitHub Pages

---

## 14. Suggested Technical Structure

```txt
/
├─ public/
│  ├─ favicon/
│  ├─ og/
│  └─ CNAME
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ glossary/
│  │  ├─ maturity/
│  │  ├─ tooling/
│  │  └─ references/
│  ├─ content/
│  │  ├─ sessions/
│  │  │  ├─ glossario.mdx
│  │  │  ├─ ferramentas.mdx
│  │  │  └─ maturidade.mdx
│  │  ├─ references/
│  │  │  ├─ artigos.json
│  │  │  └─ videos.json
│  │  └─ config.ts
│  ├─ data/
│  │  ├─ chapters.ts
│  │  ├─ glossary.ts
│  │  └─ sessions.ts
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ SessionLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ sessions/
│  │  │  └─ [slug].astro
│  │  └─ 404.astro
│  ├─ styles/
│  │  ├─ globals.css
│  │  ├─ tokens.css
│  │  └─ utilities.css
│  └─ lib/
│     ├─ content.ts
│     └─ seo.ts
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 15. Content Model

## Collection: `sessions`

Each session in MDX with frontmatter:

```yaml
title:
slug:
order:
summary:
readingTime:
level:
tags:
heroLabel:
references:
updatedAt:
```

### Advantages

- content separated from UI;
- easy maintenance;
- typing;
- clear order;
- can grow without coupling everything into code.

## Collection: `references`

Can start in JSON/YAML and migrate later if needed.
Fields:

- title
- url
- type
- source
- category
- relatedSessions
- priority

---

## 16. Core Components

### Home

- Hero
- WhyThisExists
- JourneyMap
- SessionCards
- SDDHarnessPreview
- FooterSources

### Session Pages

- SessionHero
- SectionNav
- PlainLanguageSummary
- InsightBlock
- InteractiveBlock
- AntiPatternBlock
- ReferencesList
- NextSessionCTA

### Interactive Components

- GlossaryCardGrid
- SDDHarnessFlow
- ProgressTracker

---

## 17. SEO, Performance, and Distribution

### SEO

Even as an educational and reference project, SEO matters:

- clear titles;
- metadata per session;
- OG tags;
- correct headings;
- clean slugs.

### Performance

Goal:

- excellent mobile reading;
- low JavaScript;
- minimal images;
- well-loaded typography.

### Rules

- islands only where needed;
- prefer SVG and CSS over heavy assets;
- avoid a large library for a small visual detail;
- measure Lighthouse on mobile early.

---

## 18. Responsiveness

### Suggested Breakpoints

- mobile: up to 767px
- tablet: 768px to 1023px
- desktop: 1024px+
- wide: 1440px+

### Strategy

On mobile:

- more linear home;
- cards in a column;
- table becomes comparative blocks;
- sticky nav can become a dropdown;
- reduced animations.

On desktop:

- strong grid;
- more visual experimentation;
- side navigation or contextual sticky navigation on long pages.

---

## 19. Implementation Plan

## Phase 0: Discovery and Conceptual Base

### Deliverables

- scope closure;
- session map;
- editorial decisions;
- design principles;
- initial source list;
- low-fi wireframe.

### Expected Output

- content structure approved;
- stack decided;
- no visual code yet.

---

## Phase 1: Project Foundation

### Deliverables

- Astro configured;
- TS configured;
- MDX configured;
- content collections configured;
- CSS tokens;
- base layout;
- initial deployment to GitHub Pages.

### Criteria

- main route working;
- one example session rendering;
- automatic deploy on push.

---

## Phase 2: Neo Brutalism Visual System

### Deliverables

- palette;
- typography;
- grid;
- buttons;
- cards;
- states;
- shadows and borders;
- spacing system.

### Criteria

- consistent visual language;
- mobile-first validated;
- no loss of readability.

---

## Phase 3: Home Page

### Deliverables

- hero;
- context block;
- session cards;
- SDD + Harness preview;
- footer with sources.

### Criteria

- home explains the product on its own;
- clear CTA;
- obvious navigation.

---

## Phase 4: Session Templates

### Deliverables

- detail page layout;
- sticky nav;
- summary area;
- references area;
- narrative block pattern.

### Criteria

- any new session can be created without reinventing layout.

---

## Phase 5: Core Content

### Deliverables

- home foundations primer;
- glossary;
- tools and models;
- SDD and Harness Design.

### Criteria

- all sessions published;
- consistent language;
- no critical placeholders.

---

## Phase 6: Interactivity

### Deliverables

- glossary cards;
- tool comparator;
- model matcher by task;
- SDD + Harness flow;
- self-assessment;
- progress tracker.

### Criteria

- each interaction improves understanding;
- no performance compromise.

---

## Phase 7: Final Polish

### Deliverables

- accessibility;
- contrast adjustment;
- SEO;
- OG images;
- 404;
- text review;
- link review.

### Criteria

- solid mobile experience;
- stable deploy;
- reliable content.

---

## 20. Definition of Done

An MVP version is ready when:

- the home page is complete;
- all main sessions exist;
- every session has content and references, with interactive blocks only where they improve learning;
- the Neo Brutalism design is consistent;
- mobile is genuinely good;
- Lighthouse is not degraded by visual excess;
- automatic deployment to GitHub Pages is working;
- the pages are readable and useful for someone non-technical.

---

## 21. Main Risks

### 21.1 Risk of Content Becoming Buzzword Soup

Mitigation:

- concrete examples;
- simple explanation before technical depth;
- anti-patterns in every session.

### 21.2 Risk of Neo Brutalism Hurting Readability

Mitigation:

- validated contrast;
- limited palette;
- neutral body text;
- generous whitespace.

### 21.3 Risk of Tools Dominating the Narrative

Mitigation:

- teach categories;
- use tools as examples;
- focus on workflow.

### 21.4 Risk of Interactivity Becoming Dead Weight

Mitigation:

- only include it if it explains better;
- minimal JavaScript;
- localized islands.

### 21.5 Risk of Content Aging Quickly

Mitigation:

- talk about patterns and capabilities;
- cite tools as market snapshots;
- include `updatedAt` per session;
- periodic review.

---

## 22. MVP Non-Goals

Not part of the first scope:

- authentication;
- complex search;
- headless CMS;
- heavy gamification;
- mandatory dark mode;
- internationalization;
- model ranking;
- user area.

---

## 23. Post-MVP Backlog

- local search;
- profile-based learning paths;
- English version;
- "how to build your workflow" page;
- global glossary with filters;
- market changelog;
- newsletter;
- print mode / export session as PDF.

---

## 24. Final Positioning Recommendation

The product should position itself as:

**an educational, visually strong, editorially clear, and technically lightweight website that turns a confusing topic into an understandable journey.**

It must not compete with official docs.
It must work as:

- map;
- translation;
- critical filter;
- reliable starting point.

---

## 25. Seed References for Initial Curation

### Market and AI-Native Engineering

- Addy Osmani, The AI-Native Software Engineer
  https://addyo.substack.com/p/the-ai-native-software-engineer
- Stack Overflow Developer Survey 2025, AI
  https://survey.stackoverflow.co/2025/ai
- Google DORA 2025 summary
  https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/
- Anthropic, AI's impact on software development
  https://www.anthropic.com/news/impact-software-development
- Anthropic Economic Index 2026
  https://www.anthropic.com/research/economic-index-march-2026-report
- GitHub Octoverse 2025
  https://octoverse.github.com/

### Tooling References

- Cursor, Best practices for coding with agents
  https://cursor.com/blog/agent-best-practices
- Cursor docs
  https://cursor.com/docs
- Claude Code overview
  https://code.claude.com/docs/en/overview
- Codex CLI
  https://developers.openai.com/codex/cli
- OpenCode docs
  https://opencode.ai/docs/
- Google Antigravity Codelab
  https://codelabs.developers.google.com/getting-started-google-antigravity
- GitHub Copilot
  https://github.com/features/copilot

### Design / Neo Brutalism

- Nielsen Norman Group, Neobrutalism: Definition and Best Practices
  https://www.nngroup.com/articles/neobrutalism/
- Bejamas, Neubrutalism UI trend
  https://bejamas.com/blog/neubrutalism-web-design-trend

### Stack / Deployment

- Astro, Deploy to GitHub Pages
  https://docs.astro.build/en/guides/deploy/github/
- Astro, Content Collections
  https://docs.astro.build/en/guides/content-collections/
- Astro, MDX integration
  https://docs.astro.build/en/guides/integrations-guide/mdx/
- Vite, Static deploy guide
  https://vite.dev/guide/static-deploy
- Motion for React
  https://motion.dev/docs/react

---

## 26. Final Decision

### Product

Build an interactive educational website, primarily for PT-BR users, focused on clarity and critical reading about AI-native engineering.

### Structure

Editorial home + detail pages per session.

### Content

Start with:

1. Home foundations primer
2. Glossary
3. Tools and models
4. SDD and Harness Design

### Design

Controlled Neo Brutalism, focused on clarity.

### Stack

Astro + TypeScript + MDX + Content Collections + React islands + Motion + CSS Modules.

### Deploy

GitHub Pages with GitHub Actions.

### Mother Rule

**Teach without idolizing tools. Explain without becoming academic. Create visual impact without harming readability.**
