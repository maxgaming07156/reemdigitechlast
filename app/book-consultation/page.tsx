import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { BookingForm } from "@/components/shared/booking-form";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation with ReemDigiTech to discuss your content, marketing, design, video, or web development project.",
  alternates: { canonical: "/book-consultation" },
};

const WHAT_TO_EXPECT = [
  "A focused 30-minute call to understand your goals",
  "Honest feedback on what's realistic for your budget and timeline",
  "A clear next step — no pressure, no generic pitch deck",
];

export default function BookConsultationPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="container-px container grid lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <span className="eyebrow">Free Consultation</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mt-4 text-ink-900 dark:text-white">
            Let's map out your next move.
          </h1>
          <p className="mt-6 text-lg text-ink-500 dark:text-ink-300 leading-relaxed">
            Pick a date and time that works for you. We'll come prepared with real ideas for your business, not a generic sales pitch.
          </p>
          <div className="mt-8 space-y-3">
            {WHAT_TO_EXPECT.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
                <p className="text-sm text-ink-600 dark:text-ink-300">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-ink-100 dark:border-ink-700 p-8">
            <BookingForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
