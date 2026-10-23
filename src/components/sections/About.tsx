import { useRef } from "react";
import ManifestoMotion from "@/components/effects/ManifestoMotion";
export default function About() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      id="sobre"
      className="about section-shell"
      ref={ref}
      aria-labelledby="about-title"
    >
      <ManifestoMotion target={ref} />
      <div className="section-meta eyebrow">
        <span>NOSSA ESSÊNCIA</span>
        <span>ALÉM DO ÓBVIO.</span>
      </div>
      <div className="about-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <h2 id="about-title">
        <span className="manifesto-line">Não criamos</span>
        <span className="manifesto-line">apenas páginas.</span>
        <span className="manifesto-line outline-text">Construímos</span>
        <span className="manifesto-line coral">experiências</span>
        <span className="manifesto-line">digitais.</span>
      </h2>
      <div className="about-bottom">
        <span className="eyebrow">
          DESIGN. NAVEGAÇÃO.
          <br />
          TECNOLOGIA. DETALHE.
        </span>
        <p>
          Cada projeto combina identidade, navegação, tecnologia e atenção aos
          detalhes para apresentar sua empresa com qualidade e confiança.
        </p>
      </div>
    </section>
  );
}
