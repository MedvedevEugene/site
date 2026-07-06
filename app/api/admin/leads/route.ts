import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";
import type { LeadStatus } from "@/lib/lead-labels";

const VALID_STATUSES: LeadStatus[] = ["new", "in_progress", "done", "spam"];

function leadsDbError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021") {
      return "Таблица заявок ещё не создана в базе. Перезапустите деплой на Vercel или выполните: npx prisma db push";
    }
  }
  if (error instanceof Error && /does not exist/i.test(error.message)) {
    return "Таблица заявок ещё не создана в базе. Перезапустите деплой на Vercel или выполните: npx prisma db push";
  }
  return "Не удалось загрузить заявки. Проверьте DATABASE_URL и логи Vercel.";
}

export async function GET(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const status = new URL(request.url).searchParams.get("status");
  const where = status && VALID_STATUSES.includes(status as LeadStatus) ? { status } : {};

  try {
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const counts = await prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    const statusCounts = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));

    return NextResponse.json({
      leads: leads.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
      counts: {
        new: statusCounts.new || 0,
        in_progress: statusCounts.in_progress || 0,
        done: statusCounts.done || 0,
        spam: statusCounts.spam || 0,
        all: Object.values(statusCounts).reduce((a, b) => a + b, 0),
      },
    });
  } catch (error) {
    console.error("[admin/leads GET]", error);
    return NextResponse.json({ error: leadsDbError(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  try {
    const body = await request.json();
    const id = body.id as string | undefined;
    const status = body.status as LeadStatus | undefined;

    if (!id || !status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      lead: { ...lead, createdAt: lead.createdAt.toISOString(), updatedAt: lead.updatedAt.toISOString() },
    });
  } catch (error) {
    console.error("[admin/leads PATCH]", error);
    return NextResponse.json({ error: leadsDbError(error) }, { status: 500 });
  }
}
