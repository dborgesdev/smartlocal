import { motion } from 'framer-motion';
import { Camera, MapPin, Layout, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { use3DCard } from '@/hooks/use3DCard';
import { MessageCircle } from '@/components/ui/MessageCircle';
import { Button } from '@/components/ui/button';


const services = [
  {
    title: 'Experiência Imersiva 360°',
    category: 'Tour Interativo & Google Street View',
    description: 'Abra as portas da sua empresa 24h por dia. Permita que o cliente caminhe pelo seu espaço antes mesmo de sair de casa, eliminando objeções e gerando um desejo de visita imediato através de tecnologia imersiva de alta definição. Fotos 360° & Tour virtual interativo personalizado no seu site, redes sociais e perfil do Google.',
    icon: Camera,
    stat: '2x mais interesse gerado',
  },
  {
    title: 'Domínio das Buscas Locais',
    category: 'Estruturação do Perfil no Google',
    description: 'Não é apenas completar seu perfil, é transformá-lo na primeira opção quando o cliente buscar pelo seu serviço no Google. Estruturação e otimização completa do perfil da sua empresa no Google, com foco nas palavras-chave mais relevantes do seu nicho.',
    icon: MapPin,
    stat: '76% de visitas em 24h',
  },
  {
    title: 'Sua máquina de Vendas Digital',
    category: 'Site de Alta Conversão',
    description: 'Conecte-se com seu cliente com apenas um clique. Transforme cliques em faturamento real. Desenvolvemos sites rápidos, responsivos e persuasivos, focados 100% em levar o usuário para o seu WhatsApp ou telefone, transformando visitantes anônimos em clientes fiéis.',
    icon: Layout,
    stat: '+200% em leads qualificados',
  },
  {
    title: 'Blindagem de Autoridade Google',
    category: 'Gestão do Perfil no Google',
    description: 'Um perfil abandonado afasta clientes. Gerenciamos suas atualizações, respondemos avaliações de forma estratégica e monitoramos seus dados para blindar sua reputação e transmitir confiança máxima, autoridade e segurança em cada clique.',
    icon: ShieldCheck,
    stat: '7x mais cliques no perfil',
  },
];

function ServiceCard({ service, index, isVisible }: { 
  service: typeof services[0]; 
  index: number;
  isVisible: boolean;
}) {
  const { ref, style, onMouseMove, onMouseLeave } = use3DCard(10);
  
  // O destaque agora é ativado se houver uma estatística (stat) definida
  const isHighlighted = !!service.stat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`
        relative bg-card rounded-2xl p-8 border transition-all duration-300 cursor-pointer
        ${isHighlighted 
          ? 'border-secondary/30 shadow-lift hover:border-secondary/50' 
          : 'border-border shadow-soft hover:shadow-lift hover:border-primary/20'
        }
      `}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {service.stat}
        </div>
      )}
      
      <div className={`
        w-14 h-14 rounded-xl flex items-center justify-center mb-6
        ${isHighlighted ? 'bg-secondary/10' : 'bg-primary/5'}
      `}>
        <service.icon className={`w-7 h-7 ${isHighlighted ? 'text-secondary' : 'text-primary'}`} />
      </div>
      
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {service.category}
      </span>
      
      <h3 className="font-heading text-xl font-semibold text-foreground mt-2 mb-3">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Não vendemos marketing. </span>
            Construímos posicionamento no Google que gera decisão.
          </h2>
          <p className="text-lg text-muted-foreground">
            Estratégias validadas para destacar sua empresa e atrair mais clientes locais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a
          href="https://wa.me/5543991364545?text=Ol%C3%A1%2C%20venho%20do%20site%20e%20gostaria%20de%20saber%20qual%20a%20melhor%20estrat%C3%A9gia%20de%20crescimento%20para%20meu%20perfil"
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
            Escolher minha Estratégia
          </Button>
        </a>
      </motion.div>
    </section>
  );
}