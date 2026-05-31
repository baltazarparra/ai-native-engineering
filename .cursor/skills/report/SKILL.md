---
name: report
description: >-
  Produces a structured implementation report after coding work. Use when the
  user invokes /report or asks for an end-of-implementation summary, handoff
  document, or what-changed recap.
disable-model-invocation: true
---

# Report

Generate a **structured implementation report** for the work done in the current conversation (or the slice the user points to). This is a **handoff and audit** artifact, not a plan for future work unless the user asks for that separately.

## When to use

- User invokes **`/report`**
- User asks for a final report, implementation summary, handoff, or "o que foi feito"

## Core rules

1. **Facts over hype** — Only claim what was actually done, verified, or explicitly discussed.
2. **Ground in evidence** — Prefer `git status`, `git diff`, file reads, and command output over memory.
3. **No plan file edits** — Do not modify attached plan files unless the user explicitly asks.
4. **Language** — Write the report in the same language the user used in the triggering message (default PT-BR if unclear).
5. **Harness paths in English** — File paths and command names stay as in the repo; section titles may follow the report language.

## Workflow

### Step 1: Establish scope

Determine what the report covers:

- **Default:** all implementation work in the current conversation thread.
- **If ambiguous:** ask one short question (e.g. "Reportar só o blog MDX ou a sessão inteira?").

### Step 2: Collect evidence

Run readonly checks when possible (do not commit unless asked):

```bash
git status
git diff
git log -5 --oneline
```

Also use conversation context: stated goals, plan phases completed, errors fixed, commands run.

If git is unavailable, list files from tool reads and state that git was not used.

### Step 3: Verify quality gate (when applicable)

If the work was technical, run or cite the project's quality checks (`pnpm run lint`, `pnpm run build`, tests, etc.) per `AGENTS.md` / `package.json`. Record **pass / fail / not run** with reason.

### Step 4: Write the report file

Save under:

```text
docs/reports/YYYY-MM-DD-<short-slug>.md
```

- **`short-slug`:** lowercase, hyphens, 2–5 words (e.g. `blog-local-mdx`).
- Create `docs/reports/` if missing.
- If a file with the same name exists, append `-2`, `-3`, etc.

### Step 5: Reply in chat

Post a short message with:

- Path to the saved report
- 3–5 bullet executive summary
- Any blockers or follow-ups

Do **not** paste the full report in chat unless the user asks.

## Report template

Use **only** these sections, in order:

```markdown
# Implementation Report: [Title]

**Date:** YYYY-MM-DD  
**Scope:** [One sentence — what this report covers]

## Executive summary

[2–4 sentences: outcome, main value, current state]

## Objective

[What we set out to do — from plan or user request]

## What was implemented

- [Concrete deliverable 1]
- [Concrete deliverable 2]

## Files and areas touched

| Area | Paths or components |
| ---- | ------------------- |
| … | … |

## Technical decisions

- **[Decision]:** [Why, trade-off in one line]

## Validation

| Check | Result | Notes |
| ----- | ------ | ----- |
| lint | pass / fail / skipped | |
| build | pass / fail / skipped | |
| manual / other | … | |

## Out of scope / not done

- [Item explicitly deferred or out of plan]

## Follow-ups

- [ ] [Actionable next step, if any]

## Risks and notes

- [Regressions, migrations, secrets, deploy caveats — or "None identified"]
```

Keep bullets concrete. Link paths as repo-relative markdown links when helpful.

## Anti-patterns

- Inventing features or tests that were not run
- Vague "improved codebase" without file or behavior detail
- Replacing the report with a new implementation plan
- Editing `docs/reports/` history or deleting prior reports without user request
- Dumping entire diffs into the report (summarize; link paths instead)

## Example trigger

**User:** `/report`

**Agent:** Runs git diff, confirms `pnpm run build` passed, writes `docs/reports/2026-05-29-blog-local-mdx.md`, replies with summary bullets and file path.
