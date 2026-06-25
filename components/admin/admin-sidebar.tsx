"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquareQuote,
  Users,
  CalendarClock,
  Mail,
  UserCog,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/types/database";

function getNavSections(role: AdminRole) {
  return [
    {
      label: "Overview",
      items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      label: "Content",
      items: [
        { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
        { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
        { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
      ],
    },
    {
      label: "Operations",
      items: [
        { href: "/admin/leads", label: "Leads", icon: Users },
        { href: "/admin/bookings", label: "Bookings", icon: CalendarClock },
        { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
      ],
    },
    {
      label: "System",
      items: [
        ...(role === "super_admin" ? [{ href: "/admin/admins", label: "Admins", icon: UserCog }] : []),
        { href: "/admin/settings", label: "Settings", icon: Settings },
      ],
    },
  ];
}

export function AdminSidebar({ role }: { role: AdminRole }) {
  const pathname = usePathname();
  const NAV_SECTIONS = getNavSections(role);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname?.startsWith(href);
  }

  return (
    <nav className="w-full lg:w-56 shrink-0 space-y-6">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="px-3 mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-400">{section.label}</p>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : "text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
