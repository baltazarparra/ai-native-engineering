import { useMemo, type CSSProperties } from 'react';
import type { Lang } from '../../lib/i18n';
import { getHarnessHref, ui } from '../../lib/i18n';
import styles from './HarnessCourseCelebration.module.css';

interface Props {
  lang: Lang;
  animate?: boolean;
  onReset: () => void;
}

const PIXEL_COUNT = 24;

export default function HarnessCourseCelebration({
  lang,
  animate = true,
  onReset,
}: Props) {
  const labels = ui[lang].harness;
  const overviewHref = getHarnessHref(lang);

  const pixels = useMemo(
    () =>
      Array.from({ length: PIXEL_COUNT }, (_, i) => {
        const angle = (i / PIXEL_COUNT) * Math.PI * 2;
        const distance = 80 + (i % 5) * 28;
        return {
          id: i,
          left: `${50 + Math.cos(angle) * 8}%`,
          top: `${50 + Math.sin(angle) * 8}%`,
          style: {
            '--burst-x': `${Math.cos(angle) * distance}px`,
            '--burst-y': `${Math.sin(angle) * distance}px`,
            animationDelay: animate ? `${i * 40}ms` : '0ms',
          } as CSSProperties,
        };
      }),
    [animate],
  );

  return (
    <div className={styles.overlay} role="region" aria-labelledby="harness-celebration-title">
      {animate && (
        <div className={styles.burst} aria-hidden="true">
          {pixels.map((pixel) => (
            <span
              key={pixel.id}
              className={styles.pixel}
              style={{ left: pixel.left, top: pixel.top, ...pixel.style }}
            />
          ))}
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.scanlines} aria-hidden="true" />
        <p className={styles.stageLabel}>Stage Clear</p>
        <h2 id="harness-celebration-title" className={styles.title}>
          {labels.pathComplete}
        </h2>
        <p className={styles.subline}>{labels.pathCompleteSubline}</p>
        <p className={styles.desc}>{labels.pathCompleteDesc}</p>
        <div className={styles.actions}>
          <a href={overviewHref} className={styles.overviewLink}>
            {labels.backToOverview}
          </a>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onReset}
            aria-label={labels.resetAria}
          >
            {labels.resetProgress}
          </button>
        </div>
      </div>

      <p className={styles.liveRegion} role="status" aria-live="polite">
        {labels.pathComplete}. {labels.pathCompleteDesc}
      </p>
    </div>
  );
}
