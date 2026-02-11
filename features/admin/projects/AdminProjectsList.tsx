"use client";

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

    const toggleFeatured = useMutation(api.projects.mutations.toggleFeatured);
    const updateStatus = useMutation(api.projects.mutations.updateStatus);
    const deleteProject = useMutation(api.projects.mutations.deleteProject);

    if (!token) return null;

    if (allProjects === undefined) {
        return <p style={{ color: "#888" }}>Loading projects…</p>;
    }

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
            <div className="admin-page-header">
                <h2>Projects</h2>
                <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
                    + New Project
                </Link>
            </div>

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
                    {allProjects.map((p) => (
                        <tr key={p._id}>
                            <td>{p.order}</td>
                            <td>
                                <Link
                                    href={`/admin/projects/${p.slug}`}
                                    style={{
                                        color: "#ddd",
                                        textDecoration: "none",
                                    }}
                                >
                                    {p.title}
                                </Link>
                            </td>
                            <td style={{ color: "#888" }}>
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

            {allProjects.length === 0 && (
                <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
                    No projects yet.
                </p>
            )}
        </div>
    );
}
