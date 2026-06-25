import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { CreateAdminDialog } from "@/components/admin/create-admin-dialog";
import { AdminsTable } from "@/components/admin/admins-table";
import type { AdminProfile } from "@/types/database";

export default async function AdminAdminsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    redirect("/admin");
  }

  const { data: admins } = await supabase
    .from("admin_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const adminList: AdminProfile[] = admins ?? [];

  return (
    <div>
      <AdminPageHeader
        title="Admin Accounts"
        description={`${adminList.length} admin account${adminList.length === 1 ? "" : "s"} · Super admin only`}
        backHref="/admin"
        backLabel="Overview"
        action={<CreateAdminDialog />}
      />
      <AdminsTable admins={adminList} currentUserId={user.id} />
    </div>
  );
}
