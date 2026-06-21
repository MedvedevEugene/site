import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withDbTimeout } from "@/lib/db-timeout";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: { published: boolean; startAt?: { gte: Date; lte: Date } } = { published: true };
  if (from && to) {
    where.startAt = { gte: new Date(from), lte: new Date(to) };
  }

  const events = await withDbTimeout(
    () => prisma.event.findMany({ where, orderBy: { startAt: "asc" } }),
    [],
  );

  return NextResponse.json({ events });
}
