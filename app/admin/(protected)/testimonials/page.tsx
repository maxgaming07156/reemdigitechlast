import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
import { Button } from "@/components/ui/button";
import { getAllTestimonialsForAdmin } from "@/lib/admin/queries";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description={`${testimonials.length} testimonial${testimonials.length === 1 ? "" : "s"} total`}
        backHref="/admin"
        backLabel="Overview"
        action={
          <Button asChild variant="indigo">
            <Link href="/admin/testimonials/new"><Plus className="h-4 w-4" /> New Testimonial</Link>
          </Button>
        }
      />

      {testimonials.length === 0 ? (
        <AdminEmptyState
          title="No testimonials yet"
          description="Add a client testimonial to build trust on the website."
          action={
            <Button asChild variant="indigo">
              <Link href="/admin/testimonials/new"><Plus className="h-4 w-4" /> New Testimonial</Link>
            </Button>
          }
        />
      ) : (
        <TestimonialsTable testimonials={testimonials} />
      )}
    </div>
  );
}
