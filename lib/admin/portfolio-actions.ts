"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const portfolioProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(200),
  slug: z.string().max(200).optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters."),
  industry: z.string().min(1, "Industry is required."),
  services: z.array(z.string()).min(1, "Select at least one service."),
  featured_image: z.string().url("Must be a valid URL."),
  gallery_images: z.array(z.string().url("Each gallery image must be a valid URL.")).default([]),
  results: z.string().min(10, "Results must be at least 10 characters."),
  client_name: z.string().min(1, "Client name is required."),
  completion_date: z.string().min(1, "Completion date is required."),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().int().default(0),
  meta_title: z.string().max(200).optional().or(z.literal("")),
  meta_description: z.string().max(300).optional().or(z.literal("")),
});

export type PortfolioProjectFormValues = z.infer<typeof portfolioProjectSchema>;

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

export async function createPortfolioProject(formData: unknown): Promise<AdminActionResult> {
  const parsed = portfolioProjectSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase } = await requireAdmin();
    const slug = parsed.data.slug?.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.title);

    const { data, error } = await supabase
      .from("portfolio_projects")
      .insert({
        title: parsed.data.title,
        slug,
        description: parsed.data.description,
        industry: parsed.data.industry,
        services: parsed.data.services,
        featured_image: parsed.data.featured_image,
        gallery_images: parsed.data.gallery_images,
        results: parsed.data.results,
        client_name: parsed.data.client_name,
        completion_date: parsed.data.completion_date,
        is_featured: parsed.data.is_featured,
        display_order: parsed.data.display_order,
        meta_title: parsed.data.meta_title || null,
        meta_description: parsed.data.meta_description || null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "A project with this slug already exists." };
      }
      console.error("Error creating portfolio project:", error);
      return { success: false, message: "Something went wrong creating the project." };
    }

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true, message: "Project created.", id: data.id };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function updatePortfolioProject(id: string, formData: unknown): Promise<AdminActionResult> {
  const parsed = portfolioProjectSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase } = await requireAdmin();
    const slug = parsed.data.slug?.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.title);

    const { data: existing } = await supabase
      .from("portfolio_projects")
      .select("slug")
      .eq("id", id)
      .single();

    const { error } = await supabase
      .from("portfolio_projects")
      .update({
        title: parsed.data.title,
        slug,
        description: parsed.data.description,
        industry: parsed.data.industry,
        services: parsed.data.services,
        featured_image: parsed.data.featured_image,
        gallery_images: parsed.data.gallery_images,
        results: parsed.data.results,
        client_name: parsed.data.client_name,
        completion_date: parsed.data.completion_date,
        is_featured: parsed.data.is_featured,
        display_order: parsed.data.display_order,
        meta_title: parsed.data.meta_title || null,
        meta_description: parsed.data.meta_description || null,
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "A project with this slug already exists." };
      }
      console.error("Error updating portfolio project:", error);
      return { success: false, message: "Something went wrong updating the project." };
    }

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    if (existing?.slug) revalidatePath(`/portfolio/${existing.slug}`);
    revalidatePath(`/portfolio/${slug}`);
    return { success: true, message: "Project updated." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function deletePortfolioProject(id: string): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);

    if (error) {
      console.error("Error deleting portfolio project:", error);
      return { success: false, message: "Something went wrong deleting the project." };
    }

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true, message: "Project deleted." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
