import { useEffect, useState } from 'react';
import styles from './HeroCaptureCounter.module.css';

interface CountEventDetail {
  count: number;
}

const TOTAL_PIPS = 6;
const PIP_COLORS = [
  'var(--color-accent-1)',
  'var(--color-accent-2)',
  'var(--color-accent-3)',
  'var(--color-accent-4)',
  'var(--color-accent-1)',
  'var(--color-accent-2)',
];

export default function HeroCaptureCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handle = (event: Event) => {
      const detail = (event as CustomEvent<CountEventDetail>).detail;
      if (!detail || typeof detail.count !== 'number') return;
      setCount(Math.max(0, Math.min(TOTAL_PIPS, detail.count)));
    };

    window.addEventListener('hero-ghost-captured', handle);
    window.addEventListener('hero-ghost-released', handle);
    return () => {
      window.removeEventListener('hero-ghost-captured', handle);
      window.removeEventListener('hero-ghost-released', handle);
    };
  }, []);

  return (
    <span
      className={styles.slot}
      role="status"
      aria-label={`${count} de ${TOTAL_PIPS} cursores capturados`}
    >
      {Array.from({ length: TOTAL_PIPS }).map((_, index) => {
        const filled = index < count;
        const className = filled ? `${styles.pip} ${styles.filled}` : styles.pip;
        return (
          <span
            key={index}
            className={className}
            style={{ ['--pip-color' as string]: PIP_COLORS[index] }}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}
