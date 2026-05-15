import { animate } from 'motion/react';

let target: HTMLElement | null = null;
let currentMagnitude = 0;
let activeAnimation: ReturnType<typeof animate> | null = null;

export function getShakeTarget(): HTMLElement | null {
  if (target && target.isConnected) return target;
  if (typeof document === 'undefined') return null;
  target = document.querySelector<HTMLElement>('[data-screen-shake]');
  return target;
}

export interface ShakeOpts {
  strength: number;
  nx: number;
  ny: number;
  reducedMotion: boolean;
}

export function triggerShake({
  strength,
  nx,
  ny,
  reducedMotion,
}: ShakeOpts): void {
  if (reducedMotion) return;
  const el = getShakeTarget();
  if (!el) return;

  const s = Math.max(0.22, Math.min(1, strength / 1800));
  if (s <= currentMagnitude * 0.9) return;
  currentMagnitude = s;

  const tx = nx * 7 * s;
  const ty = ny * 7 * s;
  const rot = (nx * ny >= 0 ? 1 : -1) * 1.1 * s;

  if (activeAnimation) {
    activeAnimation.stop();
  }
  el.style.willChange = 'transform';

  activeAnimation = animate(
    el,
    {
      x: [0, tx, 0],
      y: [0, ty, 0],
      rotate: [0, rot, 0],
    },
    {
      duration: 0.32,
      times: [0, 0.28, 1],
      ease: ['easeOut', 'easeOut'],
    },
  );

  activeAnimation.then(() => {
    el.style.willChange = '';
    currentMagnitude = 0;
    activeAnimation = null;
  });
}
