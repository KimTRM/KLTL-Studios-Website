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
            heading: "About Me",
            body: "I'm Kim, a developer and multimedia creator. I build interactive experiences by combining my love for programming, music, and design.",
            order: 1,
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
