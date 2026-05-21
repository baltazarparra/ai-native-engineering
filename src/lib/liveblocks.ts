import { LiveMap, LiveObject } from '@liveblocks/client';

export type StickerSync = {
  x: number;
  y: number;
  rotate: number;
  owner: string | null;
};

export type Presence = {
  cursor: { x: number; y: number } | null;
  color: string;
};

export type Storage = {
  stickers: LiveMap<string, LiveObject<StickerSync>>;
};

declare global {
  interface Liveblocks {
    Presence: Presence;
    Storage: Storage;
  }
}

const rawKey =
  (import.meta.env.PUBLIC_LIVEBLOCKS_KEY as string | undefined) ?? '';
export const liveblocksPublicKey = rawKey.trim();
export const liveblocksEnabled = liveblocksPublicKey.length > 0;

export const CURSOR_COLORS = [
  'var(--color-accent-1)',
  'var(--color-accent-2)',
  'var(--color-accent-3)',
  'var(--color-accent-4)',
] as const;

export function pickCursorColor(connectionId: number): string {
  return CURSOR_COLORS[connectionId % CURSOR_COLORS.length];
}

export { LiveMap, LiveObject };
