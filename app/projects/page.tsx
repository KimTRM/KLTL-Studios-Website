"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { mockProjects } from "@/features/projects/data/mockProjects";
import { ProjectCard } from "@/features/projects/components/NewProjectCard";
import { motion } from "motion/react";
import ProjectsWithFilter from "@/features/projects/components/ProjectsWithFilter";
import FilterBar from "@/features/projects/components/FilterBar";

export default function Projects() {
    type ProjectCategory = "all" | "game" | "web" | "design" | "multimedia";

    const FILTER_OPTIONS: Array<{ label: string; value: ProjectCategory }> = [
        { label: "All", value: "all" },
        { label: "Game Development", value: "game" },
        { label: "Web/App", value: "web" },
        { label: "UI/UX", value: "design" },
        { label: "Multimedia", value: "multimedia" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");

    return (
        <>
            <Section className="projects pt-32 pb-20 min-h-screen">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                            Work Archive
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            A selection of projects spanning game development, software engineering, and creative design.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
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
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                        {mockProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            <ProjectsWithFilter />

        </>
    );
}

