"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TagInput } from "@/components/admin/tag-input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { slugify } from "@/lib/utils";
import { createBlogPost, updateBlogPost } from "@/lib/admin/blog-actions";
import type { BlogPost } from "@/types/database";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().optional().or(z.literal("")),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(400),
  content: z.string().min(20, "Content must be at least 20 characters."),
  cover_image: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required."),
  tags: z.array(z.string()),
  status: z.enum(["draft", "published"]),
  read_time_minutes: z.coerce.number().int().min(1).max(120),
  meta_title: z.string().optional().or(z.literal("")),
  meta_description: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = ["Digital Marketing", "Web Development", "Content Creation", "Social Media", "SEO", "Graphic Design", "Video Editing", "General"];

export function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = React.useState(!!post);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          cover_image: post.cover_image ?? "",
          category: post.category,
          tags: post.tags,
          status: post.status,
          read_time_minutes: post.read_time_minutes,
          meta_title: post.meta_title ?? "",
          meta_description: post.meta_description ?? "",
        }
      : {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          cover_image: "",
          category: "Digital Marketing",
          tags: [],
          status: "draft",
          read_time_minutes: 5,
          meta_title: "",
          meta_description: "",
        },
  });

  const title = watch("title");

  React.useEffect(() => {
    if (!slugTouched && title) {
      setValue("slug", slugify(title));
    }
  }, [title, slugTouched, setValue]);

  async function onSubmit(values: FormValues) {
    const result = post
      ? await updateBlogPost(post.id, values)
      : await createBlogPost(values);

    if (result.success) {
      toast.success(result.message);
      router.push("/admin/blogs");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              {...register("slug")}
              onChange={(e) => {
                setSlugTouched(true);
                register("slug").onChange(e);
              }}
              placeholder="auto-generated-from-title"
            />
            <p className="text-xs text-ink-400">URL: /blog/{watch("slug") || "…"}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <textarea
              id="excerpt"
              rows={2}
              {...register("excerpt")}
              className="flex w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 resize-none"
              placeholder="A one or two sentence summary shown on the blog listing page."
            />
            {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-5">
            <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">Publishing</h3>

            <div className="space-y-2">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="read_time_minutes">Read time (minutes)</Label>
              <Input id="read_time_minutes" type="number" min={1} max={120} {...register("read_time_minutes")} />
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-5">
            <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">Media & Tags</h3>
            <div className="space-y-2">
              <Label htmlFor="cover_image">Cover image URL</Label>
              <Input id="cover_image" placeholder="https://…" {...register("cover_image")} />
              {errors.cover_image && <p className="text-xs text-red-500">{errors.cover_image.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagInput value={field.value} onChange={field.onChange} placeholder="Add a tag…" />
                )}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-5">
            <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">SEO (optional)</h3>
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta title</Label>
              <Input id="meta_title" {...register("meta_title")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta description</Label>
              <textarea
                id="meta_description"
                rows={3}
                {...register("meta_description")}
                className="flex w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink-100 dark:border-ink-800 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blogs")}>
          Cancel
        </Button>
        <Button type="submit" variant="indigo" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {post ? "Save Changes" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
