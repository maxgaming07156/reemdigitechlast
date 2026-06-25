import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { BlogPost, PortfolioProject, Testimonial } from "@/types/database";

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}

export async function getRelatedBlogPosts(category: string, excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedPortfolioProjects(limit = 3): Promise<PortfolioProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

/**
 * Build-time variants for use in `generateStaticParams` and `app/sitemap.ts`.
 *
 * Those run during static generation, outside any incoming HTTP request,
 * so `next/headers`'s `cookies()` (used by the regular `createClient()`
 * above) throws "called outside a request scope". The service-role
 * client never touches cookies, so it's safe here — and since both
 * queries already filter to `status: "published"`, the rows returned
 * are identical to what an anonymous visitor's RLS-scoped query would see.
 */
export async function getPublishedBlogPostsForBuild(): Promise<BlogPost[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts (build):", error);
    return [];
  }
  return data ?? [];
}

export async function getPortfolioProjectsForBuild(): Promise<PortfolioProject[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio projects (build):", error);
    return [];
  }
  return data ?? [];
}
