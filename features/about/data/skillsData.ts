export interface SkillCategory {
    title: string;
    skills: string[];
}

export const skillsData: SkillCategory[] = [
    {
        title: "Programming",
        skills: [
            "TypeScript",
            "JavaScript",
            "Python",
            "Java",
            "C#",
            "C++",
            "GDScript",
            "SQL",
        ],
    },
    {
        title: "Web Technologies",
        skills: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Prisma",
            "PostgreSQL",
            "Framer Motion",
        ],
    },
    {
        title: "UI/UX Design",
        skills: [
            "Figma",
            "Wireframing",
            "Prototyping",
            "Design Systems",
            "User Research",
        ],
    },
    {
        title: "Game Development",
        skills: ["Godot", "Game Design", "Level Design"],
    },

    {
        title: "Creative Tools",
        skills: ["Adobe Lightroom", "Photoshop"],
    },
];
