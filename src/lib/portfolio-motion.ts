export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
export type CardSlot = { x: number; y: number; width: number };
export type CardPose = {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotation: number;
  scale: number;
};

// Every thumbnail follows this one helix at a different temporal offset.
// Coordinates are absolute within the pinned scene; the DOM grid never loses its flow.
export function featuredPose(
  index: number,
  progress: number,
  width: number,
  height: number,
  slot: CardSlot,
): CardPose {
  const p = clamp01(progress);
  if (p === 1)
    return {
      x: slot.x,
      y: slot.y,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotation: 0,
      scale: 1,
    };
  const orbit = (phase: number): CardPose => {
    const q = phase * 2.12 - index * 0.145;
    const angle = q * Math.PI * 2 * 1.05;
    return {
      x: width * 0.5 + Math.sin(angle) * width * 0.29 - slot.width * 0.5,
      y: height * (1.3 - q * 1.8),
      z: Math.cos(angle) * 160,
      rotationX: Math.sin(angle + 0.4) * 10,
      rotationY: Math.sin(angle) * -28,
      rotation: Math.sin(angle) * 9,
      scale: 0.46 + (Math.cos(angle) + 1) * 0.08,
    };
  };
  const origin = orbit(Math.min(p / 0.68, 1));
  if (p <= 0.68) return origin;
  const t = ease((p - 0.68) / 0.32);
  return {
    x: origin.x + (slot.x - origin.x) * t,
    y: origin.y + (slot.y - origin.y) * t,
    z: origin.z * (1 - t),
    rotationX: origin.rotationX * (1 - t),
    rotationY: origin.rotationY * (1 - t),
    rotation: origin.rotation * (1 - t),
    scale: origin.scale + (1 - origin.scale) * t,
  };
}
export function parchmentPose(progress: number, compact = false) {
  const bend = clamp01(progress) * 2 - 1;
  return {
    rotationX: bend * (compact ? 6 : 22),
    x: (1 - Math.cos((bend * Math.PI) / 2)) * (compact ? 8 : 38),
    y: -Math.sin((bend * Math.PI) / 2) * (compact ? 10 : 38),
    z: -bend * bend * (compact ? 18 : 95),
  };
}
