export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

export interface DetailedProject extends Project {
    subtitle?: string;
    tags: string[];
    github?: string;
    playLink?: string;
    demoLink?: string;
    gallery?: string[];
    technologies?: string[];
    year?: string;
    category?: "game" | "web" | "design" | "other";
}
