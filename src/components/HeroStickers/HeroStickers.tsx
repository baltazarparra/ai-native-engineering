import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import styles from './HeroStickers.module.css';

type Lang = 'pt-BR' | 'en';

function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

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
  tone?: 'default' | 'rubberDuck';
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
    id: 'rubber-duck',
    labels: { 'pt-BR': 'pato de borracha', en: 'rubber duck' },
    visual: { kind: 'asset', src: withBase('stickers/rubber-duck.svg') },
    desktopSlot: { left: 50, top: 24, rotate: -6 },
    mobileSlot: { left: 50, top: 18, rotate: -6 },
    showOnMobile: true,
    tone: 'rubberDuck',
  },
];

interface Props {
  lang?: Lang;
}

interface StickerProps {
  def: StickerDef;
  lang: Lang;
  isMobile: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onActivate: () => void;
  topIndex: number;
  isTop: boolean;
}

function Sticker({
  def,
  lang,
  isMobile,
  containerRef,
  onActivate,
  topIndex,
  isTop,
}: StickerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const slot = isMobile ? def.mobileSlot ?? def.desktopSlot : def.desktopSlot;

  const dragLabel =
    lang === 'pt-BR'
      ? `Sticker ${def.labels['pt-BR']}, arrastável`
      : `Sticker ${def.labels.en}, draggable`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 32 : 8;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        x.set(x.get() - step);
        onActivate();
        break;
      case 'ArrowRight':
        event.preventDefault();
        x.set(x.get() + step);
        onActivate();
        break;
      case 'ArrowUp':
        event.preventDefault();
        y.set(y.get() - step);
        onActivate();
        break;
      case 'ArrowDown':
        event.preventDefault();
        y.set(y.get() + step);
        onActivate();
        break;
      default:
        break;
    }
  };

  return (
    <motion.button
      type="button"
      className={[
        styles.sticker,
        def.tone === 'rubberDuck' ? styles.rubberDuckSticker : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: `calc(${slot.left}% - var(--sticker-half))`,
        top: `calc(${slot.top}% - var(--sticker-half))`,
        rotate: `${slot.rotate}deg`,
        x,
        y,
        zIndex: isTop ? 20 : 10 + topIndex,
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.08}
      dragMomentum
      whileHover={{ scale: 1.04 }}
      whileDrag={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      onPointerDown={onActivate}
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

export default function HeroStickers({ lang = 'pt-BR' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [topId, setTopId] = useState<string | null>(null);
  const [orderMap, setOrderMap] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 640px)');
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener('change', updateMobile);
    return () => mq.removeEventListener('change', updateMobile);
  }, []);

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
          />
        ))}
    </div>
  );
}
