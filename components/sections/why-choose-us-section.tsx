import { ShieldCheck, Zap, LineChart, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Work you can trust",
    description: "Every deliverable is reviewed against the goal it was meant to serve, not just whether it looks finished.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description: "Fast turnarounds without skipping the strategy step that makes the work actually perform.",
  },
  {
    icon: LineChart,
    title: "Tied to real numbers",
    description: "Every campaign and project is measured against revenue and growth, not vanity metrics.",
  },
  {
    icon: Users,
    title: "A team, not a freelancer",
    description: "Strategists, designers, and developers working together — so nothing gets lost between disciplines.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-24 lg:py-32 bg-ink-50 dark:bg-ink-800/40">
      <div className="container-px container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <span className="eyebrow">Why ReemDigiTech</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
              We treat your growth like it's our own business.
            </h2>
            <p className="mt-6 text-ink-500 dark:text-ink-300 leading-relaxed max-w-md">
              Most agencies optimize for the next invoice. We optimize for the next five years of working together — which means honest scoping, clear reporting, and work that's built to perform, not just impress.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <RevealItem key={reason.title}>
                  <div className="rounded-2xl bg-white dark:bg-ink-800 p-6 h-full border border-ink-100 dark:border-ink-700">
                    <Icon className="h-6 w-6 text-indigo-500" />
                    <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
