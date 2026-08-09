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

You give a coding agent what sounds like a small job: fix the TypeScript errors in this repository. A few minutes later, it says the work is complete. The compiler still fails, a test has been commented out, and three unrelated files changed along the way.

Blaming the model is an understandable first reaction. Sometimes the model is the problem. Often, the environment around it is underspecified.

The agent did not know which command defined success, which files were off limits, where architecture decisions lived, or when to stop and ask for help. It could edit code, but it did not have a dependable place to work.

That surrounding system is the subject of Harness Engineering.

## An agent is a model plus a harness

A language model produces a response. An agent can observe an environment, choose tools, take action, and use the result to decide what happens next.

Something has to connect the model to that work. It provides context, exposes tools, controls permissions, stores state, and sends quality signals back into the run. We call that layer the **harness**.

The short version is:

> agent = model + harness

The model supplies decision-making capability. The harness turns that capability into a working system.

Repository instructions are part of it, but they are not the whole thing. The filesystem, Git, test commands, sandboxes, approval rules, logs, progress artifacts, and recovery paths all belong here too.

This should feel familiar. Long before coding agents, engineers designed runtimes, Continuous Integration pipelines, test harnesses, permissions, and incident runbooks. We made the environment around software observable and safe enough to operate. Now we also design the environment in which an agent changes that software.

## Your repository is not inside the prompt

Return to the TypeScript task. You know the project uses `npm`, the official check is `npm run lint`, generated files should not be edited, and the domain layer cannot import user interface components. That knowledge feels obvious because you have been carrying it around.

A new agent session has none of it.

Treat the session like a teammate arriving with no memory of yesterday. They need a short map, legible interfaces, and a clear way to find details when those details become relevant. Loading the entire repository into context is not the answer. Excess context competes with the current task and makes important constraints easier to miss.

OpenAI described running into this problem with a large, monolithic `AGENTS.md`. It became hard to maintain, hard to verify, and too crowded to guide the agent reliably. Their team moved toward a small entry point that linked to focused sources of truth.

That pattern is progressive disclosure. Give every run the small set of rules that always matters. Reveal deeper documents, skills, and tools when the task calls for them.

Our first layer might say:

```text
Use Node 22.
Do not edit generated files.
Before finishing, run npm run lint and npm run build.
Read docs/architecture.md before changing layer dependencies.
```

The architecture document remains separate. The entry point explains when to read it.

## Guides shape action. Sensors report reality

A useful way to reason about the harness is to split **guides** from **sensors**.

Guides act before the change. A specification defines the outcome. A repository instruction explains conventions. A tool description documents valid arguments. A permission rule says production data requires human approval.

Sensors act after or during the change. The compiler catches type mismatches. Tests observe behavior. The linter spots local policy violations. The diff shows what actually changed. Logs and browser automation expose problems that are invisible in the source alone.

Traditional software has both. A guide resembles an interface contract or a runbook. A sensor resembles an assertion, a metric, or an alarm. The harness connects those pieces to the agent's work.

An instruction such as "do not break types" is weak on its own. The model can misunderstand it or believe it complied. `tsc --noEmit` returns an external signal. Together they work better: the rule explains the intent, while the compiler measures the result.

## Tools are interfaces for a new kind of user

Terminal access is useful, but access alone does not make a tool legible. The agent still needs to know what to call, where to run it, which arguments are safe, and what the output means.

Good tool interfaces have clear names, narrow parameters, concise descriptions, and actionable errors. This is ordinary Application Programming Interface, or API, design. If two tools appear to do the same job, an agent will hesitate for the same reason a human engineer would.

The repository itself is also an interface. Predictable folders, clear module boundaries, precise types, and nearby tests make it easier to navigate. AI Hero frames each new agent as a new starter with no memory. Its practical recommendation comes from familiar software design: simple public interfaces and strong test seams reduce the amount of internal detail anyone needs to hold at once.

For the TypeScript task, the harness should let the agent:

1. find the official verification command;
2. run it and preserve the complete output;
3. choose one small, traceable error;
4. inspect only the modules involved;
5. apply a focused change;
6. rerun the compiler and relevant tests;
7. inspect the diff before claiming completion.

The model still has to diagnose and implement the fix. The harness makes the attempt observable.

## Permissions belong in the design

An agent with unrestricted access can delete files, install dependencies, contact external services, or alter data outside the task. Instead of disabling every capability, align access with risk.

A sandbox gives generated code an isolated place to run. Command allowlists narrow the blast radius. Human approvals protect irreversible actions such as publishing a release, changing production, or sending a customer message.

These are established operating system and delivery practices. The principle of least privilege still applies: a process receives only the access required for its job.

Fixing local type errors probably requires repository read and write access plus a small set of development commands. It does not require production credentials. If a proposed fix changes a public contract, the harness should stop and take that decision to someone with the authority to make it.

Greater autonomy moves human judgment to explicit points in the process.

## "Done" is still a claim

Agents are good at producing convincing language, including convincing completion reports.

A polished sentence is not evidence that the software works. Anthropic reported long-running agents that stopped early after seeing substantial progress and assuming the larger job was complete. The same work found cases where an agent ran partial checks without proving behavior end to end.

The harness has to turn completion into observable evidence. For this task, that might mean:

- the type command exited with zero;
- related tests passed;
- the diff contains no out-of-scope files;
- no test or check was removed, skipped, or weakened;
- the agent recorded what changed and what it could not verify.

Each check answers a concrete failure mode. It should be there for a reason.

Self-review can help, but it is not fully independent. The implementing agent carries the same assumptions that shaped the change. A compiler, a deterministic test, or a separate reviewer provides a different source of signal.

## Keep state outside the conversation

Work that spans more than one context window needs to survive multiple sessions. Chat history is a poor system of record.

Git preserves code state. A plan preserves decisions and next steps. A short progress log explains what was attempted. Acceptance criteria keep the definition of completion available. A fresh session can rebuild the state of work from those artifacts instead of guessing.

In one long-running agent experiment, Anthropic used Git history, a structured feature list, and a progress file. Each session handled an incremental piece and left a clean environment for the next one. The authors present it as one solution for that experiment, not a universal recipe. The underlying practice is recognizable: durable state makes a handoff possible.

Recovery is part of the same design. When a change makes the repository worse, the agent needs to identify the last valid state, understand the failure, and return safely. Reversibility belongs in an agent harness for the same reason it belongs in a delivery pipeline.

## Let real failures shape the harness

It is easy to read a checklist like this and create fifteen instruction files, twenty skills, and a pile of connectors before the first task. That replaces missing context with configuration noise.

A useful harness grows from observed failure. If the agent edits a generated file, add a short guide and a mechanical check where possible. If it disables a test to get a green build, block that pattern. If it repeatedly gets lost in one module, improve the repository map or the module boundary itself.

Addy Osmani describes this as a ratchet: a real mistake becomes a durable improvement to the environment. The goal is to stop paying for the same known failure without trying to anticipate every imaginable mistake.

That keeps you away from two bad extremes. An empty harness relies on luck. A harness copied wholesale from another codebase carries stale instructions, contradictions, and tools your team never needed.

## Where the harness fails

A green build can hide the wrong product. Weak tests only automate a weak definition of success. Permissions can be so narrow that useful work stops, or so broad that a bad decision becomes expensive.

Documentation decays. Logs become noisy. An agent may optimize for the check while degrading a quality the check does not measure. Harness Engineering cannot remove the need to understand the product and review costly decisions.

For product managers and Quality Assurance, or QA, the consequence is practical. Acceptance criteria should appear before implementation and become observable signals. "The form works" gives the agent little to verify. "When an invalid email is submitted, the API returns 422 and the interface preserves the form data" defines behavior that engineering can build and QA can test.

The harness helps you spend supervision where it matters most.

## Try one guide and one sensor

Pick a failure that has already happened in your repository. Just one.

Write two or three lines describing the expected behavior. Then add a sensor that produces evidence, such as a typecheck, a test, a lint rule, or a diff inspection. Give the agent a small task and watch whether it can use both without extra prompting.

If the result holds up, you have added a reusable property to the working environment.

The next article puts that environment in motion. We will move from one well-supported run to a repeatable cycle that knows how to act, record progress, stop, and ask for help.
