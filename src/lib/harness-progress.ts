import {
  HARNESS_CHAPTERS,
  type HarnessChapterId,
} from '../data/harness-chapters';

export const HARNESS_PROGRESS_STORAGE_KEY = 'ai-native-harness-progress:v1';

export interface HarnessProgressState {
  completed: Partial<Record<HarnessChapterId, true>>;
  completedAt?: string;
}

export const EMPTY_HARNESS_PROGRESS: HarnessProgressState = {
  completed: {},
};

export const HARNESS_CHAPTER_COUNT = HARNESS_CHAPTERS.length;

export function isHarnessChapterComplete(
  state: HarnessProgressState,
  chapterId: HarnessChapterId,
): boolean {
  return Boolean(state.completed[chapterId]);
}

export function getHarnessCompletedCount(state: HarnessProgressState): number {
  return HARNESS_CHAPTERS.filter((ch) => state.completed[ch.id]).length;
}

export function isHarnessPathComplete(state: HarnessProgressState): boolean {
  return getHarnessCompletedCount(state) === HARNESS_CHAPTER_COUNT;
}

export function markHarnessChapterComplete(
  state: HarnessProgressState,
  chapterId: HarnessChapterId,
): HarnessProgressState {
  const next: HarnessProgressState = {
    ...state,
    completed: { ...state.completed, [chapterId]: true },
  };

  if (isHarnessPathComplete(next)) {
    next.completedAt = state.completedAt ?? new Date().toISOString();
  }

  return next;
}

export function resetHarnessProgress(): HarnessProgressState {
  return { ...EMPTY_HARNESS_PROGRESS };
}

export function getNextIncompleteChapterId(
  state: HarnessProgressState,
): HarnessChapterId | null {
  const next = HARNESS_CHAPTERS.find((ch) => !state.completed[ch.id]);
  return next?.id ?? null;
}

export function parseHarnessProgress(raw: unknown): HarnessProgressState {
  if (!raw || typeof raw !== 'object') {
    return { ...EMPTY_HARNESS_PROGRESS };
  }

  const value = raw as Partial<HarnessProgressState>;
  const completed: HarnessProgressState['completed'] = {};

  if (value.completed && typeof value.completed === 'object') {
    for (const chapter of HARNESS_CHAPTERS) {
      if (value.completed[chapter.id]) {
        completed[chapter.id] = true;
      }
    }
  }

  return {
    completed,
    completedAt:
      typeof value.completedAt === 'string' ? value.completedAt : undefined,
  };
}
