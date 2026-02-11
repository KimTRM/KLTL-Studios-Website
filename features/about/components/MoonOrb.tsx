/**
 * MoonOrb — Celestial visual anchor
 *
 * A radial-gradient sphere with expanding orbit rings.
 * Used as a meditative focal point in the opening statement.
 * All animation is CSS-only (ambient, non-interactive).
 *
 * WHY: Symbols > stock photos. The moon represents quiet presence,
 *      cycles of creation, and the nocturnal identity of KLTL.
 */
"use client";

import { motion } from "framer-motion";
import { orbReveal, orbitRingReveal } from "@/features/motion";

export default function MoonOrb() {
    return (
        <motion.div
            className="moon-orb"
            variants={orbReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            aria-hidden="true"
        >
            <div className="moon-orb__halo" />
            <div className="moon-orb__core" />
            <motion.div
                className="moon-orb__ring moon-orb__ring--1"
                variants={orbitRingReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            />
            <motion.div
                className="moon-orb__ring moon-orb__ring--2"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            />
            <motion.div
                className="moon-orb__ring moon-orb__ring--3"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            />
        </motion.div>
    );
}
