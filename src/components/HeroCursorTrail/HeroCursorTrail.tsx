import { useEffect, useRef } from 'react';
import styles from './HeroCursorTrail.module.css';

interface Chunk {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  born: number;
}

const CHUNK_LIFETIME = 600;
const SPAWN_INTERVAL = 18;
const MOBILE_BREAKPOINT = 640;

export default function HeroCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`,
    ).matches;
    if (isMobile) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let colors: string[] = [];
    const readColors = () => {
      const styleMap = getComputedStyle(document.documentElement);
      colors = [
        styleMap.getPropertyValue('--color-accent-1').trim() || '#f5c518',
        styleMap.getPropertyValue('--color-accent-2').trim() || '#2952e8',
        styleMap.getPropertyValue('--color-accent-3').trim() || '#00b34a',
        styleMap.getPropertyValue('--color-accent-4').trim() || '#ff5c5c',
      ];
    };

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const chunks: Chunk[] = [];
    let colorIndex = 0;
    let lastSpawnAt = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;
    let active = false;
    let rafId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    const spawnChunk = (now: number) => {
      const size = 8 + Math.random() * 6;
      const rotation = (Math.random() - 0.5) * 0.6;
      const color = colors[colorIndex % colors.length];
      colorIndex += 1;
      chunks.push({
        x: pointerX + (Math.random() - 0.5) * 6,
        y: pointerY + (Math.random() - 0.5) * 6,
        size,
        rotation,
        color,
        born: now,
      });
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (pointerActive && t - lastSpawnAt >= SPAWN_INTERVAL) {
        spawnChunk(t);
        lastSpawnAt = t;
      }

      for (let i = chunks.length - 1; i >= 0; i -= 1) {
        const c = chunks[i];
        const age = t - c.born;
        if (age >= CHUNK_LIFETIME) {
          chunks.splice(i, 1);
          continue;
        }
        const lifeRatio = age / CHUNK_LIFETIME;
        const currentSize = c.size * (1 - lifeRatio);
        const half = currentSize / 2;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.fillStyle = c.color;
        ctx.fillRect(-half, -half, currentSize, currentSize);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#000';
        ctx.strokeRect(-half, -half, currentSize, currentSize);
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    };

    const activate = () => {
      if (active) return;
      active = true;
      readColors();
      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      window.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('blur', handlePointerLeave);
      rafId = requestAnimationFrame(tick);
    };

    const handleUnlock = () => {
      activate();
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener('hero-trail-unlocked', handleUnlock, {
      once: true,
    });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('hero-trail-unlocked', handleUnlock);
      window.removeEventListener('resize', handleResize);
      if (active) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('blur', handlePointerLeave);
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}
