import type { Metadata } from "next";
import AboutPage from "@/features/about/components/AboutPage";

export const metadata: Metadata = {
    title: "About",
    description:
        "A portfolio-style about page for Kim Louise Labrador and KLTL Studios, covering background, skills, education, achievements, certificates, and personal interests.",
};

export default function About() {
    return <AboutPage />;
}