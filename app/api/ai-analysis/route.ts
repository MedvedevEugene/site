import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { toolName, topic, answers, steps } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  const prompt = [
    `Ты — бережный психологический ассистент института ИЖСИЗ.`,
    `Инструмент: ${toolName}`,
    `Тема клиента: ${topic}`,
    ...steps.map((q: string, i: number) => `${q}: ${answers[i + 1] || "—"}`),
    `Сформируй структурированный разбор: ключевые темы, возможные связи, бережные рекомендации. Без медицинских обещаний.`,
  ].join("\n");

  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
        }),
      });
      const data = await res.json();
      const analysis = data.choices?.[0]?.message?.content;
      if (analysis) return NextResponse.json({ analysis });
    } catch {
      /* fallback below */
    }
  }

  return NextResponse.json({
    analysis: `Расширенный разбор по теме «${topic}»\n\n1. Ключевой запрос связан с темой «${topic}» и затрагивает несколько уровней восприятия.\n\n2. В ваших ответах прослеживаются повторяющиеся паттерны — это хорошая точка для более глубокой работы со специалистом.\n\n3. Рекомендуем обратиться на индивидуальную консультацию для персонального сопровождения.\n\n(Демо-режим: подключите OPENAI_API_KEY и оплату для полного ИИ-разбора)`,
  });
}
