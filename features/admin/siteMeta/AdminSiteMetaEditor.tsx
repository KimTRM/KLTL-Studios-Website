"use client";

import { useState, useEffect, FormEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminAuth } from "../hooks/useAdminAuth";

/**
 * AdminSiteMetaEditor — edit hero text, footer quote, contact info.
 *
 * Fetches current values from siteMeta, lets you edit them inline,
 * and saves via upsertMany.
 */

const META_KEYS = [
    { key: "heroTitle", label: "Hero Title" },
    { key: "heroSubtitle", label: "Hero Subtitle" },
    { key: "heroMotto", label: "Hero Motto" },
    { key: "heroImage", label: "Hero Image URL" },
    { key: "footerText", label: "Footer Text" },
    { key: "contactEmail", label: "Contact Email" },
    { key: "contactHeading", label: "Contact Heading" },
    { key: "contactSubheading", label: "Contact Subheading" },
    { key: "githubUrl", label: "GitHub URL" },
    { key: "linkedinUrl", label: "LinkedIn URL" },
    { key: "youtubeUrl", label: "YouTube URL" },
] as const;

const ALL_KEYS = META_KEYS.map((m) => m.key);

export default function AdminSiteMetaEditor() {
    const { token } = useAdminAuth();
    const current = useQuery(api.siteMeta.queries.getMany, { keys: [...ALL_KEYS] });
    const upsertMany = useMutation(api.siteMeta.mutations.upsertMany);

    const [values, setValues] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);
    const [pending, setPending] = useState(false);

    // Populate form from query
    useEffect(() => {
        if (current) {
            setValues(current);
        }
    }, [current]);

    if (!token) return null;
    if (current === undefined)
        return <p style={{ color: "#888" }}>Loading site meta…</p>;

    function handleChange(key: string, value: string) {
        setValues((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!token) return;
        setFeedback(null);
        setPending(true);

        try {
            const entries = ALL_KEYS.map((key) => ({
                key,
                value: values[key] ?? "",
            }));

            await upsertMany({ sessionToken: token, entries });
            setFeedback({ type: "success", msg: "Site metadata saved." });
        } catch (err) {
            setFeedback({
                type: "error",
                msg: err instanceof Error ? err.message : "Save failed",
            });
        } finally {
            setPending(false);
        }
    }

    // Check if anything changed
    const isDirty = ALL_KEYS.some(
        (key) => (values[key] ?? "") !== (current[key] ?? ""),
    );

    return (
        <div>
            <div className="admin-page-header">
                <h2>Site Meta</h2>
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

            <form className="admin-form" onSubmit={handleSubmit}>
                {META_KEYS.map(({ key, label }) => (
                    <div className="admin-field" key={key}>
                        <label>{label}</label>
                        <input
                            value={values[key] ?? ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    </div>
                ))}

                <button type="submit" disabled={pending || !isDirty}>
                    {pending ? "Saving…" : "Save All"}
                </button>
            </form>

            {/* Live preview */}
            <div
                style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    border: "1px solid #333",
                    borderRadius: 6,
                    background: "#151515",
                }}
            >
                <h3
                    style={{
                        fontSize: "0.85rem",
                        color: "#888",
                        margin: "0 0 0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Preview
                </h3>
                <p style={{ fontSize: "1.1rem", color: "#eee", margin: "0 0 0.25rem" }}>
                    {values.heroTitle || "—"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#aaa", margin: "0 0 0.25rem" }}>
                    {values.heroSubtitle || "—"}
                </p>
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        fontStyle: "italic",
                        margin: 0,
                    }}
                >
                    {values.heroMotto || "—"}
                </p>
                <hr style={{ border: "none", borderTop: "1px solid #333", margin: "0.75rem 0" }} />
                <p style={{ fontSize: "0.8rem", color: "#777", margin: 0 }}>
                    {values.footerText || "—"}
                </p>
            </div>
        </div>
    );
}
