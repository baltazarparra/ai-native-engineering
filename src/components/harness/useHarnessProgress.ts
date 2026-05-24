import { useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import {
  EMPTY_HARNESS_PROGRESS,
  HARNESS_PROGRESS_STORAGE_KEY,
  markHarnessChapterComplete,
  resetHarnessProgress,
  type HarnessProgressState,
} from '../../lib/harness-progress';
import type { HarnessChapterId } from '../../data/harness-chapters';

export function useHarnessProgress() {
  const [progress, setProgress] = useLocalStorage<HarnessProgressState>(
    HARNESS_PROGRESS_STORAGE_KEY,
    EMPTY_HARNESS_PROGRESS,
  );

  const markComplete = useCallback(
    (chapterId: HarnessChapterId) => {
      setProgress((prev) => markHarnessChapterComplete(prev, chapterId));
    },
    [setProgress],
  );

  const reset = useCallback(() => {
    setProgress(resetHarnessProgress());
  }, [setProgress]);

  return { progress, markComplete, reset };
}
