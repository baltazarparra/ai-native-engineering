# PLAN.md: AI-Native Engineer Learning Site

## 1. Project summary

Criar um site interativo, estático e responsivo, publicado via GitHub Pages, para ensinar em linguagem humana e acessível o que uma pessoa precisa entender para operar como um **AI-Native Engineer** em 2026.

O produto não deve falar só com desenvolvedores seniores. Ele precisa funcionar para:

- pessoas não técnicas que atuam em produto digital, como QA, PM, Product Designer, Tech Recruiter ou liderança de produto;
- pessoas de baixa senioridade em tecnologia;
- devs iniciantes que ainda confundem ferramenta, modelo, agente, CLI e workflow.

A proposta central é simples:

**explicar o mercado, traduzir a terminologia, mostrar o mapa das ferramentas, organizar a evolução do uso de IA no desenvolvimento e deixar claro que AI-native não é “pedir código”, e sim operar com contexto, critério, validação e fluxo.**

---

## 2. Tese do produto

O mercado já trata IA como parte normal do trabalho de software, mas ainda existe uma lacuna grande entre **usar IA** e **trabalhar bem com IA**.

Os dados mais recentes mostram um cenário bem claro:

- o uso de IA no desenvolvimento já é massivo;
- produtividade percebida subiu;
- confiança não subiu no mesmo ritmo;
- times precisam de processo, validação e contexto, não só acesso a ferramenta.

Isso muda o foco do site. O conteúdo não deve vender hype. Deve ensinar:

1. o vocabulário certo;
2. a diferença entre ferramenta, modelo e workflow;
3. como a prática evoluiu de consulta simples até agentes;
4. por que verificação, planejamento e harness/importância de contexto viraram peças centrais.

---

## 3. Base de leitura de mercado

### 3.1 O que vamos assumir como definição prática de AI-Native Engineer

Vamos usar uma definição prática, inspirada por Addy Osmani:

> um AI-Native Engineer é alguém que integra IA profundamente no workflow diário e passa a pensar em cada tarefa perguntando se a IA pode ajudar a fazer aquilo de forma mais rápida, melhor ou diferente.

Mas o site não deve tratar isso como slogan. Ele deve deixar claro que isso vem junto com:

- supervisão humana;
- validação;
- clareza de objetivo;
- boa estrutura de projeto;
- capacidade de revisar saída e não apenas aceitar.

### 3.2 O que os dados de mercado sugerem

A leitura combinada das fontes indica:

- Adoção já deixou de ser nicho. O Stack Overflow 2025 mostra que 84% dos respondentes usam ou planejam usar IA no processo de desenvolvimento, e 51% dos desenvolvedores profissionais usam IA diariamente.
- O relatório DORA 2025 mostra adoção de 90% entre profissionais de software, com mais de 80% relatando ganho de produtividade e 59% relatando impacto positivo em qualidade.
- Ao mesmo tempo, a confiança está atrás da adoção. O Stack Overflow 2025 mostra mais gente desconfiando da acurácia das saídas de IA do que confiando nelas.
- A maior frustração reportada pelos devs é “solução quase certa, mas não totalmente”, seguida por debugging mais custoso de código gerado por IA.
- A Anthropic mostra que coding continua sendo um dos usos mais fortes das suas plataformas, e que tarefas de correção, modificação de software e construção de apps com foco em interface estão entre os usos mais relevantes.

### 3.3 Interpretação estratégica

Então o site precisa ensinar um modelo mental mais maduro:

**AI-native engineer = operador de sistemas de trabalho com IA**
e não apenas
**pessoa que escreve bons prompts**.

Esse operador precisa entender pelo menos cinco camadas:

1. linguagem e conceitos;
2. categorias de ferramentas;
3. capacidades e limites dos modelos;
4. estágios de maturidade do uso de IA no desenvolvimento;
5. mecanismos de controle: contexto, validação, regras, testes, harness e revisão.

---

## 4. Público-alvo

### Primário

Pessoas de produto digital e tecnologia que não são especialistas profundos em engenharia, mas precisam entender o novo cenário:

- QA
- Product Manager
- Product Ops
- Tech Recruiter
- Product Designer
- Founder
- liderança de tecnologia em transição

### Secundário

- devs juniores e plenos;
- pessoas curiosas tentando entrar no tema;
- profissionais que usam IA no trabalho mas ainda não têm um mapa mental claro.

### Perfil de consumo esperado

- entra pelo celular, mas também pode estudar no desktop;
- quer explicações diretas, humanas e sem jargão desnecessário;
- tolera profundidade, desde que exista progressão;
- quer referências para se aprofundar depois.

---

## 5. Objetivos do usuário

Ao final do site, a pessoa deve conseguir:

- explicar o que é LLM, modelo, agente, CLI, IDE e harness sem parecer que decorou buzzword;
- diferenciar ferramentas de IDE e ferramentas de terminal;
- entender que “modelo” não é a mesma coisa que “produto”;
- reconhecer as fases do uso de IA no desenvolvimento;
- entender por que vibe coding apareceu, por que ele falha em vários contextos e por que surgem abordagens mais estruturadas;
- perceber que AI-native engineering é tanto sobre engenharia de contexto e validação quanto sobre geração de código.

---

## 6. Princípios de conteúdo

### 6.1 Linguagem

A linguagem do site deve ser:

- orgânica;
- humana;
- direta;
- em PT-BR natural;
- sem parecer aula acadêmica;
- sem formalidade excessiva.

### 6.2 Didática

Cada página precisa seguir progressão de profundidade:

1. explicação curta e simples;
2. por que isso importa;
3. exemplo real;
4. onde isso quebra;
5. como pensar melhor sobre o tema;
6. referências.

### 6.3 Forma de explicar

Sempre que possível:

- usar comparações simples;
- explicar sigla antes de aprofundar;
- mostrar uma versão “curta” e depois uma “mais técnica”;
- trazer exemplos de QA, PM e times de produto, não só exemplos de dev hardcore.

### 6.4 Regra editorial importante

O site não deve parecer fanboy de ferramenta.

Ele deve mostrar categorias e padrões.
Ferramentas entram como exemplos concretos do mercado, não como verdade definitiva.

---

## 7. Arquitetura de informação

## Página inicial `/`

A home deve funcionar como:

- manifesto curto;
- mapa de navegação;
- índice visual das sessões;
- ponto de entrada democrático.

### Estrutura da home

#### 7.1 Hero

Conteúdo:

- título forte;
- subtítulo explicando a promessa;
- CTA principal: “Começar pelo básico”;
- CTA secundário: “Ver o mapa completo”.

Possível direção de copy:

- “O que você realmente precisa entender para trabalhar com engenharia em um mundo de agentes”
- “Sem hype. Sem buzzword vazia. Só o mapa que importa.”

#### 7.2 Bloco “Por que isso existe”

Explica em linguagem simples:

- IA já entrou no trabalho de software;
- muita gente está usando, pouca gente entende o todo;
- o site existe para organizar esse caos.

#### 7.3 Bloco “Mapa da jornada”

Cards clicáveis para cada sessão.

#### 7.4 Bloco “Como estudar”

Explica que:

- dá para ler linearmente;
- dá para navegar por dúvida;
- cada sessão termina com referências.

#### 7.5 Bloco “Maturidade”

Uma visualização resumida da evolução:
Consulta → Autocomplete → Vibe Coding → SDD → Harness Engineering

#### 7.6 Footer editorial

- créditos;
- fontes;
- versão do conteúdo;
- data da última revisão.

---

## 8. Sessões do produto

## Sessão 0: O que é um AI-Native Engineer

**Slug:** `/ai-native-engineer/`

Essa sessão deve existir antes ou logo após o hero, porque ela enquadra todo o resto.

### Objetivo

Responder:

- o que o mercado espera hoje;
- por que isso não significa “todo mundo virou engenheiro”;
- por que o papel humano ainda importa;
- por que contexto, revisão e decisão continuam centrais.

### Estrutura da página

- definição curta;
- definição expandida;
- “o que mudou no trabalho”;
- “o que não mudou”;
- checklist: “você já está operando de forma AI-native?”;
- bloco de anti-padrões.

### Interações

- self-assessment com 5 a 7 perguntas;
- score local simples, salvo em `localStorage`;
- resultado com três perfis:
  - explorando
  - operando
  - estruturando

---

## Sessão 1: Novas terminologias populares

**Slug:** `/glossario/`

### Objetivo

Dar alfabetização mínima para qualquer pessoa conseguir continuar o site sem se perder.

### Conceitos obrigatórios

- LLM
- modelo
- inferência
- contexto
- token
- prompt
- system prompt
- IDE
- CLI
- agente
- agente de código
- autocomplete
- contexto de código
- MCP
- harness

### Estrutura da página

- intro curta: “se essas palavras parecem tudo a mesma coisa, você não está sozinho”
- grid de cards;
- cada card abre:
  - definição simples;
  - definição mais técnica;
  - exemplo real;
  - erro comum.

### Interações

- hover/click cards;
- modo “explicação curta” e “explicação técnica”;
- mini quiz no final;
- botão “ver isso em ferramentas reais”.

### Observação editorial

“Harness” e “SDD” devem ser tratados com honestidade:

- explicar que são termos usados em certos círculos;
- deixar claro que nem sempre há uma padronização universal;
- definir como o site vai usar esses termos.

---

## Sessão 2: Ferramentas: IDEs vs CLI

**Slug:** `/ferramentas/`

### Objetivo

Ajudar o usuário a entender categorias de ferramentas, e não apenas decorar nomes.

### Eixo didático principal

- ferramentas integradas ao editor/IDE;
- ferramentas centradas em terminal/CLI;
- agentes que operam com mais autonomia;
- onde cada uma faz mais sentido.

### Exemplos de IDE / agent-first IDE

- Cursor
- Antigravity
- GitHub Copilot no editor

### Exemplos de terminal / CLI

- Claude Code
- Codex CLI
- OpenCode
- GitHub Copilot CLI como adjacente

### O que essa página precisa ensinar

- IDE dá contexto visual e fluxo mais familiar;
- CLI tende a dar mais sensação de controle operacional e proximidade com ambiente real;
- algumas ferramentas cruzam superfícies e não ficam presas a uma categoria pura;
- a escolha da ferramenta muda menos do que o workflow, o critério e a validação.

### Estrutura da página

- comparação por categorias;
- tabela simples:
  - onde roda
  - melhor para
  - tipo de usuário
  - pontos fortes
  - risco comum
- bloco “não escolha por hype, escolha por fricção do seu fluxo”.

### Interações

- filtros por tipo de usuário:
  - não técnico
  - junior
  - dev experiente
  - liderança
- comparador de ferramentas com cards expansíveis;
- toggle “ver por interface” vs “ver por workflow”.

### Tom importante

Essa página deve deixar claro:
**ferramenta não substitui método**.

---

## Sessão 3: LLMs e os modelos mais usados nesse contexto

**Slug:** `/modelos/`

### Objetivo

Explicar o que é um modelo e como pensar sobre modelo sem virar refém de benchmark.

### O que a página precisa ensinar

- produto e modelo são coisas diferentes;
- o usuário geralmente interage com um produto que embute um ou mais modelos;
- modelos variam em:
  - raciocínio
  - velocidade
  - custo
  - janela de contexto
  - habilidade em código
  - confiabilidade em follow-through
- não existe “melhor modelo” absoluto;
- existe melhor modelo para certo tipo de tarefa.

### Organização sugerida

Ao invés de focar em ranking, focar em perfis:

- modelos rápidos para consulta e exploração;
- modelos fortes para planejamento e arquitetura;
- modelos fortes para edição e execução de código;
- modelos open/open-weight como camada importante do ecossistema.

### Interações

- seletor de tarefa:
  - explicar conceito
  - revisar código
  - planejar feature
  - executar refactor
  - gerar primeira versão
- a UI mostra quais características do modelo importam mais para cada caso.

### Cuidado editorial

Evitar transformar a página em leaderboard.
O objetivo é ensinar leitura crítica, não culto a fornecedor.

---

## Sessão 4: A evolução do desenvolvimento com IA

**Slug:** `/maturidade/`

Essa é a sessão mais importante do produto.

### Objetivo

Explicar a progressão histórica e prática do uso de IA no desenvolvimento.

### Fases obrigatórias

#### Fase 1: IA para consulta

Uso:

- perguntar conceitos;
- resumir docs;
- explorar ideias;
- pedir exemplos.

Valor:

- acelera aprendizado;
- reduz tempo de pesquisa;
- ajuda quem não sabe por onde começar.

Problemas:

- superficialidade;
- alucinação;
- falsa sensação de entendimento;
- dependência sem construção de critério.

#### Fase 2: IA para autocomplete e pair assistance

Uso:

- completar código;
- sugerir função;
- refator pequeno;
- explicar trecho.

Valor:

- acelera loop local;
- bom para tarefas pequenas;
- reduz atrito de digitação e boilerplate.

Problemas:

- contexto parcial;
- sugestões localmente boas e globalmente ruins;
- acelera produção de dívida se o time não revisa bem.

#### Fase 3: Vibe coding

Uso:

- falar em linguagem natural o que quer;
- deixar a ferramenta gerar bastante coisa;
- explorar protótipos, MVPs, spikes, microprodutos.

Valor:

- compressão radical de tempo de prototipagem;
- baixo atrito de entrada;
- ótimo para experimentar.

Problemas:

- arquitetura frágil;
- inconsistência;
- falsa confiança;
- facilidade para gerar produto que parece pronto mas não está;
- debugging e manutenção podem custar caro depois.

#### Fase 4: SDD como evolução do vibe coding

Usaremos SDD aqui como **Spec-Driven Development**.

O site deve explicar com honestidade:

- isso não é uma sigla universal como HTTP ou SQL;
- aqui ela representa um modo de trabalhar guiado por especificação, critérios e artefatos.

Uso:

- descrever objetivo, escopo, restrições, critérios de aceite, contexto e plano;
- pedir execução a partir disso.

Valor:

- reduz ambiguidade;
- melhora consistência;
- aumenta chance de saída útil;
- ajuda colaboração entre humano e agente.

Problemas:

- exige disciplina;
- mais fricção no começo;
- especificação ruim continua gerando resultado ruim.

#### Fase 5: Harness Engineering

Aqui vamos usar “Harness Engineering” como a camada em que o time para de pensar só em prompt e começa a pensar no **sistema de trabalho do agente**.

A página deve explicar que, na prática, isso envolve:

- instruções;
- ferramentas;
- modelo;
- regras;
- contexto persistente;
- validações;
- agentes especializados;
- arquivos de apoio;
- avaliação do resultado.

Essa leitura conversa com a forma como o Cursor descreve agent harnesses: instruções, tools e model orquestrados juntos.

Valor:

- escala qualidade;
- reduz variação;
- ajuda repetibilidade;
- permite workflows mais consistentes entre pessoas e times.

Problemas:

- maior complexidade operacional;
- risco de excesso de framework;
- precisa de manutenção;
- não salva time sem bons fundamentos de engenharia.

### Estrutura da página

- timeline ou stepper;
- cada fase com:
  - o que é;
  - por que surgiu;
  - onde funciona;
  - onde quebra;
  - o que a próxima fase tenta resolver.

### Interações

- slider horizontal ou stepper vertical;
- modo “antes e depois”;
- casos práticos:
  - “preciso subir um MVP”
  - “preciso refatorar sistema legado”
  - “preciso manter produto em produção”
- a UI mostra qual fase sozinha não é suficiente.

---

## Sessão 5: Como operar de forma AI-native na prática

**Slug:** `/como-operar/`

Essa sessão fecha o raciocínio.

### Objetivo

Traduzir teoria em prática cotidiana.

### O que deve ensinar

- começar com plano;
- definir objetivo verificável;
- passar contexto suficiente;
- pedir execução em etapas quando necessário;
- validar saída com testes, lint, typecheck, review e leitura humana;
- tratar IA como colaborador acelerador, não como autoridade final;
- construir uma base de regras, prompts úteis, checklists e artefatos repetíveis.

### Estrutura

- workflow recomendado;
- checklist “antes de pedir”;
- checklist “antes de aceitar”;
- exemplos por perfil:
  - PM
  - QA
  - junior dev
  - senior dev
  - tech lead

### Interações

- gerador de checklist;
- toggle por perfil;
- “playbook card” copiável.

---

## 9. Template padrão das páginas de detalhe

Toda página de sessão deve seguir uma estrutura consistente:

1. **Hero da sessão**
   - título
   - subtítulo
   - nível de dificuldade
   - tempo de leitura

2. **Resumo em linguagem simples**
   - “em 30 segundos”

3. **Explicação principal**
   - narrativa curta e clara

4. **Por que isso importa**
   - impacto prático

5. **Exemplo aplicado**
   - caso de uso real

6. **Onde isso quebra**
   - riscos e anti-padrões

7. **Bloco interativo**
   - comparação, quiz, timeline ou simulador

8. **Resumo final**
   - “o que levar daqui”

9. **Referências**
   - artigos
   - vídeos
   - docs oficiais

---

## 10. Estratégia de referências ao fim de cada sessão

Cada sessão termina com uma área fixa chamada:
**“Quer se aprofundar?”**

### Organização da área

- 2 a 4 links “comece aqui”
- 2 a 4 links “docs e fontes primárias”
- 1 a 3 links “vídeos / talks”
- 1 bloco “leitura crítica” quando fizer sentido

### Regras de curadoria

- priorizar fonte primária;
- evitar youtuber genérico como fonte central;
- sempre que houver doc oficial, dar preferência;
- usar 1 ou 2 leituras críticas para equilibrar discurso;
- mostrar tipo do link:
  - artigo
  - documentação
  - talk
  - vídeo
  - pesquisa

---

## 11. Direção visual: Neo Brutalism

## 11.1 Princípio central

A interface deve usar Neo Brutalism não como fantasia visual, mas como linguagem coerente para:

- chamar atenção;
- parecer contemporânea;
- manter identidade forte;
- reforçar clareza estrutural.

A pesquisa aponta um conjunto de características recorrentes:

- alto contraste;
- layout em blocos;
- cores fortes;
- bordas grossas;
- tipografia grande;
- elementos “raw” ou menos polidos;
- sombras duras, simples e deslocadas.

Mas existe um ponto crítico:
**sem equilíbrio, o estilo pode virar ruído e prejudicar acessibilidade e entendimento**.

### 11.2 Tradução prática para este projeto

#### Paleta

Usar no máximo:

- 1 cor base clara;
- preto forte;
- 2 ou 3 acentos vibrantes.

Sugestão de direção:

- fundo claro levemente quente;
- preto puro para contorno e tipografia principal;
- acentos como amarelo, azul elétrico, verde ácido ou coral.

#### Tipografia

- headlines com peso alto;
- corpo com fonte neutra e muito legível;
- evitar fonte “maluca” em parágrafos.

#### Bordas e sombras

- bordas pretas grossas;
- sombras deslocadas em uma direção;
- sem blur;
- sem glassmorphism;
- sem excesso de gradiente.

#### Layout

- cards grandes;
- grids com ritmo forte;
- leve assimetria controlada;
- bastante respiro entre blocos.

#### Componentes

- botões com estados claros;
- links visíveis;
- hover simples e óbvio;
- foco de teclado muito aparente.

#### Ilustrações e ornamentos

- formas geométricas simples;
- adesivos, selos e labels podem existir;
- usar pouco;
- não poluir áreas densas de conteúdo.

### 11.3 Regra mais importante de UX

Neo Brutalism aqui deve ser:
**impactante no primeiro olhar, mas fácil de usar no quinto minuto**.

Ou seja:

- nada de sacrificar leitura;
- nada de esconder navegação;
- nada de interações misteriosas.

### 11.4 Diretrizes responsivas

No mobile:

- priorizar leitura linear;
- colapsar grids em pilha;
- manter contraste e toque confortável;
- reduzir elementos decorativos;
- preservar o peso visual sem esmagar o conteúdo.

### 11.5 Acessibilidade

Mesmo com visual forte:

- contraste WCAG aceitável;
- foco visível;
- navegação por teclado;
- sem depender apenas de cor para estado;
- textos e CTAs sempre legíveis.

---

## 12. Interação e Creative Development

O site deve ser interativo, mas não virar playground gratuito.

### Interações recomendadas

- cards expansíveis;
- stepper de maturidade;
- filtros de comparação;
- quizzes rápidos;
- checklists interativos;
- microanimações de hover e entrada;
- progresso de leitura;
- sticky nav por sessão.

### Interações a evitar no MVP

- parallax pesado;
- smooth scroll intrusivo;
- transições que atrasam leitura;
- loaders desnecessários;
- canvas/3D sem valor pedagógico real.

### Regra

Toda interação precisa cumprir um de três papéis:

1. explicar melhor;
2. organizar melhor;
3. aumentar retenção sem reduzir clareza.

Se não cumprir um desses papéis, sai.

---

## 13. Melhor stack técnica para GitHub Pages

## Recomendação principal

**Astro + TypeScript + MDX + Content Collections + React islands + Motion + CSS Modules / tokens CSS**

### 13.1 Por que Astro é a melhor escolha aqui

Este projeto é mais conteúdo-first do que app-first.

Precisamos de:

- páginas estáticas reais;
- bom carregamento;
- boa indexação;
- rotas simples;
- detalhamento por página;
- componentes interativos apenas onde fizer sentido;
- deploy fácil em GitHub Pages.

Astro encaixa muito bem porque:

- tem guia oficial para deploy em GitHub Pages;
- suporta `base` e `site` para repositório ou domínio customizado;
- funciona muito bem para sites de conteúdo;
- permite usar MDX para conteúdo rico;
- permite usar content collections com schema, validação e tipagem;
- permite hidratar só os blocos interativos como islands, mantendo o resto leve.

### 13.2 Por que não usar uma SPA React pura como primeira escolha

Uma SPA com Vite + React funcionaria, mas não é a melhor primeira escolha para este caso porque:

- o projeto é fortemente editorial;
- ter páginas geradas estaticamente é melhor para conteúdo e manutenção;
- usar React para tudo tende a subir JS sem necessidade;
- a principal necessidade de interatividade é localizada, não global.

### 13.3 Onde React entra

React entra somente nas ilhas interativas:

- comparadores;
- quizzes;
- stepper de maturidade;
- filtros;
- checklists;
- progress UI.

### 13.4 Motion

Usar `motion` apenas onde a animação realmente melhora compreensão:

- entrada de cards;
- mudança de estado;
- transições entre fases;
- feedback de interação.

Para hover simples e pequenos efeitos, preferir CSS.

### 13.5 Estilo

Não usar Tailwind como camada principal do visual.

Motivo:

- o projeto pede linguagem visual autoral;
- Neo Brutalism exige decisões visuais mais cuidadas;
- CSS Modules + design tokens deixam o sistema mais explícito e menos “cara de template”.

Tailwind pode acelerar, mas aqui a chance de o resultado ficar genérico aumenta.

### 13.6 Stack resumida

- **Framework:** Astro
- **Linguagem:** TypeScript
- **Conteúdo:** MDX
- **Estrutura de conteúdo:** Astro Content Collections
- **Interatividade:** React islands
- **Animação:** Motion
- **Estilos:** CSS Modules + CSS variables + arquivo global de tokens
- **Lint/format:** ESLint + Prettier
- **Deploy:** GitHub Actions para GitHub Pages

---

## 14. Estrutura técnica sugerida

```txt
/
├─ public/
│  ├─ favicon/
│  ├─ og/
│  └─ CNAME
├─ src/
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ glossary/
│  │  ├─ maturity/
│  │  ├─ tooling/
│  │  └─ references/
│  ├─ content/
│  │  ├─ sessions/
│  │  │  ├─ ai-native-engineer.mdx
│  │  │  ├─ glossario.mdx
│  │  │  ├─ ferramentas.mdx
│  │  │  ├─ modelos.mdx
│  │  │  ├─ maturidade.mdx
│  │  │  └─ como-operar.mdx
│  │  ├─ references/
│  │  │  ├─ artigos.json
│  │  │  └─ videos.json
│  │  └─ config.ts
│  ├─ data/
│  │  ├─ tools.ts
│  │  ├─ models.ts
│  │  └─ glossary.ts
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ SessionLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ sessions/
│  │  │  └─ [slug].astro
│  │  └─ 404.astro
│  ├─ styles/
│  │  ├─ globals.css
│  │  ├─ tokens.css
│  │  └─ utilities.css
│  └─ lib/
│     ├─ content.ts
│     └─ seo.ts
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 15. Modelo de conteúdo

## Collection: `sessions`

Cada sessão em MDX com frontmatter:

```yaml
title:
slug:
order:
summary:
readingTime:
level:
tags:
heroLabel:
references:
updatedAt:
```

### Vantagens

- conteúdo separado da UI;
- fácil manutenção;
- tipagem;
- ordem clara;
- pode crescer sem acoplar tudo no código.

## Collection: `references`

Pode começar em JSON/YAML e depois migrar se precisar.
Campos:

- title
- url
- type
- source
- category
- relatedSessions
- priority

---

## 16. Componentes centrais

### Home

- Hero
- WhyThisExists
- JourneyMap
- SessionCards
- MaturityPreview
- FooterSources

### Session pages

- SessionHero
- SectionNav
- PlainLanguageSummary
- InsightBlock
- InteractiveBlock
- AntiPatternBlock
- ReferencesList
- NextSessionCTA

### Interativos

- GlossaryCardGrid
- ToolComparison
- ModelTaskMatcher
- MaturityStepper
- SelfAssessment
- ProgressTracker

---

## 17. SEO, performance e distribuição

### SEO

Mesmo sendo projeto educacional e de referência, SEO importa:

- títulos claros;
- metadados por sessão;
- OG tags;
- headings corretos;
- slug limpo.

### Performance

Objetivo:

- excelente leitura no mobile;
- baixo JS;
- imagens mínimas;
- tipografia bem carregada.

### Regras

- islands só onde necessário;
- preferir SVG e CSS a assets pesados;
- evitar biblioteca grande por detalhe visual;
- medir Lighthouse em mobile desde cedo.

---

## 18. Responsividade

### Breakpoints sugeridos

- mobile: até 767px
- tablet: 768px até 1023px
- desktop: 1024px+
- wide: 1440px+

### Estratégia

No mobile:

- home mais linear;
- cards em coluna;
- tabela vira bloco comparativo;
- sticky nav pode virar dropdown;
- animações reduzidas.

No desktop:

- grid forte;
- maior experimentação visual;
- navegação lateral ou sticky contextual nas páginas longas.

---

## 19. Plano de implementação

## Fase 0: Discovery e base conceitual

### Entregáveis

- fechamento de escopo;
- mapa das sessões;
- decisões editoriais;
- design principles;
- lista inicial de fontes;
- wireframe low-fi.

### Saída esperada

- estrutura do conteúdo aprovada;
- stack fechada;
- sem código visual ainda.

---

## Fase 1: Fundação do projeto

### Entregáveis

- Astro configurado;
- TS configurado;
- MDX configurado;
- content collections configuradas;
- tokens CSS;
- layout base;
- deploy inicial em GH Pages.

### Critérios

- rota principal funcionando;
- uma sessão de exemplo renderizando;
- deploy automático no push.

---

## Fase 2: Sistema visual Neo Brutalism

### Entregáveis

- paleta;
- tipografia;
- grid;
- botões;
- cards;
- estados;
- sombras e bordas;
- sistema de spacing.

### Critérios

- linguagem visual consistente;
- mobile first validado;
- sem perda de legibilidade.

---

## Fase 3: Home page

### Entregáveis

- hero;
- bloco de contexto;
- cards de sessões;
- preview da maturidade;
- footer com fontes.

### Critérios

- home explica o produto sozinha;
- CTA claro;
- navegação óbvia.

---

## Fase 4: Templates de sessão

### Entregáveis

- layout de páginas de detalhe;
- sticky nav;
- área de resumo;
- área de referências;
- padrão de blocos narrativos.

### Critérios

- qualquer sessão nova pode ser criada sem reinventar layout.

---

## Fase 5: Conteúdo núcleo

### Entregáveis

- sessão AI-native engineer;
- glossário;
- ferramentas;
- modelos;
- maturidade;
- como operar.

### Critérios

- todas as sessões publicadas;
- linguagem consistente;
- sem placeholders críticos.

---

## Fase 6: Interatividade

### Entregáveis

- glossary cards;
- comparador de ferramentas;
- matcher de modelos por tarefa;
- stepper de maturidade;
- self-assessment;
- progress tracker.

### Critérios

- cada interação melhora entendimento;
- sem comprometer performance.

---

## Fase 7: Polimento final

### Entregáveis

- acessibilidade;
- ajuste de contraste;
- SEO;
- OG images;
- 404;
- revisão textual;
- revisão de links.

### Critérios

- experiência sólida no mobile;
- deploy estável;
- conteúdo confiável.

---

## 20. Definition of Done

Uma versão MVP está pronta quando:

- a home estiver completa;
- todas as sessões principais existirem;
- cada sessão tiver conteúdo, bloco interativo e referências;
- design Neo Brutalism estiver consistente;
- mobile estiver bom de verdade;
- Lighthouse não estiver degradado por exagero visual;
- deploy automático em GitHub Pages estiver funcionando;
- as páginas forem legíveis e úteis para alguém não técnico.

---

## 21. Riscos principais

### 21.1 Risco de conteúdo virar buzzword soup

Mitigação:

- exemplos concretos;
- explicação simples antes da técnica;
- anti-padrões em toda sessão.

### 21.2 Risco de Neo Brutalism atrapalhar leitura

Mitigação:

- contraste validado;
- paleta limitada;
- corpo de texto neutro;
- whitespace generoso.

### 21.3 Risco de ferramenta dominar a narrativa

Mitigação:

- ensinar categorias;
- usar ferramentas como exemplos;
- focar em workflow.

### 21.4 Risco de interatividade virar peso morto

Mitigação:

- só entrar se explicar melhor;
- JS mínimo;
- islands localizadas.

### 21.5 Risco de conteúdo ficar velho rápido

Mitigação:

- falar em padrões e capacidades;
- citar ferramentas como snapshots do mercado;
- incluir `updatedAt` por sessão;
- revisão periódica.

---

## 22. Não objetivos do MVP

Não faz parte do primeiro escopo:

- autenticação;
- busca complexa;
- CMS headless;
- gamificação pesada;
- dark mode obrigatório;
- internacionalização;
- ranking de modelos;
- área de usuário.

---

## 23. Backlog pós-MVP

- busca local;
- trilhas por perfil;
- versão em inglês;
- página “como montar seu workflow”;
- glossário global com filtro;
- changelog de mercado;
- newsletter;
- modo print / exportar sessão em PDF.

---

## 24. Recomendação final de posicionamento

O produto deve se posicionar como:

**um site educacional, visualmente forte, editorialmente claro e tecnicamente leve, que transforma um tema confuso em uma jornada compreensível.**

Ele não deve competir com docs oficiais.
Ele deve funcionar como:

- mapa;
- tradução;
- filtro crítico;
- ponto de partida confiável.

---

## 25. Seed references para usar na curadoria inicial

### Mercado e AI-native engineering

- Addy Osmani, The AI-Native Software Engineer
  https://addyo.substack.com/p/the-ai-native-software-engineer
- Stack Overflow Developer Survey 2025, AI
  https://survey.stackoverflow.co/2025/ai
- Google DORA 2025 summary
  https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/
- Anthropic, AI’s impact on software development
  https://www.anthropic.com/news/impact-software-development
- Anthropic Economic Index 2026
  https://www.anthropic.com/research/economic-index-march-2026-report
- GitHub Octoverse 2025
  https://octoverse.github.com/

### Tooling references

- Cursor, Best practices for coding with agents
  https://cursor.com/blog/agent-best-practices
- Cursor docs
  https://cursor.com/docs
- Claude Code overview
  https://code.claude.com/docs/en/overview
- Codex CLI
  https://developers.openai.com/codex/cli
- OpenCode docs
  https://opencode.ai/docs/
- Google Antigravity Codelab
  https://codelabs.developers.google.com/getting-started-google-antigravity
- GitHub Copilot
  https://github.com/features/copilot

### Design / Neo Brutalism

- Nielsen Norman Group, Neobrutalism: Definition and Best Practices
  https://www.nngroup.com/articles/neobrutalism/
- Bejamas, Neubrutalism UI trend
  https://bejamas.com/blog/neubrutalism-web-design-trend

### Stack / deployment

- Astro, Deploy to GitHub Pages
  https://docs.astro.build/en/guides/deploy/github/
- Astro, Content Collections
  https://docs.astro.build/en/guides/content-collections/
- Astro, MDX integration
  https://docs.astro.build/en/guides/integrations-guide/mdx/
- Vite, Static deploy guide
  https://vite.dev/guide/static-deploy
- Motion for React
  https://motion.dev/docs/react

---

## 26. Decisão final

### Produto

Fazer um site educacional interativo, em PT-BR, focado em clareza e leitura crítica sobre AI-native engineering.

### Estrutura

Home editorial + páginas de detalhe por sessão.

### Conteúdo

Começar com:

1. O que é AI-native engineer
2. Glossário
3. Ferramentas
4. Modelos
5. Maturidade do uso de IA no desenvolvimento
6. Como operar na prática

### Design

Neo Brutalism controlado, com foco em clareza.

### Stack

Astro + TypeScript + MDX + Content Collections + React islands + Motion + CSS Modules.

### Deploy

GitHub Pages com GitHub Actions.

### Regra-mãe

**Ensinar sem idolatrar ferramenta. Explicar sem academizar. Impactar visualmente sem prejudicar leitura.**
