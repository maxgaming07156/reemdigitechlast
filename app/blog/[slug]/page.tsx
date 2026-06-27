import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { getBlogPostBySlug, getRelatedBlogPosts, getPublishedBlogPostsForBuild } from "@/lib/data/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPostsForBuild();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.category, post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "ReemDigiTech" },
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-32 container-px container max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mt-6 block font-mono text-xs uppercase tracking-wide text-indigo-500">{post.category}</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-ink-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {post.published_at ? formatDate(post.published_at) : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.read_time_minutes} min read
            </span>
          </div>
        </Reveal>

        {post.cover_image && (
          <Reveal delay={0.1}>
            <div className="relative mt-8 aspect-[16/9] rounded-3xl overflow-hidden bg-ink-100">
              <SafeImage src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div
            className="mt-10 prose-content max-w-none [&_h1]:font-display [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-ink-900 dark:[&_h1]:text-white [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-ink-900 dark:[&_h2]:text-white [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-ink-900 dark:[&_h3]:text-white [&_p]:text-ink-600 dark:[&_p]:text-ink-300 [&_p]:leading-relaxed [&_p]:mb-5"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </Reveal>

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-ink-100 dark:bg-ink-800 px-3 py-1 text-xs font-medium text-ink-600 dark:text-ink-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-2xl bg-ink-50 dark:bg-ink-800 p-7">
            <h3 className="font-display font-semibold text-ink-900 dark:text-white">Get more insights like this</h3>
            <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-300">Subscribe to our newsletter — no spam, just practical strategy.</p>
            <div className="mt-4 max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="container-px container mt-20 max-w-5xl">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">Related articles</h2>
          </Reveal>
          <RevealGroup className="mt-8 grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <RevealItem key={p.id}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-100">
                    {p.cover_image && (
                      <SafeImage src={p.cover_image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-ink-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}
    </div>
  );
}
