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
      'Large Language Model. Rede neural com bilhões de parâmetros treinada em grandes volumes de texto. Gera saída token a token com base em probabilidade condicional sobre a sequência de entrada.',
    example:
      'Quando você pede pro ChatGPT explicar um bug, o LLM por trás (GPT-4o, por exemplo) processa seu texto e gera uma resposta palavra por palavra.',
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
      'Conjunto de pesos e arquitetura de rede neural resultante de um processo de treinamento. Cada modelo tem características próprias de raciocínio, velocidade, janela de contexto e custo de inferência.',
    example:
      'Claude Sonnet é um modelo. Claude (o chat) é o produto. Você interage com o produto, mas quem "pensa" é o modelo.',
    commonMistake:
      'Confundir modelo com produto. Quando um PM fala "vamos usar o Claude", ele provavelmente quer dizer o produto. Quando um dev fala, pode estar falando do modelo específico (Sonnet, Opus, Haiku).',
    relatedTerms: ['llm', 'inferencia', 'token'],
  },
  {
    id: 'inferencia',
    term: 'Inferência',
    simpleDefinition:
      'O processo de pedir pro modelo gerar uma resposta. Cada vez que você manda uma mensagem, uma inferência acontece.',
    technicalDefinition:
      'Execução do modelo sobre uma entrada (prompt) para gerar uma saída (completion). Consome recursos computacionais e é cobrada por token processado na maioria das APIs.',
    example:
      'Você pergunta "como funciona async/await em TypeScript?" e recebe uma explicação. Essa geração de resposta é uma inferência.',
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
      'Unidade atômica de processamento de um LLM. O texto é dividido em tokens pelo tokenizer do modelo. Em média, 1 token equivale a ~4 caracteres em inglês ou ~3 caracteres em português.',
    example:
      'A frase "Bom dia" pode virar 2-3 tokens. Um arquivo de código com 500 linhas pode ter 3000-5000 tokens. Isso importa porque modelos têm limite de tokens.',
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
      'Sequência completa de tokens fornecida ao modelo como entrada, incluindo system prompt, histórico de mensagens e entrada atual. Limitada pela janela de contexto (context window) do modelo, medida em tokens.',
    example:
      'Se você manda um prompt com 3 arquivos de código e pede uma revisão, o contexto é tudo junto: seu pedido + os 3 arquivos. Se passar do limite, o modelo ignora ou corta o que não cabe.',
    commonMistake:
      'Achar que o modelo "lembra" de conversas anteriores. Ele só sabe o que está no contexto atual. Se você começar uma conversa nova, ele não sabe nada do que veio antes.',
    relatedTerms: ['token', 'prompt', 'system-prompt', 'contexto-de-codigo'],
  },

  // -- Interação --
  {
    id: 'prompt',
    term: 'Prompt',
    simpleDefinition:
      'O texto que você manda pro modelo. Pode ser uma pergunta, um pedido, uma instrução, ou tudo junto.',
    technicalDefinition:
      'Entrada textual fornecida ao modelo para gerar uma completion. Pode incluir instruções, exemplos (few-shot), restrições e formato esperado. A qualidade do prompt influencia diretamente a qualidade da saída.',
    example:
      'Prompt ruim: "faz um componente". Prompt melhor: "cria um componente React de botão com variantes primary e secondary, usando CSS Modules, com prop disabled e testes unitários".',
    commonMistake:
      'Achar que prompt é só "a pergunta". Prompt inclui contexto, restrições, exemplos e formato. Quanto mais estruturado, melhor o resultado.',
    relatedTerms: ['system-prompt', 'contexto', 'token'],
  },
  {
    id: 'system-prompt',
    term: 'System prompt',
    simpleDefinition:
      'Instruções iniciais que definem como o modelo deve se comportar. É como um briefing antes da conversa começar.',
    technicalDefinition:
      'Mensagem com role "system" enviada no início da conversa que define comportamento, tom, restrições e capacidades do assistente. Tem prioridade sobre mensagens do usuário na maioria dos modelos.',
    example:
      'Um system prompt pode dizer: "Você é um revisor de código sênior. Responda sempre em português. Aponte problemas de segurança primeiro." Isso molda todas as respostas seguintes.',
    commonMistake:
      'Ignorar o system prompt e reclamar que o modelo "não entende o que você quer". Muitas vezes o problema é a falta de instruções claras no system prompt.',
    relatedTerms: ['prompt', 'contexto'],
  },

  // -- Ferramentas --
  {
    id: 'ide',
    term: 'IDE',
    simpleDefinition:
      'O editor de código onde você escreve software. VS Code, Cursor, Windsurf são exemplos.',
    technicalDefinition:
      'Integrated Development Environment. Ambiente de desenvolvimento que integra editor de texto, terminal, debugger, controle de versão e extensões. No contexto de IA, IDEs modernas integram LLMs diretamente na interface de edição.',
    example:
      'Cursor é uma IDE que tem IA embutida. VS Code com extensão do Copilot vira uma IDE com IA. A diferença é onde a integração acontece: nativa ou via plugin.',
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
      'Command Line Interface. Interface textual onde o usuário interage via comandos digitados. No contexto de IA, CLIs como Claude Code e Codex CLI operam diretamente no sistema de arquivos e terminal, com acesso a ferramentas do sistema.',
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
      'Sistema de completamento de código que usa LLMs para prever e sugerir trechos de código baseado no contexto do arquivo atual, arquivos abertos e histórico de edição. Funciona em tempo real durante a digitação.',
    example:
      'Você começa a digitar "function validate" e a IA sugere o corpo inteiro da função baseado no nome e no contexto do arquivo. Você aceita com Tab ou ignora.',
    commonMistake:
      'Aceitar toda sugestão sem ler. Autocomplete é estatisticamente provável, não necessariamente correto. Cada sugestão precisa de uma olhada rápida.',
    relatedTerms: ['ide', 'contexto-de-codigo'],
  },
  {
    id: 'contexto-de-codigo',
    term: 'Contexto de código',
    simpleDefinition:
      'As informações sobre seu projeto que a IA usa pra entender o que você está fazendo: arquivos abertos, estrutura de pastas, dependências.',
    technicalDefinition:
      'Conjunto de informações do repositório fornecido ao modelo como parte do contexto: árvore de arquivos, conteúdo de arquivos relevantes, tipos, imports, testes, configurações. Ferramentas diferentes coletam contexto de código de formas diferentes.',
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
      'Sistema que combina um LLM com ferramentas (tool use) e lógica de controle para executar tarefas de forma autônoma. O agente interpreta objetivos, planeja passos, executa ações via ferramentas e itera até atingir o resultado ou falhar.',
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
      'Agente de IA com acesso a ferramentas de desenvolvimento: leitura/escrita de arquivos, execução de comandos no terminal, navegação no repositório, execução de testes. Opera dentro do contexto de um projeto de software.',
    example:
      'Claude Code é um agente de código. Você descreve o que quer, ele lê seus arquivos, escreve código, roda testes e commita. Cursor em modo agente também funciona assim.',
    commonMistake:
      'Dar autonomia total sem supervisão. Agentes de código são poderosos mas precisam de revisão humana. O output precisa ser validado antes de ir pra produção.',
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
      'Achar que MCP já é um padrão universal consolidado. É relativamente novo e ainda está em evolução. Nem todas as ferramentas suportam, e o ecossistema de servidores ainda está crescendo.',
    relatedTerms: ['agente', 'harness', 'contexto'],
  },
  {
    id: 'harness',
    term: 'Harness',
    simpleDefinition:
      'O sistema completo de trabalho de um agente de IA: instruções, ferramentas, regras, contexto. É o "ambiente" onde o agente opera.',
    technicalDefinition:
      'Camada de orquestração que define como um agente de código opera: system prompt, ferramentas disponíveis, regras de projeto, contexto persistente, validações automáticas, agentes especializados e critérios de aceite. Não é um padrão universal; o termo é usado aqui pra descrever essa camada.',
    example:
      'Um harness pode incluir: um CLAUDE.md com regras do projeto, um pre-commit hook que roda testes, um system prompt que define tom e padrões, e acesso a ferramentas específicas via MCP.',
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
      'Large Language Model. A neural network with billions of parameters trained on large text corpora. It generates output token by token based on conditional probability over the input sequence.',
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
      'The weights and architecture produced by a training process. Each model has its own reasoning profile, speed, context window, and inference cost.',
    example:
      'Claude Sonnet is a model. Claude is the product. You interact with the product, but the model generates the response.',
    commonMistake:
      'Confusing model and product. Ask whether someone means the chat product, the API, or a specific model.',
    relatedTerms: ['LLM', 'inference', 'token'],
  },
  {
    id: 'inferencia',
    term: 'Inference',
    simpleDefinition:
      'The act of asking the model to generate a response. Every message that gets an answer triggers inference.',
    technicalDefinition:
      'Running the model over an input prompt to produce a completion. It consumes compute and is often billed by tokens.',
    example:
      'You ask how async/await works and receive an explanation. That generation step is inference.',
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
      'A 500-line code file can be thousands of tokens. That matters because context windows have limits.',
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
      'Thinking the model remembers everything. It only knows what is in the current context unless the product adds memory.',
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
      'A text interface where users interact through commands. AI CLIs can read files, edit files, run tests, and use system tools.',
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
      'Repository information included in the model context, such as file tree, relevant file contents, imports, types, tests, and configs.',
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
      'A system combining an LLM, tools, and control logic to plan, act, observe, and iterate toward a goal.',
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
      'An AI agent with development tools: file read/write, terminal commands, repository navigation, and test execution.',
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
      'Treating MCP as fully settled and universal. It\'s useful, but the ecosystem is still evolving.',
    relatedTerms: ['agent', 'harness', 'context'],
  },
  {
    id: 'harness',
    term: 'Harness',
    simpleDefinition:
      'The complete work system around an AI agent: instructions, tools, rules, context, and validation.',
    technicalDefinition:
      'The orchestration layer around a coding agent: system prompt, available tools, project rules, persistent context, automated checks, and acceptance criteria.',
    example:
      'A harness can include `CLAUDE.md`, pre-commit checks, MCP tools, and project-specific instructions.',
    commonMistake:
      'Treating harness as something you install. It\'s a practice you build around the work.',
    relatedTerms: ['coding agent', 'MCP', 'system prompt'],
  },
];

export const glossaryByLang: Record<Lang, GlossaryTerm[]> = {
  'pt-BR': glossary,
  en: glossaryEn,
};
