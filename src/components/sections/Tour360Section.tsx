import videoBg from '@/assets/hero-section-bg.mp4';
import videoBgCover from '@/assets/hero-section-bg-cover.webp';
import { useEffect, useRef } from 'react';
import icon360 from '@/assets/logo-360.svg';

export function Tour360Section() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
      if (videoRef.current) {
        // 3. Defina a velocidade (0.5 = metade, 0.75 = 75%, 1.0 = normal)
        videoRef.current.playbackRate = 0.5; 
      }
    }, []);

  return (
    <section 
      className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden"
      id="tour360"
    >
      {/* Background Area */}
      <div className="absolute inset-0 z-0 border-b border-white">
        
        {/* VÍDEO DE FUNDO */}
        <video
          ref={videoRef} // 4. Conecte a referência ao vídeo
          autoPlay
          loop
          muted
          playsInline
          poster={videoBgCover} // Imagem que aparece enquanto o vídeo carrega
          className="absolute inset-0 w-full h-full object-cover border-b border-white"
        >
          {/* Exemplo de vídeo de business/tech. 
              Para produção, recomendo baixar o arquivo e colocar na pasta public, ex: src="/hero-bg.mp4" */}
          <source 
            src={videoBg} 
            type="video/mp4" 
          />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="absolute inset-0 gradient-hero" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Sua marca merece ser vista <span className='text-gradient'>em alta definição.</span>
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Veja nossa tecnologia 360° em ação. Experiência imersiva que coloca seu cliente dentro do seu negócio sem sair de casa.
        </p>
        <div className='mt-12'>
          <img 
            src={icon360}
            alt="Tour 360°" 
            className="h-16 w-auto mb-4 invert mx-auto"
          />
        </div>
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
