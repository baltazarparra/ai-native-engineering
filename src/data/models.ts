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
      'Amplamente disponível via API e produto',
    ],
    weaknesses: [
      'Raciocínio complexo pode ser superficial',
      'Pode ser verboso demais',
      'Custo intermediário',
    ],
    bestFor: [
      'Explorar ideias rapidamente',
      'Gerar primeira versão de textos',
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
      'Forte em matemática e lógica',
    ],
    weaknesses: [
      'Mais lento que GPT-4o',
      'Custo mais alto por inferência',
      'Pode over-think tarefas simples',
    ],
    bestFor: [
      'Planejar arquitetura de sistemas',
      'Resolver problemas lógicos complexos',
      'Análise profunda de código',
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
      'Bom custo-benefício',
    ],
    weaknesses: [
      'Pode ser conservador demais em respostas',
      'Janela de contexto grande mas não ilimitada',
    ],
    bestFor: [
      'Escrever e revisar código',
      'Seguir especificações detalhadas',
      'Tarefas do dia a dia de desenvolvimento',
    ],
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
      'Bom em manter coerência em contextos grandes',
    ],
    weaknesses: [
      'Mais lento e mais caro',
      'Pode ser excessivo pra tarefas simples',
    ],
    bestFor: [
      'Planejar refactors grandes',
      'Revisar arquitetura',
      'Tarefas que exigem raciocínio profundo',
    ],
  },
  {
    id: 'gemini-2-5',
    productName: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    strengths: [
      'Janela de contexto muito grande',
      'Forte em tarefas multimodais',
      'Bom em pesquisa e síntese de informação',
      'Integração com ecossistema Google',
    ],
    weaknesses: [
      'Qualidade de código pode variar',
      'Menos previsível em instruções complexas',
    ],
    bestFor: [
      'Analisar documentos longos',
      'Tarefas que envolvem muitas fontes',
      'Explorar e sintetizar informação',
    ],
  },
  {
    id: 'llama',
    productName: 'Llama (open-weight)',
    modelName: 'Llama 4',
    provider: 'Meta',
    strengths: [
      'Open-weight: pode rodar localmente',
      'Sem custos de API',
      'Privacidade total dos dados',
      'Customizável via fine-tuning',
    ],
    weaknesses: [
      'Requer hardware potente pra rodar modelos grandes',
      'Qualidade inferior aos melhores modelos proprietários',
      'Setup mais complexo',
    ],
    bestFor: [
      'Projetos com requisitos de privacidade',
      'Experimentação sem custo de API',
      'Fine-tuning pra domínios específicos',
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
      'Boa alternativa open pros modelos proprietários',
    ],
    weaknesses: [
      'Ecossistema menor',
      'Menos integração com ferramentas populares',
      'Disponibilidade pode variar por região',
    ],
    bestFor: [
      'Geração de código com custo baixo',
      'Alternativa open a modelos proprietários',
      'Projetos com orçamento limitado',
    ],
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
      'Widely available through product and API',
    ],
    weaknesses: [
      'Complex reasoning can be shallow',
      'Can be too verbose',
      'Medium cost',
    ],
    bestFor: [
      'Exploring ideas quickly',
      'Drafting first versions of text',
      'Conversational and multimodal tasks',
    ],
  },
  {
    id: 'o3',
    productName: 'ChatGPT',
    modelName: 'o3',
    provider: 'OpenAI',
    strengths: [
      'Deep and structured reasoning',
      'Good at complex multi-step problems',
      'Strong at math and logic',
    ],
    weaknesses: [
      'Slower than GPT-4o',
      'Higher inference cost',
      'Can overthink simple tasks',
    ],
    bestFor: [
      'Planning system architecture',
      'Solving complex logic problems',
      'Deep code analysis',
    ],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet',
    provider: 'Anthropic',
    strengths: [
      'Strong speed and quality balance',
      'Strong at code and long instructions',
      'Follows instructions precisely',
      'Good cost-benefit profile',
    ],
    weaknesses: [
      'Can be too conservative',
      'Large context window, but not infinite',
    ],
    bestFor: [
      'Writing and reviewing code',
      'Following detailed specs',
      'Day-to-day development tasks',
    ],
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
      'Good coherence across large contexts',
    ],
    weaknesses: ['Slower and more expensive', 'Overkill for simple tasks'],
    bestFor: [
      'Planning large refactors',
      'Reviewing architecture',
      'Tasks that need deep reasoning',
    ],
  },
  {
    id: 'gemini-2-5',
    productName: 'Gemini',
    modelName: 'Gemini 2.5 Pro',
    provider: 'Google',
    strengths: [
      'Very large context window',
      'Strong multimodal profile',
      'Good at research and information synthesis',
      'Integrates with the Google ecosystem',
    ],
    weaknesses: [
      'Code quality can vary',
      'Less predictable with complex instructions',
    ],
    bestFor: [
      'Analyzing long documents',
      'Tasks involving many sources',
      'Exploring and synthesizing information',
    ],
  },
  {
    id: 'llama',
    productName: 'Llama (open-weight)',
    modelName: 'Llama 4',
    provider: 'Meta',
    strengths: [
      'Open-weight and can run locally',
      'No API cost when self-hosted',
      'Strong data privacy options',
      'Customizable through fine-tuning',
    ],
    weaknesses: [
      'Large models require powerful hardware',
      'Quality below the strongest proprietary models',
      'Setup is more complex',
    ],
    bestFor: [
      'Projects with privacy requirements',
      'Experimentation without API cost',
      'Fine-tuning for specific domains',
    ],
  },
  {
    id: 'deepseek',
    productName: 'DeepSeek (open-weight)',
    modelName: 'DeepSeek V3',
    provider: 'DeepSeek',
    strengths: [
      'Open-weight with competitive quality',
      'Strong at code and reasoning',
      'Low cost through its own API',
      'Good open alternative to proprietary models',
    ],
    weaknesses: [
      'Smaller ecosystem',
      'Fewer integrations with popular tools',
      'Availability can vary by region',
    ],
    bestFor: [
      'Low-cost code generation',
      'Open alternative to proprietary models',
      'Budget-limited projects',
    ],
  },
];

export const modelsByLang: Record<Lang, ModelProfile[]> = {
  'pt-BR': models,
  en: modelsEn,
};
