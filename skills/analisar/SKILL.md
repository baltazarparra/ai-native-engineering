---
name: analisar
description: >-
  Analyze a plan markdown document before implementation: scope, current project
  state, and locked decisions. Use when the user invokes /analisar, asks to
  analyze a roadmap or plan .md, review a phase before coding, or says they want
  a pre-implementation briefing.
disable-model-invocation: true
---

# Analisar

analisar o doc .md com o plano.
Antes de implementar, o agente precisa entender o escopo, o estado atual do projeto e o que já foi decidido.

**Do not implement.** Read-only analysis only. Produce a briefing the team can use to start or review work.

## When to run

- User invokes `/analisar` (optionally with a plan path or phase number)
- User asks to analyze `BLOG-ROADMAP.md`, `ROADMAP.md`, or another execution plan before coding
- User asks "are we ready to implement Phase N?"

## Workflow

1. **Identify the plan document**
   - Use the path the user gave, or infer from context (e.g. `BLOG-ROADMAP.md`, `ROADMAP.md`, `PLAN.md`)
   - If ambiguous, ask which `.md` file is the source of truth

2. **Read the plan**
   - Locked decisions / assumptions
   - Development order and the target phase (if specified)
   - What We Ship, Done When, How to Validate for that phase
   - Risks, mitigations, and explicit out-of-scope items

3. **Inspect current project state** (readonly)
   - Grep/glob for files the plan says should exist
   - Read key files the phase will touch (config, layouts, routes, content dirs)
   - Compare plan vs repo: what exists, what is missing, what partially overlaps

4. **Cross-check harness docs**
   - `AGENTS.md`, `CLAUDE.md`, `TONE.md`, related roadmaps
   - Note policies that affect the work (commit discipline, stack choices, editorial rules)

5. **Synthesize the briefing** using the output template below

6. **Verdict**
   - Ready to implement this phase? Yes / no / blocked — with one-line reason
   - If yes: list the concrete next steps in plan order (still no code unless user asks)

## Output template

```markdown
# Briefing: [plan document name]

## Scope (one sentence)
[What this plan phase or full plan delivers]

## Locked decisions
[Table or bullets from the plan — do not reopen unless user asks]

## Current state vs plan
| Planned item | Status (exists / missing / partial) | Notes |
|---|---|---|

## Phase [N] focus (if applicable)
- **Objective:**
- **Deliverables:**
- **Done When:**
- **How to Validate:**

## Patterns to reuse
[Existing files/patterns in this repo to copy — with paths]

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
- Cite repo paths and plan sections; prefer code citations for existing patterns
- If the plan and repo disagree, call it out and recommend updating one or the other before coding
- Keep the briefing proportional: a single phase needs less detail than a full roadmap review
- Do not mark plan checkboxes as done — analysis only

## Project-specific hints (AI-Native Engineers)

- Roadmaps live at repo root: `ROADMAP.md` (site), `BLOG-ROADMAP.md` (blog)
- Blog content is Markdown (`.md`) under `src/content/blog/`; sessions stay MDX
- Content Collections config: `src/content.config.ts`
- Session route pattern: `src/pages/sessions/[slug].astro`
- Harness docs in English; user-facing site content may be PT-BR
