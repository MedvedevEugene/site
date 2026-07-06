import { NextResponse } from "next/server";
import { TOOL_LABELS } from "@/lib/tool-labels";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user-auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sessions = await prisma.toolSession.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        tool: true,
        status: true,
        emailSent: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      sessions: sessions.map((s) => ({
        ...s,
        toolLabel: TOOL_LABELS[s.tool] || s.tool,
        createdAt: s.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[account/sessions]", error);
    return NextResponse.json({ sessions: [] });
  }
}
