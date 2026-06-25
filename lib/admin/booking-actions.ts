"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import type { BookingStatus } from "@/types/database";

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

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

const notesSchema = z.object({
  admin_notes: z.string().max(2000).optional().or(z.literal("")),
});

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<AdminActionResult> {
  if (!VALID_STATUSES.includes(status)) {
    return { success: false, message: "Invalid status." };
  }

  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);

    if (error) {
      console.error("Error updating booking status:", error);
      return { success: false, message: "Something went wrong updating the status." };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Status updated." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function updateBookingNotes(id: string, formData: unknown): Promise<AdminActionResult> {
  const parsed = notesSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: "Notes couldn't be saved — please try again." };
  }

  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase
      .from("bookings")
      .update({ admin_notes: parsed.data.admin_notes || null })
      .eq("id", id);

    if (error) {
      console.error("Error updating booking notes:", error);
      return { success: false, message: "Something went wrong saving notes." };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Notes saved." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function deleteBooking(id: string): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      return { success: false, message: "Something went wrong deleting the booking." };
    }

    revalidatePath("/admin/bookings");
    return { success: true, message: "Booking deleted." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
