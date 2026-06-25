import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PortfolioProjectForm } from "@/components/admin/portfolio-project-form";
import { getPortfolioProjectByIdForAdmin } from "@/lib/admin/queries";

export default async function EditPortfolioProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getPortfolioProjectByIdForAdmin(id);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader
        title="Edit Portfolio Project"
        description={project.title}
        backHref="/admin/portfolio"
        backLabel="All Projects"
      />
      <PortfolioProjectForm project={project} />
    </div>
  );
}
