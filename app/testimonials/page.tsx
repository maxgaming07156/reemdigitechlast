import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getTestimonials } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Hear from ReemDigiTech clients across the UK, UAE, Denmark, and Pakistan about working with our team on marketing, design, and development projects.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">Client Voices</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-2xl text-ink-900 dark:text-white">
            What clients say about working with us.
          </h1>
        </Reveal>
      </section>

      <section className="container-px container mt-16">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <RevealItem key={t.id}>
              <div className="rounded-3xl border border-ink-100 dark:border-ink-700 p-8 h-full flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-ink-700 dark:text-ink-200 leading-relaxed flex-1">"{t.content}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 font-display font-semibold text-indigo-600 dark:text-indigo-300">
                    {t.client_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{t.client_name}</p>
                    <p className="text-xs text-ink-400">
                      {t.client_title}, {t.client_company} · {t.client_country}
                    </p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
