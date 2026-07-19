# TONE.md: Voice & Rhythm Guide

This is the source of truth for how the site sounds. Every piece of user-facing
text, in any locale, follows it. When content and this guide disagree, this guide
wins. Harness docs stay in English (see `CLAUDE.md`); user-facing examples here are
shown in PT-BR because that is the primary audience.

## 1. The one-line brief

Teach like a calm expert who respects the reader's time and intelligence. Warm,
direct, honest about limits. Inspired by how Anthropic, OpenAI, and Apple write:
clarity over cleverness, concrete over abstract, confidence without hype.

## 2. Voice pillars

1. **Clarity over cleverness.** A sentence exists to be understood, not admired.
   If a joke costs comprehension, cut the joke.
2. **Concrete before abstract.** Lead with the example, the number, the thing the
   reader can see. Explain the theory after they care.
3. **Calm authority.** State things plainly. No hype, no breathless adjectives
   ("revolucionário", "incrível", "o futuro chegou"). Being honest about where a
   tool breaks builds more trust than praising it.
4. **Benefit first.** Open with why it matters to the reader, then how it works.
5. **Warm, not chummy.** We keep personality and good hooks. We drop slang and
   irony that undercut authority. "Você só tem uma demo com autoestima" is funny
   but it talks down. "Você ainda não é dono do software" respects the reader.
6. **Human and organic.** The text must never read as machine-generated. See §4.

## 3. Rhythm

- **Vary sentence length on purpose.** A short declarative line, then one that
  develops it, then a short one that lands. Never three long sentences in a row.
  Never three short ones either, that reads like a robot.
- **Short paragraphs.** One idea per paragraph. Two to four sentences is the home
  range. A one-sentence paragraph is allowed when the point deserves the air.
- **Use bold for the single most important claim in a section,** not for
  decoration. One bold phrase per section, roughly.
- **Lists earn their place.** Use a list when items are genuinely parallel. Prose
  is the default. Do not turn an argument into bullets to avoid writing it.

## 4. Hard rules (non-negotiable)

- **No em dashes. Ever.** The character `—` does not appear in user-facing text.
  Use a comma, a period, parentheses, or a colon, whichever the sentence needs.
  This also means no "X, e ela não vai aguentar" dash substitutes dressed up as
  dashes. Restructure instead.
- **Avoid AI tells.** These patterns make text feel machine-written:
  - the "isn't just X, it's Y" / "não é só X, é Y" construction on repeat;
  - rule-of-three everywhere ("rápido, melhor e diferente" in every sentence);
  - hedge filler ("é importante notar que", "vale lembrar que", "no geral");
  - perfectly balanced, symmetrical sentences back to back;
  - empty intensifiers ("realmente", "extremamente", "incrivelmente").
    Read a draft aloud. If it sounds like a press release or a textbook, redo it.
- **Explain acronyms on first use,** before any deep dive (CLI, LLM, SDD, MCP, PRD).
- **Never favor a specific tool.** Teach categories; name tools as a market
  snapshot ("foto de julho de 2026"). Brands change, categories last.

## 5. Terminology canon

Use these exact forms. Do not mix synonyms.

| Concept                        | Use                                  | Do not use                                                  |
| ------------------------------ | ------------------------------------ | ----------------------------------------------------------- |
| The brand / site name          | **AI-Native Engineers**              | "Engenharia AI-Native", "AI-Native Engineering" (PT titles) |
| A content unit (the 3 lessons) | **Aula** (PT) / **Lesson** (EN)      | "Sessão", "Session", "módulo"                               |
| A unit of the hands-on project | **capítulo** (PT) / **chapter** (EN) | "etapa", "passo" (for the unit itself)                      |
| An agent work run              | "sessão de agente" / "agent session" | n/a (this is a different concept, keep it)                  |
| The agent's environment        | **harness**                          | "andaime", "estrutura"                                      |
| Build-by-talking practice      | **vibe coding**                      | translating it                                              |

Note: URL slugs (`/sessions/`, `/projeto/`) are not display text and do not change
here. This table governs words the reader sees in prose, headings, and labels.

## 6. Punctuation and typography

- Comma usage follows standard PT-BR grammar. Watch for stray commas before the
  main verb ("O problema X, não é Y" is wrong; remove the comma).
- Close your appositives ("uma spec, ou especificação, é um artefato").
- Prefer a period over a semicolon in prose. Semicolons are fine inside lists.
- Emoji and symbols (✓, ⚠️, →) are used sparingly and consistently. Pick one
  checkpoint marker and one warning marker per page type and stick to it. Default:
  no decorative emoji in body prose.
- Numbers: spell out one through ten in prose unless it is a measurement, version,
  or stat ("três aulas", but "128K tokens", "84% dos respondentes").

## 7. Per-surface guidance

The site uses distinct registers for distinct jobs. They share the same voice
and serve the narrative roles defined in section 9.

- **Session/lesson MDX** (was the witty blog voice): keep the strong hooks and
  second-person energy. Trim slang and punchline irony. Keep "preview não é
  produção", lose "demo com autoestima".
- **Legacy Harness Engineering routes**: the deep-dive series was discontinued
  and removed. Its old URLs redirect to Lesson 3. Do not create new content in
  the legacy route tree.
- **/projeto chapters**: use workshop language. Keep imperative clarity and
  explain why before asking the reader to act. Warmth comes from context, not
  jokes.

## 8. Quick before/after

> Antes: "Se você não entende o código, não revisou dados, não testou permissões
> e não sabe como fazer rollback, você ainda não é dono do software. Você só tem
> uma demo com autoestima."
>
> Depois: "Se você não entende o código, não revisou os dados, não testou as
> permissões e não sabe reverter uma mudança, você ainda não é dono do software.
> Tem um protótipo, e protótipo não aguenta produção."

The point survives. The voice grew up.

## 9. Narrative canon

Voice is how the site sounds. Narrative is the single journey every surface
helps the reader complete.

### 9.1 Throughline

**Da demo ao sistema.** The reader may arrive able to produce a demo by
prompting. The site takes them from that first result to owning the system that
produces software: vocabulary, tools, method, practice, and validation.

The destination is not faster acceptance of generated code. It is informed
ownership of the context, rules, checks, and decisions behind the diff.

### 9.2 Reader journey

| Surface             | Role in the story                                | Register                                      |
| ------------------- | ------------------------------------------------ | --------------------------------------------- |
| Home                | State the promise and map the journey            | Editorial front page: short and confident     |
| Aula 1: glossário   | Name the parts and expose the demo's limit       | Calm professor with concrete hooks            |
| Aula 2: ferramentas | Choose instruments without hype                  | Calm professor using current market snapshots |
| Aula 3: maturidade  | Connect spec, harness, validation, and ownership | Calm professor delivering the payoff          |
| /projeto            | Practice the loop on a real artifact             | Workshop: imperative with a reason            |
| Blog                | Show how the work feels in practice              | Field essay: timely and opinionated           |
| Colinha             | Compress the loop for reuse                      | Reference card: minimal sentences             |
| Microcopy           | Help the reader move through the building        | Short and benefit-first                       |

### 9.3 Canonical vocabulary

These phrases and devices already carry the site's argument. Reuse them when
they fit. Do not force them into every surface or invent competing metaphors for
the same idea.

- "preview não é produção": the demo's limit;
- "agente = modelo + harness": the operating equation;
- "trilhos, não prisão": the role of constraints;
- "dono do sistema que produz o diff": the destination;
- "foto de [mês e ano]": a dated market snapshot, updated when the content is;
- "harness mal feito vira teatro": the failure mode;
- "Prompt solto explora. Entrega repetível pede sistema.": the closing
  argument.

### 9.4 Signature-move governance

The two-beat contrast ("Não é X. É Y." or its EN equivalent) is the house move.
It lands when rare and reads machine-written when repeated.

Use at most one two-beat contrast per user-facing page. If a draft has more
than one, keep the strongest and rewrite the others as direct prose. A
canonical phrase does not override this limit.
