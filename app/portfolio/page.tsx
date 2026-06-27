import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getPortfolioProjects } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse ReemDigiTech's portfolio of branding, marketing, web development, and video projects delivered for clients across the UK, UAE, Denmark, and Pakistan.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">Our Work</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-2xl text-ink-900 dark:text-white">
            Real projects. Real results.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-300 leading-relaxed">
            A selection of branding, marketing, development, and video work delivered for clients across hospitality, real estate, e-commerce, fashion, and technology.
          </p>
        </Reveal>
      </section>

      <section className="container-px container mt-16">
        {projects.length === 0 ? (
          <p className="text-ink-400">No projects yet — check back soon.</p>
        ) : (
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <RevealItem key={project.id}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                    <SafeImage
                      src={project.featured_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {project.services.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wide text-indigo-500">
                    {project.industry}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    {project.title}
                  </h2>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </section>
    </div>
  );
}
