import { motion } from 'framer-motion';
import { Clock, MousePointer, Eye, TrendingUp, Building, Search, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const algorithmSignals = [
  { icon: Clock, text: 'Maior tempo de permanência' },
  { icon: MousePointer, text: 'Mais interações reais' },
  { icon: Eye, text: 'Maior engajamento visual' },
  { icon: TrendingUp, text: 'Menor taxa de rejeição' },
];

const customerPerception = [
  { icon: Building, text: 'Conhece o ambiente antes de ir' },
  { icon: Search, text: 'Elimina dúvidas e objeções' },
  { icon: Shield, text: 'Cria confiança imediata' },
  { icon: Zap, text: 'Decide com menos resistência' },
];

export function Section360LogicSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-12 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            Por que o Google prioriza perfis com{' '}
            <span className="text-gradient">experiência 360°</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            O Google promove perfis que mantêm o usuário dentro da plataforma. Mais interação e permanência geram mais relevância local.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Algorithm Signals */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-soft"
          >
            <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
              Sinais para o Algoritmo
            </h3>
            <div className="space-y-3 md:space-y-4">
              {algorithmSignals.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Perception */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-soft"
          >
            <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
              Percepção do Cliente
            </h3>
            <div className="space-y-3 md:space-y-4">
              {customerPerception.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Perfis comuns <span className="text-muted-foreground">informam</span>.{' '}
            <span className="text-secondary">Perfis com 360° convencem.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}