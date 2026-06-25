import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { getPublishedBlogPosts } from "@/lib/data/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on digital marketing, content creation, web development, and growth strategy from the ReemDigiTech team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pt-32 pb-24">
      <section className="container-px container">
        <Reveal>
          <span className="eyebrow">Insights</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 max-w-2xl text-ink-900 dark:text-white">
            Ideas worth acting on.
          </h1>
        </Reveal>
      </section>

      {featured && (
        <section className="container-px container mt-14">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-ink-100 dark:border-ink-700 overflow-hidden">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full bg-ink-100">
                {featured.cover_image && (
                  <Image src={featured.cover_image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
              </div>
              <div className="p-8 lg:p-10">
                <span className="font-mono text-xs uppercase tracking-wide text-indigo-500">{featured.category}</span>
                <h2 className="mt-3 font-display text-2xl lg:text-3xl font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-ink-500 dark:text-ink-300 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-ink-400">
                  <span>{featured.published_at ? formatDate(featured.published_at) : ""}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.read_time_minutes} min read
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="container-px container mt-12">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <RevealItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-100">
                  {post.cover_image && (
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <span className="mt-4 block font-mono text-xs uppercase tracking-wide text-indigo-500">{post.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink-400">
                  <span>{post.published_at ? formatDate(post.published_at) : ""}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.read_time_minutes} min read
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
