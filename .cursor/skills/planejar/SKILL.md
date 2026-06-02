---
name: planejar
description: >-
  Analyze the current roadmap phase and produce a tactical development plan:
  probable files, work sequence, risks, and validation. Use when the user
  invokes /planejar, asks how to implement Phase N, or wants a step-by-step
  plan before coding.
disable-model-invocation: true
---

# Planejar

analisar a fase atual e planejar o desenvolvimento.
O plano da fase deve cobrir arquivos prováveis, sequência de trabalho, riscos e como validar o resultado.

**Do not implement code** unless the user explicitly asks after the plan.

## When to run

- User invokes `/planejar` (optionally with a roadmap path and phase number)
- User asks how to implement Phase N of `ROADMAP.md` or `BLOG-ROADMAP.md`
- User wants a step-by-step dev plan before coding (after or instead of `/analisar`)

## Relationship to other skills

| Order | Skill | Purpose |
| --- | --- | --- |
| 1 (optional) | `/analisar` | Readiness briefing: scope, repo state, locked decisions |
| 2 | **`/planejar`** | Tactical plan: files, sequence, risks, validation |
| 3 | `/executar` | Review, implement, validate, and hand off the phase |
| — | `quality-gate` | Runs inside `/executar` Step 3 (Validate) |

If the user already ran `/analisar` in the same thread, reuse its findings; re-inspect the repo only if the phase or repo may have changed.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Identify roadmap and phase
- [ ] Step 2: Verify prerequisites
- [ ] Step 3: Inspect current project state
- [ ] Step 4: Find patterns to reuse
- [ ] Step 5: Write the phase development plan
- [ ] Step 6: Map validation to commands and checks
```

### Step 1: Identify roadmap and phase

| User intent | Default document |
| --- | --- |
| Full product spec / discovery | `PLAN.md` |
| Site implementation phases | `ROADMAP.md` |
| Blog implementation phases | `BLOG-ROADMAP.md` |
| User gave a path | Use that path |

If phase is omitted, pick the **first incomplete phase** (unchecked items in **What We Ship**). If ambiguous, ask.

### Step 2: Verify prerequisites

- Read **Objective**, **What We Ship**, **Done When**, **How to Validate** for the target phase
- Confirm prior phases are complete (repo state + roadmap checkboxes)
- If blocked, state what is missing and stop — do not plan implementation work

### Step 3: Inspect current project state (readonly)

- Grep/glob for files the phase will create or modify
- Read key existing files (config, layouts, routes, content dirs)
- Mark each planned item: **exists / missing / partial**

### Step 4: Find patterns to reuse

- Cite existing repo files with paths (collections, routes, layouts, i18n helpers)
- Prefer copying established patterns over inventing new ones
- Cross-check `AGENTS.md`, `CLAUDE.md`, and `TONE.md` when relevant

### Step 5: Write the phase development plan

Use the output template below. Keep steps small and ordered — smallest safe edit first.

### Step 6: Map validation

- Copy **Done When** and **How to Validate** from the roadmap
- Turn them into concrete commands (`npm run build`, `npm run lint`, etc.) and manual checks
- Suggest 1–3 logical PRs aligned with **PR discipline** in `AGENTS.md`

## Output template

```markdown
# Plano de desenvolvimento: [Roadmap] — Phase [N]

## Objetivo da fase
[One sentence from roadmap Objective]

## Pré-requisitos
- [ ] Phase N-1 complete (or N/A for Phase 1)
- [List blocking gaps if any]

## Arquivos prováveis
| Ação | Caminho | Propósito |
| --- | --- | --- |
| create / modify / read-only | `path` | why |

## Sequência de trabalho
1. [First edit — smallest safe step]
2. [Next edit]
3. ...

## Fora desta fase
[Explicit out-of-scope from roadmap — do not implement]

## Riscos e mitigação
| Risco | Mitigação |
| --- | --- |

## Como validar
### Comandos
- `npm run build`
- ...

### Checks manuais
- [From Done When / How to Validate]

## PRs sugeridos
[1–3 logical PRs, each ≤400 changed lines outside `src/content/**`; content-only PRs may be larger; commits inside each PR are optional and uncapped]

## Próximo passo
[/executar to implement and validate this phase]
```

## Rules

- **Readonly** until the user explicitly asks to implement
- Do not mark roadmap checkboxes as done — planning only
- Cite roadmap sections and repo paths; use code citations for patterns to reuse
- Align PR split suggestions with **PR discipline** in `AGENTS.md`
- If the plan and repo disagree, recommend updating the doc or the roadmap before coding
- Do not skip Step 3; probable files must reflect actual repo state

## Project hints (AI-Native Engineers)

- Roadmaps at repo root: `ROADMAP.md` (site), `BLOG-ROADMAP.md` (blog); discovery in `PLAN.md`
- Blog content: Markdown (`.md`) under `src/content/blog/`; sessions: MDX under `src/content/sessions/`
- Content Collections: `src/content.config.ts`
- Session route pattern: `src/pages/sessions/[slug].astro`
- Harness docs in English; user-facing site content may be PT-BR
