import Link from "next/link";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/db";
import { leadTypeLabel } from "@/lib/lead-labels";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let counts = {
    leadsNew: 0,
    events: 0,
    specialists: 0,
    media: 0,
    toolSessions: 0,
  };
  let recentLeads: {
    id: string;
    type: string;
    name: string | null;
    phone: string | null;
    createdAt: Date;
  }[] = [];

  try {
    const [leadsNew, events, specialists, media, toolSessions, leads] = await Promise.all([
      prisma.lead.count({ where: { status: "new" } }),
      prisma.event.count(),
      prisma.specialist.count({ where: { published: true } }),
      prisma.mediaItem.count(),
      prisma.toolSession.count(),
      prisma.lead.findMany({
        where: { status: "new" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, type: true, name: true, phone: true, createdAt: true },
      }),
    ]);
    counts = { leadsNew, events, specialists, media, toolSessions };
    recentLeads = leads;
  } catch {
    /* DB not ready */
  }

  return (
    <AdminShell>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Новые заявки", value: counts.leadsNew, href: "/admin/leads", accent: true },
          { label: "События в расписании", value: counts.events, href: "/admin/events" },
          { label: "Специалисты", value: counts.specialists, href: "/admin/specialists" },
          { label: "Прохождений ИИ", value: counts.toolSessions, href: "/admin/users" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bg-white rounded-[20px] border p-6 hover:border-primary transition-colors ${
              item.accent ? "border-primary bg-[#f9f8e8]" : "border-border"
            }`}
          >
            <div className="text-3xl font-heading font-medium mb-1">{item.value}</div>
            <div className="text-sm text-muted">{item.label}</div>
          </Link>
        ))}
      </div>
      <AdminCard title="Быстрые действия">
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/leads" className="btn btn-primary">
            Открыть заявки
          </Link>
          <Link href="/admin/events" className="btn btn-outline">
            Расписание
          </Link>
          <Link href="/admin/specialists" className="btn btn-outline">
            Специалисты
          </Link>
          <Link href="/admin/users" className="btn btn-outline">
            Доступ админов
          </Link>
          <Link href="/timetable" className="btn btn-outline">
            Посмотреть на сайте
          </Link>
        </div>
      </AdminCard>

      {recentLeads.length > 0 && (
        <AdminCard title="Новые заявки">
          <ul className="m-0 p-0 list-none flex flex-col gap-3">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center justify-between gap-3 text-sm border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{lead.name || "Без имени"}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {leadTypeLabel(lead.type)}
                    {lead.phone ? ` · ${lead.phone}` : ""}
                    {" · "}
                    {lead.createdAt.toLocaleString("ru-RU")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/admin/leads" className="inline-block mt-4 text-sm text-primary underline">
            Все заявки →
          </Link>
        </AdminCard>
      )}
    </AdminShell>
  );
}
