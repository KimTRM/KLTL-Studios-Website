/**
 * MoonOrb — Celestial visual anchor
 *
 * A radial-gradient sphere with expanding orbit rings.
 * Used as a meditative focal point in the opening statement.
 * All animation is CSS-only (ambient, non-interactive).
 *
 * WHY: Symbols > stock photos. The moon represents quiet presence,
 *      cycles of creation, and the nocturnal identity of KLTL.
 */
"use client";

export default function MoonOrb() {
    return (
        <div className="moon-orb" aria-hidden="true">
            <div className="moon-orb__halo" />
            <div className="moon-orb__core" />
            <div className="moon-orb__ring moon-orb__ring--1" />
            <div className="moon-orb__ring moon-orb__ring--2" />
            <div className="moon-orb__ring moon-orb__ring--3" />
        </div>
    );
}
