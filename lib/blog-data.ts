export type BlogPostItem = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  imageUrl: string;
  href: string;
};

export const BLOG_INTRO =
  "Читайте материалы, которые помогают лучше понимать себя, выстраивать гармоничные отношения и двигаться к осознанной жизни.";

export const BLOG_FALLBACK_POSTS: BlogPostItem[] = [
  {
    id: "october-book-fair",
    title: "October book fair",
    excerpt:
      "This is the most important event of the literary market. The festival takes place on the territory of the cluster Star in the second pavilion",
    publishedAt: new Date("2021-10-03T17:00:00"),
    imageUrl: "https://static.tildacdn.com/tild3133-3933-4834-b639-653536346636/jean-philippe-delber.jpg",
    href: "/coming-soon",
  },
  {
    id: "dutch-story-of-wooden-house",
    title: "Dutch story of wooden house",
    excerpt:
      "The film is about a small village of carvers on the north of Viborg. There are great set design scenes and the  film is full of delightful applied art objects.",
    publishedAt: new Date("2021-10-02T12:00:00"),
    imageUrl: "https://static.tildacdn.com/tild3635-6563-4035-b436-346238303138/andy-kelly-P21tYLUo_.jpg",
    href: "/coming-soon",
  },
  {
    id: "september-market",
    title: "September market",
    excerpt:
      "Wow! Amanda Steiner ceramics on September market. Also, meet talented young creators in the jewelry section and check some handmade cosmetics.",
    publishedAt: new Date("2021-10-01T14:00:00"),
    imageUrl: "https://static.tildacdn.com/tild3737-3664-4037-b632-356461316131/29857022170_aba46d6b.jpg",
    href: "/coming-soon",
  },
];

export function formatBlogDate(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
