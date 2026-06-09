import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог",
};

const POSTS = [
  {
    title: "October book fair",
    excerpt: "This is the most important event of the literary market. The festival takes place on the territory of the cluster Star in the second pavilion.",
    date: "03.10.2021",
    image: "https://static.tildacdn.com/tild6664-3738-4963-a632-303161336434/Frame_90.png",
  },
  {
    title: "Dutch story of wooden house",
    excerpt: "The film is about a small village of carvers on the north of Viborg. There are great set design scenes and delightful applied art objects.",
    date: "02.10.2021",
    image: "https://static.tildacdn.com/tild3634-3466-4365-a233-386430663137/Rectangle_71.png",
  },
  {
    title: "September market",
    excerpt: "Wow! Amanda Steiner ceramics on September market. Also meet talented young creators in the jewelry section.",
    date: "01.10.2021",
    image: "https://static.tildacdn.com/tild3438-6436-4930-b338-313839333232/1.png",
  },
];

export default function BlogPage() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container-site">
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-medium m-0 mb-4">Блог</h1>
        <p className="text-lg text-muted max-w-[720px] m-0 mb-10">
          Читайте материалы, которые помогают лучше понимать себя, выстраивать гармоничные отношения и двигаться к осознанной жизни.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article key={post.title} className="blog-card">
              <div className="relative aspect-[4/3]">
                <Image src={post.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6">
                <h2 className="font-heading text-lg font-medium m-0 mb-3">{post.title}</h2>
                <p className="text-sm text-muted m-0 mb-4 leading-relaxed">{post.excerpt}</p>
                <time className="text-sm text-muted">{post.date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
