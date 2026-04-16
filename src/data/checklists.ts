import type { Lang } from '../lib/i18n';

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

export const profilesEn: ChecklistProfile[] = [
  { id: 'pm', label: 'PM' },
  { id: 'qa', label: 'QA' },
  { id: 'junior', label: 'Junior dev' },
  { id: 'senior', label: 'Senior dev' },
  { id: 'lead', label: 'Tech lead' },
];

export const tasksEn: ChecklistTask[] = [
  { id: 'feature', label: 'New feature' },
  { id: 'bugfix', label: 'Bug fix' },
  { id: 'refactor', label: 'Refactor' },
  { id: 'review', label: 'Code review' },
  { id: 'tests', label: 'Generate tests' },
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

const BASE_BEFORE_EN: ChecklistItem[] = [
  {
    id: 'obj',
    text: 'I defined the final goal, not just what to ask AI',
    category: 'antes-de-pedir',
  },
  {
    id: 'ctx',
    text: 'I identified the files and context that matter',
    category: 'antes-de-pedir',
  },
  {
    id: 'restrict',
    text: 'I listed constraints: what must not change, patterns to follow',
    category: 'antes-de-pedir',
  },
  {
    id: 'format',
    text: 'I defined the expected output format',
    category: 'antes-de-pedir',
  },
];

const BASE_AFTER_EN: ChecklistItem[] = [
  {
    id: 'read',
    text: 'I read the generated code, not just skimmed it',
    category: 'antes-de-aceitar',
  },
  {
    id: 'tests',
    text: 'I ran the tests and they pass',
    category: 'antes-de-aceitar',
  },
  {
    id: 'types',
    text: 'Typecheck passes without errors',
    category: 'antes-de-aceitar',
  },
  {
    id: 'lint',
    text: 'Lint passes without relevant warnings',
    category: 'antes-de-aceitar',
  },
  {
    id: 'goal',
    text: 'The result solves the original problem',
    category: 'antes-de-aceitar',
  },
];

const EXTRA_ITEMS_EN: Record<string, Record<string, ChecklistItem[]>> = {
  pm: {
    feature: [
      {
        id: 'pm-spec',
        text: 'I wrote a draft spec before asking AI to review it',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-gaps',
        text: 'I asked AI to point out gaps and uncovered scenarios',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-val',
        text: 'I validated that the revised spec covers business requirements',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'pm-repro',
        text: 'I described clear reproduction steps',
        category: 'antes-de-pedir',
      },
      {
        id: 'pm-impact',
        text: 'I checked that the fix does not affect other features',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'pm-why',
        text: 'I documented why this refactor matters now',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'pm-focus',
        text: 'I asked AI to focus on naming clarity and readability',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'pm-scenarios',
        text: 'I listed the critical business scenarios that need coverage',
        category: 'antes-de-pedir',
      },
    ],
  },
  qa: {
    feature: [
      {
        id: 'qa-edge',
        text: 'I asked for edge cases and error states',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-gherkin',
        text: 'I asked for Gherkin or another structured scenario format',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-filter',
        text: 'I removed redundant scenarios and added cases the model missed',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'qa-regress',
        text: 'I checked that the fix did not break regression tests',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'qa-coverage',
        text: 'I checked that test coverage did not decrease',
        category: 'antes-de-aceitar',
      },
    ],
    review: [
      {
        id: 'qa-testability',
        text: 'I checked whether the code is testable without hidden dependencies',
        category: 'antes-de-aceitar',
      },
    ],
    tests: [
      {
        id: 'qa-spec',
        text: 'I provided the API or feature spec with the request',
        category: 'antes-de-pedir',
      },
      {
        id: 'qa-review',
        text: 'I read each generated test and checked that it tests something real',
        category: 'antes-de-aceitar',
      },
    ],
  },
  junior: {
    feature: [
      {
        id: 'jr-learn',
        text: 'I understood the concept before asking for implementation',
        category: 'antes-de-pedir',
      },
      {
        id: 'jr-ref',
        text: 'I gave AI reference files from the project',
        category: 'antes-de-pedir',
      },
      {
        id: 'jr-understand',
        text: 'I can explain what the code does without looking at AI output',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'jr-trace',
        text: 'I tried to understand the root cause before asking for the fix',
        category: 'antes-de-pedir',
      },
    ],
    refactor: [
      {
        id: 'jr-pattern',
        text: 'I studied the new pattern before asking for the migration',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'jr-ask',
        text: 'I asked for explanations of code I did not understand',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'jr-manual',
        text: 'I tested manually in addition to automated tests',
        category: 'antes-de-aceitar',
      },
    ],
  },
  senior: {
    feature: [
      {
        id: 'sr-spec',
        text: 'I wrote a spec with types, endpoints, and constraints',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-review',
        text: 'I reviewed diffs with focus on design decisions',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'sr-root',
        text: 'I identified the root cause and gave it to the model',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-side',
        text: 'I checked side effects in related modules',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'sr-pattern',
        text: 'I migrated the first case manually to define the pattern',
        category: 'antes-de-pedir',
      },
      {
        id: 'sr-rules',
        text: 'I created a rules file with migration conventions',
        category: 'antes-de-pedir',
      },
    ],
    review: [
      {
        id: 'sr-security',
        text: 'I asked for focus on security, performance, and readability',
        category: 'antes-de-pedir',
      },
    ],
    tests: [
      {
        id: 'sr-integration',
        text: 'I included integration tests, not only unit tests',
        category: 'antes-de-aceitar',
      },
    ],
  },
  lead: {
    feature: [
      {
        id: 'ld-rules',
        text: 'The project rules file is up to date with conventions',
        category: 'antes-de-pedir',
      },
      {
        id: 'ld-ci',
        text: 'CI validates tests, lint, and types automatically',
        category: 'antes-de-aceitar',
      },
    ],
    bugfix: [
      {
        id: 'ld-postmortem',
        text: 'I checked whether the bug reveals a test or process gap',
        category: 'antes-de-aceitar',
      },
    ],
    refactor: [
      {
        id: 'ld-align',
        text: 'The team aligned on the motivation and scope of the refactor',
        category: 'antes-de-pedir',
      },
      {
        id: 'ld-doc',
        text: 'I updated docs and rules files with new conventions',
        category: 'antes-de-aceitar',
      },
    ],
    review: [
      {
        id: 'ld-design',
        text: 'I focused on design decisions, not formatting',
        category: 'antes-de-aceitar',
      },
    ],
    tests: [
      {
        id: 'ld-coverage',
        text: 'I checked coverage metrics in CI',
        category: 'antes-de-aceitar',
      },
    ],
  },
};

export const profilesByLang: Record<Lang, ChecklistProfile[]> = {
  'pt-BR': profiles,
  en: profilesEn,
};

export const tasksByLang: Record<Lang, ChecklistTask[]> = {
  'pt-BR': tasks,
  en: tasksEn,
};

export function getChecklist(
  profileId: string,
  taskId: string,
  lang: Lang = 'pt-BR',
): ChecklistItem[] {
  const baseBefore = lang === 'en' ? BASE_BEFORE_EN : BASE_BEFORE;
  const baseAfter = lang === 'en' ? BASE_AFTER_EN : BASE_AFTER;
  const extraItems = lang === 'en' ? EXTRA_ITEMS_EN : EXTRA_ITEMS;
  const extras = extraItems[profileId]?.[taskId] ?? [];
  const beforeExtras = extras.filter((e) => e.category === 'antes-de-pedir');
  const afterExtras = extras.filter((e) => e.category === 'antes-de-aceitar');

  return [...baseBefore, ...beforeExtras, ...baseAfter, ...afterExtras];
}
