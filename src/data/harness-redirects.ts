import type { AlternateLink, Lang } from '../lib/i18n';
import { defaultLang, languages, supportedLangs, withBase } from '../lib/i18n';

export type HarnessRedirectId =
  | 'fundamentals'
  | 'anatomy'
  | 'maturity'
  | 'governance'
  | 'engineer'
  | 'conclusion';

interface HarnessRedirect {
  id: HarnessRedirectId;
  slug: Record<Lang, string>;
}

export const HARNESS_REDIRECTS: HarnessRedirect[] = [
  {
    id: 'fundamentals',
    slug: { 'pt-BR': 'fundamentos', en: 'fundamentals' },
  },
  {
    id: 'anatomy',
    slug: { 'pt-BR': 'anatomia', en: 'anatomy' },
  },
  {
    id: 'maturity',
    slug: { 'pt-BR': 'maturidade', en: 'maturity' },
  },
  {
    id: 'governance',
    slug: { 'pt-BR': 'governanca', en: 'governance' },
  },
  {
    id: 'engineer',
    slug: { 'pt-BR': 'engenheiro', en: 'engineer' },
  },
  {
    id: 'conclusion',
    slug: { 'pt-BR': 'conclusao', en: 'conclusion' },
  },
];

function getHarnessRedirectHref(
  lang: Lang,
  redirectId: HarnessRedirectId,
): string {
  const redirect = HARNESS_REDIRECTS.find((item) => item.id === redirectId);
  if (!redirect) return withBase('harness-engineering');

  const prefix = lang === defaultLang ? '' : `${languages[lang].pathPrefix}/`;
  return withBase(`${prefix}harness-engineering/${redirect.slug[lang]}`);
}

export function getHarnessRedirectAlternateLinks(
  redirectId: HarnessRedirectId,
): AlternateLink[] {
  const redirect = HARNESS_REDIRECTS.find((item) => item.id === redirectId);
  if (!redirect) return [];

  return [
    ...supportedLangs.map((lang) => ({
      lang,
      href: getHarnessRedirectHref(lang, redirectId),
      label: languages[lang].label,
    })),
    {
      lang: 'x-default' as const,
      href: getHarnessRedirectHref(defaultLang, redirectId),
    },
  ];
}
