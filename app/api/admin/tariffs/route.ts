import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const tariffs = await prisma.tariff.findMany({ orderBy: [{ group: "asc" }, { sortOrder: "asc" }] });
  return NextResponse.json({ tariffs });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const tariff = await prisma.tariff.create({
    data: {
      title: body.title,
      description: body.description || null,
      price: body.price || null,
      priceNote: body.priceNote || null,
      ctaText: body.ctaText || "Записаться",
      ctaLink: body.ctaLink || null,
      iconUrl: body.iconUrl || null,
      group: body.group || "consultations",
      sortOrder: body.sortOrder ?? 0,
      published: body.published ?? true,
      outline: body.outline ?? false,
    },
  });
  return NextResponse.json({ tariff });
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const tariff = await prisma.tariff.update({
    where: { id: body.id },
    data: {
      title: body.title,
      description: body.description || null,
      price: body.price || null,
      priceNote: body.priceNote || null,
      ctaText: body.ctaText || "Записаться",
      ctaLink: body.ctaLink || null,
      iconUrl: body.iconUrl || null,
      group: body.group || "consultations",
      sortOrder: body.sortOrder ?? 0,
      published: body.published ?? true,
      outline: body.outline ?? false,
    },
  });
  return NextResponse.json({ tariff });
}

export async function DELETE(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.tariff.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
