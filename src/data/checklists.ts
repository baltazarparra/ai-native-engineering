export interface ChecklistItem {
  id: string;
  text: string;
  category: 'antes-de-pedir' | 'antes-de-aceitar';
}

export interface ChecklistProfile {
  id: string;
  label: string;
}

export interface ChecklistTask {
  id: string;
  label: string;
}

export const profiles: ChecklistProfile[] = [
  { id: 'pm', label: 'PM' },
  { id: 'qa', label: 'QA' },
  { id: 'junior', label: 'Dev junior' },
  { id: 'senior', label: 'Dev senior' },
  { id: 'lead', label: 'Tech lead' },
];

export const tasks: ChecklistTask[] = [
  { id: 'feature', label: 'Feature nova' },
  { id: 'bugfix', label: 'Bug fix' },
  { id: 'refactor', label: 'Refactor' },
  { id: 'review', label: 'Code review' },
  { id: 'tests', label: 'Gerar testes' },
];

const BASE_BEFORE: ChecklistItem[] = [
  {
    id: 'obj',
    text: 'Defini o objetivo final (nao so o que pedir pra IA)',
    category: 'antes-de-pedir',
  },
  {
    id: 'ctx',
    text: 'Identifiquei quais arquivos/contextos sao relevantes',
    category: 'antes-de-pedir',
  },
  {
    id: 'restrict',
    text: 'Listei restricoes (o que nao pode mudar, padroes a seguir)',
    category: 'antes-de-pedir',
  },
  {
    id: 'format',
    text: 'Defini o formato esperado do output',
    category: 'antes-de-pedir',
  },
];

const BASE_AFTER: ChecklistItem[] = [
  {
    id: 'read',
    text: 'Li o codigo gerado (nao so skimmei)',
    category: 'antes-de-aceitar',
  },
  {
    id: 'tests',
    text: 'Rodei os testes e todos passam',
    category: 'antes-de-aceitar',
  },
  {
    id: 'types',
    text: 'Typecheck passa sem erros',
    category: 'antes-de-aceitar',
  },
  {
    id: 'lint',
    text: 'Lint passa sem warnings relevantes',
    category: 'antes-de-aceitar',
  },
  {
    id: 'goal',
    text: 'O resultado resolve o problema original',
    category: 'antes-de-aceitar',
  },
];

const EXTRA_ITEMS: Record<string, Record<string, ChecklistItem[]>> = {
  pm: {
    feature: [
      {
        id: 'pm-spec',
        text: 'Escrevi um rascunho da spec antes de pedir revisao pra IA',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-gaps',
        text: 'Pedi pra IA apontar lacunas e cenarios nao cobertos',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-val',
        text: 'Validei que a spec revisada cobre requisitos de negocio',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'pm-repro',
        text: 'Descrevi passos de reproducao claros',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-impact',
        text: 'Validei que o fix nao impacta outras funcionalidades',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'pm-why',
        text: 'Documentei a motivacao do refactor (por que agora)',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'pm-focus',
        text: 'Pedi pra IA focar em clareza de nomeclatura e legibilidade',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'pm-scenarios',
        text: 'Listei cenarios de negocio criticos que precisam cobertura',
        category: 'antes-de-pedir',
      },
    ],
  },
  qa: {
    feature: [
      {
        id: 'qa-edge',
        text: 'Pedi cenarios de borda e estados de erro',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-gherkin',
        text: 'Pedi formato Gherkin ou estruturado pra cenarios',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-filter',
        text: 'Filtrei cenarios redundantes e adicionei os que o modelo nao pensou',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'qa-regress',
        text: 'Verifiquei se o fix nao quebrou testes de regressao',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'qa-coverage',
        text: 'Verifiquei que a cobertura de testes nao diminuiu',
        category: 'antes-de-aceitar',
      },
    ],
    review: [
      {
        id: 'qa-testability',
        text: 'Verifiquei se o codigo e testavel (sem dependencias escondidas)',
        category: 'antes-de-aceitar',
      },
    ],
    tests: [
      {
        id: 'qa-spec',
        text: 'Passei a spec da API/feature junto com o pedido',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-review',
        text: 'Li cada teste gerado e verifiquei se testa algo real',
        category: 'antes-de-aceitar',
      },
    ],
  },
  junior: {
    feature: [
      {
        id: 'jr-learn',
        text: 'Primeiro entendi o conceito antes de pedir implementacao',
        category: 'antes-de-pedir',
      },
      {
        id: 'jr-ref',
        text: 'Passei arquivos de referencia do projeto pra IA',
        category: 'antes-de-pedir',
      },
      {
        id: 'jr-understand',
        text: 'Consigo explicar o que o codigo faz sem olhar a IA',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'jr-trace',
        text: 'Tentei entender a causa raiz antes de pedir o fix',
        category: 'antes-de-pedir',
      },
    ],
    refactor: [
      {
        id: 'jr-pattern',
        text: 'Estudei o padrao novo antes de pedir a migracao',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'jr-ask',
        text: 'Pedi explicacao pra trechos que nao entendi',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'jr-manual',
        text: 'Testei manualmente alem dos testes automaticos',
        category: 'antes-de-aceitar',
      },
    ],
  },
  senior: {
    feature: [
      {
        id: 'sr-spec',
        text: 'Escrevi spec com tipos, endpoints e restricoes',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-review',
        text: 'Revisei diffs focando em decisoes de design',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'sr-root',
        text: 'Identifiquei a causa raiz e passei pro modelo',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-side',
        text: 'Verifiquei side effects em modulos relacionados',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'sr-pattern',
        text: 'Fiz o primeiro caso manualmente pra definir o padrao',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-rules',
        text: 'Criei rules file com convencoes da migracao',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'sr-security',
        text: 'Pedi foco em seguranca, performance e legibilidade',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'sr-integration',
        text: 'Incluí testes de integracao alem de unitarios',
        category: 'antes-de-aceitar',
      },
    ],
  },
  lead: {
    feature: [
      {
        id: 'ld-rules',
        text: 'Rules file do projeto esta atualizado com convencoes',
        category: 'antes-de-pedir',
      },
      {
        id: 'ld-ci',
        text: 'CI valida automaticamente (testes, lint, types)',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'ld-postmortem',
        text: 'Avaliei se o bug indica lacuna de testes ou processo',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'ld-align',
        text: 'Alinhou com o time a motivacao e escopo do refactor',
        category: 'antes-de-pedir',
      },
      {
        id: 'ld-doc',
        text: 'Atualizei documentacao e rules files com novas convencoes',
        category: 'antes-de-aceitar',
      },
    ],
    review: [
      {
        id: 'ld-design',
        text: 'Foquei em decisoes de design, nao em formatacao',
        category: 'antes-de-aceitar',
      },
    ],
    tests: [
      {
        id: 'ld-coverage',
        text: 'Verifiquei metricas de cobertura no CI',
        category: 'antes-de-aceitar',
      },
    ],
  },
};

export function getChecklist(
  profileId: string,
  taskId: string,
): ChecklistItem[] {
  const extras = EXTRA_ITEMS[profileId]?.[taskId] ?? [];
  const beforeExtras = extras.filter((e) => e.category === 'antes-de-pedir');
  const afterExtras = extras.filter((e) => e.category === 'antes-de-aceitar');

  return [...BASE_BEFORE, ...beforeExtras, ...BASE_AFTER, ...afterExtras];
}
