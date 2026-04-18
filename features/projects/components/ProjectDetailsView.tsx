"use client";

import Link from "next/link";
import styles from "@/features/projects/css/ProjectPage.module.css";
import type { ProjectDetail } from "@/features/projects/data/projectDetails";
import ProjectHero from "@/features/projects/components/ProjectHero";
import ProjectSection from "@/features/projects/components/ProjectSection";
import TechStack from "@/features/projects/components/TechStack";
import MediaGallery from "@/features/projects/components/MediaGallery";

type Props = {
    project: ProjectDetail;
};

export default function ProjectDetailsView({ project }: Props) {
    return (
        <section className={styles.wrapper}>
            <article className={styles.container}>
                <ProjectHero title={project.title} tagline={project.tagline} media={project.media} />

                <div className={styles.bentoGrid}>
                    <div className={styles.bentoWide}>
                        <ProjectSection title="Overview" content={project.overview} />
                    </div>

                    <div className={styles.bentoSide}>
                        <TechStack role={project.role} tools={project.tools} />
                    </div>

                    {project.sections.map((section) => (
                        <div key={section.title} className={styles.bentoCell}>
                            <ProjectSection title={section.title} content={section.content} />
                        </div>
                    ))}

                    <div className={styles.bentoFull}>
                        <MediaGallery media={project.media} />
                    </div>

                    <div className={styles.bentoFull}>
                        <section className={styles.sectionCard}>
                            <h2 className={styles.sectionTitle}>Project Links</h2>
                            <div className={styles.links}>
                                {project.links?.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.btn}
                                    >
                                        View on GitHub
                                    </a>
                                )}

                                {project.links?.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.btnOutline}
                                    >
                                        {project.links.demoLabel ?? "Open Demo"}
                                    </a>
                                )}

                                <Link href="/projects" className={styles.btnGhost}>
                                    Back to Projects
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </article>
        </section>
    );
}
