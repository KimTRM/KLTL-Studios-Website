"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Project } from "../types";
import { FiGithub as Github } from "react-icons/fi";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="pt-24 pb-20 bg-black min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-kltl-red transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>

              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono uppercase tracking-wider text-neutral-300">
                  {project.category}
                </span>
                <span className="text-neutral-500 text-sm">{project.year}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
                {project.title}
              </h1>

              <p className="text-xl text-neutral-400 max-w-2xl">
                {project.summary}
              </p>

            </div>

            <div className="flex items-center space-x-4">
              {project.demoUrl && (
                <Button>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 mb-20"
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div
            className="lg:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {project.description.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Solution</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {project.description.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Result</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {project.description.result}
              </p>
            </section>
          </motion.div>

          <motion.aside
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-sm text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Can add additional stats/links later safely using mock data */}
          </motion.aside>
        </div>
      </Container>
    </article>
  );
}
