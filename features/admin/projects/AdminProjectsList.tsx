"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import Link from "next/link";
import type { Id } from "@/convex/_generated/dataModel";

/**
 * AdminProjectsList — table of all projects (including archived).
 *
 * Provides inline actions: toggle featured, archive/unarchive, delete.
 */
export default function AdminProjectsList() {
    const { token } = useAdminAuth();
    const allProjects = useQuery(api.projects.queries.getAllIncludingArchived);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "active" | "featured" | "archived"
    >("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState<"order" | "title" | "recent">("order");

    const toggleFeatured = useMutation(api.projects.mutations.toggleFeatured);
    const updateStatus = useMutation(api.projects.mutations.updateStatus);
    const deleteProject = useMutation(api.projects.mutations.deleteProject);

    const categories = useMemo(
        () => {
            if (!allProjects) return ["all"];
            return [
                "all",
                ...new Set(
                    allProjects
                        .map((project) => project.category)
                        .filter((category): category is NonNullable<typeof category> => !!category),
                ),
            ];
        },
        [allProjects],
    );

    const filteredProjects = useMemo(() => {
        if (!allProjects) return [];
        const searchLower = search.trim().toLowerCase();

        const filtered = allProjects.filter((project) => {
            const statusMatch =
                statusFilter === "all"
                    ? true
                    : statusFilter === "active"
                        ? !project.archived
                        : statusFilter === "featured"
                            ? project.featured && !project.archived
                            : project.archived;

            const categoryMatch =
                categoryFilter === "all"
                    ? true
                    : project.category === categoryFilter;

            const searchMatch =
                searchLower.length === 0
                    ? true
                    : project.title.toLowerCase().includes(searchLower) ||
                    project.slug.toLowerCase().includes(searchLower) ||
                    project.description.toLowerCase().includes(searchLower);

            return statusMatch && categoryMatch && searchMatch;
        });

        if (sortBy === "title") {
            return filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortBy === "recent") {
            return filtered.sort((a, b) => b._creationTime - a._creationTime);
        }

        return filtered.sort((a, b) => a.order - b.order);
    }, [allProjects, search, statusFilter, categoryFilter, sortBy]);

    if (!token) return null;

    if (allProjects === undefined) {
        return <p className="admin-loading-note">Loading projects...</p>;
    }

    const totals = {
        total: allProjects.length,
        featured: allProjects.filter((p) => p.featured && !p.archived).length,
        active: allProjects.filter((p) => !p.archived).length,
        archived: allProjects.filter((p) => p.archived).length,
    };

    async function handleToggleFeatured(id: Id<"projects">) {
        if (!token) return;
        await toggleFeatured({ sessionToken: token, id });
    }

    async function handleToggleArchived(
        id: Id<"projects">,
        currentlyArchived: boolean,
    ) {
        if (!token) return;
        await updateStatus({
            sessionToken: token,
            id,
            archived: !currentlyArchived,
        });
    }

    async function handleDelete(id: Id<"projects">, title: string) {
        if (!token) return;
        if (!confirm(`Delete "${title}" permanently?`)) return;
        await deleteProject({ sessionToken: token, id });
    }

    return (
        <div>
            <div className="admin-page-header admin-page-header-dense">
                <div>
                    <h2>Projects</h2>
                    <p className="admin-page-subtitle">
                        Search, filter, and manage project status with live controls.
                    </p>
                </div>
                <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
                    + New Project
                </Link>
            </div>

            <section className="admin-stats-grid admin-stats-grid-compact" aria-label="Project statistics">
                <article className="admin-stat-card admin-stat-card-primary">
                    <p className="admin-stat-label">Total</p>
                    <p className="admin-stat-value">{totals.total}</p>
                </article>
                <article className="admin-stat-card admin-stat-card-accent">
                    <p className="admin-stat-label">Featured</p>
                    <p className="admin-stat-value">{totals.featured}</p>
                </article>
                <article className="admin-stat-card">
                    <p className="admin-stat-label">Active</p>
                    <p className="admin-stat-value">{totals.active}</p>
                </article>
                <article className="admin-stat-card">
                    <p className="admin-stat-label">Archived</p>
                    <p className="admin-stat-value">{totals.archived}</p>
                </article>
            </section>

            <section className="admin-panel-card admin-project-toolbar" aria-label="Project filters">
                <div className="admin-field">
                    <label>Search</label>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search title, slug, or description"
                    />
                </div>

                <div className="admin-field">
                    <label>Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value as "all" | "active" | "featured" | "archived",
                            )
                        }
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="featured">Featured</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                <div className="admin-field">
                    <label>Category</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === "all" ? "All" : category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="admin-field">
                    <label>Sort</label>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as "order" | "title" | "recent")
                        }
                    >
                        <option value="order">Order</option>
                        <option value="title">Title</option>
                        <option value="recent">Recently Added</option>
                    </select>
                </div>
            </section>

            <p className="admin-list-summary">
                Showing {filteredProjects.length} of {allProjects.length} projects.
            </p>

            <div className="admin-table-scroll">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((p) => (
                            <tr key={p._id}>
                                <td>{p.order}</td>
                                <td>
                                    <Link
                                        href={`/admin/projects/${p.slug}`}
                                        className="admin-link"
                                    >
                                        {p.title}
                                    </Link>
                                </td>
                                <td className="admin-cell-muted">
                                    {p.category ?? "—"}
                                </td>
                                <td>
                                    {p.featured && (
                                        <span className="admin-badge admin-badge-featured">
                                            Featured
                                        </span>
                                    )}{" "}
                                    {p.archived ? (
                                        <span className="admin-badge admin-badge-archived">
                                            Archived
                                        </span>
                                    ) : (
                                        <span className="admin-badge admin-badge-active">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <div className="admin-btn-group">
                                        <Link
                                            href={`/admin/projects/${p.slug}`}
                                            className="admin-btn"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="admin-btn"
                                            onClick={() =>
                                                handleToggleFeatured(p._id)
                                            }
                                        >
                                            {p.featured ? "Unfeature" : "Feature"}
                                        </button>
                                        <button
                                            className="admin-btn"
                                            onClick={() =>
                                                handleToggleArchived(
                                                    p._id,
                                                    p.archived,
                                                )
                                            }
                                        >
                                            {p.archived ? "Unarchive" : "Archive"}
                                        </button>
                                        <button
                                            className="admin-btn admin-btn-danger"
                                            onClick={() =>
                                                handleDelete(p._id, p.title)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredProjects.length === 0 && (
                <p className="admin-empty-note">
                    No projects match the current filters.
                </p>
            )}
        </div>
    );
}
