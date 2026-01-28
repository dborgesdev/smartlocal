import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Star, MapPin, Clock, Phone, Image } from 'lucide-react';

interface ProfileComparisonProps {
  isVisible: boolean;
}

export function ProfileComparison({ isVisible }: ProfileComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
      {/* Common Profile */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative bg-muted/50 rounded-2xl p-5 md:p-6 border border-border"
      >
        <div className="absolute -top-3 left-4 bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
          Perfil Comum
        </div>
        
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Sem fotos profissionais</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Horários e informações desatualizados</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Sem interação com o cliente</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Avaliações sem resposta</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Descrição genérica</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Categorias mal definidas</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm">Sem vitrine de produtos</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4 opacity-30" />
            <Star className="w-4 h-4 opacity-30" />
            <span className="text-xs ml-2">3.2 (12 avaliações)</span>
          </div>
        </div>
      </motion.div>

      {/* Optimized Profile */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative bg-secondary/5 rounded-2xl p-5 md:p-6 border-2 border-secondary/30 shadow-lift"
      >
        <div className="absolute -top-3 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          Perfil Otimizado
        </div>
        
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Fotos e Tour 360° (Street View)</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Informações 100% atualizadas</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Postagens e Atualizações semanais</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Respostas com palavras-chave estratégicas</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">SEO Local otimizado</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Categorias e Atributos específicos</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Catálogo de Produtos e Serviços ativo</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-secondary/20">
          <div className="flex items-center gap-1 text-secondary">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs ml-2 text-foreground font-medium">4.9 (87 avaliações)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}