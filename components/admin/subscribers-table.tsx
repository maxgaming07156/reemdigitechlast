"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SearchInput } from "@/components/admin/search-input";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { AdminEmptyState } from "@/components/admin/page-header";
import { toggleSubscriberActive, deleteSubscriber } from "@/lib/admin/newsletter-actions";
import { formatDate } from "@/lib/utils";
import type { Subscriber } from "@/types/database";

export function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleToggle(id: string, isActive: boolean) {
    const result = await toggleSubscriberActive(id, isActive);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteSubscriber(id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by email…" />
        <Button asChild variant="outline">
          <a href="/api/admin/subscribers/export" download>
            <Download className="h-4 w-4" /> Export CSV
          </a>
        </Button>
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No subscribers found"
          description={search ? "Try a different search term." : "Newsletter sign-ups from the website will appear here."}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-100 dark:border-ink-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50 dark:bg-ink-900 text-left">
                <th className="px-5 py-3 font-medium text-ink-500">Email</th>
                <th className="px-5 py-3 font-medium text-ink-500">Subscribed</th>
                <th className="px-5 py-3 font-medium text-ink-500">Active</th>
                <th className="px-5 py-3 font-medium text-ink-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
              {filtered.map((sub) => (
                <tr key={sub.id} className="bg-white dark:bg-ink-900">
                  <td className="px-5 py-4 text-ink-900 dark:text-white font-medium">{sub.email}</td>
                  <td className="px-5 py-4 text-ink-500 dark:text-ink-400">{formatDate(sub.subscribed_at)}</td>
                  <td className="px-5 py-4">
                    <Switch checked={sub.is_active} onCheckedChange={(checked) => handleToggle(sub.id, checked)} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <ConfirmDeleteDialog
                        trigger={
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        title="Remove this subscriber?"
                        description={`${sub.email} will be permanently removed from the subscriber list.`}
                        onConfirm={() => handleDelete(sub.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
