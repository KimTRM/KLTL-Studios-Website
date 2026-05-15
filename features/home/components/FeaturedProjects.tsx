"use client";

import "../css/FeaturedProjects.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnimatedSection from "@/features/ui/AnimatedSection";
import EmptyState from "@/features/ui/EmptyState";
import ProjectCard from "@/features/projects/components/ProjectCard";
import type { Project } from "@/features/projects/types";

type FeaturedProjectSource = {
    id?: string;
    slug?: string;
    title: string;
    description?: string;
    image?: string;
    imageUrl?: string;
    link?: string;
    category?: string;
    tags?: string[];
    technologies?: string[];
    year?: string;
    summary?: string;
    subtitle?: string;
    overview?: string;
};

function toProject(project: FeaturedProjectSource): Project {
    const categoryMap: Record<string, Project["category"]> = {
        game: "Game Dev",
        web: "Web Dev",
        design: "UI/UX",
        other: "Creative",
    };

    const techStack = project.tags ?? project.technologies ?? [project.category ?? "Project"];
    const summary = project.summary ?? project.subtitle ?? project.description ?? project.overview ?? "";

    return {
        id: project.id ?? project.slug ?? project.title,
        slug: project.slug ?? "",
        title: project.title,
        summary,
        description: {
            problem: summary,
            solution: summary,
            result: summary,
        },
        category: categoryMap[project.category ?? ""] ?? "Creative",
        techStack,
        imageUrl: project.imageUrl ?? project.image ?? "/res/coverimage.png",
        year: project.year ?? "",
    };
}

export default function FeaturedProjects() {
    const featuredProjects = useQuery(api.projects.queries.getFeaturedProjects);
    const allProjects = useQuery(api.projects.queries.getAllProjects);

    const defaultProjects: FeaturedProjectSource[] = [
        {
            title: "Project 100",
            slug: "project-100",
            description:
                "Story-based programming RPG built with Godot. Educational game focused on interactive logic systems.",
            image: "/res/Project100_Icon.png",
            link: "/projects/project-100",
            category: "game" as const,
            tags: ["Godot", "GDScript", "RPG"],
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
            tags: ["Java", "Quiz", "Logic"],
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
            tags: ["Narrative", "Strategy", "Myth"],
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
            tags: ["React", "Mentorship", "UI/UX"],
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
                    return (
                        <AnimatedSection key={idx} delay={idx * 150} duration={900}>
                            <ProjectCard project={toProject(project)} />
                        </AnimatedSection>
                    );
                })}
            </div>
        </section>
    );
}
