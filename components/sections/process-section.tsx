import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

const STEPS = [
  { number: "01", title: "Discover", description: "We learn your business, audience, and goals before recommending anything." },
  { number: "02", title: "Strategy", description: "A clear plan tied to specific outcomes, not a generic package." },
  { number: "03", title: "Build", description: "Design, content, and development happen on a schedule you can see." },
  { number: "04", title: "Launch", description: "Nothing goes live until it's been tested against the original goal." },
  { number: "05", title: "Grow", description: "We keep measuring and refining long after the initial launch." },
];

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-ink-900">
      <div className="container-px container">
        <Reveal>
          <span className="eyebrow">How We Work</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-4 max-w-xl text-ink-900 dark:text-white">
            A process built around outcomes, not deliverables.
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-100 dark:bg-ink-700 rounded-3xl overflow-hidden">
          {STEPS.map((step) => (
            <RevealItem key={step.number}>
              <div className="bg-white dark:bg-ink-900 p-8 h-full flex flex-col">
                <span className="font-mono text-sm text-indigo-400">{step.number}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
