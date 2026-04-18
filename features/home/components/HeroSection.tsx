"use client";

import "../css/HeroSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import {
    heroStagger,
    heroChild,
    orbReveal,
    orbitRingReveal,
    scrollIndicatorReveal,
} from "@/features/motion";

export default function HeroSection() {
    const hero = useQuery(api.siteMeta.queries.getHero);

    const title = hero?.title ?? "Kim Louise Labrador";
    const subtitle = hero?.subtitle ?? "Code | Design | Story";
    const motto = hero?.motto ?? "Ad Astra Per Aspera";

    return (
        <section className="hero" aria-label="Hero">
            {/* Ambient star particles — CSS keyframes only, no FM overhead */}
            <div className="starField">
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
            </div>

            {/* Celestial orb — FM scale-in reveal, CSS perpetual float */}
            <motion.div
                className="celestialOrb"
                aria-hidden="true"
                initial="hidden"
                animate="visible"
                variants={orbReveal}
            />

            {/* Orbit ring — FM fade-in, CSS perpetual spin */}
            <motion.div
                className="orbitRing"
                aria-hidden="true"
                initial="hidden"
                animate="visible"
                variants={orbitRingReveal}
            >
                <span className="orbitDot" />
            </motion.div>

            {/* Left-aligned content — staggered text entrance */}
            <motion.div
                className="heroContent"
                initial="hidden"
                animate="visible"
                variants={heroStagger}
            >
                <motion.h1 className="heroTitle" variants={heroChild}>
                    {title}
                </motion.h1>
                <motion.p className="heroFounder" variants={heroChild}>
                    Founder of KLTL Studios
                </motion.p>
                <motion.p className="heroSubtitle" variants={heroChild}>
                    {subtitle}
                </motion.p>
                <motion.p className="heroMotto" variants={heroChild}>
                    {motto}
                </motion.p>

                <motion.div className="heroActions" variants={heroChild}>
                    <a href="#works" className="heroBtnPrimary" aria-label="View my work">
                        Explore My Work
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator — late entrance */}
            <motion.div
                className="scrollIndicator"
                aria-hidden="true"
                initial="hidden"
                animate="visible"
                variants={scrollIndicatorReveal}
            >
                <span className="scrollLine" />
            </motion.div>
        </section>
    );
}
