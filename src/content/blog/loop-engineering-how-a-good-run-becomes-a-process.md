---
title: 'Loop Engineering: how a good run becomes a process'
slug: 'loop-engineering-how-a-good-run-becomes-a-process'
lang: 'en'
description: 'How to design small cycles of action, verification, and durable state so an agent can make progress without repeated prompting.'
publishedAt: 2026-06-30
draft: false
tags: ['loop engineering', 'coding agents', 'feedback loops']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-loop'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engineering beyond the prompt'
  order: 2
  total: 3
references:
  - 'anthropic-building-effective-agents'
  - 'kimi-ralph-loop'
  - 'aihero-typescript-feedback-loops'
  - 'zcode-goal-mode'
  - 'addy-loop-engineering'
---

The harness from the first article gave our coding agent clear context, safe tools, and real feedback. Its first TypeScript fix was good. The agent selected one error, made a focused change, reran the compiler, and showed the diff.

Tomorrow, the repository still has 47 errors. You start a new session, repeat the instruction, point out the right command, ask for verification, and wait. Then you do it again.

Each run has improved, but the process still depends on a person conducting every round. Loop Engineering picks up from there.

## Design the system that continues

An agent loop is a bounded cycle. It reads a goal and the current state, selects one useful action, uses a tool, observes the result, verifies progress, and decides what to do next.

In compact form:

```text
read goal and state
choose a small task
act
observe evidence
verify
record state
continue, stop, or ask for help
```

Loop Engineering is an emerging label, not a formal industry standard. It describes the work of designing this cycle rather than manually repeating prompts until the output looks complete.

The foundations are old. Engineers have used edit, compile, and test cycles for decades. Test-Driven Development, or TDD, moves through red, green, and refactor. A queue worker reads a job, runs it, then acknowledges or retries. An infrastructure controller compares desired state with observed state and reconciles the difference.

An agent can make probabilistic choices inside the cycle. The surrounding engineering still owns the objective, state, evidence, and limits.

## Give the loop a verifiable goal

"Fix the project" sounds like a goal, but it cannot tell the system when to stop. Which problems are in scope? What changes are allowed? Which evidence counts as success?

Our TypeScript goal can be more operational:

```text
Reduce the errors returned by npm run typecheck.
Handle one error per round.
Do not change public contracts or disable checks.
After every change, run the typecheck and related tests.
Stop when the typecheck exits with zero or when the next fix requires
an architecture decision.
```

Now the loop can compare desired and observed state. The command exit code, error count, tests, and diff provide evidence outside the model's own response.

Current agent products use this distinction. Z.ai's Goal Mode, for example, separates execution into rounds and says that a plan or confident answer does not establish completion. Its verifier looks for changed files, command output, and check results. That is product documentation, not a guarantee that any goal will be solved. The useful mechanism is that execution and verdict are separate steps.

## Keep one round small

Give an agent 47 errors at once and it may try to reorganize the whole project. The diff grows, causes become entangled, and a failure at the end is hard to trace.

A small round reduces that space. The agent picks one error, understands the cause, fixes it, verifies the result, and records the new state. If the error count increases, the recovery point is close. If the fix works, the next round starts from a cleaner base.

This is the logic behind tracer bullets and vertical slices. Instead of constructing every layer before checking the result, make one thin change that crosses the system and produces real feedback. Then expand.

One task does not necessarily mean one file. Fixing a type may require an interface, its implementation, and a test to change together. The boundary should follow a verifiable outcome, not an arbitrary line count.

A good loop task fits within one context window, has a clear pass or fail condition, and leaves the repository usable. If it cannot meet those conditions, the task needs more decomposition.

## Action needs external observation

After editing code, the agent has to inspect something outside its generated answer.

For this project, observation may include fresh compiler output, tests, the diff, and user interface behavior in a browser. AI Hero treats TypeScript checks, tests, hooks, and a visible development server as essential feedback because they let an agent observe whether its change worked.

Feedback speed matters. A check that takes forty minutes makes every round expensive and encourages a large batch of changes before validation. Incremental type checking and focused tests keep action close to consequence.

Signals do not all have to be binary. The error count may fall from 47 to 46. The job is not complete, but the loop has evidence of progress. On the other hand, dropping to 12 by excluding a folder from `tsconfig.json` is false progress. Diff inspection and guardrails have to protect the primary metric.

Software teams already know the danger of one metric. Coverage does not prove test quality. Closed ticket counts do not prove customer value. A loop can only react to what its sensors make visible.

## Do not let the implementer be the only judge

An agent can review its own work, and that first pass is useful. It also carries the same context and assumptions that produced the change.

Use an independent verifier when the risk warrants it. That verifier may be deterministic code such as a compiler. It may be a second agent with a short rubric and access to the diff. It may be a person when product, security, or architecture judgment is required.

Anthropic describes an evaluator-optimizer pattern where one model call generates and another evaluates against explicit criteria. Feedback returns to the generator until the condition is met. The same source recommends adding complexity only when it demonstrates value. Two agents with no criteria are still just two opinions.

For our TypeScript loop, the verifier can ask:

- did the selected error disappear for the right reason?
- did any new error appear?
- were tests or configuration weakened?
- did the diff stay within the expected module?
- did a public interface change?

If the final answer is yes, the loop should escalate rather than invent an architecture decision.

## Put state somewhere durable

A loop that relies on the complete conversation becomes more fragile with every turn. Tool output takes space. Old hypotheses remain nearby. Solved and unsolved work start to blur together.

Store the essential state outside the chat. For this example, a small file could hold:

```json
{
  "goal": "typecheck exits with zero",
  "errorsAtStart": 47,
  "errorsNow": 31,
  "currentError": "TS2322 in src/billing/format.ts",
  "blocked": [],
  "iterations": 16
}
```

Git preserves code checkpoints. The state file preserves the operational view. A short log explains decisions that are not obvious from the diff. A fresh session can rebuild the job from those artifacts and start with a clean context.

The Ralph Loop example in Kimi's Software Development Kit, or SDK, implements a direct version of this cycle. It passes a prompt to an agent, runs an external verification command, and continues when that command fails. It also exposes an iteration limit and recommends small tasks. The example is educational. A production implementation still needs to handle partial failures, concurrency, cost, and recovery.

## A checkpoint is more than a timestamp

Saving progress might mean committing code, updating the state file, recording an event, or preserving a test artifact. The right choice depends on the system.

A checkpoint should answer two questions: what do we know now, and where can we safely resume? The first clean typecheck after fifteen rounds deserves a durable point. A half-finished refactor does not become safe simply because the loop logged it.

Small commits help teams review and reverse changes. A local experiment may only need a preserved diff and snapshot. Either way, recorded activity and recoverable state are different things.

## Every loop needs a brake

Stochastic systems can repeat a bad strategy with cosmetic variations. Without a limit, the agent spends time and money while staying in place.

Define these conditions before the run:

- a maximum number of rounds;
- a time or cost budget;
- a retry limit for the same failure;
- actions that require approval;
- an explicit completion signal;
- the recovery action when a limit is reached.

In our loop, three attempts on the same error can trigger a pause with a diagnosis. A public interface change asks for human judgment. An increased error count reverts the round. A zero typecheck exits.

The brake is the agent equivalent of a timeout, circuit breaker, or dead-letter queue. It keeps a local failure visible and stops it from consuming the whole process.

## Start with a human in the loop

Unattended execution is appealing, but reliable verification has to earn it.

Watch the early rounds. Notice which commands the agent chooses, where it gets confused, how it responds to failed checks, and what it tries to fit inside a supposedly small fix. This human-in-the-loop period produces the failure history you need to improve the harness.

A task can run unattended when risk is low, scope is narrow, reversal is easy, and completion is hard to fake. Fixing one mechanical lint rule on an isolated branch may qualify. Changing authentication, billing, or customer data needs a different evidence and approval model.

The practical question is how much work you can verify cheaply and reliably.

## Where loops fail

A loop can spend hours fixing the test rather than the product. It can learn a poor pattern already present in the repository and repeat that pattern 47 times. It can keep every check green while building architectural debt that only becomes visible months later.

Context degrades too. Large tasks accumulate details, and summaries lose information. A reset with persistent state helps, but a bad state file simply carries the misunderstanding forward.

Some actions should never use naive retries. Sending email, charging a card, or running a destructive migration requires idempotency, approvals, and deduplication keys.

For Quality Assurance, or QA, and product teams, the boundary appears in the definition of done. If the only criterion is "fix the types," the loop may produce compiling software with incorrect behavior. Functional acceptance criteria and business risks need their own gates when they are part of the outcome.

## Build a three-move loop

Choose a reversible task that takes a few minutes, such as one type error, a broken test, or a lint violation.

Define three moves: act, check, and record. Specify which command proves progress, where state will live, and when the agent must stop. Watch the first rounds and record one failure in the cycle itself, not only in the generated code.

Once that loop becomes predictable, you have a reusable unit of work.

Real delivery rarely fits inside one unit. Tasks depend on other tasks. Some checks can run in parallel. Reviewers have different permissions, and failures need to return to the right place. The final article makes that larger flow visible through Graph Engineering.
