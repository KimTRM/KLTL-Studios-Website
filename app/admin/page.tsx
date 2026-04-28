"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * Admin Dashboard — landing page for /admin.
 */
export default function AdminDashboard() {
    const projects = useQuery(api.projects.queries.getAllIncludingArchived);
    const aboutSections = useQuery(api.about.queries.getAll);
    const skills = useQuery(api.skills.queries.getAll);
    const siteMeta = useQuery(api.siteMeta.queries.getMany, {
        keys: ["heroTitle", "contactEmail", "footerText"],
    });

    const projectsCount = projects?.length ?? 0;
    const featuredCount = projects?.filter((p) => p.featured && !p.archived).length ?? 0;
    const archivedCount = projects?.filter((p) => p.archived).length ?? 0;
    const activeCount = projectsCount - archivedCount;

    const stats = [
        { label: "Total Projects", value: projectsCount, tone: "primary" as const },
        { label: "Featured Projects", value: featuredCount, tone: "accent" as const },
        { label: "Active Projects", value: activeCount, tone: "neutral" as const },
        { label: "Archived", value: archivedCount, tone: "neutral" as const },
        { label: "About Sections", value: aboutSections?.length ?? 0, tone: "neutral" as const },
        { label: "Skill Categories", value: skills?.length ?? 0, tone: "neutral" as const },
    ];

    const recentProjects =
        projects
            ?.slice()
            .sort((a, b) => b._creationTime - a._creationTime)
            .slice(0, 5) ?? [];

    return (
        <div className="admin-dashboard">
            <div className="admin-page-header admin-page-header-dense">
                <div>
                    <h2>Dashboard</h2>
                    <p className="admin-page-subtitle">
                        Manage portfolio content, monitor project coverage, and jump into edits quickly.
                    </p>
                </div>
                <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
                    + New Project
                </Link>
            </div>

            <section className="admin-stats-grid" aria-label="Admin statistics">
                {stats.map((stat) => (
                    <article key={stat.label} className={`admin-stat-card admin-stat-card-${stat.tone}`}>
                        <p className="admin-stat-label">{stat.label}</p>
                        <p className="admin-stat-value">{stat.value}</p>
                    </article>
                ))}
            </section>

            <section className="admin-dashboard-panels">
                <article className="admin-panel-card">
                    <h3 className="admin-panel-title">Quick Actions</h3>
                    <div className="admin-dashboard-grid">
                        <Link href="/admin/projects" className="admin-dashboard-card">
                            <h3>Projects</h3>
                            <p>Manage portfolio projects</p>
                        </Link>

                        <Link href="/admin/about" className="admin-dashboard-card">
                            <h3>About Sections</h3>
                            <p>Edit about page content</p>
                        </Link>

                        <Link href="/admin/skills" className="admin-dashboard-card">
                            <h3>Skills</h3>
                            <p>Manage skill categories</p>
                        </Link>

                        <Link href="/admin/site-meta" className="admin-dashboard-card">
                            <h3>Site Meta</h3>
                            <p>Hero text, footer, contact info</p>
                        </Link>
                    </div>
                </article>

                <article className="admin-panel-card">
                    <h3 className="admin-panel-title">Recently Added Projects</h3>
                    {recentProjects.length === 0 ? (
                        <p className="admin-empty-note">No project activity yet.</p>
                    ) : (
                        <ul className="admin-recent-list">
                            {recentProjects.map((project) => (
                                <li key={project._id} className="admin-recent-item">
                                    <div>
                                        <Link href={`/admin/projects/${project.slug}`} className="admin-link">
                                            {project.title}
                                        </Link>
                                        <p className="admin-recent-meta">/{project.slug}</p>
                                    </div>
                                    <div className="admin-recent-badges">
                                        {project.featured && (
                                            <span className="admin-badge admin-badge-featured">Featured</span>
                                        )}
                                        {project.archived ? (
                                            <span className="admin-badge admin-badge-archived">Archived</span>
                                        ) : (
                                            <span className="admin-badge admin-badge-active">Active</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
            </section>

            <section className="admin-info-strip">
                <article>
                    <p className="admin-info-kicker">Hero Title</p>
                    <p className="admin-info-value">{siteMeta?.heroTitle || "Not set"}</p>
                </article>
                <article>
                    <p className="admin-info-kicker">Contact Email</p>
                    <p className="admin-info-value">{siteMeta?.contactEmail || "Not set"}</p>
                </article>
                <article>
                    <p className="admin-info-kicker">Footer Text</p>
                    <p className="admin-info-value">{siteMeta?.footerText || "Not set"}</p>
                </article>
            </section>
            {projects === undefined && (
                <p className="admin-loading-note">Loading dashboard data...</p>
            )}
            {projects !== undefined && projects.length === 0 && (
                <p className="admin-empty-note">Create your first project to populate statistics.</p>
            )}
        </div>
    );
}
