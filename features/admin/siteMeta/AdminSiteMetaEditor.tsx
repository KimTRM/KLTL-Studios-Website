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

const HERO_KEYS = ["heroTitle", "heroSubtitle", "heroMotto", "heroImage"] as const;
const CONTACT_KEYS = ["contactHeading", "contactSubheading", "contactEmail"] as const;
const SOCIAL_KEYS = ["githubUrl", "linkedinUrl", "youtubeUrl"] as const;
const FOOTER_KEYS = ["footerText"] as const;

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
        return <p className="admin-loading-note">Loading site meta...</p>;

    function handleChange(key: string, value: string) {
        setValues((prev) => ({ ...prev, [key]: value }));
    }

    function getLabel(key: string) {
        return META_KEYS.find((entry) => entry.key === key)?.label ?? key;
    }

    function renderFields(keys: readonly string[]) {
        return keys.map((key) => (
            <div className="admin-field" key={key}>
                <label>{getLabel(key)}</label>
                <input
                    value={values[key] ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            </div>
        ));
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
            <div className="admin-page-header admin-page-header-dense">
                <div>
                    <h2>Site Meta</h2>
                    <p className="admin-page-subtitle">
                        Edit hero, contact, social, and footer content with a live structured preview.
                    </p>
                </div>
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

            <div className="admin-meta-layout">
                <form className="admin-form admin-meta-form" onSubmit={handleSubmit}>
                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Hero</h3>
                        {renderFields(HERO_KEYS)}
                    </section>

                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Contact</h3>
                        {renderFields(CONTACT_KEYS)}
                    </section>

                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Social</h3>
                        {renderFields(SOCIAL_KEYS)}
                    </section>

                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Footer</h3>
                        {renderFields(FOOTER_KEYS)}
                    </section>

                    <button type="submit" disabled={pending || !isDirty}>
                        {pending ? "Saving..." : "Save All"}
                    </button>
                </form>

                <aside className="admin-meta-preview" aria-label="Site meta preview">
                    <section className="admin-preview-card">
                        <h3 className="admin-preview-title">Hero Preview</h3>
                        <p className="admin-preview-hero-title">
                            {values.heroTitle || "—"}
                        </p>
                        <p className="admin-preview-hero-subtitle">
                            {values.heroSubtitle || "—"}
                        </p>
                        <p className="admin-preview-hero-motto">
                            {values.heroMotto || "—"}
                        </p>
                        <p className="admin-preview-footer-text">
                            Image: {values.heroImage || "—"}
                        </p>
                    </section>

                    <section className="admin-preview-card">
                        <h3 className="admin-preview-title">Contact Preview</h3>
                        <p className="admin-preview-hero-subtitle">{values.contactHeading || "—"}</p>
                        <p className="admin-preview-footer-text">{values.contactSubheading || "—"}</p>
                        <p className="admin-preview-footer-text">{values.contactEmail || "—"}</p>
                    </section>

                    <section className="admin-preview-card">
                        <h3 className="admin-preview-title">Social + Footer</h3>
                        <p className="admin-preview-footer-text">GitHub: {values.githubUrl || "—"}</p>
                        <p className="admin-preview-footer-text">LinkedIn: {values.linkedinUrl || "—"}</p>
                        <p className="admin-preview-footer-text">YouTube: {values.youtubeUrl || "—"}</p>
                        <hr className="admin-preview-divider" />
                        <p className="admin-preview-footer-text">{values.footerText || "—"}</p>
                    </section>
                </aside>
            </div>
        </div>
    );
}
