import Preloader from '@/components/public/Preloader';
import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import StatsSection from '@/components/public/StatsSection';
import AboutSection from '@/components/public/AboutSection';
import RoomsSection from '@/components/public/RoomsSection';
import FacilitiesSection from '@/components/public/FacilitiesSection';
import DiningSection from '@/components/public/DiningSection';
import GallerySection from '@/components/public/GallerySection';
import TestimonialsSection from '@/components/public/TestimonialsSection';
import FaqSection from '@/components/public/FaqSection';
import Footer from '@/components/public/Footer';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Home() {
  return (
    <main className="bg-[#faf0e6] text-stone-800 font-sans antialiased overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">
      <Preloader />
      <ScrollReveal />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <RoomsSection />
      <FacilitiesSection />
      <DiningSection />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
