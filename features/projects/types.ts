export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: {
    problem: string;
    solution: string;
    result: string;
  };
  category: "Game Dev" | "Web Dev" | "UI/UX" | "Creative";
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  year: string;
}
