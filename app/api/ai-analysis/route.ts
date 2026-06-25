import { NextResponse } from "next/server";
import { generateAiCompletion } from "@/lib/ai-client";
import { buildToolPrompt } from "@/lib/ai-prompts";
import { getToolSession, saveToolSessionAiReport } from "@/lib/tool-sessions";
import type { ToolId } from "@/lib/tool-sessions";

function fallbackAnalysis(tool: string, payload: Record<string, unknown>) {
  const topic =
    (payload.topic as string) ||
    (payload.query as string) ||
    (payload.pso as string) ||
    "ваш запрос";

  return `## Предварительный разбор (демо-режим)

Тема исследования: **${topic}**

Добавьте \`OPENROUTER_API_KEY\` или \`OPENAI_API_KEY\` в переменные окружения Vercel для полного ИИ-разбора.

### Что видно в ваших ответах
- Есть повторяющиеся смысловые линии вокруг темы «${topic}».
- Карта показывает зоны внутреннего напряжения — их стоит исследовать бережно.
- Часть формулировок может указывать на жёсткие причинно-следственные связки.

### Рекомендация
Запишитесь на консультацию специалиста Института для персонального сопровождения.

_Инструмент: ${tool}_`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool as ToolId | undefined;
    const sessionId = body.sessionId as string | undefined;
    let payload = body.payload as Record<string, unknown> | undefined;
    let resolvedTool = tool;

    if (sessionId) {
      const session = await getToolSession(sessionId);
      if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
      if (session.aiReport) {
        return NextResponse.json({ analysis: session.aiReport, cached: true });
      }
      resolvedTool = session.tool as ToolId;
      payload = session.payload as Record<string, unknown>;
    }

    if (!resolvedTool || !payload) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const prompt = buildToolPrompt(resolvedTool, payload);
    const analysis = (await generateAiCompletion(prompt)) || fallbackAnalysis(resolvedTool, payload);

    if (sessionId) {
      await saveToolSessionAiReport(sessionId, analysis).catch(() => {});
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("[ai-analysis]", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
