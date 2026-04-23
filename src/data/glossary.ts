import type { Lang } from '../lib/i18n';

export interface GlossaryTerm {
  id: string;
  term: string;
  simpleDefinition: string;
  technicalDefinition: string;
  example: string;
  commonMistake: string;
  relatedTerms: string[];
}

export const glossary: GlossaryTerm[] = [
  // -- Fundamentos de IA --
  {
    id: 'llm',
    term: 'LLM',
    simpleDefinition:
      'Um programa de computador treinado pra ler e escrever texto. Você manda uma pergunta, ele gera uma resposta.',
    technicalDefinition:
      'Large Language Model. Rede neural com bilhões de parâmetros, treinada em grandes volumes de texto, que gera saída token a token com base em probabilidade condicional sobre a entrada.',
    example:
      'Quando você pede pro ChatGPT explicar um bug, o LLM por trás (GPT-4o) processa seu texto e gera uma resposta palavra por palavra.',
    commonMistake:
      'Achar que LLM é sinônimo de ChatGPT. ChatGPT é um produto. GPT-4o é o LLM dentro dele. São coisas diferentes.',
    relatedTerms: ['modelo', 'token', 'inferencia', 'contexto'],
  },
  {
    id: 'modelo',
    term: 'Modelo',
    simpleDefinition:
      'O "cérebro" treinado que processa texto. Diferentes modelos têm diferentes capacidades, velocidades e custos.',
    technicalDefinition:
      'Pesos e arquitetura de rede neural produzidos por treinamento. Cada modelo tem raciocínio, velocidade, janela de contexto e custo próprios.',
    example:
      'Claude Sonnet é um modelo. Claude (o chat) é o produto. Você interage com o produto, mas quem "pensa" é o modelo.',
    commonMistake:
      'Confundir modelo com produto. Pergunte se a pessoa se refere ao chat, à API ou a um modelo específico.',
    relatedTerms: ['llm', 'inferencia', 'token'],
  },
  {
    id: 'inferencia',
    term: 'Inferência',
    simpleDefinition: 'O processo de pedir pro modelo gerar uma resposta.',
    technicalDefinition:
      'Execução do modelo sobre uma entrada (prompt) para gerar uma saída (completion). Consome recursos computacionais e é cobrada por token processado na maioria das APIs.',
    example:
      'Você pergunta "como funciona async/await?" e recebe uma explicação. Essa geração é uma inferência.',
    commonMistake:
      'Achar que inferência é instantânea e gratuita. Cada inferência custa tempo e dinheiro. Modelos maiores custam mais por inferência.',
    relatedTerms: ['modelo', 'token', 'prompt'],
  },
  {
    id: 'token',
    term: 'Token',
    simpleDefinition:
      'Um pedaço de texto que o modelo processa. Pode ser uma palavra inteira, parte de uma palavra, ou um caractere especial.',
    technicalDefinition:
      'Unidade atômica de processamento de um LLM. O texto é dividido em tokens pelo tokenizer do modelo.',
    example:
      'A frase "Bom dia" pode virar 2-3 tokens. Um arquivo de 500 linhas pode ter milhares de tokens (~3-4 caracteres por token em português).',
    commonMistake:
      'Ignorar a contagem de tokens. Se você manda um arquivo gigante pro modelo e ele "esquece" o começo, provavelmente estourou a janela de contexto.',
    relatedTerms: ['contexto', 'llm', 'inferencia'],
  },
  {
    id: 'contexto',
    term: 'Contexto',
    simpleDefinition:
      'Tudo que o modelo "vê" quando gera uma resposta: sua pergunta, o histórico da conversa, instruções do sistema, arquivos anexados.',
    technicalDefinition:
      'Sequência completa de tokens fornecida ao modelo como entrada, limitada pela janela de contexto (context window).',
    example:
      'Se você manda um prompt com 3 arquivos de código e pede uma revisão, o contexto é tudo junto: seu pedido + os 3 arquivos. Se passar do limite, o modelo ignora ou corta o que não cabe.',
    commonMistake:
      'Achar que o modelo "lembra" de conversas anteriores. Ele só sabe o que está no contexto atual.',
    relatedTerms: ['token', 'prompt', 'system-prompt', 'contexto-de-codigo'],
  },

  // -- Interação --
  {
    id: 'prompt',
    term: 'Prompt',
    simpleDefinition:
      'O texto que você manda pro modelo. Pode ser uma pergunta, um pedido, uma instrução, ou tudo junto.',
    technicalDefinition:
      'Entrada textual fornecida ao modelo para gerar uma completion. Pode incluir instruções, exemplos (few-shot), restrições e formato esperado.',
    example:
      'Prompt ruim: "faz um componente". Prompt melhor: "cria um componente React de botão com variantes primary e secondary, usando CSS Modules, com prop disabled e testes unitários".',
    commonMistake:
      'Achar que prompt é só "a pergunta". Prompt inclui contexto, restrições, exemplos e formato.',
    relatedTerms: ['system-prompt', 'contexto', 'token'],
  },
  {
    id: 'system-prompt',
    term: 'System prompt',
    simpleDefinition:
      'Instruções iniciais que definem como o modelo deve se comportar. É como um briefing antes da conversa começar.',
    technicalDefinition:
      'Mensagem com role "system" enviada no início da conversa que define comportamento, tom, restrições e capacidades do assistente.',
    example:
      'Um system prompt pode dizer: "Você é um revisor de código sênior. Responda sempre em português. Aponte problemas de segurança primeiro."',
    commonMistake:
      'Ignorar o system prompt e reclamar que o modelo "não entende o que você quer". Muitas vezes o problema é a falta de instruções claras no system prompt.',
    relatedTerms: ['prompt', 'contexto'],
  },

  // -- Vibe coding e plataformas --
  {
    id: 'vibe-coding',
    term: 'Vibe coding',
    simpleDefinition:
      'Criar software descrevendo o que você quer em linguagem natural e deixando a IA gerar boa parte do código.',
    technicalDefinition:
      'Workflow de desenvolvimento assistido por LLMs no qual o humano dirige intenção, testa resultados e itera via prompts, frequentemente sem escrever manualmente cada trecho de código.',
    example:
      'Você pede "cria um app de agenda com login e dashboard" no Lovable, Bolt ou v0, testa o preview e pede ajustes em linguagem natural.',
    commonMistake:
      'Achar que app gerado e app pronto são a mesma coisa. Sem revisão, teste e entendimento, ainda é protótipo.',
    relatedTerms: ['prompt-to-app', 'prototipo', 'spec', 'validacao'],
  },
  {
    id: 'prompt-to-app',
    term: 'Prompt-to-app',
    simpleDefinition:
      'Plataforma que transforma uma descrição em um app funcional com telas, código, preview e às vezes deploy.',
    technicalDefinition:
      'Categoria de ferramentas que combina LLM, ambiente de execução, editor, gerenciamento de arquivos, preview, integrações e publicação para gerar aplicações a partir de prompts.',
    example:
      'Lovable, Bolt, v0, Replit Agent e Firebase Studio são exemplos de plataformas que reduzem o caminho entre ideia e app clicável.',
    commonMistake:
      'Confundir conveniência com qualidade. A plataforma acelera criação, mas não garante arquitetura, segurança ou manutenção.',
    relatedTerms: ['vibe-coding', 'preview', 'deploy', 'sandbox'],
  },
  {
    id: 'prototipo',
    term: 'Protótipo',
    simpleDefinition:
      'Uma versão inicial para testar ideia, fluxo ou interface antes de tratar como produto final.',
    technicalDefinition:
      'Artefato experimental usado para validar hipóteses de produto, usabilidade ou viabilidade técnica com menor compromisso de arquitetura e manutenção.',
    example:
      'Um PM gera um portal de onboarding no v0 para testar o fluxo com usuários antes de pedir implementação formal ao time.',
    commonMistake:
      'Colocar usuário real, dado sensível ou pagamento em um protótipo sem passar por revisão de produção.',
    relatedTerms: ['vibe-coding', 'preview', 'validacao'],
  },
  {
    id: 'scaffold',
    term: 'Scaffold',
    simpleDefinition:
      'A estrutura inicial de um projeto: pastas, arquivos, configuração e código base para começar.',
    technicalDefinition:
      'Geração de boilerplate e estrutura mínima de aplicação, incluindo framework, dependências, rotas, componentes, scripts e arquivos de configuração.',
    example:
      'O Bolt cria um projeto Vite com package.json, src/, componentes e servidor de desenvolvimento rodando no navegador.',
    commonMistake:
      'Aceitar o scaffold como arquitetura definitiva. Ele é ponto de partida, não decisão eterna.',
    relatedTerms: ['prompt-to-app', 'sandbox', 'contexto-de-codigo'],
  },
  {
    id: 'preview',
    term: 'Preview',
    simpleDefinition:
      'Uma visualização temporária do app rodando para você testar rapidamente no navegador.',
    technicalDefinition:
      'Ambiente de execução ou build temporário usado para inspecionar comportamento, interface e estados antes de revisão, merge ou deploy final.',
    example:
      'A plataforma abre uma URL com o app gerado para você clicar no fluxo antes de publicar.',
    commonMistake:
      'Achar que porque abriu no preview está pronto para produção. Preview mostra que roda, não que está seguro ou correto.',
    relatedTerms: ['prototipo', 'deploy', 'validacao'],
  },
  {
    id: 'deploy',
    term: 'Deploy',
    simpleDefinition:
      'Publicar uma versão do app em um ambiente onde outras pessoas conseguem acessar.',
    technicalDefinition:
      'Processo de empacotar, configurar e disponibilizar uma aplicação em infraestrutura de execução, como Vercel, Firebase, GitHub Pages ou outro ambiente.',
    example:
      'Depois de revisar o PR, o time publica a versão no ambiente de staging ou produção.',
    commonMistake:
      'Fazer deploy direto do protótipo sem checar variáveis de ambiente, permissões, logs, rollback e monitoramento.',
    relatedTerms: ['preview', 'pull-request', 'validacao'],
  },
  {
    id: 'sandbox',
    term: 'Sandbox',
    simpleDefinition:
      'Um ambiente isolado onde a IA ou o app pode rodar sem mexer diretamente no seu ambiente principal.',
    technicalDefinition:
      'Ambiente controlado de execução com permissões limitadas, usado para reduzir risco ao instalar dependências, rodar comandos, editar arquivos ou testar código.',
    example:
      'Um agente na nuvem trabalha em um sandbox separado e entrega um diff para revisão em vez de alterar a branch principal.',
    commonMistake:
      'Achar que sandbox elimina todos os riscos. Ele reduz blast radius, mas ainda exige revisão de código e permissões.',
    relatedTerms: ['agente', 'prompt-to-app', 'deploy'],
  },
  {
    id: 'pull-request',
    term: 'Pull request',
    simpleDefinition:
      'Um pedido para revisar e juntar mudanças de código em uma branch principal.',
    technicalDefinition:
      'Objeto de colaboração em sistemas Git, como GitHub, que apresenta commits, diff, checks, comentários e histórico de revisão antes do merge.',
    example:
      'Em vez de publicar direto, o agente abre um PR com as mudanças para dev, QA e CI validarem.',
    commonMistake:
      'Tratar PR como formalidade. PR é onde código gerado encontra revisão humana e validação automática.',
    relatedTerms: ['diff', 'deploy', 'validacao'],
  },
  {
    id: 'diff',
    term: 'Diff',
    simpleDefinition:
      'A comparação que mostra exatamente quais linhas foram adicionadas, removidas ou alteradas.',
    technicalDefinition:
      'Representação textual de mudanças entre versões de arquivos, usada para revisão, auditoria, patching e colaboração em Git.',
    example:
      'Antes de aceitar o código do agente, você lê o diff para ver se ele mexeu só no que foi pedido.',
    commonMistake:
      'Clicar em aceitar tudo sem ler. O diff é onde aparecem mudanças indevidas, secrets, dependências estranhas e atalhos perigosos.',
    relatedTerms: ['pull-request', 'validacao', 'ownership'],
  },
  {
    id: 'spec',
    term: 'Spec',
    simpleDefinition:
      'Uma descrição clara do que precisa ser construído, para quem, com quais regras e limites.',
    technicalDefinition:
      'Especificação funcional e técnica que define comportamento esperado, entradas, saídas, restrições, casos de borda, critérios de aceite e validação.',
    example:
      'Antes de pedir para a IA criar um portal, você define perfis de usuário, telas, permissões, dados salvos e o que fica fora da v1.',
    commonMistake:
      'Escrever "faz um app moderno" e esperar precisão. Sem spec, o modelo preenche buracos com chute plausível.',
    relatedTerms: ['prompt', 'validacao', 'vibe-coding'],
  },
  {
    id: 'validacao',
    term: 'Validação',
    simpleDefinition:
      'Checar se o que a IA gerou funciona, faz o que foi pedido e não cria risco.',
    technicalDefinition:
      'Conjunto de verificações manuais e automatizadas como revisão de diff, testes, typecheck, lint, análise de segurança, QA e critérios de aceite.',
    example:
      'Depois de gerar uma feature, você roda testes, revisa permissões, checa erros e compara com a spec antes de publicar.',
    commonMistake:
      'Validar só clicando no caminho feliz. Software quebra nos estados vazios, erros, permissões e casos de borda.',
    relatedTerms: ['spec', 'diff', 'pull-request', 'ownership'],
  },
  {
    id: 'ownership',
    term: 'Ownership',
    simpleDefinition:
      'Assumir responsabilidade pelo código, mesmo quando ele foi gerado por IA.',
    technicalDefinition:
      'Responsabilidade técnica e operacional sobre entendimento, manutenção, segurança, evolução e impacto de um artefato de software.',
    example:
      'Se você fez merge de um PR gerado por agente, você precisa conseguir explicar o que ele muda e como reverter se der errado.',
    commonMistake:
      'Culpar a ferramenta por código aceito sem revisão. IA pode gerar; quem entrega é o time.',
    relatedTerms: ['validacao', 'diff', 'harness'],
  },
  {
    id: 'divida-tecnica',
    term: 'Dívida técnica',
    simpleDefinition:
      'Atalho que deixa o projeto mais rápido hoje, mas mais caro de mudar amanhã.',
    technicalDefinition:
      'Custo acumulado por decisões técnicas subótimas, como duplicação, falta de testes, baixa coesão, acoplamento excessivo, inconsistência de padrões ou arquitetura frágil.',
    example:
      'Um app gerado rápido funciona na demo, mas cada feature nova quebra outra parte porque não existe padrão de dados nem testes.',
    commonMistake:
      'Achar que dívida técnica é só código feio. Ela aparece como atraso, medo de mexer e bugs repetidos.',
    relatedTerms: ['vibe-coding', 'validacao', 'ownership'],
  },
  {
    id: 'rls',
    term: 'RLS',
    simpleDefinition:
      'Regras no banco que controlam quais linhas cada usuário pode ver ou alterar.',
    technicalDefinition:
      'Row-Level Security. Mecanismo de bancos como PostgreSQL e Supabase que aplica políticas de acesso por linha, normalmente baseado no usuário autenticado.',
    example:
      'Em um app multiusuário, RLS impede que um usuário leia tarefas privadas de outro usuário só mudando um ID na URL.',
    commonMistake:
      'Confiar só no front-end para esconder dados. Segurança precisa estar no backend e no banco também.',
    relatedTerms: ['validacao', 'deploy', 'ownership'],
  },

  // -- Ferramentas --
  {
    id: 'ide',
    term: 'IDE',
    simpleDefinition:
      'O editor de código onde você escreve software. VS Code, Cursor, Windsurf são exemplos.',
    technicalDefinition:
      'Integrated Development Environment. No contexto de IA, IDEs modernas integram LLMs diretamente na interface de edição.',
    example:
      'Cursor é uma IDE com IA embutida. VS Code com Copilot vira uma IDE com IA via plugin.',
    commonMistake:
      'Achar que IDE com IA é automaticamente melhor que terminal com IA. São interfaces diferentes pra workflows diferentes. Nenhuma é universalmente superior.',
    relatedTerms: ['cli', 'autocomplete', 'contexto-de-codigo'],
  },
  {
    id: 'cli',
    term: 'CLI',
    simpleDefinition:
      'Interface de linha de comando. Você digita texto no terminal e recebe texto de volta. Ferramentas como Claude Code rodam assim.',
    technicalDefinition:
      'Command Line Interface. No contexto de IA, CLIs como Claude Code e Codex CLI operam diretamente no sistema de arquivos e terminal, com acesso a ferramentas do sistema.',
    example:
      'Em vez de clicar em menus, você digita "claude code review src/api.ts" no terminal. A IA lê o arquivo, analisa e responde ali mesmo.',
    commonMistake:
      'Achar que CLI é só pra devs hardcore. CLIs de IA modernas são conversacionais e acessíveis. A curva de entrada é menor do que parece.',
    relatedTerms: ['ide', 'agente-de-codigo'],
  },
  {
    id: 'autocomplete',
    term: 'Autocomplete',
    simpleDefinition:
      'Quando a IA sugere o próximo trecho de código enquanto você digita. Tipo o autocomplete do celular, mas pra código.',
    technicalDefinition:
      'Sistema de completamento de código que usa LLMs para prever e sugerir trechos baseado no contexto do arquivo atual, arquivos abertos e histórico de edição.',
    example:
      'Você começa a digitar "function validate" e a IA sugere o corpo inteiro da função baseado no nome e no contexto do arquivo. Você aceita com Tab ou ignora.',
    commonMistake:
      'Aceitar toda sugestão sem ler. Autocomplete é estatisticamente provável, não necessariamente correto.',
    relatedTerms: ['ide', 'contexto-de-codigo'],
  },
  {
    id: 'contexto-de-codigo',
    term: 'Contexto de código',
    simpleDefinition:
      'As informações sobre seu projeto que a IA usa pra entender o que você está fazendo: arquivos abertos, estrutura de pastas, dependências.',
    technicalDefinition:
      'Conjunto de informações do repositório fornecido ao modelo como parte do contexto. Ferramentas diferentes coletam contexto de código de formas diferentes.',
    example:
      'Quando o Cursor sugere código, ele olha não só o arquivo atual mas também os imports, tipos definidos em outros arquivos e padrões do projeto. Quanto melhor o contexto, melhor a sugestão.',
    commonMistake:
      'Achar que a IA "conhece" todo seu projeto automaticamente. Cada ferramenta tem limites de quanto contexto consegue incluir. Projetos grandes precisam de curadoria do que vai pro contexto.',
    relatedTerms: ['contexto', 'ide', 'autocomplete'],
  },

  // -- Agentes e sistemas --
  {
    id: 'agente',
    term: 'Agente',
    simpleDefinition:
      'Um programa que usa IA pra tomar decisões e executar ações sozinho, não só responder perguntas.',
    technicalDefinition:
      'Sistema que combina um LLM com ferramentas (tool use) e lógica de controle para executar tarefas de forma autônoma.',
    example:
      'Você pede "refatora esse módulo pra usar o padrão repository". O agente lê os arquivos, planeja as mudanças, edita o código, roda os testes e reporta o resultado. Tudo sem você intervir em cada passo.',
    commonMistake:
      'Confundir chatbot com agente. Um chatbot responde perguntas. Um agente executa tarefas. A diferença é autonomia e acesso a ferramentas.',
    relatedTerms: ['agente-de-codigo', 'llm', 'harness'],
  },
  {
    id: 'agente-de-codigo',
    term: 'Agente de código',
    simpleDefinition:
      'Um agente especializado em escrever, editar e revisar código. Tem acesso ao seu projeto e pode fazer mudanças diretamente.',
    technicalDefinition:
      'Agente de IA com acesso a ferramentas de desenvolvimento: leitura/escrita de arquivos, terminal, navegação no repositório e testes.',
    example:
      'Claude Code é um agente de código. Você descreve o que quer, ele lê seus arquivos, escreve código, roda testes e commita. Cursor em modo agente também funciona assim.',
    commonMistake:
      'Dar autonomia total sem supervisão. Agentes de código são poderosos mas precisam de revisão humana.',
    relatedTerms: ['agente', 'cli', 'ide', 'harness'],
  },
  {
    id: 'mcp',
    term: 'MCP',
    simpleDefinition:
      'Um padrão que permite que ferramentas de IA se conectem a serviços externos de forma organizada. Tipo um USB pra IA.',
    technicalDefinition:
      'Model Context Protocol. Protocolo aberto que padroniza como aplicações de IA se conectam a fontes de dados e ferramentas externas. Define um formato comum para servidores de contexto que podem ser consumidos por qualquer cliente compatível.',
    example:
      'Um servidor MCP de GitHub permite que qualquer ferramenta de IA (Claude Code, Cursor, etc.) acesse issues, PRs e repositórios sem cada ferramenta precisar implementar a integração do zero.',
    commonMistake:
      'Achar que MCP já é um padrão universal consolidado. É relativamente novo e ainda está em evolução.',
    relatedTerms: ['agente', 'harness', 'contexto'],
  },
  {
    id: 'harness',
    term: 'Harness',
    simpleDefinition:
      'O sistema completo de trabalho de um agente de IA: instruções, ferramentas, regras, contexto. É o "ambiente" onde o agente opera.',
    technicalDefinition:
      'Camada de orquestração que define como um agente de código opera. Não é um padrão universal; o termo é usado aqui pra descrever essa camada.',
    example:
      'Um harness pode incluir: um AGENTS.md com regras do projeto (CLAUDE.md no Claude Code), um pre-commit hook que roda testes, um system prompt que define tom e padrões, e acesso a ferramentas específicas via MCP.',
    commonMistake:
      'Tratar harness como algo que você "instala". É uma prática, não um produto. Você constrói o harness do seu time ao longo do tempo, ajustando conforme o projeto evolui.',
    relatedTerms: ['agente-de-codigo', 'mcp', 'system-prompt'],
  },
];

export const glossaryEn: GlossaryTerm[] = [
  {
    id: 'llm',
    term: 'LLM',
    simpleDefinition:
      'A computer program trained to read and write text. You send a question, it generates an answer.',
    technicalDefinition:
      'Large Language Model. A neural network with billions of parameters, trained on massive amounts of text, that generates output token by token based on conditional probability over the input.',
    example:
      'When you ask ChatGPT to explain a bug, the LLM behind it processes your text and generates the answer piece by piece.',
    commonMistake:
      'Treating LLM as a synonym for ChatGPT. ChatGPT is a product. GPT-4o is an LLM inside it.',
    relatedTerms: ['model', 'token', 'inference', 'context'],
  },
  {
    id: 'modelo',
    term: 'Model',
    simpleDefinition:
      'The trained "brain" that processes text. Different models have different capabilities, speeds, and costs.',
    technicalDefinition:
      'Weights and architecture produced by training. Each model has its own reasoning profile, speed, context window, and inference cost.',
    example:
      'Claude Sonnet is a model. Claude is the product. You interact with the product, but the model generates the response.',
    commonMistake:
      'Confusing model and product. Ask whether someone means the chat product, the API, or a specific model.',
    relatedTerms: ['LLM', 'inference', 'token'],
  },
  {
    id: 'inferencia',
    term: 'Inference',
    simpleDefinition: 'The act of asking the model to generate a response.',
    technicalDefinition:
      'Running the model over an input prompt to produce a completion. It consumes compute and is often billed by tokens.',
    example:
      'You ask how async/await works and get an explanation. That generation step is inference.',
    commonMistake:
      'Assuming inference is instant and free. Larger models usually cost more time and money per request.',
    relatedTerms: ['model', 'token', 'prompt'],
  },
  {
    id: 'token',
    term: 'Token',
    simpleDefinition:
      'A chunk of text the model processes. It can be a word, part of a word, or a special character.',
    technicalDefinition:
      'The atomic processing unit of an LLM. Text is split into tokens by the model tokenizer before inference.',
    example:
      'A 500-line file can be thousands of tokens (~4 chars per token in English).',
    commonMistake:
      'Ignoring token count. If a giant prompt makes the model forget the beginning, the context window probably overflowed.',
    relatedTerms: ['context', 'LLM', 'inference'],
  },
  {
    id: 'contexto',
    term: 'Context',
    simpleDefinition:
      'Everything the model can see while generating an answer: your prompt, chat history, system instructions, files.',
    technicalDefinition:
      'The complete token sequence provided as input to the model, bounded by the context window.',
    example:
      'For a code review, context can include your request plus the files you attached or selected.',
    commonMistake:
      "Thinking the model remembers everything. It only knows what's in the current context.",
    relatedTerms: ['token', 'prompt', 'system prompt', 'code context'],
  },
  {
    id: 'prompt',
    term: 'Prompt',
    simpleDefinition:
      'The text you send to the model. It can be a question, a request, an instruction, or all of that together.',
    technicalDefinition:
      'Textual input used to generate a completion. It can include instructions, examples, constraints, and output format.',
    example:
      'Bad: "make a component". Better: "create a React button with primary and secondary variants, CSS Modules, disabled prop, and tests".',
    commonMistake:
      'Thinking a prompt is only the question. Good prompts include context, constraints, examples, and expected format.',
    relatedTerms: ['system prompt', 'context', 'token'],
  },
  {
    id: 'system-prompt',
    term: 'System prompt',
    simpleDefinition:
      'Initial instructions that shape how the model should behave. A briefing before the conversation starts.',
    technicalDefinition:
      'A system-role message that defines behavior, tone, constraints, and capabilities for the assistant.',
    example:
      'A system prompt can say: "You are a senior code reviewer. Point out security issues first."',
    commonMistake:
      'Ignoring system instructions and then blaming the model for not understanding the job.',
    relatedTerms: ['prompt', 'context'],
  },
  {
    id: 'vibe-coding',
    term: 'Vibe coding',
    simpleDefinition:
      'Creating software by describing what you want in natural language and letting AI generate a large part of the code.',
    technicalDefinition:
      'A development workflow assisted by LLMs in which the human directs intent, tests outputs, and iterates through prompts instead of manually writing every code fragment.',
    example:
      'You ask Lovable, Bolt, or v0 to create a planner app with login and a dashboard, test the preview, and then ask for changes in plain language.',
    commonMistake:
      'Assuming generated app and finished app are the same thing. Without review, tests, and understanding, it is still a prototype.',
    relatedTerms: ['prompt-to-app', 'prototype', 'spec', 'validation'],
  },
  {
    id: 'prompt-to-app',
    term: 'Prompt-to-app',
    simpleDefinition:
      'A platform that turns a description into a functional app with screens, code, preview, and sometimes deploy.',
    technicalDefinition:
      'A category of tools that combines LLMs, runtime environment, editor, file management, preview, integrations, and publishing to generate applications from prompts.',
    example:
      'Lovable, Bolt, v0, Replit Agent, and Firebase Studio shorten the path between an idea and a clickable app.',
    commonMistake:
      'Confusing convenience with quality. The platform accelerates creation, but it does not guarantee architecture, security, or maintainability.',
    relatedTerms: ['vibe-coding', 'preview', 'deploy', 'sandbox'],
  },
  {
    id: 'prototipo',
    term: 'Prototype',
    simpleDefinition:
      'An early version used to test an idea, flow, or interface before treating it as a final product.',
    technicalDefinition:
      'An experimental artifact used to validate product, usability, or technical hypotheses with a lower commitment to architecture and long-term maintenance.',
    example:
      'A PM generates an onboarding portal in v0 to test the flow with users before asking engineering to implement it properly.',
    commonMistake:
      'Putting real users, sensitive data, or payments into a prototype without a production review.',
    relatedTerms: ['vibe-coding', 'preview', 'validation'],
  },
  {
    id: 'scaffold',
    term: 'Scaffold',
    simpleDefinition:
      'The starting structure of a project: folders, files, config, and base code.',
    technicalDefinition:
      'The generated boilerplate and minimum app structure, including framework setup, dependencies, routes, components, scripts, and configuration files.',
    example:
      'Bolt creates a Vite project with package.json, src/, components, and a running development server in the browser.',
    commonMistake:
      'Treating the scaffold as the final architecture. It is a starting point, not an eternal decision.',
    relatedTerms: ['prompt-to-app', 'sandbox', 'code context'],
  },
  {
    id: 'preview',
    term: 'Preview',
    simpleDefinition:
      'A temporary view of the app running in the browser so you can test it quickly.',
    technicalDefinition:
      'A temporary build or runtime environment used to inspect behavior, UI, and states before review, merge, or final deployment.',
    example:
      'The platform opens a URL for the generated app so you can click through the main flow before publishing.',
    commonMistake:
      'Assuming that if it opens in preview, it is ready for production. Preview shows that it runs, not that it is correct or secure.',
    relatedTerms: ['prototype', 'deploy', 'validation'],
  },
  {
    id: 'deploy',
    term: 'Deploy',
    simpleDefinition:
      'Publishing a version of the app to an environment other people can access.',
    technicalDefinition:
      'The process of packaging, configuring, and releasing an application to an execution environment such as Vercel, Firebase, GitHub Pages, or another hosting target.',
    example:
      'After reviewing the PR, the team publishes the version to staging or production.',
    commonMistake:
      'Deploying the prototype directly without checking environment variables, permissions, logs, rollback, and monitoring.',
    relatedTerms: ['preview', 'pull request', 'validation'],
  },
  {
    id: 'sandbox',
    term: 'Sandbox',
    simpleDefinition:
      'An isolated environment where AI or the app can run without directly touching your main environment.',
    technicalDefinition:
      'A controlled execution environment with limited permissions, used to reduce risk when installing dependencies, running commands, editing files, or testing code.',
    example:
      'A cloud agent works in a separate sandbox and returns a diff for review instead of editing the main branch directly.',
    commonMistake:
      'Assuming a sandbox removes all risk. It reduces blast radius, but code and permissions still need review.',
    relatedTerms: ['agent', 'prompt-to-app', 'deploy'],
  },
  {
    id: 'pull-request',
    term: 'Pull request',
    simpleDefinition:
      'A request to review and merge code changes into a main branch.',
    technicalDefinition:
      'A Git collaboration object, common on GitHub, that presents commits, diff, checks, comments, and review history before merge.',
    example:
      'Instead of publishing directly, the agent opens a PR so dev, QA, and CI can validate the changes.',
    commonMistake:
      'Treating a PR as a formality. A PR is where AI-generated code meets human review and automated validation.',
    relatedTerms: ['diff', 'deploy', 'validation'],
  },
  {
    id: 'diff',
    term: 'Diff',
    simpleDefinition:
      'The comparison showing exactly which lines were added, removed, or changed.',
    technicalDefinition:
      'A textual representation of changes between file versions, used for review, auditing, patching, and Git collaboration.',
    example:
      'Before accepting the agent output, you read the diff to check whether it changed only what you asked for.',
    commonMistake:
      'Clicking accept-all without reading. The diff is where you spot unwanted changes, secrets, odd dependencies, and risky shortcuts.',
    relatedTerms: ['pull request', 'validation', 'ownership'],
  },
  {
    id: 'spec',
    term: 'Spec',
    simpleDefinition:
      'A clear description of what needs to be built, for whom, with which rules and limits.',
    technicalDefinition:
      'A functional and technical specification describing expected behavior, inputs, outputs, constraints, edge cases, acceptance criteria, and validation requirements.',
    example:
      'Before asking AI to build a portal, you define user roles, screens, permissions, stored data, and what stays out of v1.',
    commonMistake:
      'Writing "build a modern app" and expecting precision. Without a spec, the model fills the gaps with plausible guesses.',
    relatedTerms: ['prompt', 'validation', 'vibe-coding'],
  },
  {
    id: 'validacao',
    term: 'Validation',
    simpleDefinition:
      'Checking whether what AI generated works, matches the request, and does not create risk.',
    technicalDefinition:
      'A set of manual and automated checks such as diff review, tests, typecheck, lint, security analysis, QA, and acceptance criteria verification.',
    example:
      'After generating a feature, you run tests, review permissions, inspect error states, and compare the result with the spec before publishing.',
    commonMistake:
      'Validating only by clicking the happy path. Software usually breaks on empty states, errors, permissions, and edge cases.',
    relatedTerms: ['spec', 'diff', 'pull request', 'ownership'],
  },
  {
    id: 'ownership',
    term: 'Ownership',
    simpleDefinition:
      'Taking responsibility for the code, even when AI generated it.',
    technicalDefinition:
      'Technical and operational responsibility for understanding, maintaining, securing, evolving, and answering for a software artifact.',
    example:
      'If you merged an agent-generated PR, you should be able to explain what it changes and how to roll it back if needed.',
    commonMistake:
      'Blaming the tool for code that was accepted without review. AI can generate it; the team is still responsible for shipping it.',
    relatedTerms: ['validation', 'diff', 'harness'],
  },
  {
    id: 'divida-tecnica',
    term: 'Technical debt',
    simpleDefinition:
      'A shortcut that makes the project faster today and more expensive to change tomorrow.',
    technicalDefinition:
      'Accumulated cost from suboptimal technical decisions such as duplication, missing tests, weak cohesion, excessive coupling, inconsistent patterns, or fragile architecture.',
    example:
      'A quickly generated app works in the demo, but every new feature breaks something else because there are no data rules or tests.',
    commonMistake:
      'Thinking technical debt is only ugly code. It also shows up as delays, fear of touching things, and recurring bugs.',
    relatedTerms: ['vibe-coding', 'validation', 'ownership'],
  },
  {
    id: 'rls',
    term: 'RLS',
    simpleDefinition:
      'Database rules that control which rows each user can view or change.',
    technicalDefinition:
      'Row-Level Security. A feature in databases such as PostgreSQL and Supabase that applies per-row access policies, usually based on the authenticated user.',
    example:
      "In a multi-user app, RLS stops one user from reading another user's private tasks just by changing an ID in the URL.",
    commonMistake:
      'Relying only on the front end to hide data. Real security must also exist in the backend and database.',
    relatedTerms: ['validation', 'deploy', 'ownership'],
  },
  {
    id: 'ide',
    term: 'IDE',
    simpleDefinition:
      'The code editor where you write software. VS Code, Cursor, and Windsurf are examples.',
    technicalDefinition:
      'Integrated Development Environment. In AI tooling, IDEs integrate LLMs into editing, chat, and code actions.',
    example:
      'Cursor has AI built in. VS Code with Copilot becomes AI-assisted through an extension.',
    commonMistake:
      'Assuming an AI IDE is always better than a terminal tool. They serve different workflows.',
    relatedTerms: ['CLI', 'autocomplete', 'code context'],
  },
  {
    id: 'cli',
    term: 'CLI',
    simpleDefinition:
      'Command-line interface. You type in the terminal and get text back. Tools like Claude Code run this way.',
    technicalDefinition:
      'Command Line Interface. AI CLIs can read/write files, run tests, and use system tools directly from the terminal.',
    example:
      'You ask a terminal agent to review `src/api.ts`; it reads the file and responds in the terminal.',
    commonMistake:
      'Thinking CLI means only hardcore devs. Modern AI CLIs are conversational and much more approachable.',
    relatedTerms: ['IDE', 'coding agent'],
  },
  {
    id: 'autocomplete',
    term: 'Autocomplete',
    simpleDefinition:
      'AI suggests the next piece of code while you type. Like phone autocomplete, but for code.',
    technicalDefinition:
      'Code completion powered by LLMs using current file, open files, and editor context.',
    example:
      'You type `function validate` and the tool suggests an implementation based on nearby code.',
    commonMistake:
      'Accepting every suggestion without reading it. Autocomplete is likely, not necessarily correct.',
    relatedTerms: ['IDE', 'code context'],
  },
  {
    id: 'contexto-de-codigo',
    term: 'Code context',
    simpleDefinition:
      'The project information AI uses: open files, folder structure, dependencies, types, tests.',
    technicalDefinition:
      'Repository information provided to the model as context. Different tools collect code context differently.',
    example:
      'Cursor can use imports and nearby files to suggest code that fits your project better than generic chat output.',
    commonMistake:
      'Assuming AI automatically knows the whole project. Every tool has context limits.',
    relatedTerms: ['context', 'IDE', 'autocomplete'],
  },
  {
    id: 'agente',
    term: 'Agent',
    simpleDefinition:
      'A program that uses AI to make decisions and take actions, not just answer questions.',
    technicalDefinition:
      'A system combining an LLM, tools, and control logic to execute tasks autonomously.',
    example:
      'You ask for a refactor. The agent reads files, plans edits, changes code, runs tests, and reports back.',
    commonMistake:
      'Confusing chatbot and agent. A chatbot responds; an agent does work through tools.',
    relatedTerms: ['coding agent', 'LLM', 'harness'],
  },
  {
    id: 'agente-de-codigo',
    term: 'Coding agent',
    simpleDefinition:
      'An agent specialized in writing, editing, and reviewing code. It can access your project directly.',
    technicalDefinition:
      'An AI agent with development tools: file read/write, terminal, repo navigation, and test execution.',
    example:
      'Claude Code and Codex CLI are coding agents. Cursor agent mode also follows this pattern.',
    commonMistake:
      'Giving full autonomy without validation. Coding agents are powerful, but output still needs review.',
    relatedTerms: ['agent', 'CLI', 'IDE', 'harness'],
  },
  {
    id: 'mcp',
    term: 'MCP',
    simpleDefinition:
      'A standard that lets AI tools connect to external services in an organized way. Kind of like USB for AI tools.',
    technicalDefinition:
      'Model Context Protocol. An open protocol for connecting AI applications to data sources and tools through shared server interfaces.',
    example:
      'A GitHub MCP server can let compatible AI tools access issues, PRs, and repositories.',
    commonMistake:
      "Treating MCP as fully settled and universal. It's useful, but the ecosystem is still evolving.",
    relatedTerms: ['agent', 'harness', 'context'],
  },
  {
    id: 'harness',
    term: 'Harness',
    simpleDefinition:
      'The complete work system around an AI agent: instructions, tools, rules, context, and validation.',
    technicalDefinition:
      'The orchestration layer defining how a coding agent operates. Not a universal standard; the term describes this conceptual layer.',
    example:
      'A harness can include `AGENTS.md` (`CLAUDE.md` in Claude Code), pre-commit checks, MCP tools, and project-specific instructions.',
    commonMistake:
      "Treating harness as something you install. It's a practice you build around the work.",
    relatedTerms: ['coding agent', 'MCP', 'system prompt'],
  },
];

export const glossaryByLang: Record<Lang, GlossaryTerm[]> = {
  'pt-BR': glossary,
  en: glossaryEn,
};
