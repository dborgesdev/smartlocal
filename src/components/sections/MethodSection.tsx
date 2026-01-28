import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    text: 'Análise profunda da sua presença digital atual e dos concorrentes locais.',
  },
  {
    number: '02',
    title: 'Produção & Ajuste',
    text: 'Sessão de fotos 360°, criação do tour virtual, criação de site e otimização técnica do perfil.',
  },
  {
    number: '03',
    title: 'Dominância',
    text: 'Publicação, indexação e estratégias recorrentes de alavancagem de tráfego.',
  },
];

export function MethodSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="metodo" className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Método Smart Local
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Number Circle */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-background border-4 border-secondary flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-secondary">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/5543991364545?text=Olá,%20gostaria%20de%20agendar%20um%20diagnóstico%20gratuito."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link" className="text-secondary hover:text-secondary-hover text-lg gap-2">
              Agendar Diagnóstico Gratuito
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
