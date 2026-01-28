import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from '@/components/ui/MessageCircle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logo from '@/assets/logo-smart-local.png';

const navLinks = [
  { label: 'Soluções', target: '#solucoes' },
  { label: 'Portfólio 360°', target: '#tour360' },
  { label: 'Resultados', target: '#resultados' },
  { label: 'FAQ', target: '#faq' },
  { label: 'Instagram', target: '#instagram' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Smart Local - Lupa com Gráfico de Crescimento" 
            className="h-16 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollToSection(link.target)}
              className={`font-medium transition-colors hover:text-secondary ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/5543991364545"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
        >
          <Button
            variant="outline"
            className={'gap-2 transition-all border-primary text-primary hover:bg-primary hover:text-primary-foreground'}
            // className={`gap-2 transition-all ${
            //   isScrolled
            //     ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            //     : 'border-white text-white hover:bg-white hover:text-primary'
            // }`}
          >
            <MessageCircle className="w-4 h-4" />
            Fale no WhatsApp
          </Button>
        </a>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={isScrolled ? 'text-foreground' : 'text-white'}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-card">
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-lg font-medium text-foreground hover:text-secondary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wa.me/5543991364545"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white">
                  <MessageCircle className="w-4 h-4" />
                  Fale no WhatsApp
                </Button>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
