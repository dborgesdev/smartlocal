import { StrictMode, useRef } from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import BrandIntro from "@/components/effects/BrandIntro";
vi.mock("gsap", () => ({ default: {
  context: (setup: () => void) => { setup(); return { revert: vi.fn() }; },
  timeline: () => { const chain = { fromTo: () => chain }; return chain; },
} }));
function Hero() {
  const target = useRef<HTMLElement>(null);
  return <section className="hero" ref={target}><BrandIntro target={target}/><div className="hero-content">Content</div></section>;
}
describe("brand opening lifecycle", () => {
  beforeEach(() => { document.documentElement.dataset.brandEntry = "ready"; });
  it("survives StrictMode setup/cleanup/setup and reveals on interruption", async () => {
    const { container } = render(<StrictMode><Hero/></StrictMode>);
    await waitFor(() => expect(container.querySelector("section")).toHaveAttribute("data-intro", "pending"));
    fireEvent.wheel(window);
    expect(container.querySelector("section")).not.toHaveAttribute("data-intro");
    expect(container.querySelector(".hero-content")).not.toHaveAttribute("style");
  });
  it("starts on the first setup without StrictMode", async () => {
    const { container } = render(<Hero/>);
    await waitFor(() => expect(container.querySelector("section")).toHaveAttribute("data-intro", "pending"));
  });
  it("skips an advanced restored scroll position", () => {
    vi.stubGlobal("scrollY", 800);
    const { container } = render(<Hero/>);
    expect(container.querySelector("section")).not.toHaveAttribute("data-intro");
    vi.unstubAllGlobals();
  });
  it("skips a deep link even before the browser restores scroll", () => {
    history.replaceState(null, "", "/#contato");
    const { container } = render(<Hero/>);
    expect(container.querySelector("section")).not.toHaveAttribute("data-intro");
    history.replaceState(null, "", "/");
  });
});


