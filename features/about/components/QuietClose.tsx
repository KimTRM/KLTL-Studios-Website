/**
 * QuietClose — Section 5: Closing meditation
 *
 * A short closing line. No CTA pressure.
 * Leaves space for reflection — heavy padding, dim typography.
 * A thin horizontal divider fades in below.
 *
 * Motion strategy:
 * - Text: slow fade-in only (no position shift — gravity)
 * - Divider: delayed fade-in
 * - Everything moves like an exhale
 *
 * Content: heading is ignored (or used as aria-label).
 * Body is the closing line.
 */
"use client";

import { motion } from "framer-motion";
import { EASE_OUT_CUBIC } from "@/features/motion";

interface QuietCloseProps {
    heading: string;
    body: string;
}

export default function QuietClose({ heading, body }: QuietCloseProps) {
    return (
        <section className="about-section quiet-close" aria-label={heading}>
            <div className="about-section__inner">
                <motion.p
                    className="quiet-close__text"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.4, ease: EASE_OUT_CUBIC }}
                >
                    {body}
                </motion.p>

                <motion.div
                    className="quiet-close__divider"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, ease: EASE_OUT_CUBIC, delay: 0.6 }}
                    aria-hidden="true"
                />

                <motion.span
                    className="quiet-close__symbol"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 1 }}
                    aria-hidden="true"
                >
                    ✦
                </motion.span>
            </div>
        </section>
    );
}
