import AboutSection from "@/features/about/components/AboutSection";
import ContactForm from "@/features/home/components/ContactForm";
import HeroSection from "@/features/home/components/HeroSection";
import ProjectsSection from "@/features/projects/components/ProjectsSection";
import ServicesSection from "@/features/skills/components/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactForm />
    </>
  );
}
