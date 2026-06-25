import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, PenTool, TrendingUp, Palette, Film, Code2, Bot } from "lucide-react";
import { services, getSubServicesByParent } from "@/lib/data/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const ICONS = { PenTool, TrendingUp, Palette, Film, Code2, Bot };

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore ReemDigiTech's services: content creation, digital marketing, graphic design, video editing, web development, and AI automation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">What We Do</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-2xl text-ink-900 dark:text-white">
            Everything your growth needs. One team.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-300 leading-relaxed">
            We don't believe in handing clients off between specialists who've never spoken to each other. Every service below works from the same brief, the same goals, and the same definition of success.
          </p>
        </Reveal>
      </section>

      <section className="container-px container mt-16">
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            const subServices = service.subServiceSlugs
              ? getSubServicesByParent(service.slug)
              : [];

            return (
              <RevealItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full rounded-3xl border border-ink-100 dark:border-ink-700 p-10 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                      <Icon className="h-7 w-7" />
                    </span>
                    <ArrowUpRight className="h-6 w-6 text-ink-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h2 className="mt-8 font-display text-2xl font-semibold text-ink-900 dark:text-white">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-ink-500 dark:text-ink-300 leading-relaxed">
                    {service.heroDescription}
                  </p>
                  {subServices.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {subServices.map((sub) => (
                        <span
                          key={sub.slug}
                          className="rounded-full bg-ink-100 dark:bg-ink-800 px-3 py-1 text-xs font-medium text-ink-600 dark:text-ink-300"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>
    </div>
  );
}
