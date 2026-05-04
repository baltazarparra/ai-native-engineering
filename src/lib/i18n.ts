export const languages = {
  'pt-BR': {
    code: 'pt-BR',
    htmlLang: 'pt-BR',
    label: 'PT-BR',
    shortLabel: 'PT',
    flag: 'br',
    pathPrefix: '',
    locale: 'pt_BR',
    dateLocale: 'pt-BR',
  },
  en: {
    code: 'en',
    htmlLang: 'en',
    label: 'English',
    shortLabel: 'EN',
    flag: 'us',
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
  'ai-native-engineers:preferred-language';
export const supportedLangs = Object.keys(languages) as Lang[];
export const ui = {
  'pt-BR': {
    siteDescription: 'AI-Native Engineers: o mapa que importa',
    skipToContent: 'Pular para o conteúdo',
    languageNav: 'Selecionar idioma',
    themeToggle: {
      navLabel: 'Tema claro ou escuro',
      activateDark: 'Ativar modo escuro',
      activateLight: 'Ativar modo claro',
    },
    currentLanguage: 'Idioma atual',
    repositoryLink: 'Repositório do projeto no GitHub',
    progressLabel: 'Progresso de leitura',
    summaryHeading: 'Em 30 segundos',
    readingMinutes: (minutes: number) => `${minutes} min de leitura`,
    updatedAt: 'Atualizado em',
    levels: {
      beginner: 'iniciante',
      intermediate: 'intermediário',
      advanced: 'avançado',
    },
    sectionNav: {
      ariaLabel: 'Navegação da sessão',
      summaryFallback: 'Resumo',
      references: 'Referências',
      discussion: 'Discussão',
    },
    discussion: {
      kicker: 'Comunidade',
      heading: 'Pergunte, responda, destrave',
      description:
        'Use este espaço para fazer perguntas sobre a sessão, compartilhar exemplos e ajudar outras pessoas a entenderem o tema.',
      notConfigured:
        'A área de discussão ainda precisa ser conectada ao Giscus. Enquanto isso, você pode abrir uma discussão direto no GitHub.',
      openDiscussions: 'Abrir discussões no GitHub',
    },
    references: {
      heading: 'Quer se aprofundar?',
      groupLabels: {
        artigo: 'Artigos',
        documentacao: 'Documentação',
        talk: 'Talks',
        video: 'Vídeos',
        pesquisa: 'Pesquisa',
      },
      badgeLabels: {
        artigo: 'artigo',
        documentacao: 'docs',
        talk: 'talk',
        video: 'vídeo',
        pesquisa: 'pesquisa',
      },
    },
    nextSession: {
      lastLabel: 'Você chegou ao fim',
      lastTitle: 'Agora é hora de colocar em prática.',
      home: 'Ir para o projeto prático',
      label: 'Próxima sessão',
      continue: 'Continuar',
    },
    project: {
      title: 'Projeto Prático',
      heroLabel: 'Mão na massa',
      heading: 'Construa seu primeiro projeto usando Agente de IA',
      summary:
        'Um guia prático para criar, planejar e publicar um projeto AI-Native do zero.',
      readingTime: '45 min (prática guiada)',
      navAriaLabel: 'Navegação do projeto',
      checkpointLabel: 'Checkpoint',
      homeCta: 'Ir para o projeto prático',
      homeDesc:
        'Já viu a teoria? Agora crie um projeto do zero com seu agente de código e publique no GitHub Pages.',
    },
    chapters: {
      chapterLabel: (n: number) => `Capítulo ${n}`,
      navAriaLabel: 'Capítulos do projeto',
      progressOf: (done: number, total: number) =>
        `${done} de ${total} completos`,
      checkpointsOf: (done: number, total: number) =>
        `${done} de ${total} checkpoints`,
      complete: 'Capítulo concluído!',
      checkpointHint:
        'Complete todos os checkpoints para desbloquear o próximo capítulo.',
      nextUp: 'Próximo',
      goToChapter: 'Ir para o capítulo',
      backToOverview: 'Voltar para a visão geral',
      congrats: 'Projeto concluído!',
      congratsDesc:
        'Você completou todas as etapas. Seu projeto está publicado e funcionando.',
      startProject: 'Começar',
      continueProject: 'Continuar',
      reference: 'Referência',
      previousAria: 'Capítulo anterior',
      nextAria: 'Próximo capítulo',
      tabAria: 'Capítulos do projeto',
      resetAria: 'Limpar progresso',
      reset: 'Recomeçar',
    },
    footer: {
      tagline: 'baltz',
      personalSite: 'Site baltz.dev',
      repositoryLink: 'Repositório no GitHub',
    },
  },
  en: {
    siteDescription: 'AI-Native Engineers: the map that actually matters',
    skipToContent: 'Skip to content',
    languageNav: 'Choose language',
    themeToggle: {
      navLabel: 'Light or dark theme',
      activateDark: 'Turn on dark mode',
      activateLight: 'Turn on light mode',
    },
    currentLanguage: 'Current language',
    repositoryLink: 'Project repository on GitHub',
    progressLabel: 'Reading progress',
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
      discussion: 'Discussion',
    },
    discussion: {
      kicker: 'Community',
      heading: 'Ask, answer, get unstuck',
      description:
        'Use this space to ask questions about the session, share examples, and help other people understand the topic.',
      notConfigured:
        'The discussion area still needs to be connected to Giscus. For now, you can open a discussion directly on GitHub.',
      openDiscussions: 'Open GitHub discussions',
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
      lastTitle: 'Now put it to work.',
      home: 'Go to the hands-on project',
      label: 'Next session',
      continue: 'Keep going',
    },
    project: {
      title: 'Hands-on Project',
      heroLabel: 'Hands-on',
      heading: 'Build your first project with a code agent',
      summary:
        'A practical guide to creating, planning, and publishing a project from scratch using the agentic development workflow.',
      readingTime: '45 min (guided practice)',
      navAriaLabel: 'Project navigation',
      checkpointLabel: 'Checkpoint',
      homeCta: 'Go to the hands-on project',
      homeDesc:
        'Done with theory? Build a project from scratch with your code agent and publish it to GitHub Pages.',
    },
    chapters: {
      chapterLabel: (n: number) => `Chapter ${n}`,
      navAriaLabel: 'Project chapters',
      progressOf: (done: number, total: number) =>
        `${done} of ${total} complete`,
      checkpointsOf: (done: number, total: number) =>
        `${done} of ${total} checkpoints`,
      complete: 'Chapter complete!',
      checkpointHint: 'Complete all checkpoints to unlock the next chapter.',
      nextUp: 'Next up',
      goToChapter: 'Go to chapter',
      backToOverview: 'Back to overview',
      congrats: 'Project complete!',
      congratsDesc:
        'You completed every step. Your project is published and working.',
      startProject: 'Start',
      continueProject: 'Continue',
      reference: 'Reference',
      previousAria: 'Previous chapter',
      nextAria: 'Next chapter',
      tabAria: 'Project chapters',
      resetAria: 'Reset progress',
      reset: 'Start over',
    },
    footer: {
      tagline: 'baltz',
      personalSite: 'baltz.dev website',
      repositoryLink: 'GitHub repository',
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

const projectSlugs: Record<Lang, string> = {
  'pt-BR': 'projeto',
  en: 'project',
};

const skillsSlug = 'skills';

export function getProjectHref(lang: Lang): string {
  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  return withBase(`${prefix}${projectSlugs[lang]}`);
}

export function getSkillsHref(lang: Lang): string {
  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  return withBase(`${prefix}${skillsSlug}`);
}

export function getProjectAlternateLinks(): AlternateLink[] {
  const links: AlternateLink[] = supportedLangs.map((lang) => ({
    lang,
    href: getProjectHref(lang),
    label: languages[lang].label,
  }));
  links.push({ lang: 'x-default' as const, href: getProjectHref(defaultLang) });
  return links;
}

export function getSkillsAlternateLinks(): AlternateLink[] {
  const links: AlternateLink[] = supportedLangs.map((lang) => ({
    lang,
    href: getSkillsHref(lang),
    label: languages[lang].label,
  }));
  links.push({ lang: 'x-default' as const, href: getSkillsHref(defaultLang) });
  return links;
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
