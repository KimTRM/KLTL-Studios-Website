"use client";

import Image from "next/image";
import "../css/StudioSection.css";
import { RiLightbulbLine, RiCodeSSlashLine, RiMusic2Line, RiPencilRuler2Line } from "react-icons/ri";
import AnimatedSection from "@/features/ui/AnimatedSection";
import FloatingIcon from "@/features/ui/FloatingIcon";
import MotionText from "@/features/ui/MotionText";
import { fadeOnly } from "@/features/motion";

const VALUES = [
    { icon: <RiCodeSSlashLine />, label: "Craft" },
    { icon: <RiPencilRuler2Line />, label: "Design" },
    { icon: <RiMusic2Line />, label: "Sound" },
    { icon: <RiLightbulbLine />, label: "Intent" },
];

export default function StudioSection() {
    return (
        <section className="studioSection" aria-label="KLTL Studios">
            <div className="studioInner">
                {/* Symbol */}
                <AnimatedSection delay={0} duration={1000}>
                    <div className="studioSymbol">
                        <div className="studioSymbolRing" />
                        <div className="studioSymbolInner">
                            <Image
                                src="/res/icon/KLTL-Studios-Logo.svg"
                                alt="KLTL Studios"
                                width={520}
                                height={120}
                                style={{ width: 550, height: "auto" }}
                            />
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={150} duration={900}>
                    <span className="studioName">KLTL Studios</span>
                </AnimatedSection>

                <MotionText
                    text="A one-person studio where code meets creativity. Every project is built with intention — designed to be felt, not just seen. No noise, no fluff. Just craft, purpose, and the quiet discipline behind meaningful work."
                    as="p"
                    className="studioManifesto"
                    stagger={0.03}
                />

                <div className="studioLine" aria-hidden="true" />

                {/* Values */}
                <AnimatedSection delay={500} duration={800}>
                    <div className="studioValues">
                        {VALUES.map((v) => (
                            <div key={v.label} className="studioValue">
                                <FloatingIcon glowColor="rgba(220, 20, 60, 0.3)">
                                    <span className="studioValueIcon">{v.icon}</span>
                                </FloatingIcon>
                                <span className="studioValueLabel">{v.label}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
