import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import ProjectDetailsView from "@/features/projects/components/ProjectDetailsView";
import {
    projectDetailFromRecord,
    resolveProjectSlug,
} from "@/features/projects/data/projectDetails";

type Props = {
    params: Promise<{ slug: string }>;
};

function getConvexClient() {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
        throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
    }
    return new ConvexHttpClient(url);
}

async function fetchProjectDetail(rawSlug: string) {
    const slug = resolveProjectSlug(rawSlug);
    if (!slug) {
        return null;
    }

    const client = getConvexClient();
    const project = await client.query(api.projects.queries.getProjectBySlug, {
        slug,
    });

    return project ? projectDetailFromRecord(project) : null;
}

export async function generateStaticParams() {
    const client = getConvexClient();
    const projects = await client.query(api.projects.queries.getAllIncludingArchived);

    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await fetchProjectDetail(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.tagline,
        alternates: {
            canonical: `/projects/${resolveProjectSlug(slug) ?? slug}`,
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = await fetchProjectDetail(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailsView project={project} />;
}
