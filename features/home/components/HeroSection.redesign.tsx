"use client";

import "../css/HeroSection.redesign.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HeroSection() {
    const hero = useQuery(api.siteMeta.queries.getHero);

    const title = hero?.title ?? "Kim Louise Labrador";
    const subtitle = hero?.subtitle ?? "Developer · Designer · Musician";
    const motto = hero?.motto ?? "Ad Astra Per Aspera";

    return (
        <section className="hero" aria-label="Hero">
            {/* Ambient star particles */}
            <div className="starField">
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
                <span className="star" />
            </div>

            {/* Celestial orb (moon) */}
            <div className="celestialOrb" aria-hidden="true" />
            <div className="orbitRing" aria-hidden="true">
                <span className="orbitDot" />
            </div>

            {/* Left-aligned content */}
            <div className="heroContent">
                <span className="heroLabel">KLTL Studios</span>
                <h1 className="heroTitle">{title}</h1>
                <p className="heroSubtitle">{subtitle}</p>
                <p className="heroMotto">&ldquo;{motto}&rdquo;</p>

                <div className="heroActions">
                    <a href="#works" className="heroBtnPrimary" aria-label="View my work">
                        View Work
                    </a>
                    <a href="/about" className="heroBtnSecondary" aria-label="Learn more about me">
                        About
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scrollIndicator" aria-hidden="true">
                <span className="scrollLine" />
            </div>
        </section>
    );
}
