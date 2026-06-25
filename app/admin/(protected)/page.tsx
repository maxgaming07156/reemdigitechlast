import Link from "next/link";
import { FileText, Briefcase, MessageSquareQuote, Users, Mail, CalendarClock, UserCog } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();
  const [blogs, portfolio, testimonials, leads, subscribers, bookings, admins] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("admin_profiles").select("id", { count: "exact", head: true }),
  ]);

  return {
    blogs: blogs.count ?? 0,
    portfolio: portfolio.count ?? 0,
    testimonials: testimonials.count ?? 0,
    leads: leads.count ?? 0,
    subscribers: subscribers.count ?? 0,
    bookings: bookings.count ?? 0,
    admins: admins.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("admin_profiles").select("role").eq("id", user.id).single()
    : { data: null };

  const counts = await getCounts();

  const cards = [
    { label: "Leads", value: counts.leads, icon: Users, href: "/admin/leads", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Bookings", value: counts.bookings, icon: CalendarClock, href: "/admin/bookings", color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10" },
    { label: "Blog Posts", value: counts.blogs, icon: FileText, href: "/admin/blogs", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Portfolio Projects", value: counts.portfolio, icon: Briefcase, href: "/admin/portfolio", color: "text-rose-500 bg-rose-50 dark:bg-rose-500/10" },
    { label: "Testimonials", value: counts.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", color: "text-sky-500 bg-sky-50 dark:bg-sky-500/10" },
    { label: "Newsletter Subscribers", value: counts.subscribers, icon: Mail, href: "/admin/newsletter", color: "text-violet-500 bg-violet-50 dark:bg-violet-500/10" },
    ...(profile?.role === "super_admin"
      ? [{ label: "Admin Accounts", value: counts.admins, icon: UserCog, href: "/admin/admins", color: "text-orange-500 bg-orange-50 dark:bg-orange-500/10" }]
      : []),
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">Overview</h1>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        A quick snapshot of everything happening across the site.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-6 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-3xl font-semibold text-ink-900 dark:text-white">{card.value}</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 p-8 text-center">
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Every section is now fully built: create/edit/delete for Blog, Portfolio, and Testimonials; status tracking
          and notes for Leads and Bookings; search and CSV export for Newsletter; admin account management (super
          admin only); and site-wide Settings for contact details, WhatsApp number, and social links.
        </p>
      </div>
    </div>
  );
}
