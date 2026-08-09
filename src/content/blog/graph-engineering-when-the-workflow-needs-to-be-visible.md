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

Our loop can select a TypeScript error, implement a fix, verify it, and continue. Then the error list gets more complicated. Three errors sit in the data layer, five in the Application Programming Interface, or API, and twelve in the user interface. Some fixes depend on one central type decision. Others can proceed together. A contract change needs approval. When an integration test fails, work should return to the responsible implementation rather than restart from the beginning.

One cycle now hides important questions. What depends on what? Who can decide? Which checks are mandatory? Where should each kind of failure go?

In this article, **Graph Engineering means engineering an execution and orchestration graph**. Knowledge graphs belong to a different topic. Loops remain part of the design: a loop is a small cyclic graph, and the larger graph gives shape to multiple steps, decisions, and loops that have to work together.

Graph Engineering is a recent label with no single settled definition. Its mechanics are established software practice. Flowcharts, state machines, build graphs, Continuous Integration and Continuous Delivery pipelines, or CI/CD, and job orchestrators have made dependencies and control flow explicit for decades.

## Draw the work before distributing it

The TypeScript repair might follow this flow:

```text
triage
  -> diagnosis
  -> contract decision, when needed
  -> central type update
  -> API implementation + interface implementation
  -> tests for each branch
  -> complete typecheck
  -> review
  -> human approval
  -> done
```

If the API typecheck fails, work returns to the API branch. If the interface depends on an unanswered requirement, it waits. If the public contract changes, a person approves the decision before implementation resumes.

This is a directed graph. The boxes are nodes and the arrows are edges. Nodes represent work or decisions. Edges define the allowed routes.

An agent can still investigate and choose a solution inside a node. It simply does not invent the entire delivery process as it goes. The system preserves the gates and paths the team cares about.

## Nodes do work

A node can represent many kinds of execution:

- deterministic code that evaluates an output;
- one model call;
- an agent with its own tools;
- a human approval;
- a complete implementation and verification loop;
- a wait for an external event.

Not every node needs intelligence. The more predictable a step is, the stronger the case for ordinary code. Running `npm run typecheck`, reading the exit code, and selecting the next edge does not require a language model.

Use probabilistic decisions where ambiguity is useful. Diagnosing the cause of an incompatible type may need exploration. Determining whether a command returned zero does not.

Agent systems described by Anthropic and OpenAI use this mix. They include routing, programmed sequences, workers, handoffs, and agents that choose their own tools. Fixed code and model-driven decisions can share one workflow without turning every box into an autonomous agent.

## Edges carry more than sequence

An arrow can say more than "run this after that." It may carry:

- data produced by the previous node;
- a condition, such as test passed or failed;
- a dependency, such as contract approved;
- authority, such as mandatory human review;
- a limit, such as maximum attempts;
- an event, such as a product decision arriving.

The edge after diagnosis can ask whether the fix changes a public contract. If it does not, execution continues. If it does, work moves to a decision node. A governance rule has become visible in both the diagram and the runtime.

Traditional code might express the same rule with an `if`, a state transition, or a pipeline gate. The graph turns the topology of that existing logic into a readable, testable, and observable artifact.

## State is the workflow's memory

Each node needs enough information to do its job. It does not need the entire history.

Shared state might contain the goal, current error, approved decisions, output artifacts, attempt counts, and check results. Each node reads a defined subset and writes an explicit result.

```json
{
  "goal": "typecheck exits with zero",
  "contractDecision": "approved-v2",
  "branches": {
    "api": "tests-passed",
    "ui": "in-progress"
  },
  "typecheck": "waiting",
  "review": "waiting"
}
```

Frameworks such as LangGraph formalize the pattern with state, nodes, and edges. The framework is optional. The underlying idea comes from workflow engines: transitions read and update durable state.

Checkpoints allow recovery after failure. If the API branch has passed its tests, a crashed interface worker should not erase that result. Persistent state also supports an audit trail. You can tell which decision opened which route.

A single global object that every node can rewrite is a common trap. It couples the graph and makes behavior hard to understand. Small contracts and clear ownership between nodes work better than a bag of shared context.

## Parallel work requires independence

Parallel agents are exciting because they suggest speed. The condition comes first: branches must be able to move without fighting over the same state or making the same decision.

Once the central type is approved and updated, the API and interface branches may be independent. Before that point, two agents are likely to create two incompatible versions of the contract.

Fan-out splits work into branches. Fan-in joins the outputs and waits for the required conditions. Our graph opens two implementation branches, tests each one, then runs the complete typecheck only after both have finished.

Mechanical isolation matters too. Separate worktrees or sandboxes prevent file collisions. Explicit ownership defines which modules each worker can change. A shared specification keeps assumptions aligned. At the join, an integration node resolves conflicts and verifies the whole system.

Anthropic presents parallelization as a good fit when subtasks are truly independent or when separate perspectives improve an evaluation. Kimi describes Agent Swarm for broad, parallelizable work, but labels it a research preview and publishes its own vendor results. Those numbers do not show that one hundred agents will help an arbitrary codebase. Tight dependencies can make extra workers produce extra integration work.

## A handoff transfers responsibility

In a handoff, one step or agent gives control to another. A message that says "continue from here" is not enough.

A useful handoff includes:

- the active objective;
- what has already been proven;
- the artifacts that are sources of truth;
- unresolved decisions;
- the actions the next node may take;
- the output that ends its responsibility.

This resembles a contract between teams, an API boundary, or a well-designed queue message. The receiver should not have to reconstruct the intent from a long chat transcript.

Z.ai's subagent documentation and OpenAI's orchestration guides show current products using specialist agents, managers, and handoffs. The category is useful, while the engineering questions remain ordinary distributed-systems questions. Who owns state? What happens after a partial failure? How do we prevent duplicate work?

The manager can also become a bottleneck. If it reads every file, relays every message, and reviews every output, it becomes a costly central point with an overloaded context. Good delegation keeps detailed context near the work and returns compact evidence upward.

## Route failure to the responsible node

A global retry is blunt. If only the interface tests failed, rerunning diagnosis, contract approval, and API implementation wastes work and may introduce new differences.

Graphs support targeted recovery. A test failure goes back to the responsible branch. An integration failure returns to contract reconciliation. A missing requirement goes to a person. A transient infrastructure error retries with a limit.

Production graphs often contain cycles for this reason. A Directed Acyclic Graph, or DAG, never loops back. DAGs fit dependencies that always move forward, including many builds and data pipelines. Agent workflows often need to fix, verify, and return. LangChain makes this point when explaining that real graphs are not always DAGs and that a loop is itself a simple graph.

Each cycle still needs the brakes from Loop Engineering: a budget, attempt cap, checkpoint, and escalation path. Drawing a return edge does not make a retry safe.

## Give the human node real authority

Adding a box labeled "human review" does not establish governance. The reviewer needs enough evidence, enough time, and the authority to block the change.

In our flow, the contract decision happens before the branches because changing it later would multiply rework. Final approval receives the diff, check results, and recorded decisions. The agent can prepare the package. The person accountable for the system owns the verdict.

Addy Osmani uses the term comprehension debt for the gap between the volume of produced code and what people still understand. An efficient graph can grow that debt if humans stop reading decisions and trust green indicators alone.

Checks reduce review cost, but they do not measure every quality. Sustainable architecture, product intent, and the long-term impact of a change can require judgment that no fast test captures.

## Know when one loop is enough

An explicit graph has a cost. State, transitions, persistence, observability, and recovery all become software that someone must maintain.

For a small, reversible, open-ended task, one agent inside a well-instrumented loop may be enough. Investigating an unknown failure requires freedom to follow clues that you cannot draw in advance. Forcing every path before you understand the problem creates a fictional flowchart.

Use a graph when the workflow has stable dependencies, mandatory gates, distinct permissions, real parallelism, or recovery routes that must be audited. Use a loop when the next step depends on discovery and the cost of agent-directed movement is acceptable.

Many systems combine both. A deterministic graph controls triage, approval, and integration. Inside the diagnosis node, an agent loops until it produces a supported hypothesis or reaches its limit.

## Where graphs fail

A polished diagram can hide vague contracts. Two nodes may edit the same file. A join may wait forever for a dead branch. A reviewer may receive a summary that leaves out the central risk.

Parallelism multiplies the contexts people must track. Worktrees solve mechanical collisions, not a person's ability to understand ten changes at once. More agents increase coordination, integration, and review costs.

There is also a temptation to automate the company org chart, along with all of its bottlenecks. Creating a product agent, an architect agent, five implementers, and three reviewers does not guarantee useful separation. It may only produce more model calls and more process theater.

Product and Quality Assurance can make the graph more honest by turning authority and acceptance criteria into concrete transitions. A QA gate should define which evidence it receives and what it may block. A product node should exist because a decision changes the outcome, not because a role exists on the org chart.

## Draw the workflow you actually used

Take a recent delivery and draw what really happened. Include waiting, retries, approvals, and failed checks. Mark the decisions that stayed hidden in chat and the places where two people worked from different assumptions.

Turn only those points into explicit nodes and edges. Remove any node that does not answer an observed dependency, risk, or ambiguity.

That is the thread through this series. The harness prepares the environment. The loop turns action into repeatable progress. The graph connects loops, tools, and people without hiding who decides.

The labels are changing quickly. The responsibility to design a legible, verifiable, and recoverable system is still software engineering.
