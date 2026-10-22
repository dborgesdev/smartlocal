import Page from "@/components/layout/Page";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";
export default function Home() {
  return (
    <Page
      title="Smart Local | Criação de Sites Profissionais e Lojas Virtuais"
      description="Sites institucionais, landing pages e lojas virtuais com design, desempenho e experiência sob medida. Conheça os projetos da Smart Local e solicite um orçamento."
    >
      <Hero />
      <FeaturedProjects />
      <About />
      <Services />
      <Benefits />
      <Contact />
    </Page>
  );
}
