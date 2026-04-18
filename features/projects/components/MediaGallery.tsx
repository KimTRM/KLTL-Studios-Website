"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "@/features/projects/css/ProjectPage.module.css";
import type { ProjectDetail } from "@/features/projects/data/projectDetails";

type Props = {
    media: ProjectDetail["media"];
};

export default function MediaGallery({ media }: Props) {
    const imageItems = useMemo(
        () => media.filter((item) => item.type === "image"),
        [media],
    );
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    useEffect(() => {
        if (previewIndex === null || imageItems.length === 0) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPreviewIndex(null);
                return;
            }

            if (event.key === "ArrowRight") {
                setPreviewIndex((current) => {
                    if (current === null) {
                        return null;
                    }
                    return (current + 1) % imageItems.length;
                });
            }

            if (event.key === "ArrowLeft") {
                setPreviewIndex((current) => {
                    if (current === null) {
                        return null;
                    }
                    return (current - 1 + imageItems.length) % imageItems.length;
                });
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [previewIndex, imageItems]);

    return (
        <>
            <section className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Media Gallery</h2>
                <div className={styles.mediaGrid}>
                    {media.map((item, index) => (
                        <article key={`${item.src}-${index}`} className={styles.mediaCard}>
                            {item.type === "video" ? (
                                <video
                                    className={styles.galleryVideo}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    poster={item.poster}
                                >
                                    <source src={item.src} />
                                </video>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.mediaButton}
                                    onClick={() => {
                                        const indexInImages = imageItems.findIndex(
                                            (image) => image.src === item.src && image.alt === item.alt,
                                        );
                                        if (indexInImages >= 0) {
                                            setPreviewIndex(indexInImages);
                                        }
                                    }}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={720}
                                        height={420}
                                        className={styles.galleryImage}
                                        loading="lazy"
                                        sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 31vw"
                                    />
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {previewIndex !== null && imageItems[previewIndex] && (
                <div className={styles.viewerOverlay} onClick={() => setPreviewIndex(null)}>
                    <div className={styles.viewerDialog} onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.viewerClose}
                            onClick={() => setPreviewIndex(null)}
                            aria-label="Close image preview"
                        >
                            &times;
                        </button>

                        {imageItems.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={`${styles.viewerArrow} ${styles.viewerArrowLeft}`}
                                    aria-label="Previous image"
                                    onClick={() =>
                                        setPreviewIndex((current) => {
                                            if (current === null) {
                                                return null;
                                            }
                                            return (current - 1 + imageItems.length) % imageItems.length;
                                        })
                                    }
                                >
                                    &#8249;
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.viewerArrow} ${styles.viewerArrowRight}`}
                                    aria-label="Next image"
                                    onClick={() =>
                                        setPreviewIndex((current) => {
                                            if (current === null) {
                                                return null;
                                            }
                                            return (current + 1) % imageItems.length;
                                        })
                                    }
                                >
                                    &#8250;
                                </button>
                            </>
                        )}

                        <Image
                            src={imageItems[previewIndex].src}
                            alt={imageItems[previewIndex].alt}
                            width={1920}
                            height={1080}
                            className={styles.viewerImage}
                        />

                        {imageItems.length > 1 && (
                            <p className={styles.viewerCounter}>
                                {previewIndex + 1} / {imageItems.length}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
