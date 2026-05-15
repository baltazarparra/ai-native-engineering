import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
  type PanInfo,
} from 'motion/react';
import {
  LiveblocksProvider,
  RoomProvider,
  useMutation,
  useSelf,
  useStorage,
  useUpdateMyPresence,
} from '@liveblocks/react';
import styles from './HeroStickers.module.css';
import {
  applySpin,
  clamp,
  elasticExchange,
  fricFactor,
  resolveOverlap,
  wallBounce,
} from './physics';
import { initAudioOnGesture, pickFrequency, playImpact } from './sound';
import { triggerShake } from './shake';
import { mountImpactParticles, spawnImpactParticles } from './particles';
import {
  CURSOR_COLORS,
  LiveMap,
  LiveObject,
  liveblocksEnabled,
  liveblocksPublicKey,
  type Presence,
  type StickerSync,
} from '../../lib/liveblocks';
import RemoteCursors from './RemoteCursors';

type Lang = 'pt-BR' | 'en';

interface StickerSlot {
  left: number;
  top: number;
  rotate: number;
}

type StickerVisual =
  | { kind: 'emoji'; emoji: string }
  | { kind: 'asset'; src: string };

interface StickerDef {
  id: string;
  labels: Record<Lang, string>;
  visual: StickerVisual;
  desktopSlot: StickerSlot;
  mobileSlot?: StickerSlot;
  showOnMobile?: boolean;
  tone?: 'default';
}

const STICKERS: StickerDef[] = [
  {
    id: 'robot',
    labels: { 'pt-BR': 'robô', en: 'robot' },
    visual: { kind: 'emoji', emoji: '🤖' },
    desktopSlot: { left: 88, top: 15, rotate: -7 },
    mobileSlot: { left: 80, top: 16, rotate: -7 },
    showOnMobile: true,
  },
  {
    id: 'bulb',
    labels: { 'pt-BR': 'ideia', en: 'idea' },
    visual: { kind: 'emoji', emoji: '💡' },
    desktopSlot: { left: 72, top: 55, rotate: 6 },
    showOnMobile: false,
  },
  {
    id: 'bolt',
    labels: { 'pt-BR': 'raio', en: 'bolt' },
    visual: { kind: 'emoji', emoji: '⚡' },
    desktopSlot: { left: 92, top: 78, rotate: 4 },
    showOnMobile: false,
  },
  {
    id: 'brain',
    labels: { 'pt-BR': 'cérebro', en: 'brain' },
    visual: { kind: 'emoji', emoji: '🧠' },
    desktopSlot: { left: 62, top: 12, rotate: -5 },
    showOnMobile: false,
  },
  {
    id: 'sparkles',
    labels: { 'pt-BR': 'faíscas', en: 'sparkles' },
    visual: { kind: 'emoji', emoji: '✨' },
    desktopSlot: { left: 82, top: 40, rotate: 8 },
    mobileSlot: { left: 70, top: 42, rotate: 8 },
    showOnMobile: true,
  },
  {
    id: 'duck',
    labels: { 'pt-BR': 'pato', en: 'duck' },
    visual: { kind: 'emoji', emoji: '🦆' },
    desktopSlot: { left: 50, top: 24, rotate: -6 },
    mobileSlot: { left: 50, top: 18, rotate: -6 },
    showOnMobile: true,
  },
];

interface Props {
  lang?: Lang;
}

interface StickerPhysicsBody {
  id: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  vx: number;
  vy: number;
  vr: number;
  isDragging: boolean;
  lastX: number;
  lastY: number;
  basePx: number;
  basePy: number;
  baseRotate: number;
  radius: number;
  slotLeft: number;
  slotTop: number;
  wasDragging: boolean;
  ownerUntilMs: number;
  lastPublishMs: number;
}

interface SyncAPI {
  updateSticker: (id: string, patch: Partial<StickerSync>) => void;
  updateMyPresence: (patch: Partial<Presence>) => void;
  myId: string | null;
}

const PUBLISH_INTERVAL_MS = 50;
const CURSOR_PUBLISH_INTERVAL_MS = 33;
const OWNER_HOLD_AFTER_RELEASE_MS = 1500;
const OWNER_REFRESH_DRAG_MS = 5000;
const ROOM_ID = 'stickers-global-v1';

function makeInitialStorage(): { stickers: LiveMap<string, LiveObject<StickerSync>> } {
  return {
    stickers: new LiveMap(
      STICKERS.map(
        (def) =>
          [
            def.id,
            new LiveObject<StickerSync>({
              x: def.desktopSlot.left,
              y: def.desktopSlot.top,
              rotate: def.desktopSlot.rotate,
              owner: null,
            }),
          ] as const,
      ),
    ),
  };
}

const KEY_IMPULSE = 240;
const KEY_IMPULSE_BIG = 720;
const LINEAR_FRICTION = 0.94;
const ANGULAR_FRICTION = 0.92;
const WALL_RESTITUTION = 0.55;
const COLLISION_RESTITUTION = 0.85;
const SPIN_K = 0.6;
const MAX_VR = 720;
const IMPACT_THRESHOLD = 120;

interface RegisterArgs {
  id: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  slot: StickerSlot;
  radius: number;
}

interface StickerProps {
  def: StickerDef;
  lang: Lang;
  isMobile: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onActivate: () => void;
  topIndex: number;
  isTop: boolean;
  register: (args: RegisterArgs) => StickerPhysicsBody;
  unregister: (id: string) => void;
  clampPosition: (body: StickerPhysicsBody) => void;
}

function Sticker({
  def,
  lang,
  isMobile,
  containerRef,
  onActivate,
  topIndex,
  isTop,
  register,
  unregister,
  clampPosition,
}: StickerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const slot = isMobile ? (def.mobileSlot ?? def.desktopSlot) : def.desktopSlot;
  const rotate = useMotionValue(slot.rotate);
  const bodyRef = useRef<StickerPhysicsBody | null>(null);
  const radius = isMobile ? 38 : 30;

  useEffect(() => {
    bodyRef.current = register({
      id: def.id,
      x,
      y,
      rotate,
      slot,
      radius,
    });
    return () => {
      unregister(def.id);
      bodyRef.current = null;
    };
  }, [def.id, register, unregister, x, y, rotate, slot, radius]);

  const dragLabel =
    lang === 'pt-BR'
      ? `Sticker ${def.labels['pt-BR']}, arrastável`
      : `Sticker ${def.labels.en}, draggable`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const body = bodyRef.current;
    if (!body) return;
    const impulse = event.shiftKey ? KEY_IMPULSE_BIG : KEY_IMPULSE;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        body.vx -= impulse;
        onActivate();
        break;
      case 'ArrowRight':
        event.preventDefault();
        body.vx += impulse;
        onActivate();
        break;
      case 'ArrowUp':
        event.preventDefault();
        body.vy -= impulse;
        onActivate();
        break;
      case 'ArrowDown':
        event.preventDefault();
        body.vy += impulse;
        onActivate();
        break;
      default:
        break;
    }
  };

  const handleDragStart = () => {
    const body = bodyRef.current;
    if (!body) return;
    body.isDragging = true;
    body.vx = 0;
    body.vy = 0;
    body.vr = 0;
    body.lastX = x.get();
    body.lastY = y.get();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const body = bodyRef.current;
    if (!body) return;
    body.isDragging = false;
    body.vx = info.velocity.x;
    body.vy = info.velocity.y;
    clampPosition(body);
  };

  const handlePointerDown = () => {
    initAudioOnGesture();
    onActivate();
  };

  return (
    <motion.button
      type="button"
      className={styles.sticker}
      style={{
        left: `calc(${slot.left}% - var(--sticker-half))`,
        top: `calc(${slot.top}% - var(--sticker-half))`,
        rotate,
        x,
        y,
        zIndex: isTop ? 20 : 10 + topIndex,
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.04 }}
      whileDrag={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      onPointerDown={handlePointerDown}
      onFocus={onActivate}
      onKeyDown={handleKeyDown}
      aria-label={dragLabel}
    >
      {def.visual.kind === 'emoji' ? (
        <span className={styles.emoji} aria-hidden="true">
          {def.visual.emoji}
        </span>
      ) : (
        <img
          className={styles.asset}
          src={def.visual.src}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      )}
    </motion.button>
  );
}

interface BodyProps extends Props {
  sync?: SyncAPI;
  remoteStickers?: Readonly<Record<string, StickerSync>> | null;
}

function HeroStickersBody({
  lang = 'pt-BR',
  sync,
  remoteStickers = null,
}: BodyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [topId, setTopId] = useState<string | null>(null);
  const [orderMap, setOrderMap] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const bodiesRef = useRef<StickerPhysicsBody[]>([]);
  const boundsRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const lastCursorPublishMs = useRef(0);
  const myId = sync?.myId ?? null;
  const multiplayer = Boolean(sync);

  useEffect(() => {
    setMounted(true);
    const mqMobile = window.matchMedia('(max-width: 640px)');
    const updateMobile = () => setIsMobile(mqMobile.matches);
    updateMobile();
    mqMobile.addEventListener('change', updateMobile);

    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReduced = () => setReducedMotion(mqReduced.matches);
    updateReduced();
    mqReduced.addEventListener('change', updateReduced);

    return () => {
      mqMobile.removeEventListener('change', updateMobile);
      mqReduced.removeEventListener('change', updateReduced);
    };
  }, []);

  const refreshBounds = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    boundsRef.current = { width: rect.width, height: rect.height };
    bodiesRef.current.forEach((b) => {
      b.basePx = (b.slotLeft / 100) * rect.width;
      b.basePy = (b.slotTop / 100) * rect.height;
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    refreshBounds();
    const handle = () => refreshBounds();
    window.addEventListener('resize', handle, { passive: true });
    window.addEventListener('scroll', handle, { passive: true });
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle);
    };
  }, [mounted, isMobile, refreshBounds]);

  useEffect(() => {
    if (!mounted) return;
    const canvasEl = particlesCanvasRef.current;
    const containerEl = containerRef.current;
    if (!canvasEl || !containerEl) return;
    return mountImpactParticles(canvasEl, containerEl);
  }, [mounted]);

  useEffect(() => {
    if (!multiplayer || !remoteStickers) return;
    const bounds = boundsRef.current;
    if (!bounds.width || !bounds.height) return;
    const now = performance.now();
    for (const body of bodiesRef.current) {
      if (body.isDragging) continue;
      if (now < body.ownerUntilMs) continue;
      const remote = remoteStickers[body.id];
      if (!remote) continue;
      if (remote.owner && remote.owner === myId) continue;
      const targetX = (remote.x / 100) * bounds.width - body.basePx;
      const targetY = (remote.y / 100) * bounds.height - body.basePy;
      animate(body.x, targetX, { duration: 0.08, ease: 'linear' });
      animate(body.y, targetY, { duration: 0.08, ease: 'linear' });
      animate(body.rotate, remote.rotate, { duration: 0.08, ease: 'linear' });
      body.vx = 0;
      body.vy = 0;
      body.vr = 0;
    }
  }, [multiplayer, remoteStickers, myId]);

  useEffect(() => {
    if (!multiplayer || !sync) return;
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const handlePointerMove = (event: PointerEvent) => {
      const rect = containerEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const now = performance.now();
      if (now - lastCursorPublishMs.current < CURSOR_PUBLISH_INTERVAL_MS) return;
      lastCursorPublishMs.current = now;
      const xPct = ((event.clientX - rect.left) / rect.width) * 100;
      const yPct = ((event.clientY - rect.top) / rect.height) * 100;
      if (xPct < -5 || xPct > 105 || yPct < -5 || yPct > 105) {
        sync.updateMyPresence({ cursor: null });
        return;
      }
      sync.updateMyPresence({ cursor: { x: xPct, y: yPct } });
    };
    const handlePointerLeave = () => sync.updateMyPresence({ cursor: null });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, [multiplayer, sync]);

  const register = useCallback(
    ({ id, x, y, rotate, slot, radius }: RegisterArgs): StickerPhysicsBody => {
      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width ?? boundsRef.current.width;
      const height = rect?.height ?? boundsRef.current.height;
      const body: StickerPhysicsBody = {
        id,
        x,
        y,
        rotate,
        vx: 0,
        vy: 0,
        vr: 0,
        isDragging: false,
        lastX: 0,
        lastY: 0,
        basePx: (slot.left / 100) * width,
        basePy: (slot.top / 100) * height,
        baseRotate: slot.rotate,
        radius,
        slotLeft: slot.left,
        slotTop: slot.top,
        wasDragging: false,
        ownerUntilMs: 0,
        lastPublishMs: 0,
      };
      bodiesRef.current = [...bodiesRef.current, body];
      return body;
    },
    [],
  );

  const unregister = useCallback((id: string) => {
    bodiesRef.current = bodiesRef.current.filter((b) => b.id !== id);
  }, []);

  const clampPosition = useCallback((body: StickerPhysicsBody) => {
    const { width, height } = boundsRef.current;
    if (!width || !height) return;
    const cx = body.basePx + body.x.get();
    const cy = body.basePy + body.y.get();
    const minX = body.radius;
    const maxX = width - body.radius;
    const minY = body.radius;
    const maxY = height - body.radius;
    if (cx < minX) body.x.set(minX - body.basePx);
    else if (cx > maxX) body.x.set(maxX - body.basePx);
    if (cy < minY) body.y.set(minY - body.basePy);
    else if (cy > maxY) body.y.set(maxY - body.basePy);
  }, []);

  useAnimationFrame((_t, deltaMs) => {
    if (reducedMotion) return;
    const bodies = bodiesRef.current;
    if (bodies.length === 0) return;
    const bounds = boundsRef.current;
    if (!bounds.width || !bounds.height) return;

    const dt = Math.min(deltaMs / 1000, 1 / 30);
    if (dt <= 0) return;

    const linF = fricFactor(LINEAR_FRICTION, dt);
    const angF = fricFactor(ANGULAR_FRICTION, dt);

    for (const body of bodies) {
      const xv = body.x.get();
      const yv = body.y.get();
      if (body.isDragging) {
        body.vx = (xv - body.lastX) / dt;
        body.vy = (yv - body.lastY) / dt;
        body.lastX = xv;
        body.lastY = yv;
      } else {
        const nx = xv + body.vx * dt;
        const ny = yv + body.vy * dt;
        const bounced = wallBounce(
          { x: nx, y: ny, vx: body.vx, vy: body.vy },
          body.basePx,
          body.basePy,
          body.radius,
          bounds,
          WALL_RESTITUTION,
        );
        body.x.set(bounced.x);
        body.y.set(bounced.y);
        body.vx = bounced.vx * linF;
        body.vy = bounced.vy * linF;
        body.rotate.set(body.rotate.get() + body.vr * dt);
        body.vr *= angF;
      }
    }

    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) {
        const a = bodies[i];
        const b = bodies[j];
        const ax = a.basePx + a.x.get();
        const ay = a.basePy + a.y.get();
        const bx = b.basePx + b.x.get();
        const by = b.basePy + b.y.get();
        let dx = bx - ax;
        let dy = by - ay;
        let dist = Math.hypot(dx, dy);
        const minDist = a.radius + b.radius;
        if (dist >= minDist) continue;
        if (dist === 0) {
          dx = 1;
          dy = 0;
          dist = 1;
        }
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = minDist - dist;
        const res = resolveOverlap(
          nx,
          ny,
          overlap,
          a.isDragging,
          b.isDragging,
        );
        if (res.deltaAx || res.deltaAy) {
          a.x.set(a.x.get() + res.deltaAx);
          a.y.set(a.y.get() + res.deltaAy);
        }
        if (res.deltaBx || res.deltaBy) {
          b.x.set(b.x.get() + res.deltaBx);
          b.y.set(b.y.get() + res.deltaBy);
        }

        let impactStrength = 0;
        let vrelx = b.vx - a.vx;
        let vrely = b.vy - a.vy;
        const vn = vrelx * nx + vrely * ny;

        if (a.isDragging && !b.isDragging) {
          const dragSpeedN = a.vx * nx + a.vy * ny;
          if (dragSpeedN > 0) {
            b.vx = a.vx;
            b.vy = a.vy;
            impactStrength = Math.abs(dragSpeedN);
            vrelx = b.vx - a.vx;
            vrely = b.vy - a.vy;
          }
        } else if (b.isDragging && !a.isDragging) {
          const dragSpeedN = b.vx * nx + b.vy * ny;
          if (dragSpeedN < 0) {
            a.vx = b.vx;
            a.vy = b.vy;
            impactStrength = Math.abs(dragSpeedN);
            vrelx = b.vx - a.vx;
            vrely = b.vy - a.vy;
          }
        } else if (vn < 0) {
          const result = elasticExchange(
            a,
            b,
            nx,
            ny,
            COLLISION_RESTITUTION,
          );
          impactStrength = result.impulse;
        }

        applySpin(a, b, a.radius, b.radius, nx, ny, vrelx, vrely, SPIN_K, MAX_VR);

        if (impactStrength >= IMPACT_THRESHOLD) {
          const midX = (ax + bx) / 2;
          const midY = (ay + by) / 2;
          const panX = clamp((midX / bounds.width) * 2 - 1, -1, 1);
          const freq = pickFrequency(a.id, b.id);
          playImpact({ strength: impactStrength, panX, freq });
          triggerShake({
            strength: impactStrength,
            nx,
            ny,
            reducedMotion: false,
          });
          spawnImpactParticles({
            x: midX,
            y: midY,
            strength: impactStrength,
            nx,
            ny,
            reducedMotion,
          });
        }
      }
    }

    if (sync && myId) {
      const now = performance.now();
      for (const body of bodies) {
        if (body.isDragging) {
          body.ownerUntilMs = now + OWNER_REFRESH_DRAG_MS;
        } else if (body.wasDragging) {
          body.ownerUntilMs = now + OWNER_HOLD_AFTER_RELEASE_MS;
        }
        const isMoving =
          Math.abs(body.vx) > 1 ||
          Math.abs(body.vy) > 1 ||
          Math.abs(body.vr) > 1;
        if (
          !body.isDragging &&
          !body.wasDragging &&
          body.ownerUntilMs === 0 &&
          isMoving
        ) {
          body.ownerUntilMs = now + OWNER_HOLD_AFTER_RELEASE_MS;
        }
        const ownsNow = now < body.ownerUntilMs && (body.isDragging || isMoving);
        body.wasDragging = body.isDragging;

        if (ownsNow) {
          if (now - body.lastPublishMs >= PUBLISH_INTERVAL_MS) {
            const absX = body.basePx + body.x.get();
            const absY = body.basePy + body.y.get();
            sync.updateSticker(body.id, {
              x: (absX / bounds.width) * 100,
              y: (absY / bounds.height) * 100,
              rotate: body.rotate.get(),
              owner: myId,
            });
            body.lastPublishMs = now;
          }
        } else if (body.ownerUntilMs > 0) {
          const absX = body.basePx + body.x.get();
          const absY = body.basePy + body.y.get();
          sync.updateSticker(body.id, {
            x: (absX / bounds.width) * 100,
            y: (absY / bounds.height) * 100,
            rotate: body.rotate.get(),
            owner: null,
          });
          body.ownerUntilMs = 0;
          body.lastPublishMs = now;
        }
      }
    }
  });

  const visibleStickers = useMemo(
    () => (isMobile ? STICKERS.filter((def) => def.showOnMobile) : STICKERS),
    [isMobile],
  );

  const activate = (id: string) => {
    setTopId(id);
    setOrderMap((prev) => {
      const next = { ...prev };
      const max = Object.values(next).reduce((acc, v) => Math.max(acc, v), 0);
      next[id] = max + 1;
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className={styles.layer}
      aria-hidden={!mounted ? 'true' : undefined}
    >
      <canvas
        ref={particlesCanvasRef}
        className={styles.particles}
        aria-hidden="true"
      />
      {multiplayer && <RemoteCursors />}
      {mounted &&
        visibleStickers.map((def) => (
          <Sticker
            key={def.id}
            def={def}
            lang={lang}
            isMobile={isMobile}
            containerRef={containerRef}
            onActivate={() => activate(def.id)}
            topIndex={orderMap[def.id] || 0}
            isTop={topId === def.id}
            register={register}
            unregister={unregister}
            clampPosition={clampPosition}
          />
        ))}
    </div>
  );
}

function MultiplayerBridge({ lang }: Props) {
  const stickers = useStorage((root) => root.stickers);
  const self = useSelf();
  const updateMyPresence = useUpdateMyPresence();
  const updateSticker = useMutation(
    ({ storage }, id: string, patch: Partial<StickerSync>) => {
      const map = storage.get('stickers');
      const obj = map.get(id);
      if (obj) obj.update(patch);
    },
    [],
  );

  const myId = self ? String(self.connectionId) : null;

  const sync: SyncAPI = useMemo(
    () => ({
      updateSticker,
      updateMyPresence,
      myId,
    }),
    [updateSticker, updateMyPresence, myId],
  );

  return (
    <HeroStickersBody lang={lang} sync={sync} remoteStickers={stickers} />
  );
}

export default function HeroStickers({ lang = 'pt-BR' }: Props) {
  const [shouldUseMultiplayer, setShouldUseMultiplayer] = useState(false);
  const [myColor] = useState<string>(
    () => CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)],
  );

  useEffect(() => {
    if (!liveblocksEnabled) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldUseMultiplayer(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!shouldUseMultiplayer) {
    return <HeroStickersBody lang={lang} />;
  }

  return (
    <LiveblocksProvider publicApiKey={liveblocksPublicKey}>
      <RoomProvider
        id={ROOM_ID}
        initialPresence={{ cursor: null, color: myColor }}
        initialStorage={makeInitialStorage}
      >
        <MultiplayerBridge lang={lang} />
      </RoomProvider>
    </LiveblocksProvider>
  );
}
