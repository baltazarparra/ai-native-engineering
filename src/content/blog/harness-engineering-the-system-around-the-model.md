---
title: 'Harness Engineering: the system around the model'
slug: 'harness-engineering-the-system-around-the-model'
lang: 'en'
description: 'How to prepare context, tools, limits, and feedback so a coding agent can work well inside a real repository.'
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

You start a prompt in your repo and ask for something simple: fix the TypeScript errors. Soon it says the work is done. The compiler still fails, a test has been commented out, and three unrelated files changed.

It is easy to blame the model. But it also did not know which command defined success, which files were off limits, or when to stop and ask for help. The agent was given the ability to edit code, but not the context and limits to work with—looking at the case above.

To solve this, there is a layer around the model. It provides context, exposes tools, controls permissions, records state, and returns signals about the quality of the work. We call that layer the **harness**.

> agent = model + harness

The model is the decision engine. The harness makes that engine useful in real work. It includes repository instructions, the filesystem, Git, tests, sandboxes, approvals, logs, and recovery paths.

If you have configured a Continuous Integration, or CI, pipeline or an incident runbook, the idea should feel familiar. Before Artificial Intelligence, we already designed the environment where software would run and be verified.

## Your repository does not fit in a prompt

You know the project uses `npm`, generated files should not be edited, and the domain layer cannot import user interface components. For a fresh agent session, none of that is obvious.

Think of an engineer who just joined the team. They need a short map and a way to find details when necessary.

In our example, the entry point might say:

```text
Use Node 22.
Do not edit generated files.
Before finishing, run npm run lint and npm run build.
Read docs/architecture.md before changing dependencies between layers.
```

The architecture document stays separate. The short instruction only says when to open it. This gradual access to context is usually more useful than loading a giant manual for every task.

## Tools, code, and permissions

Giving access to a terminal is not enough. The agent needs to understand which tool to use, in which directory, and how to read its output. Clear names, explicit parameters, and useful errors matter just as much here as they do in an Application Programming Interface, or API, built for people.

The codebase is part of that interface too. Predictable folders, clear module boundaries, well-named types, and tests near the behavior help both a new teammate and an agent. Every session arrives at the repository without memory. Encapsulation, cohesion, and good test seams still matter—and they are more important than ever now as navigation aids.

Continuing the example, to fix the TypeScript errors, the agent should be able to:

1. find the official verification command;
2. select one small error;
3. read only the related modules;
4. apply the fix;
5. rerun the compiler and tests;
6. inspect the diff before finishing.

For this task, the agent needs to edit the repository and run known commands. Permissions belong in the design too, and the old principle of least privilege applies here. Sandboxes, allowlisted commands, and approvals reduce the impact of a wrong decision without freezing all useful work.

## Turn “done” into evidence

Agents write convincing success reports. That does not prove the software works.

In our case:

- the related tests pass;
- the diff contains no out-of-scope files;
- no test was removed or weakened;
- the agent records anything it could not verify.

For product and Quality Assurance, or QA, this starts with acceptance criteria. Verification instructions like “the screen works” are too abstract. We need clear definitions, such as: “When an invalid email is submitted, the API returns 422 and the form keeps its data.”

## Let failures teach the harness

Do not begin with fifteen rule files and twenty integrations. A useful harness grows from observed failures.

If the agent made a serious mistake, add a short guide and, when possible, a mechanical check. If it commented out a test to pass the pipeline, block that pattern. If it always gets lost in one module, improve the map or the code boundary itself.

A real failure becomes a lasting improvement to the environment. The goal is to avoid repeating failures your repository already knows, without trying to predict every imaginable error.

Harnesses still have limits. A green build can hide the wrong product. Documentation ages. Bad checks automate bad definitions of success. Too many rules create contradictions, while too few leave everything to chance.

To start, pick one failure that has already happened. Write a two-line guide and add one sensor, such as a typecheck, test, or diff inspection. Give the agent a small task and watch whether it can use both without help.

If it works, you have turned good guidance into a reusable property of the environment.
