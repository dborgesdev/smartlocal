import { motion } from 'framer-motion';
import { Eye, BarChart3, Phone, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stats = [
  {
    label: 'Visualizações no Perfil',
    value: '+ Views',
    icon: Eye,
    description: 'Aumento da visibilidade local',
  },
  {
    label: 'Cliques no Site',
    value: '+ Cliques',
    icon: BarChart3,
    description: 'Vendas ativas dia e noite',
  },
  {
    label: 'Ligações e WhatsApp',
    value: '+ Contatos',
    icon: Phone,
    description: 'Atraia clientes interessados',
  },
  {
    label: 'Solicitações de Rota',
    value: '+ Visitas',
    icon: MapPin,
    description: 'Clientes chegando até você',
  },
];

const AuthoritySection = () => {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <section className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Convertemos buscas digitais em 
            <span className="text-gradient"> visitas reais.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-8 animate-fade-up animation-delay-${(index + 1) * 100}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <p className="text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;