"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import ProjectCard from "./ProjectCard";
import { motion } from "motion/react";
import FilterBar from "./FilterBar";
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

    const projects = allProjects ?? [];

    const getProjectCategory = (
        project: (typeof projects)[number],
    ): Exclude<ProjectCategory, "all"> => {
        const title = String((project as any).title ?? "").toLowerCase();
        const projectDescription = String((project as any).description ?? "").toLowerCase();
        const explicitCategory = (project.category as string | undefined)?.toLowerCase();

        if (
            explicitCategory === "game" ||
            title.includes("game") ||
            projectDescription.includes("game") ||
            projectDescription.includes("godot")
        ) {
            return "game";
        }

        if (
            explicitCategory === "web" ||
            title.includes("website") ||
            title.includes("web") ||
            projectDescription.includes("website") ||
            projectDescription.includes("web app")
        ) {
            return "web";
        }

        if (
            explicitCategory === "design" ||
            title.includes("design") ||
            projectDescription.includes("design") ||
            projectDescription.includes("ui") ||
            projectDescription.includes("ux")
        ) {
            return "design";
        }

        if (
            title.includes("audio") ||
            title.includes("video") ||
            title.includes("music") ||
            projectDescription.includes("audio") ||
            projectDescription.includes("video") ||
            projectDescription.includes("multimedia") ||
            projectDescription.includes("sound")
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

            const mappedCategory =
                category === "game"
                    ? "Game Dev"
                    : category === "web"
                        ? "Web Dev"
                        : category === "design"
                            ? "UI/UX"
                            : "Creative";

            return {
                id: (project as any).id ?? project._id ?? project.slug,
                slug: project.slug,
                title: project.title,
                summary: (project as any).summary ?? project.subtitle ?? project.description ?? "",
                description: {
                    problem: project.description ?? "",
                    solution: (project as any).solution ?? "",
                    result: (project as any).result ?? "",
                },
                imageUrl: project.image,
                category: mappedCategory as "Game Dev" | "Web Dev" | "UI/UX" | "Creative",
                techStack: project.technologies && project.technologies.length > 0 ? project.technologies : tags,
                demoUrl: (project as any).demoUrl ?? (project as any).demo ?? undefined,
                repoUrl: (project as any).github ?? (project as any).repo ?? undefined,
                year: String(project.year ?? new Date().getFullYear()),
            };
        });
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const lowerSearch = (searchTerm ?? "").trim().toLowerCase();
        const mapSelected = (sel: ProjectCategory) =>
            sel === "game" ? "Game Dev" : sel === "web" ? "Web Dev" : sel === "design" ? "UI/UX" : "Creative";
        const selectedMapped = selectedFilter === "all" ? null : mapSelected(selectedFilter);

        return normalizedProjects.filter((project) => {
            const title = (project.title ?? "").toLowerCase();
            const summary = (project.summary ?? "").toLowerCase();
            const problem = String(project.description?.problem ?? "").toLowerCase();
            const tags = (project.techStack ?? []).join(" ").toLowerCase();
            const category = String(project.category ?? "").toLowerCase();
            const year = String(project.year ?? "").toLowerCase();
            const matchesSearch = title.includes(lowerSearch) || summary.includes(lowerSearch) || problem.includes(lowerSearch);
            const matchesExtra = tags.includes(lowerSearch) || category.includes(lowerSearch) || year.includes(lowerSearch);

            if (selectedMapped === null) {
                return lowerSearch.length === 0 ? true : matchesSearch || matchesExtra;
            }

            return (lowerSearch.length === 0 ? true : matchesSearch || matchesExtra) && project.category === selectedMapped;
        });
    }, [normalizedProjects, searchTerm, selectedFilter]);
    // Show skeleton while server data is initializing
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
        <Section className="projects pt-32 pb-20 min-h-screen">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Work Archive</h1>
                    <p className="text-neutral-400 text-lg">A selection of projects spanning game development, software engineering, and creative design.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="project-controls">
                        <div className="project-toolbar">
                            <FilterBar options={FILTER_OPTIONS} activeValue={selectedFilter} onChange={(value) => setSelectedFilter(value as ProjectCategory)} />

                            <input type="text" placeholder="Search projects" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="project-search" aria-label="Search projects by name or description" />
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    {filteredProjects.length === 0 ? (
                        <div className="project-empty project-empty-no-match">
                            {searchTerm.trim().length > 0 ? (
                                <>
                                    <h3 className="text-xl font-semibold mb-2">No results for "{searchTerm}"</h3>
                                    <p className="mb-4">Try different keywords, check spelling, or clear your search to browse all projects.</p>
                                    <button className="btn btn-outline" onClick={() => setSearchTerm("")}>Clear search</button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                                    <p>There are currently no projects to show.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        filteredProjects.map((project, index) => (
                            <motion.div key={project.id ?? project.slug ?? index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.06 }}>
                                <ProjectCard project={project} />
                            </motion.div>
                        ))
                    )}
                </div>
            </Container>
        </Section>
    );
}
