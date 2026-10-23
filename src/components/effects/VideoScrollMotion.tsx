import { useEffect, type RefObject } from "react";
import { createVideoScrubber } from "@/lib/video-scrub";
export default function VideoScrollMotion({
  target,
  panel,
  video,
  progress,
  percentage,
  duration,
  enabled,
  onUnavailable,
}: {
  target: RefObject<HTMLDivElement>;
  panel: RefObject<HTMLDivElement>;
  video: RefObject<HTMLVideoElement>;
  progress: RefObject<HTMLProgressElement>;
  percentage: RefObject<HTMLSpanElement>;
  duration: number;
  enabled: boolean;
  onUnavailable: () => void;
}) {
  useEffect(() => {
    if (!enabled || !duration) return;
    let cancelled = false;
    let dispose = () => {};
    import("@/lib/motion").then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !target.current || !panel.current || !video.current)
        return;
      const match = gsap.matchMedia();
      match.add("(prefers-reduced-motion: no-preference)", () => {
        const root = target.current!;
        const scrubber = createVideoScrubber(
          video.current!,
          duration,
          onUnavailable,
        );
        const update = (value: number) => {
          scrubber.seek(value);
          if (progress.current) progress.current.value = value;
          if (percentage.current)
            percentage.current.textContent = `${Math.round(value * 100)}%`;
        };
        root.dataset.scrubbing = "ready";
        const trigger = ScrollTrigger.create({
          id: "project-video",
          trigger: root,
          pin: panel.current,
          start: () =>
            `top top+=${(document.querySelector("header")?.getBoundingClientRect().height || 76) + 12}`,
          end: () =>
            `+=${Math.round(innerHeight * (matchMedia("(pointer: coarse)").matches ? 1.4 : 2))}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
          onRefresh: (self) => update(self.progress),
        });
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("smartlocal:layout-ready"));
        return () => {
          scrubber.dispose();
          trigger.kill(true);
          delete root.dataset.scrubbing;
        };
      });
      dispose = () => match.revert();
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [
    target,
    panel,
    video,
    progress,
    percentage,
    duration,
    enabled,
    onUnavailable,
  ]);
  return null;
}
