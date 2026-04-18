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

import MoonOrb from "./MoonOrb";

interface OpeningStatementProps {
    heading: string;
    body: string;
}

export default function OpeningStatement({ heading, body }: OpeningStatementProps) {
    return (
        <section className="about-section about-section--full opening-statement">
            <div className="about-section__inner">
                <MoonOrb />

                <span className="opening-statement__label">01 — Identity</span>

                <h1 className="opening-statement__heading">{heading}</h1>
                <p className="opening-statement__body">{body}</p>
            </div>
        </section>
    );
}
