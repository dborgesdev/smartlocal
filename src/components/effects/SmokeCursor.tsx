import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function SmokeCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      !matchMedia("(pointer: fine)").matches ||
      navigator.hardwareConcurrency <= 4
    )
      return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${event.clientX - 65}px,${event.clientY - 65}px,0)`;
          ref.current.classList.add("active");
        }
      });
    };
    const hide = () => ref.current?.classList.remove("active");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, [reduced]);
  return reduced ? null : (
    <div className="smoke-cursor" ref={ref} aria-hidden="true" />
  );
}
