"use client";

import "../css/ContactSection.redesign.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import AnimatedSection from "@/features/ui/AnimatedSection";
import FloatingIcon from "@/features/ui/FloatingIcon";
import { staggerContainer, staggerChild } from "@/features/motion";

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

                {/* Icon links — staggered entrance with hover micro-interactions */}
                <motion.div
                    className="contactLinks"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.div variants={staggerChild}>
                        <FloatingIcon
                            href={githubUrl}
                            label="GitHub"
                            glowColor="rgba(220, 20, 60, 0.3)"
                            style={{ flexDirection: "column", gap: "0.4rem" }}
                        >
                            <FiGithub className="contactLinkIcon" />
                            <span className="contactLinkLabel">GitHub</span>
                        </FloatingIcon>
                    </motion.div>

                    <motion.div variants={staggerChild}>
                        <FloatingIcon
                            href={linkedinUrl}
                            label="LinkedIn"
                            glowColor="rgba(220, 20, 60, 0.3)"
                            style={{ flexDirection: "column", gap: "0.4rem" }}
                        >
                            <FiLinkedin className="contactLinkIcon" />
                            <span className="contactLinkLabel">LinkedIn</span>
                        </FloatingIcon>
                    </motion.div>

                    <motion.div variants={staggerChild}>
                        <FloatingIcon
                            href={youtubeUrl}
                            label="YouTube"
                            glowColor="rgba(220, 20, 60, 0.3)"
                            style={{ flexDirection: "column", gap: "0.4rem" }}
                        >
                            <FiYoutube className="contactLinkIcon" />
                            <span className="contactLinkLabel">YouTube</span>
                        </FloatingIcon>
                    </motion.div>

                    <motion.div variants={staggerChild}>
                        <FloatingIcon
                            href={`mailto:${email}`}
                            label="Send email"
                            glowColor="rgba(220, 20, 60, 0.3)"
                            style={{ flexDirection: "column", gap: "0.4rem" }}
                        >
                            <FiMail className="contactLinkIcon" />
                            <span className="contactLinkLabel">Email</span>
                        </FloatingIcon>
                    </motion.div>
                </motion.div>

                <AnimatedSection delay={450} duration={800}>
                    <a href={`mailto:${email}`} className="contactEmail">
                        {email}
                    </a>
                </AnimatedSection>
            </div>
        </section>
    );
}
