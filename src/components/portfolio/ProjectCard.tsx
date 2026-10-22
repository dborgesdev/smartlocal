import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
export default function ProjectCard({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <article
      className="project-card"
      style={{ "--project-color": project.color } as CSSProperties}
    >
      <Link to={`/projetos/${project.slug}`} className="project-link">
        <div className="project-art">
          {project.media.desktopPoster && !failed ? (
            <img
              src={project.media.desktopPoster}
              alt={`Página inicial de ${project.title}`}
              width="1280"
              height="800"
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="editorial-cover">
              <span className="eyebrow">SELEÇÃO SMART LOCAL</span>
              <strong>{project.title}</strong>
              <span>{project.category}</span>
            </div>
          )}
          <span className="project-open" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
        <div className="project-caption">
          <div>
            <h3>{project.title}</h3>
            <span>{project.category}</span>
          </div>
          <span className="project-number">
            {String(project.order).padStart(2, "0")} /
          </span>
        </div>
      </Link>
    </article>
  );
}
