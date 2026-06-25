"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { deleteTestimonial } from "@/lib/admin/testimonial-actions";
import type { Testimonial } from "@/types/database";

export function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const result = await deleteTestimonial(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-100 dark:border-ink-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50 dark:bg-ink-900 text-left">
            <th className="px-5 py-3 font-medium text-ink-500">Client</th>
            <th className="px-5 py-3 font-medium text-ink-500">Company</th>
            <th className="px-5 py-3 font-medium text-ink-500">Country</th>
            <th className="px-5 py-3 font-medium text-ink-500">Rating</th>
            <th className="px-5 py-3 font-medium text-ink-500">Featured</th>
            <th className="px-5 py-3 font-medium text-ink-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
          {testimonials.map((t) => (
            <tr key={t.id} className="bg-white dark:bg-ink-900">
              <td className="px-5 py-4">
                <p className="font-medium text-ink-900 dark:text-white">{t.client_name}</p>
                <p className="text-xs text-ink-400">{t.client_title}</p>
              </td>
              <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{t.client_company}</td>
              <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{t.client_country}</td>
              <td className="px-5 py-4">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </td>
              <td className="px-5 py-4">
                {t.is_featured ? <Badge variant="indigo">Featured</Badge> : <Badge variant="default">—</Badge>}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button asChild variant="ghost" size="icon" title="Edit">
                    <Link href={`/admin/testimonials/${t.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <ConfirmDeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Delete this testimonial?"
                    description={`The testimonial from "${t.client_name}" will be permanently removed.`}
                    onConfirm={() => handleDelete(t.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
