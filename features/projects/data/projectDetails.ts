function normalizeSlug(rawSlug: string): string {
    return decodeURIComponent(rawSlug).trim().toLowerCase();
}

export type ProjectDetailSection = {
    title: string;
    content: string;
};

export type ProjectDetailMedia = {
    type: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
};

export type ProjectDetail = {
    slug: string;
    title: string;
    tagline: string;
    overview: string;
    role: string;
    tools: string[];
    sections: ProjectDetailSection[];
    media: ProjectDetailMedia[];
    links?: {
        github?: string;
        demo?: string;
        demoLabel?: string;
    };
};

export type ProjectRecord = {
    slug: string;
    title: string;
    description: string;
    image: string;
    github?: string;
    playLink?: string;
    demoLink?: string;
    demoLabel?: string;
    tagline?: string;
    overview?: string;
    role?: string;
    tools?: string[];
    sections?: ProjectDetailSection[];
    media?: ProjectDetailMedia[];
    technologies?: string[];
    subtitle?: string;
    category?: string;
};

export function resolveProjectSlug(rawSlug: string): string | null {
    const normalized = normalizeSlug(rawSlug);
    if (normalized in ALIASES) {
        return ALIASES[normalized] ?? null;
    }
    if (normalized) {
        return normalized;
    }
    return null;
}

export function projectDetailFromRecord(project: ProjectRecord): ProjectDetail {
    const demo = project.playLink ?? project.demoLink;
    const demoLabel =
        project.demoLabel ?? (project.playLink ? "Play Demo" : "Open Demo");
    const links =
        project.github || demo ?
            {
                github: project.github,
                demo,
                demoLabel: demo ? demoLabel : undefined,
            }
        :   undefined;

    return {
        slug: project.slug,
        title: project.title,
        tagline: project.tagline ?? project.subtitle ?? project.description,
        overview: project.overview ?? project.description,
        role: project.role ?? project.category ?? "Project",
        tools: project.tools ?? project.technologies ?? [],
        sections: project.sections ?? [],
        media: project.media ?? [
            {
                type: "image",
                src: project.image,
                alt: project.title,
            },
        ],
        links,
    };
}
