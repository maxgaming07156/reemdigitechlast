import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader, AdminEmptyState } from "@/components/admin/page-header";
import { BlogPostsTable } from "@/components/admin/blog-posts-table";
import { Button } from "@/components/ui/button";
import { getAllBlogPostsForAdmin } from "@/lib/admin/queries";

export default async function AdminBlogsPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description={`${posts.length} post${posts.length === 1 ? "" : "s"} total`}
        backHref="/admin"
        backLabel="Overview"
        action={
          <Button asChild variant="indigo">
            <Link href="/admin/blogs/new"><Plus className="h-4 w-4" /> New Post</Link>
          </Button>
        }
      />

      {posts.length === 0 ? (
        <AdminEmptyState
          title="No blog posts yet"
          description="Create your first article to start publishing on the blog."
          action={
            <Button asChild variant="indigo">
              <Link href="/admin/blogs/new"><Plus className="h-4 w-4" /> New Post</Link>
            </Button>
          }
        />
      ) : (
        <BlogPostsTable posts={posts} />
      )}
    </div>
  );
}
