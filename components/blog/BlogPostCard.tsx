import Link from "next/link";
import { formatBlogDate, type BlogPostItem } from "@/lib/blog-data";

interface BlogPostCardProps {
  post: BlogPostItem;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="blog-card">
      <Link href={post.href} className="blog-card__link">
        <div
          className="blog-card__media"
          role="img"
          aria-label={post.title}
          style={{ backgroundImage: `url("${post.imageUrl}")` }}
        />
        <div className="blog-card__body">
          <h2 className="blog-card__title">{post.title}</h2>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <time className="blog-card__date" dateTime={post.publishedAt.toISOString()}>
            {formatBlogDate(post.publishedAt)}
          </time>
        </div>
      </Link>
    </article>
  );
}
