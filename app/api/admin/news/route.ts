import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const posts = await prisma.newsPost.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const post = await prisma.newsPost.create({
    data: {
      title: body.title,
      slug: body.slug || slugify(body.title),
      excerpt: body.excerpt || null,
      content: body.content || null,
      imageUrl: body.imageUrl || null,
      published: body.published ?? true,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    },
  });
  return NextResponse.json({ post });
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const body = await request.json();
  const post = await prisma.newsPost.update({
    where: { id: body.id },
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      content: body.content || null,
      imageUrl: body.imageUrl || null,
      published: body.published ?? true,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
    },
  });
  return NextResponse.json({ post });
}

export async function DELETE(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.newsPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
