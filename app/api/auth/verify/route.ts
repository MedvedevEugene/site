import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { PENDING_COOKIE, verifyPendingLoginToken } from "@/lib/auth-pending";
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

    if (!isValidEmail(email) || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const pendingToken = cookieStore.get(PENDING_COOKIE)?.value;
    if (!pendingToken) {
      return NextResponse.json({ error: "Сначала запросите код на почту" }, { status: 400 });
    }

    const pending = await verifyPendingLoginToken(pendingToken);
    if (!pending || pending.email !== email || pending.code !== code) {
      return NextResponse.json({ error: "Код неверный или истёк" }, { status: 401 });
    }

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

    response.cookies.set(PENDING_COOKIE, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[auth/verify]", error);
    return NextResponse.json({ error: "Не удалось войти. Попробуйте снова." }, { status: 500 });
  }
}
