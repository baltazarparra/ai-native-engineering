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

Você entrega um repositório para um agente de código e pede algo aparentemente simples: corrija os erros de TypeScript. Alguns minutos depois, ele diz que terminou. O compilador ainda falha, um teste foi comentado e três arquivos que não tinham relação com a tarefa mudaram no caminho.

É tentador concluir que o modelo não é bom o bastante. Pode ser. Só que, muitas vezes, o problema está em volta dele.

O agente não sabia qual comando representava sucesso, quais arquivos estavam fora do escopo, onde encontrar as decisões de arquitetura nem quando deveria parar e pedir ajuda. Ele recebeu capacidade para editar código, mas não recebeu um ambiente de trabalho confiável.

É disso que trata Harness Engineering.

## Agente é modelo mais harness

Um modelo de linguagem produz a próxima resposta. Um agente consegue observar um ambiente, escolher ferramentas, executar ações e usar o resultado para decidir o que fazer depois.

Para isso, existe uma camada ao redor do modelo. Essa camada entrega contexto, expõe ferramentas, controla permissões, registra estado e devolve sinais sobre a qualidade do trabalho. Chamamos esse conjunto de **harness**.

Em linguagem direta:

> agente = modelo + harness

O modelo é o motor de decisão. O harness é o sistema que permite usar esse motor dentro de um trabalho real.

Isso inclui o arquivo de instruções do repositório, mas vai muito além dele. Entram também o sistema de arquivos, Git, comandos de teste, sandbox, limites de acesso, regras de aprovação, logs, memória de progresso e caminhos de recuperação.

Se você já configurou um runtime, um pipeline de Integração Contínua, ou CI, um test harness e um runbook de incidentes, a ideia não é tão nova. Muito antes da Inteligência Artificial, ou IA, nós já projetávamos o ambiente em que o software podia ser executado e verificado. Agora também projetamos o ambiente em que o agente pode trabalhar.

## Um prompt não conhece seu repositório

Voltemos aos erros de TypeScript. Você sabe que o projeto usa `npm`, que o comando correto é `npm run lint`, que arquivos gerados não devem ser editados e que a camada de domínio não pode importar componentes de interface. Esse conhecimento parece óbvio porque já está na sua cabeça.

Para uma nova sessão de agente, nada disso é óbvio.

Pense em um engenheiro que acabou de entrar no time e perdeu toda a memória do dia anterior. Ele precisa de um mapa curto, interfaces legíveis e uma forma de descobrir detalhes quando forem necessários. Jogar o repositório inteiro no contexto não resolve. Contexto demais compete com a tarefa atual e torna regras importantes mais fáceis de perder.

A OpenAI relatou esse problema ao descrever um `AGENTS.md` monolítico que virou um manual grande, difícil de manter e de verificar. A alternativa adotada foi usar o arquivo inicial como mapa para fontes mais específicas. É a velha ideia de documentação navegável aplicada a um leitor novo: primeiro a orientação, depois o detalhe.

Esse desenho é chamado de divulgação progressiva. O agente começa com o mínimo que vale para qualquer tarefa e abre documentos, skills e arquivos específicos conforme a necessidade.

No nosso exemplo, o primeiro nível poderia dizer:

```text
Use Node 22.
Não edite arquivos gerados.
Antes de encerrar, rode npm run lint e npm run build.
Leia docs/architecture.md antes de mudar dependências entre camadas.
```

O documento de arquitetura continua separado. A instrução inicial só mostra quando ele deve ser lido.

## Guias dizem como agir. Sensores mostram o que aconteceu

Um jeito prático de organizar o harness é separar **guias** de **sensores**.

Guias orientam o comportamento antes da ação. Uma especificação delimita o resultado esperado. Um arquivo de instruções explica convenções. A descrição de uma ferramenta mostra os argumentos válidos. Uma regra de permissão diz que alterar dados de produção exige aprovação humana.

Sensores observam o mundo depois da ação. O compilador encontra incompatibilidades de tipo. Um teste verifica comportamento. O linter encontra violações locais. O diff mostra o que realmente mudou. Logs e uma automação de navegador revelam problemas que a leitura do código não mostrou.

Essa separação também existe na engenharia tradicional. Um guia se parece com um contrato de interface ou um runbook. Um sensor se parece com uma assertion, uma métrica ou um alarme. O harness conecta os dois ao ciclo do agente.

Só uma instrução como "não quebre os tipos" é fraca. O modelo pode interpretá-la, esquecer uma exceção ou acreditar que cumpriu. O comando `tsc --noEmit` devolve um sinal externo e objetivo. A combinação é melhor: a regra explica a intenção e o compilador mostra se o resultado respeitou essa intenção.

## Ferramentas precisam ser legíveis

Dar acesso a um terminal não basta. O agente precisa entender qual ferramenta usar, em que diretório, com quais argumentos e como interpretar a saída.

Uma boa interface de ferramenta tem nome claro, descrição curta, parâmetros explícitos e erros úteis. Isso é muito parecido com desenhar uma Interface de Programação de Aplicações, ou API, para outros engenheiros. Se duas ferramentas parecem fazer a mesma coisa, o agente terá a mesma dúvida que uma pessoa teria.

O próprio repositório também faz parte dessa interface. Pastas previsíveis, módulos com fronteiras claras, tipos bem nomeados e testes perto do comportamento tornam o código mais navegável. O AI Hero resume a ideia tratando cada sessão de agente como a chegada de uma pessoa nova, sem memória. Práticas antigas como encapsulamento e test seams continuam valendo. Agora elas também reduzem o custo de orientação do agente.

No caso dos erros de TypeScript, um harness útil permite que o agente:

1. encontre o comando oficial de verificação;
2. rode o comando e guarde a saída completa;
3. escolha um erro pequeno e rastreável;
4. leia apenas os módulos envolvidos;
5. aplique a mudança;
6. rode novamente o compilador e os testes relacionados;
7. inspecione o diff antes de declarar conclusão.

O modelo continua responsável por diagnosticar e implementar a correção. O harness torna essa tentativa observável.

## Permissão é parte do projeto

Um agente com acesso irrestrito ao computador pode apagar arquivos, instalar dependências, chamar serviços externos ou mudar dados que não deveriam entrar na tarefa. Em vez de bloquear tudo, desenhe as permissões conforme o risco.

Uma sandbox oferece um espaço isolado para executar código. Uma lista de comandos permitidos reduz a superfície de dano. Aprovações humanas protegem ações irreversíveis, como publicar uma versão, mexer em produção ou enviar uma mensagem para um cliente.

Essa lógica já aparece em sistemas operacionais, contas de serviço e pipelines de deploy. Aplicamos o princípio do menor privilégio: cada processo recebe só o acesso necessário para fazer seu trabalho.

Para corrigir tipos localmente, o agente provavelmente precisa ler e editar o repositório, além de rodar comandos conhecidos. Ele não precisa de credenciais de produção. Se uma correção exigir uma decisão de contrato público, o harness deve parar e trazer a questão para quem tem autoridade.

Ao ampliar a autonomia, deslocamos a decisão humana para pontos explícitos do processo.

## "Terminei" ainda é uma afirmação

Agentes geram texto convincente. Isso inclui relatórios de sucesso.

O problema é que uma frase bem escrita não prova que o software funciona. A Anthropic relatou agentes de longa duração que encerravam o trabalho cedo porque viam bastante código pronto e concluíam que o objetivo tinha sido atingido. Também observou mudanças testadas de forma parcial, sem comprovação ponta a ponta.

O harness precisa transformar conclusão em evidência. Para a tarefa de TypeScript, isso pode significar:

- o comando de tipos terminou com código de saída zero;
- os testes relacionados passaram;
- o diff não contém arquivos fora do escopo;
- nenhum teste foi removido, pulado ou enfraquecido;
- o agente registrou o que mudou e o que não conseguiu verificar.

Cada item responde a uma falha possível. Nenhum deles existe para decorar o processo.

Há uma diferença importante entre autoavaliação e verificação. Pedir ao mesmo agente que "revise com cuidado" pode ajudar, mas ele continua carregando as mesmas suposições da implementação. Um compilador, um teste determinístico ou um revisor independente cria outra fonte de sinal.

## Estado fora da conversa

Trabalho maior que uma janela de contexto precisa sobreviver a sessões diferentes. O histórico do chat não é uma base confiável para isso.

Git registra o estado do código. Um plano registra decisões e próximos passos. Um log curto de progresso explica o que foi tentado. Critérios de aceite mantêm a definição de pronto disponível. Juntos, esses artefatos permitem que uma sessão nova retome o trabalho sem adivinhar.

Em um experimento com agentes de longa duração, a Anthropic combinou histórico do Git, uma lista estruturada de funcionalidades e um arquivo de progresso. Cada sessão trabalhava em uma parte pequena e deixava o ambiente limpo para a próxima. Os autores apresentam isso como uma solução possível para aquele cenário, não como fórmula universal. O mecanismo, porém, é familiar: passagem de turno com estado persistente.

Recuperação também entra aqui. Se uma tentativa piora o repositório, o agente precisa reconhecer o último estado válido, entender o erro e voltar com segurança. A capacidade de desfazer uma mudança é parte do harness, assim como é parte de qualquer pipeline de mudança bem projetado.

## O harness cresce a partir das falhas

É fácil ler uma lista de componentes e criar quinze arquivos de instrução, vinte skills e vários conectores antes da primeira tarefa. Isso só troca falta de contexto por excesso de configuração.

Um harness útil nasce de falhas observadas. Se o agente editou um arquivo gerado, adicione uma orientação curta e, quando possível, uma checagem mecânica. Se comentou um teste para fazer o pipeline passar, bloqueie esse padrão. Se sempre se perde num módulo, melhore o mapa ou a fronteira do próprio código.

Addy Osmani descreve essa prática como uma catraca: um erro real vira uma melhoria durável no ambiente. O objetivo é reduzir a chance de repetir os erros que o seu repositório já conhece, sem tentar proibir todo erro imaginável.

Esse cuidado evita dois extremos. Um harness vazio depende da sorte. Um harness cheio de regras copiadas de outros projetos carrega contradições, instruções vencidas e ferramentas que ninguém precisa.

## Onde isso quebra

Um build verde pode esconder um produto errado. Testes ruins só automatizam uma definição ruim de sucesso. Permissões estreitas demais impedem qualquer avanço, enquanto permissões amplas demais aumentam o impacto de uma decisão equivocada.

Documentação envelhece. Logs podem ser ruidosos. Um agente pode otimizar para passar no check e ignorar uma qualidade que o check não mede. Por isso o harness nunca remove a necessidade de entender o produto e revisar decisões caras.

Para produto e garantia de qualidade, ou QA, a consequência é concreta. Critérios de aceite precisam aparecer antes da implementação e virar sinais observáveis. "A tela funciona" não ajuda muito. "Ao salvar um e-mail inválido, a API responde 422 e a interface preserva os dados do formulário" oferece um contrato que o agente consegue implementar e que QA consegue verificar.

Harness Engineering ajuda a concentrar supervisão onde ela realmente vale o custo.

## Um primeiro harness para testar hoje

Escolha uma falha que já aconteceu no seu repositório. Só uma.

Escreva uma orientação de duas ou três linhas explicando o comportamento esperado. Depois adicione um sensor que produza evidência, como um typecheck, um teste, uma regra de lint ou uma inspeção de diff. Dê ao agente uma tarefa pequena e observe se ele consegue usar os dois sem ajuda.

Se funcionar, você transformou uma boa orientação em uma propriedade reutilizável do ambiente.

No próximo artigo, vamos colocar esse harness em movimento. A pergunta deixa de ser "como o agente trabalha bem nesta execução?" e passa a ser "como uma execução boa vira um processo que consegue repetir, registrar e parar?".
