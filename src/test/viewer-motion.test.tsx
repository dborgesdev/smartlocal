import { useRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import VideoScrollMotion from "@/components/effects/VideoScrollMotion";
const mocks = vi.hoisted(() => ({ kill: vi.fn(), create: vi.fn(), bind: vi.fn(), seek: vi.fn(), dispose: vi.fn() }));
vi.mock("@/lib/motion", () => ({
  gsap: { matchMedia: () => { let clean = () => {}; return { add: (_query: string, setup: () => () => void) => { clean = setup(); }, revert: () => clean() }; } },
  ScrollTrigger: { create: (options: { onRefresh: (self: {progress:number}) => void }) => { mocks.create(); options.onRefresh({progress:.4}); return {kill:mocks.kill,refresh:vi.fn()}; }, refresh:vi.fn() },
}));
vi.mock("@/lib/video-scrub", () => ({ createVideoScrubber: (...args: unknown[]) => { mocks.bind(...args); return {seek:mocks.seek,dispose:mocks.dispose}; } }));
function Demo({source,ready,duration}: {source:string;ready:boolean;duration:number}) {
  const target=useRef<HTMLDivElement>(null),panel=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null),progress=useRef<HTMLProgressElement>(null),percentage=useRef<HTMLSpanElement>(null);
  return <div ref={target}><div ref={panel}><video ref={video} key={source}/><progress ref={progress}/><span ref={percentage}/></div><VideoScrollMotion target={target} panel={panel} video={video} progress={progress} percentage={percentage} source={source} ready={ready} duration={duration} enabled onUnavailable={unavailable}/></div>;
}
const unavailable=()=>{};
it("keeps the pin while the next format loads and rebinds its decoder at the same progress", async () => {
  vi.stubGlobal("ResizeObserver", class {observe(){} disconnect(){}});
  const {rerender,unmount}=render(<Demo source="desktop" ready duration={30}/>);
  await waitFor(()=>expect(mocks.create).toHaveBeenCalledTimes(1));
  rerender(<Demo source="mobile" ready={false} duration={0}/>);
  expect(mocks.kill).not.toHaveBeenCalled();
  rerender(<Demo source="mobile" ready duration={20}/>);
  expect(mocks.create).toHaveBeenCalledTimes(1);
  expect(mocks.bind).toHaveBeenCalledTimes(2);
  expect(mocks.seek).toHaveBeenLastCalledWith(.4);
  unmount();
  expect(mocks.kill).toHaveBeenCalledTimes(1);
  vi.unstubAllGlobals();
});
