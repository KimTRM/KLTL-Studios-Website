import HeroSection from "@/features/home/components/HeroSection";
import AboutSection from "@/features/home/components/AboutSection";
import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import { FeaturedProjects as NewFeaturedProjects } from "@/features/home/components/NewFeaturedProjects";
import ContactSection from "@/features/home/components/ContactSection";
import { Intro } from "@/features/home/css/Intro";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <AboutSection /> */}
      <Intro />
      {/* <FeaturedProjects /> */}
      <NewFeaturedProjects />
      <ContactSection />
    </>
  );
}
