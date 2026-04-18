/**
 * KltlEthos — Section 4: Philosophy
 *
 * What KLTL Studios stands for. Philosophy over branding.
 * "Ad Astra Per Aspera" lives here.
 * Symbol-first layout: a rotating sigil (diamond inside orbit ring).
 * Calm, meditative presence.
 *
 * Motion strategy:
 * - Sigil: fade-in on scroll (orbReveal variant)
 * - Heading/body: fade-up staggered
 * - Motto: late fade-in, no position shift (gravity)
 * - Sigil rotation and pulse: CSS keyframes (ambient)
 *
 * Content: heading + body from Convex.
 * The motto "Ad Astra Per Aspera" is extracted from the body if present
 * (delimited by "%%...%%"), otherwise displayed inline.
 */
"use client";

interface KltlEthosProps {
    heading: string;
    body: string;
}

function extractMotto(body: string): { text: string; motto: string | null } {
    const match = body.match(/%%(.+?)%%/);
    if (match) {
        return {
            text: body.replace(/%%(.+?)%%/, "").trim(),
            motto: match[1].trim(),
        };
    }
    return { text: body, motto: null };
}

export default function KltlEthos({ heading, body }: KltlEthosProps) {
    const { text, motto } = extractMotto(body);

    return (
        <section className="about-section kltl-ethos">
            <div className="about-section__inner">
                {/* Sigil — symbol-first */}
                <div className="ethos-sigil" aria-hidden="true">
                    <div className="ethos-sigil__ring ethos-sigil__ring--outer" />
                    <div className="ethos-sigil__ring" />
                    <div className="ethos-sigil__diamond" />
                </div>

                <span className="kltl-ethos__label">04 — Ethos</span>

                <h2 className="kltl-ethos__heading">{heading}</h2>
                <p className="kltl-ethos__body">{text}</p>

                {motto && (
                    <p className="ethos-motto">{motto}</p>
                )}
            </div>
        </section>
    );
}
