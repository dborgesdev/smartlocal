import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MessageCircle } from '@/components/ui/MessageCircle';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Hide tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-full mr-3 bottom-1/2 translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-card text-foreground px-4 py-2 rounded-lg shadow-lift border border-border relative">
                  <span className="font-medium">Olá! Posso analisar seu <br />perfil do Google agora?</span>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-card" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="https://wa.me/5543991364545?text=Olá,%20preciso%20de%20ajuda%20com%20o%20Google%20da%20minha%20empresa."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-16 h-16 bg-whatsapp hover:bg-whatsapp-dark rounded-full shadow-lift transition-all duration-300 hover:scale-110"
            onMouseEnter={() => setShowTooltip(true)}
          >
            <MessageCircle className="w-8 h-8 text-white" />
            
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-25" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
