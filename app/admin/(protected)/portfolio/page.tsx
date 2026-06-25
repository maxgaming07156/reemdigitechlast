import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { PortfolioProjectsTable } from "@/components/admin/portfolio-projects-table";
import { Button } from "@/components/ui/button";
import { getAllPortfolioProjectsForAdmin } from "@/lib/admin/queries";

export default async function AdminPortfolioPage() {
  const projects = await getAllPortfolioProjectsForAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Portfolio Projects"
        description={`${projects.length} project${projects.length === 1 ? "" : "s"} total`}
        backHref="/admin"
        backLabel="Overview"
        action={
          <Button asChild variant="indigo">
            <Link href="/admin/portfolio/new"><Plus className="h-4 w-4" /> New Project</Link>
          </Button>
        }
      />

      {projects.length === 0 ? (
        <AdminEmptyState
          title="No projects yet"
          description="Add your first project to showcase it on the portfolio page."
          action={
            <Button asChild variant="indigo">
              <Link href="/admin/portfolio/new"><Plus className="h-4 w-4" /> New Project</Link>
            </Button>
          }
        />
      ) : (
        <PortfolioProjectsTable projects={projects} />
      )}
    </div>
  );
}
