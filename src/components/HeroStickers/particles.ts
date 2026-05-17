interface Chunk {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  color: string;
  born: number;
  lifetime: number;
}

interface ImpactLine {
  x: number;
  y: number;
  angle: number;
  length: number;
  born: number;
  lifetime: number;
}

const CHUNK_LIFETIME_MS = 520;
const LINE_LIFETIME_MS = 240;
const LINE_GROW_MS = 80;
const GRAVITY = 260;
const MIN_CHUNKS = 6;
const MAX_CHUNKS = 14;
const MIN_LINES = 4;
const MAX_LINES = 8;
const STRENGTH_DIVISOR = 220;

let canvasEl: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let dpr = 1;
let colors: string[] = [];
const chunks: Chunk[] = [];
const lines: ImpactLine[] = [];
let rafId = 0;
let running = false;
let lastTickMs = 0;

function readColors(): void {
  if (typeof document === 'undefined') return;
  const styleMap = getComputedStyle(document.documentElement);
  colors = [
    styleMap.getPropertyValue('--color-accent-1').trim() || '#f5c518',
    styleMap.getPropertyValue('--color-accent-2').trim() || '#2952e8',
    styleMap.getPropertyValue('--color-accent-3').trim() || '#00b34a',
    styleMap.getPropertyValue('--color-accent-4').trim() || '#ff5c5c',
  ];
}

function resize(): void {
  if (!canvasEl || !ctx) return;
  dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvasEl.width = Math.max(1, Math.floor(width * dpr));
  canvasEl.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function tick(now: number): void {
  if (!ctx) return;
  const dt = lastTickMs === 0 ? 0 : (now - lastTickMs) / 1000;
  lastTickMs = now;

  ctx.clearRect(0, 0, width, height);

  for (let i = chunks.length - 1; i >= 0; i -= 1) {
    const c = chunks[i];
    const age = now - c.born;
    if (age >= c.lifetime) {
      chunks.splice(i, 1);
      continue;
    }
    c.vy += GRAVITY * dt;
    c.x += c.vx * dt;
    c.y += c.vy * dt;
    c.rotation += c.vr * dt;

    const lifeRatio = age / c.lifetime;
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

  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const ln = lines[i];
    const age = now - ln.born;
    if (age >= ln.lifetime) {
      lines.splice(i, 1);
      continue;
    }
    const grow = clamp(age / LINE_GROW_MS, 0, 1);
    const fade = clamp(1 - age / ln.lifetime, 0, 1);
    const innerOffset = 4;
    const outerOffset = innerOffset + ln.length * grow;
    const cosA = Math.cos(ln.angle);
    const sinA = Math.sin(ln.angle);
    const x1 = ln.x + cosA * innerOffset;
    const y1 = ln.y + sinA * innerOffset;
    const x2 = ln.x + cosA * outerOffset;
    const y2 = ln.y + sinA * outerOffset;

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  if (chunks.length === 0 && lines.length === 0) {
    running = false;
    rafId = 0;
    lastTickMs = 0;
    return;
  }

  rafId = requestAnimationFrame(tick);
}

function ensureLoop(): void {
  if (running) return;
  running = true;
  lastTickMs = 0;
  rafId = requestAnimationFrame(tick);
}

export function mountImpactParticles(
  canvas: HTMLCanvasElement,
): () => void {
  canvasEl = canvas;
  ctx = canvas.getContext('2d');
  if (!ctx) {
    return () => {
      canvasEl = null;
    };
  }
  readColors();
  resize();

  const onWindowResize = () => resize();
  window.addEventListener('resize', onWindowResize, { passive: true });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    running = false;
    lastTickMs = 0;
    chunks.length = 0;
    lines.length = 0;
    window.removeEventListener('resize', onWindowResize);
    canvasEl = null;
    ctx = null;
  };
}

export interface SpawnOpts {
  x: number;
  y: number;
  strength: number;
  nx: number;
  ny: number;
  reducedMotion: boolean;
}

export function spawnImpactParticles({
  x,
  y,
  strength,
  nx,
  ny,
  reducedMotion,
}: SpawnOpts): void {
  if (reducedMotion) return;
  if (!canvasEl || !ctx) return;

  const intensity = clamp(strength / STRENGTH_DIVISOR, 0.4, 3);
  const chunkCount = Math.round(
    clamp(MIN_CHUNKS + intensity * 3, MIN_CHUNKS, MAX_CHUNKS),
  );
  const lineCount = Math.round(
    clamp(MIN_LINES + intensity * 1.5, MIN_LINES, MAX_LINES),
  );

  const now = performance.now();
  const baseSpeed = 140 + intensity * 90;
  const perpX = -ny;
  const perpY = nx;

  for (let i = 0; i < chunkCount; i += 1) {
    const direction = Math.random() < 0.5 ? 1 : -1;
    const normalComponent = (0.7 + Math.random() * 0.5) * direction;
    const perpComponent = (Math.random() - 0.5) * 0.9;
    const dirX = nx * normalComponent + perpX * perpComponent;
    const dirY = ny * normalComponent + perpY * perpComponent;
    const speed = baseSpeed * (0.7 + Math.random() * 0.7);
    const color = colors[Math.floor(Math.random() * colors.length)] || '#000';
    chunks.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: dirX * speed,
      vy: dirY * speed - 40,
      size: 8 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 8,
      color,
      born: now,
      lifetime: CHUNK_LIFETIME_MS,
    });
  }

  const angleStep = (Math.PI * 2) / lineCount;
  const jitter = 0.21;
  for (let i = 0; i < lineCount; i += 1) {
    const angle = i * angleStep + (Math.random() - 0.5) * jitter;
    lines.push({
      x,
      y,
      angle,
      length: 10 + intensity * 6 + Math.random() * 4,
      born: now,
      lifetime: LINE_LIFETIME_MS,
    });
  }

  ensureLoop();
}
