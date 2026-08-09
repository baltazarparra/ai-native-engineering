# Engineering Series GOAL

Status: complete and pushed directly to `origin/main` with owner authorization.

Last updated: 2026-08-09

This living plan replaces the current blog post pair with a source-backed series
about Harness Engineering, Loop Engineering, and Graph Engineering. Keep
`Progress`, `Surprises & Discoveries`, `Decision Log`, and
`Outcomes & Retrospective` current during execution.

## Purpose and reader outcome

Teach junior and mid-level software engineers who know conventional development
but do not yet use coding agents daily. After the series, a reader should be able
to prepare an agent's working environment, design a bounded execution loop, and
decide when an explicit workflow graph adds value.

The teaching progression is compositional, not a claimed industry maturity model:

1. Harness defines the environment, rules, feedback, and recovery around an agent.
2. Loop defines how work advances, verifies, persists state, and stops.
3. Graph connects deterministic steps, people, tools, agents, and complete loops.

## Requirements already fixed by the owner

- Replace the current article with three articles in this order: Harness, Loop,
  Graph.
- Write for engineers who are new to AI-native daily work.
- Explain simply before going technical and connect every new idea to established
  pre-AI software engineering.
- Use an informal, organic, human voice consistent with `TONE.md`, with no em dash
  character in user-facing prose.
- Research primarily from Anthropic, OpenAI, Kimi, GLM/Z.ai, AI Hero, and Addy
  Osmani, while checking claims against canonical sources.
- Do not imitate source wording, fabricate experience, or rely on AI-detector
  scores. Naturalness is judged through concrete editorial review.

## Owner decisions required before `/goal`

The repository supports the following defaults, but the original request did not
approve them. Mark every row `confirmed` or record a replacement in `Decision Log`
before implementation.

| Decision           | Recommended default                                                    | Status    |
| ------------------ | ---------------------------------------------------------------------- | --------- |
| Locale             | Three PT-BR and three English files, preserving current parity         | confirmed |
| Graph scope        | Execution and orchestration graphs, not knowledge graphs               | confirmed |
| Old URLs           | Locale-specific redirects to the new Harness article                   | confirmed |
| Release            | Draft all parts, then publish the complete series atomically           | confirmed |
| Series model       | Typed metadata, ordered previous/next navigation, native reference IDs | confirmed |
| Continuous example | Fixing TypeScript errors in an unfamiliar repository                   | confirmed |
| Publication dates  | 2026-05-31 Harness; 2026-06-30 Loop; 2026-07-31 Graph                  | confirmed |
| Delivery           | Implement and validate locally; no commit, push, merge, or deploy      | confirmed |

## Claude Code `/goal`

Claude Code v2.1.139 or later supports `/goal`. Its evaluator reads the surfaced
conversation but does not inspect files or run checks. The executor must therefore
show current evidence. Run this only after all owner decisions above are resolved:

```text
/goal Implement ENGINEERING-SERIES-GOAL.md after every owner-decision row is confirmed. The goal is achieved only when the old article content is replaced by the approved three-part Harness -> Loop -> Graph series; approved locale pairs, series order, navigation, sources, redirects, internal links, metadata, dates, sitemap, hreflang, and legacy Harness copy satisfy the Definition of Done; formatting, lint, build, diff, browser, accessibility, editorial, and source-link checks have current recorded evidence; the approved Git base and 400-line non-content PR policy are respected; unrelated or pre-existing work is untouched; and this plan records progress, decisions, discoveries, outcomes, and residual risks. Do not commit, push, merge, deploy, or choose an unresolved product decision without explicit owner authorization.
```

## Repository baseline to re-check

- Current content is `src/content/blog/harness-no-dia-a-dia.md` plus
  `harness-in-daily-work.md`, paired by `translationKey`.
- The recorded base removed the former direct links from `maturidade.mdx` and
  `maturity.en.mdx`; do not reintroduce them until the new series is published.
- Blog schema has no series or source relationship. Published posts sort only by
  date, so same-date order is not guaranteed.
- Home and blog indexes are dynamic. Exactly three published parts already fill
  the existing three-card home section in each supported locale.
- `BlogPostLayout.astro` has no series identity, next/previous navigation, or
  reference rendering.
- Fourteen legacy `/harness-engineering/` pages redirect to the maturity lesson,
  but their copy says a Harness series was discontinued. Preserve the redirects
  and clarify that the retired artifact was the old chapter route tree.
- Date-only frontmatter currently renders one day early in São Paulo because the
  formatter does not pin a timezone.
- `BLOG-ROADMAP.md` is stale about English, references, and visual direction.
- During planning, concurrent commits and working-tree edits appeared on `main`.
  Record `origin/main`, `HEAD`, working tree, and a dedicated series base SHA before
  editing. Do not push, rewrite, or absorb concurrent work to simplify the diff.

## Terminology and voice contract

Harness means the system around a model run: context policy, instructions, tools,
filesystem and Git access, permissions, sandbox, hooks, state, checks, budgets,
observability, approvals, handoffs, and recovery. It is not merely a prompt or a
large `AGENTS.md` file.

Loop means a bounded cycle that reads goal and state, chooses one useful action,
uses a tool, observes external evidence, verifies progress, persists it, then
continues, stops, or asks for help. `Loop Engineering` is an emerging label, not a
formal standard.

If the owner confirms the proposed Graph scope, graph means execution topology.
Nodes do work; edges carry data, control, conditions, dependencies, or authority.
State and checkpoints make recovery possible. Explain in the introduction before
the first H2 that this is not a knowledge graph and does not replace loops. Useful
agent graphs often contain cycles, and a loop is a small cyclic graph.

Translate the requested Anthropic/OpenAI educational tone into traits, not copied
phrasing: problem first, concrete example before abstraction, calm confidence,
short titled sections, explicit tradeoffs, restrained claims, and a practical
closing action. Follow `TONE.md`: varied rhythm, short paragraphs, acronyms
expanded on first use, tool-neutral categories, no fake anecdotes, no hype, no em
dash, and at most one two-beat contrast per article. An independent reviewer must
challenge rhythm and specificity; no external human signoff is assumed unless the
owner requests it.

## Article contracts

### Part 1: Harness Engineering

Start with a strong model changing the wrong files, missing repository rules, or
declaring success without proof. Define `agent = model + harness` in plain
language. Connect the harness to runtimes, frameworks, operating-system
permissions, CI, test harnesses, audit logs, and runbooks. Cover guides versus
sensors, progressive context, tools, sandboxing, approvals, deterministic checks,
progress artifacts, recovery, and failure-derived constraints. Explain that stale
guidance, broad permissions, self-review, and excess machinery still fail. End
with adding one repository-derived guide and one observable check.

### Part 2: Loop Engineering

Start with one good run failing to become a repeatable process. Connect the loop
to edit-compile-test, test-driven development, CI jobs, queue workers, retries,
control loops, and reconcilers. Cover goal, state, one bounded task, tool action,
external observation, independent verification, checkpoint, budget, reset, and
stop or escalation rules. Start human-in-the-loop; unattended work requires low
risk and strong evidence. Explain endless retries, weak tests, context drift, and
irreversible actions. End with one small act-check-record experiment.

### Part 3: Graph Engineering

Start with one loop becoming opaque when work has dependencies, different
permissions, parallel branches, reviewers, or human gates. Connect graph design to
flowcharts, state machines, build graphs, CI/CD, job orchestrators, and actor
systems. Cover nodes, conditional edges, state, branches, joins, retries, fan-out,
fan-in, handoffs, ownership, and human authority. Explain when an open-ended loop
is better, why parallelism needs independent work, and how handoffs, managers, and
comprehension debt fail. End by drawing the real workflow and removing every node
that does not address an observed ambiguity or risk.

Use the owner-approved continuous example across all parts. Add one brief PM, QA,
or product lens where acceptance criteria, gates, or decision authority make the
engineering point clearer; do not create a second case study merely to fill a
quota.

## Evidence and candidate source pool

For every material claim, record URL, retrieval date, claim type (`documented
mechanism`, `reported experiment`, `vendor claim`, `practitioner opinion`, or
`editorial synthesis`), and destination section. Use relevant sources, not brand
quotas. Open canonical pages; never cite search snippets. Re-check links within
seven days of publication and label beta, preview, deprecation, and benchmark
conditions.

- Anthropic: [long-running harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents),
  [building effective agents](https://www.anthropic.com/engineering/building-effective-agents),
  [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents),
  [agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), and
  [multi-agent research](https://www.anthropic.com/engineering/multi-agent-research-system).
- OpenAI: [agents](https://developers.openai.com/api/docs/guides/agents),
  [running agents](https://developers.openai.com/api/docs/guides/agents/running-agents),
  [orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration),
  [multi-agent fit](https://developers.openai.com/api/docs/guides/responses-multi-agent),
  [evals](https://developers.openai.com/api/docs/guides/agent-evals), and
  [Harness Engineering](https://openai.com/index/harness-engineering/).
- Kimi: [Agent SDK](https://github.com/MoonshotAI/kimi-agent-sdk),
  [Ralph loop](https://github.com/MoonshotAI/kimi-agent-sdk/tree/main/examples/go/ralph-loop),
  [tools](https://www.kimi.com/code/docs/en/kimi-code-cli/reference/tools.html), and
  [Agent Swarm](https://www.kimi.com/blog/agent-swarm).
- GLM/Z.ai: [agents](https://zcode.z.ai/en/docs/agents),
  [safety](https://zcode.z.ai/en/docs/safety-confirm),
  [goal](https://zcode.z.ai/en/docs/goal),
  [subagents](https://zcode.z.ai/en/docs/subagents), and
  [GLM-5](https://z.ai/blog/glm-5).
- AI Hero: [agent-friendly codebases](https://www.aihero.dev/how-to-make-codebases-ai-agents-love),
  [Ralph](https://www.aihero.dev/getting-started-with-ralph),
  [TypeScript feedback loops](https://www.aihero.dev/essential-ai-coding-feedback-loops-for-type-script-projects),
  [tracer bullets](https://www.aihero.dev/tracer-bullets), and
  [AGENTS.md](https://www.aihero.dev/a-complete-guide-to-agents-md).
- Addy Osmani: [harness](https://addyosmani.com/blog/agent-harness-engineering/),
  [loop](https://addyosmani.com/blog/loop-engineering/),
  [software factories](https://addyosmani.com/blog/software-factories/),
  [outer loop](https://addyosmani.com/blog/own-the-outer-loop/), and
  [parallel-agent limits](https://addyosmani.com/blog/cognitive-parallel-agents/).
- Established graph and loop mechanics: [LangChain](https://www.langchain.com/blog/3-years-of-graph-engineering-with-langgraph),
  [LangGraph API](https://docs.langchain.com/oss/python/langgraph/graph-api),
  [Martin Fowler](https://martinfowler.com/articles/harness-engineering.html), and
  [Geoffrey Huntley](https://ghuntley.com/ralph/).

The requested LinkedIn profile returned HTTP 429 on 2026-08-09. Use Addy's
canonical site for claims; an inaccessible profile snippet is not evidence.

### Executed claim map

All pages below were reopened on 2026-08-09. Vendor experiments remain labeled
as vendor reports in the article copy; the series does not generalize their
throughput or benchmark results.

| Part    | Source                                       | Claim type             | Destination                                                        |
| ------- | -------------------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| Harness | Anthropic, effective long-running harnesses  | reported experiment    | Incremental work, durable progress, end-to-end checks              |
| Harness | OpenAI, Harness Engineering                  | reported experiment    | Repository legibility, progressive disclosure, enforced invariants |
| Harness | AI Hero, agent-friendly codebases            | practitioner opinion   | Familiar modules, interfaces, test seams                           |
| Harness | Addy Osmani, Agent Harness Engineering       | practitioner synthesis | Model plus harness, failure-derived constraints                    |
| Loop    | Anthropic, Building Effective Agents         | documented pattern     | Environmental evidence, checkpoints, stop conditions               |
| Loop    | Kimi Agent SDK, Ralph Loop example           | documented mechanism   | External command verification, iteration cap, small tasks          |
| Loop    | AI Hero, TypeScript feedback loops           | practitioner tutorial  | Typecheck, tests, formatting, dev-server feedback                  |
| Loop    | Addy Osmani, Loop Engineering                | practitioner synthesis | Replacing repeated prompting with a designed cycle                 |
| Graph   | Anthropic, Building Effective Agents         | documented pattern     | Routing, parallelization, orchestrator-workers, evaluator loop     |
| Graph   | OpenAI, orchestration and multi-agent guides | documented mechanism   | Handoffs, manager patterns, bounded orchestration                  |
| Graph   | Z.ai, Goal Mode and subagents                | product documentation  | Evidence-based rounds, persistent goal state, delegated work       |
| Graph   | Kimi, Agent Swarm                            | vendor claim           | Parallel work only when tasks can be separated; preview limits     |
| Graph   | LangChain, graph engineering and Graph API   | documented mechanism   | Nodes, edges, shared state, cycles, conditional routing            |
| Graph   | Addy Osmani, Software Factories              | practitioner synthesis | Execution graph, not knowledge graph; human authority and debt     |

## Technical contract if proposed defaults are confirmed

- Add optional `series { key, title, order, total }` and native
  `reference('references')[]` fields to the blog schema. Resolve with `getEntries`.
  Cross-entry parity validation applies to this series only.
- Sort by publication date descending, then same-series order ascending, then slug.
- Show localized series title, `Part N of 3`, and accessible previous/next links.
  Run the project `taste-skill` preflight before changing layout or cards; reuse
  existing hairlines and metadata patterns with no new client JavaScript.
- Keep all six articles as drafts during writing. Draft milestones use structural,
  schema, and editorial checks. Browser evidence begins only in the atomic local
  publication milestone; never add a deliverable draft-bypass route.
- Resolve references at build time and fail on a missing ID. Render only sources
  actually used by the article.
- Replace old Markdown only after drafts pass. Static old-slug pages use `noindex`,
  canonical and `og:url` pointing directly to the new same-locale article, and
  alternate links pointing directly to the new locale pair. Exclude old URLs from
  sitemap. Test one-hop behavior with and without a saved language preference.
- Preserve all fourteen legacy Harness redirects and clarify their PT-BR/English
  copy without reviving the old route tree.
- Pin one timezone policy across article layout, both indexes, and both home pages.
  Visible calendar dates must equal frontmatter.
- Update lesson links, `TONE.md`, and `BLOG-ROADMAP.md`. Do not redesign the site.

## Milestones

### M0: Decisions, base, and safety

- Confirm every owner-decision row and publication date.
- Read `AGENTS.md`, relevant skills, `TONE.md`, roadmap, and this GOAL.
- Record `origin/main`, `HEAD`, working tree, series base SHA, and concurrent work.
- Choose a clean worktree or another owner-approved isolation strategy.
- Run the current baseline gate with Linux Node 22.22.2 and record existing failures.

### M1: Claim maps and outlines

- Re-open canonical sources and build a claim map per article.
- Produce PT-BR outlines using the article contracts and continuous example.
- Have an independent researcher challenge terminology and source classification.

### M2: Series infrastructure

- Add schema relationships, series validation, stable sorting, navigation, sources,
  localized labels, redirect metadata support, sitemap filter, and date policy.
- Reconcile `TONE.md` and `BLOG-ROADMAP.md`.
- Prove standalone posts still work and invalid series/source fixtures fail; remove
  temporary fixtures before continuing.

### M3: PT-BR drafts

- Write three complete `draft: true` posts, add only used source records, and run
  factual, structural, read-aloud-rhythm, anti-pattern, and no-em-dash reviews.

### M4: English adaptation if confirmed

- Adapt, do not translate line by line. Preserve claims, limitations, example
  state, metadata, and source identity. Prove translation pairs are complete.

### M5: Atomic local migration

- Add old-slug pages, update lessons and legacy copy, remove old Markdown, set the
  approved date, and locally flip all new posts to published in one change.
- Validate new pages and redirects before any commit or publication action.

### M6: Full validation

- Run format, lint, build, diff, route, sitemap, canonical, Open Graph, hreflang,
  date, source-link, accessibility, mobile/desktop, theme, keyboard, reduced-motion,
  saved-language, and JavaScript-disabled checks.
- A documented access block is a valid link-check result only when the claim has a
  reachable canonical replacement or is removed.

### M7: Independent review and handoff

- Challenge reader clarity, source support, locale parity, migration safety, and
  evidence. Resolve findings or record residual risk.
- Update all living sections and report exact Git/deployment state. Do not commit,
  push, merge, or deploy without explicit authority.

## Definition of Done

- All owner decisions are recorded and the implementation matches them.
- Three articles follow Harness -> Loop -> Graph, the article contracts, audience,
  pre-AI parallels, continuous example, limitations, and practical closings.
- Graph scope is disambiguated in the introduction before the first H2.
- Material claims map to opened sources; vendor results and emerging terms are
  labeled; no fabricated anecdote or generalized benchmark remains.
- PT-BR and any confirmed English pair pass `TONE.md`, acronym, rhythm, repeated
  contrast, and em-dash reviews without using an AI-detector score.
- Series order, navigation, native references, dates, metadata, language switch,
  and standalone-post compatibility are proven.
- Old content is removed only after approved replacements pass; old blog URLs and
  all fourteen legacy routes follow their confirmed migration contracts.
- `npm run format:check`, `npm run lint`, `npm run build`, and `git diff --check`
  exit 0 on Linux Node 22.22.2, or a pre-existing baseline failure is explicitly
  resolved before publication rather than misreported as a series regression.
- Browser evidence covers confirmed locales at 1440px and 390px, light and dark,
  keyboard, reduced motion, saved/no language preference, and JavaScript disabled.
- Each implementation PR changes at most 400 non-content lines against its recorded
  base. Concurrent work is not included. No unauthorized Git or deployment action
  occurred.
- `Progress`, discoveries, decisions, outcomes, evidence, and residual risks are
  current enough for a new session to continue without guessing.

## Validation commands

```bash
source /home/baltz/.nvm/nvm.sh
nvm use 22.22.2
npm run format:check
npm run lint
npm run build
git diff --check
git diff <recorded-base>...HEAD --shortstat -- . ':(exclude)src/content'
```

The repository has no dedicated test script. Never report "tests pass" when only
lint and build ran. Inspect built HTML for all approved article and redirect routes,
metadata, exact dates, and sitemap entries. Re-open every rendered source URL.

## Rollback

Keep old posts published until draft and infrastructure review pass. If the local
migration fails, restore drafts, keep old content, remove unfinished visible series
UI, and record the checkpoint. If an authorized published change must be reverted,
restore old article routes before removing redirects, revert release and
infrastructure layers separately, then rerun the full gate. Never use broad file
deletion or destructive Git recovery.

## Progress

- [x] 2026-08-09: audited repository, migration contracts, tone, and date defect.
- [x] 2026-08-09: researched vendor, practitioner, and graph-mechanics sources.
- [x] 2026-08-09: created and independently reviewed this execution GOAL.
- [x] 2026-08-09: owner authorized execution, confirming every recommended
      default except the publication date; delivery is local-only.
- [x] 2026-08-09: recorded base `92ef0af`, `origin/main` `a9b581e`, clean
      working tree, and Node 22.22.2 baseline. Build and `git diff --check` pass;
      format and lint have pre-existing failures in `Footer.astro`, both edited home
      content surfaces, and the owner's maturity-session changes.
- [x] M0 complete: every owner decision is confirmed.
- [x] M1 complete: canonical sources reopened and claim map recorded.
- [x] M2 complete: typed metadata, native references, parity validation, stable
      sorting, localized identity/navigation, canonical override support, UTC dates,
      and current tone/roadmap contracts implemented.
- [x] M3 complete: three PT-BR drafts written and structurally reviewed.
- [x] M4 complete: three English adaptations written and parity-reviewed.
- [x] 2026-08-09: safe pre-publication work exhausted after three consecutive
      goal turns without an owner date. Six posts remain `draft: true`; the existing
      article pair remains published and no redirect, Git, or deployment action ran.
- [x] 2026-08-09: owner resumed execution with the last day of the previous three
      completed months: Harness `2026-05-31`, Loop `2026-06-30`, and Graph
      `2026-07-31`, and explicitly authorized removal of the old article pair.
- [x] M5 complete: the six localized parts are published atomically, the old
      content files are removed, locale-aware fallback redirects own the old URLs,
      the sitemap excludes those URLs, and legacy chapter-route copy is unambiguous.
- [x] M6 complete: formatting, lint, build, diff, rendered-route, metadata,
      sitemap, source-link, browser, accessibility, responsive, theme, motion,
      language, redirect, and JavaScript-disabled checks have current evidence.
- [x] M7 complete: an independent editorial, route, build, accessibility, and
      migration audit found no remaining P0-P2 issues after its findings were
      corrected and revalidated.
- [x] 2026-08-09: after local completion, the owner explicitly authorized a
      direct commit and push to `main`, with no pull request.
- [x] 2026-08-09: publication commit `36c97bc` was pushed to `origin/main`.
- [x] 2026-08-09: the owner requested a moderate editorial condensation. All six
      localized articles now sit between 1,280 and 1,371 words while preserving
      their examples, conventional-engineering parallels, limitations, sources,
      dates, routes, and series navigation.

## Surprises & Discoveries

- The current article is a PT-BR/English pair. The two hardcoded lesson links
  existed on `origin/main`, but the owner's current `HEAD` removed them.
- Graph Engineering is a recent label for established execution-graph mechanics,
  not a settled discipline. Loops are cyclic graphs and are not replaced by them.
- The old Harness route copy conflicts semantically with the requested new series.
- The visible date can shift one day, and the blog roadmap is stale.
- LinkedIn returned HTTP 429; Addy's canonical blog is the usable evidence source.
- Concurrent commits and edits appeared during planning. Execution preserved the
  owner's recorded base changes and did not rewrite, commit, push, or publish them.
- Astro logs a warning rather than failing when `getEntries` receives an unknown
  reference. An explicit undefined-entry check is required to make the build gate
  enforce the native relationship.
- The browser CLI launch flag did not actually disable JavaScript. A direct Chrome
  DevTools Protocol probe did: the old PT-BR URL stayed in place, rendered its
  fallback heading and target link, and did not contain the removed article body.
- The owner base intentionally removed the old article links and adjacent lesson
  sections. The migration must not reintroduce that deleted lesson copy.

## Decision Log

- Decision: recommendations not present in the user's brief remain owner gates.
  Rationale: locale, Graph scope, redirects, release, data model, example, date,
  and delivery materially change the result.
- Decision: source presence is driven by claims, not vendor quotas.
- Decision: draft browser checks wait for the atomic local migration.
- Decision: references use Astro-native relationships, not merely named strings.
- Decision: redirect canonical, sitemap, hreflang, and language-preference behavior
  are explicit acceptance criteria.
- Decision: the user's `execute` instruction confirms the recommended defaults
  that have concrete values in this plan. It does not invent a publication date.
- Decision: `92ef0af` is the series base. Its maturity-session edits are unrelated
  owner work and must remain untouched.
- Decision: use the last day of the previous three completed months in series
  order: Harness `2026-05-31`, Loop `2026-06-30`, and Graph `2026-07-31`. Locale
  pairs share the date for their part. Rationale: explicit owner direction on
  2026-08-09.
- Decision: the UI change preserves The Institute design at variance 4, motion 1,
  and density 3. It adds only hairline metadata and previous/next navigation.
- Decision: after the owner's follow-up request for moderate condensation, every
  article targets roughly 1,250 to 1,450 words. Locale pairs keep matching claims,
  limitations, examples, section flow, and source identity without line-by-line
  translation.
- Decision: temporary fixtures proved that a missing source and a partially
  published locale fail the build. Both fixtures were removed immediately.
- Decision: a temporary `2026-05-30` date on the English Harness part proved that
  mismatched locale-pair dates fail the build. The fixture was restored to
  `2026-05-31`, and the final gate rebuilt all 52 pages.
- Decision: series validation now covers drafts as well as published posts. It
  requires exactly three parts per locale, one draft state, matching publication
  dates within every locale pair, stable localized titles, matching and unique
  translation keys, and resolvable reference IDs.
- Decision: preserve the 400-line policy with five delivery layers if publication
  is authorized: schema/query validation; series UI/routes/index integration;
  redirects/legacy/sitemap migration; operational documents; and a dedicated
  content-only release for articles and reference records. No PR exists yet, so
  the combined local worktree is not presented as one reviewable PR.
- Decision: the later explicit direct-main instruction supersedes the proposed PR
  delivery path for this publication. The 400-line rule governs pull requests;
  no pull request will be opened for the owner-authorized direct push.
- Evidence: the published standalone post pair still renders without series or
  reference UI. Browser checks covered PT-BR desktop light, PT-BR 390px dark,
  English desktop light, visible keyboard focus, no horizontal overflow, no error
  overlay, canonical URLs, and both saved and browser-derived language routing.
- Evidence: final series browser checks covered PT-BR and English at 1440px and
  390px, light and dark themes, reduced motion, visible keyboard focus, exact
  localized dates, all three navigation states, direct language switching, source
  lists, saved and browser-derived redirect destinations, and the static no-script
  fallback. Every rendered source URL reopened successfully on 2026-08-09.

## Outcomes & Retrospective

Execution completed M0 through M7. The collection now contains exactly three
localized article pairs, published in series order with these visible dates:

- Harness: `2026-05-31`
- Loop: `2026-06-30`
- Graph: `2026-07-31`

The old Markdown pair is removed. Its PT-BR and English URLs now render noindex
fallback pages with canonical, Open Graph, hreflang, language-aware one-hop client
redirects, and working links when JavaScript is unavailable. The six new articles
and both indexes are in the sitemap; the two old blog URLs, fourteen legacy
Harness routes, and kitchen-sink pages are excluded.

The final independent audit found and resolved repeated synthetic-sounding
contrasts, unexplained acronyms, an ambiguous PT-BR heading, an unnamed English
footer link, motion that survived reduced-motion mode, incorrect short-date locale
selection, no-script-hidden home links, and inconsistent trailing slashes. It
rechecked the corrected source and rebuilt output with no remaining P0-P2 issue.

A follow-up editorial pass reduced the six articles by about 32 percent as a set.
Repeated explanations were merged while the continuous TypeScript example,
pre-AI engineering parallels, operational guidance, and failure modes stayed in
place across both locales.

Current evidence: Node 22.22.2 formatting, lint, build, and `git diff --check`
pass; Astro generates 52 static pages; negative fixtures fail closed for missing
references, partial publication, and mismatched locale-pair dates; source links
were reopened; and browser evidence covers both locales, 1440px and 390px, light
and dark, keyboard focus, reduced motion, saved and browser-derived language,
direct language switching, overflow, and JavaScript-disabled fallback behavior.
The repository has no dedicated test script, so no test-suite claim is made.

The owner explicitly replaced the proposed PR path with direct-main publication.
Commit `36c97bc` contains the complete validated series and was pushed to
`origin/main` on 2026-08-09 without a pull request. The previously local owner
commit was preserved and pushed in the same fast-forward update. No history was
rewritten or force-pushed. GitHub Pages deployment is triggered externally by the
repository workflow and is not treated as complete without separate evidence.

Residual risk: GitHub Pages cannot provide an application-level HTTP 301 or 308
from these static route files. JavaScript performs the automatic redirect; readers
without it receive an accessible same-locale fallback link. The LinkedIn profile
remained rate-limited, so Addy Osmani claims use his reachable canonical blog.
