export const themeStorageKey = 'ai-native-engineering:theme';

export type Theme = 'light' | 'dark';

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark';
}

/** Sets `data-theme` on `<html>` (must run in browser). */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getThemeFromDocument(): Theme {
  const raw = document.documentElement.getAttribute('data-theme');
  return isTheme(raw) ? raw : 'light';
}

/**
 * Runs `commit` inside a View Transition when available. Falls back to a
 * direct call on unsupported browsers and when the user prefers reduced motion
 * (so page-level crossfades don't fight accessibility settings).
 */
export function commitThemeWithTransition(commit: () => void): void {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  type DocumentWithVT = Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };
  const docVT = document as DocumentWithVT;

  if (prefersReduced || typeof docVT.startViewTransition !== 'function') {
    commit();
    return;
  }

  docVT.startViewTransition(commit);
}
