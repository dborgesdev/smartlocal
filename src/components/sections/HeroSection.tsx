import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from '@/components/ui/MessageCircle';

// Use public path for LCP image - makes it discoverable in initial HTML for better performance
const heroBG = 'assets/hero-background.webp';

export function HeroSection() {
    return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
       {/* Background - Using img tag for better LCP optimization */}
      <div className="absolute inset-0 z-0 border-b border-white">
       <img
          src={heroBG}
          alt=""
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-left"
          width={1920}
          height={1080}
        />
          <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-secondary/20 text-white border-secondary/30 mb-6 py-2 px-4 backdrop-blur-sm">
              🏆 Especialista em SEO Local, Google & Tour Virtual
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
          >
            Enquanto seu concorrente aparece no Google,{' '}
            <span className="text-gradient font-extrabold">você perde clientes todos os dias.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed drop-shadow-md"
          >
            Transforme as buscas no Google em clientes qualificados na sua porta. 
            Aumente suas vendas dominando o Google com estratégias personalizadas de SEO Local.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm md:text-base text-secondary font-medium mb-6 md:mb-8 bg-black/20 inline-block px-3 py-1 rounded-lg backdrop-blur-md"
          >
            Não é tráfego. Não é curtida. É cliente local pronto para comprar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div>
              <a
                href="https://wa.me/5543991364545?text=Ol%C3%A1%2C%20venho%20do%20site%20e%20gostaria%20de%20solicitar%20o%20diagn%C3%B3stico%20gratuito%20do%20meu%20perfil."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary-hover text-white text-lg px-8 py-6 pulse-glow w-full sm:w-auto shadow-xl"
                  aria-label='Solicitar diagnóstico gratuito de SEO Local'
                >
                  <MessageCircle className="w-6 h-6" />
                  Solicitar Diagnóstico Gratuito
                </Button>
              </a>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xs md:text-sm text-white/70 mt-2 text-center font-medium"
              >
                Análise técnica real. Sem compromisso.
              </motion.p>
            </div>
            <a href="#tour360">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-primary hover:bg-white/10 text-lg px-8 py-6 gap-2 w-full sm:w-auto backdrop-blur-sm"
                aria-label='Ver portfólio de Tour Virtual 360 graus'
              >
                Ver Experiência 360°
                <ArrowDown className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          // className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 z-20"
          className='mb-8 z-20'
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm mx-auto">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>

        {/* Floating Cards - Adicionei backdrop-blur para destacar do vídeo */}
        {/* <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:block absolute right-12 top-1/3"
        >
          <div className="glass-dark rounded-2xl p-5 shadow-lift float backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Top 3 no Google</p>
                <p className="text-white/60 text-sm">Resultados orgânicos</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden lg:block absolute right-32 bottom-1/4"
        >
          <div className="glass-dark rounded-2xl p-5 shadow-lift float-delayed backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">+300% Visibilidade</p>
                <p className="text-white/60 text-sm">Média dos clientes</p>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--card))"
          />
        </svg>
      </div>
    </section>
  );
}