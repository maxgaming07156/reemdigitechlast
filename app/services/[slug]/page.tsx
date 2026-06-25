import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
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
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  services,
  subServices,
  getServiceBySlug,
  getSubServiceBySlug,
  getSubServicesByParent,
} from "@/lib/data/services";

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

export async function generateStaticParams() {
  return [...services, ...subServices].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug) ?? getSubServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const subService = service ? undefined : getSubServiceBySlug(slug);

  if (!service && !subService) notFound();

  if (subService) {
    return <SubServiceView slug={subService.slug} />;
  }

  return <FullServiceView slug={service!.slug} />;
}

/** Full template for top-level services: hero, benefits, what's included (if a parent), process, FAQ, CTA, other services. */
function FullServiceView({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)!;
  const Icon = ICONS[service.icon as keyof typeof ICONS];
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const includedSubServices = service.subServiceSlugs
    ? getSubServicesByParent(service.slug)
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: "ReemDigiTech",
    },
    description: service.heroDescription,
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink-900 text-white">
        <div className="container-px container">
          <Reveal>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
              <Icon className="h-7 w-7" />
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-6 max-w-2xl text-balance">
              {service.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-300 leading-relaxed">
              {service.heroDescription}
            </p>
            <Button asChild variant="indigo" size="lg" className="mt-8">
              <Link href="/book-consultation">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-px container py-20">
        <Reveal>
          <span className="eyebrow">Why It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
            What you get
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid sm:grid-cols-2 gap-5">
          {service.benefits.map((b) => (
            <RevealItem key={b.title}>
              <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 h-full">
                <Check className="h-5 w-5 text-indigo-500" />
                <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed">{b.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* What's included (parent services only) */}
      {includedSubServices.length > 0 && (
        <section className="py-20 bg-ink-50 dark:bg-ink-800/40">
          <div className="container-px container">
            <Reveal>
              <span className="eyebrow">What's Included</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
                {service.name} covers all of this
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {includedSubServices.map((sub) => {
                const SubIcon = ICONS[sub.icon as keyof typeof ICONS];
                return (
                  <RevealItem key={sub.slug}>
                    <Link
                      href={`/services/${sub.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-900 p-6 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                          <SubIcon className="h-5 w-5" />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-ink-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">{sub.name}</h3>
                      <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed flex-1">{sub.shortDescription}</p>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-20 bg-ink-50 dark:bg-ink-800/40">
        <div className="container-px container">
          <Reveal>
            <span className="eyebrow">Our Process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
              How we deliver {service.name.toLowerCase()}
            </h2>
          </Reveal>
          <div className="mt-10 relative pl-8 border-l border-ink-200 dark:border-ink-700 space-y-8">
            {service.process.map((step, i) => (
              <Reveal key={step.title} direction="right" delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[2.45rem] top-1 flex h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-ink-900" />
                  <span className="font-mono text-xs text-indigo-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-ink-500 dark:text-ink-300 leading-relaxed max-w-lg">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px container py-20 max-w-3xl">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
            Common questions
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10">
            {service.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-px container">
        <Reveal>
          <div className="rounded-3xl bg-ink-900 text-white p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-mesh opacity-20" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight max-w-xl mx-auto">
                Ready to get started with {service.name.toLowerCase()}?
              </h2>
              <p className="mt-4 text-ink-300 max-w-md mx-auto">
                Tell us about your goals and we'll map out exactly how we'd approach it — no obligation.
              </p>
              <Button asChild variant="indigo" size="lg" className="mt-8">
                <Link href="/book-consultation">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Other services */}
      <section className="container-px container mt-20">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">Explore other services</h2>
        </Reveal>
        <RevealGroup className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherServices.map((s) => {
            const OtherIcon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <RevealItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 hover:border-indigo-300 transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 shrink-0">
                    <OtherIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{s.name}</span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>
    </div>
  );
}

/** Lighter template for sub-services: hero, benefits, CTA, and a link back to the parent category. */
function SubServiceView({ slug }: { slug: string }) {
  const sub = getSubServiceBySlug(slug)!;
  const parent = getServiceBySlug(sub.parentSlug);
  const Icon = ICONS[sub.icon as keyof typeof ICONS];
  const siblings = getSubServicesByParent(sub.parentSlug).filter((s) => s.slug !== sub.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: sub.name,
    provider: {
      "@type": "Organization",
      name: "ReemDigiTech",
    },
    description: sub.heroDescription,
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-ink-900 text-white">
        <div className="container-px container">
          <Reveal>
            {parent && (
              <Link
                href={`/services/${parent.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors mb-5"
              >
                {parent.name}
              </Link>
            )}
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
              <Icon className="h-7 w-7" />
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-6 max-w-2xl text-balance">
              {sub.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-300 leading-relaxed">
              {sub.heroDescription}
            </p>
            <Button asChild variant="indigo" size="lg" className="mt-8">
              <Link href="/book-consultation">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-px container py-20">
        <Reveal>
          <span className="eyebrow">Why It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
            What you get
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid sm:grid-cols-2 gap-5">
          {sub.benefits.map((b) => (
            <RevealItem key={b.title}>
              <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 h-full">
                <Check className="h-5 w-5 text-indigo-500" />
                <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed">{b.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="container-px container">
        <Reveal>
          <div className="rounded-3xl bg-ink-900 text-white p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-mesh opacity-20" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight max-w-xl mx-auto">
                Ready to get started with {sub.name.toLowerCase()}?
              </h2>
              <p className="mt-4 text-ink-300 max-w-md mx-auto">
                Tell us about your goals and we'll map out exactly how we'd approach it — no obligation.
              </p>
              <Button asChild variant="indigo" size="lg" className="mt-8">
                <Link href="/book-consultation">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Related services within the same parent category */}
      {(siblings.length > 0 || parent) && (
        <section className="container-px container mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
              More in {parent?.name ?? "this category"}
            </h2>
          </Reveal>
          <RevealGroup className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {parent && (
              <RevealItem>
                <Link
                  href={`/services/${parent.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 hover:border-indigo-300 transition-colors"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 shrink-0">
                    {(() => {
                      const ParentIcon = ICONS[parent.icon as keyof typeof ICONS];
                      return <ParentIcon className="h-5 w-5" />;
                    })()}
                  </span>
                  <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{parent.name} (overview)</span>
                </Link>
              </RevealItem>
            )}
            {siblings.map((s) => {
              const SiblingIcon = ICONS[s.icon as keyof typeof ICONS];
              return (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-700 p-4 hover:border-indigo-300 transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 shrink-0">
                      <SiblingIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{s.name}</span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>
      )}
    </div>
  );
}
