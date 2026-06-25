"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { services } from "@/lib/data/services";
import type { SiteSettings } from "@/types/database";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const socialLinks = [
    { url: settings.linkedin_url, label: "LinkedIn", icon: Linkedin },
    { url: settings.instagram_url, label: "Instagram", icon: Instagram },
    { url: settings.facebook_url, label: "Facebook", icon: Facebook },
    { url: settings.twitter_url, label: "X (Twitter)", icon: Twitter },
  ].filter((link) => link.url);

  return (
    <footer className="bg-ink-900 text-ink-200 border-t border-ink-800">
      <div className="container-px container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white overflow-hidden">
                <Image src="/logo-icon.png" alt="" width={36} height={36} className="h-7 w-7 object-contain" />
              </span>
              ReemDigiTech
            </Link>
            <p className="mt-4 text-sm text-ink-400 leading-relaxed max-w-xs">
              Helping businesses grow through digital innovation — content, marketing, design, video, and web development under one roof.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500 mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-ink-300 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500 mb-4">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500 mb-4">Stay in the loop</h4>
            <p className="text-sm text-ink-400 mb-4">Practical insights on marketing, design, and growth — no spam, ever.</p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} ReemDigiTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-ink-500 hover:text-ink-200 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
