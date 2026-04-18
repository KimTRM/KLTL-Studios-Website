/**
 * OpeningStatement — Section 1: Identity
 *
 * Large typography, centered. One strong paragraph that sets the tone.
 * Visual anchor: MoonOrb pulsing above the text.
 * Slow fade-in + rise animation using Framer Motion.
 *
 * Motion strategy:
 * - MoonOrb fades in with scale (orbReveal)
 * - Heading: staggered word reveal (MotionText)
 * - Body: gentle fade-up with delay
 *
 * Content comes from Convex aboutSections (heading + body).
 * Falls back to thematic defaults while loading.
 */
"use client";

import AnimatedSection from "@/features/ui/AnimatedSection";
import MoonOrb from "./MoonOrb";
import { splitIntoParagraphs } from "./text";

interface OpeningStatementProps {
    heading: string;
    body: string;
}

export default function OpeningStatement({ heading, body }: OpeningStatementProps) {
    const paragraphs = splitIntoParagraphs(body);

    return (
        <AnimatedSection
            as="section"
            className="about-section about-section--full opening-statement"
            direction="up"
            duration={800}
        >
            <div className="about-section__inner">
                <MoonOrb />

                <span className="opening-statement__label">01 — Identity</span>

                <h1 className="opening-statement__heading">{heading}</h1>
                <div className="opening-statement__body">
                    {paragraphs.map((paragraph, idx) => (
                        <p key={`${idx}-${paragraph.slice(0, 20)}`}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
