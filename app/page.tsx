import HeroSection from "@/features/home/components/HeroSection";
import AboutSection from "@/features/home/components/AboutSection";
import FeaturedProjects from "@/features/home/components/FeaturedProjects";
import WorksArchive from "@/features/home/components/WorksArchive";
import StudioSection from "@/features/home/components/StudioSection";
import ContactSection from "@/features/home/components/ContactSection";
import SectionDivider from "@/features/home/components/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="line" />
      <AboutSection />
      <SectionDivider variant="dots" />
      <FeaturedProjects />
      <SectionDivider variant="glow" />
      <WorksArchive />
      <SectionDivider variant="arc" />
      <StudioSection />
      <SectionDivider variant="drop" />
      <ContactSection />
    </>
  );
}
