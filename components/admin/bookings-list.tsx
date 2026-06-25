"use client";

import * as React from "react";
import { BookingCard } from "@/components/admin/booking-card";
import { StatusFilterTabs } from "@/components/admin/status-filter-tabs";
import { AdminEmptyState } from "@/components/admin/page-header";
import type { Booking, BookingStatus } from "@/types/database";

export function BookingsList({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = React.useState<"all" | BookingStatus>("all");

  const counts = React.useMemo(() => {
    const base: Record<string, number> = { all: bookings.length, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    for (const booking of bookings) base[booking.status]++;
    return base;
  }, [bookings]);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const options = [
    { value: "all", label: "All", count: counts.all },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "confirmed", label: "Confirmed", count: counts.confirmed },
    { value: "completed", label: "Completed", count: counts.completed },
    { value: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

  return (
    <div>
      <div className="mb-5">
        <StatusFilterTabs options={options} active={filter} onChange={(v) => setFilter(v as typeof filter)} />
      </div>

      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No bookings in this view"
          description="Try a different filter, or check back once new requests come in."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
