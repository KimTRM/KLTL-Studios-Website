"use client"
import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import "../css/ProjectSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProjectsWithFilter() {
    const allProjects = useQuery(api.projects.queries.getAllProjects);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string>("all");

    // Safe default while loading
    const projects = allProjects ?? [];

    // Extract unique categories from projects
    const categories = useMemo(() => {
        const cats = new Set<string>();
        projects.forEach(project => {
            // Categorize based on keywords in title or description
            if (project.title.toLowerCase().includes("game") ||
                project.description.toLowerCase().includes("game") ||
                project.description.toLowerCase().includes("godot")) {
                cats.add("game");
            }
            if (project.title.toLowerCase().includes("website") ||
                project.title.toLowerCase().includes("web") ||
                project.description.toLowerCase().includes("website")) {
                cats.add("web");
            }
            if (project.title.toLowerCase().includes("design") ||
                project.description.toLowerCase().includes("design")) {
                cats.add("design");
            }
        });
        return ["all", ...Array.from(cats)];
    }, [projects]);

    // Filter projects based on search and category
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());

            if (selectedFilter === "all") return matchesSearch;

            const matchesCategory =
                (selectedFilter === "game" &&
                    (project.title.toLowerCase().includes("game") ||
                        project.description.toLowerCase().includes("game") ||
                        project.description.toLowerCase().includes("godot"))) ||
                (selectedFilter === "web" &&
                    (project.title.toLowerCase().includes("website") ||
                        project.title.toLowerCase().includes("web") ||
                        project.description.toLowerCase().includes("website"))) ||
                (selectedFilter === "design" &&
                    (project.title.toLowerCase().includes("design") ||
                        project.description.toLowerCase().includes("design")));

            return matchesSearch && matchesCategory;
        });
    }, [projects, searchTerm, selectedFilter]);

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
                <h2>My Projects</h2>

                {/* Search and Filter Controls */}
                <div className="project-toolbar">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="project-search"
                        aria-label="Search projects by name or description"
                    />

                    {/* Category Filter Buttons */}
                    <div className="project-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedFilter(category)}
                                className={selectedFilter === category ? "btn" : "btn-outline"}
                                style={{ margin: 0 }}
                                aria-label={`Filter by ${category} projects`}
                                aria-pressed={selectedFilter === category}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                {projects.length > 0 && (
                    <p className="project-results">
                        {filteredProjects.length} of {projects.length} projects
                    </p>
                )}

                {/* Project Grid */}
                <div className="project-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <ProjectCard
                                key={idx}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                link={project.link}
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
                </div>
            </div>
        </section>
    );
}
