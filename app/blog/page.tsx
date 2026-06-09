import { PageShell, createPageMetadata } from "@/components/ui/PageShell";

export const metadata = createPageMetadata("Статьи");

const POSTS = [
  { title: "Что такое расстановки", date: "2026" },
  { title: "Как выбрать формат помощи", date: "2026" },
  { title: "Системный подход в работе с запросом", date: "2026" },
];

export default function BlogPage() {
  return (
    <PageShell title="Статьи" description="Полезные материалы от института ИЖСИЗ." breadcrumbs={[{ label: "Статьи" }]}>
      <div className="grid gap-4">
        {POSTS.map((post) => (
          <article key={post.title} className="card">
            <h3 className="font-heading text-lg font-medium m-0 mb-1">{post.title}</h3>
            <time className="text-sm text-muted">{post.date}</time>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
