import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getTestimonialByIdForAdmin } from "@/lib/admin/queries";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdForAdmin(id);
  if (!testimonial) notFound();

  return (
    <div>
      <AdminPageHeader
        title="Edit Testimonial"
        description={testimonial.client_name}
        backHref="/admin/testimonials"
        backLabel="All Testimonials"
      />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
