import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withDbTimeout } from "@/lib/db-timeout";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await withDbTimeout(
    () =>
      prisma.newsPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
      }),
    []
  );
  return NextResponse.json({ posts });
}
