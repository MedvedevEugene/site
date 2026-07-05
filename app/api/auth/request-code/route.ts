import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendAuthCodeEmail } from "@/lib/email";
import { generateAuthCode, isValidEmail, normalizeEmail } from "@/lib/user-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ""));

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }

    const code = generateAuthCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.authCode.deleteMany({ where: { email } });
    await prisma.authCode.create({ data: { email, code, expiresAt } });

    const sent = await sendAuthCodeEmail(email, code);
    if (!sent.ok && !sent.skipped) {
      return NextResponse.json({ error: "Не удалось отправить письмо" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      devCode: sent.skipped ? code : undefined,
    });
  } catch (error) {
    console.error("[auth/request-code]", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
