import { useCallback, useSyncExternalStore } from 'react';
import type { Lang } from '../../lib/i18n';
import { ui } from '../../lib/i18n';
import {
  applyTheme,
  commitThemeWithTransition,
  getThemeFromDocument,
  isTheme,
  themeStorageKey,
  type Theme,
} from '../../lib/theme';
import styles from './ThemeToggle.module.css';

interface Props {
  lang: Lang;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== themeStorageKey || !isTheme(e.newValue)) return;
    applyTheme(e.newValue);
    onChange();
  };

  const onCustom = () => onChange();

  window.addEventListener('storage', onStorage);
  document.documentElement.addEventListener('data-ai-theme', onCustom);
  return () => {
    window.removeEventListener('storage', onStorage);
    document.documentElement.removeEventListener('data-ai-theme', onCustom);
  };
}

function getSnapshot() {
  return getThemeFromDocument() === 'dark';
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({ lang }: Props) {
  const labels = ui[lang].themeToggle;
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const persistAndApply = useCallback((theme: Theme) => {
    commitThemeWithTransition(() => {
      applyTheme(theme);
    });
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
      /* ignore */
    }
    document.documentElement.dispatchEvent(new Event('data-ai-theme'));
  }, []);

  const onToggle = useCallback(() => {
    const next: Theme = isDark ? 'light' : 'dark';
    persistAndApply(next);
  }, [isDark, persistAndApply]);

  return (
    <nav className={styles.wrap} aria-label={labels.navLabel}>
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={isDark}
        aria-label={isDark ? labels.activateLight : labels.activateDark}
        onClick={onToggle}
      >
        <span className={styles.iconSlot} aria-hidden>
          <svg
            className={`${styles.icon} ${styles.sun}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
          <svg
            className={`${styles.icon} ${styles.moon}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.2 16.1a7.5 7.5 0 01-8.7-10.5 6 6 0 0010.3 8.2l.4.3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
}
