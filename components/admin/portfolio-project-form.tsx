"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ImageUrlList } from "@/components/admin/image-url-list";
import { ServiceCheckboxGroup } from "@/components/admin/service-checkbox-group";
import { slugify } from "@/lib/utils";
import { createPortfolioProject, updatePortfolioProject } from "@/lib/admin/portfolio-actions";
import type { PortfolioProject } from "@/types/database";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters."),
  industry: z.string().min(1, "Industry is required."),
  services: z.array(z.string()).min(1, "Select at least one service."),
  featured_image: z.string().url("Must be a valid image URL."),
  gallery_images: z.array(z.string()),
  results: z.string().min(10, "Results must be at least 10 characters."),
  client_name: z.string().min(1, "Client name is required."),
  completion_date: z.string().min(1, "Completion date is required."),
  is_featured: z.boolean(),
  display_order: z.coerce.number().int(),
  meta_title: z.string().optional().or(z.literal("")),
  meta_description: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function PortfolioProjectForm({ project }: { project?: PortfolioProject }) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = React.useState(!!project);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: project
      ? {
          title: project.title,
          slug: project.slug,
          description: project.description,
          industry: project.industry,
          services: project.services,
          featured_image: project.featured_image,
          gallery_images: project.gallery_images,
          results: project.results,
          client_name: project.client_name,
          completion_date: project.completion_date,
          is_featured: project.is_featured,
          display_order: project.display_order,
          meta_title: project.meta_title ?? "",
          meta_description: project.meta_description ?? "",
        }
      : {
          title: "",
          slug: "",
          description: "",
          industry: "",
          services: [],
          featured_image: "",
          gallery_images: [],
          results: "",
          client_name: "",
          completion_date: "",
          is_featured: false,
          display_order: 0,
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
    const result = project
      ? await updatePortfolioProject(project.id, values)
      : await createPortfolioProject(values);

    if (result.success) {
      toast.success(result.message);
      router.push("/admin/portfolio");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="title">Project title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_name">Client name</Label>
              <Input id="client_name" {...register("client_name")} />
              {errors.client_name && <p className="text-xs text-red-500">{errors.client_name.message}</p>}
            </div>
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
            />
            <p className="text-xs text-ink-400">URL: /portfolio/{watch("slug") || "…"}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} {...register("description")} />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="results">Results</Label>
            <Textarea id="results" rows={3} placeholder="Measurable outcomes — numbers, percentages, specific wins." {...register("results")} />
            {errors.results && <p className="text-xs text-red-500">{errors.results.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Gallery images</Label>
            <Controller
              name="gallery_images"
              control={control}
              render={({ field }) => <ImageUrlList value={field.value} onChange={field.onChange} />}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-5">
            <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">Details</h3>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="e.g. Hospitality & Restaurants" {...register("industry")} />
              {errors.industry && <p className="text-xs text-red-500">{errors.industry.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion date</Label>
              <Input id="completion_date" type="date" {...register("completion_date")} />
              {errors.completion_date && <p className="text-xs text-red-500">{errors.completion_date.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured image URL</Label>
              <Input id="featured_image" placeholder="https://…" {...register("featured_image")} />
              {errors.featured_image && <p className="text-xs text-red-500">{errors.featured_image.message}</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-3">
            <Label>Services provided</Label>
            <Controller
              name="services"
              control={control}
              render={({ field }) => <ServiceCheckboxGroup value={field.value} onChange={field.onChange} />}
            />
            {errors.services && <p className="text-xs text-red-500">{errors.services.message}</p>}
          </div>

          <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <Label htmlFor="is_featured">Featured on homepage</Label>
              <Controller
                name="is_featured"
                control={control}
                render={({ field }) => (
                  <Switch id="is_featured" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_order">Display order</Label>
              <Input id="display_order" type="number" {...register("display_order")} />
              <p className="text-xs text-ink-400">Lower numbers appear first.</p>
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
              <Textarea id="meta_description" rows={3} {...register("meta_description")} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink-100 dark:border-ink-800 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/portfolio")}>
          Cancel
        </Button>
        <Button type="submit" variant="indigo" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {project ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
