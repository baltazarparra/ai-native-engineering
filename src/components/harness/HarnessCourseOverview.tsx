import {
  HARNESS_CHAPTERS,
  getHarnessChapterHref,
} from '../../data/harness-chapters';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import {
  HARNESS_CHAPTER_COUNT,
  getHarnessCompletedCount,
  getNextIncompleteChapterId,
  isHarnessChapterComplete,
  isHarnessPathComplete,
} from '../../lib/harness-progress';
import { useHarnessProgress } from './useHarnessProgress';
import styles from './HarnessCourseOverview.module.css';

interface Props {
  lang: Lang;
}

const accentClass: Record<string, string> = {
  yellow: styles.accentYellow,
  blue: styles.accentBlue,
  green: styles.accentGreen,
  coral: styles.accentCoral,
};

export default function HarnessCourseOverview({ lang }: Props) {
  const { progress, reset } = useHarnessProgress();
  const labels = ui[lang].harness;
  const doneCount = getHarnessCompletedCount(progress);
  const pathComplete = isHarnessPathComplete(progress);
  const nextId = getNextIncompleteChapterId(progress);
  const progressPct = Math.round((doneCount / HARNESS_CHAPTER_COUNT) * 100);

  return (
    <section className={styles.container}>
      <div className={styles.progressRow}>
        <span className={styles.progressLabel}>
          {labels.progressOf(doneCount, HARNESS_CHAPTER_COUNT)}
        </span>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={HARNESS_CHAPTER_COUNT}
          aria-label={labels.courseProgressAria}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {pathComplete && (
        <div className={styles.completeBanner}>
          <h2 className={styles.completeTitle}>{labels.pathComplete}</h2>
          <p className={styles.completeDesc}>{labels.pathCompleteDesc}</p>
          <div className={styles.bannerActions}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={reset}
              aria-label={labels.resetAria}
            >
              {labels.resetProgress}
            </button>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {HARNESS_CHAPTERS.map((chapter) => {
          const isDone = isHarnessChapterComplete(progress, chapter.id);
          const isNext = chapter.id === nextId;
          const href = getHarnessChapterHref(lang, chapter.id);

          let ctaLabel = labels.start;
          if (isDone) {
            ctaLabel = labels.reviewChapter;
          } else if (isNext) {
            ctaLabel = doneCount === 0 ? labels.start : labels.continue;
          } else if (!isDone && doneCount > 0) {
            ctaLabel = labels.continue;
          }

          return (
            <article
              key={chapter.id}
              className={`${styles.card} ${isDone ? styles.cardDone : ''}`}
            >
              <div className={styles.cardHeader}>
                <span
                  className={`${styles.cardAccent} ${accentClass[chapter.badgeVariant]}`}
                >
                  {chapter.shortLabel[lang]}
                </span>
                {isDone && (
                  <span className={styles.doneBadge}>{labels.chapterRead}</span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{chapter.title[lang]}</h3>
              <p className={styles.pathRole}>{chapter.pathRole[lang]}</p>
              <p className={styles.cardDesc}>{chapter.description[lang]}</p>
              <a
                href={href}
                className={`${styles.cardCta} ${isDone ? styles.cardCtaDone : ''}`}
              >
                {ctaLabel} →
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
