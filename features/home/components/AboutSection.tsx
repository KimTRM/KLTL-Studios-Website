"use client";

import "../css/AboutSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnimatedSection from "@/features/ui/AnimatedSection";
import { FiCode, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";

const STATS = [
    { icon: <FiCode />, value: "10+", label: "Projects Built" },
    { icon: <FiTrendingUp />, value: "6+ Years", label: "Programming and Problem Solving" },
    { icon: <FiUsers />, value: "4+ Years", label: "Game Development and Interactive Design" },
    { icon: <FiZap />, value: "24/7", label: "Independent Creator" },
];

export default function AboutSectionRedesign() {
    const sections = useQuery(api.about.queries.getAll);

    const defaultSections = [
        {
            heading: "About Me",
            body: "I build games, systems, and digital experiences that combine logic with storytelling. I am currently studying Computer Science, but most of my growth has come from building real projects - experimenting, failing, refining, and shipping. KLTL Studios is the space where I merge engineering, design, and emotion into one cohesive vision.",
        },
    ];

    const data = sections && sections.length > 0 ? sections : defaultSections;
    const primary = data[0];

    return (
        <section className="aboutSection" id="about" aria-label="About">
            <div className="aboutInner">
                <AnimatedSection delay={0} duration={750}>
                    <p className="aboutLabel">{primary.heading}</p>
                    <h2 className="aboutHeading">Hi, I&apos;m Kim Louise Labrador</h2>
                    <p className="aboutBody">{primary.body}</p>
                </AnimatedSection>

                <div className="aboutStats" aria-label="Experience highlights">
                    {STATS.map((stat, idx) => (
                        <AnimatedSection key={stat.value + stat.label} delay={idx * 80} duration={650}>
                            <article className="aboutStatCard">
                                <span className="aboutStatIcon" aria-hidden="true">
                                    {stat.icon}
                                </span>
                                <p className="aboutStatValue">{stat.value}</p>
                                <p className="aboutStatLabel">{stat.label}</p>
                            </article>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
