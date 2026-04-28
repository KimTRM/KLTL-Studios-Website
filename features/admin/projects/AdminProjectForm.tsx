"use client";

import { useState, FormEvent, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useRouter } from "next/navigation";
import type { Doc } from "@/convex/_generated/dataModel";

type ProjectDoc = Doc<"projects">;

type ProjectSection = {
    title: string;
    content: string;
};

type ProjectMedia = {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
};

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function parseCSV(str: string): string[] {
    return str
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

function parseSections(draft: string): ProjectSection[] {
    return draft
        .split(/\n\n+/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => {
            const [titlePart, ...contentParts] = block.split("::");
            const title = titlePart?.trim() || "Section";
            const content = contentParts.join("::").trim() || block;
            return { title, content };
        });
}

function parseMedia(draft: string, fallbackSrc: string, fallbackTitle: string): ProjectMedia[] {
    return draft
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [typeRaw, srcRaw, altRaw, posterRaw] = line
                .split("|")
                .map((part) => part.trim());
            return {
                type: typeRaw === "video" ? "video" : "image",
                src: srcRaw || fallbackSrc,
                alt: altRaw || fallbackTitle || "Project media",
                poster: posterRaw || undefined,
            };
        });
}

function mediaToString(media: ProjectMedia[]): string {
    return media
        .map((item) => `${item.type}|${item.src}|${item.alt}|${item.poster ?? ""}`)
        .join("\n");
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
    const [demoLabel, setDemoLabel] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [year, setYear] = useState("");
    const [tagline, setTagline] = useState("");
    const [overview, setOverview] = useState("");
    const [role, setRole] = useState("");
    const [tools, setTools] = useState("");
    const [sectionsDraft, setSectionsDraft] = useState("");
    const [mediaDraft, setMediaDraft] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [editingMediaIndex, setEditingMediaIndex] = useState<number | null>(null);

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
            setDemoLabel(existing.demoLabel ?? "");
            setTechnologies(existing.technologies?.join(", ") ?? "");
            setYear(existing.year ?? "");
            setTagline(existing.tagline ?? "");
            setOverview(existing.overview ?? "");
            setRole(existing.role ?? "");
            setTools(existing.tools?.join(", ") ?? "");
            setSectionsDraft(
                existing.sections
                    ?.map((section) => `${section.title}::${section.content}`)
                    .join("\n\n") ?? "",
            );
            setMediaDraft(
                existing.media
                    ?.map((item) => `${item.type}|${item.src}|${item.alt}|${item.poster ?? ""}`)
                    .join("\n") ?? "",
            );
        }
    }, [existing]);

    function handleTitleChange(val: string) {
        setTitle(val);
        if (!isEdit) {
            setFormSlug(slugify(val));
        }
    }

    function handleAddMediaItem() {
        const parsed = parseMedia(mediaDraft, image, title);
        parsed.push({
            type: "image",
            src: "",
            alt: "New media item",
        });
        setMediaDraft(mediaToString(parsed));
        setEditingMediaIndex(parsed.length - 1);
    }

    function handleUpdateMediaItem(
        index: number,
        type: "image" | "video",
        src: string,
        alt: string,
        poster?: string,
    ) {
        const parsed = parseMedia(mediaDraft, image, title);
        if (index >= 0 && index < parsed.length) {
            parsed[index] = { type, src, alt, poster };
            setMediaDraft(mediaToString(parsed));
        }
    }

    function handleRemoveMediaItem(index: number) {
        const parsed = parseMedia(mediaDraft, image, title);
        if (index >= 0 && index < parsed.length) {
            parsed.splice(index, 1);
            setMediaDraft(mediaToString(parsed));
            setEditingMediaIndex(null);
        }
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
            const technologiesArray = parseCSV(technologies);
            const toolsArray = parseCSV(tools);
            const sectionsArray = parseSections(sectionsDraft);
            const mediaArray = parseMedia(mediaDraft, image, title);

            const payload = {
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
                demoLabel: demoLabel || undefined,
                technologies: technologiesArray.length > 0 ? technologiesArray : undefined,
                year: year || undefined,
                tagline: tagline || undefined,
                overview: overview || undefined,
                role: role || undefined,
                tools: toolsArray.length > 0 ? toolsArray : undefined,
                sections: sectionsArray.length > 0 ? sectionsArray : undefined,
                media: mediaArray.length > 0 ? mediaArray : undefined,
            };

            if (isEdit && existing) {
                await updateProject({
                    sessionToken: token,
                    id: existing._id,
                    ...payload,
                });
                setSuccess("Project updated.");
            } else {
                await createProject({
                    sessionToken: token,
                    ...payload,
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
        return <p className="admin-loading-note">Loading project...</p>;
    }

    if (isEdit && existing === null) {
        return <p className="admin-error">Project not found.</p>;
    }

    const previewTags = parseCSV(tags);
    const previewTechnologies = parseCSV(technologies);
    const previewTools = parseCSV(tools);
    const previewSections = parseSections(sectionsDraft);
    const previewMedia = parseMedia(mediaDraft, image, title);

    return (
        <div>
            <div className="admin-page-header admin-page-header-dense">
                <div>
                    <h2>{isEdit ? `Edit: ${existing?.title}` : "New Project"}</h2>
                    <p className="admin-page-subtitle">
                        Build both the listing card and detail experience from one editor.
                    </p>
                </div>
            </div>

            {error && <p className="admin-error">{error}</p>}
            {success && <p className="admin-success">{success}</p>}

            <div className="admin-project-editor-layout">
                <form className="admin-form admin-project-form" onSubmit={handleSubmit}>
                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Core Content</h3>
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

                        <div className="admin-field">
                            <label>Description *</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="admin-field">
                            <label>Tagline</label>
                            <input
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value)}
                                placeholder="Short hero line for project detail page"
                            />
                        </div>

                        <div className="admin-field">
                            <label>Overview</label>
                            <textarea
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                className="admin-textarea-md"
                                placeholder="Long-form project summary"
                            />
                        </div>
                    </section>

                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Media and Links</h3>
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

                        <div className="admin-form-row">
                            <div className="admin-field">
                                <label>Demo Link</label>
                                <input
                                    value={demoLink}
                                    onChange={(e) => setDemoLink(e.target.value)}
                                />
                            </div>
                            <div className="admin-field">
                                <label>Demo Label</label>
                                <input
                                    value={demoLabel}
                                    onChange={(e) => setDemoLabel(e.target.value)}
                                    placeholder="Open Demo / Download / Play Demo"
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>Media Gallery</label>
                            <p className="admin-field-hint">Add images and videos to the project gallery</p>

                            {previewMedia.length > 0 && (
                                <div className="admin-media-gallery-list">
                                    {previewMedia.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`admin-media-item ${editingMediaIndex === index ? "active" : ""}`}
                                            onClick={() => setEditingMediaIndex(index)}
                                        >
                                            {item.type === "image" ? (
                                                <div className="admin-media-thumbnail">
                                                    <img src={item.src} alt={item.alt} />
                                                </div>
                                            ) : (
                                                <div className="admin-media-thumbnail admin-media-video">
                                                    {item.poster ? (
                                                        <img src={item.poster} alt={item.alt} />
                                                    ) : (
                                                        <div className="admin-media-video-placeholder">🎬</div>
                                                    )}
                                                </div>
                                            )}
                                            <p className="admin-media-alt">{item.alt}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {editingMediaIndex !== null && (
                                <div className="admin-media-editor">
                                    <h4>Edit Media Item</h4>
                                    <div className="admin-form-row">
                                        <div className="admin-field">
                                            <label>Type</label>
                                            <select
                                                value={previewMedia[editingMediaIndex]?.type || "image"}
                                                onChange={(e) => {
                                                    const item = previewMedia[editingMediaIndex];
                                                    if (item) {
                                                        handleUpdateMediaItem(
                                                            editingMediaIndex,
                                                            e.target.value as "image" | "video",
                                                            item.src,
                                                            item.alt,
                                                            item.poster,
                                                        );
                                                    }
                                                }}
                                            >
                                                <option value="image">Image</option>
                                                <option value="video">Video</option>
                                            </select>
                                        </div>
                                        <div className="admin-field">
                                            <label>Source URL</label>
                                            <input
                                                value={previewMedia[editingMediaIndex]?.src || ""}
                                                onChange={(e) => {
                                                    const item = previewMedia[editingMediaIndex];
                                                    if (item) {
                                                        handleUpdateMediaItem(
                                                            editingMediaIndex,
                                                            item.type,
                                                            e.target.value,
                                                            item.alt,
                                                            item.poster,
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-field">
                                        <label>Alt Text</label>
                                        <input
                                            value={previewMedia[editingMediaIndex]?.alt || ""}
                                            onChange={(e) => {
                                                const item = previewMedia[editingMediaIndex];
                                                if (item) {
                                                    handleUpdateMediaItem(
                                                        editingMediaIndex,
                                                        item.type,
                                                        item.src,
                                                        e.target.value,
                                                        item.poster,
                                                    );
                                                }
                                            }}
                                        />
                                    </div>

                                    {previewMedia[editingMediaIndex]?.type === "video" && (
                                        <div className="admin-field">
                                            <label>Poster Image URL (optional)</label>
                                            <input
                                                value={previewMedia[editingMediaIndex]?.poster || ""}
                                                onChange={(e) => {
                                                    const item = previewMedia[editingMediaIndex];
                                                    if (item) {
                                                        handleUpdateMediaItem(
                                                            editingMediaIndex,
                                                            item.type,
                                                            item.src,
                                                            item.alt,
                                                            e.target.value || undefined,
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="admin-btn-group">
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-danger"
                                            onClick={() => handleRemoveMediaItem(editingMediaIndex)}
                                        >
                                            Remove Item
                                        </button>
                                        <button
                                            type="button"
                                            className="admin-btn"
                                            onClick={() => setEditingMediaIndex(null)}
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                className="admin-btn admin-btn-secondary"
                                onClick={handleAddMediaItem}
                            >
                                + Add Media Item
                            </button>
                        </div>
                    </section>

                    <section className="admin-panel-card">
                        <h3 className="admin-panel-title">Classification and Detail Blocks</h3>
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

                        <div className="admin-field">
                            <label>Subtitle</label>
                            <input
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                            />
                        </div>

                        <div className="admin-form-row">
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
                        </div>

                        <div className="admin-form-row">
                            <div className="admin-field">
                                <label>Role</label>
                                <input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Game Developer, Systems Designer"
                                />
                            </div>
                            <div className="admin-field">
                                <label>Tools (comma-separated)</label>
                                <input
                                    value={tools}
                                    onChange={(e) => setTools(e.target.value)}
                                    placeholder="e.g. Godot, Figma, Photoshop"
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>Sections (separate with blank line)</label>
                            <textarea
                                value={sectionsDraft}
                                onChange={(e) => setSectionsDraft(e.target.value)}
                                className="admin-textarea-lg"
                                placeholder="Problem and Purpose::What this project solves\n\nDevelopment Process::How it was built"
                            />
                        </div>

                        <div className="admin-checkbox">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                            />
                            <label htmlFor="featured">Featured</label>
                        </div>

                        <button type="submit" disabled={pending}>
                            {pending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Project"
                                    : "Create Project"}
                        </button>
                    </section>
                </form>

                <aside className="admin-project-preview" aria-label="Project preview panel">
                    <section className="admin-panel-card admin-preview-block">
                        <h3 className="admin-panel-title">Card Preview</h3>
                        <div className="admin-project-card-preview">
                            <div className="admin-project-card-media">
                                {image ? (
                                    <img src={image} alt={title || "Project cover preview"} />
                                ) : (
                                    <div className="admin-project-media-placeholder">No image</div>
                                )}
                            </div>
                            <h4>{title || "Untitled Project"}</h4>
                            <p>{description || "Project description preview."}</p>
                            <div className="admin-project-tag-list">
                                {(previewTags.length > 0 ? previewTags : [category || "project"])
                                    .slice(0, 4)
                                    .map((tag) => (
                                        <span key={tag} className="admin-project-tag">
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </section>

                    <section className="admin-panel-card admin-preview-block">
                        <h3 className="admin-panel-title">Detail Page Preview</h3>
                        <div className="admin-project-detail-preview">
                            <p className="admin-project-kicker">/{formSlug || "project-slug"}</p>
                            <h4>{title || "Untitled Project"}</h4>
                            <p className="admin-project-tagline">
                                {tagline || subtitle || "Project tagline preview."}
                            </p>
                            <p>{overview || description || "Project overview preview."}</p>

                            <div className="admin-project-meta-grid">
                                <div>
                                    <p className="admin-project-meta-label">Role</p>
                                    <p className="admin-project-meta-value">{role || category || "Not set"}</p>
                                </div>
                                <div>
                                    <p className="admin-project-meta-label">Tools</p>
                                    <p className="admin-project-meta-value">
                                        {(previewTools.length > 0
                                            ? previewTools
                                            : previewTechnologies
                                        )
                                            .slice(0, 4)
                                            .join(", ") || "Not set"}
                                    </p>
                                </div>
                            </div>

                            <p className="admin-project-meta-label">Sections</p>
                            <ul className="admin-project-section-list">
                                {(previewSections.length > 0
                                    ? previewSections
                                    : [{ title: "Overview", content: "No structured sections yet." }]
                                )
                                    .slice(0, 3)
                                    .map((section) => (
                                        <li key={section.title}>
                                            <strong>{section.title}</strong>
                                            <p>{section.content}</p>
                                        </li>
                                    ))}
                            </ul>

                            <p className="admin-project-meta-label">Media</p>
                            {previewMedia.length > 0 ? (
                                <div className="admin-media-preview-gallery">
                                    {previewMedia.map((item, index) => (
                                        <div key={index} className="admin-media-preview-item">
                                            {item.type === "image" ? (
                                                <img src={item.src} alt={item.alt} />
                                            ) : (
                                                <div className="admin-media-preview-video">
                                                    {item.poster ? (
                                                        <img src={item.poster} alt={item.alt} />
                                                    ) : (
                                                        <div className="admin-media-preview-video-placeholder">🎬</div>
                                                    )}
                                                </div>
                                            )}
                                            <p className="admin-media-preview-alt">{item.alt}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="admin-project-meta-value">No media items yet</p>
                            )}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}
