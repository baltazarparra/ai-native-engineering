import { HARNESS_CHAPTERS } from '../../data/harness-chapters';
import type { HarnessChapterId } from '../../data/harness-chapters';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import styles from './HarnessChapterIntro.module.css';

interface Props {
  lang: Lang;
  chapterId: HarnessChapterId;
}

export default function HarnessChapterIntro({ lang, chapterId }: Props) {
  const chapter = HARNESS_CHAPTERS.find((ch) => ch.id === chapterId);
  if (!chapter) return null;

  const labels = ui[lang].harness;

  return (
    <div className={styles.container}>
      <aside className={styles.frame} aria-label={labels.lessonIntro}>
        <p className={styles.kicker}>{labels.lessonIntro}</p>
        <p className={styles.question}>{chapter.learningQuestion[lang]}</p>
        <ul className={styles.list}>
          {chapter.learningObjectives[lang].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
