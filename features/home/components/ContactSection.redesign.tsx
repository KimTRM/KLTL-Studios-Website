"use client";

import "../css/ContactSection.redesign.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";
import AnimatedSection from "@/features/ui/AnimatedSection";

export default function ContactSectionRedesign() {
    const contact = useQuery(api.siteMeta.queries.getContact);
    const footer = useQuery(api.siteMeta.queries.getFooter);

    const email = contact?.email ?? "kimlabrador71@gmail.com";
    const heading = contact?.heading ?? "Let's Work Together";
    const subheading =
        contact?.subheading ??
        "Have a project in mind or just want to say hi? Let's talk.";
    const githubUrl =
        footer?.githubUrl ?? "https://github.com/kimtrm";
    const linkedinUrl =
        footer?.linkedinUrl ??
        "https://www.linkedin.com/in/kim-louise-labrador/";
    const youtubeUrl =
        footer?.youtubeUrl ?? "https://youtube.com/@kltlstudios";

    return (
        <section
            className="contactSection"
            id="contact"
            aria-label="Contact"
        >
            <div className="contactInner">
                <AnimatedSection delay={0} duration={900}>
                    <h2 className="contactHeading">{heading}</h2>
                </AnimatedSection>

                <AnimatedSection delay={100} duration={900}>
                    <p className="contactSub">{subheading}</p>
                </AnimatedSection>

                <AnimatedSection delay={200} duration={800}>
                    <div className="contactDivider" aria-hidden="true" />
                </AnimatedSection>

                {/* Icon links */}
                <AnimatedSection delay={300} duration={900}>
                    <div className="contactLinks">
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contactLink"
                            aria-label="GitHub"
                        >
                            <FiGithub className="contactLinkIcon" />
                            <span className="contactLinkLabel">GitHub</span>
                        </a>

                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contactLink"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin className="contactLinkIcon" />
                            <span className="contactLinkLabel">LinkedIn</span>
                        </a>

                        <a
                            href={youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contactLink"
                            aria-label="YouTube"
                        >
                            <FiYoutube className="contactLinkIcon" />
                            <span className="contactLinkLabel">YouTube</span>
                        </a>

                        <a
                            href={`mailto:${email}`}
                            className="contactLink"
                            aria-label="Send email"
                        >
                            <FiMail className="contactLinkIcon" />
                            <span className="contactLinkLabel">Email</span>
                        </a>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={450} duration={800}>
                    <a href={`mailto:${email}`} className="contactEmail">
                        {email}
                    </a>
                </AnimatedSection>
            </div>
        </section>
    );
}
