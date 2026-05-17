export interface PhysicsBody {
  vx: number;
  vy: number;
  vr: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface BodyPosition {
  cx: number;
  cy: number;
  basePx: number;
  basePy: number;
  radius: number;
}

export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const fricFactor = (base: number, dt: number): number =>
  Math.pow(base, dt * 60);

export interface OverlapResolution {
  deltaAx: number;
  deltaAy: number;
  deltaBx: number;
  deltaBy: number;
}

export function resolveOverlap(
  nx: number,
  ny: number,
  overlap: number,
  aDragging: boolean,
  bDragging: boolean,
): OverlapResolution {
  if (aDragging && !bDragging) {
    return {
      deltaAx: 0,
      deltaAy: 0,
      deltaBx: nx * overlap,
      deltaBy: ny * overlap,
    };
  }
  if (bDragging && !aDragging) {
    return {
      deltaAx: -nx * overlap,
      deltaAy: -ny * overlap,
      deltaBx: 0,
      deltaBy: 0,
    };
  }
  const half = overlap / 2;
  return {
    deltaAx: -nx * half,
    deltaAy: -ny * half,
    deltaBx: nx * half,
    deltaBy: ny * half,
  };
}

export interface ImpactResult {
  impulse: number;
  vrelx: number;
  vrely: number;
  vn: number;
}

export function elasticExchange(
  a: PhysicsBody,
  b: PhysicsBody,
  nx: number,
  ny: number,
  restitution: number,
): ImpactResult {
  const vrelx = b.vx - a.vx;
  const vrely = b.vy - a.vy;
  const vn = vrelx * nx + vrely * ny;
  if (vn >= 0) {
    return { impulse: 0, vrelx, vrely, vn };
  }
  const j = ((1 + restitution) * vn) / 2;
  a.vx += j * nx;
  a.vy += j * ny;
  b.vx -= j * nx;
  b.vy -= j * ny;
  return { impulse: Math.abs(j), vrelx, vrely, vn };
}

export function applySpin(
  a: PhysicsBody,
  b: PhysicsBody,
  ra: number,
  rb: number,
  nx: number,
  ny: number,
  vrelx: number,
  vrely: number,
  k: number,
  maxAbs: number,
): void {
  const tx = -ny;
  const ty = nx;
  const vt = vrelx * tx + vrely * ty;
  a.vr = clamp(a.vr + (-k * vt * 60) / ra, -maxAbs, maxAbs);
  b.vr = clamp(b.vr + (k * vt * 60) / rb, -maxAbs, maxAbs);
}

export interface WallBounceState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function wallBounce(
  state: WallBounceState,
  basePx: number,
  basePy: number,
  radius: number,
  bounds: Bounds,
  restitution: number,
): WallBounceState {
  let { x, y, vx, vy } = state;
  const cx = basePx + x;
  const cy = basePy + y;
  const minX = radius;
  const maxX = bounds.width - radius;
  const minY = radius;
  const maxY = bounds.height - radius;

  if (cx < minX) {
    x = minX - basePx;
    if (vx < 0) vx = -vx * restitution;
  } else if (cx > maxX) {
    x = maxX - basePx;
    if (vx > 0) vx = -vx * restitution;
  }
  if (cy < minY) {
    y = minY - basePy;
    if (vy < 0) vy = -vy * restitution;
  } else if (cy > maxY) {
    y = maxY - basePy;
    if (vy > 0) vy = -vy * restitution;
  }
  return { x, y, vx, vy };
}
