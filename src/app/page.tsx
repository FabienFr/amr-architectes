import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import ServicesSection from "./components/ServicesSection";
import CallToActionSection from "./components/CallToActionSection";
import AboutSection from "./components/AboutSection";
import FeasibilityStudySection from "./components/FeasibilityStudySection";
import ProcessSection from "./components/ProcessSection";
import WhyArchitectSection from "./components/WhyArchitectSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FooterSection from "./components/FooterSection";
import GallerySection from "./components/GallerySection";
export default function Page() {
  return (
    // Note: Next.js App Router utilise <main> par défaut dans le layout racine.
    // Envelopper dans un Fragment <>...</> est bien ici, car chaque section
    // est sémantiquement indépendante. Si vous aviez un conteneur global
    // pour la page, vous le mettriez ici ou dans le layout.
    <>
      <HeroSection />
      <ValuesSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <FeasibilityStudySection />
      <CallToActionSection />
      <ProcessSection />
      <WhyArchitectSection />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
