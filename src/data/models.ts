import type { Lang } from '../lib/i18n';

export interface ModelProfile {
  id: string;
  productName: string;
  modelName: string;
  provider: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
}

export const models: ModelProfile[] = [
  {
    id: 'gpt-5-3-codex',
    productName: 'ChatGPT',
    modelName: 'GPT-5.3-Codex',
    provider: 'OpenAI',
    strengths: [
      'Performance de ponta em código e tarefas agênticas',
      'Pode ser direcionado no meio da tarefa sem perder contexto',
      'Variante Spark com 1000+ tokens/s pra iteração rápida',
    ],
    weaknesses: [
      'Caro: $2/M input, $10/M output',
      'Sendo substituído pelo GPT-5.4',
    ],
    bestFor: [
      'Tarefas complexas de código com múltiplos passos',
      'Workflows agênticos e autônomos',
    ],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    strengths: [
      'Equilíbrio entre velocidade e qualidade',
      'Forte em código e instruções longas',
      'Segue instruções com precisão',
    ],
    weaknesses: [
      'Pode ser conservador demais',
      'Contexto grande mas não ilimitado',
    ],
    bestFor: ['Escrever e revisar código', 'Seguir especificações detalhadas'],
  },
  {
    id: 'claude-opus',
    productName: 'Claude',
    modelName: 'Claude Opus 4.7',
    provider: 'Anthropic',
    strengths: [
      'Raciocínio profundo e nuançado',
      'Janela de contexto de 1M tokens',
      'Forte em análise crítica, revisão e tarefas agênticas',
    ],
    weaknesses: ['Mais lento e mais caro', 'Excessivo pra tarefas simples'],
    bestFor: ['Planejar refactors grandes', 'Revisar arquitetura'],
  },
  {
    id: 'gemini-2-5',
    productName: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    strengths: [
      'Janela de contexto muito grande',
      'Forte em tarefas multimodais',
      'Bom em pesquisa e síntese',
    ],
    weaknesses: [
      'Qualidade de código pode variar',
      'Menos previsível em instruções complexas',
    ],
    bestFor: ['Analisar documentos longos', 'Tarefas com muitas fontes'],
  },
  {
    id: 'kimi-k2-6',
    productName: 'Kimi / Kimi Code / Kimi API',
    modelName: 'Kimi K2.6',
    provider: 'Moonshot AI',
    strengths: [
      '256K de contexto com foco forte em código de longo horizonte',
      'Suporta texto, imagem e vídeo, modos thinking/non-thinking e tarefas de diálogo/agente',
      'Custo competitivo via API: $0.95/M input e $4.00/M output',
    ],
    weaknesses: [
      'Ecossistema menos difundido fora da Ásia e da bolha de tooling',
      'Open-source/open-weight não significa simples de rodar localmente na escala máxima',
      'API tem algumas particularidades próprias em tool use e parâmetros',
    ],
    bestFor: [
      'Coding agentic com muitos passos e tool use',
      'Prompt-to-app e tarefas multimodais com código',
      'Times que querem frontier coding com custo competitivo',
    ],
  },
  {
    id: 'llama',
    productName: 'Llama (open-weight)',
    modelName: 'Llama 4',
    provider: 'Meta',
    strengths: [
      'Open-weight: roda local, customizável',
      'Sem custos de API',
      'Privacidade total dos dados',
    ],
    weaknesses: [
      'Requer hardware potente pra rodar',
      'Qualidade abaixo dos melhores proprietários',
    ],
    bestFor: [
      'Projetos com requisitos de privacidade',
      'Experimentar sem custo de API',
    ],
  },
  {
    id: 'deepseek',
    productName: 'DeepSeek (open-weight)',
    modelName: 'DeepSeek V3',
    provider: 'DeepSeek',
    strengths: [
      'Open-weight com qualidade competitiva',
      'Forte em código e raciocínio',
      'Custo baixo via API própria',
    ],
    weaknesses: [
      'Ecossistema menor',
      'Menos integração com ferramentas populares',
    ],
    bestFor: ['Código com custo baixo', 'Projetos com orçamento limitado'],
  },
  {
    id: 'claude-haiku',
    productName: 'Claude',
    modelName: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    strengths: [
      'Rápido e barato',
      '73% SWE-bench — nível Sonnet 4 por uma fração do custo',
      'Suporta extended thinking e uso de ferramentas',
    ],
    weaknesses: [
      'Janela de contexto menor (200K)',
      'Raciocínio menos profundo que Opus',
    ],
    bestFor: [
      'Tarefas de código rápidas com custo baixo',
      'Automação em volume e pipelines multi-agente',
    ],
  },
  {
    id: 'gemma-4',
    productName: 'Gemma (open-source)',
    modelName: 'Gemma 4',
    provider: 'Google',
    strengths: [
      'Open source Apache 2.0 — totalmente livre',
      'Roda em hardware consumer (modelos de 2B a 31B)',
      'Multimodal e multilingual (140+ idiomas)',
    ],
    weaknesses: [
      'Dificuldade com tarefas agênticas',
      'Modelo maior (31B) requer 24GB de VRAM',
    ],
    bestFor: [
      'Rodar local com privacidade total',
      'Projetos open source sem custo de API',
    ],
  },
  {
    id: 'minimax-m27',
    productName: 'MiniMax',
    modelName: 'MiniMax M2.7',
    provider: 'MiniMax',
    strengths: [
      'Custo extremamente baixo: $0.30/$1.20 por M tokens',
      'Performance competitiva em código (56% SWE-Pro)',
      'Arquitetura MoE eficiente (230B total, 10B ativos)',
    ],
    weaknesses: [
      'Inferência lenta (46-53 tokens/s)',
      'Muito verboso — gera 4x mais tokens que o necessário',
    ],
    bestFor: [
      'Código com orçamento muito limitado',
      'Tarefas de código sem urgência de velocidade',
    ],
  },
  {
    id: 'glm-51',
    productName: 'GLM (open-source)',
    modelName: 'GLM-5.1',
    provider: 'Z.ai (Zhipu)',
    strengths: [
      '#1 no SWE-Bench Pro (58.4%) — supera GPT-5.4 e Opus 4.6',
      'Licença MIT com pesos abertos no Hugging Face',
      'Forte em código, raciocínio e tarefas de engenharia',
    ],
    weaknesses: [
      'Só texto — sem suporte multimodal',
      'Modelo gigante (744B params) — difícil de hospedar localmente',
    ],
    bestFor: [
      'Código e tarefas de engenharia de software',
      'Projetos que precisam de modelo open source potente',
    ],
  },
  {
    id: 'composer-2',
    productName: 'Cursor',
    modelName: 'Composer 2',
    provider: 'Anysphere',
    strengths: [
      'Supera Opus 4.6 em benchmarks de código',
      'Muito barato: $0.50/$2.50 por M tokens',
      'Feito pra edição multi-arquivo e refactors',
    ],
    weaknesses: [
      'Só funciona dentro do Cursor',
      'Fraco em tarefas que não são código',
    ],
    bestFor: [
      'Escrever e editar código dentro do Cursor',
      'Refactors de código e edição multi-arquivo',
    ],
  },
];

export const modelsEn: ModelProfile[] = [
  {
    id: 'gpt-5-3-codex',
    productName: 'ChatGPT',
    modelName: 'GPT-5.3-Codex',
    provider: 'OpenAI',
    strengths: [
      'Frontier-level coding and agentic performance',
      'Can be steered mid-task without losing context',
      'Spark variant with 1000+ tokens/s for fast iteration',
    ],
    weaknesses: [
      'Expensive: $2/M input, $10/M output',
      'Being superseded by GPT-5.4',
    ],
    bestFor: [
      'Complex multi-step coding tasks',
      'Agentic and autonomous workflows',
    ],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    strengths: [
      'Strong speed-quality balance',
      'Strong at code and long instructions',
      'Follows instructions precisely',
    ],
    weaknesses: ['Can be too conservative', 'Large context, but not infinite'],
    bestFor: ['Writing and reviewing code', 'Following detailed specs'],
  },
  {
    id: 'claude-opus',
    productName: 'Claude',
    modelName: 'Claude Opus 4.7',
    provider: 'Anthropic',
    strengths: [
      'Deep and nuanced reasoning',
      '1M token context window',
      'Strong at critical analysis, review, and agentic tasks',
    ],
    weaknesses: ['Slower and more expensive', 'Overkill for simple tasks'],
    bestFor: ['Planning large refactors', 'Reviewing architecture'],
  },
  {
    id: 'gemini-2-5',
    productName: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    strengths: [
      'Very large context window',
      'Strong multimodal capabilities',
      'Good at research and synthesis',
    ],
    weaknesses: [
      'Code quality can vary',
      'Less predictable with complex instructions',
    ],
    bestFor: ['Analyzing long documents', 'Tasks with many sources'],
  },
  {
    id: 'kimi-k2-6',
    productName: 'Kimi / Kimi Code / Kimi API',
    modelName: 'Kimi K2.6',
    provider: 'Moonshot AI',
    strengths: [
      '256K context window with a strong long-horizon coding profile',
      'Supports text, image, and video, plus thinking/non-thinking and dialogue/agent modes',
      'Competitive API pricing: $0.95/M input and $4.00/M output',
    ],
    weaknesses: [
      'Less familiar outside Asia and the tooling-heavy crowd',
      'Open-source/open-weight does not mean easy to self-host at full scale',
      'Its API has a few model-specific quirks around tool use and parameters',
    ],
    bestFor: [
      'Agentic coding with many steps and tool use',
      'Prompt-to-app and multimodal coding tasks',
      'Teams that want frontier coding performance at a competitive price',
    ],
  },
  {
    id: 'llama',
    productName: 'Llama (open-weight)',
    modelName: 'Llama 4',
    provider: 'Meta',
    strengths: [
      'Open-weight: runs locally, customizable',
      'No API cost self-hosted',
      'Full data privacy',
    ],
    weaknesses: [
      'Requires powerful hardware',
      'Quality below top proprietary models',
    ],
    bestFor: ['Projects with privacy needs', 'Experimenting without API cost'],
  },
  {
    id: 'deepseek',
    productName: 'DeepSeek (open-weight)',
    modelName: 'DeepSeek V3',
    provider: 'DeepSeek',
    strengths: [
      'Open-weight with competitive quality',
      'Strong at code and reasoning',
      'Low cost via own API',
    ],
    weaknesses: ['Smaller ecosystem', 'Fewer integrations with popular tools'],
    bestFor: ['Low-cost code generation', 'Budget-limited projects'],
  },
  {
    id: 'claude-haiku',
    productName: 'Claude',
    modelName: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    strengths: [
      'Fast and cheap',
      '73% SWE-bench — Sonnet 4 level at a fraction of the cost',
      'Supports extended thinking and tool use',
    ],
    weaknesses: [
      'Smaller context window (200K)',
      'Less deep reasoning than Opus',
    ],
    bestFor: [
      'Fast coding tasks at low cost',
      'High-volume automation and multi-agent pipelines',
    ],
  },
  {
    id: 'gemma-4',
    productName: 'Gemma (open-source)',
    modelName: 'Gemma 4',
    provider: 'Google',
    strengths: [
      'Open source Apache 2.0 — fully free',
      'Runs on consumer hardware (2B to 31B models)',
      'Multimodal and multilingual (140+ languages)',
    ],
    weaknesses: [
      'Struggles with agentic tasks',
      'Larger model (31B) requires 24GB VRAM',
    ],
    bestFor: [
      'Running locally with full privacy',
      'Open source projects without API cost',
    ],
  },
  {
    id: 'minimax-m27',
    productName: 'MiniMax',
    modelName: 'MiniMax M2.7',
    provider: 'MiniMax',
    strengths: [
      'Extremely low cost: $0.30/$1.20 per M tokens',
      'Competitive coding performance (56% SWE-Pro)',
      'Efficient MoE architecture (230B total, 10B active)',
    ],
    weaknesses: [
      'Slow inference (46-53 tokens/s)',
      'Very verbose — generates 4x more tokens than needed',
    ],
    bestFor: [
      'Code generation on a very tight budget',
      'Coding tasks without speed urgency',
    ],
  },
  {
    id: 'glm-51',
    productName: 'GLM (open-source)',
    modelName: 'GLM-5.1',
    provider: 'Z.ai (Zhipu)',
    strengths: [
      '#1 on SWE-Bench Pro (58.4%) — surpasses GPT-5.4 and Opus 4.6',
      'MIT license with open weights on Hugging Face',
      'Strong at code, reasoning, and engineering tasks',
    ],
    weaknesses: [
      'Text-only — no multimodal support',
      'Huge model (744B params) — hard to self-host',
    ],
    bestFor: [
      'Code and software engineering tasks',
      'Projects needing a powerful open source model',
    ],
  },
  {
    id: 'composer-2',
    productName: 'Cursor',
    modelName: 'Composer 2',
    provider: 'Anysphere',
    strengths: [
      'Beats Opus 4.6 on coding benchmarks',
      'Very cheap: $0.50/$2.50 per M tokens',
      'Built for multi-file editing and refactors',
    ],
    weaknesses: [
      'Only works inside Cursor',
      'Weak at non-coding tasks',
    ],
    bestFor: [
      'Writing and editing code inside Cursor',
      'Code refactors and multi-file editing',
    ],
  },
];

export const modelsByLang: Record<Lang, ModelProfile[]> = {
  'pt-BR': models,
  en: modelsEn,
};
