"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import type { Id, Doc } from "@/convex/_generated/dataModel";

type AboutDoc = Doc<"aboutSections">;

/**
 * AdminAboutEditor — inline editing for about sections.
 *
 * Each section shows its heading and body in editable fields.
 * Sections can be reordered with ▲/▼ buttons, created, or deleted.
 */
export default function AdminAboutEditor() {
    const { token } = useAdminAuth();
    const sections = useQuery(api.about.queries.getAll);

    const updateSection = useMutation(api.about.mutations.updateAboutSection);
    const reorderSections = useMutation(api.about.mutations.reorderAboutSections);
    const createSection = useMutation(api.about.mutations.createAboutSection);
    const deleteSection = useMutation(api.about.mutations.deleteAboutSection);

    const [editState, setEditState] = useState<
        Record<string, { heading: string; body: string }>
    >({});
    const [newHeading, setNewHeading] = useState("");
    const [newBody, setNewBody] = useState("");
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    if (!token) return null;
    if (sections === undefined)
        return <p style={{ color: "var(--text-faint)" }}>Loading sections…</p>;

    function getEdited(s: AboutDoc) {
        return editState[s._id] ?? { heading: s.heading, body: s.body };
    }

    function setEdited(id: string, field: "heading" | "body", value: string) {
        setEditState((prev) => ({
            ...prev,
            [id]: {
                heading:
                    field === "heading"
                        ? value
                        : prev[id]?.heading ??
                        sections!.find((s) => s._id === id)!.heading,
                body:
                    field === "body"
                        ? value
                        : prev[id]?.body ??
                        sections!.find((s) => s._id === id)!.body,
            },
        }));
    }

    async function handleSave(s: AboutDoc) {
        if (!token) return;
        const edited = getEdited(s);
        try {
            await updateSection({
                sessionToken: token,
                id: s._id,
                heading: edited.heading,
                body: edited.body,
            });
            // Clear local edit state for this item
            setEditState((prev) => {
                const next = { ...prev };
                delete next[s._id];
                return next;
            });
            setFeedback({ type: "success", msg: `"${edited.heading}" saved.` });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Save failed",
            });
        }
    }

    async function handleMove(index: number, direction: -1 | 1) {
        if (!token || !sections) return;
        const target = index + direction;
        if (target < 0 || target >= sections.length) return;

        const reordered = sections.map((s, i) => ({
            id: s._id as Id<"aboutSections">,
            order:
                i === index
                    ? sections[target].order
                    : i === target
                        ? sections[index].order
                        : s.order,
        }));

        try {
            await reorderSections({ sessionToken: token, items: reordered });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Reorder failed",
            });
        }
    }

    async function handleCreate() {
        if (!token || !newHeading.trim()) return;
        try {
            await createSection({
                sessionToken: token,
                heading: newHeading.trim(),
                body: newBody.trim(),
            });
            setNewHeading("");
            setNewBody("");
            setFeedback({ type: "success", msg: "Section created." });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Create failed",
            });
        }
    }

    async function handleDelete(id: Id<"aboutSections">, heading: string) {
        if (!token) return;
        if (!confirm(`Delete "${heading}"?`)) return;
        try {
            await deleteSection({ sessionToken: token, id });
            setFeedback({ type: "success", msg: `"${heading}" deleted.` });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Delete failed",
            });
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>About Sections</h2>
            </div>

            {feedback && (
                <p className={feedback.type === "error" ? "admin-error" : "admin-success"}>
                    {feedback.msg}
                </p>
            )}

            {sections.map((s, i) => {
                const edited = getEdited(s);
                const isDirty =
                    edited.heading !== s.heading || edited.body !== s.body;

                return (
                    <div
                        key={s._id}
                        style={{
                            background: "var(--palette-gray-2)",
                            border: "1px solid #333",
                            borderRadius: 6,
                            padding: "1rem",
                            marginBottom: "0.75rem",
                            display: "flex",
                            gap: "0.75rem",
                        }}
                    >
                        <div className="admin-move-btns">
                            <button
                                onClick={() => handleMove(i, -1)}
                                disabled={i === 0}
                                title="Move up"
                            >
                                ▲
                            </button>
                            <button
                                onClick={() => handleMove(i, 1)}
                                disabled={i === sections.length - 1}
                                title="Move down"
                            >
                                ▼
                            </button>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div className="admin-field" style={{ marginBottom: "0.5rem" }}>
                                <label>Heading</label>
                                <input
                                    value={edited.heading}
                                    onChange={(e) =>
                                        setEdited(s._id, "heading", e.target.value)
                                    }
                                />
                            </div>
                            <div className="admin-field">
                                <label>Body</label>
                                <textarea
                                    value={edited.body}
                                    onChange={(e) =>
                                        setEdited(s._id, "body", e.target.value)
                                    }
                                    style={{ minHeight: 80 }}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                alignSelf: "flex-start",
                            }}
                        >
                            <button
                                className="admin-btn admin-btn-primary"
                                onClick={() => handleSave(s)}
                                disabled={!isDirty}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Save
                            </button>
                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(s._id, s.heading)}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* New section form */}
            <div
                style={{
                    background: "color-mix(in srgb, var(--palette-gray-2) 80%, var(--palette-black) 20%)",
                    border: "1px dashed #444",
                    borderRadius: 6,
                    padding: "1rem",
                    marginTop: "1rem",
                }}
            >
                <h3 style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: "0 0 0.75rem" }}>
                    Add New Section
                </h3>
                <div className="admin-field" style={{ marginBottom: "0.5rem" }}>
                    <label>Heading</label>
                    <input
                        value={newHeading}
                        onChange={(e) => setNewHeading(e.target.value)}
                        placeholder="Section heading"
                    />
                </div>
                <div className="admin-field" style={{ marginBottom: "0.75rem" }}>
                    <label>Body</label>
                    <textarea
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        placeholder="Section body text"
                        style={{ minHeight: 80 }}
                    />
                </div>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleCreate}
                    disabled={!newHeading.trim()}
                >
                    + Add Section
                </button>
            </div>
        </div>
    );
}
