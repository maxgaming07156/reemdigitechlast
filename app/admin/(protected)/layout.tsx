import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logoutAdmin } from "@/lib/auth-actions";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LayoutDashboard, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware already redirects unauthenticated visitors away from /admin/*,
  // but this is the layout-level backstop in case middleware is ever bypassed.
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("full_name, email, role")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <header className="bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-ink-800">
        <div className="container-px container flex items-center justify-between py-4">
          <Link href="/admin" className="flex items-center gap-2 font-display font-semibold text-ink-900 dark:text-white">
            <LayoutDashboard className="h-5 w-5 text-indigo-500" />
            ReemDigiTech Admin
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-ink-900 dark:text-white">{profile.full_name}</p>
              <p className="text-xs text-ink-400 capitalize">{profile.role.replace("_", " ")}</p>
            </div>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="container-px container py-10 flex flex-col lg:flex-row gap-8">
        <AdminSidebar role={profile.role} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
