type AudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let lastPlayedAt = 0;
const THROTTLE_MS = 35;

const PENTATONIC_HZ = [
  261.63, // C4
  311.13, // Eb4
  349.23, // F4
  392.0, // G4
  466.16, // Bb4
];

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickFrequency(idA: string, idB: string): number {
  const key = idA < idB ? `${idA}|${idB}` : `${idB}|${idA}`;
  const idx = hashString(key) % PENTATONIC_HZ.length;
  return PENTATONIC_HZ[idx];
}

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext || (window as AudioWindow).webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.75;
    masterGain.connect(ctx.destination);
    return ctx;
  } catch {
    return null;
  }
}

export function initAudioOnGesture(): void {
  const c = ensureContext();
  if (c && c.state === 'suspended') {
    c.resume().catch(() => {});
  }
}

export interface ImpactSoundOpts {
  strength: number;
  panX: number;
  freq: number;
}

export function playImpact({ strength, panX, freq }: ImpactSoundOpts): void {
  if (!ctx || !masterGain) return;
  if (ctx.state !== 'running') return;
  const now = ctx.currentTime * 1000;
  if (now - lastPlayedAt < THROTTLE_MS) return;
  lastPlayedAt = now;

  const t0 = ctx.currentTime;
  const gain = Math.max(0.04, Math.min(0.32, strength / 1500));
  const duration = 0.13;

  const panner = ctx.createStereoPanner();
  panner.pan.value = Math.max(-1, Math.min(1, panX));
  panner.connect(masterGain);

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t0);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.82, t0 + duration);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.0001, t0);
  oscGain.gain.exponentialRampToValueAtTime(gain, t0 + 0.004);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(oscGain).connect(panner);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);

  const noiseDuration = 0.012;
  const noiseLen = Math.floor(ctx.sampleRate * noiseDuration);
  const buffer = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < noiseLen; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / noiseLen);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(gain * 0.35, t0);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + noiseDuration);
  noise.connect(noiseGain).connect(panner);
  noise.start(t0);
  noise.stop(t0 + noiseDuration + 0.01);
}
