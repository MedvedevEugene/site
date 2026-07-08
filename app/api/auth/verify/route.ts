import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createUserSessionToken,
  isValidEmail,
  normalizeEmail,
  USER_SESSION_COOKIE,
} from "@/lib/user-auth";
import { isAdminEmail, resolveUserRole } from "@/lib/admin-access";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email || ""));
    const code = String(body.code || "").trim();

    if (!isValidEmail(email) || !/^\d{1,12}$/.test(code)) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }
    // Временный режим без рассылки: код не проверяем, достаточно валидного email и цифр.
    void code;

    const role = isAdminEmail(email) ? "admin" : "user";

    let userId = email;
    let name: string | null = null;
    let userRole: "user" | "admin" = role;

    try {
      const user = await prisma.user.upsert({
        where: { email },
        create: { email, role },
        update: role === "admin" ? { role: "admin" } : {},
      });
      userId = user.id;
      name = user.name;
      userRole = resolveUserRole(user.email, user.role);
    } catch (dbError) {
      console.error("[auth/verify] user upsert failed, using email id", dbError);
      userRole = role;
    }

    const token = await createUserSessionToken({ id: userId, email, name, role: userRole });

    const response = NextResponse.json({
      ok: true,
      user: { id: userId, email, name, role: userRole },
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
    return NextResponse.json({ error: "Не удалось войти. Попробуйте снова." }, { status: 500 });
  }
}
