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

In the previous article, we prepared an agent to fix TypeScript errors with context, tools, limits, and feedback. The run went well. It selected one error, made a small change, reran the compiler, and showed the diff.

The next day, the repository has another 47 errors. You open the agent, repeat the instruction, point out the right command, and wait. Then you do it again.

The harness improved each run, but the process still depends on you conducting every round. Loop Engineering starts there.

## The loop is the system that continues

An agent loop is a bounded cycle. It reads the goal and current state, chooses an action, observes the result, checks progress, and decides what comes next.

```text
read goal and state
choose one small task
act
observe and verify
record state
continue, stop, or ask for help
```

Loop Engineering is still a recent term, not a formal industry standard. It names the work of designing this cycle instead of repeating prompts until something looks finished.

The foundation is familiar. Developers have edited, compiled, and tested for decades. Test-Driven Development, or TDD, follows red, green, and refactor. Queue workers read a message, execute, and acknowledge or retry. With agents, some actions are probabilistic, but goals, signals, state, and limits remain engineering problems.

## Start with a verifiable goal

“Fix the project” does not say when the work is done. Which project? What changes are acceptable? What proves completion?

Our goal can be more operational:

```text
Reduce the errors returned by npm run typecheck.
Handle one error per round.
Do not change public contracts or disable checks.
After each change, run the typecheck and relevant tests.
Stop when the command exits with zero or when the next fix
requires an architecture decision.
```

Now the loop can compare the desired state with external signals: exit code, error count, tests, and diff.

Z.ai's Goal Mode uses a similar idea by splitting execution into rounds and requiring changes and check results as evidence of completion. This is a product description, not a promise that every goal will succeed. The useful pattern is the separation between doing and judging.

## Keep each round small

Faced with 47 errors, an agent may try to reorganize the whole project. The diff grows, causes mix together, and failures become hard to trace.

A small round narrows that space. The agent picks an error, understands the cause, fixes it, verifies it, and records the result. If the change makes things worse, the return point is close. If it works, the next round starts from a cleaner state.

This is the same idea behind tracer bullets and vertical slices: send one small change through the system, get real feedback, then expand.

“One task” does not always mean “one file.” Fixing a type may touch an interface, an implementation, and a test. The unit should fit in one context window, have a pass-or-fail condition, and leave the repository usable.

## Action needs independent observation

After editing, the agent needs to inspect something outside its own response. That might be compiler output, tests, the diff, or browser behavior. AI Hero calls typechecks, tests, and hooks essential feedback loops because they keep action close to consequence.

Fast checks encourage small rounds. If verification takes forty minutes, the loop is likely to stack several changes before it learns anything.

Signals do not have to be binary. Moving from 47 errors to 46 shows progress. Dropping to 12 because a folder disappeared from the configuration shows a misleading metric. That is why diff inspection and guardrails sit next to the main count.

Whenever possible, the implementer should not be the only source of approval. The verifier can be deterministic code, another agent with a short rubric, or a person when the decision involves product, security, or architecture.

Anthropic describes an evaluator-optimizer pattern where one step produces and another judges against clear criteria. For our task, the evaluation asks:

- did the selected error disappear for the right reason?
- did any new error appear?
- were tests or configuration weakened?
- did the diff stay inside the expected module?
- did the public interface change?

If the last answer is yes, the loop escalates instead of improvising.

## Make state and checkpoints durable

A loop that depends on the entire conversation becomes more fragile with every round. Tool output takes space, and old hypotheses get mixed with open work.

Keep the essential state outside chat:

```json
{
  "goal": "typecheck exits with zero",
  "errorsAtStart": 47,
  "errorsNow": 31,
  "currentError": "TS2322 in src/billing/format.ts",
  "iterations": 16
}
```

Git keeps code checkpoints. A state file holds the operational view. A short log explains decisions that the diff cannot. A new session can resume with a clean context.

The Ralph Loop in Kimi's Software Development Kit, or SDK, shows a teaching version of this pattern. The agent runs a task, an external command verifies it, and the loop continues when verification fails. The example limits iterations and recommends small tasks. Production code still needs to handle concurrency, cost, and recovery.

A checkpoint is more than a timestamp. It should tell us what we know and where it is safe to resume. A commit with passing tests may be a good checkpoint. Half of an unfinished refactor is not.

## Every loop needs a brake

A probabilistic system can repeat one bad strategy with superficial variations. Decide up front:

- the maximum number of rounds;
- a time or cost budget;
- tolerated attempts on the same error;
- actions that require approval;
- an explicit completion signal;
- recovery when the limit is reached.

In our loop, three attempts without progress produce a paused diagnosis. A public contract change calls a person. A higher error count reverts the round. A zero-error typecheck finishes the job.

This brake resembles a timeout, circuit breaker, or dead-letter queue in distributed systems. It stops one local failure from consuming the entire process.

## Start with a person watching

Unattended execution is earned through good verification. At first, watch the rounds. Notice where the agent gets confused, how it responds to failure, and which shortcuts it tries. This human-in-the-loop mode provides the history you need to improve the harness.

A task can run alone when risk is low, scope is narrow, rollback is easy, and the definition of done is hard to fake. Fixing mechanical lint on an isolated branch might qualify. Changing authentication, billing, or customer data requires different authority.

Loops also fail. They may fix the test instead of the product, repeat a bad repository pattern, or keep checks green while increasing architecture debt. Actions such as sending email, charging a card, or running a destructive migration cannot use naive retries. Idempotency, deduplication, and approval still matter.

To try the idea, choose a reversible task that takes a few minutes. Define three moves: act, check, and record. Name the command that proves progress, where state lives, and when to stop. Watch the first rounds and note one flaw in the cycle, not just in the code.

Once the loop becomes predictable, you have a reusable unit of work. In the next article, we will connect several units, dependencies, and decisions with Graph Engineering.
