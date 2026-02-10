"use client";

import "@/features/home/css/style.css"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AboutSection() {
    const sections = useQuery(api.aboutSections.getAll);

    // Safe default while loading — mirrors original hard-coded content
    const defaultSections = [
        {
            heading: "About Me",
            body: "I'm Kim, a developer and multimedia creator. I build interactive experiences by combining my love for programming, music, and design.",
        },
    ];

    const data = sections ?? defaultSections;

    return (
        <>
            {data.map((section, idx) => (
                <section className="about" key={idx}>
                    <div className="container">
                        <h2>{section.heading}</h2>
                        <p>{section.body}</p>
                        {idx === 0 && (
                            <a href="/about" className="link">Read more →</a>
                        )}
                    </div>
                </section>
            ))}
        </>
    );
}
