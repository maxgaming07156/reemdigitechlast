"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const testimonialSchema = z.object({
  client_name: z.string().min(1, "Client name is required.").max(120),
  client_title: z.string().min(1, "Client title is required.").max(120),
  client_company: z.string().min(1, "Company is required.").max(150),
  client_country: z.string().min(1, "Country is required."),
  client_avatar: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  content: z.string().min(10, "Testimonial content must be at least 10 characters.").max(1000),
  rating: z.coerce.number().int().min(1).max(5),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().int().default(0),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export interface AdminActionResult {
  success: boolean;
  message: string;
  id?: string;
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

export async function createTestimonial(formData: unknown): Promise<AdminActionResult> {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase } = await requireAdmin();

    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        client_name: parsed.data.client_name,
        client_title: parsed.data.client_title,
        client_company: parsed.data.client_company,
        client_country: parsed.data.client_country,
        client_avatar: parsed.data.client_avatar || null,
        content: parsed.data.content,
        rating: parsed.data.rating,
        is_featured: parsed.data.is_featured,
        display_order: parsed.data.display_order,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating testimonial:", error);
      return { success: false, message: "Something went wrong creating the testimonial." };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/testimonials");
    revalidatePath("/");
    return { success: true, message: "Testimonial created.", id: data.id };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function updateTestimonial(id: string, formData: unknown): Promise<AdminActionResult> {
  const parsed = testimonialSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("testimonials")
      .update({
        client_name: parsed.data.client_name,
        client_title: parsed.data.client_title,
        client_company: parsed.data.client_company,
        client_country: parsed.data.client_country,
        client_avatar: parsed.data.client_avatar || null,
        content: parsed.data.content,
        rating: parsed.data.rating,
        is_featured: parsed.data.is_featured,
        display_order: parsed.data.display_order,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating testimonial:", error);
      return { success: false, message: "Something went wrong updating the testimonial." };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/testimonials");
    revalidatePath("/");
    return { success: true, message: "Testimonial updated." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function deleteTestimonial(id: string): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      return { success: false, message: "Something went wrong deleting the testimonial." };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/testimonials");
    revalidatePath("/");
    return { success: true, message: "Testimonial deleted." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
