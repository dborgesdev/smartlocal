import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { formMessage, whatsappUrl } from "@/lib/whatsapp";
import ContactMotion from "@/components/effects/ContactMotion";
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const description = String(data.get("description") || "").trim();
    if (name.length < 2 || description.length < 10) {
      setError(
        "Informe seu nome (ao menos 2 caracteres) e conte um pouco mais sobre o projeto (ao menos 10 caracteres).",
      );
      return;
    }
    setError("");
    window.open(
      whatsappUrl(formMessage(name, description)),
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <section
      id="contato"
      className="contact light-section section-shell"
      aria-labelledby="contact-title"
    >
      <div className="section-meta eyebrow">
        <span>05 / VAMOS CONVERSAR</span>
        <span>O PRÓXIMO PROJETO PODE SER O SEU.</span>
      </div>
      <div className="contact-heading" ref={ref}>
        <p className="contact-question" aria-hidden="true">
          Precisa de um site?
        </p>
        <h2 className="contact-answer" id="contact-title">
          Vamos tirar sua
          <br />
          ideia <em>do papel.</em>
          <ArrowUpRight aria-hidden="true" />
        </h2>
      </div>
      <ContactMotion target={ref} />
      <div className="contact-grid">
        <div>
          <h3>Pronto para construir sua presença digital?</h3>
          <p>
            Conte sobre sua empresa, seus objetivos e o projeto que você
            imagina. Vamos entender como ajudar.
          </p>
          <span className="eyebrow contact-note">
            <i className="status-dot" /> UMA BOA CONVERSA MUDA TUDO.
          </span>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="name">Como podemos chamar você?</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            required
            minLength={2}
            maxLength={100}
            aria-describedby={error ? "form-error" : undefined}
          />
          <label htmlFor="description">O que você tem em mente?</label>
          <textarea
            id="description"
            name="description"
            placeholder="Conte um pouco sobre o seu projeto…"
            rows={3}
            required
            minLength={10}
            maxLength={2000}
            aria-describedby="contact-privacy form-error"
          />
          <p id="form-error" role="alert">
            {error}
          </p>
          <div className="form-bottom">
            <p id="contact-privacy">
              A conversa continua no WhatsApp.
              <br />
              Seus dados não são armazenados neste site.
            </p>
            <button className="button button-dark" type="submit">
              Solicitar meu projeto <ArrowUpRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
