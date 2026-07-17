import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getPortfolioProjectBySlug, getPortfolioProjects } from "@/lib/data/queries";
import { CreativeWorkSchema, BreadcrumbSchema } from "@/components/layout/schema";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.meta_title || project.title,
    description: project.meta_description || project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.featured_image }],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPortfolioProjects();
  const otherProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="pb-24">
      <CreativeWorkSchema project={project} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Portfolio", url: "/portfolio" },
        { name: project.title, url: `/portfolio/${project.slug}` }
      ]} />

      <section className="pt-32 container-px container">
        <Reveal>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-indigo-500">{project.industry}</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl text-ink-900 dark:text-white">
            {project.title}
          </h1>
        </Reveal>
      </section>

      <Reveal>
        <section className="container-px container mt-10">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-ink-100">
            <SafeImage src={project.featured_image} alt={project.title} fill className="object-cover" priority />
          </div>
        </section>
      </Reveal>

      <section className="container-px container mt-12 grid lg:grid-cols-3 gap-10">
        <Reveal className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">Overview</h2>
          <p className="mt-4 text-ink-500 dark:text-ink-300 leading-relaxed">{project.description}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold text-ink-900 dark:text-white">Results</h2>
          <div className="mt-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 p-6 flex gap-4">
            <TrendingUp className="h-6 w-6 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-ink-700 dark:text-ink-200 leading-relaxed">{project.results}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 space-y-5 sticky top-28">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-ink-400">Client</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-0.5">{project.client_name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-ink-400">Completed</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-0.5">{formatDate(project.completion_date)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-ink-400 mb-2">Services Provided</p>
              <div className="flex flex-wrap gap-1.5">
                {project.services.map((s) => (
                  <span key={s} className="rounded-full bg-ink-100 dark:bg-ink-700 px-3 py-1 text-xs font-medium text-ink-700 dark:text-ink-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Button asChild variant="indigo" className="w-full">
              <Link href="/book-consultation">
                Start a Similar Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {project.gallery_images.length > 0 && (
        <section className="container-px container mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white mb-6">Gallery</h2>
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-3 gap-4">
            {project.gallery_images.map((img, i) => (
              <RevealItem key={i}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100">
                  <SafeImage src={img} alt={`${project.title} gallery image ${i + 1}`} fill className="object-cover" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section className="container-px container mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">More projects</h2>
          </Reveal>
          <RevealGroup className="mt-8 grid sm:grid-cols-3 gap-5">
            {otherProjects.map((p) => (
              <RevealItem key={p.id}>
                <Link href={`/portfolio/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100">
                    <SafeImage src={p.featured_image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                    {p.title}
                  </h3>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}
    </div>
  );
}
