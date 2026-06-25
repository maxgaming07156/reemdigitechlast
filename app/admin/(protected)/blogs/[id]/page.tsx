import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { getBlogPostByIdForAdmin } from "@/lib/admin/queries";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <div>
      <AdminPageHeader
        title="Edit Blog Post"
        description={post.title}
        backHref="/admin/blogs"
        backLabel="All Posts"
      />
      <BlogPostForm post={post} />
    </div>
  );
}
