/**
 * AboutPage — Main orchestrator for the redesigned About page.
 *
 * Architecture:
 * This component fetches all aboutSections from Convex (ordered by `order`)
 * and maps them by index to five distinct visual sections:
 *   1. Opening Statement (identity)
 *   2. Creative + Technical Duality
 *   3. Personal Journey (narrative)
 *   4. KLTL Ethos (philosophy)
 *   5. Quiet Close (reflection)
 *
 * Each section receives heading + body from Convex.
 * Defaults are provided for loading/empty states so the page is never blank.
 *
 * Content conventions for admin:
 * - Section 3 (Journey): Use "||" to separate milestones, ":" to separate
 *   milestone label from text. Example: "Curiosity:Took apart code...||Growth:Built first game..."
 * - Section 4 (Ethos): Wrap the motto in "%%...%%" to extract it as a
 *   standalone element. Example: "...philosophy text... %%Ad Astra Per Aspera%%"
 * - All other sections: plain text in heading + body fields.
 *
 * Backend unchanged — uses existing api.about.queries.getAll.
 */
"use client";

import "@/features/about/css/about.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AmbientBackground from "./AmbientBackground";
import OpeningStatement from "./OpeningStatement";
import CreativeDuality from "./CreativeDuality";
import PersonalJourney from "./PersonalJourney";
import KltlEthos from "./KltlEthos";
import QuietClose from "./QuietClose";

/** Thematic defaults — mirrors the intended narrative when Convex is empty. */
const DEFAULTS = [
    {
        heading: "I build at the intersection of code, design, and music",
        body: "I'm Kim — a developer, designer, and creator. I don't just write software. I shape interactive experiences that merge technical precision with artistic intuition. Every project is a conversation between logic and feeling.",
    },
    {
        heading: "Where Disciplines Converge",
        body: "Code gives structure. Design gives form. Music gives rhythm. Games give play. These aren't separate skills — they're lenses through the same curiosity.",
    },
    {
        heading: "The Path",
        body: "Curiosity:Took apart code before learning to write it. Understanding came through breaking.||Creation:Built the first game, the first website, the first song — not for an audience, but to see if it was possible.||Craft:Stopped chasing trends. Started refining process. Every project became a laboratory.||Vision:Founded KLTL Studios — a space where creativity and systems coexist without compromise.",
    },
    {
        heading: "What KLTL Stands For",
        body: "KLTL Studios is not a brand. It's a commitment to building with intention, designing with care, and creating work that respects both the maker and the viewer. We believe in depth over breadth, craft over speed, and meaning over metrics. %%Ad Astra Per Aspera%%",
    },
    {
        heading: "Closing",
        body: "Thank you for being here. The work continues — quietly, deliberately, always reaching.",
    },
];

export default function AboutPage() {
    const sections = useQuery(api.about.queries.getAll);

    // Map by order. If fewer than 5 sections exist in Convex, fall back to defaults.
    const get = (index: number) => {
        const s = sections?.[index];
        return {
            heading: s?.heading ?? DEFAULTS[index]?.heading ?? "",
            body: s?.body ?? DEFAULTS[index]?.body ?? "",
        };
    };

    return (
        <div className="about-page">
            <AmbientBackground />

            <OpeningStatement {...get(0)} />

            <div className="about-divider" aria-hidden="true" />

            <CreativeDuality {...get(1)} />

            <div className="about-divider" aria-hidden="true" />

            <PersonalJourney {...get(2)} />

            <div className="about-divider" aria-hidden="true" />

            <KltlEthos {...get(3)} />

            <div className="about-divider" aria-hidden="true" />

            <QuietClose {...get(4)} />
        </div>
    );
}
