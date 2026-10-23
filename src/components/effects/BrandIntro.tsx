import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

const useOpeningEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const revealSelector = ".hero-content,.hero-top > *,.hero-bottom > *";

export default function BrandIntro({ target }: { target: RefObject<HTMLElement> }) {
  const intro = useRef<HTMLDivElement>(null);
  const permitted = useRef<boolean>();
  const completed = useRef(false);
  useOpeningEffect(() => {
    const root = intro.current?.closest<HTMLElement>(".hero") ?? target.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (permitted.current === undefined) {
      permitted.current = document.documentElement.dataset.brandEntry === "ready";
    }
    const release = () => { delete document.documentElement.dataset.brandEntry; };
    if (!root || !permitted.current || completed.current || preference.matches ||
      scrollY > 80 || location.hash) { release(); return; }

    const reveals = root.querySelectorAll<HTMLElement>(revealSelector);
    let context: gsap.Context | undefined;
    const finish = () => {
      completed.current = true;
      delete root.dataset.intro;
      release();
      reveals.forEach((element) => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
    const interrupt = () => { context?.revert(); finish(); };
    const onScroll = () => { if (scrollY > 4) interrupt(); };
    root.dataset.intro = "pending";
    try {
      context = gsap.context(() => {
        // Sequential cross-over: the brand has disappeared before the H1 begins.
        gsap.timeline({ onComplete: finish })
          .fromTo(".brand-intro", { opacity: 1, scale: 1 },
            { opacity: 0, scale: 1.06, duration: 0.85, ease: "power2.inOut" })
          .fromTo(reveals, { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.025, ease: "power3.out" });
      }, root);
    } catch { interrupt(); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", interrupt, { passive: true, once: true });
    window.addEventListener("touchstart", interrupt, { passive: true, once: true });
    root.addEventListener("focusin", interrupt);
    preference.addEventListener("change", interrupt);
    return () => {
      context?.revert();
      // StrictMode cleanup must not consume this mount's authorization.
      delete root.dataset.intro;
      release();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      root.removeEventListener("focusin", interrupt);
      preference.removeEventListener("change", interrupt);
    };
  }, [target]);
  return <div ref={intro} className="brand-intro" aria-hidden="true">smartlocal</div>;
}
