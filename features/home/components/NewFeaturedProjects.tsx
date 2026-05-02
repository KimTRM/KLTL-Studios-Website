"use client";

import "../css/FeaturedProjects.css";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { mockProjects } from "@/features/projects/data/mockProjects";
import { ProjectCard } from "@/features/projects/components/NewProjectCard";
import Link from "next/link";
import { motion } from "motion/react";

export function FeaturedProjects() {
  // Take all 4 projects for homepage
  const featured = mockProjects.slice(0, 4);

  return (
    <Section className="featuredSection">
      <Container>
        <div className="flex items-end justify-between mb-16">

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-bold tracking-tighter mb-4 text-white">Featured Projects</h1>

            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              We design, create, and develop scalable systems that grow with intention.
            </p>
          </div>

          <Link href="/projects" className="hidden md:block">
            <Button variant="outline" className="px-8 font-bold tracking-wider uppercase text-sm">View All Projects</Button>
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/projects">
            <Button variant="outline" className="w-full">
              View All Projects
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
