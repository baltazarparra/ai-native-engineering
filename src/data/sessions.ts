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
      'Código é ferramenta para resolver problemas. O que muda com IA é como você transforma intenção em software usando agentes de código.',
    readingTime: 10,
    level: 'beginner',
    heroLabel: 'Ponto de partida',
    accent: 'yellow',
  },
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
    title: 'Ferramentas: IDEs vs CLI',
    slug: 'ferramentas',
    lang: 'pt-BR',
    translationKey: 'tools',
    order: 2,
    summary:
      'Cursor, Windsurf, GitHub Copilot, Claude Code. O que cada ferramenta faz, onde brilha e onde tropeça.',
    readingTime: 14,
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
    readingTime: 15,
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
    readingTime: 16,
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
    readingTime: 18,
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
      'Code is a tool for solving problems. What changes with AI is how you turn intent into software with coding agents.',
    readingTime: 10,
    level: 'beginner',
    heroLabel: 'Starting point',
    accent: 'yellow',
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
    title: 'Tools: IDEs vs CLI',
    slug: 'tools',
    lang: 'en',
    translationKey: 'tools',
    order: 2,
    summary:
      'Cursor, Windsurf, GitHub Copilot, Claude Code. What each tool does, where it shines, and where it trips.',
    readingTime: 14,
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
    readingTime: 15,
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
    readingTime: 16,
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
    readingTime: 18,
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
