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

    return (
        <section id="portfolio" className="projects">
            <div className="container">
                <h2>My Projects</h2>

                {/* Search and Filter Controls */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.7rem 1.2rem',
                            borderRadius: '8px',
                            border: '2px solid #444',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            fontSize: '1rem',
                            flex: '1 1 250px',
                            maxWidth: '400px'
                        }}
                        aria-label="Search projects by name or description"
                    />

                    {/* Category Filter Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedFilter(category)}
                                style={{
                                    padding: '0.7rem 1.5rem',
                                    borderRadius: '8px',
                                    border: '2px solid #dc143c',
                                    background: selectedFilter === category ? '#dc143c' : 'transparent',
                                    color: selectedFilter === category ? 'white' : '#dc143c',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.2s ease'
                                }}
                                aria-label={`Filter by ${category} projects`}
                                aria-pressed={selectedFilter === category}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <p style={{
                    textAlign: 'center',
                    color: '#aaa',
                    marginBottom: '1rem',
                    fontSize: '0.95rem'
                }}>
                    Showing {filteredProjects.length} of {projects.length} projects
                </p>

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
                    ) : (
                        <p style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            color: '#888',
                            fontSize: '1.2rem',
                            padding: '2rem'
                        }}>
                            No projects found matching your search.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
