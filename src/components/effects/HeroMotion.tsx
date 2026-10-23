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
            end: () => `+=${Math.round(innerHeight * 0.85)}`,
            pin: true,
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(
            section.querySelectorAll(".hero-word"),
            {
              y: (i) =>
                (i % 2 ? -1 : 1) * innerHeight * (0.35 + (i % 3) * 0.11),
              x: (i) => (i % 2 ? 1 : -1) * innerWidth * (0.18 + (i % 4) * 0.08),
              rotation: (i) => (i % 2 ? 1 : -1) * (12 + i * 3),
              scale: (i) => (i % 2 ? 1.6 : 0.8),
              opacity: 0,
              duration: 0.72,
              stagger: 0.014,
              ease: "power1.in",
            },
            0,
          )
          .to(
            section.querySelectorAll(
              ".hero-description,.hero-cta,.hero-kicker,.hero-top,.hero-bottom",
            ),
            { autoAlpha: 0, y: -25, duration: 0.35 },
            0,
          )
          .to(
            section.querySelector(".fluid-hero"),
            { scale: 1.08, opacity: 0.25, duration: 1 },
            0,
          );
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
