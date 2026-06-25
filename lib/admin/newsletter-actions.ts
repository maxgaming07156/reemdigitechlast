"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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
  return { supabase, profile, userId: user.id };
}

export async function toggleSubscriberActive(id: string, isActive: boolean): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("subscribers").update({ is_active: isActive }).eq("id", id);

    if (error) {
      console.error("Error updating subscriber:", error);
      return { success: false, message: "Something went wrong updating the subscriber." };
    }

    revalidatePath("/admin/newsletter");
    return { success: true, message: isActive ? "Subscriber reactivated." : "Subscriber marked as unsubscribed." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function deleteSubscriber(id: string): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      console.error("Error deleting subscriber:", error);
      return { success: false, message: "Something went wrong deleting the subscriber." };
    }

    revalidatePath("/admin/newsletter");
    return { success: true, message: "Subscriber removed." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
