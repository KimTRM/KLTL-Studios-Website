import AboutSection from "./home/sections/AboutSection";
import ContactForm from "./home/components/ContactForm";
import HeroSection from "./home/sections/HeroSection";
import ProjectsSection from "./home/sections/ProjectsSection";
import ServicesSection from "./home/sections/ServicesSection";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <ContactForm />
    </>
  );
}
