import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ProfileComparison } from '@/components/ProfileComparison';
import { MessageCircle } from '@/components/ui/MessageCircle';
import { Button } from '@/components/ui/button';

export function DigitalFacadeSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-12 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            O cliente decide em segundos{' '}
            <span className="text-gradient">quem merece confiança.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Antes de ligar ou visitar, o cliente analisa posição no Google, avaliações, fotos e estrutura digital. Se o perfil transmite abandono ou amadorismo, ele escolhe outro.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <ProfileComparison isVisible={isVisible} />
        </div>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            >
            <a
                href="https://wa.me/5543991364545?text=Ol%C3%A1%2C%20venho%20do%20site%20e%20gostaria%20de%20Parar%20de%20perder%20clientes%20para%20a%20concorr%C3%AAncia"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button 
                  size='lg'
                  className="bg-secondary hover:bg-secondary-hover text-white px-10 py-7 rounded-xl font-bold text-lg 
                    transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]
                    hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1
                    flex items-center gap-3 mx-auto"
                  aria-label='Parar de Perder Clientes'
                >
                <MessageCircle className="w-6 h-6" />
                Parar de Perder Clientes
                </Button>
            </a>
        </motion.div>
      </div>
    </section>
  );
}