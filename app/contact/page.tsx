import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/shared/contact-form";
import { GoogleBusinessCta } from "@/components/shared/google-business-cta";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ReemDigiTech to discuss your next content, marketing, design, video, or web development project.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">Get in Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-2xl text-ink-900 dark:text-white">
            Let's talk about your project.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-300 leading-relaxed">
            Tell us a little about what you need, and we'll get back to you within one business day.
          </p>
        </Reveal>
      </section>

      <section className="container-px container mt-14 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 flex items-start gap-4">
              <Mail className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-ink-400">Email</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-1">info@reemdigitech.com</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-1">reemdigitech@gmail.com</p>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 flex items-start gap-4">
              <Phone className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-ink-400">WhatsApp</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-1">{settings.contact_phone_display}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 flex items-start gap-4">
              <MapPin className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <p className="text-xs font-mono uppercase tracking-wide text-ink-400">Global Delivery</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-1">Providing reliable, high-quality digital services to organizations worldwide.</p>
              </div>
            </div>
            <div className="mt-6">
              <GoogleBusinessCta />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
