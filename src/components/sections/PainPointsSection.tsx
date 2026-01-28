import { motion } from 'framer-motion';
import { PhoneOff, MapPinOff, EyeOff } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const painPoints = [
  {
    icon: PhoneOff,
    iconColor: 'text-[#FF6B00]',
    title: 'Ligações que você nunca recebe',
    text: 'Enquanto seu telefone não toca, o Google entrega o cliente pronto para comprar diretamente para o concorrente que aparece antes de você nas buscas locais.',
    color: 'text-muted-foreground',
  },
  {
    icon: MapPinOff,
    iconColor: 'text-[#FF6B00]',
    title: 'Vendas que vão para o concorrente',
    text: 'O cliente tem a intenção de te visitar, mas a falta de um Tour 360° e de fotos profissionais gera desconfiança, fazendo-o escolher o estabelecimento vizinho.',
    color: 'text-muted-foreground',
  },
  {
    icon: EyeOff,
    iconColor: 'text-[#FF6B00]',
    title: 'Descartado em poucos segundos',
    text: '80% dos consumidores decidem onde gastar apenas olhando o perfil no Google. Se o seu está incompleto ou amador, você é julgado e ignorado antes mesmo do primeiro "oi".',
    color: 'text-muted-foreground',
  },
];

export function PainPointsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Se sua empresa não aparece no Google,
            <span className="text-gradient"> ela não existe para o cliente.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
           Todos os dias pessoas procuram exatamente pelo que você vende. Quando sua empresa não aparece <span className='italic'>(ou aparece mal posicionada)</span> o Google entrega esses clientes para o seu concorrente.
           
           <span className="font-semibold text-foreground"> Você não perde cliques. Você perde dinheiro.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-background rounded-2xl p-8 shadow-soft border border-border hover:shadow-lift transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6">
                <point.icon className={`w-7 h-7 ${point.iconColor}`} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
