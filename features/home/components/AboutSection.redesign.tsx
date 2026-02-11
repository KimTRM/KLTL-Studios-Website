"use client";

import "../css/AboutSection.redesign.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/features/ui/AnimatedSection";
import SectionHeader from "@/features/ui/SectionHeader";

export default function AboutSectionRedesign() {
    const sections = useQuery(api.about.queries.getAll);

    const defaultSections = [
        {
            heading: "About Me",
            body: "I'm Kim — a developer, designer, and musician who builds interactive experiences at the intersection of code and creativity. I believe in craft over clutter, intention over noise.",
        },
    ];

    const data = sections && sections.length > 0 ? sections : defaultSections;
    const primary = data[0];

    return (
        <section className="aboutSection" id="about" aria-label="About">
            <div className="aboutInner">
                {/* Visual anchor */}
                <AnimatedSection
                    className="aboutVisual"
                    direction="left"
                    delay={200}
                    duration={1000}
                >
                    <div className="aboutGlyph">
                        <RiCompassDiscoverLine className="aboutGlyphIcon" />
                    </div>
                </AnimatedSection>

                {/* Text */}
                <div className="aboutText">
                    <AnimatedSection delay={0} duration={900}>
                        <div className="aboutAccent" />
                        <SectionHeader
                            label="01"
                            heading={primary.heading}
                        />
                    </AnimatedSection>

                    <AnimatedSection delay={200} duration={900}>
                        <p className="aboutBody">{primary.body}</p>
                    </AnimatedSection>

                    <AnimatedSection delay={400} duration={900}>
                        <a href="/about" className="aboutLink">
                            Read more <FiArrowRight />
                        </a>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
