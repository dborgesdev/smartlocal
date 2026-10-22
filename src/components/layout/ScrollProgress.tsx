import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - innerHeight;
        if (bar.current)
          bar.current.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={bar} />
    </div>
  );
}
