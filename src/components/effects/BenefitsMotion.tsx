import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
export default function BenefitsMotion({
  target,
}: {
  target: RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    import("@/lib/motion").then(({ gsap }) => {
      if (cancelled || !target.current) return;
      const match = gsap.matchMedia();
      match.add(desktopMotion, () => {
        gsap.fromTo(
          target.current,
          { x: 65 },
          {
            x: -35,
            ease: "none",
            scrollTrigger: {
              trigger: target.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
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
