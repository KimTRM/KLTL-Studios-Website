/**
 * CreativeDuality — Section 2: Code × Design × Music × Systems
 *
 * Shows how different creative domains coexist in KLTL's work.
 * Uses react-icons rendered inside FloatingIcon for hover micro-interactions.
 * Minimal copy — let icons speak. Labels are monospace, uppercase.
 *
 * Motion strategy:
 * - Section heading: fade-up
 * - Body text: fade-up with stagger delay
 * - Icon grid: staggered children (staggerContainer + staggerChild)
 * - Individual icons: scale + glow on hover (FloatingIcon)
 *
 * Content: heading + body from Convex. Icons are fixed (not CMS) because
 * they represent structural identity, not changeable content.
 */
"use client";

import { motion } from "framer-motion";
import {
    staggerContainer,
    staggerChild,
    EASE_OUT_CUBIC,
} from "@/features/motion";
import FloatingIcon from "@/features/ui/FloatingIcon";
import {
    RiCodeSSlashLine,
    RiPaletteLine,
    RiMusicLine,
    RiGridLine,
    RiGamepadLine,
    RiCameraLine,
} from "react-icons/ri";

interface CreativeDualityProps {
    heading: string;
    body: string;
}

const DOMAINS = [
    { icon: <RiCodeSSlashLine />, label: "Code" },
    { icon: <RiPaletteLine />, label: "Design" },
    { icon: <RiMusicLine />, label: "Music" },
    { icon: <RiGridLine />, label: "Systems" },
    { icon: <RiGamepadLine />, label: "Games" },
    { icon: <RiCameraLine />, label: "Stories" },
];

export default function CreativeDuality({ heading, body }: CreativeDualityProps) {
    return (
        <section className="about-section creative-duality">
            <div className="about-section__inner about-section__inner--wide">
                <span className="creative-duality__label">02 — Craft</span>

                <motion.h2
                    className="creative-duality__heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_CUBIC }}
                >
                    {heading}
                </motion.h2>

                <motion.p
                    className="creative-duality__body"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_CUBIC, delay: 0.15 }}
                >
                    {body}
                </motion.p>

                <motion.div
                    className="duality-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {DOMAINS.map((d) => (
                        <motion.div
                            key={d.label}
                            className="duality-node"
                            variants={staggerChild}
                        >
                            <FloatingIcon
                                className="duality-node__icon"
                                glowColor="rgba(232, 228, 223, 0.25)"
                                style={{ fontSize: "1.8rem" }}
                            >
                                {d.icon}
                            </FloatingIcon>
                            <span className="duality-node__label">{d.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
