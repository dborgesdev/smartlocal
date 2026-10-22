import { render, screen, fireEvent, renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { projects } from "@/data/projects";
import { whatsappUrl, formMessage, projectMessage } from "@/lib/whatsapp";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import ProjectViewer from "@/components/portfolio/ProjectViewer";
import ProjectCard from "@/components/portfolio/ProjectCard";
import Contact from "@/components/sections/Contact";
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("Portfólio e contato", () => {
  it('acompanha a preferência de redução de movimento e libera seu listener', () => {
    const listeners = new Set<() => void>();
    const media = {
      matches: true,
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    };
    const mock = vi.spyOn(window, 'matchMedia').mockReturnValue(media as unknown as MediaQueryList);
    const { result, unmount } = renderHook(useReducedMotion);
    expect(result.current).toBe(true);
    act(() => { media.matches = false; listeners.forEach(listener => listener()); });
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
    expect(projects.every((project) => !project.websiteVerified)).toBe(true);
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
    render(<ProjectViewer project={project} />);
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
  it("carrega vídeo apenas após pedido e desmonta ao trocar formato", () => {
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => {});
    const { container } = render(<ProjectViewer project={projects[0]} />);
    expect(container.querySelector("video")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Reproduzir gravação" }),
    );
    expect(container.querySelector("video")?.getAttribute("src")).toContain(
      "desktop.mp4",
    );
    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(pause).toHaveBeenCalled();
    expect(container.querySelector("video")).toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      projects[0].media.mobilePoster,
    );
    pause.mockRestore();
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
