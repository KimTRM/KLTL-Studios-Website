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
        return <p className="admin-loading-note">Loading skills...</p>;

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
                                disabled={i === skills.length - 1}
                                title="Move down"
                            >
                                ▼
                            </button>
                        </div>

                        <div className="admin-editor-content">
                            <AdminEditField
                                label="Title"
                                value={edited.title}
                                onChange={(e) =>
                                    setField(s._id, "title", e.target.value)
                                }
                                style={{ marginBottom: "var(--admin-space-sm)" }}
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
                                onClick={() => handleRemove(s._id, s.title)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Add new skill category */}
            <div className="admin-create-card">
                <h3 className="admin-create-title">
                    Add New Skill Category
                </h3>
                <div className="admin-field admin-field-tight">
                    <label>Title</label>
                    <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Game Development"
                    />
                </div>
                <div className="admin-field admin-field-compact-gap">
                    <label>Description</label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Tools and technologies in this category"
                        className="admin-textarea-xs"
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
