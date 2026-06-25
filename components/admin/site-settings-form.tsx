"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateSiteSettings } from "@/lib/admin/settings-actions";
import type { SiteSettings } from "@/types/database";

const formSchema = z.object({
  contact_email: z.string().email("Please enter a valid email address."),
  contact_phone_display: z.string().min(3),
  whatsapp_number: z.string().min(6).regex(/^\d+$/, "Digits only, e.g. 971505082998"),
  office_location: z.string().min(3),
  linkedin_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  instagram_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  facebook_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_email: settings.contact_email,
      contact_phone_display: settings.contact_phone_display,
      whatsapp_number: settings.whatsapp_number,
      office_location: settings.office_location,
      linkedin_url: settings.linkedin_url ?? "",
      instagram_url: settings.instagram_url ?? "",
      facebook_url: settings.facebook_url ?? "",
      twitter_url: settings.twitter_url ?? "",
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await updateSiteSettings(values);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 space-y-5">
        <h3 className="font-display font-semibold text-ink-900 dark:text-white">Contact Details</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 -mt-3">
          Shown on the Contact page, footer, and legal pages.
        </p>

        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact email</Label>
          <Input id="contact_email" type="email" {...register("contact_email")} />
          {errors.contact_email && <p className="text-xs text-red-500">{errors.contact_email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_phone_display">Phone number (displayed)</Label>
          <Input id="contact_phone_display" placeholder="+971 50 508 2998" {...register("contact_phone_display")} />
          {errors.contact_phone_display && <p className="text-xs text-red-500">{errors.contact_phone_display.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="office_location">Where you operate</Label>
          <Input id="office_location" placeholder="UK · UAE · Denmark · Pakistan" {...register("office_location")} />
          {errors.office_location && <p className="text-xs text-red-500">{errors.office_location.message}</p>}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 space-y-5">
        <h3 className="font-display font-semibold text-ink-900 dark:text-white">WhatsApp Button</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 -mt-3">
          Controls the floating WhatsApp button shown on every public page.
        </p>

        <div className="space-y-2">
          <Label htmlFor="whatsapp_number">WhatsApp number</Label>
          <Input id="whatsapp_number" placeholder="971505082998" {...register("whatsapp_number")} />
          {errors.whatsapp_number ? (
            <p className="text-xs text-red-500">{errors.whatsapp_number.message}</p>
          ) : (
            <p className="text-xs text-ink-400">Country code + number, digits only — no spaces, +, or dashes.</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 dark:border-ink-700 p-6 space-y-5">
        <h3 className="font-display font-semibold text-ink-900 dark:text-white">Social Links</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 -mt-3">
          Leave blank to hide an icon from the footer.
        </p>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input id="linkedin_url" placeholder="https://linkedin.com/company/…" {...register("linkedin_url")} />
          {errors.linkedin_url && <p className="text-xs text-red-500">{errors.linkedin_url.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram_url">Instagram URL</Label>
          <Input id="instagram_url" placeholder="https://instagram.com/…" {...register("instagram_url")} />
          {errors.instagram_url && <p className="text-xs text-red-500">{errors.instagram_url.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook_url">Facebook URL</Label>
          <Input id="facebook_url" placeholder="https://facebook.com/…" {...register("facebook_url")} />
          {errors.facebook_url && <p className="text-xs text-red-500">{errors.facebook_url.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter_url">X / Twitter URL</Label>
          <Input id="twitter_url" placeholder="https://x.com/…" {...register("twitter_url")} />
          {errors.twitter_url && <p className="text-xs text-red-500">{errors.twitter_url.message}</p>}
        </div>
      </div>

      <div className="flex justify-end border-t border-ink-100 dark:border-ink-800 pt-6">
        <Button type="submit" variant="indigo" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Settings
        </Button>
      </div>
    </form>
  );
}
