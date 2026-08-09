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

Você começa um prompt em seu repo e pede algo simples: corrija os erros de TypeScript. Pouco depois, ele diz que terminou... Mas, o compilador ainda falha, um teste foi comentado e três arquivos sem relação com a tarefa mudaram.

É fácil culpar o modelo. Só que ele também não sabia qual comando representava sucesso, quais arquivos estavam fora do escopo nem quando deveria parar e pedir ajuda. O agente recebeu capacidade para editar código, mas não o contexto e os limites para trabalhar, olhando o caso acima.

Para resolver isso, existe uma camada ao redor do modelo. Ela entrega contexto, expõe ferramentas, controla permissões, registra estado e devolve sinais sobre a qualidade do trabalho. Esse camada é chamada de **harness**.

> agente = modelo + harness

O modelo é o motor de decisão. O harness permite usar esse motor em trabalho real. Ele inclui instruções do repositório, sistema de arquivos, Git, testes, sandbox, aprovações, logs e caminhos de recuperação.

Se você já configurou uma pipeline de Integração Contínua ou um runbook de incidentes, a ideia é familiar. Antes da Inteligência Artificial nós já projetávamos o ambiente em que o software seria executado e verificado.

## Seu repositório não cabe num prompt

Você sabe que o projeto usa `npm`, que arquivos gerados não devem ser editados e que a camada de domínio não pode importar componentes de interface, mas para uma sessão nova do seu Agente, nada disso é óbvio.

Pense num engenheiro que acabou de entrar no time. Ele precisa de um mapa curto e de um caminho para buscar detalhes quando necessário.

No nosso exemplo, a entrada poderia ser:

```text
Use Node 22.
Não edite arquivos gerados.
Antes de encerrar, rode npm run lint e npm run build.
Leia docs/architecture.md antes de mudar dependências entre camadas.
```

O documento de arquitetura continua separado. A instrução curta só diz quando abri-lo. Esse acesso gradual ao contexto costuma ser mais útil do que um manual enorme carregado em toda tarefa.

## Ferramentas, código e permissões

Dar acesso a um terminal não basta. O agente precisa entender qual ferramenta usar, em qual diretório e como interpretar a saída. Nomes claros, parâmetros explícitos e erros úteis importam tanto aqui quanto numa Interface de Programação de Aplicações, ou API, feita para pessoas.

O próprio código faz parte dessa interface. Pastas previsíveis, módulos com fronteiras claras, tipos bem nomeados e testes próximos do comportamento ajudam uma pessoa nova e também um agente. Cada sessão chega ao repositório sem memória. Encapsulamento, coesão e bons pontos de teste continuam valendo e são mais importantes do que nunca agora também como recursos de navegação.

Seguindo o exemplo, para corrigir os erros de TypeScript, o agente deveria conseguir:

1. encontrar o comando oficial de verificação;
2. escolher um erro pequeno;
3. ler apenas os módulos envolvidos;
4. aplicar a correção;
5. rodar novamente compilador e testes;
6. inspecionar o diff antes de concluir.

Para essa tarefa, o agente precisa editar o repositório e executar comandos conhecidos; Permissão também entra no desenho e o velho princípio do menor privilégio deve ser seguido por aqui. Sandbox, comandos permitidos e aprovações limitam o impacto de uma decisão errada sem travar todo o trabalho.

## “Terminei” precisa virar evidência

Agentes escrevem relatórios de sucesso convincentes. Isso não prova que o software funciona.

No nosso caso:

- os testes relacionados passam;
- o diff não inclui arquivos fora do escopo;
- nenhum teste foi removido ou enfraquecido;
- o agente registra o que não conseguiu verificar.

Para produto e garantia de qualidade, isso começa nos critérios de aceite. Instruções de verificação como “A tela funciona” é muito abstrato. Precisamos de boas definições, como: “Ao salvar um e-mail inválido, a API responde 422 e o formulário preserva os dados”.

## Deixe as falhas ensinarem o harness

Não comece criando quinze arquivos de regras e vinte integrações. Um harness útil cresce a partir de falhas observadas.

Se o agente errou feio, adicione uma orientação curta e, se possível, uma checagem mecânica. Se comentou um teste para fazer o pipeline passar, bloqueie esse padrão. Se sempre se perde num módulo, melhore o mapa ou a fronteira do próprio código.

Um erro real vira uma melhoria durável no ambiente. O objetivo é evitar a repetição das falhas que o repositório já conhece, sem tentar prever todo erro imaginável.

O harness também tem limites. Build verde pode esconder produto errado. Documentação envelhece. Checks ruins automatizam definições ruins de sucesso. Regras demais criam contradições, e regras de menos deixam tudo na sorte.

Para começar, escolha uma falha que já aconteceu. Escreva uma orientação de duas linhas e adicione um sensor, como typecheck, teste ou inspeção de diff. Dê ao agente uma tarefa pequena e observe se ele usa os dois sem ajuda.

Se funcionar, você transformou uma boa orientação em uma propriedade reutilizável do ambiente.
