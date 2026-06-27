import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getFeaturedPortfolioProjects } from "@/lib/data/queries";

export async function FeaturedProjectsSection() {
  const projects = await getFeaturedPortfolioProjects(3);

  if (projects.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-ink-50 dark:bg-ink-800/40">
      <div className="container-px container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="eyebrow">Selected Work</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
              Projects that moved the needle.
            </h2>
          </Reveal>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <RevealItem key={project.id}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                  <SafeImage
                    src={project.featured_image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-wide text-indigo-500">
                  {project.industry}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {project.title}
                </h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
