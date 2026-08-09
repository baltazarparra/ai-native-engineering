---
title: 'Loop Engineering: como uma boa execução vira processo'
slug: 'loop-engineering-como-uma-boa-execucao-vira-processo'
lang: 'pt-BR'
description: 'Como desenhar ciclos pequenos de ação, verificação e estado para um agente avançar sem depender de alguém repetindo prompts.'
publishedAt: 2026-06-30
draft: false
tags: ['loop engineering', 'agentes de código', 'feedback loops']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-loop'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engenharia além do prompt'
  order: 2
  total: 3
references:
  - 'anthropic-building-effective-agents'
  - 'kimi-ralph-loop'
  - 'aihero-typescript-feedback-loops'
  - 'zcode-goal-mode'
  - 'addy-loop-engineering'
---

No artigo anterior, preparamos um agente para corrigir erros de TypeScript com contexto, ferramentas, limites e feedback. A execução correu bem: ele escolheu um erro, fez uma mudança pequena, rodou o compilador e mostrou o diff.

No dia seguinte, aparecem outros 47 erros. Você abre o agente, repete a instrução, lembra o comando correto e espera. Depois faz tudo de novo.

O harness melhorou cada execução, mas o processo ainda depende de você conduzindo toda rodada. Loop Engineering começa aí.

## O loop é o sistema que continua

Um loop de agente é um ciclo limitado que lê o objetivo e o estado atual, escolhe uma ação, observa o resultado, verifica o progresso e decide o próximo movimento.

```text
ler objetivo e estado
escolher uma tarefa pequena
agir
observar e verificar
registrar estado
continuar, parar ou pedir ajuda
```

Loop Engineering ainda é um termo recente, não um padrão formal da indústria. Ele nomeia o trabalho de projetar esse ciclo em vez de repetir prompts até algo parecer pronto.

A base é conhecida. O ciclo editar, compilar e testar existe há décadas. Test-Driven Development, ou TDD, trabalha com vermelho, verde e refatoração. Workers leem mensagens de uma fila, executam e confirmam ou tentam novamente. Com agentes, algumas ações são probabilísticas, mas objetivo, sinais, estado e limites continuam sendo problemas de engenharia.

## Comece por um objetivo verificável

“Corrija o projeto” não diz quando o trabalho acabou. Qual projeto? Que mudanças são aceitáveis? O que prova conclusão?

Nosso objetivo pode ser mais operacional:

```text
Reduza os erros retornados por npm run typecheck.
Trabalhe em um erro por rodada.
Não altere contratos públicos nem desative checks.
Depois da mudança, rode o typecheck e os testes relacionados.
Pare quando o comando sair com zero ou quando a próxima correção
exigir uma decisão de arquitetura.
```

Agora o loop compara o estado desejado com sinais externos: código de saída, quantidade de erros, testes e diff.

O Goal Mode da Z.ai usa uma lógica parecida ao separar execução em rodadas e tratar conclusão como algo que precisa de mudanças e resultados verificáveis. É uma descrição de produto, não uma garantia de sucesso. O ponto útil é separar fazer de julgar.

## Uma tarefa pequena por rodada

Ao receber 47 erros de uma vez, o agente pode tentar reorganizar o projeto inteiro. O diff cresce, as causas se misturam e qualquer falha fica difícil de localizar.

Uma rodada pequena reduz esse espaço. O agente escolhe um erro, entende a causa, corrige, verifica e registra. Se piorar o projeto, o ponto de retorno está perto. Se funcionar, a próxima rodada começa de um estado mais limpo.

É o mesmo raciocínio das tracer bullets e das fatias verticais: atravessar o sistema com uma mudança pequena que gera feedback real antes de expandir.

“Uma tarefa” não significa necessariamente “um arquivo”. Corrigir um tipo pode exigir uma interface, uma implementação e um teste. A unidade deve caber numa janela de contexto, ter um critério que passa ou falha e deixar o repositório utilizável.

## Ação precisa de observação independente

Depois de editar, o agente precisa olhar para algo fora da própria resposta. Pode ser a saída do compilador, os testes, o diff ou o comportamento no navegador. O AI Hero chama typecheck, testes e hooks de feedback essencial porque aproximam ação e consequência.

Checks rápidos favorecem rodadas pequenas. Se toda verificação leva quarenta minutos, o loop tende a acumular mudanças antes de aprender alguma coisa.

Nem todo sinal é binário. Cair de 47 para 46 erros mostra progresso. Cair para 12 porque uma pasta foi excluída da configuração mostra uma métrica enganosa. Por isso o diff e os guardrails acompanham a contagem principal.

Sempre que possível, quem implementa não deve ser a única fonte de aprovação. O verificador pode ser código determinístico, outro agente com critérios curtos ou uma pessoa quando a decisão envolve produto, segurança ou arquitetura.

A Anthropic descreve o padrão evaluator-optimizer, no qual uma etapa produz e outra avalia com critérios claros. No nosso caso, a avaliação pergunta:

- o erro desapareceu pelo motivo correto?
- surgiu algum erro novo?
- testes ou configurações foram enfraquecidos?
- o diff ficou no módulo esperado?
- a interface pública mudou?

Se a última resposta for sim, o loop escala a decisão em vez de improvisar.

## Estado e checkpoints precisam sobreviver

Um loop apoiado no histórico inteiro da conversa fica mais frágil a cada volta. Saídas ocupam espaço e hipóteses antigas se misturam ao trabalho aberto.

Mantenha o estado essencial fora do chat:

```json
{
  "goal": "typecheck exits with zero",
  "errorsAtStart": 47,
  "errorsNow": 31,
  "currentError": "TS2322 in src/billing/format.ts",
  "iterations": 16
}
```

Git preserva checkpoints de código. Um arquivo de estado guarda a leitura operacional. Um log curto explica decisões que não aparecem no diff. Uma sessão nova consegue retomar com contexto limpo.

O Ralph Loop do Kit de Desenvolvimento de Software, ou SDK, da Kimi mostra uma versão didática: o agente executa uma tarefa, um comando externo verifica e o ciclo continua quando a verificação falha. O exemplo também limita iterações e recomenda tarefas pequenas. Em produção, ainda precisamos lidar com concorrência, custo e recuperação.

Checkpoint não é só uma marca no tempo. Ele deve dizer o que sabemos e de onde é seguro retomar. Um commit com testes passando pode ser um bom checkpoint. Metade de uma refatoração aberta, não.

## Todo loop precisa de freio

Um sistema probabilístico pode repetir uma estratégia ruim com pequenas variações. Defina antes:

- máximo de rodadas;
- orçamento de tempo ou custo;
- tentativas toleradas para o mesmo erro;
- ações que exigem aprovação;
- sinal explícito de conclusão;
- recuperação quando o limite chega.

No nosso loop, três tentativas sem avanço geram uma pausa com diagnóstico. Mudança em contrato público chama uma pessoa. Aumento na contagem de erros reverte a rodada. Typecheck em zero encerra.

Esse freio lembra timeout, circuit breaker e dead-letter queue em sistemas distribuídos. Ele impede que uma falha local consuma o processo inteiro.

## Comece com uma pessoa acompanhando

Rodar sem supervisão é uma etapa conquistada pela qualidade da verificação. No começo, acompanhe as rodadas. Veja onde o agente se confunde, como reage a falhas e quais atalhos tenta usar. Esse modo human-in-the-loop, com uma pessoa participando das decisões, fornece material para melhorar o harness.

Uma tarefa pode rodar sozinha quando o risco é baixo, o escopo é estreito, a reversão é simples e a condição de pronto é difícil de falsificar. Corrigir lint mecânico num branch isolado pode chegar lá. Alterar autenticação, cobrança ou dados de cliente pede outra autoridade.

Loops também quebram. Podem corrigir o teste em vez do produto, replicar um padrão ruim do repositório ou manter checks verdes enquanto aumentam dívida arquitetural. Ações como enviar e-mail, cobrar um cartão ou executar migração destrutiva não aceitam retry ingênuo. Idempotência, deduplicação e aprovação continuam obrigatórias.

Para testar a ideia, escolha uma tarefa reversível de poucos minutos. Defina três movimentos: agir, checar e registrar. Diga qual comando prova avanço, onde o estado fica e quando parar. Acompanhe as primeiras rodadas e anote uma falha no ciclo, não só no código.

Quando esse loop ficar previsível, você terá uma unidade de trabalho reutilizável. No próximo artigo, vamos conectar várias unidades, dependências e decisões com Graph Engineering.
