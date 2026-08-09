---
title: 'Harness Engineering: the system around the model'
slug: 'harness-engineering-the-system-around-the-model'
lang: 'en'
description: 'How to give a coding agent the context, tools, limits, and feedback it needs to work inside a real repository.'
publishedAt: 2026-05-31
draft: false
tags: ['harness engineering', 'coding agents', 'software quality']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-harness'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engineering beyond the prompt'
  order: 1
  total: 3
references:
  - 'anthropic-effective-harnesses'
  - 'openai-harness-engineering'
  - 'aihero-agent-friendly-codebases'
  - 'addy-agent-harness-engineering'
---

You give a coding agent a small job: fix the TypeScript errors in this repository. Soon it says the work is complete. The compiler still fails, a test has been commented out, and three unrelated files changed.

It is easy to blame the model. But the agent did not know which command defined success, which files were off limits, or when to stop and ask for help. It could edit code, but it did not have a dependable place to work.

That environment is what Harness Engineering is about.

## An agent is a model plus a harness

A language model produces responses. An agent observes an environment, chooses tools, takes actions, and uses the result to decide what comes next.

That requires a layer around the model. It provides context, exposes tools, controls permissions, records state, and returns signals about the quality of the work. We call that layer the **harness**.

> agent = model + harness

The model is the decision engine. The harness makes that engine useful in real work. It includes repository instructions, the filesystem, Git, tests, sandboxes, approvals, logs, and recovery paths.

If you have configured a runtime, a Continuous Integration, or CI, pipeline and an incident runbook, this should feel familiar. Long before Artificial Intelligence, or AI, we designed the environment where software could run and be checked. Now we also design the environment where an agent works.

## Your repository does not fit in a prompt

You know the project uses `npm`, generated files should not be edited, and the domain layer cannot import user interface components. A fresh agent session knows none of that.

Think of a new engineer who also loses yesterday's memory. They need a short map and a way to find details when they matter. Loading the whole repository into context mostly creates noise.

OpenAI described a similar problem when a monolithic `AGENTS.md` became too large to maintain. The team turned the entry file into a map to more specific sources. Orientation comes first, detail comes later. It is navigable documentation for a reader without memory.

Our first layer might say:

```text
Use Node 22.
Do not edit generated files.
Before finishing, run npm run lint and npm run build.
Read docs/architecture.md before changing dependencies between layers.
```

The architecture document stays separate. The short instruction only says when to open it. This gradual access to context is usually more useful than loading a giant manual for every task.

## Guides shape action. Sensors report the result

One practical way to organize a harness is to separate **guides** from **sensors**.

Guides act before the change. A specification defines the result, an instruction file explains conventions, and a rule says that production changes require approval.

Sensors observe what happened. The compiler finds type mismatches, tests check behavior, the diff shows the actual changes, and logs expose problems that code reading missed.

Traditional engineering already has both. A guide looks like an interface contract or runbook. A sensor looks like an assertion, metric, or alarm.

The instruction “do not break types” is weak on its own. The model may honestly believe it complied. The command `tsc --noEmit` returns an external signal. The rule explains the intent, and the compiler checks the result.

## Tools, code, and permissions form the interface

Terminal access is not enough. The agent needs to understand which tool to use, where to run it, and how to read its output. Clear names, explicit parameters, and useful errors matter just as much here as they do in an Application Programming Interface, or API, built for people.

The codebase is part of that interface too. Predictable folders, clear module boundaries, well-named types, and tests near the behavior help both a new teammate and an agent. AI Hero uses that exact framing: every session arrives without memory. Encapsulation, cohesion, and good test seams still matter. They now help agent navigation as well.

For our TypeScript task, the agent should be able to:

1. find the official verification command;
2. select one small error;
3. read only the related modules;
4. implement the fix;
5. rerun the compiler and relevant tests;
6. inspect the diff before claiming completion.

Permissions belong in this design. The agent needs to edit the repository and run known commands. It does not need production credentials. If the fix changes a public contract, the harness should stop and involve someone with the authority to decide.

This is the old principle of least privilege. Sandboxes, allowlisted commands, and approvals reduce the impact of a wrong decision without freezing all useful work.

## Turn “done” into evidence

Agents write convincing success reports. That does not mean the software works.

Anthropic observed long-running agents stopping early after seeing enough finished code. It also found changes that had only been tested partially. Completion needs to connect to concrete signals.

For our task:

- the type command exits with zero;
- the related tests pass;
- the diff contains no out-of-scope files;
- no test was removed or weakened;
- the agent records anything it could not verify.

Self-review helps, but it keeps many of the implementation's assumptions. Compilers, tests, and independent reviewers provide another source of truth.

For product and Quality Assurance, or QA, this starts with acceptance criteria. “The screen works” says very little. “When an invalid email is submitted, the API returns 422 and the form keeps its data” gives us a contract that can be implemented and checked.

## Keep state and recovery outside the conversation

Work that lasts longer than one context window must survive across sessions. Chat history is not a reliable database.

Git records the code. A plan keeps decisions and next steps. A short progress log explains what was tried. Acceptance criteria keep the definition of done available. A fresh session can resume without reconstructing everything from guesses.

In one long-running agent experiment, Anthropic combined Git history, a structured feature list, and a progress file. Each session handled a small part and prepared a clean handoff. That is one solution for one setting, not a universal recipe, but the mechanism is old: a shift handoff with persistent state.

Recovery belongs here too. If an attempt makes the repository worse, the agent should recognize the last valid state and return to it safely.

## Let failures teach the harness

Do not begin with fifteen rule files and twenty integrations. A useful harness grows from observed failures.

If the agent edited a generated file, add a short guide and, when possible, a mechanical check. If it commented out a test to pass the pipeline, block that pattern. If it always gets lost in one module, improve the map or the code boundary itself.

Addy Osmani describes this as a ratchet: a real mistake becomes a lasting improvement to the environment. The goal is to avoid repeating failures your repository already knows, not to predict every possible failure.

Harnesses still have limits. A green build can hide the wrong product. Documentation ages. Bad checks automate bad definitions of success. Too many rules create contradictions, while too few leave everything to chance.

To start, pick one failure that has already happened. Write a two-line guide and add one sensor, such as a typecheck, test, or diff inspection. Give the agent a small task and watch whether it can use both without help.

If it works, you have turned good advice into a reusable property of the environment.

In the next article, we will put this harness in motion and turn one good run into a process that knows how to continue, record progress, and stop.
