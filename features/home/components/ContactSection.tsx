"use client";

import "../css/ContactSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AnimatedSection from "@/features/ui/AnimatedSection";

export default function ContactSectionRedesign() {
    const contact = useQuery(api.siteMeta.queries.getContact);

    const heading = contact?.heading ?? "Let's Work Together";
    const subheading =
        contact?.subheading ??
        "Have an idea you want to turn into something real?";

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
                    <a href="/about" className="contactButton" aria-label="Go to contact details">
                        Get In Touch
                    </a>
                </AnimatedSection>
            </div>
        </section>
    );
}
