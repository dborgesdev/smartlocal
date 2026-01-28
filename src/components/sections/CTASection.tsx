import { motion } from 'framer-motion';
import { MessageCircle } from '@/components/ui/MessageCircle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 gradient-primary relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Descubra por que seu concorrente <span className="text-gradient">aparece antes de você no Google.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            Solicite uma análise gratuita e veja exatamente o que está impedindo seu perfil de gerar clientes.
            <span className="italic"> Não deixe seu cliente ir para o concorrente.</span>
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="https://wa.me/5543991364545?text=Ol%C3%A1%2C%20venho%20do%20site%20e%20gostaria%20de%20solicitar%20o%20diagn%C3%B3stico%20gratuito%20do%20meu%20perfil."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size='lg'
                className="bg-secondary hover:bg-secondary-hover text-white px-10 py-7 rounded-xl font-bold text-lg 
                  transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]
                  hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1
                  flex items-center gap-3 mx-auto"
              >
                <MessageCircle className="w-6 h-6" />
                Solicitar Diagnóstico Gratuito
              </Button>
            </a>
            <p
              className="text-xs md:text-sm text-white/70 mt-2 text-center font-medium"
            >
              Análise técnica real. Sem compromisso.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
