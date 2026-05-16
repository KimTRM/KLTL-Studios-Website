"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "motion/react";
import { skillsData } from "../data/skillsData";
import AnimatedSection from "@/features/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { useMobileScrollHover } from "@/features/ui/useMobileScrollHover";

function SkillCategoryCard({
  category,
  categoryIdx,
}: {
  category: (typeof skillsData)[number];
  categoryIdx: number;
}) {
  const { ref, isActive } = useMobileScrollHover<HTMLDivElement>({ threshold: 0.35 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
      className={cn(
        "p-8 bg-neutral-900/20 rounded-2xl border border-neutral-900 hover:border-neutral-800 transition-colors",
        isActive && "border-neutral-800"
      )}
    >
      <h2 className="text-sm font-mono font-bold text-kltl-red uppercase tracking-widest mb-6 border-b border-neutral-900 pb-4">
        {category.title}
      </h2>
      <ul className="space-y-4">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className={cn(
              "text-neutral-300 font-medium flex items-center group cursor-default",
              isActive && "is-active"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 bg-neutral-800 mr-3 group-hover:bg-kltl-red transition-colors",
                isActive && "bg-kltl-red"
              )}
            />
            <span className={cn("group-hover:text-white transition-colors", isActive && "text-white")}>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function SkillList() {
  return (
    <AnimatedSection as="section" className="pt-32 pb-20 about-section-card bg-black min-h-screen">
      <Container>
        <div className="max-w-2xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            Capabilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg"
          >
            A comprehensive overview of my technical and creative toolkit.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIdx) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              categoryIdx={categoryIdx}
            />
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
