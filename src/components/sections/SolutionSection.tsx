import { motion } from 'framer-motion';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import SolutionImg from '@/assets/performance_perfil_google.webp';

const stats = [
  { value: 24, suffix: 'h', label: 'Vendas Automáticas' },
  { value: 360, suffix: '°', label: 'Visão Completa' },
  { value: 100, suffix: '%', label: 'Otimizado' },
];

function StatCard({ value, suffix, label, isVisible, delay }: { 
  value: number; 
  suffix: string; 
  label: string; 
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(value, 2000, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-2">
        {count}{suffix}
      </div>
      <p className="text-white/70">{label}</p>
    </motion.div>
  );
}

export function SolutionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id='solucoes' className="py-24 gradient-primary relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lift">
              <img
                src={SolutionImg}
                alt="Smartphone mostrando mapa e busca local"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 glass-dark rounded-xl p-4 shadow-lift"
            >
              <p className="text-white font-semibold">Perfil 100%</p>
              <p className="text-white/60 text-sm">Otimizado</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="text-white">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-secondary font-semibold uppercase tracking-wider mb-4"
            >
              A Solução Smart
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Transformamos seu Perfil em uma{' '}
              <span className="text-secondary">Máquina de Vendas</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 mb-10 leading-relaxed"
            >
              Através de tecnologia de ponta e conhecimento do algoritmo local, 
              criamos um ecossistema onde sua empresa é a autoridade indiscutível no nicho.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  isVisible={isVisible}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
