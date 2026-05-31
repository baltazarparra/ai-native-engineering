---
name: planning
description: Breaks Markdown roadmaps into coherent development phases and asks clarifying questions when scope, order, dependencies, priorities, or acceptance criteria are missing. Use when the user invokes /planning or asks to plan execution from a roadmap.
disable-model-invocation: true
---

# Planning

Turn a Markdown roadmap into coherent development phases. The roadmap is the source of truth. Do not assume missing information.

## When to use

- User invokes `/planning` and provides a roadmap in Markdown
- User asks to plan execution, break down a roadmap, or define development phases from a roadmap

## Core rules

1. **Roadmap is authoritative** — Only treat as fact what is explicit in the roadmap text.
2. **No assumptions** — Do not invent scope, order, ownership, dependencies, dates, acceptance criteria, constraints, or priorities.
3. **Ask before planning** — If critical information is missing or ambiguous, ask 1–2 focused questions and wait for answers before producing the final plan.
4. **Planning only** — Output a Markdown planning document. Do not write implementation code or auto-generate tickets unless the user explicitly asks.

## Workflow

### Step 1: Ingest the roadmap

Read the full Markdown roadmap. Extract only what is explicitly stated:

| Category | Look for |
|----------|----------|
| Goals | Stated outcomes, vision, success metrics |
| Milestones | Named checkpoints, releases, versions |
| Deliverables | Features, docs, integrations, artifacts |
| Constraints | Deadlines, tech stack, budget, compliance |
| Dependencies | Blockers, prerequisites, external systems |
| Risks | Called-out uncertainties or failure modes |
| Unknowns | TBD items, open decisions, gaps |

If the user did not paste a roadmap, ask them to provide it in Markdown before continuing.

### Step 2: Detect gaps

Before phasing, check whether planning can proceed without guessing. Critical gaps include:

- **Scope** — What is in vs out of this roadmap slice?
- **Order** — Which items must come before others?
- **Priority** — What matters most if time is limited?
- **Acceptance** — How do we know a phase or deliverable is done?
- **Constraints** — Hard limits (date, team size, platform, budget)?
- **Dependencies** — External teams, APIs, approvals, or infra?

If any gap blocks coherent phasing, use **AskQuestion** when available (or ask conversationally). Limit to **1–2 questions per round**. Do not produce the final plan until blocking gaps are resolved or the user explicitly defers them to "Open Questions."

### Step 3: Group into phases

When enough information exists, group work into **coherent development phases** using:

1. **Dependency order** — Prerequisites and foundations first
2. **Product coherence** — Related deliverables that ship value together
3. **Risk reduction** — Validate unknowns early when the roadmap implies them
4. **Reviewability** — Phases small enough to review and adjust

Each phase should have a clear name, objective, and items traceable to the roadmap (quote or paraphrase with section reference when helpful).

Do not merge unrelated work into one phase for convenience. Do not split one logical milestone across phases without a stated reason from the roadmap or user answers.

### Step 4: Produce the plan

Output **only** these sections, in this order:

```markdown
# [Title derived from roadmap or user context]

## Assumptions From Roadmap

[List only facts explicitly stated in the roadmap. Label each item. No invented scope.]

## Open Questions

[List unresolved items that still need user input, or note "None" if all blocking gaps were answered.]

## Development Phases

### Phase 1: [Name]

**Objective:** [One sentence]

**Scope (from roadmap):**
- [Item]

**Dependencies:** [Explicit only, or "Not stated in roadmap"]

**Risks / unknowns:** [Explicit only, or "None stated"]

---

[Repeat for each phase]

## Readiness Criteria

[Per phase or overall: what must be true before starting or before considering the roadmap slice complete. Use roadmap text and user answers only.]
```

Keep the document concise. Prefer bullets over long prose.

## Question guidelines

- Ask the **minimum** needed to phase work without guessing.
- Reference the specific roadmap section or item that triggered the question.
- Offer concrete options when the roadmap suggests a bounded choice.
- After answers, update **Assumptions From Roadmap** vs **Open Questions** — move resolved items out of Open Questions.

## Anti-patterns

- Filling gaps with "reasonable defaults" (team size, timeline, stack, priority)
- Creating phases that do not map to roadmap content
- Skipping **Open Questions** when the user deferred decisions
- Implementing code or opening tasks without explicit user request
- Producing more than the four output sections above

## Example trigger

**User:** `/planning` + pasted roadmap with milestones but no priorities or acceptance criteria

**Agent:** Ask 1–2 questions (e.g. priority order, definition of done for phase 1). After answers, output the four-section Markdown plan.
