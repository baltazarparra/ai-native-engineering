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
      'Um programa de computador treinado pra ler e escrever texto. Voce manda uma pergunta, ele gera uma resposta.',
    technicalDefinition:
      'Large Language Model. Rede neural com bilhoes de parametros treinada em grandes volumes de texto. Gera saida token a token com base em probabilidade condicional sobre a sequencia de entrada.',
    example:
      'Quando voce pede pro ChatGPT explicar um bug, o LLM por tras (GPT-4o, por exemplo) processa seu texto e gera uma resposta palavra por palavra.',
    commonMistake:
      'Achar que LLM e sinonimo de ChatGPT. ChatGPT e um produto. GPT-4o e o LLM dentro dele. Sao coisas diferentes.',
    relatedTerms: ['modelo', 'token', 'inferencia', 'contexto'],
  },
  {
    id: 'modelo',
    term: 'Modelo',
    simpleDefinition:
      'O "cerebro" treinado que processa texto. Diferentes modelos tem diferentes capacidades, velocidades e custos.',
    technicalDefinition:
      'Conjunto de pesos e arquitetura de rede neural resultante de um processo de treinamento. Cada modelo tem caracteristicas proprias de raciocinio, velocidade, janela de contexto e custo de inferencia.',
    example:
      'Claude Sonnet e um modelo. Claude (o chat) e o produto. Voce interage com o produto, mas quem "pensa" e o modelo.',
    commonMistake:
      'Confundir modelo com produto. Quando um PM fala "vamos usar o Claude", ele provavelmente quer dizer o produto. Quando um dev fala, pode estar falando do modelo especifico (Sonnet, Opus, Haiku).',
    relatedTerms: ['llm', 'inferencia', 'token'],
  },
  {
    id: 'inferencia',
    term: 'Inferencia',
    simpleDefinition:
      'O processo de pedir pro modelo gerar uma resposta. Cada vez que voce manda uma mensagem, uma inferencia acontece.',
    technicalDefinition:
      'Execucao do modelo sobre uma entrada (prompt) para gerar uma saida (completion). Consome recursos computacionais e e cobrada por token processado na maioria das APIs.',
    example:
      'Voce pergunta "como funciona async/await em TypeScript?" e recebe uma explicacao. Essa geracao de resposta e uma inferencia.',
    commonMistake:
      'Achar que inferencia e instantanea e gratuita. Cada inferencia custa tempo e dinheiro. Modelos maiores custam mais por inferencia.',
    relatedTerms: ['modelo', 'token', 'prompt'],
  },
  {
    id: 'token',
    term: 'Token',
    simpleDefinition:
      'Um pedaco de texto que o modelo processa. Pode ser uma palavra inteira, parte de uma palavra, ou um caractere especial.',
    technicalDefinition:
      'Unidade atomica de processamento de um LLM. O texto e dividido em tokens pelo tokenizer do modelo. Em media, 1 token equivale a ~4 caracteres em ingles ou ~3 caracteres em portugues.',
    example:
      'A frase "Bom dia" pode virar 2-3 tokens. Um arquivo de codigo com 500 linhas pode ter 3000-5000 tokens. Isso importa porque modelos tem limite de tokens.',
    commonMistake:
      'Ignorar a contagem de tokens. Se voce manda um arquivo gigante pro modelo e ele "esquece" o comeco, provavelmente estourou a janela de contexto.',
    relatedTerms: ['contexto', 'llm', 'inferencia'],
  },
  {
    id: 'contexto',
    term: 'Contexto',
    simpleDefinition:
      'Tudo que o modelo "ve" quando gera uma resposta: sua pergunta, o historico da conversa, instrucoes do sistema, arquivos anexados.',
    technicalDefinition:
      'Sequencia completa de tokens fornecida ao modelo como entrada, incluindo system prompt, historico de mensagens e entrada atual. Limitada pela janela de contexto (context window) do modelo, medida em tokens.',
    example:
      'Se voce manda um prompt com 3 arquivos de codigo e pede uma revisao, o contexto e tudo junto: seu pedido + os 3 arquivos. Se passar do limite, o modelo ignora ou corta o que nao cabe.',
    commonMistake:
      'Achar que o modelo "lembra" de conversas anteriores. Ele so sabe o que esta no contexto atual. Se voce comecar uma conversa nova, ele nao sabe nada do que veio antes.',
    relatedTerms: ['token', 'prompt', 'system-prompt', 'contexto-de-codigo'],
  },

  // -- Interacao --
  {
    id: 'prompt',
    term: 'Prompt',
    simpleDefinition:
      'O texto que voce manda pro modelo. Pode ser uma pergunta, um pedido, uma instrucao, ou tudo junto.',
    technicalDefinition:
      'Entrada textual fornecida ao modelo para gerar uma completion. Pode incluir instrucoes, exemplos (few-shot), restricoes e formato esperado. A qualidade do prompt influencia diretamente a qualidade da saida.',
    example:
      'Prompt ruim: "faz um componente". Prompt melhor: "cria um componente React de botao com variantes primary e secondary, usando CSS Modules, com prop disabled e testes unitarios".',
    commonMistake:
      'Achar que prompt e so "a pergunta". Prompt inclui contexto, restricoes, exemplos e formato. Quanto mais estruturado, melhor o resultado.',
    relatedTerms: ['system-prompt', 'contexto', 'token'],
  },
  {
    id: 'system-prompt',
    term: 'System prompt',
    simpleDefinition:
      'Instrucoes iniciais que definem como o modelo deve se comportar. E como um briefing antes da conversa comecar.',
    technicalDefinition:
      'Mensagem com role "system" enviada no inicio da conversa que define comportamento, tom, restricoes e capacidades do assistente. Tem prioridade sobre mensagens do usuario na maioria dos modelos.',
    example:
      'Um system prompt pode dizer: "Voce e um revisor de codigo senior. Responda sempre em portugues. Aponte problemas de seguranca primeiro." Isso molda todas as respostas seguintes.',
    commonMistake:
      'Ignorar o system prompt e reclamar que o modelo "nao entende o que voce quer". Muitas vezes o problema e a falta de instrucoes claras no system prompt.',
    relatedTerms: ['prompt', 'contexto'],
  },

  // -- Ferramentas --
  {
    id: 'ide',
    term: 'IDE',
    simpleDefinition:
      'O editor de codigo onde voce escreve software. VS Code, Cursor, Windsurf sao exemplos.',
    technicalDefinition:
      'Integrated Development Environment. Ambiente de desenvolvimento que integra editor de texto, terminal, debugger, controle de versao e extensoes. No contexto de IA, IDEs modernas integram LLMs diretamente na interface de edicao.',
    example:
      'Cursor e uma IDE que tem IA embutida. VS Code com extensao do Copilot vira uma IDE com IA. A diferenca e onde a integracao acontece: nativa ou via plugin.',
    commonMistake:
      'Achar que IDE com IA e automaticamente melhor que terminal com IA. Sao interfaces diferentes pra workflows diferentes. Nenhuma e universalmente superior.',
    relatedTerms: ['cli', 'autocomplete', 'contexto-de-codigo'],
  },
  {
    id: 'cli',
    term: 'CLI',
    simpleDefinition:
      'Interface de linha de comando. Voce digita texto no terminal e recebe texto de volta. Ferramentas como Claude Code rodam assim.',
    technicalDefinition:
      'Command Line Interface. Interface textual onde o usuario interage via comandos digitados. No contexto de IA, CLIs como Claude Code e Codex CLI operam diretamente no sistema de arquivos e terminal, com acesso a ferramentas do sistema.',
    example:
      'Em vez de clicar em menus, voce digita "claude code review src/api.ts" no terminal. A IA le o arquivo, analisa e responde ali mesmo.',
    commonMistake:
      'Achar que CLI e so pra devs hardcore. CLIs de IA modernas sao conversacionais e acessiveis. A curva de entrada e menor do que parece.',
    relatedTerms: ['ide', 'agente-de-codigo'],
  },
  {
    id: 'autocomplete',
    term: 'Autocomplete',
    simpleDefinition:
      'Quando a IA sugere o proximo trecho de codigo enquanto voce digita. Tipo o autocomplete do celular, mas pra codigo.',
    technicalDefinition:
      'Sistema de completamento de codigo que usa LLMs para prever e sugerir trechos de codigo baseado no contexto do arquivo atual, arquivos abertos e historico de edicao. Funciona em tempo real durante a digitacao.',
    example:
      'Voce comeca a digitar "function validate" e a IA sugere o corpo inteiro da funcao baseado no nome e no contexto do arquivo. Voce aceita com Tab ou ignora.',
    commonMistake:
      'Aceitar toda sugestao sem ler. Autocomplete e estatisticamente provavel, nao necessariamente correto. Cada sugestao precisa de uma olhada rapida.',
    relatedTerms: ['ide', 'contexto-de-codigo'],
  },
  {
    id: 'contexto-de-codigo',
    term: 'Contexto de codigo',
    simpleDefinition:
      'As informacoes sobre seu projeto que a IA usa pra entender o que voce esta fazendo: arquivos abertos, estrutura de pastas, dependencias.',
    technicalDefinition:
      'Conjunto de informacoes do repositorio fornecido ao modelo como parte do contexto: arvore de arquivos, conteudo de arquivos relevantes, tipos, imports, testes, configuracoes. Ferramentas diferentes coletam contexto de codigo de formas diferentes.',
    example:
      'Quando o Cursor sugere codigo, ele olha nao so o arquivo atual mas tambem os imports, tipos definidos em outros arquivos e padroes do projeto. Quanto melhor o contexto, melhor a sugestao.',
    commonMistake:
      'Achar que a IA "conhece" todo seu projeto automaticamente. Cada ferramenta tem limites de quanto contexto consegue incluir. Projetos grandes precisam de curadoria do que vai pro contexto.',
    relatedTerms: ['contexto', 'ide', 'autocomplete'],
  },

  // -- Agentes e sistemas --
  {
    id: 'agente',
    term: 'Agente',
    simpleDefinition:
      'Um programa que usa IA pra tomar decisoes e executar acoes sozinho, nao so responder perguntas.',
    technicalDefinition:
      'Sistema que combina um LLM com ferramentas (tool use) e logica de controle para executar tarefas de forma autonoma. O agente interpreta objetivos, planeja passos, executa acoes via ferramentas e itera ate atingir o resultado ou falhar.',
    example:
      'Voce pede "refatora esse modulo pra usar o padrao repository". O agente le os arquivos, planeja as mudancas, edita o codigo, roda os testes e reporta o resultado. Tudo sem voce intervir em cada passo.',
    commonMistake:
      'Confundir chatbot com agente. Um chatbot responde perguntas. Um agente executa tarefas. A diferenca e autonomia e acesso a ferramentas.',
    relatedTerms: ['agente-de-codigo', 'llm', 'harness'],
  },
  {
    id: 'agente-de-codigo',
    term: 'Agente de codigo',
    simpleDefinition:
      'Um agente especializado em escrever, editar e revisar codigo. Tem acesso ao seu projeto e pode fazer mudancas diretamente.',
    technicalDefinition:
      'Agente de IA com acesso a ferramentas de desenvolvimento: leitura/escrita de arquivos, execucao de comandos no terminal, navegacao no repositorio, execucao de testes. Opera dentro do contexto de um projeto de software.',
    example:
      'Claude Code e um agente de codigo. Voce descreve o que quer, ele le seus arquivos, escreve codigo, roda testes e commita. Cursor em modo agente tambem funciona assim.',
    commonMistake:
      'Dar autonomia total sem supervisao. Agentes de codigo sao poderosos mas precisam de revisao humana. O output precisa ser validado antes de ir pra producao.',
    relatedTerms: ['agente', 'cli', 'ide', 'harness'],
  },
  {
    id: 'mcp',
    term: 'MCP',
    simpleDefinition:
      'Um padrao que permite que ferramentas de IA se conectem a servicos externos de forma organizada. Tipo um USB pra IA.',
    technicalDefinition:
      'Model Context Protocol. Protocolo aberto que padroniza como aplicacoes de IA se conectam a fontes de dados e ferramentas externas. Define um formato comum para servidores de contexto que podem ser consumidos por qualquer cliente compativel.',
    example:
      'Um servidor MCP de GitHub permite que qualquer ferramenta de IA (Claude Code, Cursor, etc.) acesse issues, PRs e repositorios sem cada ferramenta precisar implementar a integracao do zero.',
    commonMistake:
      'Achar que MCP ja e um padrao universal consolidado. E relativamente novo e ainda esta em evolucao. Nem todas as ferramentas suportam, e o ecossistema de servidores ainda esta crescendo.',
    relatedTerms: ['agente', 'harness', 'contexto'],
  },
  {
    id: 'harness',
    term: 'Harness',
    simpleDefinition:
      'O sistema completo de trabalho de um agente de IA: instrucoes, ferramentas, regras, contexto. E o "ambiente" onde o agente opera.',
    technicalDefinition:
      'Camada de orquestracao que define como um agente de codigo opera: system prompt, ferramentas disponiveis, regras de projeto, contexto persistente, validacoes automaticas, agentes especializados e criterios de aceite. Nao e um padrao universal; o termo e usado aqui pra descrever essa camada.',
    example:
      'Um harness pode incluir: um CLAUDE.md com regras do projeto, um pre-commit hook que roda testes, um system prompt que define tom e padroes, e acesso a ferramentas especificas via MCP.',
    commonMistake:
      'Tratar harness como algo que voce "instala". E uma pratica, nao um produto. Voce constroi o harness do seu time ao longo do tempo, ajustando conforme o projeto evolui.',
    relatedTerms: ['agente-de-codigo', 'mcp', 'system-prompt'],
  },
];
