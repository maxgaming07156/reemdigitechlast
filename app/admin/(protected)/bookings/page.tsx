import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { BookingsList } from "@/components/admin/bookings-list";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/types/database";

async function getBookings(): Promise<Booking[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("preferred_date", { ascending: true });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
  return data ?? [];
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description={`${bookings.length} consultation request${bookings.length === 1 ? "" : "s"}`}
        backHref="/admin"
        backLabel="Overview"
      />

      {bookings.length === 0 ? (
        <AdminEmptyState
          title="No bookings yet"
          description="Consultation requests will appear here once someone books a slot."
        />
      ) : (
        <BookingsList bookings={bookings} />
      )}
    </div>
  );
}
