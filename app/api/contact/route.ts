import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (!body || typeof body !== "object" || !String(body.name || "").trim() || ![body.phone, body.email, body.contact].some(value => typeof value === "string" && value.trim())) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  let delivered = false;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    "📩 Новая заявка с сайта ИЖСИЗ",
    `Тип: ${body.type || "lead"}`,
    `Имя: ${body.name || "—"}`,
    `Телефон: ${body.phone || "—"}`,
    body.email ? `Email: ${body.email}` : null,
    body.contact ? `Связь: ${body.contact}` : null,
    body.comment ? `Комментарий: ${body.comment}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await prisma.lead.create({
      data: {
        type: String(body.type || "lead"),
        name: body.name ? String(body.name) : null,
        phone: body.phone ? String(body.phone) : null,
        email: body.email ? String(body.email) : null,
        contactMethod: body.contact ? String(body.contact) : null,
        comment: body.comment ? String(body.comment) : body.message ? String(body.message) : null,
        source: body.source ? String(body.source) : null,
        metadata: body.metadata ? (body.metadata as Prisma.InputJsonValue) : undefined,
      },
    });
    delivered = true;
  } catch (error) {
    console.error("[contact] lead save failed", error);
  }

  if (token && chatId) {
    try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (response.ok && (await response.json()).ok) delivered = true;
    } catch (err) { console.error("[contact] telegram failed", err); }
  }

  return NextResponse.json({ ok: delivered }, { status: delivered ? 200 : 503 });
}
