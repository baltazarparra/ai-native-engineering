import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import styles from './ProgressTracker.module.css';

interface Props {
  sessionSlug: string;
  ariaLabel: string;
}

export default function ProgressTracker({ sessionSlug, ariaLabel }: Props) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useLocalStorage<Record<string, boolean>>(
    'ai-native-completed-sessions',
    {},
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
    setProgress(pct);

    if (pct >= 90 && !completed[sessionSlug]) {
      setCompleted((prev) => ({ ...prev, [sessionSlug]: true }));
    }
  }, [sessionSlug, completed, setCompleted]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={styles.bar}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  );
}
