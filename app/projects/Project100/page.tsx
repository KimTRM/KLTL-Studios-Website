"use client"
import styles from "@/features/projects/css/ProjectPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const project = {
    title: "Project 100",
    subtitle: "An RPG to Learn Programming with Block Code",
    description: `
    I wanted to make programming less intimidating for beginners. Project 100 is a
    story-driven RPG that teaches fundamentals — variables, loops, conditions, and logic —
    through visual block-based puzzles. Built in Godot and designed for high school students,
    the goal was to make learning feel like play, not homework.
`,
    tags: [
        "Godot",
        "Block-Based Coding",
        "Educational Game",
        "RPG",
    ],
    image: "/res/Project100_Icon.svg",
    github: "https://github.com/KimTRM/PROJECT-100",
    playLink: "/games/project-100/index.html",

    gallery: [
        "/res/ScreenShots/Project100/Login.png",
        "/res/ScreenShots/Project100/Main.png",
        "/res/ScreenShots/Project100/Chapt.png",
        "/res/ScreenShots/Project100/Code.png",
        "/res/ScreenShots/Project100/CutSce.png",
        "/res/ScreenShots/Project100/PauseMenu.png",
        "/res/ScreenShots/Project100/Active.png",
        "/res/ScreenShots/Project100/Quiz.png",
        "/res/ScreenShots/Project100/Result.png",
    ]
};

export default function ProjectPage() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    return (
        <>
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
                                alt={`Screenshot ${index + 1}`}
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
                        <a
                            href={project.github}
                            target="_blank"
                            className={styles.btn}>
                            View on GitHub
                        </a>
                        <Link href="/projects" className={styles.btnOutline}>
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
                            width={960}
                            height={540}
                            className={styles.previewImage}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
