import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Testimonial"
        backHref="/admin/testimonials"
        backLabel="All Testimonials"
      />
      <TestimonialForm />
    </div>
  );
}
