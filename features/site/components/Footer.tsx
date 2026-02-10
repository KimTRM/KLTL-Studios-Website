"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Footer() {
    const footer = useQuery(api.siteMeta.getFooter);

    const text = footer?.text ?? "© 2025 KLTL Studios.";
    const githubUrl = footer?.githubUrl ?? "https://github.com/kimtrm";
    const linkedinUrl = footer?.linkedinUrl ?? "https://www.linkedin.com/in/kim-louise-labrador/";
    const youtubeUrl = footer?.youtubeUrl ?? "https://youtube.com/@kltlstudios";

    return (
        <footer className="nav-bottom">
            <div className="nav-bottom-left">
                <h2> {text}</h2>
            </div>
            <div className="nav-bottom-right">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">GitHub</a>
                |
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">LinkedIn</a>
                |
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit YouTube channel">YouTube</a>
            </div>
        </footer>
    );
}
