import { formatBlogDate, type BlogPostItem } from "@/lib/blog-data";

interface BlogPostCardProps {
  post: BlogPostItem;
  onOpen: (post: BlogPostItem) => void;
}

export function BlogPostCard({ post, onOpen }: BlogPostCardProps) {
  return (
    <article className="blog-card">
      <div
        className="blog-card__media"
        role="img"
        aria-label={post.title}
        style={{ backgroundImage: `url("${post.imageUrl}")` }}
      />
      <div className="blog-card__body">
        <button type="button" className="blog-card__title" onClick={() => onOpen(post)}>
          {post.title}
        </button>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <time className="blog-card__date" dateTime={post.publishedAt}>
          {formatBlogDate(post.publishedAt)}
        </time>
      </div>
    </article>
  );
}
