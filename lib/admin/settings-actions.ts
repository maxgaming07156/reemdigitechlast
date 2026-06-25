"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export interface AdminActionResult {
  success: boolean;
  message: string;
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile) throw new Error("Not an admin.");
  return { supabase, userId: user.id };
}

const settingsSchema = z.object({
  contact_email: z.string().email("Please enter a valid email address."),
  contact_phone_display: z.string().min(3, "Please enter a phone number."),
  whatsapp_number: z
    .string()
    .min(6, "Please enter a valid WhatsApp number.")
    .regex(/^\d+$/, "Use digits only, no spaces or symbols (e.g. 971505082998)."),
  office_location: z.string().min(3, "Please describe where you operate."),
  linkedin_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  instagram_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  facebook_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
});

export type SiteSettingsFormValues = z.infer<typeof settingsSchema>;

export async function updateSiteSettings(formData: unknown): Promise<AdminActionResult> {
  const parsed = settingsSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase, userId } = await requireAdmin();

    const { error } = await supabase
      .from("site_settings")
      .update({
        contact_email: parsed.data.contact_email,
        contact_phone_display: parsed.data.contact_phone_display,
        whatsapp_number: parsed.data.whatsapp_number,
        office_location: parsed.data.office_location,
        linkedin_url: parsed.data.linkedin_url || null,
        instagram_url: parsed.data.instagram_url || null,
        facebook_url: parsed.data.facebook_url || null,
        twitter_url: parsed.data.twitter_url || null,
        updated_by: userId,
      })
      .eq("id", 1);

    if (error) {
      console.error("Error updating site settings:", error);
      return { success: false, message: "Something went wrong saving settings." };
    }

    // Revalidate every public route that reads these settings.
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { success: true, message: "Settings saved. Changes are live across the site." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
