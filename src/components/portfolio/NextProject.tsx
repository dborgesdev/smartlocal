import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
export default function NextProject({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link className="next-project" to={`/projetos/${project.slug}`}>
      <div className="next-thumbnail">
        {project.media.desktopPoster && !failed ? (
          <img
            src={project.media.desktopPoster}
            alt={`Página inicial de ${project.title}`}
            width={1280}
            height={800}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="eyebrow">
            SMART LOCAL
            <br />
            {project.category}
          </span>
        )}
      </div>
      <div className="next-project-copy">
        <span className="eyebrow">PRÓXIMO PROJETO</span>
        <span>{project.title}</span>
      </div>
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}
