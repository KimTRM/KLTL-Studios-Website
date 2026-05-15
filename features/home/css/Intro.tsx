"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Code2, Gamepad2, PenTool, Camera } from "lucide-react";

const STATS = [
  { value: "10+", label: "Projects Built" },
  { value: "6+", label: "Years Programming" },
  { value: "4+", label: "Years Game Dev" },
  { value: "24/7", label: "Independent Creator" },
];

export function Intro() {
  return (
    <Section className="bg-neutral-950">
      <Container>
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-white">
              Hi, I&apos;m Kim Louise Labrador.
            </h2>
            <div className="space-y-6 text-xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto">
              <p>
                I build games, systems, and digital experiences that combine logic with storytelling.
              </p>
              <p>
                Most of my growth has come from building real projects—experimenting, failing, refining, and shipping. KLTL Studios is the space where I merge engineering, design, and emotion into one cohesive vision.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-neutral-900">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
