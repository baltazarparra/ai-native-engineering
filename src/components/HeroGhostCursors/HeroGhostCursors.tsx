import { useEffect, useRef } from 'react';
import styles from './HeroGhostCursors.module.css';

interface Ghost {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
  maxSpeed: number;
  wanderFreqX: number;
  wanderFreqY: number;
  wanderAmp: number;
  pauseDuration: number;
  pauseInterval: number;
  nextPauseAt: number;
  pauseUntil: number;
  captured: boolean;
}

const DESKTOP_COUNT = 6;
const MOBILE_COUNT = 3;
const MOBILE_BREAKPOINT = 640;
const MAGNETIC_RADIUS = 180;
const CAPTURE_RADIUS = 28;
const CAPTURE_RADIUS_SQ = CAPTURE_RADIUS * CAPTURE_RADIUS;
const RELEASE_RADIUS = 240;
const RELEASE_RADIUS_SQ = RELEASE_RADIUS * RELEASE_RADIUS;
const DAMPING = 0.96;
const PAUSE_DAMPING = 0.75;
const BOUNCE = -0.6;

function rand01(seed: number, offset: number): number {
  const v = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

function createGhosts(count: number, width: number, height: number): Ghost[] {
  const ghosts: Ghost[] = [];
  const now = typeof performance !== 'undefined' ? performance.now() : 0;
  for (let i = 0; i < count; i += 1) {
    const seed = i * 1.618 + 0.31;
    const maxSpeed = 0.6 + rand01(seed, 1) * 1.2;
    const wanderFreqX = 0.00018 + rand01(seed, 2) * (0.0006 - 0.00018);
    const wanderFreqY = 0.00018 + rand01(seed, 3) * (0.0006 - 0.00018);
    const wanderAmp = 0.012 + rand01(seed, 4) * (0.035 - 0.012);
    const pauseDuration = 700 + rand01(seed, 5) * (2400 - 700);
    const pauseInterval = 3500 + rand01(seed, 6) * (11000 - 3500);
    const startOffset = rand01(seed, 7) * pauseInterval;
    ghosts.push({
      x: width * (0.15 + 0.7 * ((i * 0.37) % 1)),
      y: height * (0.2 + 0.6 * ((i * 0.51) % 1)),
      vx: Math.sin(seed) * 0.4,
      vy: Math.cos(seed * 1.3) * 0.4,
      seed,
      maxSpeed,
      wanderFreqX,
      wanderFreqY,
      wanderAmp,
      pauseDuration,
      pauseInterval,
      nextPauseAt: now + 1500 + startOffset,
      pauseUntil: 0,
      captured: false,
    });
  }
  return ghosts;
}

export default function HeroGhostCursors() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT}px)`,
    ).matches;
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

    let width = layer.clientWidth;
    let height = layer.clientHeight;
    if (width <= 0 || height <= 0) return;

    const ghosts = createGhosts(count, width, height);

    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    let captureCount = 0;
    let trailUnlocked = false;

    const applyTransforms = () => {
      for (let i = 0; i < ghosts.length; i += 1) {
        const node = nodesRef.current[i];
        if (!node) continue;
        const g = ghosts[i];
        node.style.transform = `translate3d(${g.x}px, ${g.y}px, 0)`;
      }
    };

    const captureGhost = (i: number) => {
      const g = ghosts[i];
      if (g.captured) return;
      g.captured = true;
      const node = nodesRef.current[i];
      if (node) node.classList.add(styles.captured);
      captureCount += 1;
      window.dispatchEvent(
        new CustomEvent('hero-ghost-captured', {
          detail: { count: captureCount },
        }),
      );
      if (!trailUnlocked && captureCount >= DESKTOP_COUNT) {
        trailUnlocked = true;
        window.dispatchEvent(new CustomEvent('hero-trail-unlocked'));
      }
    };

    const releaseGhost = (i: number) => {
      const g = ghosts[i];
      if (!g.captured) return;
      g.captured = false;
      const node = nodesRef.current[i];
      if (node) node.classList.remove(styles.captured);
      captureCount = Math.max(0, captureCount - 1);
      window.dispatchEvent(
        new CustomEvent('hero-ghost-released', {
          detail: { count: captureCount },
        }),
      );
    };

    applyTransforms();

    let rafId = 0;
    let running = false;

    const tick = (t: number) => {
      for (let i = 0; i < ghosts.length; i += 1) {
        const g = ghosts[i];

        if (!isMobile && mouseActive && !g.captured) {
          const dx = mouseX - g.x;
          const dy = mouseY - g.y;
          if (dx * dx + dy * dy < CAPTURE_RADIUS_SQ) {
            captureGhost(i);
          }
        } else if (!isMobile && g.captured) {
          const dx = mouseX - g.x;
          const dy = mouseY - g.y;
          if (dx * dx + dy * dy > RELEASE_RADIUS_SQ) {
            releaseGhost(i);
          }
        }

        const isPaused = t < g.pauseUntil;

        if (!isPaused && t >= g.nextPauseAt) {
          g.pauseUntil = t + g.pauseDuration;
          g.nextPauseAt = t + g.pauseDuration + g.pauseInterval;
        }

        if (isPaused) {
          g.vx *= PAUSE_DAMPING;
          g.vy *= PAUSE_DAMPING;
        } else {
          g.vx += Math.sin(t * g.wanderFreqX + g.seed) * g.wanderAmp;
          g.vy += Math.cos(t * g.wanderFreqY + g.seed * 1.7) * g.wanderAmp;

          if (mouseActive) {
            const dx = mouseX - g.x;
            const dy = mouseY - g.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < MAGNETIC_RADIUS * MAGNETIC_RADIUS && d2 > 100) {
              const d = Math.sqrt(d2);
              const f = 0.06 / d;
              g.vx += dx * f;
              g.vy += dy * f;
            }
          }
        }

        g.vx *= DAMPING;
        g.vy *= DAMPING;

        const sp = Math.hypot(g.vx, g.vy);
        if (sp > g.maxSpeed) {
          g.vx *= g.maxSpeed / sp;
          g.vy *= g.maxSpeed / sp;
        }

        g.x += g.vx;
        g.y += g.vy;

        if (g.x < 0) {
          g.x = 0;
          g.vx *= BOUNCE;
        } else if (g.x > width) {
          g.x = width;
          g.vx *= BOUNCE;
        }
        if (g.y < 0) {
          g.y = 0;
          g.vy *= BOUNCE;
        } else if (g.y > height) {
          g.y = height;
          g.vy *= BOUNCE;
        }
      }
      applyTransforms();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = layer.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (insideX && insideY) {
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
        mouseActive = true;
      } else {
        mouseActive = false;
      }
    };

    const handlePointerLeave = () => {
      mouseActive = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = layer.clientWidth;
      const newHeight = layer.clientHeight;
      if (newWidth <= 0 || newHeight <= 0) return;
      const scaleX = newWidth / width;
      const scaleY = newHeight / height;
      for (const g of ghosts) {
        g.x = Math.min(Math.max(g.x * scaleX, 0), newWidth);
        g.y = Math.min(Math.max(g.y * scaleY, 0), newHeight);
      }
      width = newWidth;
      height = newHeight;
    });
    resizeObserver.observe(layer);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
          } else {
            stop();
          }
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(layer);

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const maxCount = DESKTOP_COUNT;

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      {Array.from({ length: maxCount }).map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            nodesRef.current[index] = node;
          }}
          className={`${styles.ghost} ${index >= MOBILE_COUNT ? styles.desktopOnly : ''}`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3 2 L3 18 L7.5 14 L10.5 20.5 L13.5 19.5 L10.5 13 L17 13 Z"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
