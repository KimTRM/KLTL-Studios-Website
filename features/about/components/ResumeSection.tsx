import "@/features/home/css/style.css";
import Link from "next/link";

export default function ResumeSection() {
    return (
        <section className="resume-section">
            <div className="container">
                <h2>Resume & CV</h2>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#dddddd',
                    fontSize: '1.1rem'
                }}>
                    Interested in working together? Download my resume or view my detailed CV.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '2rem'
                }}>
                    <a
                        href="/resume.pdf"
                        download="Kim_Louise_Labrador_Resume.pdf"
                        className="btn"
                        aria-label="Download resume as PDF"
                    >
                        Download Resume (PDF)
                    </a>
                    <Link href="/resume" className="btn-outline">
                        View Online Resume
                    </Link>
                </div>

                <div style={{
                    backgroundColor: 'rgba(26, 26, 26, 0.6)',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h3 style={{
                        color: '#ffffff',
                        marginBottom: '1rem',
                        fontSize: '1.5rem'
                    }}>
                        Quick Overview
                    </h3>

                    <div style={{ color: '#dddddd', lineHeight: '1.8' }}>
                        <h4 style={{ color: '#dc143c', marginTop: '1.5rem' }}>Skills</h4>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                            <li>Web Development: React, Next.js, TypeScript, JavaScript, Python, Django</li>
                            <li>Game Development: Godot, Unity, C#, GDScript</li>
                            <li>Design: Figma, Photoshop, UI/UX Design</li>
                            <li>Databases: MySQL, PostgreSQL</li>
                            <li>Other: Music Composition, Photography, Videography</li>
                        </ul>

                        <h4 style={{ color: '#dc143c', marginTop: '1.5rem' }}>Education</h4>
                        <p>
                            <strong>Bachelor of Science in Information Technology</strong><br />
                            {/* Add your school name and year */}
                            Currently pursuing degree in IT
                        </p>

                        <h4 style={{ color: '#dc143c', marginTop: '1.5rem' }}>Contact</h4>
                        <p>
                            Email: <a href="mailto:kimlabrador71@gmail.com" style={{ color: '#dc143c' }}>kimlabrador71@gmail.com</a><br />
                            LinkedIn: <a href="https://www.linkedin.com/in/kim-louise-labrador/" target="_blank" rel="noopener noreferrer" style={{ color: '#dc143c' }}>kim-louise-labrador</a><br />
                            GitHub: <a href="https://github.com/kimtrm" target="_blank" rel="noopener noreferrer" style={{ color: '#dc143c' }}>@kimtrm</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
