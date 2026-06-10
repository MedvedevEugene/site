import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: { startAt?: { gte: Date; lte: Date } } = {};

  if (from && to) {
    where.startAt = {
      gte: new Date(from),
      lte: new Date(to),
    };
  }

  try {
    const events = await prisma.event.findMany({
      where,
      orderBy: { startAt: "asc" },
    });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const event = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description || null,
      startAt: new Date(body.startAt),
      endAt: new Date(body.endAt),
      instructor: body.instructor || null,
      format: body.format || "online",
      eventType: body.eventType || null,
      color: body.color || null,
      link: body.link || null,
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ event });
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const event = await prisma.event.update({
    where: { id: body.id },
    data: {
      title: body.title,
      description: body.description || null,
      startAt: new Date(body.startAt),
      endAt: new Date(body.endAt),
      instructor: body.instructor || null,
      format: body.format || "online",
      eventType: body.eventType || null,
      color: body.color || null,
      link: body.link || null,
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ event });
}

export async function DELETE(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
