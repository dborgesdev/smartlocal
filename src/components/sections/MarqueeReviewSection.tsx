import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
// Importação dos dados e da interface
import { CLIENTS, Client } from '@/constants/clientList';

// --- COMPONENTE DO CARD INDIVIDUAL ---
const ReviewCard = ({ client }: { client: Client }) => (
  <div className="
    flex-shrink-0 w-[300px] mx-3 p-5 rounded-2xl 
    bg-white/5 border border-white/10 backdrop-blur-sm
    hover:bg-white/10 hover:border-secondary/30 transition-all duration-300
    group cursor-default
  ">
    <div className="flex items-center gap-4 mb-4">
      {/* Logo com fallback para Iniciais se a imagem falhar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
        {client.logoUrl ? (
          <img 
            src={client.logoUrl} 
            alt={client.name} 
            className="h-10 w-10 object-contain brightness-0 invert opacity-90"
            onError={(e) => {
              // Se a imagem falhar (404), esconde ela e deixa o fundo com as iniciais
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.innerText = client.initials;
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <span>{client.initials}</span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-base leading-tight truncate" title={client.name}>
          {client.name}
        </h3>
        <p className="text-white/50 text-xs flex items-center gap-1 mt-1 truncate">
          <span className="truncate">{client.category}</span>
        </p>
      </div>
    </div>

    <div className="h-px w-full bg-white/10 mb-4" />

    <div className="flex justify-between items-center">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
        ))}
      </div>
      <div className="flex items-center gap-1 text-xs text-white/40">
        <MapPin className="w-3 h-3" />
        {client.location}
      </div>
    </div>
  </div>
);

export function MarqueeReviewsSection() {
  return (
    <section id='resultados' className="py-20 gradient-primary overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-3xl mx-auto px-4 mb-16 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
          Nossos Parceiros
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white">
          Negócios que transformaram <span className="text-gradient">presença em vendas</span>
        </h2>
        <p className="text-white/60">
          Junte-se às empresas que transformaram sua presença digital em uma máquina de vendas com a Smart Local.
        </p>
      </div>

      {/* --- CARROSSEL 1 (Direita -> Esquerda) --- */}
      <div className="flex relative z-10 mb-8 overflow-hidden mask-gradient-sides">
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60, // Aumentei a velocidade levemente para ficar mais fluido
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <ReviewCard key={`row1-${client.id}-${index}`} client={client} />
          ))}
        </motion.div>
      </div>

      {/* --- CARROSSEL 2 (Esquerda -> Direita) --- */}
      <div className="flex relative z-10 overflow-hidden mask-gradient-sides">
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 65,
          }}
        >
          {/* Reordenando para não ficar igual ao carrossel de cima */}
          {[...CLIENTS.reverse(), ...CLIENTS].map((client, index) => (
            <ReviewCard key={`row2-${client.id}-${index}`} client={client} />
          ))}
        </motion.div>
      </div>
      
      <style>{`
        .mask-gradient-sides {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}