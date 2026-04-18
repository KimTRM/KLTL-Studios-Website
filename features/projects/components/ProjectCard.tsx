"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHover } from "@/features/motion";
import "../css/ProjectSection.css";

interface Props {
    slug: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

/**
 * Project card with Framer Motion hover lift.
 * WHY: The hover gives tactile depth feedback — the card floats up slightly,
 *      signaling interactivity without disrupting layout.
 */
export default function ProjectCard(props: Props) {
    const MotionLink = motion.create(Link);

    return (
        <MotionLink
            href={`/projects/${props.slug}`}
            className="project-card"
            aria-label={`View details about ${props.title} project`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardHover}
        >
            <article className="project-card-inner">
                <div className="project-icon">
                    <Image
                        src={props.image}
                        alt={`${props.title} icon`}
                        width={460}
                        height={160}
                        loading="lazy"
                        sizes="(max-width: 700px) 90vw, (max-width: 1200px) 46vw, 23vw"
                    />
                </div>
                <b>{props.title}</b>
                <p>{props.description}</p>
                <div className="project-card-tags" aria-label="Project tools">
                    {props.tags.slice(0, 4).map((tag, index) => (
                        <span key={`${tag}-${index}`} className="project-card-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        </MotionLink>
    );
}
