import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <AdminPageHeader title={title} backHref="/admin" backLabel="Overview" />
      <AdminEmptyState
        title="Coming in the next build"
        description={description}
      />
    </div>
  );
}
