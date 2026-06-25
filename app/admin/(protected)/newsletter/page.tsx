import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { SubscribersTable } from "@/components/admin/subscribers-table";
import { createClient } from "@/lib/supabase/server";
import type { Subscriber } from "@/types/database";

async function getSubscribers(): Promise<Subscriber[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminNewsletterPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <AdminPageHeader
        title="Newsletter Subscribers"
        description={`${subscribers.length} subscriber${subscribers.length === 1 ? "" : "s"}`}
        backHref="/admin"
        backLabel="Overview"
      />

      {subscribers.length === 0 ? (
        <AdminEmptyState
          title="No subscribers yet"
          description="Newsletter sign-ups from the website will appear here."
        />
      ) : (
        <SubscribersTable subscribers={subscribers} />
      )}
    </div>
  );
}
