import type { AlternateLink, Lang } from '../lib/i18n';
import { getSessionHref, supportedLangs } from '../lib/i18n';

export interface SessionCardData {
  title: string;
  slug: string;
  lang: Lang;
  translationKey: string;
  order: number;
  summary: string;
  readingTime: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  heroLabel: string;
  accent: 'yellow' | 'blue' | 'green' | 'coral';
}

export const sessions: SessionCardData[] = [
  {
    title: 'Glossário: vibe coding sem cair no hype',
    slug: 'glossario',
    lang: 'pt-BR',
    translationKey: 'glossary',
    order: 1,
    summary:
      'O que é vibe coding, quais plataformas criam apps por prompt, onde isso ajuda e onde quebra.',
    readingTime: 14,
    level: 'beginner',
    heroLabel: 'Vocabulário essencial',
    accent: 'blue',
  },
  {
    title: 'Ferramentas e modelos',
    slug: 'ferramentas',
    lang: 'pt-BR',
    translationKey: 'tools',
    order: 2,
    summary:
      'Entenda a diferença entre ferramenta, produto e modelo para escolher melhor IDEs, CLIs, agentes na nuvem e LLMs.',
    readingTime: 28,
    level: 'intermediate',
    heroLabel: 'Mapa de escolha',
    accent: 'green',
  },
  {
    title: 'SDD e Harness Design',
    slug: 'maturidade',
    lang: 'pt-BR',
    translationKey: 'maturity',
    order: 3,
    summary:
      'Transforme intenção em contrato verificável e organize o harness para agentes trabalharem com contexto, validação e responsabilidade.',
    readingTime: 24,
    level: 'advanced',
    heroLabel: 'Fluxo profissional',
    accent: 'coral',
  },
  {
    title: 'Glossary: vibe coding without the hype',
    slug: 'glossary',
    lang: 'en',
    translationKey: 'glossary',
    order: 1,
    summary:
      'What vibe coding is, which platforms turn prompts into apps, where it helps, and where it breaks.',
    readingTime: 14,
    level: 'beginner',
    heroLabel: 'Essential vocabulary',
    accent: 'blue',
  },
  {
    title: 'Tools and models',
    slug: 'tools',
    lang: 'en',
    translationKey: 'tools',
    order: 2,
    summary:
      'Understand the difference between tools, products, and models so you can choose IDEs, CLIs, cloud agents, and LLMs with intent.',
    readingTime: 28,
    level: 'intermediate',
    heroLabel: 'Choice map',
    accent: 'green',
  },
  {
    title: 'SDD and Harness Design',
    slug: 'maturity',
    lang: 'en',
    translationKey: 'maturity',
    order: 3,
    summary:
      'Turn intent into a verifiable contract and design the harness that lets agents work with enterprise-grade quality.',
    readingTime: 24,
    level: 'advanced',
    heroLabel: 'Professional flow',
    accent: 'coral',
  },
];

export function getSessions(lang: Lang): SessionCardData[] {
  return sessions
    .filter((session) => session.lang === lang)
    .sort((a, b) => a.order - b.order);
}

export function getSessionByOrder(
  lang: Lang,
  order: number,
): SessionCardData | undefined {
  return getSessions(lang).find((session) => session.order === order);
}

export function getSessionByTranslationKey(
  lang: Lang,
  translationKey: string,
): SessionCardData | undefined {
  return sessions.find(
    (session) =>
      session.lang === lang && session.translationKey === translationKey,
  );
}

export function getSessionAlternateLinks(
  translationKey: string,
): AlternateLink[] {
  const links: AlternateLink[] = supportedLangs
    .map((lang): AlternateLink | null => {
      const session = getSessionByTranslationKey(lang, translationKey);
      if (!session) return null;
      return {
        lang,
        href: getSessionHref(lang, session.slug),
      };
    })
    .filter((link): link is AlternateLink => link !== null);

  const defaultSession = getSessionByTranslationKey('pt-BR', translationKey);

  return defaultSession
    ? [
        ...links,
        {
          lang: 'x-default',
          href: getSessionHref('pt-BR', defaultSession.slug),
        },
      ]
    : links;
}
