"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  PenTool,
  TrendingUp,
  Palette,
  Film,
  Code2,
  Bot,
  MapPin,
  Search,
  Megaphone,
  LayoutTemplate,
  MousePointerClick,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const ICONS = {
  PenTool,
  TrendingUp,
  Palette,
  Film,
  Code2,
  Bot,
  MapPin,
  Search,
  Megaphone,
  LayoutTemplate,
  MousePointerClick,
};

export function ServicesOverviewSection() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-ink-900">
      <div className="container-px container">
        <Reveal>
          <span className="eyebrow">What We Do</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 max-w-xl text-ink-900 dark:text-white">
            Everything your growth needs. One team.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <RevealItem key={service.slug}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex h-full flex-col rounded-3xl border border-ink-100 dark:border-ink-700 p-8 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                        <Icon className="h-6 w-6" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-ink-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-ink-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-sm text-ink-500 dark:text-ink-300 leading-relaxed flex-1">
                      {service.shortDescription}
                    </p>
                  </Link>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
