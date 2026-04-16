export const languages = {
  'pt-BR': {
    code: 'pt-BR',
    htmlLang: 'pt-BR',
    label: 'PT-BR',
    shortLabel: 'PT',
    pathPrefix: '',
    locale: 'pt_BR',
    dateLocale: 'pt-BR',
  },
  en: {
    code: 'en',
    htmlLang: 'en',
    label: 'English',
    shortLabel: 'EN',
    pathPrefix: 'en',
    locale: 'en_US',
    dateLocale: 'en',
  },
} as const;

export type Lang = keyof typeof languages;

export interface AlternateLink {
  lang: Lang | 'x-default';
  href: string;
  label?: string;
}

export const defaultLang: Lang = 'pt-BR';
export const languagePreferenceStorageKey =
  'ai-native-engineering:preferred-language';
export const supportedLangs = Object.keys(languages) as Lang[];
export const repositoryUrl =
  'https://github.com/baltazarparra/ai-native-engineering';

export const ui = {
  'pt-BR': {
    siteDescription: 'AI-Native Engineering: o mapa que importa',
    skipToContent: 'Pular para o conteudo',
    languageNav: 'Selecionar idioma',
    currentLanguage: 'Idioma atual',
    progressLabel: 'Progresso de leitura',
    repoCta: {
      label: 'Dar star',
      ariaLabel: 'Dar star no repositorio no GitHub',
    },
    summaryHeading: 'Em 30 segundos',
    readingMinutes: (minutes: number) => `${minutes} min de leitura`,
    updatedAt: 'Atualizado em',
    levels: {
      beginner: 'iniciante',
      intermediate: 'intermediario',
      advanced: 'avancado',
    },
    sectionNav: {
      ariaLabel: 'Navegacao da sessao',
      summaryFallback: 'Resumo',
      references: 'Referencias',
    },
    references: {
      heading: 'Quer se aprofundar?',
      groupLabels: {
        artigo: 'Artigos',
        documentacao: 'Documentacao',
        talk: 'Talks',
        video: 'Videos',
        pesquisa: 'Pesquisa',
      },
      badgeLabels: {
        artigo: 'artigo',
        documentacao: 'docs',
        talk: 'talk',
        video: 'video',
        pesquisa: 'pesquisa',
      },
    },
    nextSession: {
      lastLabel: 'Voce chegou ao fim',
      lastTitle: 'Parabens! Agora e hora de aplicar.',
      home: 'Voltar pra home',
      label: 'Proxima sessao',
      continue: 'Continuar',
    },
    footer: {
      tagline: 'Feito com Astro e cafe',
    },
  },
  en: {
    siteDescription: 'AI-Native Engineering: the map that actually matters',
    skipToContent: 'Skip to content',
    languageNav: 'Choose language',
    currentLanguage: 'Current language',
    progressLabel: 'Reading progress',
    repoCta: {
      label: 'Star repo',
      ariaLabel: 'Star this repository on GitHub',
    },
    summaryHeading: 'In 30 seconds',
    readingMinutes: (minutes: number) => `${minutes} min read`,
    updatedAt: 'Updated',
    levels: {
      beginner: 'beginner',
      intermediate: 'intermediate',
      advanced: 'advanced',
    },
    sectionNav: {
      ariaLabel: 'Session navigation',
      summaryFallback: 'Summary',
      references: 'References',
    },
    references: {
      heading: 'Want to go deeper?',
      groupLabels: {
        artigo: 'Articles',
        documentacao: 'Docs',
        talk: 'Talks',
        video: 'Videos',
        pesquisa: 'Research',
      },
      badgeLabels: {
        artigo: 'article',
        documentacao: 'docs',
        talk: 'talk',
        video: 'video',
        pesquisa: 'research',
      },
    },
    nextSession: {
      lastLabel: 'You made it to the end',
      lastTitle: 'Nice. Now put it to work.',
      home: 'Back home',
      label: 'Next session',
      continue: 'Keep going',
    },
    footer: {
      tagline: 'Built with Astro and coffee',
    },
  },
} as const;

export function isLang(value: string | undefined): value is Lang {
  return Boolean(value && value in languages);
}

export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
}

export function getHomeHref(lang: Lang): string {
  return lang === defaultLang
    ? withBase()
    : withBase(`${languages[lang].pathPrefix}/`);
}

export function getSessionHref(lang: Lang, slug: string): string {
  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  return withBase(`${prefix}sessions/${slug}`);
}

export function getHomeAlternateLinks(): AlternateLink[] {
  return [
    ...supportedLangs.map((lang) => ({
      lang,
      href: getHomeHref(lang),
      label: languages[lang].label,
    })),
    { lang: 'x-default' as const, href: getHomeHref(defaultLang) },
  ];
}

export function getLangFromPathname(pathname: string): Lang {
  const base = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, '');
  const parts = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  const withoutBase = base && parts[0] === base ? parts.slice(1) : parts;
  return withoutBase[0] === languages.en.pathPrefix ? 'en' : defaultLang;
}
