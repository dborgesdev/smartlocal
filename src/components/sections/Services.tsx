import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";
export default function Services() {
  return (
    <section
      id="servicos"
      className="services light-section section-shell"
      aria-labelledby="services-title"
    >
      <div className="section-meta eyebrow">
        <span>O QUE PODEMOS CRIAR</span>
        <span>SEU PRÓXIMO CAPÍTULO COMEÇA AQUI.</span>
      </div>
      <div className="services-intro">
        <h2 id="services-title">
          A sua ideia.
          <br />
          Na sua <em>melhor forma.</em>
        </h2>
        <p>
          Do primeiro clique à experiência completa.
          <br />
          Escolha o ponto de partida. Construímos o caminho com você.
        </p>
      </div>
      <div className="services-list">
        {services.map((service, index) => (
          <a
            className="service-row"
            key={service.title}
            href={whatsappUrl(service.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Solicitar orçamento: ${service.title}`}
          >
            <span className="eyebrow">0{index + 1}</span>
            <div>
              <span className="eyebrow service-tag">{service.tag}</span>
              <h3>{service.title}</h3>
            </div>
            <p>{service.description}</p>
            <ArrowUpRight className="service-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
      <a
        className="text-link"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Vamos conversar sobre seu projeto <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
