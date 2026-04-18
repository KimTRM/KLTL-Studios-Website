/**
 * AmbientBackground — Fixed-position floating particles
 *
 * Pure CSS animation (moteDrift keyframes).
 * Six small dots that drift slowly, creating a living atmosphere.
 * Entirely decorative — aria-hidden, pointer-events: none.
 *
 * WHY: A page about identity should feel alive, not static.
 *      These motes are the visual equivalent of breathing.
 */
export default function AmbientBackground() {
    return (
        <div className="about-ambient" aria-hidden="true">
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
            <div className="about-ambient__mote" />
        </div>
    );
}
