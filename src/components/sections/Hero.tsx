import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import FluidHero from "@/components/effects/FluidHero";
import HeroMotion from "@/components/effects/HeroMotion";
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <FluidHero />
      <HeroMotion target={ref} />
      <div className="hero-top eyebrow">
        <span>
          <i className="status-dot" /> CREATIVE WEB DEVELOPMENT
        </span>
        <span>ESTRATÉGIA QUE GANHA FORMA.</span>
      </div>
      <div className="hero-content">
        <p className="eyebrow hero-kicker">O COMUM NÃO É O SEU LUGAR.</p>
        <h1 id="hero-title">
          {"Sua marca merece mais que um site. Merece"
            .split(" ")
            .map((word, index) => (
              <span className="hero-word" key={index}>
                {word}{" "}
              </span>
            ))}
          <span className="hero-word hero-accent">impressionar.</span>
        </h1>
        <p className="hero-description">
          Desenvolvimento web com design, estratégia e tecnologia para
          transformar ideias em experiências digitais.
        </p>
        <a href="#projetos" className="hero-cta">
          Conheça nossos projetos <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="hero-bottom">
        <a
          href="#projetos"
          className="scroll-cue"
          aria-label="Rolar para projetos"
        >
          <ArrowDown size={18} />
        </a>
        <span className="eyebrow">
          DESIGN COM PRESENÇA.
          <br />
          CÓDIGO COM PROPÓSITO.
        </span>
        <span className="eyebrow hero-edition">
          BEYOND THE
          <br />
          ORDINARY ↗
        </span>
      </div>
    </section>
  );
}
