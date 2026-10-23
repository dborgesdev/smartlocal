import { useEffect, type RefObject } from "react";
export default function ContactFormMotion({
  target,
}: {
  target: RefObject<HTMLFormElement>;
}) {
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    import("@/lib/motion").then(({ gsap }) => {
      if (cancelled || !target.current) return;
      const match = gsap.matchMedia();
      match.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(target.current, {
          y: 35,
          rotationX: 3,
          transformPerspective: 1200,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: target.current,
            start: "top 92%",
            once: true,
          },
        });
      });
      dispose = () => match.revert();
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [target]);
  return null;
}
