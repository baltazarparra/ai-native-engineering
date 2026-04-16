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
4. maturity stages of AI usage in development;
5. control mechanisms: context, validation, rules, tests, harness, and review.

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

#### 7.5 "Maturity" Block

A summarized visualization of the evolution:
Consultation → Autocomplete → Vibe Coding → SDD → Harness Engineering

#### 7.6 Editorial Footer

- credits;
- sources;
- content version;
- last revision date.

---

## 8. Product Sessions

## Session 0: What Is an AI-Native Engineer

**Slug:** `/ai-native-engineer/`

This session must exist before or immediately after the hero, because it frames everything else.

### Objective

Answer:

- what the market expects today;
- why this does not mean "everyone became an engineer";
- why the human role still matters;
- why context, review, and decision-making remain central.

### Page Structure

- short definition;
- expanded definition;
- "what changed in the work";
- "what did not change";
- checklist: "are you already operating in an AI-native way?";
- anti-pattern block.

### Interactions

- self-assessment with 5 to 7 questions;
- simple local score, saved in `localStorage`;
- result with three profiles:
  - exploring
  - operating
  - structuring

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

## Session 2: Tools: IDEs vs CLI

**Slug:** `/ferramentas/`

### Objective

Help the user understand categories of tools, not just memorize names.

### Main Teaching Axis

- tools integrated into the editor/IDE;
- terminal/CLI-centered tools;
- agents that operate with more autonomy;
- where each one makes more sense.

### IDE / Agent-First IDE Examples

- Cursor
- Antigravity
- GitHub Copilot in the editor

### Terminal / CLI Examples

- Claude Code
- Codex CLI
- OpenCode
- GitHub Copilot CLI as adjacent

### What This Page Needs to Teach

- IDEs provide visual context and a more familiar flow;
- CLIs tend to provide more operational control and proximity to the real environment;
- some tools cross surfaces and do not stay in a pure category;
- tool choice matters less than workflow, judgment, and validation.

### Page Structure

- comparison by category;
- simple table:
  - where it runs
  - best for
  - user type
  - strengths
  - common risk
- block: "do not choose by hype, choose by the friction in your flow".

### Interactions

- filters by user type:
  - non-technical
  - junior
  - experienced developer
  - leadership
- tool comparator with expandable cards;
- toggle: "view by interface" vs "view by workflow".

### Important Tone

This page must make clear:
**tools do not replace method**.

---

## Session 3: LLMs and the Models Most Used in This Context

**Slug:** `/modelos/`

### Objective

Explain what a model is and how to think about models without becoming hostage to benchmarks.

### What This Page Needs to Teach

- product and model are different things;
- the user usually interacts with a product that embeds one or more models;
- models vary in:
  - reasoning
  - speed
  - cost
  - context window
  - code ability
  - follow-through reliability
- there is no absolute "best model";
- there is a best model for a given type of task.

### Suggested Organization

Instead of focusing on rankings, focus on profiles:

- fast models for consultation and exploration;
- strong models for planning and architecture;
- strong models for editing and code execution;
- open/open-weight models as an important ecosystem layer.

### Interactions

- task selector:
  - explain concept
  - review code
  - plan feature
  - execute refactor
  - generate first version
- the UI shows which model characteristics matter most for each case.

### Editorial Care

Avoid turning the page into a leaderboard.
The objective is to teach critical reading, not vendor worship.

---

## Session 4: The Evolution of AI-Assisted Development

**Slug:** `/maturidade/`

This is the most important session in the product.

### Objective

Explain the historical and practical progression of AI usage in development.

### Required Phases

#### Phase 1: AI for Consultation

Usage:

- ask about concepts;
- summarize docs;
- explore ideas;
- request examples.

Value:

- accelerates learning;
- reduces research time;
- helps people who do not know where to start.

Problems:

- superficiality;
- hallucination;
- false feeling of understanding;
- dependency without building judgment.

#### Phase 2: AI for Autocomplete and Pair Assistance

Usage:

- complete code;
- suggest a function;
- perform small refactors;
- explain snippets.

Value:

- accelerates the local loop;
- good for small tasks;
- reduces typing and boilerplate friction.

Problems:

- partial context;
- suggestions that are locally good and globally bad;
- accelerates debt production if the team does not review well.

#### Phase 3: Vibe Coding

Usage:

- describe what you want in natural language;
- let the tool generate a lot;
- explore prototypes, MVPs, spikes, and micro-products.

Value:

- radical compression of prototyping time;
- low entry friction;
- great for experimentation.

Problems:

- fragile architecture;
- inconsistency;
- false confidence;
- easy to generate a product that looks ready but is not;
- debugging and maintenance can become expensive later.

#### Phase 4: SDD as an Evolution of Vibe Coding

We will use SDD here as **Spec-Driven Development**.

The site must explain honestly:

- this is not a universal acronym like HTTP or SQL;
- here it represents a way of working guided by specification, criteria, and artifacts.

Usage:

- describe goal, scope, constraints, acceptance criteria, context, and plan;
- request execution based on that.

Value:

- reduces ambiguity;
- improves consistency;
- increases the chance of useful output;
- helps collaboration between human and agent.

Problems:

- requires discipline;
- adds more friction at the beginning;
- bad specification still generates bad results.

#### Phase 5: Harness Engineering

Here we will use "Harness Engineering" as the layer where the team stops thinking only about prompts and starts thinking about the **agent work system**.

The page must explain that, in practice, this involves:

- instructions;
- tools;
- model;
- rules;
- persistent context;
- validations;
- specialized agents;
- support files;
- evaluation of the result.

This reading aligns with how Cursor describes agent harnesses: instructions, tools, and model orchestrated together.

Value:

- scales quality;
- reduces variation;
- supports repeatability;
- enables more consistent workflows across people and teams.

Problems:

- higher operational complexity;
- risk of excessive framework;
- requires maintenance;
- does not save a team without good engineering fundamentals.

### Page Structure

- timeline or stepper;
- each phase with:
  - what it is;
  - why it emerged;
  - where it works;
  - where it breaks;
  - what the next phase tries to solve.

### Interactions

- horizontal slider or vertical stepper;
- "before and after" mode;
- practical cases:
  - "I need to launch an MVP"
  - "I need to refactor a legacy system"
  - "I need to maintain a product in production"
- the UI shows which phase alone is not enough.

---

## Session 5: How to Operate AI-Natively in Practice

**Slug:** `/como-operar/`

This session closes the reasoning loop.

### Objective

Translate theory into daily practice.

### What It Should Teach

- start with a plan;
- define a verifiable goal;
- provide enough context;
- ask for step-by-step execution when necessary;
- validate output with tests, lint, typecheck, review, and human reading;
- treat AI as an accelerating collaborator, not as the final authority;
- build a base of rules, useful prompts, checklists, and repeatable artifacts.

### Structure

- recommended workflow;
- "before asking" checklist;
- "before accepting" checklist;
- examples by profile:
  - PM
  - QA
  - junior developer
  - senior developer
  - tech lead

### Interactions

- checklist generator;
- profile toggle;
- copyable "playbook card".

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
- maturity stepper;
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
- maturity stepper;
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
│  │  │  ├─ ai-native-engineer.mdx
│  │  │  ├─ glossario.mdx
│  │  │  ├─ ferramentas.mdx
│  │  │  ├─ modelos.mdx
│  │  │  ├─ maturidade.mdx
│  │  │  └─ como-operar.mdx
│  │  ├─ references/
│  │  │  ├─ artigos.json
│  │  │  └─ videos.json
│  │  └─ config.ts
│  ├─ data/
│  │  ├─ tools.ts
│  │  ├─ models.ts
│  │  └─ glossary.ts
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
- MaturityPreview
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
- ToolComparison
- ModelTaskMatcher
- MaturityStepper
- SelfAssessment
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
- maturity preview;
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

- AI-native engineer session;
- glossary;
- tools;
- models;
- maturity;
- how to operate.

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
- maturity stepper;
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
- every session has content, an interactive block, and references;
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

1. What is an AI-native engineer
2. Glossary
3. Tools
4. Models
5. Maturity of AI usage in development
6. How to operate in practice

### Design

Controlled Neo Brutalism, focused on clarity.

### Stack

Astro + TypeScript + MDX + Content Collections + React islands + Motion + CSS Modules.

### Deploy

GitHub Pages with GitHub Actions.

### Mother Rule

**Teach without idolizing tools. Explain without becoming academic. Create visual impact without harming readability.**
