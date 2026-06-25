import type { MetadataRoute } from "next";
import { services, subServices } from "@/lib/data/services";
import { getPublishedBlogPostsForBuild, getPortfolioProjectsForBuild } from "@/lib/data/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reemdigitech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/book-consultation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const subServiceRoutes: MetadataRoute.Sitemap = subServices.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const [posts, projects] = await Promise.all([
    getPublishedBlogPostsForBuild(),
    getPortfolioProjectsForBuild(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: project.updated_at,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...subServiceRoutes, ...blogRoutes, ...portfolioRoutes];
}
