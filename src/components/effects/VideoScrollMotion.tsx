import { useEffect, useRef, type RefObject } from "react";
import { createVideoScrubber } from "@/lib/video-scrub";
export default function VideoScrollMotion({ target, panel, video, progress, percentage, duration, enabled, ready, source, onUnavailable }: {
  target: RefObject<HTMLDivElement>;
  panel: RefObject<HTMLDivElement>;
  video: RefObject<HTMLVideoElement>;
  progress: RefObject<HTMLProgressElement>;
  percentage: RefObject<HTMLSpanElement>;
  duration: number;
  enabled: boolean;
  ready: boolean;
  source: string | null;
  onUnavailable: () => void;
}) {
  const phase = useRef(0);
  const seek = useRef<(value: number) => void>(() => {});
  // Decoder lifecycle changes with the source; the pin and native scroll position survive.
  useEffect(() => {
    if (!enabled || !ready || !duration || !video.current) return;
    const scrubber = createVideoScrubber(video.current, duration, onUnavailable);
    seek.current = scrubber.seek;
    scrubber.seek(phase.current);
    return () => { seek.current = () => {}; scrubber.dispose(); };
  }, [video, duration, ready, enabled, source, onUnavailable]);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let dispose = () => {};
    import("@/lib/motion").then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !target.current || !panel.current) return;
      const match = gsap.matchMedia();
      match.add("(prefers-reduced-motion: no-preference)", () => {
        const root = target.current!;
        const update = (value: number) => {
          phase.current = value;
          seek.current(value);
          if (progress.current) progress.current.value = value;
          if (percentage.current) percentage.current.textContent = `${Math.round(value * 100)}%`;
        };
        root.dataset.scrubbing = "ready";
        const trigger = ScrollTrigger.create({
          id: "project-video", trigger: root, pin: panel.current,
          start: () => `top top+=${(document.querySelector("header")?.getBoundingClientRect().height || 76) + 12}`,
          end: () => `+=${Math.round(innerHeight * (matchMedia("(pointer: coarse)").matches ? 2.5 : 3.5))}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => update(self.progress),
          onRefresh: (self) => update(self.progress),
        });
        let frame = 0;
        const refresh = () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => trigger.refresh());
        };
        let previousHeight = panel.current!.getBoundingClientRect().height;
        const observer = new ResizeObserver(([entry]) => {
          if (Math.abs(entry.contentRect.height - previousHeight) < 1) return;
          previousHeight = entry.contentRect.height;
          refresh();
        });
        observer.observe(panel.current!);
        window.visualViewport?.addEventListener("resize", refresh);
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event("smartlocal:layout-ready"));
        return () => {
          observer.disconnect(); cancelAnimationFrame(frame);
          window.visualViewport?.removeEventListener("resize", refresh);
          trigger.kill(true); delete root.dataset.scrubbing;
        };
      });
      dispose = () => match.revert();
    });
    return () => { cancelled = true; dispose(); };
  }, [target, panel, progress, percentage, enabled]);
  return null;
}
