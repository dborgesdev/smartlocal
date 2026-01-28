import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Aparece após 400px de scroll
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          // Posicionamento centralizado e Estilo Vazado (Outline)
          className="fixed bottom-6 left-6 -translate-x-1/2 z-[60] 
                     group flex flex-col items-center gap-2 outline-none"
          aria-label="Voltar ao topo"
        >
          {/* Círculo Vazado Azul */}
          <div className="p-3 rounded-full border-2 border-[#003B5C] bg-background/70 hover:border-white
                          hover:bg-[#003B5C]/70 transition-all duration-300 
                          shadow-[0_0_15px_rgba(0,59,92,0.2)] group-hover:shadow-[0_0_20px_rgba(0,59,92,0.4)]">
            <ArrowUp className="w-6 h-6 text-[#003B5C] hover:text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </div>

          {/* Texto "TOPO" vazado/sutil */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-70 group-hover:opacity-100 transition-opacity">
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}