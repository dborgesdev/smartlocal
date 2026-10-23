import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { projectMessage, whatsappUrl } from "@/lib/whatsapp";
import Page from "@/components/layout/Page";
import ProjectViewer from "@/components/portfolio/ProjectViewer";
import NextProject from "@/components/portfolio/NextProject";
import NotFound from "./NotFound";
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <Page
      title={`${project.title} | Portfólio Smart Local`}
      description={`Conheça a apresentação do projeto ${project.title} no portfólio da Smart Local. Design e desenvolvimento web.`}
      image={project.media.desktopPoster || undefined}
    >
      <section className="case-page section-shell">
        <Link className="text-link back-link" to="/projetos">
          <ArrowLeft size={17} />
          Voltar para projetos
        </Link>
        <div className="case-title">
          <div>
            <p className="eyebrow">
              {String(project.order).padStart(2, "0")} /{" "}
              {project.category.toUpperCase()}
            </p>
            <h1>{project.title}</h1>
          </div>
          <span className="case-star" aria-hidden="true">
            ✳
          </span>
        </div>
        <ProjectViewer key={project.slug} project={project} />
        <div className="case-info" id="detalhes-do-projeto">
          <h2>
            Uma presença.
            <br />
            <em>Uma identidade.</em>
          </h2>
          <dl>
            <div>
              <dt>Segmento</dt>
              <dd>{project.segment}</dd>
            </div>
            <div>
              <dt>Tipo de projeto</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Apresentação</dt>
              <dd>
                {project.summary ||
                  "Explore as capturas desktop e mobile para conhecer a composição visual e a navegação do projeto."}
              </dd>
            </div>
          </dl>
        </div>
        <div className="case-cta">
          <a
            className="button button-coral"
            href={whatsappUrl(projectMessage(project.title))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero um projeto assim <ArrowUpRight size={18} />
          </a>
          {project.websiteVerified && project.website && (
            <a
              className="text-link"
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver site ao vivo <ArrowUpRight size={18} />
            </a>
          )}
        </div>
        <NextProject project={next} />
      </section>
    </Page>
  );
}
