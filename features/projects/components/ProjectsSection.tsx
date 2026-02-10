"use client";

import "../css/ProjectSection.css";
import ProjectCard from "./ProjectCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProjectsSection() {
    const featuredProjects = useQuery(api.projects.getFeaturedProjects);

    // Safe defaults — mirrors original hard-coded featured projects
    const defaultProjects = [
        {
            title: "Project 100",
            description: "An educational RPG that teaches programming through block-based puzzles.",
            image: "/res/Project100_Icon.svg",
            link: "projects/Project100",
        },
        {
            title: "KnowledgeSweeper",
            description: "Minesweeper but it has a twist, a quiz to keep your life",
            image: "/res/KnowledgeSweeper_Icon.svg",
            link: "projects/KnowledgeSweeper",
        },
        {
            title: "Website Clone Redesign",
            description: "A website clone redesign for Senate of the Philippines - 19th Congress",
            image: "/res/icon/KLTL_Studios.svg",
            link: "/Clone-Redesign/index.html",
        },
    ];

    const projects = featuredProjects ?? defaultProjects;

    return (
        <>
            <section id="portfolio" className="projects">
                <div className="container">
                    <h2>My Projects</h2>

                    <div className="project-grid">
                        {projects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                link={project.link}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
