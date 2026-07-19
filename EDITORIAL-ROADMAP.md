# Editorial Roadmap: Voice, Tone, and Narrative

Execution plan for the editorial revision of AI-Native Engineers. Based on a full audit of every user-facing surface (2026-07-19): 3 lessons (PT + EN), blog (PT + EN), home (PT + EN), /projeto chapters (PT + EN), colinha, 404, redirects, i18n microcopy, and component strings.

`TONE.md` remains the source of truth for voice. This document adds the narrative layer, records the audit findings, and sequences the work. When both documents overlap, `TONE.md` wins; Phase 1 below updates it so they do not disagree.

We ship one phase at a time, validated before the next starts, per `CLAUDE.md` PR discipline (400-line cap outside `src/content/**`; content-only PRs exempt).

---

## 1. Audit verdict: what is already done well

The voice work is largely done. The last curriculum refresh (commit `ceba3f4`) brought the lessons, home, and data files in line with `TONE.md`. Findings worth protecting, not changing:

- **The 3 lessons (PT)** hit the target register: strong hooks, calm authority, honest about limits. "Preview não é produção", "agente = modelo + harness", "Prompt solto explora. Entrega repetível pede sistema."
- **The blog post pair** is the reference for the essay register, in both languages. The EN version reads native, not translated.
- **/projeto chapters** already practice the "why before each step" rule that `TONE.md` §7 still lists as pending. The guide lags the content, not the other way around.
- **Microcopy (i18n.ts)** is benefit-forward and idiomatic in both locales ("Pergunte, responda, destrave" / "Ask, answer, get unstuck").
- **Zero violations** of the hard rules in real content: no em dashes, no terminology drift (Aula/Lesson canon holds), no hype words, no brand misuse, no hedge filler.

## 2. Audit findings: what needs fixing

Ordered by impact.

| # | Finding | Where | Severity |
| --- | --- | --- | --- |
| F1 | "Não é X. É Y." / "not just X, it is Y" scaffolding repeated 14+ times | Concentrated in the dead harness series (`src/components/harness/content/pt+en`, `harness-chapters.ts`); 1-2 instances in live lessons | High, but mostly dead content |
| F2 | Dead legacy content and code still in tree | `src/components/harness/**` (12 content files + 6 components + layout + lib), `Hero*` toy components, legacy `accent` field in `sessions.ts`, dead `harness` i18n block | High (risk of the worst-voice content resurfacing; maintenance noise) |
| F3 | PT/EN mirror gap: EN publish chapter has 2 sections PT lacks ("When to automate with GitHub Actions", "What to take from here") | `src/pages/en/project/publish.astro` vs `src/pages/projeto/publicar.astro` | Medium (PT is the primary audience and has the poorer version) |
| F4 | No formalized narrative: the site has a strong latent throughline but no document states it, and home sections carry bare titles with no connective tissue (`.section-head__lede` style exists, unused) | `TONE.md`, `src/pages/index.astro`, `en/index.astro` | Medium |
| F5 | Acronym rule break: "PRD" used without first-use expansion | `src/pages/projeto/construir.astro`, `en/project/build.astro` | Low |
| F6 | Minor EN polish: "extremely fast" (banned intensifier), "weak as the only architecture decision-maker", "context lost in the chat" | `glossary.en.mdx:96`, `glossary.en.mdx:48`, `maturity.en.mdx:67` | Low |
| F7 | Typography: en dash range "2–3 linhas" | `src/pages/projeto/planejar.astro:158` | Low |
| F8 | Doc drift: `REDESIGN.md` still documents the cardinal `#A31F34` + Newsreader system replaced by the anti-slop pass (`#e10600` + system serif); kitchen-sink demo copy mentions Newsreader and carries 28 em dashes | `REDESIGN.md`, `src/pages/kitchen-sink.astro`, `en/kitchen-sink.astro` | Low (internal surfaces) |
| F9 | `TONE.md` §7 describes /projeto as "dry and instructional" and the harness series as live; both statements are stale | `TONE.md` | Low |

## 3. The narrative canon (to be added to TONE.md in Phase 1)

Voice is how the site sounds. Narrative is the one story every surface tells. The site already tells it implicitly; this canonizes it.

### 3.1 The throughline

**Da demo ao sistema.** The reader arrives able to produce a demo by prompting. The site's single argument, across every surface, is the journey from that demo to owning the system that produces software: vocabulary, then tools, then method, then practice.

The manifesto states it ("o artefato central passa a ser o sistema"). Lesson 3 lands it ("ser dono do sistema que produz o diff"). Everything else should visibly serve it.

### 3.2 The reader's journey (surface roles)

| Surface | Role in the story | Register |
| --- | --- | --- |
| Home | The promise and the map | Editorial front page: short, confident |
| Aula 1 (glossario) | Act 1: name things, feel the demo's limit | Calm professor, strong hooks |
| Aula 2 (ferramentas) | Act 2: choose instruments without hype | Calm professor, market snapshot |
| Aula 3 (maturidade) | Act 3: the method, spec + harness, ownership | Calm professor, the payoff |
| /projeto | Live the loop on a real artifact | Workshop: imperative with a why |
| Blog | Field essays: what Tuesday feels like | First and second person, opinionated |
| Colinha | The loop compressed for reuse | Reference card: minimal sentences |
| Microcopy | Signage of the building | Short, benefit-first |

### 3.3 Canonical phrases

These already exist in the content and are the narrative vocabulary. Reuse them; do not invent competing metaphors for the same idea:

- "preview não é produção" (the demo's limit)
- "agente = modelo + harness" (the equation)
- "trilhos, não prisão" (what a harness is for)
- "dono do sistema que produz o diff" (the destination)
- "foto de julho de 2026" (market snapshots; update the month, keep the device)
- "harness mal feito vira teatro" (the failure mode)
- "Prompt solto explora. Entrega repetível pede sistema." (the closing argument)

### 3.4 Signature-move governance

The two-beat contrast ("Não é X. É Y." / "X explora. Y pede sistema.") is the house move. It lands when rare and reads machine-written when repeated: the audit found it 14+ times in the legacy series alone. Rule: **at most one two-beat contrast per page.** If a draft has two, keep the stronger and restructure the other.

## 4. Phases

### Phase 1: Canon update (docs only)

**Objective:** Make the guides match reality and add the narrative layer.

**What we ship**

- [ ] `TONE.md`: add section 9 "Narrative" with 3.1-3.4 above (throughline, journey table, canonical phrases, signature-move rule)
- [ ] `TONE.md` §7 rewritten: /projeto is no longer dry (acknowledge it converged); harness deep-dives are deleted, not redirected-but-live; keep the register table pointing at 3.2
- [ ] `REDESIGN.md`: short errata note at the top stating palette and serif sections predate the anti-slop pass, with `CLAUDE.md` + `AGENTS.md` as current source of truth (do not rewrite history in a planning doc)

**Done when:** both docs read consistently with each other and with the shipped site; no em dash added anywhere.

**Validate:** read-through; `grep -n "—" TONE.md REDESIGN.md EDITORIAL-ROADMAP.md` returns nothing new in prose.

### Phase 2: Delete the dead layer (code PRs, split as needed)

**Objective:** Remove the worst-voice content by removing the dead code that carries it. Fixes F1 (13 of 14 instances) and F2 by deletion.

**What we ship**

- [ ] `git rm -r src/components/harness/` (content pt/en, chapter components, `chapter-content.ts`, `useHarnessProgress.ts`) and `src/layouts/HarnessChapterLayout.astro`, `src/lib/harness-progress.ts`
- [ ] `src/data/harness-chapters.ts` pruned to the minimal slug + alternate-link data the redirect pages import (or inline it into the redirect pages and delete the file)
- [ ] Dead `harness` UI block removed from `src/lib/i18n.ts`
- [ ] `git rm -r` the four unwired `Hero*` toy components (already a `ROADMAP.md` follow-up)
- [ ] Legacy `accent` field removed from `sessions.ts`
- [ ] Kitchen-sink copy pass (PT + EN): em dashes to colons, drop the Newsreader mention

**Done when:** build passes, redirects still resolve with correct hreflang, no import errors, `grep -rn "harness/content" src/` is empty.

**Validate:** `npm run lint && npm run build`; click through `/harness-engineering/*` redirects in both locales.

### Phase 3: Content fixes from the audit

**Objective:** Fix every live-content finding. Two PRs: one content-only (`src/content/**`, exempt from cap), one for pages.

**What we ship**

- [ ] 3a (content-only): `glossary.en.mdx` "extremely fast" reworded; "weak as the only architecture decision-maker" naturalized; `maturity.en.mdx` "context lost in the chat" naturalized; `tools.en.mdx:77` "not only in the generated text" restructured; apply the one-per-page two-beat rule across the six MDX files
- [ ] 3b (pages): backport the two EN-only sections into `projeto/publicar.astro` ("Quando automatizar com GitHub Actions", "O que levar daqui"); expand PRD on first use in `construir.astro` + `en/project/build.astro` ("PRD, ou Product Requirements Document, o documento de requisitos da fase"); fix "2–3 linhas" to "2 a 3 linhas" in `planejar.astro`

**Done when:** PT and EN project chapters mirror heading-for-heading; no banned intensifier remains; read-aloud pass on changed passages sounds human.

**Validate:** `npm run build`; heading-tree diff PT vs EN; `TONE.md` checklist on every touched file.

### Phase 4: Home narrative pass (PT + EN)

**Objective:** Make the home carry the throughline instead of bare section titles. Smallest possible diff: ledes, not layout.

**What we ship**

- [ ] One-line lede under "O currículo em três aulas" naming the arc (vocabulary, tools, method) and the destination, e.g. "Três aulas, um argumento: sair da demo e virar dono do sistema."
- [ ] One-line lede under "Ensaios do campo" saying what an essay is here (the Tuesday version, not curriculum)
- [ ] One-line lede under the project section connecting theory to practice (reuse `t.project.homeDesc`, already written and unused on this section, before writing anything new)
- [ ] Same treatment in `en/index.astro`; hero and manifesto stay untouched (they already work)

**Done when:** a first-time visitor can retell the site's story from the home page alone; ledes use the existing `.section-head__lede` style; no new components.

**Validate:** `npm run build`; mobile and desktop check; read the page top to bottom aloud.

### Phase 5: Feed the field (content-only, optional but recommended)

**Objective:** "Ensaios do campo" shows up to 3 posts and has 1. Two essays make the section real and exercise the narrative canon.

**Proposed briefs** (write per `TONE.md`, blog register, PT first then EN):

- [ ] "Spec antes do prompt": one afternoon, one task, written twice, once as a loose prompt and once as a small spec; what changed in the diff and in the review. PM and QA viewpoint included.
- [ ] "O dia em que o agente errou": a concrete failure that became a rule in the harness; the failure-to-rule loop lived, not theorized. Closes on "harness mal feito vira teatro" territory without repeating the lesson.

**Done when:** each post is editorially distinct from the lessons, passes the `TONE.md` checklist, and lands one canonical phrase naturally.

**Validate:** full read-aloud; build and deploy.

### Phase 6: Gate

**Objective:** Final validation of the whole track.

- [ ] `quality-gate` skill: lint, format check, build
- [ ] Full click-through, both locales, both themes
- [ ] Grep guards on user-facing sources: em dash, "é importante notar", "vale lembrar", "extremely", "incredibly", "revolucionário"
- [ ] Optional follow-up recorded in `ROADMAP.md` backlog: a `tone-check` script automating those greps in CI

---

## Out of scope

- Visual or layout changes beyond the home ledes (design system is settled)
- Rewriting lessons that already pass the audit; the curriculum was refreshed in `ceba3f4` and holds
- English routes for colinha/projeto restructuring (mirrors exist and hold, except F3)
- Newsletter, search, or any `ROADMAP.md` backlog item

## Decision log

| Decision | Choice | Why |
| --- | --- | --- |
| Fix or delete the legacy harness series voice issues | Delete | Pages are hard redirects; nothing imports the content; rewriting dead prose is waste |
| Where the narrative lives | Inside `TONE.md`, not a separate NARRATIVE.md | One source of truth for how the site speaks; a second guide would drift |
| PT or EN as base for the publish-chapter merge | EN version backported to PT | EN is the richer version; PT is the primary audience |
| Keep the ✓ / ⚠️ / → marker system | Keep, document as canon | Used consistently; it is signage, not decoration |
| 🎉 in chapter completion states | Keep for now | It is feedback on a real milestone, the single celebratory moment; revisit only if it multiplies |
