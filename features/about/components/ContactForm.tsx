"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "motion/react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Mock submission delay
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-center text-neutral-400 font-bold text-6xl mb-4">Let's Work Together</h2>

        <p className="text-neutral-400 text-lg">
          Have a project in mind, or just want to say hi? Drop me a message below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {status === "success" ? (
          <div className="p-8 border border-neutral-800 bg-neutral-900 rounded-2xl text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-medium mb-2">Message received.</h2>
            <p className="text-neutral-400 mb-6">
              Thanks for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 text-left">Name</label>
                <input
                  id="name"
                  required
                  type="text"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-kltl-red focus:border-kltl-red transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-neutral-300 text-left">Email</label>
                <input
                  id="email"
                  required
                  type="email"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-kltl-red focus:border-kltl-red transition-all"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className=" text-sm font-bold text-neutral-300">Subject</label>
              <input
                id="subject"
                required
                type="text"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-kltl-red focus:border-kltl-red transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-neutral-300">Message</label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-kltl-red focus:border-kltl-red transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="contactButton"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

          </form>
        )}
      </motion.div>
    </div>
  );
}
