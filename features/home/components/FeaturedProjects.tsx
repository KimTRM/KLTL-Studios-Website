"use client";

import "../css/FeaturedProjects.css";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AnimatedSection from "@/features/ui/AnimatedSection";
import SectionHeader from "@/features/ui/SectionHeader";
import EmptyState from "@/features/ui/EmptyState";
import { cardHover, EASE_OUT_CUBIC } from "@/features/motion";

export default function FeaturedProjects() {
    const featuredProjects = useQuery(api.projects.queries.getFeaturedProjects);

    const defaultProjects = [
        {
            title: "Project 100",
            slug: "Project100",
            description:
                "An educational RPG that teaches programming through block-based puzzles.",
            image: "/res/Project100_Icon.svg",
            link: "projects/Project100",
            category: "game" as const,
            technologies: ["Godot", "GDScript"],
            year: "2025",
        },
        {
            title: "KnowledgeSweeper",
            slug: "KnowledgeSweeper",
            description: "Minesweeper with a twist — a quiz to keep your life.",
            image: "/res/KnowledgeSweeper_Icon.svg",
            link: "projects/KnowledgeSweeper",
            category: "game" as const,
            technologies: ["Godot", "GDScript"],
            year: "2024",
        },
    ];

    const projects = featuredProjects ?? defaultProjects;
    const displayProjects = projects.slice(0, 3);

    if (displayProjects.length === 0) {
        return (
            <section className="featuredSection" id="works" aria-label="Featured Projects">
                <SectionHeader label="02" heading="Selected Work" />
                <EmptyState message="Featured projects coming soon." />
            </section>
        );
    }

    return (
        <section className="featuredSection" id="works" aria-label="Featured Projects">
            <AnimatedSection delay={0} duration={900}>
                <SectionHeader
                    label="02"
                    heading="Selected Work"
                    sub="A curated selection of projects that define my craft."
                />
            </AnimatedSection>

            <div className="featuredGrid">
                {displayProjects.map((project, idx) => {
                    const href =
                        "slug" in project
                            ? `/projects/${project.slug}`
                            : "link" in project
                                ? (project as { link: string }).link
                                : "#";
                    const isReverse = idx % 2 !== 0;

                    const MotionLink = motion.create(Link);

                    return (
                        <AnimatedSection key={idx} delay={idx * 150} duration={900}>
                            <MotionLink
                                href={href}
                                className={
                                    isReverse ? "featuredCard featuredCardReverse" : "featuredCard"
                                }
                                aria-label={`View ${project.title}`}
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                variants={cardHover}
                            >
                                <div className="featuredImageWrap">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="featuredImage"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                <div className="featuredContent">
                                    {"category" in project && project.category && (
                                        <span className="featuredCategory">{project.category}</span>
                                    )}
                                    <h3 className="featuredTitle">{project.title}</h3>
                                    <p className="featuredDesc">{project.description}</p>

                                    {"technologies" in project &&
                                        project.technologies &&
                                        project.technologies.length > 0 && (
                                            <div className="featuredTech">
                                                {project.technologies.slice(0, 4).map((tech, i) => (
                                                    <span key={i} className="techTag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                    {"year" in project && project.year && (
                                        <span className="featuredYear">{project.year}</span>
                                    )}
                                </div>

                                <span className="featuredArrow" aria-hidden="true">
                                    <FiArrowRight />
                                </span>
                            </MotionLink>
                        </AnimatedSection>
                    );
                })}
            </div>
        </section>
    );
}
