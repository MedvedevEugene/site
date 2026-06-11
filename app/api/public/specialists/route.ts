import { NextResponse } from "next/server";
import { getPublishedSpecialists } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const specialists = await getPublishedSpecialists();
  return NextResponse.json({ specialists });
}
