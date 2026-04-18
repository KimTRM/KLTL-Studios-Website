import Link from "next/link";
import styles from "./resume.module.css";

export default function Resume() {
    return (
        <div className={styles.resumePage}>
            <section className={styles.resumeCard}>
                <header className={styles.resumeHeader}>
                    <h1 className={styles.resumeTitle}>
                        Kim Louise Labrador
                    </h1>
                    <p className={styles.resumeRole}>
                        Developer · Designer · Musician
                    </p>
                    <p className={styles.resumeContact}>
                        <a href="mailto:kimlabrador71@gmail.com">kimlabrador71@gmail.com</a> |
                        <a href="https://github.com/kimtrm" target="_blank" rel="noopener noreferrer"> GitHub</a> |
                        <a href="https://www.linkedin.com/in/kim-louise-labrador/" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                    </p>
                </header>

                <hr className={styles.resumeDivider} />

                <section className={styles.resumeSection}>
                    <h2>
                        Summary
                    </h2>
                    <p>
                        Passionate full-stack developer and game developer with expertise in modern web technologies
                        and game engines. Skilled in creating interactive experiences that combine programming,
                        design, and multimedia. Strong foundation in UI/UX design and a creative approach to
                        problem-solving.
                    </p>
                </section>

                <section className={styles.resumeSection}>
                    <h2>
                        Technical Skills
                    </h2>
                    <div className={styles.resumeStack}>
                        <div>
                            <strong>Web Development:</strong> React, Next.js, TypeScript,
                            JavaScript, Python, Django, HTML, CSS, PHP, MySQL, PostgreSQL
                        </div>
                        <div>
                            <strong>Game Development:</strong> Godot, Unity, C#, Java, GDScript
                        </div>
                        <div>
                            <strong>Design:</strong> Figma, Photoshop, UI/UX Design, Visual Branding
                        </div>
                        <div>
                            <strong>Other:</strong> Music Composition, Sound Design,
                            Photography, Videography
                        </div>
                    </div>
                </section>

                <section className={styles.resumeSection}>
                    <h2>
                        Featured Projects
                    </h2>

                    <div className={styles.resumeProject}>
                        <h3>Project 100</h3>
                        <p className={styles.resumeMeta}>Educational RPG Game</p>
                        <p>
                            Story-driven learning game teaching programming fundamentals using visual blocks.
                            Developed with Godot for high school students to learn variables, loops, and logic.
                        </p>
                        <p className={styles.resumeTech}>
                            <em>Technologies: Godot, GDScript, Game Design</em>
                        </p>
                    </div>

                    <div className={styles.resumeProject}>
                        <h3>KnowledgeSweeper</h3>
                        <p className={styles.resumeMeta}>Educational Quiz Game</p>
                        <p>
                            Innovative twist on Minesweeper where players answer quiz questions to avoid losing lives.
                            Combines classic gameplay with educational content.
                        </p>
                        <p className={styles.resumeTech}>
                            <em>Technologies: Java, Game Development, Educational Design</em>
                        </p>
                    </div>

                    <div className={styles.resumeProject}>
                        <h3>Senate Website Redesign</h3>
                        <p className={styles.resumeMeta}>Web Development Project</p>
                        <p>
                            Complete redesign of the Senate of the Philippines - 19th Congress website,
                            focusing on improved UX and modern design principles.
                        </p>
                        <p className={styles.resumeTech}>
                            <em>Technologies: HTML, CSS, JavaScript, UI/UX Design</em>
                        </p>
                    </div>
                </section>

                <section className={styles.resumeSection}>
                    <h2>
                        Education
                    </h2>
                    <div>
                        <h3>
                            Bachelor of Science in Information Technology
                        </h3>
                        <p className={styles.resumeMeta}>Currently Pursuing</p>
                    </div>
                </section>

                <div className={styles.resumeActions}>
                    <Link
                        href="/"
                        className={styles.resumeHomeBtn}
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
