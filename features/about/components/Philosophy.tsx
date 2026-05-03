"use client";

import { Container } from "@/components/ui/Container";
import AnimatedSection from "@/features/ui/AnimatedSection";
import { motion } from "motion/react";

const PHILOSOPHIES = [
  {
    title: "Ad Astra Per Aspera",
    description: "To the stars through difficulties. Great work requires navigating complexity.",
  },
  {
    title: "Form Follows Feeling",
    description: "Functionality is the baseline. The real goal is how the product feels to use.",
  },
  {
    title: "Holistic Understanding",
    description: "Specialization is good, but understanding the entire stack—from database to pixels—is better.",
  }
];

export function Philosophy() {
  return (
    <AnimatedSection as="section" className="about-section-card">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Core Philosophy</h2>
          <p className="text-neutral-500 font-medium">The principles that guide my personal and professional work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHILOSOPHIES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full border border-neutral-800 bg-black flex items-center justify-center mx-auto mb-6 text-kltl-red font-mono font-bold text-sm">
                0{index + 1}
              </div>
              <h3 className="text-lg font-bold text-neutral-100 mb-3">{item.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
