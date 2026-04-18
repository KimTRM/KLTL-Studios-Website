import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailsView from "@/features/projects/components/ProjectDetailsView";
import {
    getProjectDetail,
    getProjectStaticSlugs,
    resolveProjectSlug,
} from "@/features/projects/data/projectDetails";

type Props = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getProjectStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectDetail(slug);

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
    const project = getProjectDetail(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailsView project={project} />;
}
