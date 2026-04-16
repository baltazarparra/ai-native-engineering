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
    id: 'gpt-4o',
    productName: 'ChatGPT',
    modelName: 'GPT-4o',
    provider: 'OpenAI',
    strengths: [
      'Rápido e versátil',
      'Bom em tarefas gerais e conversação',
      'Suporte a imagens e áudio',
    ],
    weaknesses: [
      'Raciocínio complexo pode ser raso',
      'Pode ser verboso demais',
    ],
    bestFor: [
      'Explorar ideias rapidamente',
      'Tarefas conversacionais e multimodais',
    ],
  },
  {
    id: 'o3',
    productName: 'ChatGPT',
    modelName: 'o3',
    provider: 'OpenAI',
    strengths: [
      'Raciocínio profundo e estruturado',
      'Bom em problemas complexos e multi-passo',
    ],
    weaknesses: ['Mais lento que GPT-4o', 'Custo mais alto por inferência'],
    bestFor: [
      'Planejar arquitetura de sistemas',
      'Resolver problemas lógicos complexos',
    ],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet',
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
    modelName: 'Claude Opus',
    provider: 'Anthropic',
    strengths: [
      'Raciocínio profundo e nuançado',
      'Excelente em tarefas complexas e longas',
      'Forte em análise crítica e revisão',
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
];

export const modelsEn: ModelProfile[] = [
  {
    id: 'gpt-4o',
    productName: 'ChatGPT',
    modelName: 'GPT-4o',
    provider: 'OpenAI',
    strengths: [
      'Fast and versatile',
      'Good at general tasks and conversation',
      'Supports images and audio',
    ],
    weaknesses: ['Complex reasoning can be shallow', 'Can be too verbose'],
    bestFor: ['Exploring ideas quickly', 'Conversational and multimodal tasks'],
  },
  {
    id: 'o3',
    productName: 'ChatGPT',
    modelName: 'o3',
    provider: 'OpenAI',
    strengths: [
      'Deep and structured reasoning',
      'Good at complex multi-step problems',
    ],
    weaknesses: ['Slower than GPT-4o', 'Higher inference cost'],
    bestFor: ['Planning system architecture', 'Solving complex logic problems'],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet',
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
    modelName: 'Claude Opus',
    provider: 'Anthropic',
    strengths: [
      'Deep and nuanced reasoning',
      'Excellent for long, complex tasks',
      'Strong at critical analysis and review',
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
];

export const modelsByLang: Record<Lang, ModelProfile[]> = {
  'pt-BR': models,
  en: modelsEn,
};
