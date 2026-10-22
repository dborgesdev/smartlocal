import { useRef, useState } from "react";
import Page from "@/components/layout/Page";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import ProjectCard from "@/components/portfolio/ProjectCard";
import PortfolioSpiral from "@/components/effects/PortfolioSpiral";
import { projects } from "@/data/projects";
export default function Projects() {
  const [category, setCategory] = useState("Todos");
  const ref = useRef<HTMLDivElement>(null);
  const filtered = projects.filter(
    (project) => category === "Todos" || project.category === category,
  );
  return (
    <Page
      title="Projetos e Portfólio | Smart Local"
      description="Explore experiências digitais desenvolvidas para diferentes marcas, negócios e objetivos."
    >
      <section className="catalog light-section section-shell">
        <div className="section-meta eyebrow">
          <span>PORTFÓLIO / SMART LOCAL</span>
          <span>DESIGN QUE ENCONTRA PROPÓSITO.</span>
        </div>
        <h1>
          Projetos criados
          <br />
          para serem vistos.
          <br />
          <em>E lembrados.</em>
        </h1>
        <p className="catalog-description">
          Explore experiências digitais desenvolvidas para diferentes marcas,
          negócios e objetivos.
        </p>
        <ProjectFilters
          categories={[...new Set(projects.map((project) => project.category))]}
          selected={category}
          onSelect={setCategory}
        />
        <p className="eyebrow results-count" role="status">
          {filtered.length} {filtered.length === 1 ? "PROJETO" : "PROJETOS"} /{" "}
          {category.toUpperCase()}
        </p>
        <div className="project-grid" ref={ref} key={category}>
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <PortfolioSpiral key={`motion-${category}`} target={ref} />
      </section>
    </Page>
  );
}
