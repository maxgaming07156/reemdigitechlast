import { Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getFeaturedTestimonials } from "@/lib/data/queries";

export async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials(4);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-ink-900 overflow-hidden">
      <div className="container-px container">
        <Reveal>
          <span className="eyebrow">Client Voices</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 max-w-xl text-ink-900 dark:text-white">
            Don't take our word for it.
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 flex gap-5 overflow-x-auto px-6 sm:px-8 lg:px-12 pb-4 mask-fade-right snap-x">
        {testimonials.map((t) => (
          <RevealItem key={t.id} direction="right">
            <div className="snap-start shrink-0 w-[340px] sm:w-[380px] rounded-3xl border border-ink-100 dark:border-ink-700 p-7 bg-white dark:bg-ink-800">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
                "{t.content}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 font-display font-semibold text-indigo-600 dark:text-indigo-300 text-sm">
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
  );
}
