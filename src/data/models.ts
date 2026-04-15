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
      'Rapido e versatil',
      'Bom em tarefas gerais e conversacao',
      'Suporte a imagens e audio',
      'Amplamente disponivel via API e produto',
    ],
    weaknesses: [
      'Raciocinio complexo pode ser superficial',
      'Pode ser verboso demais',
      'Custo intermediario',
    ],
    bestFor: [
      'Explorar ideias rapidamente',
      'Gerar primeira versao de textos',
      'Tarefas conversacionais e multimodais',
    ],
  },
  {
    id: 'o3',
    productName: 'ChatGPT',
    modelName: 'o3',
    provider: 'OpenAI',
    strengths: [
      'Raciocinio profundo e estruturado',
      'Bom em problemas complexos e multi-passo',
      'Forte em matematica e logica',
    ],
    weaknesses: [
      'Mais lento que GPT-4o',
      'Custo mais alto por inferencia',
      'Pode over-think tarefas simples',
    ],
    bestFor: [
      'Planejar arquitetura de sistemas',
      'Resolver problemas logicos complexos',
      'Analise profunda de codigo',
    ],
  },
  {
    id: 'claude-sonnet',
    productName: 'Claude',
    modelName: 'Claude Sonnet',
    provider: 'Anthropic',
    strengths: [
      'Equilibrio entre velocidade e qualidade',
      'Forte em codigo e instrucoes longas',
      'Segue instrucoes com precisao',
      'Bom custo-beneficio',
    ],
    weaknesses: [
      'Pode ser conservador demais em respostas',
      'Janela de contexto grande mas nao ilimitada',
    ],
    bestFor: [
      'Escrever e revisar codigo',
      'Seguir especificacoes detalhadas',
      'Tarefas do dia a dia de desenvolvimento',
    ],
  },
  {
    id: 'claude-opus',
    productName: 'Claude',
    modelName: 'Claude Opus',
    provider: 'Anthropic',
    strengths: [
      'Raciocinio profundo e nuancado',
      'Excelente em tarefas complexas e longas',
      'Forte em analise critica e revisao',
      'Bom em manter coerencia em contextos grandes',
    ],
    weaknesses: [
      'Mais lento e mais caro',
      'Pode ser excessivo pra tarefas simples',
    ],
    bestFor: [
      'Planejar refactors grandes',
      'Revisar arquitetura',
      'Tarefas que exigem raciocinio profundo',
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
      'Bom em pesquisa e sintese de informacao',
      'Integracao com ecossistema Google',
    ],
    weaknesses: [
      'Qualidade de codigo pode variar',
      'Menos previsivel em instrucoes complexas',
    ],
    bestFor: [
      'Analisar documentos longos',
      'Tarefas que envolvem muitas fontes',
      'Explorar e sintetizar informacao',
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
      'Customizavel via fine-tuning',
    ],
    weaknesses: [
      'Requer hardware potente pra rodar modelos grandes',
      'Qualidade inferior aos melhores modelos proprietarios',
      'Setup mais complexo',
    ],
    bestFor: [
      'Projetos com requisitos de privacidade',
      'Experimentacao sem custo de API',
      'Fine-tuning pra dominios especificos',
    ],
  },
  {
    id: 'deepseek',
    productName: 'DeepSeek (open-weight)',
    modelName: 'DeepSeek V3',
    provider: 'DeepSeek',
    strengths: [
      'Open-weight com qualidade competitiva',
      'Forte em codigo e raciocinio',
      'Custo baixo via API propria',
      'Boa alternativa open pros modelos proprietarios',
    ],
    weaknesses: [
      'Ecossistema menor',
      'Menos integracao com ferramentas populares',
      'Disponibilidade pode variar por regiao',
    ],
    bestFor: [
      'Geracao de codigo com custo baixo',
      'Alternativa open a modelos proprietarios',
      'Projetos com orcamento limitado',
    ],
  },
];
