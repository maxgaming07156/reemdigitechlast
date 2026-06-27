import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart, Lightbulb, ShieldCheck, Rocket } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ReemDigiTech's story, mission, and the team behind a digital agency built on measurable results and honest client relationships.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: ShieldCheck, title: "Honesty over hype", description: "We tell clients what's realistic before they spend a dollar, not after." },
  { icon: Lightbulb, title: "Curiosity by default", description: "We stay close to what's actually changing in marketing and technology, not what was true two years ago." },
  { icon: Heart, title: "Craft matters", description: "Every deliverable gets the same care whether it's a $500 graphic or a $50,000 campaign." },
  { icon: Rocket, title: "Results over activity", description: "Busy work isn't the goal. Measurable growth is." },
];

const TIMELINE = [
  { year: "2021", title: "Founded", description: "ReemDigiTech started as a two-person team taking on freelance design and marketing projects across the UAE." },
  { year: "2022", title: "First agency clients", description: "Expanded into full-service digital marketing as word-of-mouth referrals brought in our first retained agency clients." },
  { year: "2023", title: "Web development division", description: "Added in-house web development to stop outsourcing builds and keep design-to-development consistent." },
  { year: "2024", title: "International expansion", description: "Began working with clients across the UK, Denmark, and Pakistan, building a genuinely multi-market team." },
  { year: "2026", title: "Today", description: "A full-service digital agency spanning content, marketing, design, video, and web development." },
];

const TEAM = [
  { name: "Tanzeel ul Rehman", title: "Founder", initials: "TR", image: "/team/tanzeel-ur-rehman.jpg" },
  { name: "Muhammad Qasim", title: "Head of Creative", initials: "MQ", image: "/team/muhammad-qasim.png" },
  { name: "Shahroz", title: "Head of Digital Marketing", initials: "S", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces" },
  { name: "Muhammad Qasim", title: "Lead Web Developer", initials: "MQ", image: "/team/muhammad-qasim.png" },
  { name: "Osama Majid", title: "Head of Content & Video", initials: "OM", image: "/team/osama-majid.jpg" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">Our Story</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-3xl text-ink-900 dark:text-white">
            We started ReemDigiTech because most agency work didn't hold up to scrutiny.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-500 dark:text-ink-300 leading-relaxed">
            Too many businesses were paying for marketing and design that looked good in a pitch but never moved a real number. We built ReemDigiTech around a simpler standard: if it doesn't tie back to growth, it doesn't belong in the plan.
          </p>
        </Reveal>
      </section>

      <section className="container-px container mt-24 grid sm:grid-cols-2 gap-6">
        <Reveal>
          <div className="rounded-3xl border border-ink-100 dark:border-ink-700 p-8 h-full">
            <Target className="h-7 w-7 text-indigo-500" />
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900 dark:text-white">Our Mission</h2>
            <p className="mt-3 text-ink-500 dark:text-ink-300 leading-relaxed">
              To give businesses of every size access to the same caliber of strategy, design, and execution that large brands take for granted — without the bloated retainer or the jargon.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-ink-100 dark:border-ink-700 p-8 h-full">
            <Eye className="h-7 w-7 text-indigo-500" />
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900 dark:text-white">Our Vision</h2>
            <p className="mt-3 text-ink-500 dark:text-ink-300 leading-relaxed">
              A digital agency model where clients stay not because of a contract, but because the work consistently earns it — across every market we operate in.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-px container mt-24">
        <Reveal>
          <span className="eyebrow">What We Stand For</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">Our Values</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <RevealItem key={v.title}>
                <div className="rounded-2xl bg-ink-50 dark:bg-ink-800 p-6 h-full">
                  <Icon className="h-6 w-6 text-indigo-500" />
                  <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed">{v.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <section className="container-px container mt-24">
        <Reveal>
          <span className="eyebrow">Our Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">Timeline</h2>
        </Reveal>
        <div className="mt-10 relative pl-8 border-l border-ink-200 dark:border-ink-700 space-y-10">
          {TIMELINE.map((item) => (
            <Reveal key={item.year} direction="right">
              <div className="relative">
                <span className="absolute -left-[2.45rem] top-1 flex h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-ink-900" />
                <span className="font-mono text-sm text-indigo-500">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300 leading-relaxed max-w-lg">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px container mt-24">
        <Reveal>
          <span className="eyebrow">Meet the Team</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
            The people behind the work
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <RevealItem key={member.name}>
              <div className="text-center">
                <div className="mx-auto relative h-20 w-20 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-500/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-ink-400">{member.title}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
