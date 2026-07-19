import type { Lang } from '../lib/i18n';
import {
  defaultLang,
  getHarnessOverviewHref,
  languages,
  supportedLangs,
  withBase,
} from '../lib/i18n';

export type HarnessChapterId =
  | 'fundamentals'
  | 'anatomy'
  | 'maturity'
  | 'governance'
  | 'engineer'
  | 'conclusion';

export interface HarnessChapter {
  id: HarnessChapterId;
  number: number;
  slug: Record<Lang, string>;
  title: Record<Lang, string>;
  shortLabel: Record<Lang, string>;
  tabLabel: Record<Lang, string>;
  description: Record<Lang, string>;
  learningQuestion: Record<Lang, string>;
  learningObjectives: Record<Lang, string[]>;
  pathRole: Record<Lang, string>;
  discussionSlug: string;
  badgeVariant: 'yellow' | 'blue' | 'green' | 'coral';
  sectionPadding: 'lg' | 'xl';
  sectionAlt: boolean;
}

export const HARNESS_OVERVIEW_DISCUSSION_SLUG = 'harness-overview';

export const HARNESS_SERIES = {
  title: {
    'pt-BR': 'Harness Engineering',
    en: 'Harness Engineering',
  },
  summary: {
    'pt-BR':
      'A disciplina que transforma modelos em agentes operacionais: contexto, ferramentas, execução, validação, segurança e loops de feedback.',
    en: 'The discipline that turns models into operational agents: context, tools, execution, validation, security, and feedback loops.',
  },
  description: {
    'pt-BR':
      'Série em 6 capítulos sobre Harness Engineering: da distinção modelo vs agente à governança, maturidade e papel do engenheiro.',
    en: 'A 6-chapter series on Harness Engineering: from the model-vs-agent distinction to governance, maturity, and the engineer’s role.',
  },
  overviewTab: {
    'pt-BR': 'Visão geral',
    en: 'Overview',
  },
  chapterTabPrefix: {
    'pt-BR': 'Cap.',
    en: 'Ch.',
  },
  tabsAria: {
    'pt-BR': 'Capítulos de Harness Engineering',
    en: 'Harness Engineering chapters',
  },
} as const;

export const HARNESS_CHAPTERS: HarnessChapter[] = [
  {
    id: 'fundamentals',
    number: 1,
    slug: { 'pt-BR': 'fundamentos', en: 'fundamentals' },
    title: {
      'pt-BR': 'Fundamentos',
      en: 'Fundamentals',
    },
    shortLabel: {
      'pt-BR': 'Capítulo 1',
      en: 'Chapter 1',
    },
    tabLabel: {
      'pt-BR': 'Fundamentos',
      en: 'Fundamentals',
    },
    description: {
      'pt-BR':
        'Modelo não é agente: o que é um harness, por que importa mais que prompt e como a equação agente = modelo + contexto + ferramentas + validação se aplica.',
      en: 'The model is not the agent: what a harness is, why it matters more than prompts, and the agent = model + context + tools + validation equation.',
    },
    learningQuestion: {
      'pt-BR': 'O que separa um modelo de um agente?',
      en: 'What separates a model from an agent?',
    },
    learningObjectives: {
      'pt-BR': [
        'Por que o modelo sozinho não executa trabalho confiável.',
        'O que é um harness e o que ele governa.',
        'Por que harness importa mais do que prompt.',
      ],
      en: [
        'Why a model alone cannot deliver reliable work.',
        'What a harness is and what it governs.',
        'Why harness matters more than prompts.',
      ],
    },
    pathRole: {
      'pt-BR': 'Comece aqui: entenda a distinção modelo vs agente.',
      en: 'Start here: understand the model-vs-agent distinction.',
    },
    discussionSlug: 'harness-fundamentals',
    badgeVariant: 'yellow',
    sectionPadding: 'lg',
    sectionAlt: true,
  },
  {
    id: 'anatomy',
    number: 2,
    slug: { 'pt-BR': 'anatomia', en: 'anatomy' },
    title: {
      'pt-BR': 'A anatomia do harness',
      en: 'The anatomy of the harness',
    },
    shortLabel: {
      'pt-BR': 'Capítulo 2',
      en: 'Chapter 2',
    },
    tabLabel: {
      'pt-BR': 'Anatomia',
      en: 'Anatomy',
    },
    description: {
      'pt-BR':
        'Código como parte do harness e as três camadas: interface, mecanismos (plan-execute-verify) e escala multi-agent.',
      en: 'Code as part of the harness and the three layers: interface, mechanisms (plan-execute-verify), and multi-agent scale.',
    },
    learningQuestion: {
      'pt-BR': 'Que partes formam um harness?',
      en: 'What parts make up a harness?',
    },
    learningObjectives: {
      'pt-BR': [
        'Como código vira parte do runtime do agente.',
        'As três camadas: interface, mecanismos e escala.',
        'O loop plan-execute-verify como coração operacional.',
      ],
      en: [
        'How code becomes part of the agent runtime.',
        'The three layers: interface, mechanisms, and scale.',
        'The plan-execute-verify loop as the operational core.',
      ],
    },
    pathRole: {
      'pt-BR': 'Depois veja a estrutura: interface, mecanismos e escala.',
      en: 'Next, see the structure: interface, mechanisms, and scale.',
    },
    discussionSlug: 'harness-anatomy',
    badgeVariant: 'blue',
    sectionPadding: 'lg',
    sectionAlt: false,
  },
  {
    id: 'maturity',
    number: 3,
    slug: { 'pt-BR': 'maturidade', en: 'maturity' },
    title: {
      'pt-BR': 'Maturidade',
      en: 'Maturity',
    },
    shortLabel: {
      'pt-BR': 'Capítulo 3',
      en: 'Chapter 3',
    },
    tabLabel: {
      'pt-BR': 'Maturidade',
      en: 'Maturity',
    },
    description: {
      'pt-BR':
        'Harness não é wrapper: cinco níveis de maturidade de resposta assistida a harness evolutivo e como falhas viram melhoria estrutural.',
      en: 'Harness is not a wrapper: five maturity levels from assisted response to evolutionary harness, and turning failures into structural improvement.',
    },
    learningQuestion: {
      'pt-BR': 'Como saber se um harness é fraco ou maduro?',
      en: 'How do you tell a weak harness from a mature one?',
    },
    learningObjectives: {
      'pt-BR': [
        'Por que harness não é só um wrapper em volta do modelo.',
        'Os cinco níveis de maturidade, do assistido ao evolutivo.',
        'Como falhas viram melhoria estrutural no sistema.',
      ],
      en: [
        'Why a harness is not just a wrapper around the model.',
        'The five maturity levels, from assisted to evolutionary.',
        'How failures become structural improvement in the system.',
      ],
    },
    pathRole: {
      'pt-BR': 'Entenda maturidade: do assistido ao harness evolutivo.',
      en: 'Understand maturity: from assisted to evolutionary harness.',
    },
    discussionSlug: 'harness-maturity',
    badgeVariant: 'green',
    sectionPadding: 'lg',
    sectionAlt: true,
  },
  {
    id: 'governance',
    number: 4,
    slug: { 'pt-BR': 'governanca', en: 'governance' },
    title: {
      'pt-BR': 'Governança e segurança',
      en: 'Governance and security',
    },
    shortLabel: {
      'pt-BR': 'Capítulo 4',
      en: 'Chapter 4',
    },
    tabLabel: {
      'pt-BR': 'Governança',
      en: 'Governance',
    },
    description: {
      'pt-BR':
        'Human-in-the-loop como governança, segurança no design do harness e autonomia com limites explícitos.',
      en: 'Human-in-the-loop as governance, security by harness design, and autonomy with explicit boundaries.',
    },
    learningQuestion: {
      'pt-BR': 'Como autonomia continua segura?',
      en: 'How can autonomy stay safe?',
    },
    learningObjectives: {
      'pt-BR': [
        'Human-in-the-loop como governança, não só botão de aprovação.',
        'Segurança desenhada no harness, não só no prompt.',
        'Autonomia com limites explícitos e reversibilidade.',
      ],
      en: [
        'Human-in-the-loop as governance, not just an approval button.',
        'Security designed into the harness, not just the prompt.',
        'Autonomy with explicit boundaries and reversibility.',
      ],
    },
    pathRole: {
      'pt-BR': 'Aprenda governança: autonomia com limites claros.',
      en: 'Learn governance: autonomy with clear boundaries.',
    },
    discussionSlug: 'harness-governance',
    badgeVariant: 'coral',
    sectionPadding: 'lg',
    sectionAlt: false,
  },
  {
    id: 'engineer',
    number: 5,
    slug: { 'pt-BR': 'engenheiro', en: 'engineer' },
    title: {
      'pt-BR': 'O engenheiro',
      en: 'The engineer',
    },
    shortLabel: {
      'pt-BR': 'Capítulo 5',
      en: 'Chapter 5',
    },
    tabLabel: {
      'pt-BR': 'O engenheiro',
      en: 'The engineer',
    },
    description: {
      'pt-BR':
        'Harness Engineering e engenharia AI-native: o novo papel do engenheiro e dez perguntas para um harness explícito.',
      en: 'Harness Engineering and AI-native engineering: the engineer’s evolving role and ten questions for an explicit harness.',
    },
    learningQuestion: {
      'pt-BR': 'Qual é o papel do engenheiro nesse sistema?',
      en: "What is the engineer's role in this system?",
    },
    learningObjectives: {
      'pt-BR': [
        'Como Harness Engineering se conecta à engenharia AI-native.',
        'O engenheiro sobe de abstração sem desaparecer.',
        'Dez perguntas para tornar um harness explícito.',
      ],
      en: [
        'How Harness Engineering connects to AI-native engineering.',
        'The engineer moves up a level of abstraction without disappearing.',
        'Ten questions to make a harness explicit.',
      ],
    },
    pathRole: {
      'pt-BR': 'Veja o papel do engenheiro e as perguntas que importam.',
      en: 'See the engineer role and the questions that matter.',
    },
    discussionSlug: 'harness-engineer',
    badgeVariant: 'blue',
    sectionPadding: 'lg',
    sectionAlt: true,
  },
  {
    id: 'conclusion',
    number: 6,
    slug: { 'pt-BR': 'conclusao', en: 'conclusion' },
    title: {
      'pt-BR': 'Conclusão',
      en: 'Conclusion',
    },
    shortLabel: {
      'pt-BR': 'Conclusão',
      en: 'Conclusion',
    },
    tabLabel: {
      'pt-BR': 'Conclusão',
      en: 'Conclusion',
    },
    description: {
      'pt-BR':
        'Tese central: sistemas capazes de transformar modelos em trabalho confiável. Referência acadêmica e próximo passo na Aula 3.',
      en: 'Central thesis: systems that turn models into reliable work. Academic reference and next step in Lesson 3.',
    },
    learningQuestion: {
      'pt-BR': 'Qual tese eu levo daqui?',
      en: 'What thesis should I take from this path?',
    },
    learningObjectives: {
      'pt-BR': [
        'A tese central: capacidade vira trabalho confiável via sistema.',
        'Por que modelos melhores não eliminam a necessidade de harness.',
        'O próximo passo na Aula 3: SDD e Harness Design.',
      ],
      en: [
        'The central thesis: capability becomes reliable work through systems.',
        'Why better models do not remove the need for harness.',
        'The next step in Lesson 3: SDD and Harness Design.',
      ],
    },
    pathRole: {
      'pt-BR': 'Feche a trilha: tese central e próximo passo.',
      en: 'Close the path: central thesis and next step.',
    },
    discussionSlug: 'harness-conclusion',
    badgeVariant: 'coral',
    sectionPadding: 'xl',
    sectionAlt: false,
  },
];

const harnessBaseSlug = 'harness-engineering';

export function getHarnessChapterHref(lang: Lang, chapterId: HarnessChapterId): string {
  const chapter = HARNESS_CHAPTERS.find((ch) => ch.id === chapterId);
  if (!chapter) return getHarnessOverviewHref(lang);
  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  return withBase(`${prefix}${harnessBaseSlug}/${chapter.slug[lang]}`);
}

export function getHarnessChapterBySlug(lang: Lang, slug: string): HarnessChapter | undefined {
  return HARNESS_CHAPTERS.find((ch) => ch.slug[lang] === slug);
}

export function getHarnessChapterAlternateLinks(chapterId: HarnessChapterId) {
  const chapter = HARNESS_CHAPTERS.find((ch) => ch.id === chapterId);
  if (!chapter) return [];

  const links = supportedLangs.map((lang) => ({
    lang,
    href: getHarnessChapterHref(lang, chapterId),
    label: languages[lang].label,
  }));

  links.push({
    lang: 'x-default' as const,
    href: getHarnessChapterHref(defaultLang, chapterId),
  });

  return links;
}

export type HarnessNavTarget =
  | { type: 'overview' }
  | { type: 'chapter'; id: HarnessChapterId };

export interface HarnessNavLink {
  href: string;
  kicker: string;
  title: string;
}

export function getHarnessChapterNeighbors(chapterId: HarnessChapterId): {
  prev: HarnessNavTarget;
  next: HarnessNavTarget | null;
} {
  const index = HARNESS_CHAPTERS.findIndex((ch) => ch.id === chapterId);
  if (index === -1) {
    return { prev: { type: 'overview' }, next: null };
  }

  const prev: HarnessNavTarget =
    index === 0
      ? { type: 'overview' }
      : { type: 'chapter', id: HARNESS_CHAPTERS[index - 1].id };

  const next: HarnessNavTarget | null =
    index >= HARNESS_CHAPTERS.length - 1
      ? null
      : { type: 'chapter', id: HARNESS_CHAPTERS[index + 1].id };

  return { prev, next };
}

export function resolveHarnessNavTarget(
  lang: Lang,
  target: HarnessNavTarget,
  direction: 'prev' | 'next',
  labels: { previous: string; next: string; backToOverview: string },
): HarnessNavLink {
  if (target.type === 'overview') {
    return {
      href: getHarnessOverviewHref(lang),
      kicker: labels.backToOverview,
      title: HARNESS_SERIES.title[lang],
    };
  }

  const chapter = HARNESS_CHAPTERS.find((ch) => ch.id === target.id);
  if (!chapter) {
    return {
      href: getHarnessOverviewHref(lang),
      kicker: labels.backToOverview,
      title: HARNESS_SERIES.title[lang],
    };
  }

  return {
    href: getHarnessChapterHref(lang, target.id),
    kicker: direction === 'prev' ? labels.previous : labels.next,
    title: chapter.title[lang],
  };
}
