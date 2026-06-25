import { createClient } from "@/lib/supabase/server";
import type { BlogPost, PortfolioProject, Testimonial } from "@/types/database";

export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts (admin):", error);
    return [];
  }
  return data ?? [];
}

export async function getBlogPostByIdForAdmin(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getAllPortfolioProjectsForAdmin(): Promise<PortfolioProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio projects (admin):", error);
    return [];
  }
  return data ?? [];
}

export async function getPortfolioProjectByIdForAdmin(id: string): Promise<PortfolioProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials (admin):", error);
    return [];
  }
  return data ?? [];
}

export async function getTestimonialByIdForAdmin(id: string): Promise<Testimonial | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
