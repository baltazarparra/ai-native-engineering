import { useState, useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import {
  CHAPTERS,
  TRACKABLE_CHAPTERS,
  getChapterHref,
} from '../../data/chapters';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import styles from './ChapterStepper.module.css';

interface Props {
  lang: Lang;
}

export default function ChapterStepper({ lang }: Props) {
  const [active, setActive] = useState(0);
  const [checked] = useLocalStorage<Record<string, boolean>>(
    'ai-native-project-checkpoints',
    {},
  );
  const labels = ui[lang].chapters;

  const isChapterComplete = (chapterNumber: number) => {
    const chapter = CHAPTERS.find((ch) => ch.number === chapterNumber);
    if (!chapter || chapter.checkpoints.length === 0) return false;
    return chapter.checkpoints.every((cp) => checked[cp.id]);
  };

  const doneCount = TRACKABLE_CHAPTERS.filter((ch) =>
    isChapterComplete(ch.number),
  ).length;

  const allComplete = doneCount === TRACKABLE_CHAPTERS.length;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((prev) => Math.min(prev + 1, CHAPTERS.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  const chapter = CHAPTERS[active];
  const chapterDone = isChapterComplete(chapter.number);
  const cpDone = chapter.checkpoints.filter((cp) => checked[cp.id]).length;

  return (
    <div className={styles.container}>
      <div className={styles.progressRow}>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={TRACKABLE_CHAPTERS.length}
        >
          <div
            className={styles.progressFill}
            style={{
              width: `${(doneCount / TRACKABLE_CHAPTERS.length) * 100}%`,
            }}
          />
        </div>
        <span className={styles.progressText}>
          {labels.progressOf(doneCount, TRACKABLE_CHAPTERS.length)}
        </span>
      </div>

      <div className={styles.stepperRow}>
        <button
          className={styles.navBtn}
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          aria-label={labels.previousAria}
        >
          &larr;
        </button>

        <div
          className={styles.steps}
          role="tablist"
          aria-label={labels.tabAria}
          onKeyDown={handleKeyDown}
        >
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              id={`ch-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls={`ch-panel-${i}`}
              aria-label={`${labels.chapterLabel(ch.number)}: ${ch.title[lang]}`}
              className={`${styles.step} ${i === active ? styles.stepActive : ''} ${isChapterComplete(ch.number) ? styles.stepDone : ''} ${ch.isReference ? styles.stepRef : ''}`}
              onClick={() => setActive(i)}
              tabIndex={i === active ? 0 : -1}
            >
              <span className={styles.stepCircle}>
                {isChapterComplete(ch.number)
                  ? '✓'
                  : ch.isReference
                    ? '?'
                    : ch.number}
              </span>
              <span className={styles.stepLabel}>{ch.shortLabel[lang]}</span>
            </button>
          ))}
        </div>

        <button
          className={styles.navBtn}
          onClick={() => setActive((p) => Math.min(p + 1, CHAPTERS.length - 1))}
          disabled={active === CHAPTERS.length - 1}
          aria-label={labels.nextAria}
        >
          &rarr;
        </button>
      </div>

      <div
        id={`ch-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`ch-tab-${active}`}
        className={styles.panel}
      >
        {allComplete && active === 0 ? (
          <div className={styles.congratsPanel}>
            <span className={styles.congratsIcon}>🎉</span>
            <h3 className={styles.congratsTitle}>{labels.congrats}</h3>
            <p className={styles.congratsDesc}>{labels.congratsDesc}</p>
          </div>
        ) : (
          <>
            <div className={styles.panelHeader}>
              <span className={styles.chapterBadge}>
                {chapter.isReference
                  ? labels.reference
                  : labels.chapterLabel(chapter.number)}
              </span>
              {chapterDone && (
                <span className={styles.doneBadge}>{labels.complete}</span>
              )}
            </div>
            <h3 className={styles.panelTitle}>{chapter.title[lang]}</h3>
            <p className={styles.panelDesc}>{chapter.description[lang]}</p>

            {chapter.checkpoints.length > 0 && !chapterDone && (
              <div className={styles.panelProgress}>
                {labels.checkpointsOf(cpDone, chapter.checkpoints.length)}
              </div>
            )}

            <a
              href={getChapterHref(chapter.number, lang)}
              className={styles.panelCta}
            >
              {chapterDone
                ? labels.chapterLabel(chapter.number)
                : cpDone > 0
                  ? labels.continueProject
                  : labels.goToChapter}
              {' →'}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
