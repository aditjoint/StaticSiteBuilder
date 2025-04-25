import { useEffect } from 'react';
import { useScrollSnap } from '../hooks/use-scroll-snap';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import ContactSection from '@/components/sections/contact-section';
import LegalSection from '@/components/sections/legal-section';

export default function HomePage() {
  const { registerSection } = useScrollSnap({
    threshold: 0.4,
  });

  // Apply scroll-snap styling to the body
  useEffect(() => {
    // Add scroll snap styles
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollSnapType = 'y mandatory';
    
    // Cleanup function to remove styles when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.documentElement.style.scrollSnapType = '';
    };
  }, []);

  // Determine which section to show based on hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-neutral-100 text-secondary">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection ref={registerSection(0)} />
        <AboutSection ref={registerSection(1)} />
        <ServicesSection ref={registerSection(2)} />
        <ContactSection ref={registerSection(3)} />
        <LegalSection ref={registerSection(4)} />
      </main>
      
      <Footer />
    </div>
  );
}
