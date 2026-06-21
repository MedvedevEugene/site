export type BlogPostItem = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  imageUrl: string;
};

export const BLOG_FEED_TITLE = "Our news";

export const BLOG_INTRO =
  "Читайте материалы, которые помогают лучше понимать себя, выстраивать гармоничные отношения и двигаться к осознанной жизни.";

export const BLOG_FALLBACK_POSTS: BlogPostItem[] = [
  {
    id: "october-book-fair",
    title: "October book fair",
    excerpt:
      "This is the most important event of the literary market. The festival takes place on the territory of the cluster Star in the second pavilion",
    publishedAt: "2021-10-03T17:00:00.000Z",
    imageUrl: "/images/blog/october-book-fair.jpg",
  },
  {
    id: "dutch-story-of-wooden-house",
    title: "Dutch story of wooden house",
    excerpt:
      "The film is about a small village of carvers on the north of Viborg. There are great set design scenes and the  film is full of delightful applied art objects.",
    publishedAt: "2021-10-02T12:00:00.000Z",
    imageUrl: "/images/blog/dutch-story-of-wooden-house.jpg",
  },
  {
    id: "september-market",
    title: "September market",
    excerpt:
      "Wow! Amanda Steiner ceramics on September market. Also, meet talented young creators in the jewelry section and check some handmade cosmetics.",
    publishedAt: "2021-10-01T14:00:00.000Z",
    imageUrl: "/images/blog/september-market.jpg",
  },
];

export function formatBlogDate(value: string) {
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
