import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function SmokeCursor() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer:fine)").matches || !ref.current)
      return;
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    type Puff = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
      phase: number;
    };
    const particles: Puff[] = [];
    let frame = 0,
      last = 0,
      px = -1,
      py = -1;
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    const draw = (now: number) => {
      frame = 0;
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.023 * dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.size += 0.7 * dt;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.phase + p.life * 0.6);
        ctx.scale(1.4, 0.65);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        g.addColorStop(0, `rgba(${p.color},${p.life * 0.11})`);
        g.addColorStop(0.45, `rgba(${p.color},${p.life * 0.055})`);
        g.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        ctx.restore();
      }
      if (particles.length) frame = requestAnimationFrame(draw);
    };
    const clear = () => {
      particles.length = 0;
      px = -1;
      cancelAnimationFrame(frame);
      frame = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const move = (e: PointerEvent) => {
      const inside = document.querySelector(".hero")?.getBoundingClientRect();
      if (
        e.pointerType !== "mouse" ||
        (inside && e.clientY >= inside.top && e.clientY <= inside.bottom)
      ) {
        px = e.clientX;
        py = e.clientY;
        return;
      }
      const dx = px < 0 ? 0 : e.clientX - px,
        dy = px < 0 ? 0 : e.clientY - py,
        speed = Math.min(Math.hypot(dx, dy), 65);
      px = e.clientX;
      py = e.clientY;
      if (speed < 1) return;
      for (let i = 0; i < 3; i++) {
        if (particles.length >= 72) particles.shift();
        particles.push({
          x: e.clientX - (dx * i) / 3,
          y: e.clientY - (dy * i) / 3,
          vx: -dx * 0.025 + (Math.random() - 0.5),
          vy: -dy * 0.025 + (Math.random() - 0.5),
          life: 0.7 + speed / 220,
          size: 40 + speed * 0.17,
          color: Math.random() > 0.5 ? "255,96,70" : "70,91,238",
          phase: Math.random() * 6,
        });
      }
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", clear);
    document.addEventListener("pointerleave", clear);
    return () => {
      clear();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", clear);
      document.removeEventListener("pointerleave", clear);
    };
  }, [reduced]);
  return reduced ? null : (
    <canvas className="smoke-cursor" ref={ref} aria-hidden="true" />
  );
}
