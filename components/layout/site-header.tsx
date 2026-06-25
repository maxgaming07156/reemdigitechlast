"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, getSubServicesByParent } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  // The homepage hero is a dark section that sits directly beneath the
  // fixed header before the user scrolls, while every other page starts
  // with a light background. Use light text on the unscrolled homepage so
  // it isn't dark-on-dark, and keep the original dark text everywhere else.
  const onDarkHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-ink-900/80 backdrop-blur-lg border-b border-ink-100 dark:border-ink-800 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-px container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
            <Image src="/logo-icon.png" alt="" width={36} height={36} className="h-7 w-7 object-contain" priority />
          </span>
          <span className={cn(onDarkHero ? "text-white" : "text-ink-900 dark:text-white")}>
            ReemDigiTech
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-400",
                onDarkHero ? "text-white/90" : "text-ink-600 dark:text-ink-300 hover:text-indigo-500"
              )}
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-72"
                >
                  <div className="rounded-2xl border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800 shadow-xl p-2 max-h-[70vh] overflow-y-auto">
                    {services.map((service) => {
                      const children = service.subServiceSlugs
                        ? getSubServicesByParent(service.slug)
                        : [];
                      return (
                        <div key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700 dark:text-ink-200 hover:bg-indigo-50 dark:hover:bg-ink-700 hover:text-indigo-600 transition-colors"
                          >
                            {service.name}
                          </Link>
                          {children.length > 0 && (
                            <div className="pl-3 pb-1">
                              {children.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={`/services/${child.slug}`}
                                  className="block rounded-lg px-4 py-2 text-xs text-ink-500 dark:text-ink-400 hover:bg-indigo-50 dark:hover:bg-ink-700 hover:text-indigo-600 transition-colors"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-indigo-400",
                pathname === link.href
                  ? "text-indigo-500"
                  : onDarkHero
                    ? "text-white/90"
                    : "text-ink-600 dark:text-ink-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="indigo" size="default">
            <Link href="/book-consultation">Book a Consultation</Link>
          </Button>
        </div>

        <button
          className={cn("lg:hidden p-2", onDarkHero ? "text-white" : "text-ink-900 dark:text-white")}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white dark:bg-ink-900 border-t border-ink-100 dark:border-ink-800"
          >
            <div className="container-px container py-6 flex flex-col gap-1">
              <Link href="/services" className="py-3 text-base font-medium text-ink-800 dark:text-ink-100">
                Services
              </Link>
              {services.map((service) => {
                const children = service.subServiceSlugs
                  ? getSubServicesByParent(service.slug)
                  : [];
                return (
                  <div key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block py-2 pl-4 text-sm text-ink-500 dark:text-ink-400"
                    >
                      {service.name}
                    </Link>
                    {children.map((child) => (
                      <Link
                        key={child.slug}
                        href={`/services/${child.slug}`}
                        className="block py-1.5 pl-8 text-xs text-ink-400 dark:text-ink-500"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                );
              })}
              {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
                <Link key={link.href} href={link.href} className="py-3 text-base font-medium text-ink-800 dark:text-ink-100">
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="indigo" className="mt-4 w-full">
                <Link href="/book-consultation">Book a Consultation</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
