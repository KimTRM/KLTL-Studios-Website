"use client"
import styles from "@/features/projects/css/ProjectPage.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const project = {
    title: "Design Showcase",
    subtitle: "UI/UX Design, Visual Branding & Creative Work",
    description: `
    A collection of my design work — UI/UX, visual branding, and creative experiments.
    Each piece reflects my approach: combine aesthetics with clarity, and let the work
    speak before the explanation does. Most of this started from curiosity, not a brief.
`,
    tags: [
        "UI/UX Design",
        "Figma",
        "Photoshop",
        "Visual Branding",
        "Interface Design",
    ],
    image: "/res/icon/KLTL_Studios.svg",

    gallery: [
        // Add your design screenshots here
        "/res/icon/KLTL_Studios.svg",
    ]
};

export default function DesignShowcase() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    return (
        <>
            <Head>
                <title>{project.title} | KLTL Studios</title>
            </Head>
            <main className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.subtitle}>{project.subtitle}</p>
                    <p className={styles.description}>{project.description}</p>

                    <Image
                        width={100}
                        height={100}
                        src={project.image}
                        alt={project.title}
                        className={styles.banner}
                    />

                    <div className={styles.gallery}>
                        {project.gallery.map((src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`Design ${index + 1}`}
                                width={300}
                                height={180}
                                className={styles.galleryImage}
                                onClick={() => setPreviewImage(src)}
                            />
                        ))}
                    </div>

                    <div className={styles.tagList}>
                        {project.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className={styles.links}>
                        <Link
                            href="/projects"
                            className={styles.btnOutline}>
                            ← All Projects
                        </Link>
                    </div>
                </div>
            </main>

            {previewImage && (
                <div className={styles.previewOverlay} onClick={() => setPreviewImage(null)}>
                    <div className={styles.previewContainer} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setPreviewImage(null)}>
                            &times;
                        </button>
                        <Image
                            src={previewImage}
                            alt="Preview"
                            width={1200}
                            height={800}
                            className={styles.previewImage}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
