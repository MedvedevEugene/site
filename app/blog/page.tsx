import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedNews } from "@/lib/content";
import { IMAGES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Блог",
};

export const dynamic = "force-dynamic";

const FALLBACK = [
  {
    id: "1",
    title: "October book fair",
    excerpt: "This is the most important event of the literary market.",
    publishedAt: new Date("2021-10-03"),
    imageUrl: IMAGES.resonance1,
  },
];

export default async function BlogPage() {
  const posts = await getPublishedNews();
  const list = posts.length > 0 ? posts : FALLBACK;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-site">
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Блог</h1>
        <p className="text-lg text-muted max-w-[720px] m-0 mb-10">
          Читайте материалы, которые помогают лучше понимать себя, выстраивать гармоничные отношения и двигаться к осознанной жизни.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((post) => (
            <article key={post.id} className="blog-card">
              {post.imageUrl && (
                <div className="relative aspect-[4/3]">
                  <Image src={post.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-heading text-lg font-medium m-0 mb-3">{post.title}</h2>
                {"excerpt" in post && post.excerpt && (
                  <p className="text-sm text-muted m-0 mb-4 leading-relaxed">{post.excerpt}</p>
                )}
                <time className="text-sm text-muted">
                  {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
