import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
export default function ContactMotion({
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
        const element = target.current!;
        element.dataset.motion = "ready";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: target.current,
              start: "top 75%",
              end: "top 20%",
              scrub: 1,
            },
          })
          .to(
            target.current!.querySelector(".contact-question"),
            { yPercent: -110, opacity: 0 },
            0,
          )
          .fromTo(
            target.current!.querySelector(".contact-answer"),
            { yPercent: 80, opacity: 0 },
            { yPercent: 0, opacity: 1 },
            0,
          );
        return () => {
          delete element.dataset.motion;
        };
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
