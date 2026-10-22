import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
export default function HeroMotion({
  target,
}: {
  target: RefObject<HTMLElement>;
}) {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    import("@/lib/motion").then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !target.current) return;
      const match = gsap.matchMedia();
      const notifyLayout = () =>
        window.dispatchEvent(new Event("smartlocal:layout-ready"));
      ScrollTrigger.addEventListener("refresh", notifyLayout);
      match.add(desktopMotion, () => {
        const section = target.current!;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top+=72",
            end: "+=65%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(
            section.querySelectorAll(".hero-word"),
            {
              y: (i) => (i % 2 ? -65 : 35),
              x: (i) => ((i % 3) - 1) * 65,
              scale: 1.13,
              opacity: 0.08,
              stagger: 0.02,
            },
            0,
          )
          .to(section.querySelector(".hero-bottom"), { opacity: 0 }, 0);
      });
      ScrollTrigger.refresh();
      dispose = () => {
        ScrollTrigger.removeEventListener("refresh", notifyLayout);
        match.revert();
      };
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [target]);
  return null;
}
