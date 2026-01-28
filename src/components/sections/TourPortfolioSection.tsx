import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, PlayCircle } from 'lucide-react'; // Ícones úteis
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { MessageCircle } from '@/components/ui/MessageCircle';
import Icon360 from '@/assets/logo-360.svg';
import ThumbGaviaozinho from '@/assets/logo-portfolio-360/gaviaozinho-farm.webp';
import ThumbAliancaPodologia from '@/assets/logo-portfolio-360/alianca-podologia.webp';
import ThumbSerjaoBrasas from '@/assets/logo-portfolio-360/serjao-brasas.webp';
import ThumbGaraperiaDonaOnca from '@/assets/logo-portfolio-360/garaperia-dona-onca.webp';


// --- DADOS DO PORTFÓLIO (FÁCIL MANUTENÇÃO) ---
const TOUR_ITEMS = [
  {
    id: 1,
    title: "Gaviãozinho Farm",
    thumb: ThumbGaviaozinho,
    iframeUrl: "https://tour3d.gaviaozinhofarm.com.br/"
  },
  {
    id: 2,
    title: "Aliança Podologia",
    thumb: ThumbAliancaPodologia,
    iframeUrl: "https://www.google.com/maps/embed?pb=!4v1769549388174!6m8!1m7!1sCAoSHENJQUJJaEJLeHZjVUtnODVIUlF6Y3RxLVhhdDE.!2m2!1d-23.36303603367588!2d-51.15768833354529!3f335.5504602766684!4f4.980122459449888!5f0.7820865974627469"
  },
  {
    id: 3,
    title: "Serjão Brasa's",
    thumb: ThumbSerjaoBrasas,
    iframeUrl: "https://www.google.com/maps/embed?pb=!4v1769553417745!6m8!1m7!1sCAoSHENJQUJJaEFrY0tKOFlzdnRFcmZsSWJKRjBEOVc.!2m2!1d-23.32190816477643!2d-51.17677667662088!3f214.37776132390562!4f-8.705633441635257!5f0.7820865974627469"
  },
  {
    id: 4,
    title: "Garaperia Dona Onça",
    thumb: ThumbGaraperiaDonaOnca,
    iframeUrl: "https://www.google.com/maps/embed?pb=!4v1769553489006!6m8!1m7!1sCAoSHENJQUJJaEJYZGdOMkc1eGlWRGRMSEFqLWZReEg.!2m2!1d-23.36631817629782!2d-51.14146331113646!3f140!4f0!5f0.7820865974627469"
  },
  // Para adicionar mais, basta copiar e colar um bloco acima
];

export function TourPortfolioSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [selectedTour, setSelectedTour] = useState<typeof TOUR_ITEMS[0] | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Função para abrir o tour e resetar o loading do iframe
  const handleOpenTour = (tour: typeof TOUR_ITEMS[0]) => {
    setIframeLoading(true);
    setSelectedTour(tour);
  };

  return (
    <section className="pt-8 pb-24 bg-white relative" ref={ref} id="portfolio-360">
        <div className="container mx-auto px-4">
            {/* Cabeçalho da Seção */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
            <div className="flex items-center justify-center gap-3 mb-4">
                {/* Ícone decorativo do título (opcional, usando o SVG 360 pequeno) */}
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Portfólio Imersivo
                </h2>
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Explore alguns dos ambientes que transformamos com a tecnologia de Tour Virtual.
                <span className="font-semibold text-foreground"> Clique para interagir.</span>
            </p>
            </motion.div>

            {/* Grid de Cards - Ajuste automático (Mobile 1, Tablet 2, Desktop 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TOUR_ITEMS.map((item, index) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer perspective"
                onClick={() => handleOpenTour(item)}
                >
                <div className="
                    relative w-full aspect-square rounded-2xl overflow-hidden
                    bg-gray-100
                    transition-all duration-500 ease-out
                    border border-transparent
                    shadow-[0_0_15px_rgba(0,59,92,0.15)]
                    hover:shadow-[0_0_25px_rgba(255,107,0,0.5)]
                    hover:border-[#FF6B00]/50
                    hover:-translate-y-2
                ">
                    {/* Imagem de Fundo (Thumbnail) */}
                    <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay Escuro + Conteúdo Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                    
                    {/* Container do Logo e Texto */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-3">
                        
                        {/* Logo 360 SVG */}
                        <img 
                        src={Icon360} 
                        alt="Ícone 360" 
                        className="w-16 h-16 drop-shadow-lg filter brightness-0 invert" 
                        />
                        
                        <span className="text-white font-bold uppercase tracking-widest text-sm border-b-2 border-[#FF6B00] pb-1">
                        Ver Tour
                        </span>
                    </div>
                    </div>

                    {/* Título do Card (Sempre visível ou apenas hover? Aqui deixei fixo embaixo para mobile) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center font-medium truncate">{item.title}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 pt-2 bg-gradient-to-t from-black/80 to-transparent md:opacity-0 ">
                    <p className="text-white text-center font-medium truncate">Ver o Tour Virtual
                        <img 
                            src={Icon360} 
                            alt="Ícone 360" 
                            className="inline w-11 h-11 drop-shadow-lg filter brightness-0 invert ml-2 mb-1" 
                        />
                    </p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>

      {/* --- MODAL POP-UP (IFRAME) --- */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedTour(null)} // Fecha ao clicar fora
          >
            {/* Botão Fechar */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-[#FF6B00] transition-colors z-50 bg-black/50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTour(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Container do Iframe */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no vídeo
              className="relative w-full max-w-5xl max-h-[97dvh] aspect-[9/16] md:aspect-video bg-[#0B1121] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Loading State */}
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-0">
                  <Loader2 className="w-10 h-10 animate-spin text-[#FF6B00] mb-4" />
                  <p className="text-sm text-gray-400">Carregando ambiente 360°...</p>
                </div>
              )}

              {/* Iframe */}
              <iframe
                src={selectedTour.iframeUrl}
                title={selectedTour.title}
                className="absolute inset-0 w-full h-full z-10"
                allowFullScreen
                loading="lazy"
                onLoad={() => setIframeLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a
          href="https://wa.me/5543991364545?text=Ol%C3%A1%2C%20venho%20do%20site%20e%20gostaria%20de%20ter%20a%20imers%C3%A3o%20360%C2%B0%20no%20meu%20neg%C3%B3cio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button 
            size='lg'
            className="bg-secondary hover:bg-secondary-hover text-white px-10 py-7 rounded-xl font-bold text-lg 
              transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]
              hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1
              flex items-center gap-3 mx-auto mt-16"
            >
            <MessageCircle className="w-6 h-6" />
            Quero a Imersão 360°
          </Button>
        </a>
      </motion.div>
    </section>
  );
}