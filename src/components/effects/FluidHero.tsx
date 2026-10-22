import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function FluidHero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.current?.style.setProperty(
          "--pointer-x",
          `${(event.clientX / innerWidth - 0.5) * 55}px`,
        );
        root.current?.style.setProperty(
          "--pointer-y",
          `${(event.clientY / innerHeight - 0.5) * 45}px`,
        );
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = true;
    const update = () => {
      element.dataset.moving = String(visible && !document.hidden && !reduced);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduced]);
  return (
    <div className="fluid-hero" ref={root} aria-hidden="true">
      <div className="fluid-orb orb-blue" />
      <div className="fluid-orb orb-coral" />
      <div className="fluid-ribbon" />
      <div className="fluid-ring ring-one" />
      <div className="fluid-ring ring-two" />
      <div className="grain" />
    </div>
  );
}
