import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BLOG_INTRO, type BlogPostItem } from "@/lib/blog-data";

interface BlogPageSectionProps {
  posts: BlogPostItem[];
}

export function BlogPageSection({ posts }: BlogPageSectionProps) {
  return (
    <section className="blog-page bg-white">
      <div className="container-site">
        <nav className="blog-page__breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span className="blog-page__breadcrumbs-sep">/</span>
          <span aria-current="page">Блог</span>
        </nav>

        <div className="blog-page__head">
          <h1 className="blog-page__title">Блог</h1>
          <p className="blog-page__intro">{BLOG_INTRO}</p>
        </div>

        <div className="blog-page__grid">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
