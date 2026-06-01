---
name: executar
description: >-
  Review, implement, and validate the current roadmap phase: ship deliverables,
  run checks, and report what changed. Use when the user invokes /executar,
  asks to implement Phase N, execute the phase plan, or finish a roadmap phase.
disable-model-invocation: true
---

# Executar

revisar, executar e validar o plano desta fase.
A fase só termina quando o agente implementa, testa o que for possível e explica claramente o que mudou.

**This skill implements code.** A phase is not done until deliverables ship, validation runs, and the handoff report is written.

## When to run

- User invokes `/executar` (optionally with roadmap path and phase number)
- User asks to implement Phase N of `ROADMAP.md` or `BLOG-ROADMAP.md`
- User says "executa a fase", "implementa e valida", or "termina a fase X"

## Relationship to other skills

| Order | Skill | Purpose |
| --- | --- | --- |
| 1 (optional) | `/analisar` | Readiness briefing before work |
| 2 (optional) | `/planejar` | Tactical plan: files, sequence, risks |
| 3 | **`/executar`** | Review → implement → validate → handoff |
| — | `quality-gate` | Required inside Step 3 (Validate) |

If `/analisar` or `/planejar` ran in the same thread, reuse their findings. Re-inspect the repo if the phase or codebase may have changed.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Revisar — confirm phase scope and readiness
- [ ] Step 2: Executar — implement deliverables in plan order
- [ ] Step 3: Validar — run checks from roadmap + quality gate
- [ ] Step 4: Handoff — explain what changed and phase status
```

### Step 1: Revisar

1. Identify roadmap and phase (same defaults as `/planejar`):

   | User intent | Default document |
   | --- | --- |
   | Site implementation phases | `ROADMAP.md` |
   | Blog implementation phases | `BLOG-ROADMAP.md` |
   | User gave a path | Use that path |

   If phase is omitted, pick the **first incomplete phase**. If ambiguous, ask.

2. Read for this phase only:
   - **What We Ship**
   - **Done When**
   - **How to Validate** (if present)

3. Quick repo check: prerequisites from prior phases, partial work, patterns to reuse.

4. If **blocked** (prior phase incomplete, missing dependency, plan/repo conflict), stop and report blockers — do not implement.

5. If no tactical plan exists in the thread, produce a **minimal inline plan** (ordered steps + files) before coding — do not skip straight to edits.

### Step 2: Executar

1. Implement **What We Ship** for this phase only — smallest safe edits first.
2. Follow `AGENTS.md` / `CLAUDE.md`: stack, architecture, commit discipline, editorial rules.
3. Reuse existing patterns; cite and extend files already in the repo.
4. Stay inside phase scope — defer out-of-scope items to the handoff report.
5. Do **not** create git commits unless the user explicitly asks.

### Step 3: Validar

1. Run **How to Validate** / **Done When** checks from the roadmap (commands + manual checks).
2. Apply the **quality-gate** skill:
   - `npm run lint`, `npm run build`, and other scripts from `package.json` / CI as appropriate
   - Fix failures caused by this work; rerun until clean
   - Report pre-existing failures honestly — do not hide them
3. Run every check that is **possible locally**. If a check needs deploy, credentials, or manual browser steps, say so explicitly.
4. A phase is **not complete** if validation was skipped without a documented reason.

### Step 4: Handoff

Write the handoff report using the template below. The phase ends here.

## Handoff template

```markdown
# Execução: [Roadmap] — Phase [N]

## Resumo
[2–3 sentences: what this phase delivered and current status]

## O que mudou
| Área | Arquivo(s) | Mudança |
| --- | --- | --- |
| ... | `path` | created / modified / removed — one line why |

## Checklist da fase
| Item (What We Ship) | Status | Notas |
| --- | --- | --- |
| ... | done / partial / blocked | |

## Validação
### Comandos executados
- `npm run lint` — passed / failed / skipped (reason)
- `npm run build` — passed / failed / skipped (reason)
- ...

### Checks manuais
- [From Done When — done / not done / blocked + reason]

## Quality gate
[Exact commands run and results — per quality-gate skill]

## Fase concluída?
[Sim / parcial / bloqueada — one-line reason]

## Fora de escopo (não implementado)
[Items deferred to later phases]

## Próximo passo sugerido
[/planejar or /executar for Phase N+1, or fix blockers]
```

## Rules

- **Implement** — this skill is not read-only
- Do not mark roadmap checkboxes in markdown unless the user explicitly asks to update the roadmap
- Do not declare the phase done without validation attempts and a clear change summary
- Respect **Commit Discipline** (≤400 lines per commit outside `src/content/**`); split work if needed when user asks for commits
- If the plan and repo disagree mid-execution, pause, report the conflict, and align before continuing
- Prefer fixing validation failures over handing off broken work

## Project hints (AI-Native Engineers)

- Roadmaps at repo root: `ROADMAP.md` (site), `BLOG-ROADMAP.md` (blog)
- Dev commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run format`
- Blog content: `src/content/blog/` (`.md`); sessions: `src/content/sessions/` (MDX)
- Content Collections: `src/content.config.ts`
- Harness docs in English; user-facing site content may be PT-BR
