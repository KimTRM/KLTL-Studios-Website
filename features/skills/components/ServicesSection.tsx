import "@/features/home/css/style.css"
import SkillsGroup from "./SkillsGroup";

const skills = [
    { title: "Game Development", description: "Godot, Unity, C#, Java, GDScript" },
    { title: "Web Development", description: "Django, Python, React, HTML, CSS, TypeScript, JavaScript, PHP, MySQL, PostgresSQL" },
    { title: "UI/UX Design", description: "Figma, Photoshop" },
    { title: "Music & Sound", description: "Original compositions, soundtracks" },
    { title: "Media Creation", description: "Photography & Videography" },
];

export default function ServicesSection() {
    return (
        <>
            <section className="services">
                <div className="container">
                    <h2>What I Do</h2>
                    <div className="services-grid">
                        {skills.map((skill, idx) => (
                            <SkillsGroup
                                key={idx}
                                title={skill.title}
                                description={skill.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
