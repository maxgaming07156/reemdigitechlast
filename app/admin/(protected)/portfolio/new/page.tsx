import { AdminPageHeader } from "@/components/admin/page-header";
import { PortfolioProjectForm } from "@/components/admin/portfolio-project-form";

export default function NewPortfolioProjectPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Portfolio Project"
        backHref="/admin/portfolio"
        backLabel="All Projects"
      />
      <PortfolioProjectForm />
    </div>
  );
}
