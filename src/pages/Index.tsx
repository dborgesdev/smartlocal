import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { DigitalFacadeSection } from '@/components/sections/DigitalFacadeSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import AuthoritySection from '@/components/sections/AuthoritySection';
import { Tour360Section } from '@/components/sections/Tour360Section';
import { TourPortfolioSection } from '@/components/sections/TourPortfolioSection';
import { Section360LogicSection } from '@/components/sections/360LogicSection';
import { MarqueeReviewsSection } from '@/components/sections/MarqueeReviewSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/next"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PainPointsSection />
      <DigitalFacadeSection />
      <SolutionSection />
      <ServicesSection />
      <AuthoritySection />  
      <Tour360Section />
      <TourPortfolioSection />
      <Section360LogicSection />
      <MarqueeReviewsSection />
      <ProofSection />
      <FAQSection />
      <CTASection />
      <InstagramSection />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <SpeedInsights />
    </div>
  );
};

export default Index;
