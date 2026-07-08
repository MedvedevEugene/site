import { NextResponse } from "next/server";
import { createPendingLoginToken, PENDING_COOKIE } from "@/lib/auth-pending";
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
    const pendingToken = await createPendingLoginToken(email, code);
    const sent = await sendAuthCodeEmail(email, code);

    // Временный режим: даже если письмо не отправилось, даем пройти вход для тестирования инструментов.
    const bypassHint = !sent.ok
      ? "Почта временно отключена. Введите любые цифры в поле кода."
      : undefined;

    const response = NextResponse.json({
      ok: true,
      devCode: !sent.ok && "skipped" in sent && sent.skipped ? code : undefined,
      universalHint: bypassHint,
    });

    response.cookies.set(PENDING_COOKIE, pendingToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 15 * 60,
    });

    return response;
  } catch (error) {
    console.error("[auth/request-code]", error);
    const message =
      error instanceof Error && error.message.includes("USER_SESSION_SECRET")
        ? "Сервер не настроен: добавьте USER_SESSION_SECRET в Vercel"
        : "Не удалось отправить код. Попробуйте позже.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
