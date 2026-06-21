import type { Metadata } from "next";
import { BlogPageSection } from "@/components/blog/BlogPageSection";
import { BLOG_FALLBACK_POSTS, type BlogPostItem } from "@/lib/blog-data";
import { getPublishedNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог",
};

export const dynamic = "force-dynamic";

function mapDbPosts(posts: Awaited<ReturnType<typeof getPublishedNews>>): BlogPostItem[] {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt ?? "",
    publishedAt: post.publishedAt.toISOString(),
    imageUrl: post.imageUrl ?? BLOG_FALLBACK_POSTS[0].imageUrl,
  }));
}

export default async function BlogPage() {
  const posts = await getPublishedNews();
  const list = posts.length > 0 ? mapDbPosts(posts) : BLOG_FALLBACK_POSTS;

  return <BlogPageSection posts={list} />;
}
