"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, Star } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { createTestimonial, updateTestimonial } from "@/lib/admin/testimonial-actions";
import type { Testimonial } from "@/types/database";

const formSchema = z.object({
  client_name: z.string().min(1, "Client name is required."),
  client_title: z.string().min(1, "Client title is required."),
  client_company: z.string().min(1, "Company is required."),
  client_country: z.string().min(1, "Country is required."),
  client_avatar: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  content: z.string().min(10, "Testimonial must be at least 10 characters.").max(1000),
  rating: z.coerce.number().int().min(1).max(5),
  is_featured: z.boolean(),
  display_order: z.coerce.number().int(),
});

type FormValues = z.infer<typeof formSchema>;

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: testimonial
      ? {
          client_name: testimonial.client_name,
          client_title: testimonial.client_title,
          client_company: testimonial.client_company,
          client_country: testimonial.client_country,
          client_avatar: testimonial.client_avatar ?? "",
          content: testimonial.content,
          rating: testimonial.rating,
          is_featured: testimonial.is_featured,
          display_order: testimonial.display_order,
        }
      : {
          client_name: "",
          client_title: "",
          client_company: "",
          client_country: "",
          client_avatar: "",
          content: "",
          rating: 5,
          is_featured: false,
          display_order: 0,
        },
  });

  const rating = watch("rating");

  async function onSubmit(values: FormValues) {
    const result = testimonial
      ? await updateTestimonial(testimonial.id, values)
      : await createTestimonial(values);

    if (result.success) {
      toast.success(result.message);
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client name</Label>
          <Input id="client_name" {...register("client_name")} />
          {errors.client_name && <p className="text-xs text-red-500">{errors.client_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_title">Client title</Label>
          <Input id="client_title" placeholder="e.g. Founder" {...register("client_title")} />
          {errors.client_title && <p className="text-xs text-red-500">{errors.client_title.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="client_company">Company</Label>
          <Input id="client_company" {...register("client_company")} />
          {errors.client_company && <p className="text-xs text-red-500">{errors.client_company.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_country">Country</Label>
          <Input id="client_country" placeholder="e.g. United Kingdom" {...register("client_country")} />
          {errors.client_country && <p className="text-xs text-red-500">{errors.client_country.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client_avatar">Avatar URL (optional)</Label>
        <Input id="client_avatar" placeholder="https://…" {...register("client_avatar")} />
        {errors.client_avatar && <p className="text-xs text-red-500">{errors.client_avatar.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Testimonial</Label>
        <Textarea id="content" rows={5} {...register("content")} />
        {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => field.onChange(star)}>
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      star <= rating ? "fill-amber-400 text-amber-400" : "text-ink-200 dark:text-ink-700"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-ink-100 dark:border-ink-700 p-4">
        <div>
          <Label htmlFor="is_featured">Featured on homepage</Label>
          <p className="text-xs text-ink-400 mt-0.5">Shown in the homepage testimonials carousel.</p>
        </div>
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
        <Input id="display_order" type="number" className="max-w-[160px]" {...register("display_order")} />
        <p className="text-xs text-ink-400">Lower numbers appear first.</p>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink-100 dark:border-ink-800 pt-6">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/testimonials")}>
          Cancel
        </Button>
        <Button type="submit" variant="indigo" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {testimonial ? "Save Changes" : "Create Testimonial"}
        </Button>
      </div>
    </form>
  );
}
