"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardHover } from "@/features/motion";
import "../css/ProjectSection.css";

interface Props {
    title: string;
    description: string;
    image: string;
    link: string;
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
            href={props.link}
            className="project-card"
            aria-label={`View details about ${props.title} project`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardHover}
        >
            <article>
                <div className="project-icon">
                    <Image
                        src={props.image}
                        alt={`${props.title} icon`}
                        width={460}
                        height={160}
                        loading="lazy"
                        sizes="(max-width: 700px) 90vw, 280px"
                    />
                </div>
                <b>{props.title}</b>
                <p>{props.description}</p>
            </article>
        </MotionLink>
    );
}
