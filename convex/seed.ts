import { mutation } from "./_generated/server";

/**
 * Seed script — run once via the Convex dashboard or CLI:
 *   npx convex run seed:run
 *
 * Populates every table with the exact content currently hard-coded in
 * the site so the UI remains identical after switching to Convex queries.
 */
export const run = mutation(async ({ db }) => {
    // ──────────────────────────────────────────────
    // siteMeta
    // ──────────────────────────────────────────────
    const meta = [
        { key: "heroTitle", value: "Kim Louise Labrador" },
        { key: "heroSubtitle", value: "Developer · Designer · Musician" },
        { key: "heroMotto", value: "Ad Astra Per Aspera" },
        { key: "heroImage", value: "/res/DSC_1453.png" },
        { key: "footerText", value: "© 2025 KLTL Studios." },
        { key: "contactEmail", value: "kimlabrador71@gmail.com" },
        { key: "contactHeading", value: "Let's Work Together" },
        {
            key: "contactSubheading",
            value: "Have a project in mind or just want to say hi? Let's talk!",
        },
        { key: "githubUrl", value: "https://github.com/kimtrm" },
        {
            key: "linkedinUrl",
            value: "https://www.linkedin.com/in/kim-louise-labrador/",
        },
        { key: "youtubeUrl", value: "https://youtube.com/@kltlstudios" },
    ];
    for (const m of meta) {
        await db.insert("siteMeta", m);
    }

    // ──────────────────────────────────────────────
    // projects  (featured first — order matters)
    // ──────────────────────────────────────────────
    function getProjectDetails<K extends keyof typeof projectDetails>(key: K) {
        const d = projectDetails[key];
        return {
            ...d,
            tools: [...d.tools],
            sections: [...d.sections],
            media: [...d.media],
        };
    }

    const projectDetails = {
        "project-100": {
            tagline:
                "An educational RPG that teaches coding logic through interactive block-based quests.",
            overview:
                "Project 100 was built to make programming less intimidating for beginners by turning lessons into gameplay. Instead of traditional exercises, learners solve puzzles and progress through a story world.",
            role: "Game Developer, Systems Designer, UI Designer",
            tools: ["Godot", "GDScript", "Figma", "Photoshop"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "New learners often struggle with syntax-first programming lessons. The project reframes core topics like variables, loops, and conditions as visual game mechanics to lower entry friction.",
                },
                {
                    title: "Development Process",
                    content:
                        "I designed a lesson flow first, then mapped each concept to in-game puzzle mechanics. Iterations focused on balancing challenge, clarity, and feedback so progress felt rewarding.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The main challenge was keeping gameplay engaging while still teaching accurate concepts. I solved this by introducing lightweight tutorials, adaptive hints, and chapter-based pacing.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/ScreenShots/Project100/Login.png",
                    alt: "Project 100 login screen",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/Project100/Main.png",
                    alt: "Project 100 main gameplay screen",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/Project100/Code.png",
                    alt: "Project 100 coding challenge interface",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/Project100/Quiz.png",
                    alt: "Project 100 quiz results interface",
                },
            ],
            github: "https://github.com/KimTRM/PROJECT-100",
            playLink: "/games/project-100/index.html",
            demoLabel: "Play Demo",
        },
        knowledgesweeper: {
            tagline:
                "A quiz-powered Minesweeper variant where knowledge is your extra life.",
            overview:
                "Knowledge Sweeper combines the familiar tension of Minesweeper with educational prompts. When a mine is triggered, players answer a question to keep momentum and continue the round.",
            role: "Game Developer, Gameplay Programmer",
            tools: ["Java", "Swing", "Photoshop"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "Educational games can feel disconnected from fun. This project aimed to keep the original puzzle loop intact while adding a learning layer that feels natural and fast.",
                },
                {
                    title: "Development Process",
                    content:
                        "I rebuilt Minesweeper mechanics in Java first, then added quiz prompts as an integrated life system. UI updates prioritized readability and quick decision-making.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "Balancing pacing was difficult because quizzes can interrupt flow. I reduced friction with concise prompts, immediate feedback, and progressive difficulty per stage.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/ScreenShots/KnowledgeSweeper/Screenshot 2025-06-03 220419.png",
                    alt: "Knowledge Sweeper title screen",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/KnowledgeSweeper/Screenshot 2025-06-03 220501.png",
                    alt: "Knowledge Sweeper gameplay board",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/KnowledgeSweeper/Screenshot 2025-06-03 220556.png",
                    alt: "Knowledge Sweeper quiz prompt",
                },
                {
                    type: "image",
                    src: "/res/ScreenShots/KnowledgeSweeper/Screenshot 2025-06-03 220645.png",
                    alt: "Knowledge Sweeper end-state results",
                },
            ],
            github: "https://github.com/KimTRM/KnowledgeSweeper",
            demoLink: "https://kltl-studios.itch.io/knowledgesweeper",
            demoLabel: "Download",
        },
        "design-showcase": {
            tagline:
                "A curated collection of interface design, branding studies, and visual explorations.",
            overview:
                "This showcase documents my process in building clear visual systems for digital products. The work spans UI layout studies, branding directions, and component-driven interface design.",
            role: "UI/UX Designer, Visual Designer",
            tools: ["Figma", "Photoshop", "Illustrator"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "Design work is often judged by appearance alone. The goal of this collection is to show both visual outcomes and the thinking behind structure, hierarchy, and usability.",
                },
                {
                    title: "Development Process",
                    content:
                        "Each piece starts with layout exploration, followed by typography and color systems. I iterate through low- to high-fidelity states before final presentation.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The biggest challenge was consistency across different project types. I solved this by introducing reusable design tokens and component patterns for rhythm and alignment.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/icon/KLTL_Studios.svg",
                    alt: "KLTL Studios design showcase cover",
                },
            ],
        },
        "bagani-guardians-of-the-archipelago": {
            tagline:
                "A story-driven game concept where players protect island communities from disaster.",
            overview:
                "Bagani is a narrative game concept centered on resilience, protection, and mythic guardianship across the islands.",
            role: "Game Designer, Developer",
            tools: ["Godot", "GDScript", "Sprite Editing"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The project was designed to create an emotional game concept with meaningful stakes, while keeping the gameplay loop approachable.",
                },
                {
                    title: "Development Process",
                    content:
                        "I focused on concept building, visual tone, and the relationship between player action and the story world.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The challenge was balancing world-building with clarity. I kept the experience direct so the core idea stayed easy to grasp.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/coverimage.png",
                    alt: "Bagani: Guardians of the Archipelago cover image",
                },
            ],
        },
        nextstep: {
            tagline:
                "A career-support platform concept for students and graduates entering the workforce.",
            overview:
                "NextStep explores how to support jobseekers with a clearer path to mentorship, guidance, and career readiness.",
            role: "Product Designer, Front-End Developer",
            tools: ["Figma", "React", "TypeScript"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The idea behind NextStep was to reduce friction for students who need career guidance but do not know where to begin.",
                },
                {
                    title: "Development Process",
                    content:
                        "I shaped the experience around clear actions, content organization, and a calmer interface that supports decision-making.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The main challenge was making the platform feel supportive rather than overwhelming. I used focused content blocks and simple navigation to address that.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/DSC_1453.png",
                    alt: "NextStep platform preview",
                },
            ],
        },
        "website-clone-redesign": {
            tagline:
                "A redesign study for a public-facing government website with clearer hierarchy.",
            overview:
                "This project explores how to make a dense institutional website easier to scan, with better spacing, visual grouping, and improved content flow.",
            role: "UI/UX Designer, Front-End Developer",
            tools: ["Figma", "HTML", "CSS", "JavaScript"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The source site had too much information competing at once. The redesign aimed to reduce visual noise and guide users through key content more clearly.",
                },
                {
                    title: "Development Process",
                    content:
                        "I reorganized the layout into more readable content blocks, simplified navigation patterns, and refined spacing to make the page feel more purposeful.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The main challenge was preserving credibility while improving usability. I solved this by keeping the structure restrained and using subtle contrast to support hierarchy.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/res/icon/KLTL_Studios.svg",
                    alt: "Website clone redesign preview",
                },
            ],
            demoLink: "/Clone-Redesign/index.html",
            demoLabel: "Open Project",
        },
        "game-publishing-form": {
            tagline:
                "A clean form flow for collecting publishing information from game developers.",
            overview:
                "This project focuses on form structure and usability, making it easier to submit and review game publishing details without friction.",
            role: "UI/UX Designer, Front-End Developer",
            tools: ["HTML", "CSS", "JavaScript", "PHP"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "Forms can become overwhelming when too many inputs compete for attention. The goal was to make the submission process feel guided and straightforward.",
                },
                {
                    title: "Development Process",
                    content:
                        "I structured the form into clear sections, used consistent spacing, and prioritized legibility so the user always knows what to do next.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The challenge was balancing detail with simplicity. I kept the form compact, but separated information in a way that reduced cognitive load.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/Game Publishing/res/images/KLTL Logo.png",
                    alt: "Game publishing form preview",
                },
            ],
            demoLink: "/Game Publishing/form.html",
            demoLabel: "Open Form",
        },
        "simple-2d-game": {
            tagline:
                "A lightweight Godot game prototype focused on movement and collision.",
            overview:
                "A compact 2D game prototype built to explore core Godot mechanics like movement, collision, and basic player control.",
            role: "Game Developer",
            tools: ["Godot", "GDScript"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The goal was to build a minimal playable game that could serve as a practical exercise in engine fundamentals and level interaction.",
                },
                {
                    title: "Development Process",
                    content:
                        "I focused first on responsive controls, then added environment interaction so the player experience felt immediate and testable.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "Keeping movement responsive while maintaining predictable collisions was the main challenge. Iteration helped refine the physics and control feel.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/Web/2D.icon 1.svg",
                    alt: "Simple 2D game cover",
                },
            ],
            demoLink: "/Web/2D.html",
            demoLabel: "Open Game",
        },
        "teachers-day-gift": {
            tagline:
                "A heartfelt website made as a gift project for Teacher's Day.",
            overview:
                "This project was designed as a personal gift website, combining a warm visual tone with simple interactive presentation.",
            role: "Web Designer, Front-End Developer",
            tools: ["HTML", "CSS", "JavaScript"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The site needed to feel personal and celebratory while remaining easy to navigate and visually pleasant on different devices.",
                },
                {
                    title: "Development Process",
                    content:
                        "I used a simple content-first structure and softened the visual style so the gift felt more emotional than technical.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The challenge was keeping the piece intimate without making it cluttered. The solution was to focus on spacing, readability, and a gentle rhythm.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/Happy Teachers Day/res/Sir_Marvin.png",
                    alt: "Teacher's Day gift preview",
                },
            ],
            demoLink: "/Happy Teachers Day/index.html",
            demoLabel: "Open Gift",
        },
        "birthday-game-gift": {
            tagline:
                "A custom birthday gift project that mixes playful interaction with a personal touch.",
            overview:
                "This website was created as a birthday gift, with playful presentation and light game-like interaction to keep it memorable.",
            role: "Web Developer, Creative Designer",
            tools: ["HTML", "CSS", "JavaScript"],
            sections: [
                {
                    title: "Problem and Purpose",
                    content:
                        "The project needed to feel celebratory and personal, while still being lightweight enough to load quickly and work reliably.",
                },
                {
                    title: "Development Process",
                    content:
                        "I combined a simple narrative flow with interactive pacing so the site felt like a small experience rather than a static page.",
                },
                {
                    title: "Challenges and Solutions",
                    content:
                        "The challenge was keeping the gift playful without overcomplicating it. I stayed with a minimal interaction set and clear visual cues.",
                },
            ],
            media: [
                {
                    type: "image",
                    src: "/HappyBirthday/Icon.svg",
                    alt: "Birthday game gift cover",
                },
            ],
            demoLink: "/HappyBirthday/index.html",
            demoLabel: "Open Gift",
        },
    } as const;

    const projectData = [
        {
            title: "Project 100",
            slug: "project-100",
            description:
                "An educational RPG that teaches programming through block-based puzzles.",
            image: "/res/Project100_Icon.svg",
            link: "/projects/project-100",
            featured: true,
            archived: false,
            order: 1,
            category: "game" as const,
            ...getProjectDetails("project-100"),
        },
        {
            title: "KnowledgeSweeper",
            slug: "knowledgesweeper",
            description:
                "Minesweeper but it has a twist, a quiz to keep your life",
            image: "/res/KnowledgeSweeper_Icon.svg",
            link: "/projects/knowledgesweeper",
            featured: true,
            archived: false,
            order: 2,
            category: "game" as const,
            ...getProjectDetails("knowledgesweeper"),
        },
        {
            title: "Website Clone Redesign",
            slug: "website-clone-redesign",
            description:
                "A website clone redesign for Senate of the Philippines - 19th Congress",
            image: "/res/icon/KLTL_Studios.svg",
            link: "/Clone-Redesign/index.html",
            featured: true,
            archived: false,
            order: 3,
            category: "web" as const,
            ...getProjectDetails("website-clone-redesign"),
        },
        {
            title: "Game Publishing Form",
            slug: "game-publishing-form",
            description: "A game publishing form for game developers",
            image: "/Game Publishing/res/images/KLTL Logo.png",
            link: "/Game Publishing/form.html",
            featured: false,
            archived: false,
            order: 4,
            category: "web" as const,
            ...getProjectDetails("game-publishing-form"),
        },
        {
            title: "Simple 2D Game",
            slug: "simple-2d-game",
            description:
                "A simple 2D game made with Godot Engine, where you can make the character move and collide with the environment.",
            image: "/Web/2D.icon 1.svg",
            link: "/Web/2D.html",
            featured: false,
            archived: false,
            order: 5,
            category: "game" as const,
            ...getProjectDetails("simple-2d-game"),
        },
        {
            title: "Teacher's Day Gift",
            slug: "teachers-day-gift",
            description: "A website for the Teacher's Day Gift to Sir Marvin",
            image: "/Happy Teachers Day/res/Sir_Marvin.png",
            link: "/Happy Teachers Day/index.html",
            featured: false,
            archived: false,
            order: 6,
            category: "web" as const,
            ...getProjectDetails("teachers-day-gift"),
        },
        {
            title: "Birthday Game Gift",
            slug: "birthday-game-gift",
            description:
                "A website I made for a birthday game gift to my friend",
            image: "/HappyBirthday/Icon.svg",
            link: "/HappyBirthday/index.html",
            featured: false,
            archived: false,
            order: 7,
            category: "game" as const,
            ...getProjectDetails("birthday-game-gift"),
        },
        {
            title: "Design Showcase",
            slug: "design-showcase",
            description:
                "From UI/UX to visual branding, see how I bring ideas to life through design.",
            image: "/res/icon/KLTL_Studios.svg",
            link: "/projects/design-showcase",
            featured: false,
            archived: false,
            order: 8,
            category: "design" as const,
            ...getProjectDetails("design-showcase"),
        },
    ];
    for (const p of projectData) {
        await db.insert("projects", p);
    }

    // ──────────────────────────────────────────────
    // aboutSections
    // ──────────────────────────────────────────────
    const aboutData = [
        {
            heading: "Kim Louise Labrador",
            body: "KLTL Studios||Developer · Designer · Musician||I build digital experiences that blend structure, creativity, and atmosphere. The work is rooted in practical systems, but it always leaves room for design, motion, and sound to shape the final feel.",
            order: 1,
        },
        {
            heading: "About Me",
            body: "I am Kim, the creator behind KLTL Studios. I build digital work that sits between code, design, and sound, with a strong preference for interfaces that feel intentional rather than overworked.||My process usually starts with structure. I like shaping systems first, then layering visuals, motion, and tone until the experience feels cohesive. That approach shows up in websites, game prototypes, and multimedia experiments alike.||The goal is rarely just to make something functional. I want the result to feel clear, atmospheric, and memorable enough to read like a portfolio piece without losing the human side of the story.",
            order: 2,
        },
        {
            heading: "What I Do",
            body: "Game Dev|Interactive systems, gameplay loops, and educational game ideas built with a creator-first mindset.||Web|Modern front-end experiences with thoughtful hierarchy, responsive layouts, and practical implementation.||UI/UX|Interfaces that stay readable, expressive, and easy to navigate while still feeling visually distinct.||Multimedia|Music, visuals, photography, and motion cues that help the work feel richer than a static screen.",
            order: 3,
        },
        {
            heading: "Education",
            body: "Bachelor of Science in Information Technology|Currently pursuing|Grounding the creative side in technical foundations, problem solving, and systems thinking.",
            order: 4,
        },
        {
            heading: "Achievements and Competitions",
            body: "Project 100|Educational RPG Game|A learning-focused game that turns programming fundamentals into interactive quests and puzzle progression.||KnowledgeSweeper|Educational Quiz Game|A Minesweeper-inspired concept that layers quiz prompts onto the classic puzzle loop for faster learning.||Senate Website Redesign|Web Development Project|A complete redesign effort centered on clearer UX, stronger structure, and a more modern presentation.",
            order: 5,
        },
        {
            heading: "Certificates",
            body: "Certificate archive|Workspace data|Pending|No verified certificate entries were present in the repository, so this section is ready to be filled from the admin page.||Future credential slot|To be added|—|Expandable space reserved for certificates you want to highlight once they are documented.",
            order: 6,
        },
        {
            heading: "Personal Details",
            body: "Email|kimlabrador71@gmail.com|mailto:kimlabrador71@gmail.com||GitHub|kimtrm|https://github.com/kimtrm||LinkedIn|Kim Louise Labrador|https://www.linkedin.com/in/kim-louise-labrador/||Brand|KLTL Studios|/",
            order: 7,
        },
        {
            heading: "Hobbies and Interests",
            body: "Composing and arranging music, Photography and visual framing, Building game ideas into playable systems, Refining UI details and brand identity, Experimenting with motion and atmosphere.",
            order: 8,
        },
    ];
    for (const a of aboutData) {
        await db.insert("aboutSections", a);
    }

    // ──────────────────────────────────────────────
    // skills
    // ──────────────────────────────────────────────
    const skillsData = [
        {
            title: "Game Development",
            description: "Godot, Unity, C#, Java, GDScript",
            order: 1,
        },
        {
            title: "Web Development",
            description:
                "Django, Python, React, HTML, CSS, TypeScript, JavaScript, PHP, MySQL, PostgresSQL",
            order: 2,
        },
        {
            title: "UI/UX Design",
            description: "Figma, Photoshop",
            order: 3,
        },
        {
            title: "Music & Sound",
            description: "Original compositions, soundtracks",
            order: 4,
        },
        {
            title: "Media Creation",
            description: "Photography & Videography",
            order: 5,
        },
    ];
    for (const s of skillsData) {
        await db.insert("skills", s);
    }
});
