import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Page from "@/components/layout/Page";
export default function NotFound() {
  return (
    <Page
      title="Página não encontrada | Smart Local"
      description="Esta página não foi encontrada. Conheça os projetos da Smart Local."
      notFound
    >
      <section className="not-found section-shell">
        <span className="error-number" aria-hidden="true">
          404<span className="coral">↗</span>
        </span>
        <h1>
          Fora do roteiro.
          <br />
          <em>Vamos voltar?</em>
        </h1>
        <p>
          Esta página não está por aqui. Há boas ideias esperando por você no
          início.
        </p>
        <Link className="button button-coral" to="/">
          Voltar ao início <ArrowUpRight size={18} />
        </Link>
      </section>
    </Page>
  );
}
