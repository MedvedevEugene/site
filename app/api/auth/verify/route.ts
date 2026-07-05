import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createUserSessionToken,
  isValidEmail,
  normalizeEmail,
  USER_SESSION_COOKIE,
} from "@/lib/user-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ""));
    const code = String(body.code || "").trim();

    if (!isValidEmail(email) || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }

    const authCode = await prisma.authCode.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });

    if (!authCode || authCode.expiresAt < new Date()) {
      return NextResponse.json({ error: "Код неверный или истёк" }, { status: 401 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    await prisma.authCode.deleteMany({ where: { email } });

    const token = await createUserSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set(USER_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("[auth/verify]", error);
    return NextResponse.json({ error: "Verify failed" }, { status: 500 });
  }
}
