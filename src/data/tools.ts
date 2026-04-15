export type ToolCategory = 'ide' | 'cli' | 'agent';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  whereItRuns: string;
  bestFor: string;
  targetUsers: string[];
  strengths: string[];
  commonRisks: string[];
}

export const tools: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'ide',
    whereItRuns: 'Editor desktop (fork do VS Code)',
    bestFor: 'Desenvolvimento com IA integrada no fluxo de edicao',
    targetUsers: ['dev junior', 'dev senior', 'dev fullstack'],
    strengths: [
      'IA embutida na interface de edicao',
      'Bom contexto de codigo automatico',
      'Chat inline e edicao com diff',
      'Modo agente pra tarefas maiores',
    ],
    commonRisks: [
      'Custo da assinatura pode nao compensar pra todos',
      'Dependencia do ecossistema VS Code',
      'Sugestoes podem ser aceitas sem revisao',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'ide',
    whereItRuns: 'Editor desktop (fork do VS Code)',
    bestFor: 'Desenvolvimento com foco em fluxo assistido',
    targetUsers: ['dev junior', 'dev senior'],
    strengths: [
      'Interface limpa com IA integrada',
      'Fluxos de trabalho assistidos',
      'Boa experiencia de onboarding',
    ],
    commonRisks: [
      'Ecossistema menor que Cursor',
      'Menos extensoes e integracao com terceiros',
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ide',
    whereItRuns: 'Extensao pra VS Code, JetBrains, Neovim e outros editores',
    bestFor: 'Autocomplete e sugestoes rapidas durante digitacao',
    targetUsers: ['dev junior', 'dev senior', 'QA automatizando testes'],
    strengths: [
      'Integra com qualquer editor popular',
      'Autocomplete muito rapido',
      'Chat embutido pra perguntas',
      'Facil de adotar em times grandes',
    ],
    commonRisks: [
      'Autocomplete pode virar muleta',
      'Sugestoes nem sempre consideram o contexto completo do projeto',
      'Aceitar sem ler e o risco numero um',
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor:
      'Tarefas complexas que envolvem multiplos arquivos, planejamento e execucao',
    targetUsers: ['dev senior', 'tech lead', 'dev que prefere terminal'],
    strengths: [
      'Opera diretamente no sistema de arquivos',
      'Planeja antes de executar',
      'Acesso a ferramentas do sistema (git, testes, lint)',
      'Bom pra refactors grandes e tarefas multi-arquivo',
    ],
    commonRisks: [
      'Curva de entrada pra quem nao usa terminal',
      'Precisa de supervisao em operacoes destrutivas',
      'Contexto depende de como voce estrutura o projeto',
    ],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor: 'Geracao e edicao de codigo via terminal com modelos OpenAI',
    targetUsers: ['dev senior', 'dev que ja usa ecossistema OpenAI'],
    strengths: [
      'Integra com ecossistema OpenAI',
      'Acesso ao terminal e sistema de arquivos',
      'Modelo configuravel',
    ],
    commonRisks: [
      'Ecossistema ainda em evolucao',
      'Depende de API key e custos de uso',
    ],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor:
      'Alternativa open source pra desenvolvimento assistido no terminal',
    targetUsers: ['dev que prefere ferramentas open source', 'dev senior'],
    strengths: [
      'Open source',
      'Configuravel com diferentes provedores de modelo',
      'Transparencia total no que a ferramenta faz',
    ],
    commonRisks: [
      'Comunidade menor',
      'Menos polish que alternativas comerciais',
      'Documentacao pode ser mais escassa',
    ],
  },
  {
    id: 'github-copilot-cli',
    name: 'GitHub Copilot CLI',
    category: 'cli',
    whereItRuns: 'Terminal como extensao do GitHub CLI (gh)',
    bestFor: 'Comandos de terminal e scripts rapidos assistidos por IA',
    targetUsers: ['dev que ja usa GitHub CLI', 'devops', 'QA'],
    strengths: [
      'Integrado com ecossistema GitHub',
      'Bom pra descobrir comandos de terminal',
      'Baixa fricao pra quem ja usa gh',
    ],
    commonRisks: [
      'Escopo mais limitado que agentes completos',
      'Focado em comandos, nao em projetos inteiros',
    ],
  },
];
