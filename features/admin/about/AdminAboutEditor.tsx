"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminEditField from "../components/AdminEditField";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useInlineEditState } from "../hooks/useInlineEditState";
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

    const [newHeading, setNewHeading] = useState("");
    const [newBody, setNewBody] = useState("");
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    const { getEdited, setField, clearItem, isDirty } =
        useInlineEditState<{ heading: string; body: string }>();

    if (!token) return null;
    if (sections === undefined)
        return <p className="admin-loading-note">Loading sections...</p>;

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
            clearItem(s._id);
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
                const hasChanges = isDirty(s);

                return (
                    <div key={s._id} className="admin-editor-card">
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

                        <div className="admin-editor-content">
                            <AdminEditField
                                label="Heading"
                                value={edited.heading}
                                onChange={(e) =>
                                    setField(s._id, "heading", e.target.value)
                                }
                                style={{ marginBottom: "var(--admin-space-sm)" }}
                            />
                            <AdminEditField
                                label="Body"
                                value={edited.body}
                                onChange={(e) =>
                                    setField(s._id, "body", e.target.value)
                                }
                                multiline
                                minHeight={80}
                            />
                        </div>

                        <div className="admin-editor-actions">
                            <button
                                className="admin-btn admin-btn-primary"
                                onClick={() => handleSave(s)}
                                disabled={!hasChanges}
                            >
                                Save
                            </button>
                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(s._id, s.heading)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* New section form */}
            <div className="admin-create-card">
                <h3 className="admin-create-title">
                    Add New Section
                </h3>
                <div className="admin-field admin-field-tight">
                    <label>Heading</label>
                    <input
                        value={newHeading}
                        onChange={(e) => setNewHeading(e.target.value)}
                        placeholder="Section heading"
                    />
                </div>
                <div className="admin-field admin-field-compact-gap">
                    <label>Body</label>
                    <textarea
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        placeholder="Section body text"
                        className="admin-textarea-sm"
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
