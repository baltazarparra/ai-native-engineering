---
title: 'Graph Engineering: quando o fluxo precisa aparecer'
slug: 'graph-engineering-quando-o-fluxo-precisa-aparecer'
lang: 'pt-BR'
description: 'Como explicitar dependências, caminhos, estado e decisões humanas quando um único loop já não consegue representar o trabalho.'
publishedAt: 2026-07-31
draft: false
tags: ['graph engineering', 'orquestração', 'sistemas multiagente']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-graph'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engenharia além do prompt'
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

Nosso loop já escolhe um erro de TypeScript, corrige, verifica e repete. Então aparecem três erros na camada de dados, cinco na Interface de Programação de Aplicações, ou API, e doze na interface visual. Algumas correções dependem de uma decisão no tipo central. Outras podem avançar juntas. Uma mudança de contrato exige aprovação.

Um único ciclo começa a esconder perguntas importantes: o que depende de quê, quem pode decidir e para onde cada falha deve voltar.

Neste artigo, **Graph Engineering significa engenharia do grafo de execução e orquestração**. Grafos de conhecimento são outro assunto. Loops continuam no desenho: um loop é um grafo cíclico pequeno, e o grafo maior conecta passos, decisões e loops.

O nome é recente e ainda não tem uma definição única. As mecânicas são antigas. Flowcharts, máquinas de estado, grafos de build e pipelines de Integração e Entrega Contínuas, ou CI/CD, já explicitam fluxo e dependências há décadas.

## Desenhe o trabalho antes de distribuí-lo

Imagine este fluxo:

```text
triagem -> diagnóstico -> decisão de contrato, se necessária
        -> atualização do tipo central
        -> implementação da API + implementação da interface
        -> testes dos dois ramos -> typecheck -> revisão
        -> aprovação humana -> concluído
```

Se os testes da API falham, o trabalho volta ao ramo da API. Se a interface espera uma decisão, ela não começa. Se o contrato público muda, uma pessoa aprova antes da implementação.

Isso é um grafo dirigido. As caixas são nós, as setas são arestas e cada caminho representa uma transição permitida.

O agente ainda pode investigar livremente dentro de um nó. O sistema apenas preserva os gates e caminhos que não deveriam ser inventados no meio da execução.

## Nós fazem trabalho. Arestas definem o caminho

Um nó pode ser código comum, uma chamada a um modelo, um agente com ferramentas, uma aprovação humana, um loop inteiro ou uma espera por evento.

Nem todo nó precisa de inteligência. Quanto mais previsível a etapa, mais sentido faz usar código determinístico. Rodar `npm run typecheck`, ler o código de saída e escolher o próximo caminho não exige modelo de linguagem. Diagnosticar a causa de um tipo incompatível talvez exija.

Sistemas descritos por Anthropic e OpenAI combinam justamente essas peças: roteadores, sequências programadas, workers, handoffs e agentes que usam ferramentas.

As arestas também carregam mais do que ordem. Podem transportar dados, condições, dependências, limites e autoridade. Entre diagnóstico e implementação, uma condição pergunta se a correção muda um contrato público. Se mudar, o fluxo passa pela aprovação. Se não, continua.

Em código tradicional, isso seria um `if`, uma transição de máquina de estado ou uma regra de pipeline. O grafo torna essa lógica visível, testável e observável.

## Estado é a memória do fluxo

Cada nó precisa receber apenas o necessário para cumprir sua responsabilidade. Um estado compartilhado pode guardar objetivo, decisões, artefatos, tentativas e resultados:

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

Frameworks como LangGraph formalizam essa ideia com estado, nós e arestas. A ferramenta pode variar. O princípio é o mesmo de um workflow engine: transições leem e atualizam estado durável.

Checkpoints permitem retomar depois de uma falha. Se o ramo da API passou, a queda do worker da interface não deveria apagar esse resultado. O estado persistido também cria auditoria, porque mostra qual decisão liberou cada caminho.

O perigo é transformar o estado numa sacola global que todos modificam. Contratos pequenos e ownership claro entre nós funcionam melhor.

## Paralelismo exige independência

Agentes paralelos prometem velocidade, mas os ramos precisam avançar sem disputar o mesmo estado ou tomar a mesma decisão.

Depois que o tipo central foi aprovado, API e interface talvez possam trabalhar ao mesmo tempo. Antes disso, dois agentes só criariam interpretações diferentes do contrato.

Um fan-out abre os ramos. Um fan-in espera e reúne os resultados. Worktrees ou sandboxes separados evitam colisões de arquivos. Ownership explícito define quem pode mudar cada módulo. No encontro, uma etapa de integração verifica o sistema completo.

A Anthropic recomenda paralelização quando as subtarefas são realmente independentes ou quando perspectivas separadas ajudam a avaliação. A Kimi apresenta seu Agent Swarm para trabalho amplo e paralelizável, mas ainda como research preview e com números do próprio fornecedor. Isso não prova que muitos agentes ajudam qualquer projeto. Em código muito acoplado, eles podem apenas multiplicar o trabalho de integração.

## Handoff transfere responsabilidade

Um handoff não é só uma mensagem dizendo “continue daqui”. Ele precisa informar:

- qual objetivo continua ativo;
- o que já foi comprovado;
- quais artefatos são a fonte de verdade;
- quais decisões estão bloqueadas;
- o que o próximo nó pode executar;
- qual saída encerra sua responsabilidade.

É parecido com uma passagem entre times ou uma mensagem bem desenhada numa fila. O receptor não deveria reconstruir a intenção lendo um chat enorme.

Subagentes da Z.ai e guias de orquestração da OpenAI usam managers e handoffs. Mesmo assim, continuam valendo perguntas de sistemas distribuídos: quem é dono do estado, o que acontece com falhas parciais e como evitar trabalho duplicado.

O manager pode virar gargalo. Se lê todos os arquivos e revisa toda saída, concentra contexto demais. Uma delegação saudável devolve evidência compacta e mantém a responsabilidade perto de quem executa.

## Falhas voltam ao nó responsável

Se apenas os testes da interface falharam, repetir diagnóstico, decisão e implementação da API desperdiça trabalho. O grafo permite recuperação específica: teste falhou, volta ao ramo; integração falhou, volta à reconciliação; requisito faltou, chama uma pessoa; infraestrutura oscilou, tenta novamente com limite.

Por isso grafos de produção costumam ter ciclos. Um grafo direcionado acíclico, ou DAG na sigla em inglês, funciona quando as dependências só avançam. Workflows de agentes frequentemente precisam corrigir e voltar. LangChain destaca que loops são uma forma simples de grafo.

Cada retorno ainda precisa dos freios do artigo anterior: orçamento, máximo de tentativas, checkpoint e escalada. Desenhar uma seta de volta não torna a repetição segura.

## Pessoas ocupam nós com autoridade real

Uma caixa “revisão humana” no diagrama não resolve governança. A pessoa precisa receber evidência, ter tempo para julgar e poder bloquear.

No nosso fluxo, a decisão de contrato vem antes dos ramos porque mudar depois multiplicaria retrabalho. A aprovação final recebe diff, checks e decisões registradas. O agente prepara a evidência. O veredito pertence a quem responde pelo sistema.

Addy Osmani chama de comprehension debt a distância entre o código produzido e o quanto alguém ainda entende. Um grafo eficiente pode aumentar essa dívida se as pessoas passam a confiar apenas nas luzes verdes.

Também não vale desenhar grafo para tudo. Investigação aberta pode funcionar melhor num único loop bem instrumentado. Use grafo quando há dependências estáveis, gates obrigatórios, permissões diferentes, paralelismo real ou recuperação auditável. Muitos sistemas combinam os dois: o grafo controla triagem e aprovação; dentro do diagnóstico, um agente explora em loop.

Grafos quebram quando os contratos são vagos, dois nós disputam os mesmos arquivos, um join espera para sempre ou um resumo esconde o risco principal. Mais agentes também significam mais contextos para revisar. Worktrees resolvem colisões, mas não aumentam a capacidade humana de compreender dez mudanças ao mesmo tempo.

Para começar, desenhe uma entrega recente como ela realmente aconteceu. Inclua retornos, esperas, aprovações e checks que falharam. Transforme em nós e arestas apenas os pontos ligados a uma dependência, um risco ou uma decisão real.

Essa é a linha da série. O harness prepara o ambiente. O loop transforma ação em progresso repetível. O grafo conecta loops, ferramentas e pessoas sem esconder quem decide.

A tecnologia parece nova. A responsabilidade de criar sistemas legíveis, verificáveis e recuperáveis continua sendo engenharia de software.
