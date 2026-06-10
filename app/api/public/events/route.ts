import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    const where: { published: boolean; startAt?: { gte: Date; lte: Date } } = { published: true };
    if (from && to) {
      where.startAt = { gte: new Date(from), lte: new Date(to) };
    }
    const events = await prisma.event.findMany({ where, orderBy: { startAt: "asc" } });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
