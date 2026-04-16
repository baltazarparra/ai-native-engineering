import { useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import {
  CHAPTERS,
  TRACKABLE_CHAPTERS,
  getChapterHref,
} from '../../data/chapters';
import type { Lang } from '../../lib/i18n';
import { ui, getProjectHref } from '../../lib/i18n';
import styles from './ChapterFooter.module.css';

interface Props {
  chapterNumber: number;
  lang: Lang;
}

export default function ChapterFooter({ chapterNumber, lang }: Props) {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    'ai-native-project-checkpoints',
    {},
  );
  const labels = ui[lang].chapters;

  const chapter = CHAPTERS.find((ch) => ch.number === chapterNumber);
  if (!chapter) return null;

  const checkpoints = chapter.checkpoints;
  const isReference = chapter.isReference;
  const doneCount = checkpoints.filter((cp) => checked[cp.id]).length;
  const allComplete =
    checkpoints.length > 0 && doneCount === checkpoints.length;

  const nextChapter = CHAPTERS.find(
    (ch) => ch.number === chapterNumber + 1 && !ch.isReference,
  );

  const isProjectComplete = TRACKABLE_CHAPTERS.every((ch) =>
    ch.checkpoints.every((cp) => checked[cp.id]),
  );

  const toggleCheck = useCallback(
    (checkpointId: string) => {
      setChecked((prev) => ({
        ...prev,
        [checkpointId]: !prev[checkpointId],
      }));
    },
    [setChecked],
  );

  if (isReference) {
    return (
      <div className={styles.container}>
        <a href={getProjectHref(lang)} className={styles.overviewLink}>
          &larr; {labels.backToOverview}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!allComplete && (
        <div className={styles.checkpointCard}>
          <div className={styles.checkpointHeader}>
            <h4 className={styles.checkpointTitle}>
              {labels.chapterLabel(chapterNumber)}
            </h4>
            <span className={styles.checkpointCount}>
              {labels.checkpointsOf(doneCount, checkpoints.length)}
            </span>
          </div>
          <div className={styles.checkpoints}>
            {checkpoints.map((cp) => (
              <label key={cp.id} className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={!!checked[cp.id]}
                  onChange={() => toggleCheck(cp.id)}
                  className={styles.checkbox}
                />
                <span className={checked[cp.id] ? styles.checkedText : ''}>
                  {cp.text[lang]}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {allComplete && !isProjectComplete && nextChapter && (
        <div className={styles.completeCard}>
          <span className={styles.completeIcon}>✓</span>
          <h4 className={styles.completeTitle}>{labels.complete}</h4>
          <a
            href={getChapterHref(nextChapter.number, lang)}
            className={styles.nextBtn}
          >
            {labels.nextUp}: {nextChapter.title[lang]} &rarr;
          </a>
        </div>
      )}

      {allComplete && !nextChapter && !isProjectComplete && (
        <div className={styles.completeCard}>
          <span className={styles.completeIcon}>✓</span>
          <h4 className={styles.completeTitle}>{labels.complete}</h4>
          <a href={getProjectHref(lang)} className={styles.nextBtn}>
            {labels.backToOverview}
          </a>
        </div>
      )}

      {isProjectComplete && chapterNumber === 4 && (
        <div className={styles.congratsCard}>
          <span className={styles.congratsIcon}>🎉</span>
          <h4 className={styles.congratsTitle}>{labels.congrats}</h4>
          <p className={styles.congratsDesc}>{labels.congratsDesc}</p>
          <a href={getProjectHref(lang)} className={styles.overviewLink}>
            &larr; {labels.backToOverview}
          </a>
        </div>
      )}

      {!allComplete && (
        <a href={getProjectHref(lang)} className={styles.overviewLink}>
          &larr; {labels.backToOverview}
        </a>
      )}
    </div>
  );
}
