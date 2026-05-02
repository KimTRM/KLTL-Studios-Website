import { Project } from "../types";

export const mockProjects: Project[] = [
    {
        id: "proj-1",
        slug: "project-100",
        title: "Project 100",
        summary:
            "Story-based programming RPG built with Godot. Educational game focused on interactive logic systems.",
        category: "Game Dev",
        techStack: ["Godot", "GDScript", "RPG"],
        imageUrl: "/res/Project100_Icon.png",
        year: "2023",
        description: {
            problem:
                "Traditional programming education often lacks engaging, interactive elements that keep students motivated through complex logic puzzles.",
            solution:
                "Developed a story-driven RPG where players must use real programming logic and algorithms to progress through the narrative and defeat enemies.",
            result: "Created an immersive learning tool that makes abstract programming concepts tangible and enjoyable.",
        },
    },
    {
        id: "proj-2",
        slug: "knowledgesweeper",
        title: "KnowledgeSweeper",
        summary:
            "Java-based quiz game with timed challenge mechanics. Focused on logic implementation and user interaction.",
        category: "Game Dev",
        techStack: ["Java", "Quiz", "Logic"],
        imageUrl: "/res/KnowledgeSweeper_Icon.svg",
        year: "2022",
        description: {
            problem:
                "Need for a fast-paced, memory-testing application that goes beyond simple multiple-choice formats.",
            solution:
                "Built a Minesweeper-inspired quiz game incorporating timed challenges, score multipliers, and dynamic difficulty scaling entirely in Java.",
            result: "A highly replayable desktop application that successfully blends trivia with classic puzzle mechanics.",
        },
    },
    {
        id: "proj-3",
        slug: "bagani",
        title: "Bagani: Guardians of the Archipelago",
        summary:
            "When natural disasters strike the islands, ancient spirits awaken and challenge players to protect the people.",
        category: "Game Dev",
        techStack: ["Narrative", "Strategy", "Myth"],
        imageUrl: "https://picsum.photos/seed/bagani/800/600",
        year: "2023",
        description: {
            problem:
                "Showcasing Filipino mythology and the reality of natural disasters in a respectful, engaging format.",
            solution:
                "Designed a narrative-driven strategy game where players manage resources and appease ancient spirits during calamities.",
            result: "A culturally rich interactive experience highlighting resilience and tradition.",
        },
    },
    {
        id: "proj-4",
        slug: "nextstep",
        title: "NextStep",
        summary:
            "Jobseeker and mentorship platform designed for students and graduates to ease the transition into careers.",
        category: "Web Dev",
        techStack: ["React", "Mentorship", "UI/UX"],
        imageUrl: "https://picsum.photos/seed/nextstep/800/600",
        year: "2024",
        description: {
            problem:
                "New graduates often struggle to find relevant entry-level positions and meaningful mentorship in their specific fields.",
            solution:
                "Designed and developed a clean, accessible platform connecting students directly with industry mentors and curated job postings.",
            result: "A cohesive, user-friendly portal that bridges the gap between academic life and professional careers.",
        },
    },
];
