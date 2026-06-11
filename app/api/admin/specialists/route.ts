import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]+/gi, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || `specialist-${Date.now()}`
  );
}

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const specialists = await prisma.specialist.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ specialists });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const specialist = await prisma.specialist.create({
    data: {
      name: body.name,
      slug: body.slug || slugify(body.name),
      role: body.role,
      photoUrl: body.photoUrl,
      bio: body.bio || null,
      services: body.services || [],
      sortOrder: body.sortOrder ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ specialist });
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const specialist = await prisma.specialist.update({
    where: { id: body.id },
    data: {
      name: body.name,
      slug: body.slug,
      role: body.role,
      photoUrl: body.photoUrl,
      bio: body.bio || null,
      services: body.services || [],
      sortOrder: body.sortOrder ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ specialist });
}

export async function DELETE(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.specialist.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
