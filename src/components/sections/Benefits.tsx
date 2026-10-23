import { useRef } from "react";
import OpticalGlassCard from "@/components/effects/OpticalGlassCard";
import BenefitsMotion from "@/components/effects/BenefitsMotion";
const benefits = [
  [
    "Identidade de verdade",
    "Uma presença visual pensada para o seu negócio, com personalidade em cada detalhe.",
  ],
  [
    "Em qualquer tela",
    "Uma experiência consistente, do celular ao desktop. Seu site acompanha seu público.",
  ],
  [
    "Clareza para avançar",
    "Escopo, prioridades e condições definidos em conversa antes de começar.",
  ],
  [
    "Espaço para crescer",
    "Tecnologia e integrações de acordo com o momento e as necessidades da sua empresa.",
  ],
];
export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section
      id="beneficios"
      className="benefits section-shell"
      aria-labelledby="benefits-title"
    >
      <div className="section-meta eyebrow">
        <span>MAIS QUE APARÊNCIA</span>
        <span>O DETALHE FAZ A DIFERENÇA.</span>
      </div>
      <h2 id="benefits-title">
        Grandes ideias merecem
        <br />
        uma execução <em>à altura.</em>
      </h2>
      <div className="benefits-track" ref={ref}>
        {benefits.map(([title, description], index) => (
          <OpticalGlassCard index={index} key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </OpticalGlassCard>
        ))}
      </div>
      <BenefitsMotion target={ref} />
    </section>
  );
}
