import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withDbTimeout } from "@/lib/db-timeout";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const group = new URL(request.url).searchParams.get("group");
  const tariffs = await withDbTimeout(
    () =>
      prisma.tariff.findMany({
        where: { published: true, ...(group ? { group } : {}) },
        orderBy: { sortOrder: "asc" },
      }),
    []
  );
  return NextResponse.json({ tariffs });
}
