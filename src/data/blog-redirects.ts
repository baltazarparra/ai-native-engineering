import type { AlternateLink, Lang } from '../lib/i18n';
import {
  defaultLang,
  getBlogHref,
  languages,
  supportedLangs,
} from '../lib/i18n';

interface BlogRedirectPair {
  legacySlug: string;
  targetSlug: string;
}

export const HARNESS_ARTICLE_REDIRECTS = {
  'pt-BR': {
    legacySlug: 'harness-no-dia-a-dia',
    targetSlug: 'harness-engineering-o-sistema-ao-redor-do-modelo',
  },
  en: {
    legacySlug: 'harness-in-daily-work',
    targetSlug: 'harness-engineering-the-system-around-the-model',
  },
} as const satisfies Record<Lang, BlogRedirectPair>;

export function getHarnessArticleRedirect(lang: Lang): BlogRedirectPair {
  return HARNESS_ARTICLE_REDIRECTS[lang];
}

export function getHarnessArticleTargetAlternateLinks(): AlternateLink[] {
  return [
    ...supportedLangs.map((lang) => ({
      lang,
      href: getBlogHref(lang, HARNESS_ARTICLE_REDIRECTS[lang].targetSlug),
      label: languages[lang].label,
    })),
    {
      lang: 'x-default' as const,
      href: getBlogHref(
        defaultLang,
        HARNESS_ARTICLE_REDIRECTS[defaultLang].targetSlug,
      ),
    },
  ];
}

export function getLegacyHarnessArticleHrefs(): string[] {
  return supportedLangs.map((lang) =>
    getBlogHref(lang, HARNESS_ARTICLE_REDIRECTS[lang].legacySlug),
  );
}
