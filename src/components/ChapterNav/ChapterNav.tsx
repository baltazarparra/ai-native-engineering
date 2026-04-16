import { useLocalStorage } from '../../lib/useLocalStorage';
import {
  CHAPTERS,
  TRACKABLE_CHAPTERS,
  getChapterHref,
} from '../../data/chapters';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import styles from './ChapterNav.module.css';

interface Props {
  currentChapter: number;
  lang: Lang;
}

export default function ChapterNav({ currentChapter, lang }: Props) {
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

  return (
    <nav className={styles.nav} aria-label={labels.navAriaLabel}>
      <div className={styles.progress}>
        {labels.progressOf(doneCount, TRACKABLE_CHAPTERS.length)}
      </div>
      <ul className={styles.list}>
        {CHAPTERS.map((ch) => {
          const isCurrent = ch.number === currentChapter;
          const isDone = isChapterComplete(ch.number);
          return (
            <li key={ch.id}>
              <a
                href={getChapterHref(ch.number, lang)}
                className={`${styles.link} ${isCurrent ? styles.linkCurrent : ''} ${isDone ? styles.linkDone : ''}`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className={styles.number}>
                  {isDone ? '✓' : ch.isReference ? '?' : ch.number}
                </span>
                <span className={styles.title}>
                  {ch.title[lang]}
                  {ch.isReference && (
                    <span className={styles.refBadge}>{labels.reference}</span>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
