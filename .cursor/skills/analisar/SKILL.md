---
name: analisar
description: >-
  Analyze a plan markdown document before implementation: scope, current project
  state, and locked decisions. Use when the user invokes /analisar, asks to
  analyze a roadmap or plan .md, review a phase before coding, or wants a
  pre-implementation briefing.
disable-model-invocation: true
---

# Analisar

Analyze the plan `.md` document.
Before implementing, the agent must understand scope, current project state, and locked decisions.

**Do not implement.** Read-only analysis only. Produce a briefing the team can use to start or review work.

## When to run

- User invokes `/analisar` (optionally with a plan path or phase number)
- User asks to analyze `PLAN.md`, `ROADMAP.md`, `BLOG-ROADMAP.md`, or another execution plan before coding
- User asks "are we ready to implement Phase N?" or "o que falta da fase X?"

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Identify the plan document
- [ ] Step 2: Read the plan (scope, decisions, target phase)
- [ ] Step 3: Inspect current project state
- [ ] Step 4: Cross-check harness docs
- [ ] Step 5: Write the briefing
- [ ] Step 6: Verdict and next steps
```

### Step 1: Identify the plan document

| User intent | Default document |
|---|---|
| Full product spec / discovery | `PLAN.md` |
| Site implementation phases | `ROADMAP.md` |
| Blog implementation phases | `BLOG-ROADMAP.md` |
| User gave a path | Use that path |

If ambiguous, ask which `.md` file is the source of truth.

### Step 2: Read the plan

Extract:

- Locked decisions and assumptions (do not reopen unless user asks)
- Development order and the target phase (if specified)
- **What We Ship**, **Done When**, **How to Validate** for that phase
- Risks, mitigations, and explicit out-of-scope items

For `PLAN.md`, focus on product thesis, content model, site structure, and design system — not phase checkboxes.

For `ROADMAP.md` / `BLOG-ROADMAP.md`, focus on the requested phase and its dependencies on prior phases.

### Step 3: Inspect current project state (readonly)

- Grep/glob for files the plan says should exist
- Read key files the phase will touch (config, layouts, routes, content dirs)
- Compare plan vs repo: **exists / missing / partial**
- Note prior-phase items still unchecked if they block the target phase

### Step 4: Cross-check harness docs

Read as needed:

- `AGENTS.md`, `CLAUDE.md` — stack, architecture, commit discipline
- `TONE.md` — editorial voice when content is in scope
- Related roadmaps when work spans site + blog

### Step 5: Write the briefing

Use the output template below. Keep it proportional: a single phase needs less detail than a full roadmap review.

### Step 6: Verdict

- **Ready to implement?** Yes / no / blocked — one-line reason
- If yes: ordered next steps in plan order (still no code unless user asks)

## Output template

```markdown
# Briefing: [plan document name]

## Scope (one sentence)
[What this plan phase or full plan delivers]

## Locked decisions
[From the plan — table or bullets; do not reopen unless user asks]

## Current state vs plan
| Planned item | Status (exists / missing / partial) | Notes |
|---|---|---|

## Phase [N] focus (if applicable)
- **Objective:**
- **Deliverables:**
- **Done When:**
- **How to Validate:**

## Patterns to reuse
[Existing files/patterns in this repo — with paths]

## Out of scope (do not implement now)
[From the plan]

## Risks to watch
[From the plan + gaps found in the repo]

## Readiness
[Ready / not ready / blocked — why]

## Suggested next steps
[Ordered list; implementation only if user explicitly requests it]
```

## Rules

- **Readonly** until the user explicitly asks to implement
- Cite repo paths and plan sections; use code citations for existing patterns
- If the plan and repo disagree, call it out — recommend updating one or the other before coding
- Do not mark plan checkboxes as done — analysis only
- Do not skip Step 3; "understand current state" requires inspecting the repo, not only reading the markdown

## Project hints (AI-Native Engineers)

- Roadmaps at repo root: `ROADMAP.md` (site), `BLOG-ROADMAP.md` (blog); discovery in `PLAN.md`
- Blog content: Markdown (`.md`) under `src/content/blog/`; sessions: MDX under `src/content/sessions/`
- Content Collections: `src/content.config.ts`
- Session routes: `src/pages/sessions/[slug].astro`
- Harness docs in English; user-facing site content may be PT-BR
