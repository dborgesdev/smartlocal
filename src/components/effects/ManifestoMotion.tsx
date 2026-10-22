import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
export default function ManifestoMotion({
  target,
}: {
  target: RefObject<HTMLElement>;
}) {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    import("@/lib/motion").then(({ gsap }) => {
      if (cancelled || !target.current) return;
      const match = gsap.matchMedia();
      match.add(desktopMotion, () => {
        target
          .current!.querySelectorAll(".manifesto-line")
          .forEach((line, index) => {
            gsap.from(line, {
              xPercent: index % 2 ? 14 : -14,
              scrollTrigger: {
                trigger: target.current,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            });
          });
        gsap.fromTo(
          target.current!.querySelector(".about-orbit"),
          { rotation: -25 },
          {
            rotation: 35,
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
