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

                <h2 className="creative-duality__heading">{heading}</h2>
                <p className="creative-duality__body">{body}</p>

                <div className="duality-grid">
                    {DOMAINS.map((d) => (
                        <div key={d.label} className="duality-node">
                            <span className="duality-node__icon" aria-hidden="true">
                                {d.icon}
                            </span>
                            <span className="duality-node__label">{d.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
