/**
 * QuietClose — Section 5: Closing meditation
 *
 * A short closing line. No CTA pressure.
 * Leaves space for reflection — heavy padding, dim typography.
 * A thin horizontal divider fades in below.
 *
 * Motion strategy:
 * - Text: slow fade-in only (no position shift — gravity)
 * - Divider: delayed fade-in
 * - Everything moves like an exhale
 *
 * Content: heading is ignored (or used as aria-label).
 * Body is the closing line.
 */
"use client";

interface QuietCloseProps {
    heading: string;
    body: string;
}

export default function QuietClose({ heading, body }: QuietCloseProps) {
    return (
        <section className="about-section quiet-close" aria-label={heading}>
            <div className="about-section__inner">
                <p className="quiet-close__text">{body}</p>
                <div className="quiet-close__divider" aria-hidden="true" />
                <span className="quiet-close__symbol" aria-hidden="true">
                    ✦
                </span>
            </div>
        </section>
    );
}
