export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "GDScript", "SQL"]
  },
  {
    title: "Web Technologies",
    skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Prisma", "PostgreSQL", "Framer Motion"]
  },
  {
    title: "Game Development",
    skills: ["Godot", "Unity", "Unreal Engine (Basics)", "Game Design", "Level Design"]
  },
  {
    title: "UI/UX Design",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "User Research"]
  },
  {
    title: "Creative Tools",
    skills: ["Adobe Lightroom", "Photoshop", "Ableton Live", "FMOD", "Blender"]
  }
];
