import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  contact_email: "hello@reemdigitech.com",
  contact_phone_display: "+971 50 508 2998",
  whatsapp_number: "971505082998",
  office_location: "All over the globe",
  linkedin_url: null,
  instagram_url: null,
  facebook_url: null,
  twitter_url: null,
  updated_at: new Date().toISOString(),
  updated_by: null,
};

/**
 * Fetches the singleton site_settings row. Falls back to hardcoded
 * defaults if the row doesn't exist yet (e.g. migration 0004 hasn't
 * been run) so the public site never breaks on a missing settings row.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return FALLBACK_SETTINGS;
  }
  return data;
}
