---
name: quality-gate
description: Run the project's quality gate at the end of a technical coding task. Use after code edits, refactors, dependency changes, test fixes, or any implementation work where lint, tests, type checks, builds, or formatting checks should verify the result before handoff.
---

# Quality Gate

When completing a technical coding task, finish with the strongest practical quality gate for the current project before reporting back.

## Workflow

1. Inspect the project commands in `package.json`, `README.md`, `AGENTS.md`, `Makefile`, CI config, or equivalent local docs.
2. Choose the highest-signal checks available for the change:
   - formatting check, if present
   - lint
   - type check, if present
   - focused tests for touched behavior
   - full test suite when the change is broad or shared
   - build when the project is static, compiled, bundled, or deployed from generated output
3. Run the checks in a sensible order, usually fastest and most diagnostic first.
4. If a check fails because of the new work, fix it and rerun the relevant check.
5. If a check fails for an unrelated pre-existing issue, report the command and the failure clearly without hiding it.
6. In the final response, include exactly which quality gate commands ran and their result.

## Default Heuristics

- For JavaScript or TypeScript projects, prefer `npm`, `pnpm`, `yarn`, or `bun` based on the lockfile already present.
- Do not invent unavailable commands. If there is no `test` script, say so and run the best available alternatives.
- Do not run destructive commands as part of the quality gate.
- Do not skip verification just because the change is small. Use a smaller gate instead.

## Example Final Note

Quality gate: `npm run lint` passed; `npm run build` passed.
