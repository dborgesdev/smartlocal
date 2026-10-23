import { useEffect, type RefObject } from "react";
import { parchmentPose } from "@/lib/portfolio-motion";
export default function CatalogParchmentMotion({
  target,
}: {
  target: RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    import("@/lib/motion").then(({ gsap }) => {
      if (cancelled || !target.current) return;
      const match = gsap.matchMedia();
      match.add(
        {
          compact: "(max-width: 767px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const compact = !!context.conditions.compact;
          const rows =
            target.current!.querySelectorAll<HTMLElement>(".catalog-row");
          rows.forEach((row) => {
            const state = { progress: 0 };
            const draw = () => {
              if (row.contains(document.activeElement)) {
                gsap.set(row, { rotationX: 0, x: 0, y: 0, z: 0 });
                return;
              }
              gsap.set(row, {
                ...parchmentPose(state.progress, compact),
                transformPerspective: 1200,
                transformOrigin: "50% 50%",
                force3D: true,
              });
            };
            gsap.fromTo(
              state,
              { progress: 0 },
              {
                progress: 1,
                ease: "none",
                onUpdate: draw,
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top+=80",
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              },
            );
            const focus = () =>
              gsap.set(row, { rotationX: 0, x: 0, y: 0, z: 0 });
            row.addEventListener("focusin", focus);
            context.add(() => () => row.removeEventListener("focusin", focus));
          });
        },
      );
      dispose = () => match.revert();
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [target]);
  return null;
}
