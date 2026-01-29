import { motion } from 'framer-motion';
import { lazy, Suspense, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import TourPublicado from '@/assets/print-360-publicadas.webp';
import AntesDepois from '@/assets/antes-depois-perfil-google.webp';
import MetricasPerfil from '@/assets/print-metricas-perfil-google.webp';

// Lazy load carousel to prevent forced reflow on initial page load
const Carousel = lazy(() => import('@/components/ui/carousel').then(m => ({ default: m.Carousel })));
const CarouselContent = lazy(() => import('@/components/ui/carousel').then(m => ({ default: m.CarouselContent })));
const CarouselItem = lazy(() => import('@/components/ui/carousel').then(m => ({ default: m.CarouselItem })));
const CarouselNext = lazy(() => import('@/components/ui/carousel').then(m => ({ default: m.CarouselNext })));
const CarouselPrevious = lazy(() => import('@/components/ui/carousel').then(m => ({ default: m.CarouselPrevious })));
const proofItems = [
  {
    type: 'result',
    title: 'Tour 360° Publicado',
    description: 'Ambiente completo visível no Google Maps',
    image: TourPublicado,
  },
  {
    type: 'before-after',
    title: 'Antes vs Depois',
    description: 'Transformação completa do perfil',
    image: AntesDepois,
  },
  {
    type: 'stats',
    title: 'Métricas Reais',
    description: '+200% em visualizações do perfil',
    image: MetricasPerfil,
  },
];

// Fallback for carousel while loading
const CarouselFallback = () => (
  <div className="w-full max-w-sm mx-auto">
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4" />
        <div className="h-5 bg-muted rounded w-3/4 mb-2" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </CardContent>
    </Card>
  </div>
);

export function ProofSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
   // Delay carousel mount to prevent forced reflow from embla measuring DOM synchronously
  const [shouldMountCarousel, setShouldMountCarousel] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldMountCarousel) {
      // Use requestAnimationFrame to defer carousel mount to next paint cycle
      const rafId = requestAnimationFrame(() => {
        setShouldMountCarousel(true);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [isVisible, shouldMountCarousel]);

  return (
    <section className="py-12 md:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Resultados</span> no Google
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            O Google valoriza quem prende a atenção do usuário.
          </p>
        </motion.div>

         {/* Mobile Carousel - Deferred mount to prevent forced reflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden"
           style={{ 
            contain: 'layout style paint',
            contentVisibility: 'auto',
            containIntrinsicSize: '0 400px'
          }}
        >
          {shouldMountCarousel ? (
            <Suspense fallback={<CarouselFallback />}>
              <Carousel className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {proofItems.map((item, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-border">
                        <CardContent className="p-4">
                          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.description} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                          </div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </Suspense>
          ) : (
            <CarouselFallback />
          )}
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {proofItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border-border h-full hover:shadow-lift transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.description} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}