---
title: 'Graph Engineering: when the workflow needs to be visible'
slug: 'graph-engineering-when-the-workflow-needs-to-be-visible'
lang: 'en'
description: 'How to make dependencies, state, recovery, and human decisions explicit when one agent loop no longer represents the work.'
publishedAt: 2026-07-31
draft: false
tags: ['graph engineering', 'orchestration', 'multi-agent systems']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-graph'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engineering beyond the prompt'
  order: 3
  total: 3
references:
  - 'anthropic-building-effective-agents'
  - 'openai-agent-orchestration'
  - 'zcode-subagents'
  - 'kimi-agent-swarm'
  - 'addy-software-factories'
  - 'langchain-graph-engineering'
  - 'langgraph-graph-api'
---

Our loop can select a TypeScript error, fix it, verify it, and continue. Then three errors appear in the data layer, five in the Application Programming Interface, or API, and twelve in the user interface. Some fixes depend on one central type decision. Others can move together. A contract change needs approval.

One cycle now hides important questions. What depends on what? Who can decide? Where should each failure return?

In this article, **Graph Engineering means engineering the execution and orchestration graph**. Knowledge graphs are a different topic. Loops still belong in the design. A loop is a small cyclic graph, while the larger graph connects steps, decisions, and loops.

The name is recent and does not have one accepted definition. The mechanics are old. Flowcharts, state machines, build graphs, and Continuous Integration and Continuous Delivery, or CI/CD, pipelines have made flow and dependencies explicit for decades.

## Draw the work before distributing it

Imagine this workflow:

```text
triage -> diagnosis -> contract decision, when needed
       -> central type update
       -> API implementation + user interface implementation
       -> tests for both branches -> typecheck -> review
       -> human approval -> done
```

If the API tests fail, work returns to the API branch. If the interface is waiting on a decision, it does not start. If the public contract changes, a person approves before implementation.

This is a directed graph. Boxes are nodes, arrows are edges, and each route represents an allowed transition.

The agent can still investigate freely inside a node. The system simply preserves the gates and routes that should not be invented halfway through execution.

## Nodes do work. Edges define the route

A node can be ordinary code, a model call, an agent with tools, a human approval, a whole loop, or a wait for an external event.

Not every node needs intelligence. The more predictable a step is, the more sense it makes to use deterministic code. Running `npm run typecheck`, reading the exit code, and selecting the next path does not need a language model. Diagnosing a type mismatch might.

Systems described by Anthropic and OpenAI mix these pieces: routers, programmed sequences, workers, handoffs, and tool-using agents.

Edges carry more than order. They can transport data, conditions, dependencies, limits, and authority. Between diagnosis and implementation, a condition asks whether the fix changes a public contract. If it does, the route passes through approval. Otherwise, it continues.

In traditional code, that could be an `if`, a state-machine transition, or a pipeline rule. The graph makes the same logic visible, testable, and observable.

## State is the workflow's memory

Each node should receive only what it needs to fulfill its responsibility. Shared state can hold the goal, decisions, artifacts, attempts, and check results:

```json
{
  "goal": "typecheck exits with zero",
  "contractDecision": "approved-v2",
  "branches": {
    "api": "tests-passed",
    "ui": "in-progress"
  },
  "review": "waiting"
}
```

Frameworks such as LangGraph formalize this with state, nodes, and edges. The tool may change. The principle is the same as a workflow engine: transitions read and update durable state.

Checkpoints allow recovery after failure. If the API branch passed, a crash in the interface worker should not erase that result. Persistent state also supports audits because it shows which decision opened each route.

The danger is turning state into one global bag that everyone changes. Small contracts and clear ownership between nodes work better.

## Parallel work requires independence

Parallel agents promise speed, but branches must be able to move without fighting over the same state or making the same decision.

Once the central type is approved, the API and interface might proceed together. Before that, two agents would just create two incompatible readings of the contract.

A fan-out opens the branches. A fan-in waits and combines their results. Separate worktrees or sandboxes prevent file collisions. Explicit ownership says who may change each module. At the join, an integration step checks the whole system.

Anthropic recommends parallelization when subtasks are truly independent or when separate perspectives improve evaluation. Kimi presents its Agent Swarm for broad, parallel work, but it is still a research preview and the performance numbers come from the vendor. That does not prove that many agents help every project. In tightly coupled code, they may simply multiply integration work.

## A handoff transfers responsibility

A handoff is more than a message saying “continue from here.” It should include:

- the goal that remains active;
- what has already been proven;
- which artifacts are the source of truth;
- which decisions are blocked;
- what the next node may do;
- which output ends its responsibility.

This resembles a handoff between teams or a well-designed queue message. The receiver should not reconstruct the intent from a huge chat log.

Z.ai's subagents and OpenAI's orchestration guides use managers and handoffs. The usual distributed-system questions still apply: who owns state, what happens after partial failure, and how do we prevent duplicate work?

The manager can also become a bottleneck. If it reads every file and reviews every result, it holds too much context. Healthy delegation returns compact evidence and keeps responsibility close to the work.

## Route failure to the responsible node

If only the interface tests fail, repeating diagnosis, contract approval, and API implementation wastes work. A graph allows targeted recovery. A test failure returns to its branch. An integration failure returns to reconciliation. A missing requirement calls a person. A temporary infrastructure error retries with a limit.

That is why production graphs often contain cycles. A Directed Acyclic Graph, or DAG, works when dependencies only move forward. Agent workflows often need to correct and return. LangChain points out that loops are simply one form of graph.

Every return still needs the previous article's brakes: budget, maximum attempts, checkpoint, and escalation. Drawing an arrow back does not make repetition safe.

## Give human nodes real authority

A “human review” box does not solve governance. The person needs evidence, time to judge, and the authority to block.

In our workflow, the contract decision happens before the branches because changing it later would multiply rework. Final approval receives the diff, check results, and recorded decisions. The agent prepares the evidence. The verdict belongs to the person accountable for the system.

Addy Osmani calls the gap between code produced and code people still understand comprehension debt. An efficient graph can increase that debt when people stop reading decisions and trust green lights alone.

There is no need to graph everything. Open-ended investigation may work better as one well-instrumented loop. Use a graph when you have stable dependencies, mandatory gates, different permissions, real parallelism, or recovery paths that need an audit trail. Many systems combine both: the graph controls triage and approval, while an agent explores in a loop inside diagnosis.

Graphs fail when contracts are vague, two nodes fight over the same files, a join waits forever, or a summary hides the main risk. More agents also mean more contexts to review. Worktrees prevent collisions, but they do not increase a person's ability to understand ten changes at once.

To start, draw one recent delivery as it really happened. Include returns, waits, approvals, and failed checks. Turn into explicit nodes and edges only the points tied to a real dependency, risk, or decision.

That is the thread running through this series. The harness prepares the environment. The loop turns action into repeatable progress. The graph connects loops, tools, and people without hiding who decides.

The technology looks new. The responsibility to build legible, verifiable, and recoverable systems is still software engineering.
