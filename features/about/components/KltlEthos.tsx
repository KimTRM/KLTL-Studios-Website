/**
 * KltlEthos — Section 4: Philosophy
 *
 * What KLTL Studios stands for. Philosophy over branding.
 * "Ad Astra Per Aspera" lives here.
 * Symbol-first layout: a rotating sigil (diamond inside orbit ring).
 * Calm, meditative presence.
 *
 * Motion strategy:
 * - Sigil: fade-in on scroll (orbReveal variant)
 * - Heading/body: fade-up staggered
 * - Motto: late fade-in, no position shift (gravity)
 * - Sigil rotation and pulse: CSS keyframes (ambient)
 *
 * Content: heading + body from Convex.
 * The motto "Ad Astra Per Aspera" is extracted from the body if present
 * (delimited by "%%...%%"), otherwise displayed inline.
 */
"use client";

import { motion } from "framer-motion";
import { orbReveal, EASE_OUT_CUBIC } from "@/features/motion";

interface KltlEthosProps {
    heading: string;
    body: string;
}

function extractMotto(body: string): { text: string; motto: string | null } {
    const match = body.match(/%%(.+?)%%/);
    if (match) {
        return {
            text: body.replace(/%%(.+?)%%/, "").trim(),
            motto: match[1].trim(),
        };
    }
    return { text: body, motto: null };
}

export default function KltlEthos({ heading, body }: KltlEthosProps) {
    const { text, motto } = extractMotto(body);

    return (
        <section className="about-section kltl-ethos">
            <div className="about-section__inner">
                {/* Sigil — symbol-first */}
                <motion.div
                    className="ethos-sigil"
                    variants={orbReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    aria-hidden="true"
                >
                    <div className="ethos-sigil__ring ethos-sigil__ring--outer" />
                    <div className="ethos-sigil__ring" />
                    <div className="ethos-sigil__diamond" />
                </motion.div>

                <span className="kltl-ethos__label">04 — Ethos</span>

                <motion.h2
                    className="kltl-ethos__heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_CUBIC, delay: 0.1 }}
                >
                    {heading}
                </motion.h2>

                <motion.p
                    className="kltl-ethos__body"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_CUBIC, delay: 0.25 }}
                >
                    {text}
                </motion.p>

                {motto && (
                    <motion.p
                        className="ethos-motto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, ease: EASE_OUT_CUBIC, delay: 0.5 }}
                    >
                        {motto}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
