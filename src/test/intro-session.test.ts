import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
const source = readFileSync("index.html", "utf8").match(/<script>([\s\S]*?)<\/script>/)![1];
const boot = () => new Function(source)();
beforeEach(() => {
  sessionStorage.clear();
  delete document.documentElement.dataset.brandEntry;
  history.replaceState(null, "", "/");
});
describe("navigation session bootstrap", () => {
  it("authorizes the first Home and consumes the session before React", () => {
    boot();
    expect(document.documentElement.dataset.brandEntry).toBe("ready");
    expect(sessionStorage.getItem("smartlocal:session-started")).toBe("1");
    delete document.documentElement.dataset.brandEntry;
    boot();
    expect(document.documentElement.dataset.brandEntry).toBeUndefined();
  });
  it.each(["/projetos", "/projetos/kasco-aeronautical", "/#contato"])("consumes entry at %s without presenting later", (path) => {
    history.replaceState(null, "", path);
    boot();
    expect(document.documentElement.dataset.brandEntry).toBeUndefined();
    history.replaceState(null, "", "/");
    boot();
    expect(document.documentElement.dataset.brandEntry).toBeUndefined();
  });
  it("keeps the Hero visible if storage is unavailable", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw Error("blocked"); });
    expect(boot).not.toThrow();
    expect(document.documentElement.dataset.brandEntry).toBeUndefined();
    spy.mockRestore();
  });
});
