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

    if (!sent.ok && !sent.skipped) {
      const isResendSandbox =
        "error" in sent && sent.error?.toLowerCase().includes("only send testing emails");
      return NextResponse.json(
        {
          error: isResendSandbox
            ? "Сейчас письма с кодом отправляются только на почту владельца Resend. Для входа с любого email нужно подключить домен в resend.com/domains и обновить EMAIL_FROM в Vercel."
            : "Не удалось отправить письмо. Попробуйте позже или напишите нам через форму на сайте.",
        },
        { status: 502 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      devCode: sent.skipped ? code : undefined,
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
