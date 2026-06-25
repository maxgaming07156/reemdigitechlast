import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function ContactCtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-ink-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-mesh opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="container-px container relative z-10 text-center">
        <Reveal>
          <span className="eyebrow">Let's Talk</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight mt-4 text-white max-w-3xl mx-auto text-balance">
            Ready to grow? Let's build something that actually performs.
          </h2>
          <p className="mt-6 text-ink-300 max-w-xl mx-auto leading-relaxed">
            Book a free consultation and we'll map out exactly where your biggest growth opportunity is — no obligation, no generic pitch deck.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="indigo" size="lg">
              <Link href="/book-consultation">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/contact">Send a Message</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
