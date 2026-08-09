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

No artigo anterior, montamos o ambiente para um agente corrigir erros de TypeScript com contexto, ferramentas, limites e feedback. A primeira execução correu bem. O agente escolheu um erro, fez uma mudança pequena, rodou o compilador e mostrou o diff.

No dia seguinte, o repositório tem outros 47 erros. Você abre o agente, repete a instrução, lembra o comando correto, pede para verificar e espera. Depois faz tudo de novo.

O harness melhorou cada execução, mas o processo ainda depende de você apertando o botão e conduzindo cada rodada. Loop Engineering começa exatamente aí.

## O loop é o sistema que continua

Um loop de agente é um ciclo limitado que lê um objetivo e o estado atual, escolhe uma ação útil, usa uma ferramenta, observa o resultado, verifica se houve progresso e decide o próximo movimento.

Em uma forma bem compacta:

```text
ler objetivo e estado
escolher uma tarefa pequena
agir
observar evidência
verificar
registrar estado
continuar, parar ou pedir ajuda
```

O termo Loop Engineering ainda é recente e não representa um padrão formal da indústria. Ele dá nome ao trabalho de projetar esse ciclo com cuidado, em vez de ficar repetindo prompts até alguma coisa parecer pronta.

Você já conhece a base. O ciclo editar, compilar e testar existe desde os primeiros compiladores. Test-Driven Development, ou TDD, usa vermelho, verde e refatoração. Um worker lê uma mensagem da fila, executa, confirma ou tenta outra vez. Um controlador de infraestrutura compara o estado desejado com o observado e reconcilia a diferença.

Com agentes, a parte probabilística escolhe algumas ações. A engenharia do loop continua responsável pelo objetivo, pelos sinais, pelo estado e pelos limites.

## Um objetivo que pode ser verificado

"Corrija o projeto" parece um objetivo, mas não ajuda a decidir quando o trabalho acabou. Qual projeto? Que tipo de problema? Quais mudanças são aceitáveis? Qual evidência conta como conclusão?

Para nosso exemplo, podemos escrever algo mais operacional:

```text
Reduza os erros retornados por npm run typecheck.
Trabalhe em um erro por rodada.
Não altere contratos públicos nem desative checks.
Depois de cada mudança, rode o typecheck e os testes relacionados.
Pare quando o typecheck sair com código zero ou quando a próxima correção
exigir uma decisão de arquitetura.
```

Agora o loop consegue comparar estado desejado e estado observado. O código de saída do comando, a contagem de erros e os testes fornecem sinais externos.

Documentações atuais de agentes tratam objetivos verificáveis dessa forma. O Goal Mode da Z.ai, por exemplo, separa a execução em rodadas e diz que um plano ou uma resposta convincente não prova conclusão. A verificação procura mudanças, saídas de comandos e resultados de checks. É uma descrição de produto, não uma garantia de que qualquer objetivo será resolvido. O mecanismo importante é a separação entre fazer e julgar.

## Uma tarefa por rodada

Quando um agente recebe 47 erros de uma vez, pode tentar reorganizar o projeto inteiro. O diff cresce, as causas se misturam e uma falha no fim fica difícil de localizar.

Uma rodada pequena reduz esse espaço. O agente escolhe um erro, entende a causa, corrige, verifica e registra. Se a mudança piorar a contagem, o ponto de retorno está perto. Se funcionar, o próximo ciclo começa de um estado mais limpo.

Esse é o mesmo raciocínio das tracer bullets e das fatias verticais. Em vez de construir todas as camadas e validar no fim, você atravessa o sistema com uma mudança pequena que produz feedback real. Depois expande.

"Uma tarefa" não precisa significar "um arquivo". Às vezes, corrigir um tipo exige mudar uma interface, sua implementação e um teste. O limite deve seguir um resultado verificável, não uma quantidade arbitrária de linhas.

Uma boa tarefa para o loop cabe numa janela de contexto, tem um critério que passa ou falha e deixa o repositório em estado utilizável. Se isso não cabe, a decomposição ainda está incompleta.

## Ação sem observação vira tentativa cega

Depois de editar o código, o agente precisa olhar para algo que existe fora da própria resposta.

No projeto TypeScript, a observação pode incluir a nova saída do compilador, o resultado dos testes, o diff e, se houver interface, o comportamento no navegador. O AI Hero chama typecheck, testes e hooks de feedback essencial porque devolvem ao agente um sinal rápido sobre a própria mudança.

Velocidade importa aqui. Um check que leva quarenta minutos torna cada rodada cara e encoraja mudanças grandes antes de verificar. Um typecheck incremental ou um teste focado aproxima ação e consequência.

Nem todo sinal precisa ser binário. A contagem de erros pode cair de 47 para 46. O loop ainda não terminou, mas existe evidência de progresso. Por outro lado, cair para 12 porque o agente excluiu uma pasta da configuração é uma falsa melhora. É por isso que guardrails e inspeção de diff acompanham a métrica principal.

Na engenharia anterior a agentes, já aprendemos que uma única métrica pode ser manipulada sem intenção. Cobertura de testes não prova qualidade. Quantidade de tickets fechados não prova valor. Um loop só enxerga o que seus sensores mostram.

## Quem implementa não deveria ser a única pessoa a aprovar

Pedir para o agente revisar o próprio trabalho é barato e útil. Ainda assim, a revisão carrega o contexto, as escolhas e os pontos cegos da implementação.

Sempre que possível, use um verificador independente. Pode ser código determinístico, como compilador e testes. Pode ser outro agente com um rubric curto e acesso ao diff. Pode ser uma pessoa quando a decisão exige contexto de produto, segurança ou arquitetura.

A Anthropic descreve um padrão evaluator-optimizer em que uma chamada produz e outra avalia com critérios claros. A avaliação volta como feedback até o resultado atingir a condição definida. A mesma fonte alerta para usar sistemas mais complexos só quando eles demonstram benefício. Dois agentes sem critérios não criam independência, só criam duas opiniões.

Para os erros de TypeScript, o verificador pode responder a perguntas objetivas:

- o erro escolhido desapareceu pelo motivo correto?
- algum erro novo surgiu?
- testes ou configurações foram enfraquecidos?
- o diff ficou dentro do módulo esperado?
- a interface pública mudou?

Se a última resposta for sim, o loop precisa escalar em vez de improvisar uma decisão.

## O estado precisa sobreviver à rodada

Um loop que depende do histórico inteiro da conversa fica mais frágil a cada volta. Saídas de ferramentas ocupam espaço, hipóteses antigas continuam presentes e o contexto começa a misturar o que já foi resolvido com o que ainda está aberto.

Mantenha o estado essencial fora da conversa. Para esse caso, um arquivo pequeno pode guardar:

```json
{
  "goal": "typecheck exits with zero",
  "errorsAtStart": 47,
  "errorsNow": 31,
  "currentError": "TS2322 in src/billing/format.ts",
  "blocked": [],
  "iterations": 16
}
```

Git preserva os checkpoints de código. O arquivo de estado preserva a leitura operacional. Um log curto explica decisões que não aparecem no diff. A próxima sessão pode reconstruir o trabalho a partir desses artefatos e começar com contexto limpo.

O exemplo Ralph Loop do Kit de Desenvolvimento de Software, ou SDK, da Kimi aplica uma versão direta desse padrão: recebe um prompt, roda o agente, executa um comando externo de verificação e continua quando o comando falha. O exemplo também oferece limite de iterações e recomenda tarefas pequenas. É uma implementação didática. Em código de produção, ainda precisamos cuidar de concorrência, falhas parciais, custos e recuperação.

## Checkpoint não é sinônimo de commit

Salvar progresso pode significar criar um commit, atualizar um arquivo de estado, registrar um evento ou guardar um artefato de teste. A escolha depende do sistema.

O checkpoint precisa responder a duas perguntas: o que sabemos agora e de onde é seguro retomar? Se o typecheck passou pela primeira vez depois de quinze rodadas, esse estado merece ser preservado. Se uma rodada deixou metade de uma refatoração aberta, ela ainda não criou um bom ponto de retomada.

Em equipes, commits pequenos ajudam revisão e reversão. Em um loop local experimental, talvez baste preservar o diff e um snapshot. O importante é não confundir atividade registrada com estado recuperável.

## Todo loop precisa de freio

Sistemas estocásticos podem insistir numa estratégia ruim com variações superficiais. Sem limite, o agente consome tempo e dinheiro enquanto gira no mesmo lugar.

Defina antes:

- número máximo de rodadas;
- orçamento de tempo ou custo;
- quantidade tolerada de tentativas para o mesmo erro;
- condições que exigem aprovação;
- sinal explícito de conclusão;
- ação de recuperação quando o limite chega.

No nosso loop, três tentativas sem reduzir o mesmo erro podem gerar uma pausa com diagnóstico. Uma mudança na interface pública pede decisão humana. Um aumento na contagem total reverte a rodada. O typecheck em zero encerra.

O freio funciona como timeout, circuit breaker e dead-letter queue nos sistemas distribuídos. Ele mantém uma falha local visível e impede que ela ocupe o processo inteiro.

## Comece com uma pessoa dentro do loop

Rodar sem supervisão parece ser o destino natural, mas é uma etapa conquistada pela qualidade da verificação.

No começo, acompanhe cada rodada. Observe quais comandos o agente escolhe, onde ele se confunde, como reage a falhas e que tipo de mudança tenta esconder dentro de uma correção pequena. Esse modo human-in-the-loop, com uma pessoa participando das decisões, gera o histórico necessário para melhorar o harness.

Um trabalho pode rodar sem ninguém olhando quando o risco é baixo, o escopo é estreito, a reversão é simples e a condição de pronto é difícil de falsificar. Corrigir um lint mecânico em um branch isolado pode chegar lá. Alterar autenticação, cobrança ou dados de cliente pede outro nível de evidência e autoridade.

A pergunta útil não é quanto o agente consegue fazer sozinho. É quanto você consegue verificar de forma barata e confiável.

## Onde o loop quebra

Um loop pode passar horas corrigindo o teste em vez do produto. Pode aprender um padrão ruim que já existe no repositório e replicá-lo 47 vezes. Pode manter todos os checks verdes enquanto aumenta uma dívida arquitetural que só aparecerá meses depois.

Contexto também degrada. Tarefas grandes acumulam detalhes, e resumos perdem informação. Reiniciar com estado persistente ajuda, mas um estado ruim apenas transporta o erro para a próxima sessão.

Há ainda ações que não deveriam ser repetidas. Enviar e-mail, cobrar um cartão ou executar uma migração destrutiva não combina com retry ingênuo. Idempotência, aprovações e chaves de deduplicação continuam obrigatórias.

Para garantia de qualidade, ou QA, e produto, o limite aparece na definição de pronto. Se o critério só diz "corrigir os tipos", o loop pode terminar com software compilável e comportamento errado. Critérios funcionais e riscos de negócio precisam entrar como gates quando são parte do resultado.

## Monte um loop de três passos

Escolha uma tarefa reversível que leve poucos minutos. Pode ser corrigir um erro de tipo, atualizar um teste quebrado ou remover uma violação de lint.

Defina três movimentos: agir, checar e registrar. Diga qual comando prova avanço, onde o estado será salvo e quando o agente deve parar. Acompanhe as primeiras rodadas e anote uma falha no próprio ciclo, não apenas no código produzido.

Quando esse loop ficar previsível, você terá uma unidade de trabalho reutilizável.

Só que um produto raramente cabe numa única unidade. Há tarefas que dependem de outras, checks que podem rodar em paralelo, revisores com permissões diferentes e decisões que precisam voltar ao lugar certo. É aí que o próximo artigo entra: Graph Engineering torna esse fluxo visível.
