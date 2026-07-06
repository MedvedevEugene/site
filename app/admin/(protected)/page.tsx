import Link from "next/link";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let counts = { events: 0, news: 0, tariffs: 0, media: 0, specialists: 0 };
  try {
    const [events, news, tariffs, media, specialists] = await Promise.all([
      prisma.event.count(),
      prisma.newsPost.count({ where: { published: true } }),
      prisma.tariff.count({ where: { published: true } }),
      prisma.mediaItem.count(),
      prisma.specialist.count({ where: { published: true } }),
    ]);
    counts = { events, news, tariffs, media, specialists };
  } catch {
    /* DB not ready */
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "События", value: counts.events, href: "/admin/events" },
          { label: "Новости", value: counts.news, href: "/admin/news" },
          { label: "Тарифы", value: counts.tariffs, href: "/admin/tariffs" },
          { label: "Специалисты", value: counts.specialists, href: "/admin/specialists" },
          { label: "Фото", value: counts.media, href: "/admin/media" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="bg-white rounded-[20px] border border-border p-6 hover:border-primary transition-colors">
            <div className="text-3xl font-heading font-medium mb-1">{item.value}</div>
            <div className="text-sm text-muted">{item.label}</div>
          </Link>
        ))}
      </div>
      <AdminCard title="Быстрые действия">
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/events" className="btn btn-primary">Добавить событие</Link>
          <Link href="/admin/news" className="btn btn-outline">Новая статья</Link>
          <Link href="/admin/specialists" className="btn btn-outline">Добавить специалиста</Link>
          <Link href="/timetable" className="btn btn-outline">Посмотреть расписание</Link>
        </div>
      </AdminCard>
    </AdminShell>
  );
}
