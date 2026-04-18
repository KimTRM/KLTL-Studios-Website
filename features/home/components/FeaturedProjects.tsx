"use client";

import "../css/FeaturedProjects.css";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnimatedSection from "@/features/ui/AnimatedSection";
import EmptyState from "@/features/ui/EmptyState";

export default function FeaturedProjects() {
    const featuredProjects = useQuery(api.projects.queries.getFeaturedProjects);
    const allProjects = useQuery(api.projects.queries.getAllProjects);

    const defaultProjects = [
        {
            title: "Project 100",
            slug: "project-100",
            description:
                "Story-based programming RPG built with Godot. Educational game focused on interactive logic systems.",
            image: "/res/Project100_Icon.png",
            link: "/projects/project-100",
            category: "game" as const,
            technologies: ["Chip", "Chip", "Chip"],
            year: "2025",
        },
        {
            title: "KnowledgeSweeper",
            slug: "knowledgesweeper",
            description:
                "Java-based quiz game with timed challenge mechanics. Focused on logic implementation and user interaction.",
            image: "/res/KnowledgeSweeper_Icon.svg",
            link: "/projects/knowledgesweeper",
            category: "game" as const,
            technologies: ["Chip", "Chip", "Chip"],
            year: "2024",
        },
        {
            title: "Bagani: Guardians of the Archipelago",
            slug: "bagani-guardians-of-the-archipelago",
            description:
                "When natural disasters strike the islands, ancient spirits awaken and challenge players to protect the people.",
            image: "/res/coverimage.png",
            link: "/projects/bagani-guardians-of-the-archipelago",
            category: "game" as const,
            technologies: ["Chip", "Chip", "Chip"],
            year: "2024",
        },
        {
            title: "NextStep",
            slug: "nextstep",
            description:
                "Jobseeker and mentorship platform designed for students and graduates to ease the transition into careers.",
            image: "/res/DSC_1453.png",
            link: "/projects/nextstep",
            category: "web" as const,
            technologies: ["Chip", "Chip", "Chip"],
            year: "2024",
        },
    ];

    const sourceProjects =
        featuredProjects && featuredProjects.length > 0
            ? featuredProjects
            : allProjects && allProjects.length > 0
                ? allProjects
                : defaultProjects;

    const displayProjects = sourceProjects.slice(0, 4);

    const resolveHref = (project: { slug?: string; link?: string }) => {
        if (project.slug) {
            return `/projects/${project.slug}`;
        }
        if (!project.link) {
            return "#";
        }
        return project.link.startsWith("/") ? project.link : `/${project.link}`;
    };

    if (displayProjects.length === 0) {
        return (
            <section className="featuredSection" id="works" aria-label="Featured Projects">
                <p className="featuredLabel">Built Under KLTL Studios</p>
                <h2 className="featuredHeading">Featured Projects</h2>
                <EmptyState message="Featured projects coming soon." />
            </section>
        );
    }

    return (
        <section className="featuredSection" id="works" aria-label="Featured Projects">
            <AnimatedSection delay={0} duration={900}>
                <p className="featuredLabel">Built Under KLTL Studios</p>
                <h2 className="featuredHeading">Featured Projects</h2>
                <p className="featuredIntro">We design, create, and develop scalable systems that grow with intention.</p>
            </AnimatedSection>

            <div className="featuredGrid">
                {displayProjects.map((project, idx) => {
                    const href = resolveHref(project);
                    const techList =
                        "technologies" in project && Array.isArray(project.technologies) && project.technologies.length > 0
                            ? project.technologies.slice(0, 3)
                            : ["Chip", "Chip", "Chip"];
                    return (
                        <AnimatedSection key={idx} delay={idx * 150} duration={900}>
                            <Link
                                href={href}
                                className="featuredCard"
                                aria-label={`View ${project.title}`}
                            >
                                <div className="featuredImageWrap">
                                    <Image
                                        src={project.image || "/res/coverimage.png"}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="featuredImage"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                <div className="featuredContent">
                                    <h3 className="featuredTitle">{project.title}</h3>
                                    <p className="featuredDesc">{project.description}</p>
                                    <div className="featuredTech">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="techTag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </AnimatedSection>
                    );
                })}
            </div>
        </section>
    );
}
