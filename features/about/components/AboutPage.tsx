"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnimatedSection from "@/features/ui/AnimatedSection";
import "@/features/about/css/about.css";

type AboutSection = {
    heading: string;
    body: string;
};

const FALLBACK_SECTIONS: AboutSection[] = [
    {
        heading: "Kim Louise Labrador",
        body: "KLTL Studios||Developer · Designer · Musician||I build digital experiences that blend structure, creativity, and atmosphere. The work is rooted in practical systems, but it always leaves room for design, motion, and sound to shape the final feel.",
    },
    {
        heading: "About Me",
        body: "I am Kim, the creator behind KLTL Studios. I build digital work that sits between code, design, and sound, with a strong preference for interfaces that feel intentional rather than overworked.||My process usually starts with structure. I like shaping systems first, then layering visuals, motion, and tone until the experience feels cohesive. That approach shows up in websites, game prototypes, and multimedia experiments alike.||The goal is rarely just to make something functional. I want the result to feel clear, atmospheric, and memorable enough to read like a portfolio piece without losing the human side of the story.",
    },
    {
        heading: "What I Do",
        body: "Game Dev|Interactive systems, gameplay loops, and educational game ideas built with a creator-first mindset.||Web|Modern front-end experiences with thoughtful hierarchy, responsive layouts, and practical implementation.||UI/UX|Interfaces that stay readable, expressive, and easy to navigate while still feeling visually distinct.||Multimedia|Music, visuals, photography, and motion cues that help the work feel richer than a static screen.",
    },
    {
        heading: "Education",
        body: "Bachelor of Science in Information Technology|Currently pursuing|Grounding the creative side in technical foundations, problem solving, and systems thinking.",
    },
    {
        heading: "Achievements and Competitions",
        body: "Project 100|Educational RPG Game|A learning-focused game that turns programming fundamentals into interactive quests and puzzle progression.||KnowledgeSweeper|Educational Quiz Game|A Minesweeper-inspired concept that layers quiz prompts onto the classic puzzle loop for faster learning.||Senate Website Redesign|Web Development Project|A complete redesign effort centered on clearer UX, stronger structure, and a more modern presentation.",
    },
    {
        heading: "Certificates",
        body: "Certificate archive|Workspace data|Pending|No verified certificate entries were present in the repository, so this section is ready to be filled from the admin page.||Future credential slot|To be added|—|Expandable space reserved for certificates you want to highlight once they are documented.",
    },
    {
        heading: "Personal Details",
        body: "Email|kimlabrador71@gmail.com|mailto:kimlabrador71@gmail.com||GitHub|kimtrm|https://github.com/kimtrm||LinkedIn|Kim Louise Labrador|https://www.linkedin.com/in/kim-louise-labrador/||Brand|KLTL Studios|/",
    },
    {
        heading: "Hobbies and Interests",
        body: "Composing and arranging music, Photography and visual framing, Building game ideas into playable systems, Refining UI details and brand identity, Experimenting with motion and atmosphere.",
    },
];

const IDENTIFIER_PILLS = ["Full-stack thinking", "Game systems", "UI/UX direction", "Multimedia craft"];

function splitBlocks(text: string): string[] {
    return text
        .split(/\n\s*\n+|\|\|/)
        .map((segment) => segment.trim())
        .filter(Boolean);
}

function parseRows(text: string): string[][] {
    return splitBlocks(text).map((block) =>
        block.split("|").map((part) => part.trim()).filter(Boolean),
    );
}

function parseList(text: string): string[] {
    return text
        .split(/[\n,;•]+/)
        .map((part) => part.trim())
        .filter(Boolean);
}

function getSection(sections: AboutSection[], index: number): AboutSection {
    return sections[index] ?? FALLBACK_SECTIONS[index];
}

export default function AboutPage() {
    const sections = useQuery(api.about.queries.getAll) ?? [];

    const hero = getSection(sections, 0);
    const aboutMe = getSection(sections, 1);
    const whatIDo = getSection(sections, 2);
    const education = getSection(sections, 3);
    const achievements = getSection(sections, 4);
    const certificates = getSection(sections, 5);
    const personalDetails = getSection(sections, 6);
    const hobbies = getSection(sections, 7);

    const heroParts = splitBlocks(hero.body);
    const fallbackHeroParts = splitBlocks(FALLBACK_SECTIONS[0].body);
    const heroBrand = heroParts.length > 1 ? heroParts[0] : fallbackHeroParts[0];
    const heroSummary = heroParts.length > 1 ? heroParts[1] : fallbackHeroParts[1];
    const heroNarrative = heroParts.length > 2 ? heroParts.slice(2) : fallbackHeroParts.slice(2);

    const aboutParagraphs = splitBlocks(aboutMe.body);
    const focusCards = parseRows(whatIDo.body);
    const educationRow = parseRows(education.body)[0] ?? [];
    const achievementCards = parseRows(achievements.body);
    const certificateCards = parseRows(certificates.body);
    const personalCards = parseRows(personalDetails.body);
    const hobbyChips = parseList(hobbies.body);

    return (
        <div className="about-portfolio">
            <div className="about-portfolio__ambient about-portfolio__ambient--one" aria-hidden="true" />
            <div className="about-portfolio__ambient about-portfolio__ambient--two" aria-hidden="true" />

            <section className="about-hero">
                <div className="about-hero__copy">
                    <p className="about-kicker">About Me</p>
                    <h1 className="about-title">{hero.heading}</h1>
                    <p className="about-brand">{heroBrand}</p>
                    <p className="about-summary">{heroSummary}</p>

                    <div className="about-lead">
                        {heroNarrative.length > 0 ? (
                            heroNarrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                        ) : (
                            <p>{hero.body}</p>
                        )}
                    </div>

                    <div className="about-pill-row" aria-label="Quick identity highlights">
                        {IDENTIFIER_PILLS.map((pill) => (
                            <span key={pill} className="about-pill">
                                {pill}
                            </span>
                        ))}
                    </div>

                    <div className="about-actions">
                        <Link href="/projects" className="about-button about-button--primary">
                            View Projects
                        </Link>
                        <Link href="/resume" className="about-button about-button--secondary">
                            Open Resume
                        </Link>
                    </div>
                </div>

                <div className="about-hero__media" aria-label="Portrait photos">
                    <div className="about-photo-card about-photo-card--wide">
                        <Image
                            src="/res/my-photos/with-bg.png"
                            alt="Kim Louise Labrador in a red and black suit"
                            fill
                            priority
                            sizes="(max-width: 900px) 100vw, 42vw"
                            className="about-photo-card__image"
                        />
                    </div>
                </div>
            </section>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">01 — About Me</p>
                    <h2>{aboutMe.heading}</h2>
                </div>
                <div className="about-paragraph-grid">
                    {(aboutParagraphs.length > 0 ? aboutParagraphs : splitBlocks(FALLBACK_SECTIONS[1].body)).map((paragraph) => (
                        <p key={paragraph} className="about-paragraph-card">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">02 — What I Do</p>
                    <h2>{whatIDo.heading}</h2>
                </div>
                <div className="about-focus-grid">
                    {(focusCards.length > 0 ? focusCards : parseRows(FALLBACK_SECTIONS[2].body)).map((row, index) => {
                        const [title = `Area ${index + 1}`, text = ""] = row;
                        return (
                            <article key={title} className="about-focus-card">
                                <span className="about-focus-card__accent">{String(index + 1).padStart(2, "0")}</span>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </article>
                        );
                    })}
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">03 — Education</p>
                    <h2>{education.heading}</h2>
                </div>
                <div className="about-minimal-card">
                    <div className="about-education-row">
                        <div>
                            <h3>{educationRow[0] ?? "Bachelor of Science in Information Technology"}</h3>
                            <p className="about-meta">{educationRow[1] ?? "Currently pursuing"}</p>
                        </div>
                        <p className="about-education-detail">
                            {educationRow[2] ?? "Grounding the creative side in technical foundations, problem solving, and systems thinking."}
                        </p>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">04 — Achievements and Competitions</p>
                    <h2>{achievements.heading}</h2>
                </div>
                <div className="about-achievement-grid">
                    {(achievementCards.length > 0 ? achievementCards : parseRows(FALLBACK_SECTIONS[4].body)).map((row, index) => {
                        const [title = `Item ${index + 1}`, event = "", description = ""] = row;
                        return (
                            <article key={`${title}-${index}`} className="about-highlight-card">
                                <h3>{title}</h3>
                                <p className="about-meta">{event}</p>
                                <p>{description}</p>
                            </article>
                        );
                    })}
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">05 — Certificates</p>
                    <h2>{certificates.heading}</h2>
                </div>
                <div className="about-certificate-grid">
                    {(certificateCards.length > 0 ? certificateCards : parseRows(FALLBACK_SECTIONS[5].body)).map((row, index) => {
                        const [title = `Credential ${index + 1}`, issuer = "", year = "", description = ""] = row;
                        return (
                            <details key={`${title}-${index}`} className="about-certificate-card">
                                <summary>
                                    <span>
                                        <strong>{title}</strong>
                                        <em>{issuer}</em>
                                    </span>
                                    <span className="about-certificate-year">{year}</span>
                                </summary>
                                <p>{description}</p>
                            </details>
                        );
                    })}
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">06 — Personal Details</p>
                    <h2>{personalDetails.heading}</h2>
                </div>
                <div className="about-personal-grid">
                    {(personalCards.length > 0 ? personalCards : parseRows(FALLBACK_SECTIONS[6].body)).map((row, index) => {
                        const [label = `Detail ${index + 1}`, value = "", href = ""] = row;
                        const isLink = Boolean(href);

                        if (isLink) {
                            return (
                                <a
                                    key={`${label}-${index}`}
                                    className="about-personal-item"
                                    href={href}
                                    {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                                >
                                    <span>{label}</span>
                                    <strong>{value}</strong>
                                </a>
                            );
                        }

                        return (
                            <div key={`${label}-${index}`} className="about-personal-item">
                                <span>{label}</span>
                                <strong>{value}</strong>
                            </div>
                        );
                    })}
                </div>
            </AnimatedSection>

            <AnimatedSection as="section" className="about-section-card about-section-card--closing" direction="up" duration={760}>
                <div className="about-section-head">
                    <p className="about-section-kicker">07 — Hobbies and Interests</p>
                    <h2>{hobbies.heading}</h2>
                </div>
                <div className="about-interest-row">
                    {(hobbyChips.length > 0 ? hobbyChips : parseList(FALLBACK_SECTIONS[7].body)).map((interest) => (
                        <span key={interest} className="about-interest-chip">
                            {interest}
                        </span>
                    ))}
                </div>
            </AnimatedSection>
        </div>
    );
}
