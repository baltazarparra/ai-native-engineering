import { HARNESS_SERIES, HARNESS_CHAPTERS, getHarnessChapterHref } from '../../data/harness-chapters';
import { getHarnessHref } from '../../lib/i18n';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import { isHarnessChapterComplete } from '../../lib/harness-progress';
import type { HarnessChapterId } from '../../data/harness-chapters';
import { useHarnessProgress } from './useHarnessProgress';
import styles from './HarnessChapterTabs.module.css';

interface Props {
  lang: Lang;
  activeTab: 'overview' | HarnessChapterId;
}

export default function HarnessChapterTabs({ lang, activeTab }: Props) {
  const { progress } = useHarnessProgress();
  const overviewHref = getHarnessHref(lang);

  return (
    <nav className={styles.bar} aria-label={HARNESS_SERIES.tabsAria[lang]}>
      <div className={styles.scroll}>
        <a
          href={overviewHref}
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          aria-current={activeTab === 'overview' ? 'page' : undefined}
        >
          {HARNESS_SERIES.overviewTab[lang]}
        </a>
        {HARNESS_CHAPTERS.map((chapter) => {
          const isConclusion = chapter.id === 'conclusion';
          const isDone = isHarnessChapterComplete(progress, chapter.id);
          const label = isConclusion
            ? chapter.tabLabel[lang]
            : `${HARNESS_SERIES.chapterTabPrefix[lang]} ${chapter.number} · ${chapter.tabLabel[lang]}`;
          const completeSuffix = isDone
            ? ` (${ui[lang].harness.tabCompleteLabel})`
            : '';

          return (
            <a
              key={chapter.id}
              href={getHarnessChapterHref(lang, chapter.id)}
              className={`${styles.tab} ${activeTab === chapter.id ? styles.tabActive : ''} ${isDone ? styles.tabDone : ''}`}
              aria-current={activeTab === chapter.id ? 'page' : undefined}
              aria-label={`${label}${completeSuffix}`}
            >
              {isDone && <span className={styles.tabCheck} aria-hidden="true">✓</span>}
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
