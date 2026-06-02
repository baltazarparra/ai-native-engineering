---
title: 'Harness no dia a dia: o que muda quando você para de só promptar'
slug: 'harness-no-dia-a-dia'
lang: 'pt-BR'
description: 'Prompt solto gera código rápido. Harness muda o que acontece depois: contexto, limites e validação antes do merge.'
publishedAt: 2026-06-01
draft: false
translationKey: 'harness-daily-practice'
tags: ['harness', 'agentes', 'workflow']
author: 'AI-Native Engineers'
---

Você manda o agente "corrige esse bug" e em dois minutos aparece um diff bonito. Parece produtividade. Só que ninguém perguntou se era o bug certo, se os testes passam, ou se aquele arquivo podia ser alterado em primeiro lugar.

**Parar de só promptar** não significa parar de conversar com o modelo. Significa deixar de tratar cada pedido como uma ilha. Harness é o nome seco para o que fica em volta da conversa: contexto que o agente lê, regras do que pode fazer, e checks antes de você aceitar o resultado.

## O que muda na prática

### Para quem desenvolve

Antes, a sessão terminava quando o código "fazia sentido". Agora você espera evidência: lint limpo, build passando, escopo alinhado com o que pediu. O agente ainda escreve o patch. Você continua sendo dono do merge.

A diferença sutil: você não revisa só sintaxe. Revisa se a solução respeita o plano da fase, se não refatorou três módulos sem avisar, se não tocou em arquivo que estava fora do escopo. Isso parece burocracia até a primeira vez que um diff "criativo" quebra produção.

### Para quem é PM ou QA

Você não precisa ler código para sentir a mudança. Perguntas que antes ficavam na sua cabeça passam a existir por escrito: o que é done desta entrega? Qual critério de aceite? O que o agente **não** pode fazer sozinho?

Na prática, isso vira menos "cadê a feature?" e mais "cadê o teste que prova a feature?". QA deixa de ser só a última linha de defesa e vira parte do contrato antes da implementação começar.

### Para quem lidera time

O risco deixa de ser só "o modelo alucinou". Vira "ninguém documentou o que foi decidido". Harness empurra decisões para o repositório: plano de fase, checklist de validação, política de commits pequenos. Conversa no chat vira rastro auditável.

## Harness em uma frase (sem virar aula)

**Harness** é o ambiente de trabalho do agente: arquivos de contexto, ferramentas permitidas, e validações que rodam antes do handoff. Não substitui julgamento humano. Reduz a dependência de sorte e memória.

Se você quiser a versão longa, com SDD (Spec-Driven Development) e desenho de fluxo, a [aula de maturidade](/sessions/maturidade/) cobre isso como currículo. Este post é outra coisa: o que você sente na terça-feira, na décima sessão do mês, quando o time já passou da fase "uau, ele escreveu React".

## Onde ainda quebra

Harness mal feito vira teatro. Regras no README que ninguém segue. Skill de agente que ninguém invoca. Build que passa mas ninguém olha o diff.

Outro ponto cego: achar que contexto infinito resolve tudo. Jogar o repo inteiro no prompt não é harness. É ruído. Contexto bom é curado: o que importa para **esta** tarefa, não para a história da empresa.

Modelos mudam. Categorias de ferramenta (IDE com agente, CLI de coding agent, orquestrador em cloud) mudam também. O padrão que fica é mais simples: intenção clara, escopo limitado, validação explícita, humano no loop no merge.

## Takeaway

Prompt solto é ótimo para explorar. Entrega repetível pede sistema em volta do agente. Harness não é glamour. É o que transforma demo em software que você assina embaixo.

Se isso ressoou, comece pequeno: uma regra de commit, um check de build, um plano de fase antes de pedir implementação. O resto escala depois.
