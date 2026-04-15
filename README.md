# AI-Native Engineering

**Sem hype. Sem buzzword vazia. Só o mapa que importa.**

Um site educacional, interativo e visualmente forte que ensina o que você realmente precisa entender para trabalhar com engenharia em um mundo de agentes — em linguagem humana, acessível, e em português.

## O problema

O mercado já trata IA como parte normal do trabalho de software. A adoção é massiva, a produtividade percebida subiu, mas a confiança não acompanhou. A lacuna não está entre usar IA e não usar — está entre **usar mal** e **usar bem**.

Este site existe para fechar essa lacuna: organizar o caos, traduzir a terminologia e mostrar que AI-native engineering é sobre **contexto, critério, validação e fluxo** — não sobre "pedir código".

## Para quem

- QA, Product Managers, Product Designers, Tech Recruiters, founders, liderança de tecnologia
- Devs juniores e plenos que ainda confundem ferramenta, modelo, agente, CLI e workflow
- Qualquer pessoa curiosa que quer um mapa mental claro do tema

## Conteúdo

O site é organizado em 6 sessões progressivas:

| #   | Sessão                        | Rota                   | O que ensina                                                        |
| --- | ----------------------------- | ---------------------- | ------------------------------------------------------------------- |
| 0   | O que é um AI-Native Engineer | `/ai-native-engineer/` | Definição, o que mudou, o que não mudou, self-assessment            |
| 1   | Glossário                     | `/glossario/`          | LLM, modelo, token, prompt, agente, harness, MCP e mais             |
| 2   | Ferramentas                   | `/ferramentas/`        | IDEs vs CLI, categorias, comparação por perfil de usuário           |
| 3   | Modelos                       | `/modelos/`            | Produto vs modelo, perfis por tarefa, leitura crítica de benchmarks |
| 4   | Maturidade                    | `/maturidade/`         | Consulta → Autocomplete → Vibe Coding → SDD → Harness Engineering   |
| 5   | Como operar                   | `/como-operar/`        | Workflow, checklists, playbooks por perfil                          |

Cada sessão segue um template fixo: resumo em 30 segundos → explicação principal → por que importa → exemplo real → onde quebra → bloco interativo → referências.

## Stack

| Camada         | Tecnologia                                  |
| -------------- | ------------------------------------------- |
| Framework      | [Astro](https://astro.build)                |
| Linguagem      | TypeScript                                  |
| Conteúdo       | MDX + Content Collections                   |
| Interatividade | React (islands apenas onde necessário)      |
| Animação       | [Motion](https://motion.dev)                |
| Estilos        | CSS Modules + CSS Variables + design tokens |
| Lint/Format    | ESLint + Prettier                           |
| Deploy         | GitHub Actions → GitHub Pages               |

### Por que Astro

O projeto é content-first, não app-first. Astro gera HTML estático e hidrata apenas os blocos interativos (islands), mantendo JS mínimo. Perfeito para um site educacional que precisa ser rápido no mobile.

### Por que não Tailwind

Neo Brutalism pede linguagem visual autoral — bordas grossas, sombras duras, paleta controlada. CSS Modules + design tokens dão controle explícito sem cara de template.

## Desenvolvimento

```bash
npm install        # Instalar dependências
npm run dev        # Dev server com hot reload
npm run build      # Build estático
npm run preview    # Preview do build de produção
npm run lint       # ESLint
npm run format     # Prettier
```

## Design: Neo Brutalism

- Alto contraste, bordas pretas grossas, sombras deslocadas sem blur
- Paleta limitada: fundo claro quente, preto puro, 2-3 acentos vibrantes
- Headlines pesadas, corpo neutro e legível
- Mobile-first com breakpoints em 768px, 1024px e 1440px
- WCAG compliance, foco visível, `prefers-reduced-motion`

**Regra central:** impactante no primeiro olhar, fácil de usar no quinto minuto.

## Princípios editoriais

- Ensinar sem idolatrar ferramenta — mostrar categorias e padrões
- Explicação simples primeiro, profundidade técnica depois
- Exemplos de QA, PM e produto — não só dev hardcore
- Toda interação precisa explicar melhor, organizar melhor ou aumentar retenção
- Siglas explicadas antes de qualquer deep-dive

## Licença

[MIT](LICENSE)
