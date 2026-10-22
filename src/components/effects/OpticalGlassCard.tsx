import type { PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function OpticalGlassCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const reduced = useReducedMotion();
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.transform = `perspective(900px) rotateY(${(event.clientX - rect.left - rect.width / 2) / 25}deg) rotateX(${-(event.clientY - rect.top - rect.height / 2) / 25}deg)`;
  };
  return (
    <article
      className="glass-card"
      onPointerMove={tilt}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
    >
      <span className="glass-index">0{index + 1} /</span>
      <div className="glass-optic" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {children}
    </article>
  );
}
