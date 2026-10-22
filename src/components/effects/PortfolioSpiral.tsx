import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
export default function PortfolioSpiral({
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
        const cards = target.current!.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
          const angle = index * 0.9;
          gsap.from(card, {
            y: 150 + Math.sin(angle) * 40,
            x: Math.cos(angle) * (index % 2 ? -80 : 80),
            rotation: Math.sin(angle + 1) * 10,
            rotationY: index % 2 ? -9 : 9,
            rotationX: 15,
            transformPerspective: 1200,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom+=80",
              end: "top 45%",
              scrub: 1,
            },
          });
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
