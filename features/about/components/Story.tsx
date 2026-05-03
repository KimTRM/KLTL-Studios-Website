"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "motion/react";
import Image from "next/image";

export function Story() {
  return (
    <div className=" pb-8 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">
              The story behind <br />
              <span className="text-neutral-500">the studio.</span>
            </h1>
            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                I&apos;m Kim Louise Labrador. KLTL Studios is the manifestation of my
                belief that technical rigor and creative expression are not mutually exclusive.
              </p>
              <p>
                My journey began in game development—a demanding discipline that
                requires both strict performance optimization and deep empathy for the
                player&apos;s experience. This hybrid mindset naturally bled into my work
                in web development, UI/UX design, and even photography.
              </p>
              <p>
                I don&apos;t just want things to work. I want them to feel inevitable.
                Whether it&apos;s a micro-interaction on a button, the ambient sounds of
                a digital world, or the composition of a photograph, everything matters.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900"
          >
            <Image
              src="/res/my-photos/with-bg.png"
              alt="Portrait of Kim Louise Labrador"
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
