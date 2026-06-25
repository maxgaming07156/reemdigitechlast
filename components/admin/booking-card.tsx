"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StatusSelect } from "@/components/admin/status-select";
import { AdminNotesField } from "@/components/admin/admin-notes-field";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { updateBookingStatus, updateBookingNotes, deleteBooking } from "@/lib/admin/booking-actions";
import { formatDate } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types/database";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  confirmed: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300",
};

export function BookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteBooking(booking.id);
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
            {booking.name} {booking.company && <span className="text-ink-400 font-normal">· {booking.company}</span>}
          </p>
          <p className="text-sm text-ink-500 dark:text-ink-400">{booking.email} · {booking.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusSelect
            value={booking.status}
            options={STATUS_OPTIONS}
            colorMap={STATUS_COLORS}
            onUpdate={(newStatus) => updateBookingStatus(booking.id, newStatus as BookingStatus)}
          />
          <ConfirmDeleteDialog
            trigger={
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Delete this booking?"
            description={`The booking request from "${booking.name}" will be permanently removed.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-600 dark:text-ink-300">
        <span className="font-medium">{formatDate(booking.preferred_date)} at {booking.preferred_time}</span>
        {booking.service_interested_in && <span className="text-ink-400">· {booking.service_interested_in}</span>}
      </div>

      {booking.message && (
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{booking.message}</p>
      )}

      <p className="mt-3 text-xs text-ink-400">Submitted {formatDate(booking.created_at)}</p>

      <div className="mt-4 pt-4 border-t border-ink-100 dark:border-ink-800">
        <p className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-1.5">Private notes</p>
        <AdminNotesField
          initialValue={booking.admin_notes}
          onSave={(notes) => updateBookingNotes(booking.id, { admin_notes: notes })}
        />
      </div>
    </div>
  );
}
