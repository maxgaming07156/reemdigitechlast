"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(200),
  slug: z.string().min(3, "Slug must be at least 3 characters.").max(200),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(400),
  content: z.string().min(20, "Content must be at least 20 characters."),
  cover_image: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required."),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]),
  read_time_minutes: z.coerce.number().int().min(1).max(120),
  meta_title: z.string().max(200).optional().or(z.literal("")),
  meta_description: z.string().max(300).optional().or(z.literal("")),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

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

export async function createBlogPost(formData: unknown): Promise<AdminActionResult> {
  const parsed = blogPostSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase, userId } = await requireAdmin();
    const slug = parsed.data.slug.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.title);

    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        cover_image: parsed.data.cover_image || null,
        category: parsed.data.category,
        tags: parsed.data.tags,
        status: parsed.data.status,
        read_time_minutes: parsed.data.read_time_minutes,
        meta_title: parsed.data.meta_title || null,
        meta_description: parsed.data.meta_description || null,
        author_id: userId,
        published_at: parsed.data.status === "published" ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "A post with this slug already exists. Try a different title or slug." };
      }
      console.error("Error creating blog post:", error);
      return { success: false, message: "Something went wrong creating the post." };
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true, message: "Post created.", id: data.id };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function updateBlogPost(id: string, formData: unknown): Promise<AdminActionResult> {
  const parsed = blogPostSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { supabase } = await requireAdmin();
    const slug = parsed.data.slug.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.title);

    // Preserve original published_at if already published; set it the first
    // time a draft flips to published.
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("status, published_at, slug")
      .eq("id", id)
      .single();

    const published_at =
      parsed.data.status === "published"
        ? existing?.published_at ?? new Date().toISOString()
        : null;

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        cover_image: parsed.data.cover_image || null,
        category: parsed.data.category,
        tags: parsed.data.tags,
        status: parsed.data.status,
        read_time_minutes: parsed.data.read_time_minutes,
        meta_title: parsed.data.meta_title || null,
        meta_description: parsed.data.meta_description || null,
        published_at,
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "A post with this slug already exists." };
      }
      console.error("Error updating blog post:", error);
      return { success: false, message: "Something went wrong updating the post." };
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
    revalidatePath(`/blog/${slug}`);
    return { success: true, message: "Post updated." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}

export async function deleteBlogPost(id: string): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireAdmin();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return { success: false, message: "Something went wrong deleting the post." };
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true, message: "Post deleted." };
  } catch (e) {
    console.error(e);
    return { success: false, message: "You don't have permission to do this." };
  }
}
