import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SmokeCursor = lazy(() => import("@/components/effects/SmokeCursor"));
export default function Site() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <Suspense
        fallback={
          <main className="loading-screen" aria-busy="true">
            Preparando a experiência…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/projetos/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Suspense fallback={null}>
        <SmokeCursor />
      </Suspense>
    </>
  );
}
