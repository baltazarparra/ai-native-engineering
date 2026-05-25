import { useCallback, useState } from 'react';
import {
  getHarnessChapterNeighbors,
  resolveHarnessNavTarget,
  type HarnessChapterId,
} from '../../data/harness-chapters';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import {
  isHarnessChapterComplete,
  isHarnessPathComplete,
} from '../../lib/harness-progress';
import { useHarnessProgress } from './useHarnessProgress';
import HarnessCourseCelebration from './HarnessCourseCelebration';
import styles from './HarnessChapterPager.module.css';

interface Props {
  lang: Lang;
  chapterId: HarnessChapterId;
}

export default function HarnessChapterPager({ lang, chapterId }: Props) {
  const { progress, markComplete, reset } = useHarnessProgress();
  const labels = ui[lang].harness;
  const { prev, next } = getHarnessChapterNeighbors(chapterId);
  const prevLink = resolveHarnessNavTarget(lang, prev, 'prev', labels);
  const nextLink = next ? resolveHarnessNavTarget(lang, next, 'next', labels) : null;
  const isConclusion = chapterId === 'conclusion';
  const isCurrentDone = isHarnessChapterComplete(progress, chapterId);
  const pathComplete = isHarnessPathComplete(progress);
  const [justFinished, setJustFinished] = useState(false);

  const handleAdvance = useCallback(
    (href: string) => {
      markComplete(chapterId);
      window.location.href = href;
    },
    [chapterId, markComplete],
  );

  const handleFinishPath = useCallback(() => {
    markComplete('conclusion');
    setJustFinished(true);
  }, [markComplete]);

  const handleReset = useCallback(() => {
    reset();
    setJustFinished(false);
  }, [reset]);

  if (isConclusion && (pathComplete || justFinished)) {
    return (
      <div className={styles.pager}>
        <HarnessCourseCelebration
          lang={lang}
          animate={justFinished}
          onReset={handleReset}
        />
      </div>
    );
  }

  return (
    <nav className={styles.pager} aria-label={labels.pagerAria}>
      {isConclusion ? (
        <div className={styles.grid}>
          <a
            href={prevLink.href}
            className={`${styles.card} ${styles.cardPrev}`}
            data-astro-prefetch
          >
            <span className={styles.kicker}>&larr; {prevLink.kicker}</span>
            <span className={styles.title}>{prevLink.title}</span>
          </a>
          <button
            type="button"
            className={`${styles.card} ${styles.cardNext} ${styles.cardAction}`}
            onClick={handleFinishPath}
          >
            <span className={styles.kicker}>{labels.finishPath} &rarr;</span>
            <span className={styles.title}>{labels.pathComplete}</span>
          </button>
        </div>
      ) : (
        <div className={`${styles.grid} ${!nextLink ? styles.gridSingle : ''}`}>
          <a
            href={prevLink.href}
            className={`${styles.card} ${styles.cardPrev}`}
            data-astro-prefetch
          >
            <span className={styles.kicker}>&larr; {prevLink.kicker}</span>
            <span className={styles.title}>{prevLink.title}</span>
          </a>
          {nextLink && (
            <button
              type="button"
              className={`${styles.card} ${styles.cardNext} ${styles.cardAction}`}
              onClick={() => handleAdvance(nextLink.href)}
            >
              <span className={styles.kicker}>
                {isCurrentDone ? labels.next : labels.markReadAndContinue} &rarr;
              </span>
              <span className={styles.title}>{nextLink.title}</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
