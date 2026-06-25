import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesOverviewSection } from "@/components/sections/services-overview-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";

export const metadata: Metadata = {
  title: "ReemDigiTech | Helping Businesses Grow Through Digital Innovation",
  description:
    "A digital agency offering content creation, digital marketing, graphic design, video editing, web development, and AI automation services that drive measurable growth.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverviewSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
      <ContactCtaSection />
    </>
  );
}
