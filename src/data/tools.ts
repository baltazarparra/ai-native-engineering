import type { Lang } from '../lib/i18n';

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

export const toolsEn: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'ide',
    whereItRuns: 'Desktop editor, as a VS Code fork',
    bestFor: 'AI-assisted development integrated into the editing flow',
    targetUsers: ['junior dev', 'senior dev', 'full-stack dev'],
    strengths: [
      'AI built into the editing interface',
      'Good automatic code context',
      'Inline chat and visual diff editing',
      'Agent mode for larger tasks',
    ],
    commonRisks: [
      'Subscription cost may not make sense for everyone',
      'Strong dependency on the VS Code ecosystem',
      'Suggestions can be accepted without enough review',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'ide',
    whereItRuns: 'Desktop editor, as a VS Code fork',
    bestFor: 'AI-assisted development with a clean workflow focus',
    targetUsers: ['junior dev', 'senior dev'],
    strengths: [
      'Clean interface with integrated AI',
      'Assisted workflows',
      'Friendly onboarding experience',
    ],
    commonRisks: [
      'Smaller ecosystem than Cursor',
      'Fewer extensions and third-party integrations',
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ide',
    whereItRuns: 'Extension for VS Code, JetBrains, Neovim, and other editors',
    bestFor: 'Autocomplete and quick suggestions while coding',
    targetUsers: ['junior dev', 'senior dev', 'QA automating tests'],
    strengths: [
      'Works in most popular editors',
      'Very fast autocomplete',
      'Built-in chat for quick questions',
      'Easy to adopt in large teams',
    ],
    commonRisks: [
      'Autocomplete can become a crutch',
      'Suggestions may not include full project context',
      'Accepting without reading is the number one risk',
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Complex tasks involving multiple files, planning, and execution',
    targetUsers: ['senior dev', 'tech lead', 'terminal-first dev'],
    strengths: [
      'Operates directly on the file system',
      'Plans before executing',
      'Can use system tools like git, tests, and lint',
      'Strong fit for large refactors and multi-file tasks',
    ],
    commonRisks: [
      'Higher learning curve for people who do not use terminal',
      'Needs supervision around destructive operations',
      'Context depends on how the project is structured',
    ],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Code generation and editing in the terminal with OpenAI models',
    targetUsers: ['senior dev', 'dev already using OpenAI'],
    strengths: [
      'Integrates with the OpenAI ecosystem',
      'Terminal and file system access',
      'Configurable model',
    ],
    commonRisks: [
      'Ecosystem is still evolving',
      'Depends on API keys and usage cost',
    ],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Open source alternative for AI-assisted terminal development',
    targetUsers: ['open source tool users', 'senior dev'],
    strengths: [
      'Open source',
      'Configurable with different model providers',
      'Transparent about what the tool does',
    ],
    commonRisks: [
      'Smaller community',
      'Less polish than commercial alternatives',
      'Documentation can be thinner',
    ],
  },
  {
    id: 'github-copilot-cli',
    name: 'GitHub Copilot CLI',
    category: 'cli',
    whereItRuns: 'Terminal as a GitHub CLI extension',
    bestFor: 'AI-assisted terminal commands and quick scripts',
    targetUsers: ['GitHub CLI users', 'DevOps', 'QA'],
    strengths: [
      'Integrated with GitHub',
      'Useful for discovering terminal commands',
      'Low friction for people already using gh',
    ],
    commonRisks: [
      'More limited than full coding agents',
      'Focused on commands, not entire projects',
    ],
  },
];

export const toolsByLang: Record<Lang, Tool[]> = {
  'pt-BR': tools,
  en: toolsEn,
};
