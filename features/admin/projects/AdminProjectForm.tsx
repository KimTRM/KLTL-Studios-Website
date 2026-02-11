"use client";

import { useState, FormEvent, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useRouter } from "next/navigation";
import type { Doc } from "@/convex/_generated/dataModel";

type ProjectDoc = Doc<"projects">;

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/**
 * AdminProjectForm — create or edit a project.
 *
 * Pass `slug` to edit an existing project, omit it to create a new one.
 */
export default function AdminProjectForm({ slug }: { slug?: string }) {
    const { token } = useAdminAuth();
    const router = useRouter();

    const existing: ProjectDoc | null | undefined = useQuery(
        api.projects.queries.getProjectBySlug,
        slug ? { slug } : "skip",
    );

    const createProject = useMutation(api.projects.mutations.createProject);
    const updateProject = useMutation(api.projects.mutations.updateProject);

    const isEdit = !!slug;

    // Form state
    const [title, setTitle] = useState("");
    const [formSlug, setFormSlug] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [link, setLink] = useState("");
    const [featured, setFeatured] = useState(false);
    const [category, setCategory] = useState<string>("");
    const [tags, setTags] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [github, setGithub] = useState("");
    const [playLink, setPlayLink] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [year, setYear] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (existing) {
            setTitle(existing.title);
            setFormSlug(existing.slug);
            setDescription(existing.description);
            setImage(existing.image);
            setLink(existing.link);
            setFeatured(existing.featured);
            setCategory(existing.category ?? "");
            setTags(existing.tags?.join(", ") ?? "");
            setSubtitle(existing.subtitle ?? "");
            setGithub(existing.github ?? "");
            setPlayLink(existing.playLink ?? "");
            setDemoLink(existing.demoLink ?? "");
            setTechnologies(existing.technologies?.join(", ") ?? "");
            setYear(existing.year ?? "");
        }
    }, [existing]);

    // Auto-generate slug from title (only for new projects)
    function handleTitleChange(val: string) {
        setTitle(val);
        if (!isEdit) {
            setFormSlug(slugify(val));
        }
    }

    function parseCSV(str: string): string[] {
        return str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!token) return;
        setError(null);
        setSuccess(null);
        setPending(true);

        try {
            const categoryValue =
                category && ["game", "web", "design", "other"].includes(category)
                    ? (category as "game" | "web" | "design" | "other")
                    : undefined;

            const tagsArray = parseCSV(tags);
            const techArray = parseCSV(technologies);

            if (isEdit && existing) {
                await updateProject({
                    sessionToken: token,
                    id: existing._id,
                    title,
                    slug: formSlug,
                    description,
                    image,
                    link,
                    featured,
                    category: categoryValue,
                    tags: tagsArray.length > 0 ? tagsArray : undefined,
                    subtitle: subtitle || undefined,
                    github: github || undefined,
                    playLink: playLink || undefined,
                    demoLink: demoLink || undefined,
                    technologies: techArray.length > 0 ? techArray : undefined,
                    year: year || undefined,
                });
                setSuccess("Project updated.");
            } else {
                await createProject({
                    sessionToken: token,
                    title,
                    slug: formSlug,
                    description,
                    image,
                    link,
                    featured,
                    category: categoryValue,
                    tags: tagsArray.length > 0 ? tagsArray : undefined,
                    subtitle: subtitle || undefined,
                    github: github || undefined,
                    playLink: playLink || undefined,
                    demoLink: demoLink || undefined,
                    technologies: techArray.length > 0 ? techArray : undefined,
                    year: year || undefined,
                });
                setSuccess("Project created.");
                router.push("/admin/projects");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Save failed");
        } finally {
            setPending(false);
        }
    }

    if (isEdit && existing === undefined) {
        return <p style={{ color: "#888" }}>Loading project…</p>;
    }

    if (isEdit && existing === null) {
        return <p className="admin-error">Project not found.</p>;
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>{isEdit ? `Edit: ${existing?.title}` : "New Project"}</h2>
            </div>

            {error && <p className="admin-error">{error}</p>}
            {success && <p className="admin-success">{success}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>
                {/* Title + Slug */}
                <div className="admin-form-row">
                    <div className="admin-field">
                        <label>Title *</label>
                        <input
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            required
                        />
                    </div>
                    <div className="admin-field">
                        <label>Slug *</label>
                        <input
                            value={formSlug}
                            onChange={(e) => setFormSlug(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="admin-field">
                    <label>Description *</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Subtitle */}
                <div className="admin-field">
                    <label>Subtitle</label>
                    <input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                </div>

                {/* Image + Link */}
                <div className="admin-form-row">
                    <div className="admin-field">
                        <label>Image URL *</label>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="admin-field">
                        <label>Link *</label>
                        <input
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Category + Year */}
                <div className="admin-form-row">
                    <div className="admin-field">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">None</option>
                            <option value="game">Game</option>
                            <option value="web">Web</option>
                            <option value="design">Design</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="admin-field">
                        <label>Year</label>
                        <input
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="e.g. 2025"
                        />
                    </div>
                </div>

                {/* Featured */}
                <div className="admin-checkbox">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <label htmlFor="featured">Featured</label>
                </div>

                {/* Links */}
                <div className="admin-form-row">
                    <div className="admin-field">
                        <label>GitHub URL</label>
                        <input
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label>Play Link</label>
                        <input
                            value={playLink}
                            onChange={(e) => setPlayLink(e.target.value)}
                        />
                    </div>
                </div>

                <div className="admin-field">
                    <label>Demo Link</label>
                    <input
                        value={demoLink}
                        onChange={(e) => setDemoLink(e.target.value)}
                    />
                </div>

                {/* Tags + Technologies (comma-separated) */}
                <div className="admin-field">
                    <label>Tags (comma-separated)</label>
                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g. godot, education, rpg"
                    />
                </div>

                <div className="admin-field">
                    <label>Technologies (comma-separated)</label>
                    <input
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        placeholder="e.g. Godot, GDScript, Tiled"
                    />
                </div>

                {/* Submit */}
                <button type="submit" disabled={pending}>
                    {pending
                        ? "Saving…"
                        : isEdit
                            ? "Update Project"
                            : "Create Project"}
                </button>
            </form>
        </div>
    );
}
