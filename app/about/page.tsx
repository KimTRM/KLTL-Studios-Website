import type { Metadata } from "next";
import AboutPage from "@/features/about/components/AboutPage";

export const metadata: Metadata = {
    title: "About",
    description:
        "Who is KLTL beyond the projects? A personal narrative on creativity, systems, and the philosophy behind the work.",
};

export default function About() {
    return <AboutPage />;
}