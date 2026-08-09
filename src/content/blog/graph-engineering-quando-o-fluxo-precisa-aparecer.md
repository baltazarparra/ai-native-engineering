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

Nosso loop já consegue escolher um erro de TypeScript, corrigir, verificar e repetir. Então aparecem três erros na camada de dados, cinco na Interface de Programação de Aplicações, ou API, e doze na interface visual. Algumas correções dependem de uma decisão no tipo central. Outras podem avançar ao mesmo tempo. Uma mudança de contrato exige aprovação. Se o teste de integração falhar, o trabalho precisa voltar para a implementação certa, não recomeçar do zero.

Um único ciclo começa a esconder perguntas importantes: o que depende de quê, quem pode decidir, quais etapas são obrigatórias e para onde cada falha deve voltar.

Neste artigo, **Graph Engineering significa engenharia do grafo de execução e orquestração**. Knowledge graphs, ou grafos de conhecimento, pertencem a outro assunto. Loops continuam dentro do desenho: um loop é um grafo cíclico pequeno, e o grafo maior dá forma a vários passos, decisões e loops que precisam trabalhar juntos.

O nome Graph Engineering é recente e ainda não tem uma definição única. As mecânicas são antigas: flowcharts, máquinas de estado, grafos de build, pipelines de Integração e Entrega Contínuas, ou CI/CD, e orquestradores de jobs já tornam fluxo e dependências explícitos há décadas.

## Desenhe o trabalho antes de distribuí-lo

Imagine que a correção dos tipos siga este fluxo:

```text
triagem
  -> diagnóstico
  -> decisão de contrato, se necessária
  -> atualização do tipo central
  -> implementação da API + implementação da interface
  -> testes de cada ramo
  -> typecheck completo
  -> revisão
  -> aprovação humana
  -> concluído
```

Se o typecheck falhar na API, o fluxo volta ao ramo da API. Se a interface depender de uma decisão ainda aberta, ela espera. Se o contrato público mudar, uma pessoa aprova antes da implementação continuar.

Isso é um grafo dirigido. As caixas são nós. As setas são arestas. Cada nó representa trabalho ou decisão, e cada aresta define um caminho permitido.

O agente ainda pode investigar e escolher uma solução dentro de um nó. A diferença é que ele não inventa o processo inteiro enquanto trabalha. O sistema preserva os gates e os caminhos que importam.

## O trabalho acontece nos nós

Um nó pode ser quase qualquer unidade executável:

- código determinístico que lê uma saída;
- uma chamada a um modelo;
- um agente com ferramentas próprias;
- uma aprovação humana;
- um loop completo de implementação e verificação;
- uma espera por evento externo.

Nem todo nó precisa ser inteligente. Na verdade, quanto mais previsível for uma etapa, mais sentido faz escrevê-la como código comum. Rodar `npm run typecheck`, comparar o código de saída e escolher a próxima aresta não exige um modelo de linguagem.

Reserve decisão probabilística para onde existe ambiguidade útil. Diagnosticar a causa de um tipo incompatível pode pedir exploração. Verificar se um comando saiu com zero não pede.

Essa mistura aparece em sistemas de agentes descritos por Anthropic e OpenAI. Há roteadores, sequências programadas, workers, handoffs e agentes que escolhem ferramentas. O desenho pode combinar código fixo e decisões do modelo sem transformar tudo num agente autônomo.

## Arestas carregam mais que ordem

Uma seta não precisa dizer apenas "depois disso, faça aquilo". Ela pode carregar:

- dados produzidos pelo nó anterior;
- uma condição, como teste passou ou falhou;
- uma dependência, como contrato aprovado;
- autoridade, como revisão humana obrigatória;
- um limite, como número máximo de tentativas;
- um evento, como resposta do time de produto.

No exemplo, a aresta entre diagnóstico e mudança do tipo central pode perguntar se a correção altera um contrato público. Se não alterar, o fluxo continua. Se alterar, vai para o nó de decisão. Essa condição faz uma regra de governança aparecer no desenho e no runtime.

Em código tradicional, isso poderia ser um `if`, uma transição de máquina de estado ou uma regra no pipeline. O grafo transforma a topologia dessa lógica existente em um artefato que conseguimos ler, testar e observar.

## Estado é a memória do fluxo

Cada nó precisa saber o suficiente para fazer seu trabalho. Isso não significa enviar todo o histórico para todos.

Um estado compartilhado pode conter o objetivo, o erro atual, decisões aprovadas, artefatos produzidos, tentativas e resultados de checks. Cada nó lê os campos necessários e escreve uma saída explícita.

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

Frameworks como LangGraph formalizam essa ideia com estado, nós e arestas. A implementação específica pode mudar, mas o princípio é o mesmo de um workflow engine: transições leem e atualizam um estado durável.

Checkpoints permitem retomar depois de uma falha. Se o ramo da API já passou nos testes, uma queda no worker da interface não deveria apagar esse resultado. Persistir o estado também permite auditoria: sabemos que decisão liberou qual caminho.

O risco é criar um objeto global enorme que todo nó pode modificar. Aí o grafo fica acoplado e difícil de entender. Contratos pequenos entre nós, com ownership claro, funcionam melhor que uma sacola de contexto compartilhado.

## Paralelo só funciona quando o trabalho é independente

Agentes paralelos chamam atenção porque prometem velocidade. A condição vem antes da quantidade: os ramos precisam poder avançar sem disputar o mesmo estado ou tomar a mesma decisão.

Depois que o tipo central foi aprovado e atualizado, API e interface talvez possam trabalhar em paralelo. Antes disso, colocar dois agentes nos ramos apenas cria duas interpretações incompatíveis do contrato.

Um fan-out divide o trabalho em ramos. Um fan-in junta os resultados e espera as condições necessárias. No nosso grafo, a implementação abre dois ramos, cada um roda seus testes, e o typecheck completo só começa quando ambos terminam.

Isolamento mecânico também importa. Worktrees ou sandboxes separados evitam colisão de arquivos. Ownership explícito diz quem pode mudar cada módulo. Uma especificação comum reduz divergência. No encontro dos ramos, uma etapa de integração resolve conflitos e verifica o sistema como um todo.

A Anthropic apresenta a paralelização como útil quando subtarefas são realmente independentes ou quando perspectivas separadas melhoram a avaliação. A Kimi descreve seu Agent Swarm para trabalhos amplos e paralelizáveis, mas o apresenta como research preview e publica números do próprio fornecedor. Esses números não são evidência de que cem agentes ajudam qualquer codebase. Em software com dependências apertadas, mais workers podem produzir mais trabalho de integração.

## Handoff é uma mudança de responsabilidade

Em um handoff, um agente ou etapa transfere o controle para outro. Não basta encaminhar uma mensagem dizendo "continue daqui".

Um bom handoff informa:

- qual objetivo continua ativo;
- o que já foi comprovado;
- quais artefatos são a fonte de verdade;
- quais decisões estão bloqueadas;
- que ações o próximo nó pode executar;
- qual saída encerra sua responsabilidade.

Isso se parece com a passagem entre times, com um contrato de API ou com uma mensagem bem desenhada numa fila. O receptor não deveria precisar reconstruir a intenção a partir de um chat enorme.

A documentação de subagentes da Z.ai e os guias de orquestração da OpenAI mostram produtos atuais usando agentes especializados, managers e handoffs. A categoria é útil, mas o desenho ainda precisa responder a perguntas comuns de sistemas distribuídos: quem é dono do estado, o que acontece com falhas parciais e como evitar trabalho duplicado.

O manager também pode virar gargalo. Se ele lê todo arquivo, repassa toda mensagem e revisa toda saída, o sistema ganhou um ponto central caro e carregado de contexto. Delegação boa reduz informação no topo e devolve evidência compacta.

## Falhas devem voltar ao lugar certo

Um retry global é grosseiro. Se apenas os testes da interface falharam, repetir diagnóstico, decisão de contrato e implementação da API desperdiça trabalho e pode introduzir novas diferenças.

O grafo permite rotas de recuperação específicas. Falha de teste volta ao ramo responsável. Falha de integração volta ao nó que reconcilia os contratos. Falta de requisito segue para uma pessoa. Erro transitório de infraestrutura tenta novamente com limite.

Grafos de produção, por isso, costumam ter ciclos. Um grafo direcionado acíclico, ou DAG na sigla em inglês, não admite retorno. Ele funciona bem para dependências que avançam numa direção, como muitos builds e pipelines de dados. Workflows de agente frequentemente precisam corrigir, verificar e voltar. LangChain chama atenção para esse ponto ao explicar que os grafos reais nem sempre são DAGs e que loops são uma forma simples de grafo.

Cada ciclo ainda precisa dos freios do artigo anterior: orçamento, número máximo de tentativas, checkpoint e escalada. Desenhar uma seta de volta não torna o retry seguro por conta própria.

## A pessoa ocupa um nó com autoridade real

Adicionar uma caixa "human review" no diagrama não resolve governança. A pessoa precisa receber evidência suficiente, ter tempo para julgar e possuir autoridade para bloquear.

No nosso fluxo, a decisão de contrato acontece antes dos ramos porque mudar esse contrato depois multiplicaria retrabalho. A aprovação final recebe o diff, os resultados dos checks e as decisões registradas. O agente pode preparar tudo. O veredito pertence a quem responde pelo sistema.

Addy Osmani chama atenção para comprehension debt, a distância entre o volume de código produzido e o quanto alguém ainda entende. Um grafo muito eficiente pode aumentar essa dívida se pessoas deixam de ler as decisões e passam a confiar apenas em luzes verdes.

Os checks reduzem custo de revisão, mas não medem todas as qualidades. Arquitetura sustentável, intenção de produto e impacto de uma mudança podem exigir julgamento fora do alcance de um teste rápido.

## Quando um loop simples é melhor

Um grafo explícito cobra um preço. Estados, transições, persistência, observabilidade e recuperação viram código que precisa ser mantido.

Se a tarefa é pequena, reversível e aberta, um único agente num loop bem instrumentado pode ser suficiente. Investigar uma falha desconhecida exige liberdade para seguir pistas que você ainda não consegue desenhar. Forçar todos os caminhos antes de entender o problema cria um flowchart fictício.

Use o grafo quando o fluxo tem dependências estáveis, gates obrigatórios, diferentes permissões, paralelismo real ou caminhos de recuperação que precisam ser auditáveis. Use o loop quando os próximos passos dependem de descoberta e o custo de deixar o agente escolher é aceitável.

Muitos sistemas combinam os dois. Um grafo determinístico controla triagem, aprovação e integração. Dentro do nó de diagnóstico, um agente opera em loop até produzir uma hipótese com evidência ou atingir o limite.

## Onde o grafo quebra

Um diagrama bonito pode esconder contratos vagos. Dois nós podem escrever no mesmo arquivo. Um join pode esperar para sempre por um ramo que morreu. Um revisor pode receber um resumo que omite o risco principal.

Paralelismo multiplica contextos para acompanhar. Worktrees resolvem colisões mecânicas, não a capacidade humana de entender dez mudanças ao mesmo tempo. Quanto mais agentes entram, maior o custo de coordenação, integração e revisão.

Há ainda o risco de automatizar o organograma da empresa com todos os seus gargalos. Criar um agente de produto, um agente arquiteto, cinco implementadores e três revisores não garante separação útil. Às vezes, é apenas teatro de processo com mais chamadas de modelo.

Produto e garantia de qualidade, ou QA, ajudam a impedir isso quando transformam autoridade e critérios em transições concretas. Um gate de QA deve dizer que evidência recebe e o que pode bloquear. Um nó de produto deve existir porque uma decisão muda o resultado, não para representar uma função no diagrama.

## Desenhe o fluxo que já existe

Pegue uma entrega recente e desenhe como ela realmente aconteceu. Inclua esperas, retornos, aprovações e checks que falharam. Marque onde uma decisão ficou escondida no chat e onde duas pessoas trabalharam com premissas diferentes.

Depois transforme apenas esses pontos em nós e arestas explícitos. Remova todo nó que não responde a uma dependência, um risco ou uma ambiguidade observada.

Essa é a linha que atravessa a série. O harness prepara o ambiente. O loop transforma ação em progresso repetível. O grafo conecta loops, ferramentas e pessoas sem esconder quem decide.

A tecnologia parece nova. A responsabilidade de projetar um sistema legível, verificável e recuperável continua sendo engenharia de software.
