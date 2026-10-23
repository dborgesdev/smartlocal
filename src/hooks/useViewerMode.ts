import { useEffect, useLayoutEffect, useState } from "react";
export type ViewerMode = "desktop" | "mobile";
const useViewportEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
export function preferredViewerMode(): ViewerMode {
  return matchMedia("(max-width: 767px), (max-width: 1023px) and (pointer: coarse) and (orientation: portrait)").matches ? "mobile" : "desktop";
}
export function useViewerMode() {
  // Server and hydration share null. CSS supplies the matching initial poster/frame.
  const [mode, setMode] = useState<ViewerMode | null>(null);
  useViewportEffect(() => { setMode((current) => current ?? preferredViewerMode()); }, []);
  return { mode: mode ?? "desktop", initializing: mode === null, setMode };
}
