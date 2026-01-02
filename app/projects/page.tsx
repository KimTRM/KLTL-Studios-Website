import ProjectsWithFilter from "../components/ProjectsWithFilter";
import { allProjects } from "../data/projects";

export default function Projects() {
    return (
        <>
            <ProjectsWithFilter projects={allProjects} />
        </>
    );
}

