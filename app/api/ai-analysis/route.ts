import { NextResponse } from "next/server";
import { generateAiCompletion } from "@/lib/ai-client";
import { isValidAiReport, normalizeAiReport } from "@/lib/ai-report";
import { sendAiReportEmail } from "@/lib/email";
import { buildToolPrompt } from "@/lib/ai-prompts";
import { getToolSession, saveToolSessionAiReport } from "@/lib/tool-sessions";
import type { ToolId } from "@/lib/tool-sessions";
import { getCurrentUser } from "@/lib/user-auth";
import { prisma } from "@/lib/db";

function fallbackAnalysis(
  tool: string,
  payload: Record<string, unknown>,
  reason?: string,
  hasKey?: boolean
) {
  const topic =
    (payload.topic as string) ||
    (payload.query as string) ||
    (payload.pso as string) ||
    "ваш запрос";

  let hint = "Добавьте `OPENROUTER_API_KEY` и `AI_MODEL` в Vercel → Redeploy.";
  if (hasKey && reason) {
    hint = `Ключ на сервере есть, но OpenRouter вернул ошибку: ${reason}. Проверьте значение \`AI_MODEL\` (должно быть \`meta-llama/llama-3.3-70b-instruct:free\`) и лимиты на openrouter.ai.`;
  } else if (hasKey) {
    hint = "Ключ на сервере есть, но ответ пустой. Попробуйте другую модель в `AI_MODEL` или повторите позже.";
  }

  return `## Предварительный разбор (демо-режим)

Тема исследования: **${topic}**

${hint}

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
      if (session.aiReport && isValidAiReport(session.aiReport)) {
        return NextResponse.json({ analysis: session.aiReport, cached: true });
      }
      resolvedTool = session.tool as ToolId;
      payload = session.payload as Record<string, unknown>;
    }

    if (!resolvedTool || !payload) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const prompt = buildToolPrompt(resolvedTool, payload);
    const ai = await generateAiCompletion(prompt);
    const analysis =
      ai.content?.trim() || fallbackAnalysis(resolvedTool, payload, ai.error, ai.hasKey);

    if (sessionId && ai.content) {
      await saveToolSessionAiReport(sessionId, analysis).catch(() => {});
    }

    const user = await getCurrentUser();
    let emailSent = false;

    if (user && ai.content) {
      const session = sessionId ? await getToolSession(sessionId).catch(() => null) : null;
      if (!session?.emailSent) {
        const result = await sendAiReportEmail(user.email, resolvedTool, analysis, sessionId);
        emailSent = result.ok;
        if (emailSent && sessionId) {
          await prisma.toolSession
            .update({ where: { id: sessionId }, data: { emailSent: true } })
            .catch(() => {});
        }
      } else {
        emailSent = true;
      }
    }

    return NextResponse.json({
      analysis,
      mode: ai.content ? "ai" : "fallback",
      emailSent,
      userEmail: user?.email,
      ...(ai.error ? { aiError: ai.error } : {}),
    });
  } catch (error) {
    console.error("[ai-analysis]", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
