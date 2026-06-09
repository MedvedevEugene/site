import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    "📩 Новая заявка с сайта ИЖСИЗ",
    `Тип: ${body.type || "lead"}`,
    `Имя: ${body.name || "—"}`,
    `Телефон: ${body.phone || "—"}`,
    body.email ? `Email: ${body.email}` : null,
    body.contact ? `Связь: ${body.contact}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (token && chatId) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } else {
    console.log("[contact]", text);
  }

  return NextResponse.json({ ok: true });
}
