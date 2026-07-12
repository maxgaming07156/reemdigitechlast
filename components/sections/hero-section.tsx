"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridMeshBackground } from "@/components/shared/grid-mesh-background";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-ink-900 text-white overflow-hidden pt-24">
      <GridMeshBackground />

      <div className="container-px container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-200">
            Trusted across UK · UAE · EU · Pakistan
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight max-w-4xl leading-[1.05] text-balance"
        >
          Helping Businesses Grow Through{" "}
          <span className="text-indigo-400">Digital Innovation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg text-ink-300 leading-relaxed"
        >
          We design, build, and market digital experiences that turn attention into revenue — content, marketing, design, video, and web development, under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="indigo" size="lg">
            <Link href="/book-consultation">
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl border-t border-white/10 pt-8"
        >
          {[
            { value: "120+", label: "Projects Delivered" },
            { value: "4", label: "Countries Served" },
            { value: "98%", label: "Client Retention" },
            { value: "4.4★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-white">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
