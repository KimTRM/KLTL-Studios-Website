import Image from "next/image";
import styles from "@/features/projects/css/ProjectPage.module.css";
import type { ProjectDetail } from "@/features/projects/data/projectDetails";

type Props = {
    title: ProjectDetail["title"];
    tagline: ProjectDetail["tagline"];
    media: ProjectDetail["media"];
};

export default function ProjectHero({ title, tagline, media }: Props) {
    const heroMedia = media[0];

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroText}>
                <p className={styles.eyebrow}>Project Case Study</p>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.tagline}>{tagline}</p>
            </div>

            <div className={styles.heroMediaCard}>
                {heroMedia?.type === "video" ? (
                    <video
                        className={styles.heroVideo}
                        controls
                        playsInline
                        preload="metadata"
                        poster={heroMedia.poster}
                    >
                        <source src={heroMedia.src} />
                    </video>
                ) : (
                    <Image
                        src={heroMedia?.src ?? "/res/icon/KLTL_Studios.svg"}
                        alt={heroMedia?.alt ?? `${title} cover`}
                        width={1600}
                        height={900}
                        priority
                        className={styles.heroImage}
                    />
                )}
            </div>
        </section>
    );
}
