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

import { motion } from "framer-motion";
import { EASE_OUT_CUBIC } from "@/features/motion";
import MoonOrb from "./MoonOrb";
import MotionText from "@/features/ui/MotionText";

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

                <MotionText
                    text={heading}
                    as="h1"
                    className="opening-statement__heading"
                    stagger={0.08}
                    threshold={0.3}
                />

                <motion.p
                    className="opening-statement__body"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: EASE_OUT_CUBIC, delay: 0.4 }}
                >
                    {body}
                </motion.p>
            </div>
        </section>
    );
}
