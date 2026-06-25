"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { deletePortfolioProject } from "@/lib/admin/portfolio-actions";
import { formatDate } from "@/lib/utils";
import type { PortfolioProject } from "@/types/database";

export function PortfolioProjectsTable({ projects }: { projects: PortfolioProject[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const result = await deletePortfolioProject(id);
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
            <th className="px-5 py-3 font-medium text-ink-500">Project</th>
            <th className="px-5 py-3 font-medium text-ink-500">Industry</th>
            <th className="px-5 py-3 font-medium text-ink-500">Client</th>
            <th className="px-5 py-3 font-medium text-ink-500">Completed</th>
            <th className="px-5 py-3 font-medium text-ink-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
          {projects.map((project) => (
            <tr key={project.id} className="bg-white dark:bg-ink-900">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 rounded-lg overflow-hidden bg-ink-100 shrink-0">
                    <Image src={project.featured_image} alt={project.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-ink-900 dark:text-white max-w-[220px] truncate flex items-center gap-1.5">
                      {project.title}
                      {project.is_featured && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />}
                    </p>
                    <p className="text-xs text-ink-400">/{project.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{project.industry}</td>
              <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{project.client_name}</td>
              <td className="px-5 py-4 text-ink-500 dark:text-ink-400">{formatDate(project.completion_date)}</td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  <Button asChild variant="ghost" size="icon" title="View on site">
                    <Link href={`/portfolio/${project.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" title="Edit">
                    <Link href={`/admin/portfolio/${project.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <ConfirmDeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Delete this project?"
                    description={`"${project.title}" will be permanently removed. This can't be undone.`}
                    onConfirm={() => handleDelete(project.id)}
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
