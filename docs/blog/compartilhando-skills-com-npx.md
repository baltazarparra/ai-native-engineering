# Compartilhando skills com NPX

> Rascunho editorial para o blog.

Existe uma forma bem simples de compartilhar uma skill com outras pessoas: colocar um `SKILL.md` em um repositório GitHub e deixar a instalação acontecer via `npx`.

Isso muda a sensação do fluxo. Em vez de pedir para alguém copiar arquivos, clonar um repo ou configurar manualmente um agente, você entrega um comando:

O post ["5 Agent Skills I Use Every Day"](https://www.aihero.dev/5-agent-skills-i-use-every-day), do Matt Pocock, mostra bem esse padrão. A instalação vira uma frase:

```bash
npx skills@latest add mattpocock/skills
```

O detalhe importante é entender o papel de cada peça. O `npx` executa uma ferramenta já publicada no npm, chamada `skills`. Essa ferramenta lê um repositório, encontra arquivos `SKILL.md` e instala a skill no agente escolhido.

Você não precisa publicar sua própria skill no npm. O seu repositório GitHub vira a fonte da skill.

## O padrão `npx skills`

O pacote `skills` é uma CLI para instalar skills em agentes de código. Ele aceita fontes como GitHub, GitLab, URLs Git e caminhos locais.

Uma skill boa, por sua vez, tem três características:

- é pequena o suficiente para ser lembrada e aplicada;
- descreve um comportamento recorrente, não uma preferência solta;
- deixa claro quando deve ser usada.

Na prática, isso significa criar algo assim:

```text
skills/
  quality-gate/
    SKILL.md
```

E dentro do `SKILL.md`:

```markdown
---
name: quality-gate
description: Run the project's quality gate at the end of a technical coding task.
---

# Quality Gate

When completing a technical coding task, finish with the strongest practical quality gate for the current project before reporting back.
```

Esse formato é suficiente para o ecossistema aberto de agent skills. A CLI procura por skills em lugares conhecidos, incluindo `skills/`, `.agents/skills/` e diretórios específicos de agentes.

O fluxo mental é:

```text
npx
  executa a CLI "skills"

skills
  lê o repositório GitHub

repo
  expõe uma pasta com SKILL.md

agente
  recebe a skill instalada
```

## A skill deste repo

Para este projeto, a skill inicial é `quality-gate`. Ela ensina o agente a terminar uma tarefa técnica rodando os checks apropriados do projeto: lint, testes, type check, build ou equivalentes.

Instalação a partir do GitHub:

```bash
npx skills@latest add baltazarparra/ai-native-engineering --skill quality-gate
```

Instalação focada em Codex:

```bash
npx skills@latest add baltazarparra/ai-native-engineering --skill quality-gate --agent codex --global
```

Listar as skills disponíveis antes de instalar:

```bash
npx skills@latest add baltazarparra/ai-native-engineering --list
```

## Por que isso funciona

Code agents são muito bons em executar trabalho quando o processo está explícito. O problema é que cada conversa começa com pouca memória prática do seu jeito de trabalhar. Skills resolvem essa lacuna de uma forma leve: em vez de criar um framework inteiro, você distribui pequenas unidades de julgamento operacional.

Para times, isso tem um efeito interessante. O processo deixa de viver só em conversas, snippets ou memória tribal. Ele vira um artefato versionado, revisável e instalável.

## Onde tomar cuidado

Uma skill não deve virar um manual gigante. Quanto maior a skill, maior a chance de ela ser ignorada, mal aplicada ou ocupar contexto demais. O ideal é começar com um comportamento pequeno e observar se ele muda a qualidade das respostas.

Também vale separar skills de regras globais. Uma regra global diz "sempre faça X neste projeto". Uma skill diz "quando esta situação aparecer, use este processo". Essa diferença mantém o agente flexível.

## Fechamento

O padrão `npx skills add owner/repo` transforma um repositório comum em um canal simples de distribuição de processos para agentes. É uma forma barata de compartilhar como você trabalha, não só o código que você escreveu.

No nosso caso, `quality-gate` é propositalmente simples: sempre que houver mudança de código, o agente deve terminar validando o projeto antes de devolver a tarefa.
