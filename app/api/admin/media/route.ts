import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const items = await prisma.mediaItem.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const item = await prisma.mediaItem.upsert({
    where: { key: body.key },
    create: {
      key: body.key,
      label: body.label,
      url: body.url,
      alt: body.alt || null,
    },
    update: {
      label: body.label,
      url: body.url,
      alt: body.alt || null,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.mediaItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
