import type { AlternateLink, Lang } from '../lib/i18n';
import {
  withBase,
  defaultLang,
  languages,
  getSessionHref,
  supportedLangs,
} from '../lib/i18n';

export interface ChapterCheckpoint {
  id: string;
  text: Record<Lang, string>;
}

export interface ChapterReference {
  title: Record<Lang, string>;
  url: string | ((lang: Lang) => string);
  type: 'artigo' | 'documentacao' | 'talk' | 'video' | 'pesquisa';
  source: Record<Lang, string>;
}

export interface Chapter {
  number: number;
  id: string;
  title: Record<Lang, string>;
  shortLabel: Record<Lang, string>;
  description: Record<Lang, string>;
  slug: Record<Lang, string>;
  checkpoints: ChapterCheckpoint[];
  references: ChapterReference[];
  isReference?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    id: 'setup',
    title: {
      'pt-BR': 'Preparar o terreno',
      en: 'Set the ground',
    },
    shortLabel: {
      'pt-BR': 'Preparar',
      en: 'Setup',
    },
    description: {
      'pt-BR':
        'Criar o repositório no GitHub, clonar no terminal, abrir na ferramenta escolhida e instalar o GitHub CLI.',
      en: 'Create the repository on GitHub, clone it in the terminal, open it in your chosen tool, and install the GitHub CLI.',
    },
    slug: {
      'pt-BR': 'preparar',
      en: 'setup',
    },
    checkpoints: [
      {
        id: 'repo-created-manual',
        text: {
          'pt-BR': 'Repositório criado manualmente no GitHub',
          en: 'Repository created manually on GitHub',
        },
      },
      {
        id: 'repo-cloned-opened',
        text: {
          'pt-BR': 'Repositório clonado no terminal e aberto na ferramenta',
          en: 'Repository cloned in the terminal and opened in the tool',
        },
      },
      {
        id: 'ferramenta-aberta',
        text: {
          'pt-BR': 'Projeto aberto na ferramenta escolhida',
          en: 'Project opened in the chosen tool',
        },
      },
    ],
    references: [
      {
        title: {
          'pt-BR': 'Ferramentas e modelos',
          en: 'Tools and models',
        },
        url: (lang: Lang) =>
          getSessionHref(lang, lang === 'pt-BR' ? 'ferramentas' : 'tools'),
        type: 'artigo',
        source: {
          'pt-BR': 'AI-Native Engineers',
          en: 'AI-Native Engineers',
        },
      },
      {
        title: {
          'pt-BR': 'SDD e Harness Design',
          en: 'SDD and Harness Design',
        },
        url: (lang: Lang) =>
          getSessionHref(lang, lang === 'pt-BR' ? 'maturidade' : 'maturity'),
        type: 'artigo',
        source: {
          'pt-BR': 'AI-Native Engineers',
          en: 'AI-Native Engineers',
        },
      },
      {
        title: {
          'pt-BR': 'GitHub Docs: criar um novo repositório',
          en: 'GitHub Docs: create a new repository',
        },
        url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository',
        type: 'documentacao',
        source: { 'pt-BR': 'GitHub', en: 'GitHub' },
      },
      {
        title: {
          'pt-BR': 'Git: documentação do comando clone',
          en: 'Git: clone command documentation',
        },
        url: 'https://git-scm.com/docs/git-clone',
        type: 'documentacao',
        source: { 'pt-BR': 'Git', en: 'Git' },
      },
      {
        title: {
          'pt-BR': 'GitHub CLI quickstart',
          en: 'GitHub CLI quickstart',
        },
        url: 'https://docs.github.com/en/github-cli/github-cli/quickstart',
        type: 'documentacao',
        source: { 'pt-BR': 'GitHub', en: 'GitHub' },
      },
      {
        title: {
          'pt-BR': 'HackerNews API — documentação oficial',
          en: 'HackerNews API — official documentation',
        },
        url: 'https://github.com/HackerNews/API',
        type: 'documentacao',
        source: { 'pt-BR': 'HackerNews', en: 'HackerNews' },
      },
    ],
  },
  {
    number: 2,
    id: 'plan',
    title: {
      'pt-BR': 'Planejar com o agente',
      en: 'Plan with the agent',
    },
    shortLabel: {
      'pt-BR': 'Planejar',
      en: 'Plan',
    },
    description: {
      'pt-BR':
        'Criar o ROADMAP.md, o arquivo de operação do agente e o DEV_PLAN.md usando prompts estruturados.',
      en: 'Create the ROADMAP.md, the agent operation file, and the DEV_PLAN.md using structured prompts.',
    },
    slug: {
      'pt-BR': 'planejar',
      en: 'plan',
    },
    checkpoints: [
      {
        id: 'roadmap-criado',
        text: {
          'pt-BR': 'ROADMAP.md criado pelo agente',
          en: 'ROADMAP.md created by the agent',
        },
      },
      {
        id: 'agents-criado',
        text: {
          'pt-BR': 'AGENTS.md ou CLAUDE.md criado',
          en: 'AGENTS.md or CLAUDE.md created',
        },
      },
      {
        id: 'dev-plan-criado',
        text: {
          'pt-BR': 'DEV_PLAN.md criado e revisado',
          en: 'DEV_PLAN.md created and reviewed',
        },
      },
    ],
    references: [
      {
        title: {
          'pt-BR': 'SDD e Harness Design',
          en: 'SDD and Harness Design',
        },
        url: (lang: Lang) =>
          getSessionHref(lang, lang === 'pt-BR' ? 'maturidade' : 'maturity'),
        type: 'artigo',
        source: {
          'pt-BR': 'AI-Native Engineers',
          en: 'AI-Native Engineers',
        },
      },
      {
        title: {
          'pt-BR': 'HackerNews API — documentação oficial',
          en: 'HackerNews API — official documentation',
        },
        url: 'https://github.com/HackerNews/API',
        type: 'documentacao',
        source: { 'pt-BR': 'HackerNews', en: 'HackerNews' },
      },
    ],
  },
  {
    number: 3,
    id: 'build',
    title: {
      'pt-BR': 'Construir por partes',
      en: 'Build in parts',
    },
    shortLabel: {
      'pt-BR': 'Construir',
      en: 'Build',
    },
    description: {
      'pt-BR':
        'Começar pela fase 1 e executar o DEV_PLAN.md fase por fase com um loop claro: PRD, PLAN mode, implementação, validação e commit.',
      en: 'Start with phase 1 and execute the DEV_PLAN.md phase by phase with a clear loop: PRD, PLAN mode, implementation, validation, and commit.',
    },
    slug: {
      'pt-BR': 'construir',
      en: 'build',
    },
    checkpoints: [
      {
        id: 'prd-criado',
        text: {
          'pt-BR': 'PRD da fase atual criada em docs/prd/',
          en: 'Current phase PRD created in docs/prd/',
        },
      },
      {
        id: 'fase-executada',
        text: {
          'pt-BR': 'Fase implementada e validada no browser',
          en: 'Phase implemented and validated in browser',
        },
      },
      {
        id: 'commit-feito',
        text: {
          'pt-BR': 'Commit feito e fase marcada como DONE no DEV_PLAN.md',
          en: 'Commit done and phase marked DONE in DEV_PLAN.md',
        },
      },
    ],
    references: [
      {
        title: {
          'pt-BR': 'SDD e Harness Design',
          en: 'SDD and Harness Design',
        },
        url: (lang: Lang) =>
          getSessionHref(lang, lang === 'pt-BR' ? 'maturidade' : 'maturity'),
        type: 'artigo',
        source: {
          'pt-BR': 'AI-Native Engineers',
          en: 'AI-Native Engineers',
        },
      },
      {
        title: {
          'pt-BR': 'Cross-Origin Resource Sharing (CORS)',
          en: 'Cross-Origin Resource Sharing (CORS)',
        },
        url: 'https://developer.mozilla.org/docs/Web/HTTP/CORS',
        type: 'documentacao',
        source: { 'pt-BR': 'MDN Web Docs', en: 'MDN Web Docs' },
      },
    ],
  },
  {
    number: 4,
    id: 'publish',
    title: {
      'pt-BR': 'Publicar',
      en: 'Publish',
    },
    shortLabel: {
      'pt-BR': 'Publicar',
      en: 'Publish',
    },
    description: {
      'pt-BR':
        'Publicar o primeiro deploy no GitHub Pages a partir do projeto final já enviado ao GitHub.',
      en: 'Publish the first GitHub Pages deploy from the final project already pushed to GitHub.',
    },
    slug: {
      'pt-BR': 'publicar',
      en: 'publish',
    },
    checkpoints: [
      {
        id: 'gh-actions',
        text: {
          'pt-BR': 'Fonte de publicação do GitHub Pages configurada',
          en: 'GitHub Pages publishing source configured',
        },
      },
      {
        id: 'pages-live',
        text: {
          'pt-BR': 'Site publicado no GitHub Pages',
          en: 'Site published on GitHub Pages',
        },
      },
      {
        id: 'site-works',
        text: {
          'pt-BR': 'Todas as funcionalidades no site publicado',
          en: 'All features working on published site',
        },
      },
    ],
    references: [
      {
        title: {
          'pt-BR': 'SDD e Harness Design',
          en: 'SDD and Harness Design',
        },
        url: (lang: Lang) =>
          getSessionHref(lang, lang === 'pt-BR' ? 'maturidade' : 'maturity'),
        type: 'artigo',
        source: {
          'pt-BR': 'AI-Native Engineers',
          en: 'AI-Native Engineers',
        },
      },
      {
        title: {
          'pt-BR': 'GitHub Pages, Configurar fonte de publicação',
          en: 'GitHub Pages, Configure a publishing source',
        },
        url: 'https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site',
        type: 'documentacao',
        source: { 'pt-BR': 'GitHub', en: 'GitHub' },
      },
      {
        title: {
          'pt-BR': 'Vite, Deploy de site estático',
          en: 'Vite, Static deploy',
        },
        url: 'https://vite.dev/guide/static-deploy',
        type: 'documentacao',
        source: { 'pt-BR': 'Vite', en: 'Vite' },
      },
      {
        title: {
          'pt-BR': 'Astro, Deploy no GitHub Pages',
          en: 'Astro, Deploy to GitHub Pages',
        },
        url: 'https://docs.astro.build/en/guides/deploy/github/',
        type: 'documentacao',
        source: { 'pt-BR': 'Astro Docs', en: 'Astro Docs' },
      },
      {
        title: {
          'pt-BR': 'GitHub Pages, Workflows customizados',
          en: 'GitHub Pages, Custom workflows',
        },
        url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages',
        type: 'documentacao',
        source: { 'pt-BR': 'GitHub', en: 'GitHub' },
      },
    ],
  },
];

export const TRACKABLE_CHAPTERS = CHAPTERS.filter((ch) => !ch.isReference);

export function getChapterHref(chapterNumber: number, lang: Lang): string {
  const chapter = CHAPTERS.find((ch) => ch.number === chapterNumber);
  if (!chapter) return '#';
  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  const projectSlug = lang === defaultLang ? 'projeto' : 'project';
  return withBase(`${prefix}${projectSlug}/${chapter.slug[lang]}`);
}

export function getChapterAlternateLinks(
  chapterNumber: number,
): AlternateLink[] {
  const links: AlternateLink[] = supportedLangs.map((lang) => ({
    lang,
    href: getChapterHref(chapterNumber, lang),
    label: languages[lang].label,
  }));

  links.push({
    lang: 'x-default',
    href: getChapterHref(chapterNumber, defaultLang),
  });

  return links;
}

export function getChapterByNumber(num: number): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.number === num);
}

export interface ResolvedReference {
  id: string;
  title: string;
  url: string;
  type: 'artigo' | 'documentacao' | 'talk' | 'video' | 'pesquisa';
  source: string;
  category: string;
}

export function resolveChapterReferences(
  chapter: Chapter,
  lang: Lang,
): ResolvedReference[] {
  return chapter.references.map((ref, i) => ({
    id: `${chapter.id}-ref-${i}`,
    title: ref.title[lang],
    url: typeof ref.url === 'string' ? ref.url : ref.url(lang),
    type: ref.type,
    source: ref.source[lang],
    category: chapter.id,
  }));
}
