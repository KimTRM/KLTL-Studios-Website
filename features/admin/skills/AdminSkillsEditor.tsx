"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminEditField from "../components/AdminEditField";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useInlineEditState } from "../hooks/useInlineEditState";
import type { Id, Doc } from "@/convex/_generated/dataModel";

type SkillDoc = Doc<"skills">;

/**
 * AdminSkillsEditor — inline editing for skill categories.
 *
 * Each category shows title + description.  Categories can be reordered,
 * added, or removed.
 */
export default function AdminSkillsEditor() {
    const { token } = useAdminAuth();
    const skills = useQuery(api.skills.queries.getAll);

    const updateCategory = useMutation(api.skills.mutations.updateSkillCategory);
    const addSkill = useMutation(api.skills.mutations.addSkill);
    const removeSkill = useMutation(api.skills.mutations.removeSkill);
    const reorderSkills = useMutation(api.skills.mutations.reorderSkills);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    const { getEdited, setField, clearItem, isDirty } =
        useInlineEditState<{ title: string; description: string }>();

    if (!token) return null;
    if (skills === undefined)
        return <p style={{ color: "var(--text-faint)" }}>Loading skills…</p>;

    async function handleSave(s: SkillDoc) {
        if (!token) return;
        const edited = getEdited(s);
        try {
            await updateCategory({
                sessionToken: token,
                id: s._id,
                title: edited.title,
                description: edited.description,
            });
            clearItem(s._id);
            setFeedback({ type: "success", msg: `"${edited.title}" saved.` });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Save failed",
            });
        }
    }

    async function handleMove(index: number, direction: -1 | 1) {
        if (!token || !skills) return;
        const target = index + direction;
        if (target < 0 || target >= skills.length) return;

        const reordered = skills.map((s, i) => ({
            id: s._id as Id<"skills">,
            order:
                i === index
                    ? skills[target].order
                    : i === target
                        ? skills[index].order
                        : s.order,
        }));

        try {
            await reorderSkills({ sessionToken: token, items: reordered });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Reorder failed",
            });
        }
    }

    async function handleAdd() {
        if (!token || !newTitle.trim()) return;
        try {
            await addSkill({
                sessionToken: token,
                title: newTitle.trim(),
                description: newDescription.trim(),
            });
            setNewTitle("");
            setNewDescription("");
            setFeedback({ type: "success", msg: "Skill category added." });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Add failed",
            });
        }
    }

    async function handleRemove(id: Id<"skills">, title: string) {
        if (!token) return;
        if (!confirm(`Remove "${title}"?`)) return;
        try {
            await removeSkill({ sessionToken: token, id });
            setFeedback({ type: "success", msg: `"${title}" removed.` });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Remove failed",
            });
        }
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>Skills</h2>
            </div>

            {feedback && (
                <p
                    className={
                        feedback.type === "error"
                            ? "admin-error"
                            : "admin-success"
                    }
                >
                    {feedback.msg}
                </p>
            )}

            {skills.map((s, i) => {
                const edited = getEdited(s);
                const hasChanges = isDirty(s);

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
                                disabled={i === skills.length - 1}
                                title="Move down"
                            >
                                ▼
                            </button>
                        </div>

                        <div style={{ flex: 1 }}>
                            <AdminEditField
                                label="Title"
                                value={edited.title}
                                onChange={(e) =>
                                    setField(s._id, "title", e.target.value)
                                }
                                style={{ marginBottom: "0.5rem" }}
                            />
                            <AdminEditField
                                label="Description"
                                value={edited.description}
                                onChange={(e) =>
                                    setField(
                                        s._id,
                                        "description",
                                        e.target.value,
                                    )
                                }
                                multiline
                                minHeight={80}
                            />
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
                                disabled={!hasChanges}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Save
                            </button>
                            <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleRemove(s._id, s.title)}
                                style={{ fontSize: "0.75rem" }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Add new skill category */}
            <div
                style={{
                    background: "color-mix(in srgb, var(--palette-gray-2) 80%, var(--palette-black) 20%)",
                    border: "1px dashed #444",
                    borderRadius: 6,
                    padding: "1rem",
                    marginTop: "1rem",
                }}
            >
                <h3
                    style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        margin: "0 0 0.75rem",
                    }}
                >
                    Add New Skill Category
                </h3>
                <div
                    className="admin-field"
                    style={{ marginBottom: "0.5rem" }}
                >
                    <label>Title</label>
                    <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Game Development"
                    />
                </div>
                <div
                    className="admin-field"
                    style={{ marginBottom: "0.75rem" }}
                >
                    <label>Description</label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Tools and technologies in this category"
                        style={{ minHeight: 60 }}
                    />
                </div>
                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleAdd}
                    disabled={!newTitle.trim()}
                >
                    + Add Category
                </button>
            </div>
        </div>
    );
}
