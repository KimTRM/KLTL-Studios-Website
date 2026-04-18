import HeroSection from "@/features/home/components/HeroSection";
import AboutSection from "@/features/home/components/AboutSection";
import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import ContactSection from "@/features/home/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <ContactSection />
    </>
  );
}
