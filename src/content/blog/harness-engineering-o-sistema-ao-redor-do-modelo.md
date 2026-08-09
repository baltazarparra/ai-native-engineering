---
title: 'Harness Engineering: o sistema ao redor do modelo'
slug: 'harness-engineering-o-sistema-ao-redor-do-modelo'
lang: 'pt-BR'
description: 'Como preparar contexto, ferramentas, limites e feedback para um agente de código trabalhar bem dentro de um repositório real.'
publishedAt: 2026-05-31
draft: false
tags: ['harness engineering', 'agentes de código', 'qualidade']
author: 'AI-Native Engineers'
translationKey: 'engineering-series-harness'
series:
  key: 'engineering-beyond-the-prompt'
  title: 'Engenharia além do prompt'
  order: 1
  total: 3
references:
  - 'anthropic-effective-harnesses'
  - 'openai-harness-engineering'
  - 'aihero-agent-friendly-codebases'
  - 'addy-agent-harness-engineering'
---

Você entrega um repositório para um agente de código e pede algo simples: corrija os erros de TypeScript. Pouco depois, ele diz que terminou. O compilador ainda falha, um teste foi comentado e três arquivos sem relação com a tarefa mudaram.

É fácil culpar o modelo. Só que ele também não sabia qual comando representava sucesso, quais arquivos estavam fora do escopo nem quando deveria parar e pedir ajuda. Recebeu capacidade para editar código, mas não um ambiente confiável para trabalhar.

É desse ambiente que trata Harness Engineering.

## Agente é modelo mais harness

Um modelo de linguagem produz respostas. Um agente observa um ambiente, escolhe ferramentas, executa ações e usa o resultado para decidir o próximo passo.

Para isso, existe uma camada ao redor do modelo. Ela entrega contexto, expõe ferramentas, controla permissões, registra estado e devolve sinais sobre a qualidade do trabalho. Esse conjunto é o **harness**.

> agente = modelo + harness

O modelo é o motor de decisão. O harness permite usar esse motor em trabalho real. Ele inclui instruções do repositório, sistema de arquivos, Git, testes, sandbox, aprovações, logs e caminhos de recuperação.

Se você já configurou um runtime, um pipeline de Integração Contínua, ou CI, e um runbook de incidentes, a ideia é familiar. Antes da Inteligência Artificial, ou IA, nós já projetávamos o ambiente em que o software seria executado e verificado. Agora também projetamos o ambiente em que o agente trabalha.

## Seu repositório não cabe num prompt

Você sabe que o projeto usa `npm`, que arquivos gerados não devem ser editados e que a camada de domínio não pode importar componentes de interface. Para uma sessão nova, nada disso é óbvio.

Pense num engenheiro que acabou de entrar no time e perdeu a memória do dia anterior. Ele precisa de um mapa curto e de um caminho para buscar detalhes quando necessário. Colocar o repositório inteiro no contexto só cria ruído.

A OpenAI relatou algo parecido ao descrever um `AGENTS.md` monolítico que ficou grande e difícil de manter. A saída foi transformar o arquivo inicial num mapa para fontes específicas. Primeiro vem a orientação, depois o detalhe. É documentação navegável aplicada a um leitor sem memória.

No nosso exemplo, a entrada poderia ser:

```text
Use Node 22.
Não edite arquivos gerados.
Antes de encerrar, rode npm run lint e npm run build.
Leia docs/architecture.md antes de mudar dependências entre camadas.
```

O documento de arquitetura continua separado. A instrução curta só diz quando abri-lo. Esse acesso gradual ao contexto costuma ser mais útil do que um manual enorme carregado em toda tarefa.

## Guias orientam. Sensores mostram o resultado

Um jeito simples de organizar o harness é separar **guias** de **sensores**.

Guias atuam antes da ação. Uma especificação delimita o resultado, um arquivo explica convenções e uma regra diz que alterar produção exige aprovação.

Sensores observam o que aconteceu. O compilador encontra incompatibilidades, testes verificam comportamento, o diff mostra as mudanças e os logs revelam problemas que a leitura do código não mostrou.

Na engenharia tradicional, um guia se parece com um contrato ou runbook. Um sensor se parece com uma assertion, uma métrica ou um alarme.

A instrução “não quebre os tipos” é fraca sozinha. O modelo pode acreditar que cumpriu. Já `tsc --noEmit` devolve um sinal externo. A regra explica a intenção e o compilador mostra se o resultado a respeitou.

## Ferramentas, código e permissões formam a interface

Dar acesso a um terminal não basta. O agente precisa entender qual ferramenta usar, em qual diretório e como interpretar a saída. Nomes claros, parâmetros explícitos e erros úteis importam tanto aqui quanto numa Interface de Programação de Aplicações, ou API, feita para pessoas.

O próprio código faz parte dessa interface. Pastas previsíveis, módulos com fronteiras claras, tipos bem nomeados e testes próximos do comportamento ajudam uma pessoa nova e também um agente. O AI Hero usa justamente essa imagem: cada sessão chega ao repositório sem memória. Encapsulamento, coesão e bons pontos de teste continuam valendo, agora também como recursos de navegação.

Para corrigir os erros de TypeScript, o agente deveria conseguir:

1. encontrar o comando oficial de verificação;
2. escolher um erro pequeno;
3. ler apenas os módulos envolvidos;
4. aplicar a correção;
5. rodar novamente compilador e testes;
6. inspecionar o diff antes de concluir.

Permissão também entra no desenho. Para essa tarefa, ele precisa editar o repositório e executar comandos conhecidos. Não precisa de credenciais de produção. Se a correção mudar um contrato público, o harness deve parar e chamar quem tem autoridade.

É o velho princípio do menor privilégio. Sandbox, comandos permitidos e aprovações limitam o impacto de uma decisão errada sem travar todo o trabalho.

## “Terminei” precisa virar evidência

Agentes escrevem relatórios de sucesso convincentes. Isso não prova que o software funciona.

A Anthropic observou agentes de longa duração encerrando cedo porque viam bastante código pronto. Também encontrou validações parciais, sem prova ponta a ponta. Por isso, a conclusão precisa estar ligada a sinais concretos.

No nosso caso:

- o comando de tipos termina com código zero;
- os testes relacionados passam;
- o diff não inclui arquivos fora do escopo;
- nenhum teste foi removido ou enfraquecido;
- o agente registra o que não conseguiu verificar.

Pedir uma autorrevisão ajuda, mas preserva as mesmas suposições da implementação. Compiladores, testes e revisores independentes criam outra fonte de sinal.

Para produto e garantia de qualidade, ou QA, isso começa nos critérios de aceite. “A tela funciona” diz pouco. “Ao salvar um e-mail inválido, a API responde 422 e o formulário preserva os dados” oferece um contrato que pode ser implementado e verificado.

## Estado e recuperação ficam fora da conversa

Trabalhos maiores que uma janela de contexto precisam sobreviver a sessões diferentes. O chat não é uma base confiável para isso.

Git registra o código. Um plano guarda decisões e próximos passos. Um log curto explica o que foi tentado. Critérios de aceite mantêm a definição de pronto disponível. Uma sessão nova consegue retomar o trabalho sem reconstruir tudo por adivinhação.

Em um experimento com agentes de longa duração, a Anthropic combinou histórico do Git, uma lista estruturada de funcionalidades e um arquivo de progresso. Cada sessão trabalhava numa parte pequena e preparava a passagem para a seguinte. É uma solução daquele contexto, não uma fórmula universal, mas o mecanismo é antigo: passagem de turno com estado persistente.

Recuperação faz parte do mesmo desenho. Se uma tentativa piora o repositório, o agente deve reconhecer o último estado válido e voltar com segurança.

## Deixe as falhas ensinarem o harness

Não comece criando quinze arquivos de regras e vinte integrações. Um harness útil cresce a partir de falhas observadas.

Se o agente editou um arquivo gerado, adicione uma orientação curta e, se possível, uma checagem mecânica. Se comentou um teste para fazer o pipeline passar, bloqueie esse padrão. Se sempre se perde num módulo, melhore o mapa ou a fronteira do próprio código.

Addy Osmani descreve isso como uma catraca: um erro real vira uma melhoria durável no ambiente. O objetivo é evitar a repetição das falhas que o repositório já conhece, sem tentar prever todo erro imaginável.

O harness também tem limites. Build verde pode esconder produto errado. Documentação envelhece. Checks ruins automatizam definições ruins de sucesso. Regras demais criam contradições, e regras de menos deixam tudo na sorte.

Para começar, escolha uma falha que já aconteceu. Escreva uma orientação de duas linhas e adicione um sensor, como typecheck, teste ou inspeção de diff. Dê ao agente uma tarefa pequena e observe se ele usa os dois sem ajuda.

Se funcionar, você transformou uma boa orientação em uma propriedade reutilizável do ambiente.

No próximo artigo, vamos colocar esse harness em movimento e transformar uma boa execução num processo que sabe continuar, registrar e parar.
