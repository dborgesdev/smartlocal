import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react'; // Removido Instagram daqui
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

interface InstagramPost {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption?: string;
  sizes?: {
    medium?: {
      mediaUrl: string;
    };
  };
}

export function InstagramSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://feeds.behold.so/xCzwLEHFwgYikbBkmG9T');
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();
        
        if (data && data.posts) {
          setPosts(data.posts.slice(0, 6));
        }
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-24 bg-muted/30" ref={ref} id="instagram">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Usando o novo componente de ícone */}
            <InstagramIcon className="w-8 h-8 text-[#003B5C]" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Acompanhe a Smart Local
            </h2>
          </div>
          <a
            href="https://www.instagram.com/smartlocal.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FF6B00] hover:underline font-semibold"
          >
            @smartlocal.com.br
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Grid de Postagens com Proporção 4:3 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-[#FF6B00] animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse font-medium">Buscando fotos recentes...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground mb-4 font-medium">Não conseguimos carregar o feed agora.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl group bg-white shadow-md border border-black/5"
              >
                <img
                  src={post.sizes?.medium?.mediaUrl || post.mediaUrl}
                  alt={post.caption || "Post Smart Local"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <InstagramIcon className="w-8 h-8" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ver Post</span>
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </div>

         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/smartlocal.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 text-white gap-2 px-10 py-7 text-lg transition-all shadow-x"
              aria-label='Seguir no Instagram'
            >
              <InstagramIcon className="w-8 h-8" />
              Seguir no Instagram
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}