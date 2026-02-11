"use client";

import "@/features/home/css/style.css"
import SkillsGroup from "./SkillsGroup";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const defaultSkills = [
    { title: "Game Development", description: "Godot, Unity, C#, Java, GDScript" },
    { title: "Web Development", description: "Django, Python, React, HTML, CSS, TypeScript, JavaScript, PHP, MySQL, PostgresSQL" },
    { title: "UI/UX Design", description: "Figma, Photoshop" },
    { title: "Music & Sound", description: "Original compositions, soundtracks" },
    { title: "Media Creation", description: "Photography & Videography" },
];

export default function ServicesSection() {
    const skills = useQuery(api.skills.queries.getAll);

    const data = skills ?? defaultSkills;

    return (
        <>
            <section className="services">
                <div className="container">
                    <h2>What I Do</h2>
                    <div className="services-grid">
                        {data.map((skill, idx) => (
                            <SkillsGroup
                                key={idx}
                                title={skill.title}
                                description={skill.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
