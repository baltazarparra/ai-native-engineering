import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import styles from './HeroStickers.module.css';

type Lang = 'pt-BR' | 'en';

interface StickerDef {
  id: string;
  emoji: string;
  labels: Record<Lang, string>;
}

const STICKERS: StickerDef[] = [
  {
    id: 'robot',
    emoji: '🤖',
    labels: { 'pt-BR': 'robô', en: 'robot' },
  },
  {
    id: 'bulb',
    emoji: '💡',
    labels: { 'pt-BR': 'ideia', en: 'idea' },
  },
  {
    id: 'bolt',
    emoji: '⚡',
    labels: { 'pt-BR': 'raio', en: 'bolt' },
  },
  {
    id: 'brain',
    emoji: '🧠',
    labels: { 'pt-BR': 'cérebro', en: 'brain' },
  },
  {
    id: 'sparkles',
    emoji: '✨',
    labels: { 'pt-BR': 'faíscas', en: 'sparkles' },
  },
];

const SLOTS: Array<{ left: number; top: number; rotate: number }> = [
  { left: 88, top: 15, rotate: -7 },
  { left: 72, top: 55, rotate: 6 },
  { left: 92, top: 78, rotate: 4 },
  { left: 62, top: 12, rotate: -5 },
  { left: 82, top: 40, rotate: 8 },
];

interface Props {
  lang?: Lang;
}

interface StickerProps {
  def: StickerDef;
  lang: Lang;
  slot: (typeof SLOTS)[number];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onActivate: () => void;
  topIndex: number;
  isTop: boolean;
}

function Sticker({
  def,
  lang,
  slot,
  containerRef,
  onActivate,
  topIndex,
  isTop,
}: StickerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
      className={styles.sticker}
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
      <span className={styles.emoji} aria-hidden="true">
        {def.emoji}
      </span>
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
    () => (isMobile ? STICKERS.slice(0, 3) : STICKERS),
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
        visibleStickers.map((def, index) => (
          <Sticker
            key={def.id}
            def={def}
            lang={lang}
            slot={SLOTS[index] || SLOTS[0]}
            containerRef={containerRef}
            onActivate={() => activate(def.id)}
            topIndex={orderMap[def.id] || 0}
            isTop={topId === def.id}
          />
        ))}
    </div>
  );
}
