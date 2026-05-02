import Link from "next/link";
import Image from "next/image";
import { Project } from "../types";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-6 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-500">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/10 transition-colors duration-500" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-kltl-red uppercase tracking-widest">
            {project.category}
          </span>
          <span className="text-xs font-mono text-neutral-600">{project.year}</span>
        </div>

        <h3 className="text-2xl font-bold text-neutral-100 mb-2 group-hover:text-white transition-colors flex items-center">
          {project.title}
          <ArrowRight className="ml-2 w-5 h-5 text-kltl-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>

        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span key={tech} className="text-xs font-medium text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
