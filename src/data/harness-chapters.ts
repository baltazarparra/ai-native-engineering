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
        'Tese central: sistemas capazes de transformar modelos em trabalho confiável. Referência acadêmica e próximo passo na Sessão 3.',
      en: 'Central thesis: systems that turn models into reliable work. Academic reference and next step in Session 3.',
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
