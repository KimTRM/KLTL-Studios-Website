"use client";

import { useState, useMemo } from "react";
import "../css/WorksArchive.css";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/features/ui/AnimatedSection";
import SectionHeader from "@/features/ui/SectionHeader";
import EmptyState from "@/features/ui/EmptyState";

type Category = "all" | "game" | "web" | "design" | "other";

const CATEGORY_LABELS: Record<Category, string> = {
    all: "All",
    game: "Games",
    web: "Web",
    design: "Design",
    other: "Other",
};

export default function WorksArchive() {
    const allProjects = useQuery(api.projects.queries.getAllProjects);
    const [filter, setFilter] = useState<Category>("all");

    const projects = useMemo(() => allProjects ?? [], [allProjects]);

    // Derive available categories from data
    const categories = useMemo<Category[]>(() => {
        const cats = new Set<Category>(["all"]);
        projects.forEach((p) => {
            if (p.category) cats.add(p.category as Category);
        });
        return Array.from(cats);
    }, [projects]);

    const filtered = useMemo(() => {
        if (filter === "all") return projects;
        return projects.filter((p) => p.category === filter);
    }, [projects, filter]);

    return (
        <section className="archiveSection" id="archive" aria-label="Works Archive">
            <AnimatedSection delay={0} duration={900}>
                <SectionHeader
                    label="03"
                    heading="All Works"
                    sub="Everything I've built, in one place."
                />
            </AnimatedSection>

            {/* Filters */}
            <AnimatedSection delay={100} duration={800}>
                <div className="archiveFilters" role="tablist" aria-label="Filter projects by category">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={filter === cat ? "filterBtnActive" : "filterBtn"}
                            onClick={() => setFilter(cat)}
                            role="tab"
                            aria-selected={filter === cat}
                        >
                            {CATEGORY_LABELS[cat]}
                        </button>
                    ))}
                </div>
            </AnimatedSection>

            {/* List */}
            {filtered.length === 0 ? (
                <AnimatedSection delay={200} duration={800}>
                    <EmptyState
                        message={filter === "all" ? "No projects yet." : `No ${CATEGORY_LABELS[filter].toLowerCase()} projects found.`}
                        sub="Check back soon."
                    />
                </AnimatedSection>
            ) : (
                <div className="archiveList" role="tabpanel">
                    {filtered.map((project, idx) => (
                        <AnimatedSection key={project.slug ?? idx} delay={idx * 60} duration={700}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="archiveRow"
                                aria-label={`View ${project.title}`}
                            >
                                <span className="archiveTitle">{project.title}</span>
                                <span className="archiveCat">
                                    {project.category ?? "—"}
                                </span>
                                <span className="archiveYear">
                                    {project.year ?? "—"}
                                </span>
                                <span className="archiveArrow" aria-hidden="true">
                                    <FiArrowRight />
                                </span>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            )}
        </section>
    );
}
