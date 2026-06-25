import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export type ToolId = "insightograph" | "sixteen_associations" | "nlu";

export async function createToolSession(tool: ToolId, payload: Record<string, unknown>) {
  return prisma.toolSession.create({
    data: { tool, payload: payload as Prisma.InputJsonValue, status: "completed" },
  });
}

export async function getToolSession(id: string) {
  return prisma.toolSession.findUnique({ where: { id } });
}

export async function saveToolSessionAiReport(id: string, aiReport: string) {
  return prisma.toolSession.update({
    where: { id },
    data: { aiReport, status: "ai_analysis_generated" },
  });
}
