"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";

export default function Footer() {
    const footer = useQuery(api.siteMeta.queries.getFooter);

    const text = footer?.text ?? `© ${new Date().getUTCFullYear()} KLTL Studios. All rights reserved.`;
    const githubUrl = footer?.githubUrl ?? "https://github.com/kimtrm";
    const linkedinUrl = footer?.linkedinUrl ?? "https://www.linkedin.com/in/kim-louise-labrador/";
    const youtubeUrl = footer?.youtubeUrl ?? "https://youtube.com/@kltlstudios";

    return (
        <footer className="nav-bottom">
            <div className="footer-main">
                <div className="footer-brand-col">
                    <Link href="/" className="footer-brand-link" aria-label="Go to homepage">
                        <Image
                            src="/res/icon/Icon.svg"
                            alt="KLTL Studios"
                            width={160}
                            height={72}
                            className="footer-logo"
                        />
                    </Link>
                    <p className="footer-motto">Ad Astra Per Aspera</p>
                    <div className="footer-socials" aria-label="Social links">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                            <FiLinkedin />
                        </a>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
                            <FiGithub />
                        </a>
                        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit YouTube channel">
                            <FiYoutube />
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Navigation</h4>
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer-col">
                    <h4>Services</h4>
                    <p>Game Development</p>
                    <p>Web Development</p>
                    <p>Photography and Videography</p>
                    <p>Music Production</p>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <a href="mailto:kiml.studios72@gmail.com">kiml.studios72@gmail.com</a>
                    <a href="tel:+639602662084">+63 960 266 2084</a>
                    <p>Naga City, Philippines</p>
                </div>
            </div>
            <div className="footer-copyright">
                <span>{text}</span>
            </div>
        </footer>
    );
}
