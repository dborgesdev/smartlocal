import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/portfolio/ProjectCard";
import PortfolioSpiral from "@/components/effects/PortfolioSpiral";
export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section
      className="featured light-section section-shell"
      id="projetos"
      aria-labelledby="featured-title"
    >
      <div className="section-meta eyebrow">
        <span>01 / SELEÇÃO DE PROJETOS</span>
        <span>IDEIAS REAIS. DIFERENTES POSSIBILIDADES.</span>
      </div>
      <div className="featured-heading">
        <p className="kinetic-type" aria-hidden="true">
          <span>DESIGN EM</span>
          <span>
            MOVIMENTO<span className="coral">↗</span>
          </span>
        </p>
        <h2 id="featured-title">
          Projetos que traduzem ideias
          <br />
          em experiências.
        </h2>
      </div>
      <div className="project-grid" ref={ref}>
        {projects
          .filter((item) => item.featured)
          .map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
      </div>
      <PortfolioSpiral target={ref} />
      <div className="section-end">
        <span className="eyebrow">CADA MARCA, UM NOVO UNIVERSO.</span>
        <Link className="button button-dark" to="/projetos">
          Ver todos os projetos <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
