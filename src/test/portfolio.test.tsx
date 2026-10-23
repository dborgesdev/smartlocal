import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { projects } from "@/data/projects";
import { whatsappUrl, formMessage, projectMessage } from "@/lib/whatsapp";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import ProjectViewer from "@/components/portfolio/ProjectViewer";
import ProjectCard from "@/components/portfolio/ProjectCard";
import Contact from "@/components/sections/Contact";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Services from "@/components/sections/Services";
import { navigation } from "@/data/navigation";

describe("Portfólio e contato", () => {
  it("acompanha a preferência de redução de movimento e libera seu listener", () => {
    const listeners = new Set<() => void>();
    const media = {
      matches: true,
      addEventListener: (_event: string, listener: () => void) =>
        listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) =>
        listeners.delete(listener),
    };
    const mock = vi
      .spyOn(window, "matchMedia")
      .mockReturnValue(media as unknown as MediaQueryList);
    const { result, unmount } = renderHook(useReducedMotion);
    expect(result.current).toBe(true);
    act(() => {
      media.matches = false;
      listeners.forEach((listener) => listener());
    });
    expect(result.current).toBe(false);
    unmount();
    expect(listeners.size).toBe(0);
    mock.mockRestore();
  });
  it("preserva os oito destaques e mantém URLs não verificadas desativadas", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "kasco-aeronautical",
      "ricardo-peccher",
      "kompetens",
      "auto-executivo",
      "fabio-moura-corretor",
      "mary-fashion",
      "moan-place",
      "a7-jovem-guarda-fm",
    ]);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(8);
    expect(projects.every((project) => project.websiteVerified && project.website?.startsWith("https://"))).toBe(true);
  });
  it("oferece o site confirmado em nova aba e omite o CTA sem confirmação", () => {
    const content = (verified: boolean) => <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ProjectViewer project={{...projects[0], websiteVerified: verified}} /></MemoryRouter>;
    const { rerender } = render(content(true));
    const link = screen.getByRole("link", {name: /Ver site ao vivo/});
    expect(link).toHaveAttribute("href", "https://kasco.com.br/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    rerender(content(false));
    expect(screen.queryByRole("link", {name: /Ver site ao vivo/})).not.toBeInTheDocument();
  });
  it("codifica mensagens com acentos e caracteres especiais sem alterar o destinatário", () => {
    const message = formMessage(
      "  João & Maria ",
      "Uma loja com café & acessórios?",
    );
    const url = new URL(whatsappUrl(message));
    expect(url.pathname).toBe("/5543991364545");
    expect(url.searchParams.get("text")).toBe(message);
    expect(projectMessage("Kasco Aeronautical")).toContain(
      "Kasco Aeronautical",
    );
  });
  it("expõe o estado do filtro e comunica a categoria escolhida", () => {
    const select = vi.fn();
    render(
      <ProjectFilters
        categories={["Institucional", "E-commerce"]}
        selected="Institucional"
        onSelect={select}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Institucionais" }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "E-commerce" }));
    expect(select).toHaveBeenCalledWith("E-commerce");
  });
  it("mantém o case utilizável sem nenhuma mídia e sem botão de playback", () => {
    const project = {
      ...projects[0],
      media: {
        desktopPoster: null,
        mobilePoster: null,
        desktopVideo: null,
        mobileVideo: null,
      },
    };
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProjectViewer project={project} />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Apresentação visual em preparação."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Reproduzir/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(screen.getByRole("button", { name: "Mobile" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("carrega somente a mídia próxima e troca formato sem autoplay ou loop concorrente", () => {
    const originalObserver = window.IntersectionObserver;
    class NearObserver {
      callback: IntersectionObserverCallback;
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }
      observe(target: Element) {
        this.callback(
          [{ isIntersecting: true, target } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      }
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", NearObserver);
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});
    const { container, unmount } = render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProjectViewer project={projects[0]} />
      </MemoryRouter>,
    );
    expect(container.querySelector("video")?.getAttribute("src")).toContain(
      "desktop.mp4",
    );
    expect(container.querySelector("video")).not.toHaveAttribute("autoplay");
    expect(container.querySelector("video")).not.toHaveAttribute("loop");
    fireEvent.click(
      screen.getByRole("button", { name: "Assistir com controles" }),
    );
    expect(container.querySelector("video")).toHaveAttribute("controls");
    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(pause).toHaveBeenCalled();
    expect(container.querySelector("video")?.getAttribute("src")).toContain(
      "mobile.mp4",
    );
    expect(container.querySelectorAll("video")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      projects[0].media.mobilePoster,
    );
    fireEvent.error(container.querySelector("video")!);
    expect(container.querySelector("video")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent(
      "A gravação está indisponível",
    );
    expect(container.querySelector(".pin-spacer")).toBeNull();
    unmount();
    pause.mockRestore();
    vi.stubGlobal("IntersectionObserver", originalObserver);
  });
  it("direciona todos os menus ao catálogo e oferece quatro mensagens de serviço distintas", () => {
    expect(navigation.find((item) => item.label === "Projetos")?.href).toBe(
      "/projetos",
    );
    render(<Services />);
    const links = screen.getAllByRole("link", { name: /Solicitar orçamento:/ });
    const messages = links.map((link) => {
      const url = new URL(link.getAttribute("href")!);
      expect(url.pathname).toBe("/5543991364545");
      return url.searchParams.get("text");
    });
    expect(new Set(messages).size).toBe(4);
    expect(messages.every((message) => message?.includes("Smart Local"))).toBe(
      true,
    );
  });
  it("usa composição editorial quando uma captura falha", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProjectCard project={projects[0]} />
      </MemoryRouter>,
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("SELEÇÃO SMART LOCAL")).toBeInTheDocument();
  });
  it("valida espaços em branco e abre o WhatsApp com os dados do formulário", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Como podemos chamar você?"), {
      target: { value: "  " },
    });
    fireEvent.change(screen.getByLabelText("O que você tem em mente?"), {
      target: { value: "           " },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: "Solicitar meu projeto" })
        .closest("form")!,
    );
    expect(open).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("Informe seu nome");
    expect(screen.getByLabelText("Como podemos chamar você?")).toHaveFocus();
    fireEvent.change(screen.getByLabelText("Como podemos chamar você?"), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText("O que você tem em mente?"), {
      target: { value: "Quero um site para minha empresa." },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: "Solicitar meu projeto" })
        .closest("form")!,
    );
    expect(open).toHaveBeenCalledWith(
      whatsappUrl(formMessage("João", "Quero um site para minha empresa.")),
      "_blank",
      "noopener,noreferrer",
    );
    open.mockRestore();
  });
});
