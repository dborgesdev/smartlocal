import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { useViewerMode } from "@/hooks/useViewerMode";
afterEach(() => vi.restoreAllMocks());
it("opens the compact viewport in Mobile and preserves a manual choice on resize", () => {
  const original = window.matchMedia;
  let compact = true;
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({ ...original(query), matches: compact }));
  const { result, rerender } = renderHook(useViewerMode);
  expect(result.current.mode).toBe("mobile");
  expect(result.current.initializing).toBe(false);
  act(() => result.current.setMode("desktop"));
  compact = false;
  act(() => window.dispatchEvent(new Event("resize")));
  rerender();
  expect(result.current.mode).toBe("desktop");
  compact = true;
  act(() => window.dispatchEvent(new Event("resize")));
  rerender();
  expect(result.current.mode).toBe("desktop");
});
it("opens a roomy viewport in Desktop", () => {
  const { result } = renderHook(useViewerMode);
  expect(result.current.mode).toBe("desktop");
});
