import { AdminPageHeader } from "@/components/admin/page-header";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getSiteSettings } from "@/lib/data/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Contact details, WhatsApp number, and social links shown across the public site."
        backHref="/admin"
        backLabel="Overview"
      />
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
