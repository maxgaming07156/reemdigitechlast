"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { deleteBlogPost } from "@/lib/admin/blog-actions";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/database";

export function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const result = await deleteBlogPost(id);
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
            <th className="px-5 py-3 font-medium text-ink-500">Title</th>
            <th className="px-5 py-3 font-medium text-ink-500">Category</th>
            <th className="px-5 py-3 font-medium text-ink-500">Status</th>
            <th className="px-5 py-3 font-medium text-ink-500">Created</th>
            <th className="px-5 py-3 font-medium text-ink-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
          {posts.map((post) => (
            <tr key={post.id} className="bg-white dark:bg-ink-900">
              <td className="px-5 py-4">
                <p className="font-medium text-ink-900 dark:text-white max-w-xs truncate">{post.title}</p>
                <p className="text-xs text-ink-400">/{post.slug}</p>
              </td>
              <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{post.category}</td>
              <td className="px-5 py-4">
                <Badge variant={post.status === "published" ? "green" : "default"}>
                  {post.status === "published" ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="px-5 py-4 text-ink-500 dark:text-ink-400">{formatDate(post.created_at)}</td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1.5">
                  {post.status === "published" && (
                    <Button asChild variant="ghost" size="icon" title="View on site">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="icon" title="Edit">
                    <Link href={`/admin/blogs/${post.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <ConfirmDeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Delete this post?"
                    description={`"${post.title}" will be permanently removed. This can't be undone.`}
                    onConfirm={() => handleDelete(post.id)}
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
