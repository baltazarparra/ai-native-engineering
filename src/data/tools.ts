import type { Lang } from '../lib/i18n';

export type ToolCategory = 'ide' | 'cli' | 'agent' | 'app';

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
    bestFor: 'Desenvolvimento com IA integrada na edição',
    targetUsers: ['dev júnior', 'dev sênior', 'dev fullstack'],
    strengths: [
      'IA embutida na edição',
      'Contexto de código automático',
      'Modo agente pra tarefas maiores',
    ],
    commonRisks: [
      'Custo pode não compensar pra todos',
      'Dependência do ecossistema VS Code',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'ide',
    whereItRuns: 'Editor desktop (fork do VS Code)',
    bestFor: 'Desenvolvimento com fluxo assistido',
    targetUsers: ['dev júnior', 'dev sênior'],
    strengths: [
      'Interface limpa com IA integrada',
      'Fluxos assistidos',
      'Boa experiência de onboarding',
    ],
    commonRisks: [
      'Ecossistema menor que Cursor',
      'Menos extensões e integrações',
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ide',
    whereItRuns: 'Extensão pra VS Code, JetBrains, Neovim e outros',
    bestFor: 'Autocomplete e sugestões rápidas ao digitar',
    targetUsers: ['dev júnior', 'dev sênior', 'QA automatizando testes'],
    strengths: [
      'Integra com editores populares',
      'Autocomplete muito rápido',
      'Fácil de adotar em times grandes',
    ],
    commonRisks: [
      'Autocomplete pode virar muleta',
      'Nem sempre considera o contexto completo',
    ],
  },
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    category: 'ide',
    whereItRuns: 'Editor desktop (fork do VS Code)',
    bestFor: 'Desenvolvimento com agentes autônomos integrados na IDE',
    targetUsers: ['dev júnior', 'dev sênior', 'dev fullstack'],
    strengths: [
      'Modo agente com painel de controle dedicado',
      'Janela de contexto de 2M tokens',
      'Tier gratuito com modelos premium',
    ],
    commonRisks: [
      'Sem suporte a MCP',
      'Estabilidade ainda inconsistente',
      'Todo código processado nos servidores do Google',
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor: 'Tarefas complexas com múltiplos arquivos e planejamento',
    targetUsers: ['dev sênior', 'tech lead', 'dev que prefere terminal'],
    strengths: [
      'Opera direto no sistema de arquivos',
      'Planeja antes de executar',
      'Acesso a git, testes e lint',
    ],
    commonRisks: [
      'Curva de entrada pra quem não usa terminal',
      'Requer supervisão em operações destrutivas',
    ],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor: 'Código via terminal com modelos OpenAI',
    targetUsers: ['dev sênior', 'dev que já usa ecossistema OpenAI'],
    strengths: [
      'Integra com ecossistema OpenAI',
      'Acesso ao terminal e arquivos',
      'Modelo configurável',
    ],
    commonRisks: [
      'Ecossistema ainda em evolução',
      'Depende de API key e custos',
    ],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'cli',
    whereItRuns: 'Terminal / linha de comando',
    bestFor: 'Alternativa open source pra dev assistido no terminal',
    targetUsers: ['dev que prefere ferramentas open source', 'dev sênior'],
    strengths: ['Open source', 'Configurável com vários provedores'],
    commonRisks: ['Comunidade menor', 'Menos polish que opções comerciais'],
  },
  {
    id: 'github-copilot-cli',
    name: 'GitHub Copilot CLI',
    category: 'cli',
    whereItRuns: 'Terminal como extensão do GitHub CLI (gh)',
    bestFor: 'Comandos e scripts rápidos assistidos por IA',
    targetUsers: ['dev que já usa GitHub CLI', 'devops', 'QA'],
    strengths: [
      'Integrado com GitHub',
      'Bom pra descobrir comandos',
      'Baixa fricção pra quem já usa gh',
    ],
    commonRisks: [
      'Escopo mais limitado que agentes',
      'Focado em comandos, não em projetos',
    ],
  },
  {
    id: 'codex-app',
    name: 'Codex App',
    category: 'app',
    whereItRuns: 'App desktop e web (sandbox na nuvem)',
    bestFor: 'Delegar tarefas de código bem definidas pra agentes na nuvem',
    targetUsers: ['dev sênior', 'tech lead'],
    strengths: [
      'Múltiplos agentes em paralelo com isolamento via git worktree',
      'Sandbox seguro sem acesso à internet',
      'Interface limpa pra gerenciar tarefas',
    ],
    commonRisks: [
      'Custa $200/mês (tier Pro)',
      'Precisa de instruções muito claras pra funcionar bem',
    ],
  },
  {
    id: 'google-jules',
    name: 'Google Jules',
    category: 'app',
    whereItRuns: 'App web (sandbox na nuvem)',
    bestFor: 'Tarefas assíncronas de código com integração GitHub',
    targetUsers: ['dev sênior', 'tech lead'],
    strengths: [
      'Integrado com GitHub',
      'Assíncrono — trabalha enquanto você faz outra coisa',
      'Powered by Gemini',
    ],
    commonRisks: [
      'Focado em tarefas bem definidas',
      'Ecossistema ainda em evolução',
    ],
  },
  {
    id: 'devin',
    name: 'Devin',
    category: 'app',
    whereItRuns: 'App web (sandbox na nuvem com terminal, editor e browser)',
    bestFor: 'Tarefas complexas autônomas: migrações, refactors grandes, infra',
    targetUsers: ['dev sênior', 'tech lead', 'times de engenharia'],
    strengths: [
      'Autonomia completa: planeja, codifica, testa e abre PR',
      'Timeline de replay pra ver tudo que o agente fez',
      'Integração com Slack, Teams, Jira, Linear',
    ],
    commonRisks: [
      'Qualidade inconsistente em tarefas ambíguas',
      'Custos imprevisíveis no modelo por uso (ACU)',
      'Todo código passa pela infra da Cognition',
    ],
  },
];

export const toolsEn: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'ide',
    whereItRuns: 'Desktop editor (VS Code fork)',
    bestFor: 'AI-assisted development in the editing flow',
    targetUsers: ['junior dev', 'senior dev', 'full-stack dev'],
    strengths: [
      'AI built into the editor',
      'Good automatic code context',
      'Agent mode for larger tasks',
    ],
    commonRisks: [
      'Subscription cost may not suit everyone',
      'Depends on VS Code ecosystem',
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'ide',
    whereItRuns: 'Desktop editor (VS Code fork)',
    bestFor: 'AI-assisted development with clean workflows',
    targetUsers: ['junior dev', 'senior dev'],
    strengths: [
      'Clean interface with integrated AI',
      'Assisted workflows',
      'Friendly onboarding',
    ],
    commonRisks: [
      'Smaller ecosystem than Cursor',
      'Fewer extensions and integrations',
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ide',
    whereItRuns: 'Extension for VS Code, JetBrains, Neovim, and others',
    bestFor: 'Autocomplete and quick suggestions while coding',
    targetUsers: ['junior dev', 'senior dev', 'QA automating tests'],
    strengths: [
      'Works in most popular editors',
      'Very fast autocomplete',
      'Easy to adopt in large teams',
    ],
    commonRisks: [
      'Autocomplete can become a crutch',
      'May miss full project context',
    ],
  },
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    category: 'ide',
    whereItRuns: 'Desktop editor (VS Code fork)',
    bestFor: 'Development with autonomous agents built into the IDE',
    targetUsers: ['junior dev', 'senior dev', 'full-stack dev'],
    strengths: [
      'Agent mode with dedicated control panel',
      '2M token context window',
      'Free tier with premium models',
    ],
    commonRisks: [
      'No MCP support',
      'Stability still inconsistent',
      'All code processed on Google servers',
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Complex multi-file tasks with planning',
    targetUsers: ['senior dev', 'tech lead', 'terminal-first dev'],
    strengths: [
      'Operates directly on the file system',
      'Plans before executing',
      'Access to git, tests, and lint',
    ],
    commonRisks: [
      'Steeper curve for non-terminal users',
      'Needs supervision for destructive ops',
    ],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Code generation in terminal via OpenAI',
    targetUsers: ['senior dev', 'dev already using OpenAI'],
    strengths: [
      'Integrates with OpenAI ecosystem',
      'Terminal and file system access',
      'Configurable model',
    ],
    commonRisks: ['Ecosystem still evolving', 'Depends on API keys and cost'],
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'cli',
    whereItRuns: 'Terminal / command line',
    bestFor: 'Open-source AI-assisted terminal dev',
    targetUsers: ['open source tool users', 'senior dev'],
    strengths: ['Open source', 'Configurable with multiple providers'],
    commonRisks: ['Smaller community', 'Less polish than commercial options'],
  },
  {
    id: 'github-copilot-cli',
    name: 'GitHub Copilot CLI',
    category: 'cli',
    whereItRuns: 'Terminal as a GitHub CLI extension',
    bestFor: 'AI-assisted commands and quick scripts',
    targetUsers: ['GitHub CLI users', 'DevOps', 'QA'],
    strengths: [
      'Integrated with GitHub',
      'Good for discovering commands',
      'Low friction for gh users',
    ],
    commonRisks: [
      'More limited than full agents',
      'Focused on commands, not projects',
    ],
  },
  {
    id: 'codex-app',
    name: 'Codex App',
    category: 'app',
    whereItRuns: 'Desktop and web app (cloud sandbox)',
    bestFor: 'Delegating well-scoped coding tasks to cloud agents',
    targetUsers: ['senior dev', 'tech lead'],
    strengths: [
      'Multiple parallel agents with git worktree isolation',
      'Secure sandbox with no internet access',
      'Clean UI for managing agent tasks',
    ],
    commonRisks: [
      'Costs $200/month (Pro tier)',
      'Needs very clear instructions to work well',
    ],
  },
  {
    id: 'google-jules',
    name: 'Google Jules',
    category: 'app',
    whereItRuns: 'Web app (cloud sandbox)',
    bestFor: 'Async coding tasks with GitHub integration',
    targetUsers: ['senior dev', 'tech lead'],
    strengths: [
      'Integrated with GitHub',
      'Async — works while you do something else',
      'Powered by Gemini',
    ],
    commonRisks: [
      'Best for well-defined tasks',
      'Ecosystem still evolving',
    ],
  },
  {
    id: 'devin',
    name: 'Devin',
    category: 'app',
    whereItRuns: 'Web app (cloud sandbox with terminal, editor, and browser)',
    bestFor: 'Complex autonomous tasks: migrations, large refactors, infra',
    targetUsers: ['senior dev', 'tech lead', 'engineering teams'],
    strengths: [
      'Full autonomy: plans, codes, tests, and opens PRs',
      'Replay timeline to see everything the agent did',
      'Integrates with Slack, Teams, Jira, Linear',
    ],
    commonRisks: [
      'Inconsistent quality on ambiguous tasks',
      'Unpredictable costs with ACU-based billing',
      'All code processed on Cognition infrastructure',
    ],
  },
];

export const toolsByLang: Record<Lang, Tool[]> = {
  'pt-BR': tools,
  en: toolsEn,
};
