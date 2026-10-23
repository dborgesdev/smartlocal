import { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/portfolio/ProjectCard";
import FeaturedPortfolioMotion from "@/components/effects/FeaturedPortfolioMotion";
export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section
      className="featured light-section section-shell"
      id="projetos"
      aria-labelledby="featured-title"
    >
      <div className="section-meta eyebrow">
        <span>SELEÇÃO DE PROJETOS</span>
        <span>IDEIAS REAIS. DIFERENTES POSSIBILIDADES.</span>
      </div>
      <div className="featured-stage" ref={ref}>
        <div className="featured-heading">
          <h2 id="featured-title">
            Projetos que traduzem ideias
            <br />
            em experiências.
          </h2>
          <p className="kinetic-type" aria-hidden="true">
            <span>DESIGN EM</span>
            <span>
              MOVIMENTO<span className="coral">↗</span>
            </span>
          </p>
        </div>
        <a className="motion-skip text-link" href="#projetos-grid">
          Ir direto aos projetos ↓
        </a>
        <div className="project-grid featured-grid" id="projetos-grid">
          {projects
            .filter((item) => item.featured)
            .map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
        </div>
      </div>
      <FeaturedPortfolioMotion target={ref} />
      <div className="section-end">
        <span className="eyebrow">CADA MARCA, UM NOVO UNIVERSO.</span>
        <span className="section-end-mark" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}
