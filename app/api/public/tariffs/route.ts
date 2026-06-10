import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const group = new URL(request.url).searchParams.get("group");
  try {
    const tariffs = await prisma.tariff.findMany({
      where: { published: true, ...(group ? { group } : {}) },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ tariffs });
  } catch {
    return NextResponse.json({ tariffs: [] });
  }
}
