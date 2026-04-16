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
    title: 'O que é um AI-Native Engineer',
    slug: 'ai-native-engineer',
    lang: 'pt-BR',
    translationKey: 'ai-native-engineer',
    order: 0,
    summary:
      'O ponto de partida. O que muda quando IA vira parte do fluxo de trabalho e não só uma ferramenta auxiliar.',
    readingTime: 12,
    level: 'beginner',
    heroLabel: 'Ponto de partida',
    accent: 'yellow',
  },
  {
    title: 'Glossário: os termos que você precisa conhecer',
    slug: 'glossario',
    lang: 'pt-BR',
    translationKey: 'glossary',
    order: 1,
    summary:
      'Prompt, token, contexto, agente. O glossário que organiza o vocabulário sem jargão desnecessário.',
    readingTime: 15,
    level: 'beginner',
    heroLabel: 'Vocabulário essencial',
    accent: 'blue',
  },
  {
    title: 'Ferramentas: IDEs vs CLI',
    slug: 'ferramentas',
    lang: 'pt-BR',
    translationKey: 'tools',
    order: 2,
    summary:
      'Cursor, Windsurf, GitHub Copilot, Claude Code. O que cada ferramenta faz, onde brilha e onde tropeça.',
    readingTime: 18,
    level: 'beginner',
    heroLabel: 'Mapa de ferramentas',
    accent: 'green',
  },
  {
    title: 'LLMs e os modelos mais usados',
    slug: 'modelos',
    lang: 'pt-BR',
    translationKey: 'models',
    order: 3,
    summary:
      'GPT, Claude, Gemini, Llama. Como funcionam por cima, o que diferencia um do outro e como escolher.',
    readingTime: 20,
    level: 'intermediate',
    heroLabel: 'Entendendo modelos',
    accent: 'coral',
  },
  {
    title: 'A evolução do desenvolvimento com IA',
    slug: 'maturidade',
    lang: 'pt-BR',
    translationKey: 'maturity',
    order: 4,
    summary:
      'De copiar resposta do ChatGPT até orquestrar agentes. As 5 fases de maturidade e onde você está.',
    readingTime: 22,
    level: 'intermediate',
    heroLabel: 'Níveis de maturidade',
    accent: 'yellow',
  },
  {
    title: 'Como operar de forma AI-native na prática',
    slug: 'como-operar',
    lang: 'pt-BR',
    translationKey: 'how-to-operate',
    order: 5,
    summary:
      'Checklists, workflows e exemplos reais de como diferentes perfis operam com IA no dia a dia.',
    readingTime: 25,
    level: 'advanced',
    heroLabel: 'Na prática',
    accent: 'blue',
  },
  {
    title: 'What is an AI-Native Engineer?',
    slug: 'what-is-ai-native-engineer',
    lang: 'en',
    translationKey: 'ai-native-engineer',
    order: 0,
    summary:
      'The starting point. What changes when AI becomes part of the workflow, not just an extra tool on the side.',
    readingTime: 12,
    level: 'beginner',
    heroLabel: 'Starting point',
    accent: 'yellow',
  },
  {
    title: 'The words people keep using',
    slug: 'glossary',
    lang: 'en',
    translationKey: 'glossary',
    order: 1,
    summary:
      'Prompt, token, context, agent. A glossary that keeps the vocabulary useful without turning it into jargon soup.',
    readingTime: 15,
    level: 'beginner',
    heroLabel: 'Essential vocabulary',
    accent: 'blue',
  },
  {
    title: 'Tools: IDEs vs CLI',
    slug: 'tools',
    lang: 'en',
    translationKey: 'tools',
    order: 2,
    summary:
      'Cursor, Windsurf, GitHub Copilot, Claude Code. What each tool does, where it shines, and where it trips.',
    readingTime: 18,
    level: 'beginner',
    heroLabel: 'Tool map',
    accent: 'green',
  },
  {
    title: 'LLMs and the models people actually use',
    slug: 'models',
    lang: 'en',
    translationKey: 'models',
    order: 3,
    summary:
      'GPT, Claude, Gemini, Llama. How they work at a useful level, what makes them different, and how to choose.',
    readingTime: 20,
    level: 'intermediate',
    heroLabel: 'Understanding models',
    accent: 'coral',
  },
  {
    title: 'How AI development matured',
    slug: 'maturity',
    lang: 'en',
    translationKey: 'maturity',
    order: 4,
    summary:
      'From copying ChatGPT answers to orchestrating agents. The 5 maturity phases and where your workflow fits.',
    readingTime: 22,
    level: 'intermediate',
    heroLabel: 'Maturity levels',
    accent: 'yellow',
  },
  {
    title: 'How to operate AI-native in practice',
    slug: 'how-to-operate',
    lang: 'en',
    translationKey: 'how-to-operate',
    order: 5,
    summary:
      'Real workflows, project examples, and what changes day to day when you operate AI-native.',
    readingTime: 25,
    level: 'advanced',
    heroLabel: 'In practice',
    accent: 'blue',
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
  const links = supportedLangs
    .map((lang) => {
      const session = getSessionByTranslationKey(lang, translationKey);
      if (!session) return null;
      return {
        lang,
        href: getSessionHref(lang, session.slug),
      };
    })
    .filter((link): link is AlternateLink => Boolean(link));

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
