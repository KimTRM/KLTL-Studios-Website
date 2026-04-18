/**
 * MotionText — Staggered text reveal component.
 *
 * Splits heading/paragraph text into individually animated spans.
 * Each word fades in and rises slightly in sequence.
 *
 * WHY: A staggered text reveal guides the reader's eye and adds
 *      a sense of intentional unveiling — like a curtain drawing back.
 *      It reinforces the KLTL identity of purposeful, crafted expression.
 *
 * Performance: Only opacity + translateY are animated (GPU-composited).
 *              Uses Framer Motion's whileInView with viewport: once.
 */
"use client";

import { motion } from "framer-motion";
import { staggerChild } from "@/features/motion";
import type { CSSProperties } from "react";

interface MotionTextProps {
    text: string;
    /** HTML tag for the container */
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    className?: string;
    style?: CSSProperties;
    /** Stagger delay between words (seconds) */
    stagger?: number;
    /** Intersection threshold (0-1) */
    threshold?: number;
}

export default function MotionText({
    text,
    as: Tag = "p",
    className = "",
    style,
    stagger = 0.06,
    threshold = 0.3,
}: MotionTextProps) {
    const MotionTag = motion.create(Tag);
    const words = text.split(" ");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: 0.05,
            },
        },
    };

    return (
        <MotionTag
            className={className}
            style={{ ...style, overflow: "hidden" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={containerVariants}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={staggerChild}
                    style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                    {word}
                </motion.span>
            ))}
        </MotionTag>
    );
}
