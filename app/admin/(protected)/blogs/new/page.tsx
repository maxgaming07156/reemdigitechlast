import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogPostForm } from "@/components/admin/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader
        title="New Blog Post"
        backHref="/admin/blogs"
        backLabel="All Posts"
      />
      <BlogPostForm />
    </div>
  );
}
