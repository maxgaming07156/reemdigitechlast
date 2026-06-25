import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { LeadsList } from "@/components/admin/leads-list";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/types/database";

async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        description={`${leads.length} submission${leads.length === 1 ? "" : "s"} from the contact form`}
        backHref="/admin"
        backLabel="Overview"
      />

      {leads.length === 0 ? (
        <AdminEmptyState
          title="No leads yet"
          description="Contact form submissions will appear here as soon as someone reaches out."
        />
      ) : (
        <LeadsList leads={leads} />
      )}
    </div>
  );
}
