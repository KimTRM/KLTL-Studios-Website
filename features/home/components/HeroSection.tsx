"use client";

import "../css/style.css"
import "../css/HeroSection.css"
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HeroSection() {
    const hero = useQuery(api.siteMeta.getHero);

    // Use Convex data with safe defaults while loading
    const title = hero?.title ?? "Kim Louise Labrador";
    const subtitle = hero?.subtitle ?? "Developer · Designer · Musician";
    const motto = hero?.motto ?? "Ad Astra Per Aspera";
    const image = hero?.image ?? "/res/DSC_1453.png";

    return (
        <>
            <section className="hero">
                <div className="containerh">
                    <div className="hero-circle">
                        <Image src={image} alt="Hero Image" width={300} height={300} className="hero-image" />
                    </div>
                    <h1><b>{title}</b></h1>
                    <p className="tagline">{subtitle}</p>
                    <p className="tagline">{motto}</p>
                    <div className="hero-buttons">
                        <a href="#portfolio" className="btn" aria-label="View my portfolio projects">View Portfolio</a>
                        <a href="#contact" className="btn-outline" aria-label="Contact me via form or email">Contact Me</a>
                    </div>
                </div>
            </section>
        </>
    );
}
