import type { Lang } from '../../lib/i18n';
import type { HarnessChapterId } from '../../data/harness-chapters';

import FundamentalsPt from './content/pt/fundamentals.astro';
import AnatomyPt from './content/pt/anatomy.astro';
import MaturityPt from './content/pt/maturity.astro';
import GovernancePt from './content/pt/governance.astro';
import EngineerPt from './content/pt/engineer.astro';
import ConclusionPt from './content/pt/conclusion.astro';

import FundamentalsEn from './content/en/fundamentals.astro';
import AnatomyEn from './content/en/anatomy.astro';
import MaturityEn from './content/en/maturity.astro';
import GovernanceEn from './content/en/governance.astro';
import EngineerEn from './content/en/engineer.astro';
import ConclusionEn from './content/en/conclusion.astro';

const chapterContent: Record<Lang, Record<HarnessChapterId, typeof FundamentalsPt>> = {
  'pt-BR': {
    fundamentals: FundamentalsPt,
    anatomy: AnatomyPt,
    maturity: MaturityPt,
    governance: GovernancePt,
    engineer: EngineerPt,
    conclusion: ConclusionPt,
  },
  en: {
    fundamentals: FundamentalsEn,
    anatomy: AnatomyEn,
    maturity: MaturityEn,
    governance: GovernanceEn,
    engineer: EngineerEn,
    conclusion: ConclusionEn,
  },
};

export function getHarnessChapterContent(lang: Lang, chapterId: HarnessChapterId) {
  return chapterContent[lang][chapterId];
}
