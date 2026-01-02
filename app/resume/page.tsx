import Link from "next/link";

export default function Resume() {
    return (
        <div style={{
            padding: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
        }}>
            <section style={{
                backgroundColor: 'rgba(18, 18, 18, 0.85)',
                borderRadius: '12px',
                padding: '3rem 2rem',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                color: '#f2f2f2'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '0.5rem'
                }}>
                    Kim Louise Labrador
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: '#dc143c',
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                }}>
                    Developer · Designer · Musician
                </p>
                <p style={{
                    textAlign: 'center',
                    color: '#aaa',
                    marginBottom: '2rem'
                }}>
                    <a href="mailto:kimlabrador71@gmail.com" style={{ color: '#dc143c' }}>kimlabrador71@gmail.com</a> |
                    <a href="https://github.com/kimtrm" target="_blank" rel="noopener noreferrer" style={{ color: '#dc143c', margin: '0 0.5rem' }}>GitHub</a> |
                    <a href="https://www.linkedin.com/in/kim-louise-labrador/" target="_blank" rel="noopener noreferrer" style={{ color: '#dc143c' }}>LinkedIn</a>
                </p>

                <hr style={{ border: '1px solid #444', margin: '2rem 0' }} />

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#dc143c', fontSize: '1.8rem', marginBottom: '1rem' }}>
                        Summary
                    </h2>
                    <p style={{ lineHeight: '1.8' }}>
                        Passionate full-stack developer and game developer with expertise in modern web technologies
                        and game engines. Skilled in creating interactive experiences that combine programming,
                        design, and multimedia. Strong foundation in UI/UX design and a creative approach to
                        problem-solving.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#dc143c', fontSize: '1.8rem', marginBottom: '1rem' }}>
                        Technical Skills
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <strong style={{ color: '#ffffff' }}>Web Development:</strong> React, Next.js, TypeScript,
                            JavaScript, Python, Django, HTML, CSS, PHP, MySQL, PostgreSQL
                        </div>
                        <div>
                            <strong style={{ color: '#ffffff' }}>Game Development:</strong> Godot, Unity, C#, Java, GDScript
                        </div>
                        <div>
                            <strong style={{ color: '#ffffff' }}>Design:</strong> Figma, Photoshop, UI/UX Design, Visual Branding
                        </div>
                        <div>
                            <strong style={{ color: '#ffffff' }}>Other:</strong> Music Composition, Sound Design,
                            Photography, Videography
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#dc143c', fontSize: '1.8rem', marginBottom: '1rem' }}>
                        Featured Projects
                    </h2>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#ffffff', fontSize: '1.3rem' }}>Project 100</h3>
                        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Educational RPG Game</p>
                        <p>
                            Story-driven learning game teaching programming fundamentals using visual blocks.
                            Developed with Godot for high school students to learn variables, loops, and logic.
                        </p>
                        <p style={{ color: '#dc143c', marginTop: '0.5rem' }}>
                            <em>Technologies: Godot, GDScript, Game Design</em>
                        </p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#ffffff', fontSize: '1.3rem' }}>KnowledgeSweeper</h3>
                        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Educational Quiz Game</p>
                        <p>
                            Innovative twist on Minesweeper where players answer quiz questions to avoid losing lives.
                            Combines classic gameplay with educational content.
                        </p>
                        <p style={{ color: '#dc143c', marginTop: '0.5rem' }}>
                            <em>Technologies: Java, Game Development, Educational Design</em>
                        </p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#ffffff', fontSize: '1.3rem' }}>Senate Website Redesign</h3>
                        <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Web Development Project</p>
                        <p>
                            Complete redesign of the Senate of the Philippines - 19th Congress website,
                            focusing on improved UX and modern design principles.
                        </p>
                        <p style={{ color: '#dc143c', marginTop: '0.5rem' }}>
                            <em>Technologies: HTML, CSS, JavaScript, UI/UX Design</em>
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#dc143c', fontSize: '1.8rem', marginBottom: '1rem' }}>
                        Education
                    </h2>
                    <div>
                        <h3 style={{ color: '#ffffff', fontSize: '1.3rem' }}>
                            Bachelor of Science in Information Technology
                        </h3>
                        <p style={{ color: '#aaa' }}>Currently Pursuing</p>
                    </div>
                </section>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-block',
                            background: '#dc143c',
                            color: 'white',
                            padding: '0.8rem 2rem',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: "'Courier New', monospace"
                        }}
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
