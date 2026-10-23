import { useEffect, type RefObject } from "react";
import { desktopMotion } from "@/lib/motion-settings";
import { clamp01, featuredPose, type CardSlot } from "@/lib/portfolio-motion";

export default function FeaturedPortfolioMotion({
  target,
}: {
  target: RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    import("@/lib/motion").then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !target.current) return;
      const stage = target.current;
      const match = gsap.matchMedia();
      match.add(desktopMotion, () => {
        const grid = stage.querySelector<HTMLElement>(".featured-grid")!;
        const cards = Array.from(
          grid.querySelectorAll<HTMLElement>(".project-card"),
        );
        const captions = cards.flatMap((card) => [
          card.querySelector(".project-caption"),
          card.querySelector(".project-open"),
        ]);
        const titleLines = stage.querySelectorAll(".kinetic-type > span");
        const heading = stage.querySelector("h2");
        const skip = stage.querySelector<HTMLAnchorElement>(".motion-skip");
        const state = { progress: 0 };
        let width = 0;
        let height = 0;
        let slots: CardSlot[] = [];
        stage.dataset.motion = "ready";
        const measure = () => {
          width = stage.clientWidth;
          height = innerHeight - 100;
          slots = cards.map((card) => ({
            x: card.offsetLeft + grid.offsetLeft,
            y: card.offsetTop + grid.offsetTop,
            width: card.offsetWidth,
          }));
        };
        const draw = () => {
          const p = state.progress;
          stage.dataset.progress = p.toFixed(3);
          cards.forEach((card, index) => {
            const pose = featuredPose(index, p, width, height, slots[index]);
            gsap.set(card, {
              ...pose,
              x: pose.x - slots[index].x,
              y: pose.y - slots[index].y,
              zIndex: p < 0.98 ? Math.round(pose.z + 200) : 0,
              force3D: true,
            });
          });
          gsap.set(captions, { autoAlpha: clamp01((p - 0.86) / 0.14) });
          const entrance = clamp01(p / 0.16);
          const exit = clamp01((p - 0.43) / 0.27);
          gsap.set(titleLines[0], {
            x: -(1 - entrance) * width - exit * width * 1.1,
            autoAlpha: 1 - exit,
          });
          gsap.set(titleLines[1], {
            x: (1 - entrance) * width + exit * width * 1.1,
            autoAlpha: 1 - exit,
          });
          gsap.set(heading, {
            autoAlpha: 1 - clamp01((p - 0.18) / 0.22),
            y: -clamp01((p - 0.18) / 0.22) * 40,
          });
          gsap.set(skip, { autoAlpha: 1 - clamp01((p - 0.68) / 0.22) });
        };
        measure();
        const animation = gsap.fromTo(
          state,
          { progress: 0 },
          {
            progress: 1,
            ease: "none",
            duration: 1,
            onUpdate: draw,
            scrollTrigger: {
              id: "featured-helix",
              trigger: stage,
              start: "top top+=92",
              end: () => `+=${Math.round(innerHeight * 2.15)}`,
              pin: true,
              scrub: 0.45,
              invalidateOnRefresh: true,
              onRefreshInit: measure,
              onRefresh: draw,
            },
          },
        );
        const trigger = animation.scrollTrigger!;
        const finish = (event: Event) => {
          if (event.type === "click") event.preventDefault();
          if (trigger.progress < 1) {
            state.progress = 1;
            draw();
            const focused =
              event.type === "focusin"
                ? (event.target as HTMLElement).closest<HTMLElement>(
                    ".project-card",
                  )
                : null;
            window.scrollTo({
              top:
                trigger.end + 1 + Math.max(0, (focused?.offsetTop || 0) - 20),
              behavior: "instant",
            });
            ScrollTrigger.update();
            trigger.getTween()?.progress(1);
            animation.progress(1);
            state.progress = 1;
            draw();
          }
          if (event.type === "click")
            cards[0]?.querySelector("a")?.focus({ preventScroll: true });
        };
        grid.addEventListener("focusin", finish);
        skip?.addEventListener("click", finish);
        draw();
        ScrollTrigger.refresh();
        return () => {
          grid.removeEventListener("focusin", finish);
          skip?.removeEventListener("click", finish);
          animation.scrollTrigger?.kill(true);
          animation.kill();
          delete stage.dataset.motion;
          delete stage.dataset.progress;
          gsap.set(
            [...cards, ...captions, ...Array.from(titleLines), heading, skip],
            { clearProps: "transform,opacity,visibility,zIndex" },
          );
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
