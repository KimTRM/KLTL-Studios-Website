"use client"
import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import GridContainer from "./GridContainer";
import "../css/ProjectSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type ProjectCategory = "all" | "game" | "web" | "design" | "multimedia";

const FILTER_OPTIONS: Array<{ label: string; value: ProjectCategory }> = [
    { label: "All", value: "all" },
    { label: "Game Development", value: "game" },
    { label: "Web/App", value: "web" },
    { label: "UI/UX", value: "design" },
    { label: "Multimedia", value: "multimedia" },
];

export default function ProjectsWithFilter() {
    const allProjects = useQuery(api.projects.queries.getAllProjects);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");

    // Safe default while loading
    const projects = allProjects ?? [];

    const getProjectCategory = (
        project: (typeof projects)[number],
    ): Exclude<ProjectCategory, "all"> => {
        const title = project.title.toLowerCase();
        const description = project.description.toLowerCase();
        const explicitCategory = project.category?.toLowerCase();

        if (
            explicitCategory === "game" ||
            title.includes("game") ||
            description.includes("game") ||
            description.includes("godot")
        ) {
            return "game";
        }

        if (
            explicitCategory === "web" ||
            title.includes("website") ||
            title.includes("web") ||
            description.includes("website") ||
            description.includes("web app")
        ) {
            return "web";
        }

        if (
            explicitCategory === "design" ||
            title.includes("design") ||
            description.includes("design") ||
            description.includes("ui") ||
            description.includes("ux")
        ) {
            return "design";
        }

        if (
            title.includes("audio") ||
            title.includes("video") ||
            title.includes("music") ||
            description.includes("audio") ||
            description.includes("video") ||
            description.includes("multimedia") ||
            description.includes("sound")
        ) {
            return "multimedia";
        }

        return "web";
    };

    const normalizedProjects = useMemo(() => {
        return projects.map((project) => {
            const category = getProjectCategory(project);
            const tags =
                project.tags && project.tags.length > 0
                    ? project.tags
                    : project.technologies && project.technologies.length > 0
                        ? project.technologies
                        : [FILTER_OPTIONS.find((option) => option.value === category)?.label ?? "Project"];

            return {
                slug: project.slug,
                title: project.title,
                description: project.description,
                image: project.image,
                category,
                tags,
            };
        });
    }, [projects]);

    // Filter projects based on search and category
    const filteredProjects = useMemo(() => {
        return normalizedProjects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());

            if (selectedFilter === "all") {
                return matchesSearch;
            }

            return matchesSearch && project.category === selectedFilter;
        });
    }, [normalizedProjects, searchTerm, selectedFilter]);

    if (allProjects === undefined) {
        return (
            <section id="portfolio" className="projects" aria-busy="true" aria-label="Loading projects">
                <div className="container">
                    <div className="project-skeleton-heading">
                        <div className="project-skeleton-line project-skeleton-label" />
                        <div className="project-skeleton-line project-skeleton-title" />
                        <div className="project-skeleton-line project-skeleton-subtitle" />
                    </div>

                    <div className="project-toolbar project-skeleton-toolbar">
                        <div className="project-skeleton-search" />
                        <div className="project-skeleton-filters">
                            <div className="project-skeleton-pill" />
                            <div className="project-skeleton-pill" />
                            <div className="project-skeleton-pill" />
                        </div>
                    </div>

                    <div className="project-grid project-skeleton-grid">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <article key={index} className="project-skeleton-card">
                                <div className="project-skeleton-image" />
                                <div className="project-skeleton-line project-skeleton-card-title" />
                                <div className="project-skeleton-line project-skeleton-card-line" />
                                <div className="project-skeleton-line project-skeleton-card-line project-skeleton-card-line-short" />
                                <div className="project-skeleton-tags">
                                    <div className="project-skeleton-pill project-skeleton-pill-small" />
                                    <div className="project-skeleton-pill project-skeleton-pill-small" />
                                    <div className="project-skeleton-pill project-skeleton-pill-small" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="projects">
            <div className="container">
                <header className="projects-header">
                    <p className="projects-eyebrow">Projects</p>
                    <h2>Selected Work</h2>
                    <p className="projects-intro">
                        A focused collection of games, web products, interface design, and multimedia work.
                    </p>
                </header>

                <div className="project-controls">
                    <div className="project-toolbar">
                        <FilterBar
                            options={FILTER_OPTIONS}
                            activeValue={selectedFilter}
                            onChange={(value) => setSelectedFilter(value as ProjectCategory)}
                        />

                        <input
                            type="text"
                            placeholder="Search projects"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="project-search"
                            aria-label="Search projects by name or description"
                        />
                    </div>
                </div>

                {/* Results Count */}
                {projects.length > 0 && (
                    <p className="project-results">
                        {filteredProjects.length} of {projects.length} projects
                    </p>
                )}

                {/* Project Grid */}
                <GridContainer>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                slug={project.slug}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                tags={project.tags}
                            />
                        ))
                    ) : projects.length === 0 ? (
                        <p className="project-empty project-empty-none">
                            No projects here yet — check back soon.
                        </p>
                    ) : (
                        <p className="project-empty project-empty-no-match">
                            No matches found. Try a different search.
                        </p>
                    )}
                </GridContainer>
            </div>
        </section>
    );
}
