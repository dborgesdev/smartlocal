import { lazy, Suspense } from 'react';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { ScrollToTop } from '@/components/ScrollToTop';

// Lazy load below-the-fold sections to reduce initial JS bundle
const PainPointsSection = lazy(() => import('@/components/sections/PainPointsSection').then(m => ({ default: m.PainPointsSection })));
const DigitalFacadeSection = lazy(() => import('@/components/sections/DigitalFacadeSection').then(m => ({ default: m.DigitalFacadeSection })));
const SolutionSection = lazy(() => import('@/components/sections/SolutionSection').then(m => ({ default: m.SolutionSection })));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection').then(m => ({ default: m.ServicesSection })));
const AuthoritySection = lazy(() => import('@/components/sections/AuthoritySection'));
const Tour360Section = lazy(() => import('@/components/sections/Tour360Section').then(m => ({ default: m.Tour360Section })));
const TourPortfolioSection = lazy(() => import('@/components/sections/TourPortfolioSection').then(m => ({ default: m.TourPortfolioSection })));
const Section360LogicSection = lazy(() => import('@/components/sections/360LogicSection').then(m => ({ default: m.Section360LogicSection })));
const MarqueeReviewsSection = lazy(() => import('@/components/sections/MarqueeReviewSection').then(m => ({ default: m.MarqueeReviewsSection })));
const ProofSection = lazy(() => import('@/components/sections/ProofSection').then(m => ({ default: m.ProofSection })));
const FAQSection = lazy(() => import('@/components/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import('@/components/sections/CTASection').then(m => ({ default: m.CTASection })));
const InstagramSection = lazy(() => import('@/components/sections/InstagramSection').then(m => ({ default: m.InstagramSection })));
const Footer = lazy(() => import('@/components/sections/Footer').then(m => ({ default: m.Footer })));

// Minimal loading fallback - invisible to prevent layout shift
const SectionFallback = () => <div className="min-h-[100px]" />;

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
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
      </Suspense>
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
};

export default Index;
