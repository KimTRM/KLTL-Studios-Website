/**
 * PersonalJourney — Section 3: Narrative milestones
 *
 * Not a timeline. Not a résumé. Milestones expressed as prose fragments.
 * A thin vertical line with dot markers creates subtle visual structure
 * without introducing dates or rigid formatting.
 *
 * Motion strategy:
 * - Section heading/body: fade-up
 * - Each milestone: scroll-based reveal with stagger (staggerChild)
 * - The vertical line fades in with the container
 * - Dots are CSS-only (no animation needed — presence is enough)
 *
 * Content: heading + body from Convex.
 * The body text is parsed for milestones: lines separated by "||"
 * Each milestone has a label (before ":") and text (after ":").
 * Example body stored in Convex:
 *   "Curiosity:Took apart code before learning to write it.||..."
 *
 * This keeps the admin simple (single textarea) while enabling
 * structured rendering.
 */
"use client";

interface PersonalJourneyProps {
    heading: string;
    body: string;
}

interface Milestone {
    label: string;
    text: string;
}

function parseMilestones(body: string): Milestone[] {
    const segments = body.split("||").map((s) => s.trim()).filter(Boolean);
    return segments.map((seg) => {
        const colonIdx = seg.indexOf(":");
        if (colonIdx > 0) {
            return {
                label: seg.slice(0, colonIdx).trim(),
                text: seg.slice(colonIdx + 1).trim(),
            };
        }
        return { label: "", text: seg };
    });
}

export default function PersonalJourney({ heading, body }: PersonalJourneyProps) {
    const milestones = parseMilestones(body);
    const hasMilestones = milestones.length > 1 || (milestones.length === 1 && milestones[0].label);

    return (
        <section className="about-section personal-journey">
            <div className="about-section__inner">
                <span className="personal-journey__label">03 — Journey</span>

                <h2>{heading}</h2>

                {!hasMilestones && (
                    <p className="personal-journey__body">
                        {body}
                    </p>
                )}

                {hasMilestones && (
                    <div className="milestone-list">
                        {milestones.map((m, idx) => (
                            <div key={idx} className="milestone">
                                {m.label && (
                                    <p className="milestone__title">{m.label}</p>
                                )}
                                <p className="milestone__text">{m.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
