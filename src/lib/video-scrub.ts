import { clamp01 } from "./portfolio-motion";
export const scrollVideoTime = (progress: number, duration: number) =>
  Number.isFinite(duration) && duration > 0
    ? clamp01(progress) * Math.max(0, duration - 0.04)
    : 0;

// Coalesce scroll bursts, let the decoder finish its current seek, then apply only
// the latest target. No ticker or playback competes with seeking in either direction.
export function createVideoScrubber(
  video: HTMLVideoElement,
  duration: number,
  onUnavailable?: () => void,
) {
  let target = 0;
  let frame = 0;
  let disposed = false;
  let timeout = 0;
  const startSeek = () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (!disposed && !document.hidden && video.seeking) onUnavailable?.();
    }, 12000);
  };
  const apply = () => {
    frame = 0;
    if (disposed || document.hidden || video.seeking || video.readyState < 2)
      return;
    if (Math.abs(video.currentTime - target) < 0.045) return;
    try {
      video.currentTime = target;
    } catch {
      onUnavailable?.();
    }
  };
  const schedule = () => {
    if (!disposed && !frame) frame = requestAnimationFrame(apply);
  };
  const finishSeek = () => {
    clearTimeout(timeout);
    schedule();
  };
  const resume = () => {
    if (!document.hidden && video.seeking) startSeek();
    schedule();
  };
  video.pause();
  video.addEventListener("seeking", startSeek);
  video.addEventListener("seeked", finishSeek);
  video.addEventListener("loadeddata", schedule);
  video.addEventListener("progress", schedule);
  document.addEventListener("visibilitychange", resume);
  return {
    seek(progress: number) {
      target = scrollVideoTime(progress, duration);
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      video.pause();
      video.removeEventListener("seeking", startSeek);
      video.removeEventListener("seeked", finishSeek);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("progress", schedule);
      document.removeEventListener("visibilitychange", resume);
    },
  };
}
