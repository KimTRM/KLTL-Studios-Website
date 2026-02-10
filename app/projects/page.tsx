import ProjectsWithFilter from "@/features/projects/components/ProjectsWithFilter";
import { allProjects } from "@/features/projects/data/projects";

export default function Projects() {
    return (
        <>
            <ProjectsWithFilter projects={allProjects} />
        </>
    );
}

