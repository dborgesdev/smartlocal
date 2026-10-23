import { afterEach, describe, expect, it, vi } from "vitest";
import { featuredPose, parchmentPose } from "@/lib/portfolio-motion";
import { createVideoScrubber, scrollVideoTime } from "@/lib/video-scrub";
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
describe("Coreografias contínuas", () => {
  const slot = { x: 0, y: 0, width: 520 };
  it("mantém os oito cards na mesma trajetória, defasados no tempo, e converge ao grid", () => {
    const offset = (0.145 / 2.12) * 0.68;
    const first = featuredPose(0, 0.35, 1100, 620, slot);
    const second = featuredPose(1, 0.35 + offset, 1100, 620, slot);
    expect(first.x).toBeCloseTo(second.x);
    expect(first.y).toBeCloseTo(second.y);
    for (let index = 0; index < 8; index++) {
      const target = {
        x: (index % 2) * 550,
        y: Math.floor(index / 2) * 400,
        width: 520,
      };
      expect(featuredPose(index, 1, 1100, 620, target)).toEqual({
        x: target.x,
        y: target.y,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotation: 0,
        scale: 1,
      });
    }
  });
  it("resolve a mesma pose ao reverter e mantém o pergaminho plano no centro", () => {
    const before = featuredPose(3, 0.4, 1100, 620, slot);
    featuredPose(3, 0.9, 1100, 620, slot);
    expect(featuredPose(3, 0.4, 1100, 620, slot)).toEqual(before);
    expect(parchmentPose(0.5)).toEqual({ rotationX: 0, x: 0, y: -0, z: -0 });
    expect(parchmentPose(0).rotationX).toBe(-parchmentPose(1).rotationX);
    expect(Math.abs(parchmentPose(0, true).rotationX)).toBeLessThan(
      Math.abs(parchmentPose(0).rotationX),
    );
  });
});
describe("Vídeo guiado pelo scroll", () => {
  it("encerra uma busca travada para permitir o fallback estático sem pin vazio", () => {
    vi.useFakeTimers();
    const video = document.createElement("video");
    vi.spyOn(video, "pause").mockImplementation(() => {});
    Object.defineProperty(video, "seeking", { value: true });
    const fallback = vi.fn();
    const scrubber = createVideoScrubber(video, 20, fallback);
    video.dispatchEvent(new Event("seeking"));
    vi.advanceTimersByTime(12000);
    expect(fallback).toHaveBeenCalledOnce();
    scrubber.dispose();
    video.dispatchEvent(new Event("seeking"));
    vi.advanceTimersByTime(12000);
    expect(fallback).toHaveBeenCalledOnce();
  });
  it("limita o tempo ao intervalo válido e ignora duração inválida", () => {
    expect(scrollVideoTime(-1, 20)).toBe(0);
    expect(scrollVideoTime(2, 20)).toBeCloseTo(19.96);
    expect(scrollVideoTime(0.5, Infinity)).toBe(0);
    expect(scrollVideoTime(0.5, 0)).toBe(0);
  });
  it("coalesce scroll, espera o decoder e aplica o último destino, inclusive no reverso", () => {
    const frames = new Map<number, FrameRequestCallback>();
    let id = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      frames.set(++id, callback);
      return id;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation((key) => {
      frames.delete(key);
    });
    const flush = () => {
      const batch = [...frames.values()];
      frames.clear();
      batch.forEach((callback) => callback(0));
    };
    const video = document.createElement("video");
    const pause = vi.spyOn(video, "pause").mockImplementation(() => {});
    Object.defineProperty(video, "readyState", {
      value: 2,
      configurable: true,
    });
    let seeking = false;
    Object.defineProperty(video, "seeking", { get: () => seeking });
    const scrubber = createVideoScrubber(video, 20);
    scrubber.seek(0.3);
    scrubber.seek(0.8);
    expect(frames.size).toBe(1);
    flush();
    expect(video.currentTime).toBeCloseTo(15.968);
    seeking = true;
    scrubber.seek(0.2);
    flush();
    expect(video.currentTime).toBeCloseTo(15.968);
    seeking = false;
    video.dispatchEvent(new Event("seeked"));
    flush();
    expect(video.currentTime).toBeCloseTo(3.992);
    scrubber.seek(0.9);
    scrubber.dispose();
    expect(frames.size).toBe(0);
    expect(pause).toHaveBeenCalled();
    video.dispatchEvent(new Event("seeked"));
    expect(frames.size).toBe(0);
  });
});
