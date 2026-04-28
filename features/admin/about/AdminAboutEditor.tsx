"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminEditField from "../components/AdminEditField";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useInlineEditState } from "../hooks/useInlineEditState";
import type { Id, Doc } from "@/convex/_generated/dataModel";

type AboutDoc = Doc<"aboutSections">;

type SectionEditorMode = "text" | "rows" | "list";

type SectionField = {
    label: string;
    placeholder: string;
};

type SectionBlueprint = {
    title: string;
    purpose: string;
    formatHint: string;
    templateHeading: string;
    templateBody: string;
    editor: SectionEditorMode;
    fields: SectionField[];
    minRows?: number;
};

const SECTION_BLUEPRINTS: SectionBlueprint[] = [
    {
        title: "Identity",
        purpose: "Hero heading, brand, and opening statement.",
        formatHint: "Use `||` to split brand, subheading, and narrative paragraphs.",
        templateHeading: "Kim Louise Labrador",
        templateBody:
            "KLTL Studios||Developer · Designer · Musician||I build digital experiences that blend structure, creativity, and atmosphere.||The work is rooted in practical systems, but it always leaves room for design, motion, and sound to shape the final feel.",
        editor: "text",
        fields: [],
    },
    {
        title: "About Me",
        purpose: "Short background narrative in readable paragraphs.",
        formatHint: "Use `||` between paragraphs to keep the public page airy.",
        templateHeading: "About Me",
        templateBody:
            "I am Kim, the creator behind KLTL Studios. I build digital work that sits between code, design, and sound.||My process usually starts with structure, then layers visuals, motion, and tone.||The goal is clarity, atmosphere, and a result that still feels human.",
        editor: "text",
        fields: [],
    },
    {
        title: "What I Do",
        purpose: "Card grid for key disciplines and focus areas.",
        formatHint: "Use `|` inside each card row: title | description.",
        templateHeading: "What I Do",
        templateBody:
            "Game Dev|Interactive systems, gameplay loops, and educational game ideas built with a creator-first mindset.||Web|Modern front-end experiences with thoughtful hierarchy, responsive layouts, and practical implementation.||UI/UX|Interfaces that stay readable, expressive, and easy to navigate.||Multimedia|Music, visuals, photography, and motion cues that enrich the work.",
        editor: "rows",
        fields: [
            { label: "Focus", placeholder: "Game Dev" },
            { label: "Description", placeholder: "Interactive systems, gameplay loops, and educational game ideas." },
        ],
        minRows: 1,
    },
    {
        title: "Education",
        purpose: "Minimal academic background block.",
        formatHint: "Use `|` as: degree | status | detail.",
        templateHeading: "Education",
        templateBody:
            "Bachelor of Science in Information Technology|Currently pursuing|Grounding the creative side in technical foundations and systems thinking.",
        editor: "rows",
        fields: [
            { label: "Program", placeholder: "Bachelor of Science in Information Technology" },
            { label: "Status", placeholder: "Currently pursuing" },
            { label: "Detail", placeholder: "Grounding the creative side in technical foundations and systems thinking." },
        ],
        minRows: 1,
    },
    {
        title: "Achievements",
        purpose: "Selected projects and competition-style highlights.",
        formatHint: "Use `|` as: title | event | description.",
        templateHeading: "Achievements and Competitions",
        templateBody:
            "Project 100|Educational RPG Game|A learning-focused game that turns programming fundamentals into interactive quests.||KnowledgeSweeper|Educational Quiz Game|A Minesweeper-inspired concept that layers quiz prompts onto the classic puzzle loop.||Senate Website Redesign|Web Development Project|A redesign effort centered on clearer UX and stronger structure.",
        editor: "rows",
        fields: [
            { label: "Title", placeholder: "Project 100" },
            { label: "Category", placeholder: "Educational RPG Game" },
            { label: "Description", placeholder: "A learning-focused game that turns programming fundamentals into interactive quests." },
        ],
        minRows: 1,
    },
    {
        title: "Certificates",
        purpose: "Expandable credential cards for certificates and awards.",
        formatHint: "Use `|` as: title | issuer | year | description.",
        templateHeading: "Certificates",
        templateBody:
            "Certificate archive|Workspace data|Pending|No verified certificate entries were present in the repository.||Future credential slot|To be added|—|Expandable space reserved for certificates you want to highlight.",
        editor: "rows",
        fields: [
            { label: "Title", placeholder: "Certificate archive" },
            { label: "Issuer", placeholder: "Workspace data" },
            { label: "Year", placeholder: "Pending" },
            { label: "Description", placeholder: "No verified certificate entries were present in the repository." },
        ],
        minRows: 1,
    },
    {
        title: "Personal Details",
        purpose: "Minimal contact and quick facts.",
        formatHint: "Use `|` as: label | value | href.",
        templateHeading: "Personal Details",
        templateBody:
            "Email|kimlabrador71@gmail.com|mailto:kimlabrador71@gmail.com||GitHub|kimtrm|https://github.com/kimtrm||LinkedIn|Kim Louise Labrador|https://www.linkedin.com/in/kim-louise-labrador/||Brand|KLTL Studios|/",
        editor: "rows",
        fields: [
            { label: "Label", placeholder: "Email" },
            { label: "Value", placeholder: "kimlabrador71@gmail.com" },
            { label: "Link", placeholder: "mailto:kimlabrador71@gmail.com" },
        ],
        minRows: 1,
    },
    {
        title: "Hobbies",
        purpose: "Short chips or comma-separated interests.",
        formatHint: "Use commas or line breaks for the list.",
        templateHeading: "Hobbies and Interests",
        templateBody:
            "Composing and arranging music, Photography and visual framing, Building game ideas into playable systems, Refining UI details and brand identity, Experimenting with motion and atmosphere.",
        editor: "list",
        fields: [{ label: "Interest", placeholder: "Composing and arranging music" }],
        minRows: 1,
    },
];

const DEFAULT_TEMPLATE = SECTION_BLUEPRINTS[0];

function splitBlocks(text: string): string[] {
    return text
        .split(/\n\s*\n+|\|\|/)
        .map((segment) => segment.replace(/^\s+/, ""))
        .filter(Boolean);
}

function parseList(text: string): string[] {
    return text
        .split(/[\n,;•]+/)
        .map((part) => part.replace(/^\s+/, ""))
        .filter(Boolean);
}

function ensureRowWidth(values: string[], width: number): string[] {
    const cells = [...values];
    while (cells.length < width) {
        cells.push("");
    }
    return cells.slice(0, width);
}

function parseStructuredRows(body: string, fieldCount: number): string[][] {
    const rows = splitBlocks(body);
    if (rows.length === 0) {
        return [Array.from({ length: fieldCount }, () => "")];
    }

    return rows.map((row) => ensureRowWidth(row.split("|").map((part) => part.replace(/^\s+/, "")), fieldCount));
}

function parseListRows(body: string): string[][] {
    const rows = parseList(body);
    return rows.length > 0 ? rows.map((item) => [item]) : [[""]];
}

function serializeStructuredRows(rows: string[][]): string {
    return rows.map((row) => row.join("|")).join("||");
}

function serializeListRows(rows: string[][]): string {
    return rows
        .map((row) => row[0] ?? "")
        .filter(Boolean)
        .join(", ");
}

function addRow(body: string, blueprint: SectionBlueprint): string {
    if (blueprint.editor === "list") {
        return serializeListRows([...parseListRows(body), [""]]);
    }

    return serializeStructuredRows([
        ...parseStructuredRows(body, blueprint.fields.length),
        Array.from({ length: blueprint.fields.length }, () => ""),
    ]);
}

function updateRowCell(
    body: string,
    blueprint: SectionBlueprint,
    rowIndex: number,
    cellIndex: number,
    value: string,
): string {
    if (blueprint.editor === "list") {
        const rows = parseListRows(body);
        rows[rowIndex] = [value];
        return serializeListRows(rows);
    }

    const rows = parseStructuredRows(body, blueprint.fields.length);
    rows[rowIndex] = ensureRowWidth(rows[rowIndex] ?? [], blueprint.fields.length);
    rows[rowIndex][cellIndex] = value;
    return serializeStructuredRows(rows);
}

function removeRow(body: string, blueprint: SectionBlueprint, rowIndex: number): string {
    const minimumRows = blueprint.minRows ?? 1;

    if (blueprint.editor === "list") {
        const rows = parseListRows(body);
        if (rows.length <= minimumRows) {
            return body;
        }

        rows.splice(rowIndex, 1);
        return serializeListRows(rows);
    }

    const rows = parseStructuredRows(body, blueprint.fields.length);
    if (rows.length <= minimumRows) {
        return body;
    }

    rows.splice(rowIndex, 1);
    return serializeStructuredRows(rows);
}

function StructuredBodyEditor({
    body,
    blueprint,
    onChange,
}: {
    body: string;
    blueprint: SectionBlueprint;
    onChange: (nextBody: string) => void;
}) {
    const rows = blueprint.editor === "list" ? parseListRows(body) : parseStructuredRows(body, blueprint.fields.length);
    const canRemove = rows.length > (blueprint.minRows ?? 1);

    return (
        <div className="admin-about-structured">
            <p className="admin-about-structured__hint">{blueprint.formatHint}</p>

            <div className="admin-about-structured__rows">
                {rows.map((row, rowIndex) => (
                    <article key={`${blueprint.title}-${rowIndex}`} className="admin-about-structured__row">
                        <div className="admin-about-structured__fields">
                            {blueprint.fields.map((field, fieldIndex) => (
                                <div key={field.label} className="admin-field admin-field-tight">
                                    <label>{field.label}</label>
                                    <input
                                        value={row[fieldIndex] ?? ""}
                                        onChange={(e) =>
                                            onChange(
                                                updateRowCell(body, blueprint, rowIndex, fieldIndex, e.target.value),
                                            )
                                        }
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            className="admin-btn admin-btn-secondary admin-about-structured__remove"
                            onClick={() => onChange(removeRow(body, blueprint, rowIndex))}
                            disabled={!canRemove}
                            title="Remove row"
                        >
                            Remove
                        </button>
                    </article>
                ))}
            </div>

            <button className="admin-btn admin-btn-secondary admin-about-structured__add" onClick={() => onChange(addRow(body, blueprint))}>
                + Add row
            </button>
        </div>
    );
}

/**
 * AdminAboutEditor — section-aware editing for the redesigned About page.
 *
 * The public page renders `aboutSections` in order, so this editor focuses
 * on clarity, template hints, and fast section updates rather than a generic
 * document editor feel.
 */
export default function AdminAboutEditor() {
    const { token } = useAdminAuth();
    const sections = useQuery(api.about.queries.getAll);

    const updateSection = useMutation(api.about.mutations.updateAboutSection);
    const reorderSections = useMutation(api.about.mutations.reorderAboutSections);
    const createSection = useMutation(api.about.mutations.createAboutSection);
    const deleteSection = useMutation(api.about.mutations.deleteAboutSection);

    const [newHeading, setNewHeading] = useState(DEFAULT_TEMPLATE.templateHeading);
    const [newBody, setNewBody] = useState(DEFAULT_TEMPLATE.templateBody);
    const [templateIndex, setTemplateIndex] = useState(0);
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    const { getEdited, setField, clearItem, isDirty } =
        useInlineEditState<{ heading: string; body: string }>();

    const missingCount = Math.max(0, SECTION_BLUEPRINTS.length - (sections?.length ?? 0));

    useEffect(() => {
        const blueprint = SECTION_BLUEPRINTS[templateIndex] ?? DEFAULT_TEMPLATE;
        setNewHeading(blueprint.templateHeading);
        setNewBody(blueprint.templateBody);
    }, [templateIndex]);

    if (!token) return null;
    if (sections === undefined) {
        return <p className="admin-loading-note">Loading sections...</p>;
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
                heading: newHeading,
                body: newBody,
            });
            setTemplateIndex(0);
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
        <div className="admin-about-editor">
            <div className="admin-page-header admin-page-header-dense">
                <div>
                    <h2>About Page Content</h2>
                    <p className="admin-page-subtitle">
                        Manage each About section in order. Use the field hints to keep public rendering clean and consistent.
                    </p>
                </div>
            </div>

            <section className="admin-stats-grid admin-about-stats-row" aria-label="About page status">
                <div className="admin-stat-card">
                    <p className="admin-stat-label">Live sections</p>
                    <p className="admin-stat-value">{sections.length}</p>
                </div>
                <div className="admin-stat-card">
                    <p className="admin-stat-label">Templates</p>
                    <p className="admin-stat-value">{SECTION_BLUEPRINTS.length}</p>
                </div>
                <div className="admin-stat-card">
                    <p className="admin-stat-label">Missing</p>
                    <p className="admin-stat-value">{missingCount}</p>
                </div>
            </section>

            <section className="admin-panel-card admin-about-guide-strip">
                <h3 className="admin-panel-title">Section Format Guide</h3>
                <div className="admin-about-guide-pills">
                    {SECTION_BLUEPRINTS.map((item, index) => (
                        <span key={item.title} className="admin-about-guide-pill" title={item.formatHint}>
                            {String(index + 1).padStart(2, "0")} {item.title}
                        </span>
                    ))}
                </div>
            </section>

            {feedback && (
                <p className={feedback.type === "error" ? "admin-error" : "admin-success"}>
                    {feedback.msg}
                </p>
            )}

            <section className="admin-about-list" aria-label="Editable about sections">
                {sections.map((s, i) => {
                    const edited = getEdited(s);
                    const hasChanges = isDirty(s);
                    const guide = SECTION_BLUEPRINTS[i] ?? {
                        title: "Custom",
                        purpose: "A custom section not covered by the preset templates.",
                        formatHint: "Use plain text or your own delimiter pattern.",
                        editor: "text" as const,
                        fields: [],
                    };

                    return (
                        <article key={s._id} className="admin-panel-card admin-about-section-card">
                            <div className="admin-about-section-card__meta">
                                <p className="admin-about-section-card__order">
                                    Section {String(i + 1).padStart(2, "0")} · {guide.title}
                                </p>
                                <p className="admin-about-section-card__purpose">{guide.purpose}</p>
                                <p className="admin-about-section-card__hint">{guide.formatHint}</p>
                            </div>

                            <div className="admin-about-card__content">
                                <AdminEditField
                                    label="Heading"
                                    value={edited.heading}
                                    onChange={(e) => setField(s._id, "heading", e.target.value)}
                                    placeholder="Section heading"
                                />

                                {guide.editor === "text" ? (
                                    <AdminEditField
                                        label={
                                            <span>
                                                Body
                                                <span className="admin-field-hint">{guide.formatHint}</span>
                                            </span>
                                        }
                                        value={edited.body}
                                        onChange={(e) => setField(s._id, "body", e.target.value)}
                                        multiline
                                        minHeight={120}
                                        placeholder="Section body text"
                                    />
                                ) : (
                                    <StructuredBodyEditor
                                        body={edited.body}
                                        blueprint={guide}
                                        onChange={(nextBody) => setField(s._id, "body", nextBody)}
                                    />
                                )}

                                <div className="admin-about-card__actions admin-btn-group">
                                    <button
                                        className="admin-btn admin-btn-secondary"
                                        onClick={() => handleMove(i, -1)}
                                        disabled={i === 0}
                                        title="Move up"
                                    >
                                        Move up
                                    </button>
                                    <button
                                        className="admin-btn admin-btn-secondary"
                                        onClick={() => handleMove(i, 1)}
                                        disabled={i === sections.length - 1}
                                        title="Move down"
                                    >
                                        Move down
                                    </button>
                                    <button
                                        className="admin-btn admin-btn-primary"
                                        onClick={() => handleSave(s)}
                                        disabled={!hasChanges}
                                    >
                                        Save changes
                                    </button>
                                    <button
                                        className="admin-btn admin-btn-danger"
                                        onClick={() => handleDelete(s._id, s.heading)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section className="admin-panel-card admin-about-create">
                <div className="admin-about-create__header">
                    <div>
                        <h3 className="admin-panel-title">Add New Section</h3>
                        <p className="admin-about-create__note">Select a template and customize before adding it to the page.</p>
                    </div>
                </div>

                <div className="admin-about-create__toolbar">
                    <div className="admin-field admin-field-tight">
                        <label>Template</label>
                        <select
                            value={templateIndex}
                            onChange={(e) => setTemplateIndex(Number(e.target.value))}
                        >
                            {SECTION_BLUEPRINTS.map((blueprint, index) => (
                                <option key={blueprint.title} value={index}>
                                    {String(index + 1).padStart(2, "0")} {blueprint.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="admin-field admin-field-tight">
                        <label>Heading</label>
                        <input
                            value={newHeading}
                            onChange={(e) => setNewHeading(e.target.value)}
                            placeholder="Section heading"
                        />
                    </div>
                </div>

                <div className="admin-field admin-field-compact-gap">
                    <label>
                        Body
                        <span className="admin-field-hint">
                            {SECTION_BLUEPRINTS[templateIndex]?.formatHint}
                        </span>
                    </label>
                    {SECTION_BLUEPRINTS[templateIndex]?.editor === "text" ? (
                        <textarea
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            placeholder="Section body text"
                            className="admin-textarea-sm"
                        />
                    ) : (
                        <StructuredBodyEditor
                            body={newBody}
                            blueprint={SECTION_BLUEPRINTS[templateIndex] ?? DEFAULT_TEMPLATE}
                            onChange={setNewBody}
                        />
                    )}
                </div>

                <div className="admin-about-create__actions">
                    <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => setTemplateIndex(0)}
                    >
                        Reset to identity template
                    </button>
                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={handleCreate}
                        disabled={!newHeading.trim()}
                    >
                        + Add section
                    </button>
                </div>
            </section>
        </div>
    );
}