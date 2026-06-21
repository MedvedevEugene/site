import type { Metadata } from "next";
import { BlogPageSection } from "@/components/blog/BlogPageSection";
import { BLOG_FALLBACK_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Блог",
};

export default function BlogPage() {
  return <BlogPageSection posts={BLOG_FALLBACK_POSTS} />;
}
