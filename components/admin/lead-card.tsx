"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StatusSelect } from "@/components/admin/status-select";
import { AdminNotesField } from "@/components/admin/admin-notes-field";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { updateLeadStatus, updateLeadNotes, deleteLead } from "@/lib/admin/lead-actions";
import { formatDate } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types/database";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
  { value: "lost", label: "Lost" },
];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  contacted: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  qualified: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  closed: "bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-300",
  lost: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

export function LeadCard({ lead }: { lead: Lead }) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteLead(lead.id);
    if (result.success) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-ink-900 dark:text-white">
            {lead.name} {lead.company && <span className="text-ink-400 font-normal">· {lead.company}</span>}
          </p>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            {lead.email}{lead.phone ? ` · ${lead.phone}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusSelect
            value={lead.status}
            options={STATUS_OPTIONS}
            colorMap={STATUS_COLORS}
            onUpdate={(newStatus) => updateLeadStatus(lead.id, newStatus as LeadStatus)}
          />
          <ConfirmDeleteDialog
            trigger={
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Delete this lead?"
            description={`The submission from "${lead.name}" will be permanently removed.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">{lead.message}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-400">
        {lead.service_interested_in && <span>Interested in: {lead.service_interested_in}</span>}
        {lead.budget && <span>Budget: {lead.budget}</span>}
        <span>{formatDate(lead.created_at)}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-ink-100 dark:border-ink-800">
        <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-1.5">Private notes</p>
        <AdminNotesField
          initialValue={lead.admin_notes}
          onSave={(notes) => updateLeadNotes(lead.id, { admin_notes: notes })}
        />
      </div>
    </div>
  );
}
